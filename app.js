'use strict';
const D = window.DATA;
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const dstr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dstr(new Date());
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

/* ---------- Stato e salvataggio (cartella dati/ tramite server.rb) ---------- */
let S = { start: null, days: {}, quiz: {}, qlog: [], speech: [], ratings: {}, words: {}, recs: [], vminutes: {}, gram: {}, errors: [], esami: [], cando: {}, notes: [], weekly: {}, premi: {}, wstat: {}, radio: {}, base: null, onboarded: false, examDate: null };
let saveTimer;
function save() {
  try { localStorage.setItem('aya.state', JSON.stringify(S)); } catch (e) {}
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch('/api/state', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }).catch(() => {});
  }, 400);
}
async function load() {
  let remote = null, local = null;
  try { const r = await fetch('/api/state'); if (r.ok) remote = await r.json(); } catch (e) {}
  try { local = JSON.parse(localStorage.getItem('aya.state') || 'null'); } catch (e) {}
  const src = (remote && remote.start) ? remote : (local || {});
  S = Object.assign(S, src);
  if (!S.start) { S.start = today(); save(); }
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2200); }

/* ---------- Settimana, serie, completamento ---------- */
function weekNum() {
  const diff = Math.floor((new Date(today()) - new Date(S.start)) / (7 * 864e5)) + 1;
  return Math.min(20, Math.max(1, diff));
}
function faseOf(w) { return D.fasi.find(f => w >= f.sett[0] && w <= f.sett[1]); }
function dayDone(date) { return (S.days[date] && S.days[date].done) || []; }
function minutesOf(date) { return dayDone(date).reduce((s, id) => s + ((D.blocchi.find(b => b.id === id) || {}).min || 0), 0); }
function markDone(id) {
  const d = today(); S.days[d] = S.days[d] || { done: [] };
  if (!S.days[d].done.includes(id)) { S.days[d].done.push(id); save(); toast('Attività completata ✓'); updateHeader(); if (window.afterProgress) afterProgress(); }
}
function streak() {
  let n = 0; const d = new Date();
  if (minutesOf(dstr(d)) < 30) d.setDate(d.getDate() - 1);
  while (minutesOf(dstr(d)) >= 30) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function updateHeader() {
  const w = weekNum(); $('#wk').textContent = 'Settimana ' + w + ' di 20';
  const s = streak(); $('#streak').textContent = s ? '🔥 ' + s + (s === 1 ? ' giorno' : ' giorni') + ' di fila' : '';
}

/* ---------- Voce del Mac (sintesi vocale) ---------- */
let itVoice = null;
function pickVoice() {
  const v = speechSynthesis.getVoices().filter(x => /^it/i.test(x.lang));
  itVoice = v.find(x => /alice|federica|luca|paola|elsa/i.test(x.name)) || v[0] || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate = 0.95) {
  if (!('speechSynthesis' in window)) return toast('Sintesi vocale non disponibile in questo browser');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'it-IT'; if (itVoice) u.voice = itVoice; u.rate = rate;
  speechSynthesis.speak(u);
}
function voiceWarn() {
  return (!itVoice && 'speechSynthesis' in window)
    ? '<div class="tip">⚠️ Non trovo una voce italiana. Installala da Impostazioni di Sistema → Accessibilità → Contenuto letto → Voci di sistema → Italiano (Alice o Luca).</div>' : '';
}

/* ---------- Confronto parole (riconoscimento vocale) ---------- */
const norm = t => t.toLowerCase().replace(/['’‘]/g, ' ').replace(/[.,;:!?«»"“”()…]/g, ' ').split(/\s+/).filter(Boolean);
function diff(target, heard) {
  const a = norm(target), b = norm(heard), n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ok = Array(n).fill(false); let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { ok[i] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  return { words: a.map((w, k) => [w, ok[k]]), score: n ? Math.round(100 * dp[0][0] / n) : 0, html: a.map((w, k) => '<span class="' + (ok[k] ? 'ok' : 'ko') + '">' + esc(w) + '</span>').join(' ') };
}

/* ---------- Registratore ---------- */
function recBox(host, { tag, target = null, onDone }) {
  host.innerHTML = '<div class="rec"><div class="row"><button class="btn rb">● Registra</button><span class="mute rs"></span></div><div class="rr"></div></div>';
  const btn = $('.rb', host), st = $('.rs', host), out = $('.rr', host);
  let mr, chunks = [], stream, sr = null, heard = '', recording = false, t0 = 0;
  btn.onclick = async () => {
    if (!recording) {
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch (e) { st.textContent = 'Microfono non disponibile: controlla i permessi del browser.'; return; }
      chunks = []; heard = '';
      const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
      mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      mr.onstop = () => finish(mr.mimeType || mime || 'audio/webm');
      mr.start();
      if (target && SR) {
        try {
          sr = new SR(); sr.lang = 'it-IT'; sr.continuous = true; sr.interimResults = false;
          sr.onresult = e => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) heard += ' ' + e.results[i][0].transcript; };
          sr.onerror = () => {}; sr.start();
        } catch (e) { sr = null; }
      }
      recording = true; t0 = Date.now(); btn.textContent = '■ Stop'; btn.classList.add('rec-on'); st.textContent = 'Sto registrando…';
    } else {
      recording = false; btn.textContent = '● Registra'; btn.classList.remove('rec-on'); st.textContent = 'Elaboro…';
      try { if (sr) sr.stop(); } catch (e) {}
      mr.stop(); stream.getTracks().forEach(t => t.stop());
    }
  };
  async function finish(type) {
    await new Promise(r => setTimeout(r, sr ? 900 : 0));
    const blob = new Blob(chunks, { type }); const url = URL.createObjectURL(blob);
    const secs = Math.round((Date.now() - t0) / 1000);
    let html = '<audio controls src="' + url + '"></audio>', score = null;
    if (target) {
      if (SR && heard.trim()) {
        const r = diff(target, heard); score = r.score;
        S.wstat = S.wstat || {}; r.words.forEach(([w, o]) => { const s = S.wstat[w] = S.wstat[w] || [0, 0]; s[o ? 0 : 1]++; });
        const wpm = secs > 3 ? Math.round(norm(target).length / secs * 60) : null;
        html += '<div class="diff">' + r.html + '</div><div class="score">Corrispondenza: <b>' + score + '%</b>' + (wpm && norm(target).length > 12 ? ' · Ritmo: <b>' + wpm + ' parole al minuto</b> <span class="mute">(per leggere in modo chiaro punta a circa 130-170)</span>' : '') + '</div><div class="mute">Le parole in rosso non sono state riconosciute: riascolta e ripeti.</div>';
      } else html += '<div class="mute">Controllo automatico non disponibile (usa Chrome per averlo): riascolta e confronta con il modello.</div>';
    }
    out.innerHTML = html; st.textContent = secs + ' s';
    const ext = type.includes('mp4') ? 'm4a' : 'webm';
    const name = new Date().toISOString().replace(/[:.]/g, '-') + '_' + tag.replace(/[^A-Za-z0-9_-]/g, '') + '.' + ext;
    fetch('/api/rec?name=' + encodeURIComponent(name), { method: 'POST', body: blob }).catch(() => {});
    S.recs.push({ file: name, tag, t: new Date().toISOString(), secs }); save();
    if (onDone) onDone({ score, secs });
  }
}
const tipBox = c => D.cat[c] ? '<div class="tip"><b>' + esc(D.cat[c].nome) + '</b><br>' + esc(D.cat[c].it) + '<div class="ar">' + esc(D.cat[c].ar) + '</div></div>' : '';

/* ---------- Viste ---------- */
const VIEWS = {
  oggi: viewOggi, riscaldamento: viewRisc, ascolto: viewAscolto, ripeti: viewRipeti, scioglilingua: viewScioglilingua,
  shadowing: viewShadowing, lettura: viewLettura, parlato: viewParlato, lessico: viewLessico,
  comunita: viewComunita, progressi: viewProgressi, piano: viewPiano
};
// Attività del settimo blocco, per giorno della settimana (0 = domenica)
const ROT = {
  1: ['parlato', 'Parlato libero'], 2: ['grammatica', 'Grammatica'], 3: ['lessico', 'Lessico C1'], 4: ['ortoepia', 'Ortoepia (E/O, S, Z)'],
  5: ['intonazione', 'Intonazione'], 6: ['esame', 'Simulazione d\'esame'], 0: ['errori', 'Quaderno degli errori']
};
const GROUPS = [
  ['Oggi', []],
  ['Dizione', [['riscaldamento', 'Voce'], ['ascolto', 'Orecchio'], ['ripeti', 'Ripeti'], ['scioglilingua', 'Scioglilingua'], ['ortoepia', 'Ortoepia'], ['intonazione', 'Intonazione']]],
  ['Parlato', [['shadowing', 'Shadowing'], ['lettura', 'Lettura'], ['parlato', 'Parlato libero'], ['giornalismo', 'Giornalismo'], ['esame', 'Esame C1']]],
  ['Italiano', [['grammatica', 'Grammatica'], ['lessico', 'Lessico'], ['errori', 'Errori']]],
  ['Appunti', []],
  ['Con italiani', [['comunita', 'Comunità'], ['risorse', 'Risorse']]],
  ['Progressi', [['settimana', 'Questa settimana'], ['progressi', 'Progressi e revisione'], ['piano', 'Piano']]]
];
const GKEY = { 'Oggi': 'oggi', 'Appunti': 'appunti' };
const main = $('#main');

function route() {
  const v = (location.hash.replace('#/', '') || 'oggi');
  const fn = VIEWS[v] || viewOggi;
  const grp = GROUPS.find(g => (GKEY[g[0]] === v) || g[1].some(x => x[0] === v)) || GROUPS[0];
  $('#nav').innerHTML = GROUPS.map(g => '<a href="#/' + (GKEY[g[0]] || g[1][0][0]) + '" class="' + (g === grp ? 'on' : '') + '">' + g[0] + '</a>').join('');
  $('#subnav').innerHTML = grp[1].map(([k, n]) => '<a href="#/' + k + '" class="' + (k === v ? 'on' : '') + '">' + n + '</a>').join('');
  $('#subnav').hidden = !grp[1].length;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (window.__loopTimer) { clearInterval(window.__loopTimer); window.__loopTimer = null; }
  fn(); window.scrollTo(0, 0);
}

function weekInfo() { const w = weekNum(); return { w, s: D.settimane[w - 1], f: faseOf(w) }; }

// Saluto in base all'ora: 5-12 buongiorno, 12-18 buon pomeriggio, dopo le 18 (e di notte) buonasera
function saluto() {
  const h = new Date().getHours(), k = h >= 5 && h < 12 ? 0 : h >= 12 && h < 18 ? 1 : 2;
  return {
    it: ['Buongiorno', 'Buon pomeriggio', 'Buonasera'][k] + ' principessa ❤️',
    ar: ['صباح الخير يا أميرة ❤️', 'نهارك زين يا أميرة ❤️', 'مساء الخير يا أميرة ❤️'][k]
  };
}
// Legge il saluto in arabo con una voce araba del Mac, se c'è
function speakAr(text) {
  if (!('speechSynthesis' in window)) return;
  const v = speechSynthesis.getVoices().find(x => /^ar/i.test(x.lang));
  if (!v) return toast('Non trovo una voce araba: Impostazioni di Sistema → Accessibilità → Contenuto letto → Voci di sistema');
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text.replace(/❤️?/g, '')); u.lang = v.lang; u.voice = v; u.rate = .9; speechSynthesis.speak(u);
}

function viewOggi() {
  const { w, s, f } = weekInfo(), d = today(), done = dayDone(d), total = D.blocchi.reduce((a, b) => a + b.min, 0), mins = minutesOf(d);
  const rot = ROT[new Date().getDay()];
  main.innerHTML =
    '<div class="card"><h2 class="ar" style="text-align:center;font-size:1.9rem;margin:.1em 0">' + saluto().ar + '</h2>' +
    '<div class="mute" style="text-align:center">' + saluto().it + ' <button class="btn alt" id="sg" style="padding:2px 10px" title="Ascolta">🔊</button></div>' +
    '<div class="mute">Fase ' + f.n + ' · ' + esc(f.it) + ' · <span class="ar" style="display:inline">' + esc(f.ar) + '</span></div>' +
    '<h3>Questa settimana: ' + esc(s.it) + '</h3>' + s.cats.slice(0, 2).map(tipBox).join('') + '</div>' +
    '<div class="card"><div class="row" style="justify-content:space-between"><h3>Sessione di oggi · ' + total + ' minuti</h3><span class="mute">' + mins + ' / ' + total + ' min</span></div>' +
    '<div class="bar"><i style="width:' + Math.round(100 * mins / total) + '%"></i></div>' +
    D.blocchi.map(b => {
      const go = b.id === 'libero' ? rot[0] : b.vai;
      const label = b.id === 'libero' ? 'Oggi: ' + rot[1] : b.nome;
      return '<label class="check"><input type="checkbox" data-id="' + b.id + '" ' + (done.includes(b.id) ? 'checked' : '') + '><div style="flex:1"><b>' + esc(label) + '</b> · ' + b.min + ' min<div class="mute">' + esc(b.it) + '</div><div class="ar">' + esc(b.ar) + '</div></div><a class="btn alt" href="#/' + go + '">Vai</a></label>';
    }).join('') + '</div>' +
    '<div class="card mute">I tuoi progressi si salvano da soli nella cartella <code>dati/</code>. Una volta alla settimana apri <a href="#/progressi">Progressi</a>, compila la revisione e dillo a Claude: aggiornerà il programma.</div>';
  const sgb = $('#sg'); if (sgb) sgb.onclick = () => speakAr(saluto().ar);
  $$('input[type=checkbox]').forEach(c => c.onchange = () => {
    const dd = today(); S.days[dd] = S.days[dd] || { done: [] };
    const set = new Set(S.days[dd].done); c.checked ? set.add(c.dataset.id) : set.delete(c.dataset.id);
    S.days[dd].done = [...set]; save(); updateHeader(); viewOggi(); if (window.afterProgress) afterProgress();
  });
}

function viewRisc() {
  main.innerHTML = '<div class="card"><h2>Riscaldamento voce · 5 minuti</h2>' +
    D.riscaldamento.map((r, i) => '<div class="tip"><b>' + (i + 1) + '.</b> ' + esc(r.it) + '<div class="ar">' + esc(r.ar) + '</div></div>').join('') +
    '<div class="row"><button class="btn" id="t">Avvia timer 5:00</button><span class="big" id="clock">5:00</span><button class="btn alt" id="fin">Fatto</button></div></div>';
  let int = null;
  $('#t').onclick = () => {
    clearInterval(int); let left = 300;
    int = setInterval(() => { left--; $('#clock').textContent = Math.floor(left / 60) + ':' + pad(left % 60); if (left <= 0) { clearInterval(int); markDone('voce'); } }, 1000);
  };
  $('#fin').onclick = () => markDone('voce');
}

/* --- Orecchio: quiz di coppie minime --- */
function viewAscolto() {
  const { s } = weekInfo(); let cats = s.cats.filter(c => D.coppie.some(p => p.cat === c));
  let all = false;
  const render = () => {
    const pool = D.coppie.filter(p => all || cats.includes(p.cat)).length ? D.coppie.filter(p => all || cats.includes(p.cat)) : D.coppie;
    main.innerHTML = '<div class="card"><h2>Orecchio: quale senti?</h2>' + voiceWarn() + (cats[0] ? tipBox(cats[0]) : '') +
      '<div class="row"><span class="mute">Categoria:</span><button class="chip ' + (!all ? 'on' : '') + '" id="c1">Di questa settimana</button><button class="chip ' + (all ? 'on' : '') + '" id="c2">Tutte</button></div></div><div id="q"></div>';
    $('#c1').onclick = () => { all = false; render(); }; $('#c2').onclick = () => { all = true; render(); };
    let n = 0, right = 0;
    const next = () => {
      if (n >= 10) {
        $('#q').innerHTML = '<div class="card"><h3>Risultato: ' + right + ' su 10</h3><button class="btn" id="again">Ancora 10</button></div>';
        $('#again').onclick = () => { n = 0; right = 0; next(); }; markDone('ascolto'); return;
      }
      const p = pool[Math.floor(Math.random() * pool.length)], pick = Math.random() < .5 ? p.a : p.b, other = pick === p.a ? p.b : p.a;
      const opts = Math.random() < .5 ? [pick, other] : [other, pick];
      $('#q').innerHTML = '<div class="card" style="text-align:center"><div class="mute">Domanda ' + (n + 1) + ' di 10</div><button class="btn alt" id="rep">🔊 Riascolta</button><div class="row" style="justify-content:center;margin-top:14px">' +
        opts.map(o => '<button class="btn choice" data-w="' + esc(o) + '">' + esc(o) + '</button>').join('') + '</div><div id="fb" style="margin-top:12px"></div></div>';
      speak(pick, 0.85); $('#rep').onclick = () => speak(pick, 0.85);
      $$('.choice').forEach(b => b.onclick = () => {
        const ok = b.dataset.w === pick; right += ok ? 1 : 0; n++;
        const q = S.quiz[p.cat] = S.quiz[p.cat] || { ok: 0, tot: 0 }; q.tot++; q.ok += ok ? 1 : 0; S.qlog.push({ t: new Date().toISOString(), cat: p.cat, ok: ok ? 1 : 0 }); save();
        $('#fb').innerHTML = (ok ? '<span class="ok">Giusto ✓</span>' : '<span class="ko">Era «' + esc(pick) + '»</span>') + ' <button class="btn" id="nx">Avanti</button>';
        $$('.choice').forEach(x => x.disabled = true); $('#nx').onclick = next;
      });
    };
    next();
  };
  render();
}

/* --- Ripeti e verifica --- */
function viewRipeti() {
  const { s } = weekInfo(); const hint = sessionStorage.getItem('aya.ripcat'); sessionStorage.removeItem('aya.ripcat');
  let cat = (hint && D.frasi[hint]) ? hint : s.cats[0];
  const cats = Object.keys(D.frasi), recorded = new Set();
  const render = () => {
    main.innerHTML = '<div class="card"><h2>Ripeti e verifica</h2>' + voiceWarn() +
      '<div class="row">' + cats.map(c => '<button class="chip ' + (c === cat ? 'on' : '') + '" data-c="' + c + '">' + esc(D.cat[c].nome) + '</button>').join('') + '</div>' + tipBox(cat) +
      '<div class="mute">1) Ascolta il modello  2) Premi Registra e ripeti la frase  3) Guarda le parole in rosso.</div></div>' +
      D.frasi[cat].map((f, i) => '<div class="card"><div style="font-size:1.15rem">' + esc(f) + '</div><div class="row" style="margin-top:6px"><button class="btn alt sp" data-t="' + esc(f) + '" data-r=".95">🔊 Ascolta</button><button class="btn alt sp" data-t="' + esc(f) + '" data-r=".7">🐢 Lento</button></div><div id="r' + i + '"></div></div>').join('');
    $$('.chip').forEach(c => c.onclick = () => { cat = c.dataset.c; render(); });
    $$('.sp').forEach(b => b.onclick = () => speak(b.dataset.t, +b.dataset.r));
    D.frasi[cat].forEach((f, i) => recBox($('#r' + i), { tag: 'ripeti-' + cat, target: f, onDone: r => {
      if (r.score !== null) { S.speech.push({ t: new Date().toISOString(), cat, score: r.score }); save(); }
      recorded.add(i); if (recorded.size >= 3) markDone('ripeti');
    } }));
  };
  render();
}

/* --- Scioglilingua --- */
function viewScioglilingua() {
  const done = new Set();
  main.innerHTML = '<div class="card"><h2>Scioglilingua</h2><div class="mute">Prima lento e chiaro, poi sempre più veloce. La chiarezza vale più della velocità.</div>' + voiceWarn() + '</div>' +
    D.scioglilingua.map((s, i) => '<div class="card"><div style="font-size:1.15rem">' + esc(s.t) + '</div><div class="row" style="margin:6px 0"><button class="btn alt sp" data-t="' + esc(s.t) + '" data-r=".7">🐢 Lento</button><button class="btn alt sp" data-t="' + esc(s.t) + '" data-r="1.1">⚡ Veloce</button></div><div id="s' + i + '"></div></div>').join('');
  $$('.sp').forEach(b => b.onclick = () => speak(b.dataset.t, +b.dataset.r));
  D.scioglilingua.forEach((s, i) => recBox($('#s' + i), { tag: 'scioglilingua', target: s.t, onDone: r => {
    if (r.score !== null) { S.speech.push({ t: new Date().toISOString(), cat: s.cat, score: r.score }); save(); }
    done.add(i); if (done.size >= 2) markDone('scioglilingua');
  } }));
}

/* --- Shadowing --- */
let ytP = null, ytLoad = null;
function loadYT() {
  if (ytLoad) return ytLoad;
  ytLoad = new Promise((res, rej) => {
    if (window.YT && YT.Player) return res();
    const sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; sc.onerror = () => rej(new Error('offline'));
    window.onYouTubeIframeAPIReady = () => res(); document.head.appendChild(sc); setTimeout(() => rej(new Error('timeout')), 9000);
  });
  return ytLoad;
}
function viewShadowing() {
  let filt = 'tutti';
  const cats = ['tutti', ...Object.keys(D.catVideo)];
  main.innerHTML = '<div class="card"><h2>Shadowing</h2><div class="tip">Ascolta una frase, poi ripetila <b>subito dopo</b>, con lo stesso ritmo e la stessa intonazione. Usa A–B per ripetere un passaggio di 5–10 secondi. Metti le cuffie quando registri.' +
    '<div class="ar">اسمع جملة، وبعدين عاودها مباشرة بنفس الإيقاع والتنغيم. استعمل A–B باش تعاود مقطع قصير. لبس السمّاعات كي تسجّل.</div></div>' +
    '<div class="row" id="chips"></div></div>' +
    '<div class="card" id="player" hidden></div><div id="list"></div>' +
    '<div class="card"><h3>Registra il tuo shadowing</h3><div id="shrec"></div></div>' +
    '<div class="card"><h3>Video scaricato (licenza libera)</h3>' + D.locali.map(l =>
      '<div style="margin:8px 0"><b>' + esc(l.titolo) + '</b> · ' + esc(l.autore) + ' · ' + esc(l.licenza) + ' · <a href="' + esc(l.fonte) + '" target="_blank" rel="noopener">fonte</a><div class="mute">' + esc(l.nota) + '</div>' +
      '<video controls src="' + esc(l.file) + '" style="width:100%;border-radius:12px" id="la"></video><div class="row"><span class="mute">Velocità</span><select id="lsp"><option>0.75</option><option selected>1</option><option>1.25</option></select></div></div>').join('') + '</div>';
  recBox($('#shrec'), { tag: 'shadowing', onDone: () => markDone('shadowing') });
  const ls = $('#lsp'); if (ls) ls.onchange = () => { $('#la').playbackRate = +ls.value; };
  const draw = () => {
    $('#chips').innerHTML = cats.map(c => '<button class="chip ' + (c === filt ? 'on' : '') + '" data-c="' + c + '">' + (c === 'tutti' ? 'Tutti' : esc(D.catVideo[c])) + '</button>').join('');
    $$('#chips .chip').forEach(b => b.onclick = () => { filt = b.dataset.c; draw(); });
    $('#list').innerHTML = '<div class="grid">' + D.video.filter(v => filt === 'tutti' || v.cat === filt).map(v =>
      '<div class="card" style="margin:0"><b>' + esc(v.titolo) + '</b><div class="mute">' + esc(v.canale) + ' · ' + esc(v.dur) + (v.lingua === 'fr' ? ' · 🇫🇷' : '') + '</div>' + (v.nota ? '<div class="mute">' + esc(v.nota) + '</div>' : '') +
      '<div class="row" style="margin-top:8px"><button class="btn play" data-id="' + v.id + '">▶ Guarda qui</button><a href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener">YouTube</a></div></div>').join('') + '</div>';
    $$('.play').forEach(b => b.onclick = () => openVideo(b.dataset.id));
  };
  draw();
}
async function openVideo(id) {
  const box = $('#player'); box.hidden = false; box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  box.innerHTML = '<div id="yt"><div id="ytp"></div></div><div class="row" style="margin-top:10px">' +
    '<span class="mute">Velocità</span><select id="spd"><option>0.5</option><option>0.75</option><option selected>1</option></select>' +
    '<button class="btn alt" id="mA">Segna A</button><button class="btn alt" id="mB">Segna B</button><button class="btn" id="loop">Ripeti A–B</button><button class="btn alt" id="stopL">Ferma ripetizione</button><span class="mute" id="ab"></span></div>' +
    '<div class="mute" id="yterr"></div>';
  let A = null, B = null, looping = false;
  try {
    await loadYT();
    if (ytP && ytP.destroy) { try { ytP.destroy(); } catch (e) {} }
    $('#yt').innerHTML = '<div id="ytp"></div>';
    ytP = new YT.Player('ytp', { videoId: id, width: '100%', height: '100%', playerVars: { rel: 0, playsinline: 1, origin: location.origin },
      events: { onError: () => { $('#yterr').innerHTML = 'Questo video non si può incorporare. <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + id + '">Aprilo su YouTube</a>'; } } });
  } catch (e) {
    $('#yt').innerHTML = ''; $('#yterr').innerHTML = 'Non riesco a caricare YouTube (sei online?). <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=' + id + '">Aprilo su YouTube</a>'; return;
  }
  $('#spd').onchange = e => { try { ytP.setPlaybackRate(+e.target.value); } catch (x) {} };
  const lab = () => { $('#ab').textContent = 'A: ' + (A === null ? '–' : A.toFixed(1)) + ' s · B: ' + (B === null ? '–' : B.toFixed(1)) + ' s'; };
  $('#mA').onclick = () => { A = ytP.getCurrentTime(); lab(); };
  $('#mB').onclick = () => { B = ytP.getCurrentTime(); lab(); };
  $('#loop').onclick = () => {
    if (A === null || B === null || B <= A) return toast('Segna prima A e poi B, con B dopo A');
    looping = true; ytP.seekTo(A, true); ytP.playVideo();
    clearInterval(window.__loopTimer); window.__loopTimer = setInterval(() => { if (looping && ytP.getCurrentTime() >= B) ytP.seekTo(A, true); }, 200);
  };
  $('#stopL').onclick = () => { looping = false; clearInterval(window.__loopTimer); };
}

/* --- Lettura registrata --- */
function viewLettura() {
  const { w } = weekInfo();
  let idx = w === 1 || w === 20 ? 0 : Math.min(D.letture.length - 1, 1 + ((w - 2) % (D.letture.length - 1)));
  const render = () => {
    const L = D.letture[idx];
    main.innerHTML = '<div class="card"><h2>Lettura registrata</h2><div class="row">' + D.letture.map((l, i) => '<button class="chip ' + (i === idx ? 'on' : '') + '" data-i="' + i + '">' + esc(l.id) + '</button>').join('') + '</div>' +
      '<h3>' + esc(L.titolo) + '</h3><div class="mute">' + esc(L.nota) + '</div><p style="font-size:1.2rem;line-height:1.9">' + esc(L.t) + '</p>' +
      '<div class="row"><button class="btn alt" id="mod">🔊 Modello (voce del Mac)</button><button class="btn alt" id="mods">🐢 Lento</button></div>' + voiceWarn() + '<div id="lr"></div>' +
      '<div class="tip">Dopo la lettura, valuta te stessa: <select id="rate"><option value="">–</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select> chiarezza (1 = poco chiara, 5 = molto chiara)</div>' +
      '<div class="mute">Consiglio: leggi prima in silenzio, sottolinea le pause con una barretta, poi registra. Il modello del Mac è una voce sintetica, utile per le parole ma non per l\'intonazione: per l\'intonazione usa lo shadowing.</div></div>';
    $$('.chip').forEach(c => c.onclick = () => { idx = +c.dataset.i; render(); });
    $('#mod').onclick = () => speak(L.t, .95); $('#mods').onclick = () => speak(L.t, .7);
    recBox($('#lr'), { tag: 'lettura-' + L.id, target: L.t, onDone: r => {
      if (r.score !== null) { S.speech.push({ t: new Date().toISOString(), cat: 'lettura', score: r.score, testo: L.id }); save(); }
      markDone('lettura');
    } });
    $('#rate').onchange = e => { if (e.target.value) { S.ratings['lettura-' + L.id + '-' + today()] = +e.target.value; save(); toast('Salvato'); } };
  };
  render();
}

/* --- Parlato libero --- */
function viewParlato() {
  const day = Math.floor((new Date(today()) - new Date(S.start)) / 864e5), arg = D.argomenti[((day % D.argomenti.length) + D.argomenti.length) % D.argomenti.length];
  main.innerHTML = '<div class="card"><h2>Parlato libero · 2 minuti</h2><div class="tip" style="font-size:1.15rem"><b>Argomento di oggi:</b> ' + esc(arg) + '</div>' +
    '<div class="mute">Usa questi connettori almeno 3 volte: ' + D.connettori.map(c => '<b>' + esc(c) + '</b>').join(', ') + '.</div>' +
    '<div class="ar">احكي دقيقتين من غير ما توقف. إذا نسيت كلمة، اشرحها بكلمات أخرى بالإيطالية (موش بالعربية ولا الفرنسية).</div>' +
    '<div id="pr"></div><div class="tip">Riascoltati e rispondi: ho parlato senza fermarmi? ho usato i connettori? <select id="fl"><option value="">Fluidità –</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div></div>';
  recBox($('#pr'), { tag: 'parlato', onDone: () => markDone('libero') });
  $('#fl').onchange = e => { if (e.target.value) { S.ratings['fluidita-' + today()] = +e.target.value; save(); toast('Salvato'); } };
}

/* --- Lessico --- */
function viewLessico() {
  const pool = D.lessico.filter(w => S.words[w.p] !== 'ok');
  const list = pool.length ? pool : D.lessico; let n = 0;
  const render = () => {
    const w = list[Math.floor(Math.random() * list.length)];
    main.innerHTML = '<div class="card"><h2>Lessico C1</h2><div class="mute">Parole sapute: ' + Object.values(S.words).filter(x => x === 'ok').length + ' / ' + D.lessico.length + '</div>' +
      '<div class="flash">' + esc(w.p) + '</div><div id="rv" class="tip" hidden><b>' + esc(w.d) + '</b><br><i>' + esc(w.e) + '</i></div>' +
      '<div class="row"><button class="btn alt" id="show">Mostra il significato</button><button class="btn alt" id="say">🔊</button><button class="btn" id="yes">La sapevo</button><button class="btn alt" id="no">Da rivedere</button></div>' +
      '<div class="mute" style="margin-top:8px">Dopo il significato, di\' ad alta voce una tua frase con la parola.</div></div>';
    $('#show').onclick = () => { $('#rv').hidden = false; }; $('#say').onclick = () => speak(w.p + '. ' + w.e);
    const next = ok => { S.words[w.p] = ok ? 'ok' : 'rivedere'; n++; save(); if (n >= 10) markDone('libero'); render(); };
    $('#yes').onclick = () => next(true); $('#no').onclick = () => next(false);
  };
  render();
}

/* --- Con italiani --- */
function viewComunita() {
  main.innerHTML = '<div class="card"><h2>Esercitarti con italiani</h2><div class="tip"><b>Missione settimanale:</b> due conversazioni da 15 minuti con madrelingua italiani. Dopo ognuna, scrivi 3 parole o espressioni nuove e 1 errore che ti hanno corretto.' +
    '<div class="ar">المهمة الأسبوعية: محادثتين، 15 دقيقة كل وحدة، مع إيطاليين. بعد كل وحدة اكتب 3 كلمات جداد وغلطة وحدة صحّحوهالك.</div></div>' +
    '<h3>Server Discord</h3>' + D.comunita.server.map(s => '<div style="margin:8px 0"><a href="' + esc(s.url) + '" target="_blank" rel="noopener"><b>' + esc(s.nome) + '</b></a><div class="mute">' + esc(s.nota) + '</div></div>').join('') +
    '<h3>App di scambio linguistico</h3>' + D.comunita.app.map(s => '<div style="margin:8px 0"><a href="' + esc(s.url) + '" target="_blank" rel="noopener"><b>' + esc(s.nome) + '</b></a><div class="mute">' + esc(s.nota) + '</div></div>').join('') +
    '<div class="tip"><b>Prima di entrare:</b> questi link vengono da elenchi pubblici e non li ho potuti verificare dall\'interno. Leggi le regole del server, usa un nome utente (non il tuo nome completo), non condividere indirizzo, documenti o numero di telefono, e esci se qualcuno ti mette a disagio. Se un server non va, dimmelo e ne cerco un altro.' +
    '<div class="ar">قبل ما تدخل: اقرا قوانين السيرفر، استعمل اسم مستعار، وما تعطيش عنوانك ولا أوراقك ولا نمرة تليفونك. إذا واحد خلاك ما ترتاحش، اخرج.</div></div></div>';
}

/* --- Progressi e revisione settimanale --- */
function viewProgressi() {
  const days = Object.keys(S.days).filter(d => minutesOf(d) > 0), totalMin = days.reduce((a, d) => a + minutesOf(d), 0);
  const w = weekNum(), quizRows = Object.keys(D.cat).filter(c => S.quiz[c]).map(c => {
    const q = S.quiz[c], p = Math.round(100 * q.ok / q.tot);
    return '<tr><td>' + esc(D.cat[c].nome) + '</td><td style="width:50%"><div class="bar"><i style="width:' + p + '%"></i></div></td><td>' + p + '% (' + q.tot + ')</td></tr>';
  }).join('');
  const sp = S.speech.slice(-20), avg = sp.length ? Math.round(sp.reduce((a, x) => a + x.score, 0) / sp.length) : null;
  const rev = S.ratings['rev-' + w] || {};
  main.innerHTML = '<div class="card"><h2>I tuoi progressi</h2><div class="stats">' +
    '<div class="stat"><div class="big">' + days.length + '</div>giorni di pratica</div>' +
    '<div class="stat"><div class="big">' + Math.round(totalMin / 60 * 10) / 10 + ' h</div>ore totali</div>' +
    '<div class="stat"><div class="big">' + streak() + '</div>giorni di fila</div>' +
    '<div class="stat"><div class="big">' + S.recs.length + '</div>registrazioni</div>' +
    '<div class="stat"><div class="big">' + (avg === null ? '–' : avg + '%') + '</div>corrispondenza media (ultime 20)</div></div></div>' +
    '<div class="card"><h3>Orecchio: risposte giuste per categoria</h3>' + (quizRows ? '<table>' + quizRows + '</table>' : '<div class="mute">Fai qualche quiz nella sezione Orecchio.</div>') + '</div>' +
    '<div class="card"><h3>Revisione della settimana ' + w + '</h3><div class="mute">Compilala il sabato o la domenica. Poi di\' a Claude: «Fai la revisione settimanale».</div>' +
    ['chiarezza', 'ritmo', 'scioltezza', 'fiducia'].map(k => '<div class="row" style="margin:6px 0"><span style="width:110px">' + k[0].toUpperCase() + k.slice(1) + '</span><select data-k="' + k + '"><option value="">–</option>' + [1, 2, 3, 4, 5].map(n => '<option ' + (rev[k] == n ? 'selected' : '') + '>' + n + '</option>').join('') + '</select></div>').join('') +
    '<div class="mute">1 = molto difficile, 5 = molto bene</div>' +
    '<p>Cosa è stato più difficile questa settimana?</p><textarea id="dif" rows="3">' + esc(rev.difficile || '') + '</textarea>' +
    '<p>Cosa vuoi di più o di meno nel programma?</p><textarea id="vol" rows="3">' + esc(rev.vorrei || '') + '</textarea>' +
    '<div class="row" style="margin-top:8px"><button class="btn" id="svr">Salva revisione</button><button class="btn alt" id="cp">Copia riepilogo</button></div></div>';
  $('#svr').onclick = () => {
    const r = { difficile: $('#dif').value, vorrei: $('#vol').value };
    $$('select[data-k]').forEach(s => { if (s.value) r[s.dataset.k] = +s.value; });
    S.ratings['rev-' + w] = r; save(); toast('Revisione salvata ✓');
  };
  $('#cp').onclick = () => {
    const txt = 'Settimana ' + w + ': ' + days.length + ' giorni di pratica, ' + Math.round(totalMin / 60 * 10) / 10 + ' ore, corrispondenza media ' + (avg === null ? 'n.d.' : avg + '%') + '. Difficile: ' + ($('#dif').value || '-') + '. Vorrei: ' + ($('#vol').value || '-');
    navigator.clipboard.writeText(txt).then(() => toast('Copiato'));
  };
}

/* --- Piano --- */
function viewPiano() {
  const w = weekNum();
  main.innerHTML = '<div class="card"><h2>Piano di 20 settimane</h2><div class="row"><span>Data di inizio:</span><input type="date" id="st" value="' + esc(S.start) + '" style="width:auto"></div></div>' +
    D.fasi.map(f => '<div class="card"><h3>Fase ' + f.n + ' · ' + esc(f.it) + ' <span class="ar" style="display:inline">· ' + esc(f.ar) + '</span></h3><table>' +
      D.settimane.slice(f.sett[0] - 1, f.sett[1]).map((s, i) => '<tr class="' + (f.sett[0] + i === w ? 'cur' : '') + '"><td style="width:90px">Sett. ' + (f.sett[0] + i) + '</td><td>' + esc(s.it) + '</td></tr>').join('') + '</table></div>').join('') +
    '<div class="card"><h3>Aggiornamenti del programma</h3>' + D.aggiornamenti.map(a => '<div><b>' + esc(a.data) + '</b> · ' + esc(a.testo) + '</div>').join('') + '</div>';
  $('#st').onchange = e => { if (e.target.value) { S.start = e.target.value; save(); updateHeader(); viewPiano(); } };
}

/* ---------- Avvio ---------- */
window.addEventListener('hashchange', route);
load().then(() => { updateHeader(); route(); });
