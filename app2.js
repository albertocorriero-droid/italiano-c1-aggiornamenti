'use strict';
/* Moduli aggiuntivi: grammatica, ortoepia, intonazione, giornalismo, esame, errori, appunti,
   settimana, risorse, lessico a ripetizione, premio e blocco appunti rapido. */

const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const TOTAL_MIN = D.blocchi.reduce((a, b) => a + b.min, 0);
const lessicoAll = () => D.lessico.concat(D.lessicoExtra || []);
const totalHours = () => Object.keys(S.days).reduce((a, d) => a + minutesOf(d), 0) / 60;

/* ---------- Settimane: date e statistiche ---------- */
function weekDates(w) {
  const a = new Date(S.start); a.setDate(a.getDate() + 7 * (w - 1));
  return [...Array(7)].map((_, i) => { const d = new Date(a); d.setDate(a.getDate() + i); return dstr(d); });
}
const inWeek = (iso, dates) => dates.includes(dstr(new Date(iso)));
function weekStats(w) {
  const dates = weekDates(w), mins = dates.map(minutesOf), blocks = dates.reduce((a, d) => a + dayDone(d).length, 0);
  const sp = S.speech.filter(x => inWeek(x.t, dates)), ql = S.qlog.filter(x => inWeek(x.t, dates)), gl = (S.glog || []).filter(x => inWeek(x.t, dates));
  return {
    w, dates, mins, total: mins.reduce((a, b) => a + b, 0), days60: mins.filter(m => m >= TOTAL_MIN).length, daysAny: mins.filter(m => m > 0).length, blocks,
    speechAvg: sp.length ? Math.round(sp.reduce((a, x) => a + x.score, 0) / sp.length) : null, speechN: sp.length,
    quizPct: ql.length ? Math.round(100 * ql.reduce((a, x) => a + x.ok, 0) / ql.length) : null, quizN: ql.length,
    gramPct: gl.length ? Math.round(100 * gl.reduce((a, x) => a + x.ok, 0) / gl.length) : null, gramN: gl.length,
    recs: S.recs.filter(r => inWeek(r.t, dates)).length
  };
}
function refreshWeekly() {
  const st = weekStats(weekNum());
  S.weekly[st.w] = { minuti: st.total, giorniCompleti: st.days60, giorniDiPratica: st.daysAny, attivita: st.blocks, corrispondenzaMedia: st.speechAvg, quizGiusti: st.quizPct, grammaticaGiuste: st.gramPct, registrazioni: st.recs };
  save();
}

/* ---------- Premio: complimenti e coriandoli ---------- */
function improvement() {
  const w = weekNum(); if (w < 2) return 0;
  const a = weekStats(w), b = weekStats(w - 1);
  return (a.speechAvg !== null && b.speechAvg !== null) ? a.speechAvg - b.speechAvg : 0;
}
function compliment() {
  const P = D.premi, s = streak(), tot = totalHours(), parts = [pick(P.base)];
  if (P.serie[s]) parts.push(P.serie[s]);
  const hit = Object.keys(P.ore).map(Number).filter(h => tot >= h && !S.premi['ore' + h]).pop();
  if (hit) { S.premi['ore' + hit] = true; parts.push(P.ore[hit]); }
  if (weekStats(weekNum()).days60 === 5) parts.push(P.settimana);
  const imp = improvement(); if (imp >= 3) parts.push(P.miglioramento.replace('{n}', imp));
  return { it: parts.join(' '), ar: pick(P.baseAr) };
}
function confetti() {
  const c = document.createElement('canvas'); c.id = 'confetti'; c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
  const x = c.getContext('2d'), cols = ['#0e7c6b', '#e07a3f', '#f2c14e', '#3fc2ab', '#d9534f', '#5b8def'];
  const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, r: 4 + Math.random() * 6, v: 2 + Math.random() * 4, s: Math.random() * 2 - 1, c: pick(cols), a: Math.random() * 6 }));
  let t0 = performance.now();
  (function f(t) {
    x.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.y += p.v; p.x += p.s * 2 + Math.sin(p.a += .1); x.fillStyle = p.c; x.fillRect(p.x, p.y, p.r, p.r * 1.6); });
    if (t - t0 < 3800) requestAnimationFrame(f); else c.remove();
  })(t0);
}
function showPremio() {
  const w = weekNum(), st = weekStats(w), cmp = compliment();
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="box"><div class="trophy">🏆</div><h2>Ora completata, Aya!</h2>
    <p style="font-size:1.1rem">${esc(cmp.it)}</p><div class="ar" style="text-align:center">${esc(cmp.ar)}</div>
    <div class="row" style="justify-content:center;margin:12px 0"><span class="pill">🔥 ${streak()} ${streak() === 1 ? 'giorno' : 'giorni'} di fila</span><span class="pill">⏱ ${Math.round(totalHours() * 10) / 10} ore totali</span><span class="pill">📅 ${st.days60}/5 giorni completi questa settimana</span></div>
    <div class="row" style="justify-content:center"><button class="btn" id="mok">Grazie!</button><a class="btn alt" href="#/settimana" id="mws">La mia settimana</a></div></div>`;
  document.body.appendChild(m); confetti();
  const close = () => m.remove(); $('#mok', m).onclick = close; $('#mws', m).onclick = close; m.onclick = e => { if (e.target === m) close(); };
}
window.afterProgress = function () {
  refreshWeekly();
  const d = today();
  if (minutesOf(d) >= TOTAL_MIN && !S.premi[d]) { S.premi[d] = true; save(); setTimeout(showPremio, 350); }
};

/* ---------- Esercizi a scelta multipla riusabili ---------- */
function mcq(host, items, o = {}) {
  const list = shuffle(items).slice(0, o.n || items.length); let i = 0, ok = 0;
  const step = () => {
    if (i >= list.length) {
      host.innerHTML = `<div class="card"><h3>Risultato: ${ok} su ${list.length}</h3><div class="mute">${ok === list.length ? 'Perfetto!' : ok >= list.length * .7 ? 'Molto bene.' : 'Ripassa la regola e riprova.'}</div><div class="row" style="margin-top:8px"><button class="btn" id="again">Rifai</button></div></div>`;
      $('#again', host).onclick = () => mcq(host, items, o); if (o.onEnd) o.onEnd(ok, list.length); return;
    }
    const it = list[i], order = shuffle(it.o.map((_, k) => k));
    host.innerHTML = `<div class="card"><div class="mute">Domanda ${i + 1} di ${list.length}</div><div class="q">${esc(it.q).replace('___', '<b>_____</b>')}</div>
      <div class="row" style="margin-top:10px">${order.map(k => `<button class="btn alt opt" data-k="${k}">${esc(it.o[k])}</button>`).join('')}</div><div id="fb" style="margin-top:10px"></div></div>`;
    $$('.opt', host).forEach(b => b.onclick = () => {
      const good = +b.dataset.k === it.a; ok += good ? 1 : 0; i++;
      $$('.opt', host).forEach(x => { x.disabled = true; if (+x.dataset.k === it.a) { x.classList.remove('alt'); } });
      $('#fb', host).innerHTML = `<div class="${good ? 'ok' : 'ko'}">${good ? 'Giusto ✓' : 'Non proprio'}</div><div>${esc(it.w || '')}</div><button class="btn" id="nx" style="margin-top:8px">Avanti</button>`;
      $('#nx', host).onclick = step; if (o.onAnswer) o.onAnswer(good, it);
    });
  };
  step();
}

/* ---------- Grammatica ---------- */
function viewGrammatica() {
  const w = weekNum(), cur = D.gramSett[w - 1];
  let id = sessionStorage.getItem('aya.gram') || cur;
  const render = () => {
    const t = D.grammatica.find(x => x.id === id) || D.grammatica[0]; sessionStorage.setItem('aya.gram', t.id);
    const st = S.gram[t.id] || { ok: 0, tot: 0 };
    main.innerHTML = `<div class="card"><h2>Grammatica C1</h2><div class="mute">Argomento della settimana ${w}: <b>${esc(D.grammatica.find(x => x.id === cur).nome)}</b></div>
      <div class="row" style="margin-top:8px">${D.grammatica.map(g => { const s = S.gram[g.id]; const p = s && s.tot ? Math.round(100 * s.ok / s.tot) + '%' : '–'; return `<button class="chip ${g.id === t.id ? 'on' : ''}" data-g="${g.id}">${esc(g.nome.split(' e ')[0].split(',')[0])} · ${p}</button>`; }).join('')}</div></div>
      <div class="card"><h3>${esc(t.nome)}</h3><ul>${t.regola.map(r => `<li>${esc(r)}</li>`).join('')}</ul><div class="tip"><div class="ar">${esc(t.ar)}</div></div>
      <details><summary>Errori tipici da evitare</summary>${t.errori.map((e, i) => `<div class="row" style="margin:6px 0"><span class="ko">${esc(e[0])}</span><span>→</span><span class="ok">${esc(e[1])}</span><button class="btn alt addE" data-i="${i}">+ Quaderno</button></div>`).join('')}</details>
      <div class="mute" style="margin-top:6px">Risposte giuste finora: ${st.ok} / ${st.tot}</div></div><div id="ex"></div>`;
    $$('.chip').forEach(c => c.onclick = () => { id = c.dataset.g; render(); });
    $$('.addE').forEach(b => b.onclick = () => { const e = t.errori[+b.dataset.i]; addError(e[0], e[1], t.nome); toast('Aggiunto al Quaderno degli errori'); });
    mcq($('#ex'), t.es, { n: 8, onAnswer: (good) => { const s = S.gram[t.id] = S.gram[t.id] || { ok: 0, tot: 0 }; s.tot++; s.ok += good ? 1 : 0; (S.glog = S.glog || []).push({ t: new Date().toISOString(), topic: t.id, ok: good ? 1 : 0 }); save(); }, onEnd: () => { markDone('libero'); } });
  };
  render();
}

/* ---------- Ortoepia ---------- */
function viewOrtoepia() {
  const O = D.ortoepia; let tab = 'vocali';
  const draw = () => {
    main.innerHTML = `<div class="card"><h2>Ortoepia</h2><div class="tip">${esc(O.nota)}</div>
      <div class="row">${[['vocali', 'E e O: aperte o chiuse'], ['sz', 'S e Z'], ['rad', 'Raddoppiamento']].map(([k, n]) => `<button class="chip ${k === tab ? 'on' : ''}" data-t="${k}">${n}</button>`).join('')}</div></div><div id="body"></div>`;
    $$('.chip').forEach(c => c.onclick = () => { tab = c.dataset.t; draw(); });
    const b = $('#body');
    if (tab === 'vocali') {
      b.innerHTML = `<div class="card"><h3>Regole utili</h3><ul>${O.regoleVocali.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
        <div class="tip"><div class="ar">الـ E والـ O عندهم صوتين: مفتوح (è, ò) ومسكّر (é, ó). الأحرف اللي موش عليها نبر دايما مسكّرة. الأحسن تحفظ الكلمات الشائعة.</div></div>
        <details><summary>Coppie in cui l'accento cambia il significato</summary>${O.coppieAccento.map(c => `<div style="margin:6px 0">${esc(c.a)} · ${esc(c.b)}</div>`).join('')}</details></div><div id="qq"></div>`;
      const items = O.vocali.map(x => ({ q: `Nella parola «${x.w}», la ${x.v.toUpperCase()} accentata è…`, o: ['aperta', 'chiusa'], a: x.k === 'a' ? 0 : 1, w: x.n || `«${x.w}»: ${x.v.toUpperCase()} ${x.k === 'a' ? 'aperta' : 'chiusa'}.` }));
      mcq($('#qq'), items, { n: 10, onAnswer: g => { const q = S.quiz.ortoepia = S.quiz.ortoepia || { ok: 0, tot: 0 }; q.tot++; q.ok += g ? 1 : 0; S.qlog.push({ t: new Date().toISOString(), cat: 'ortoepia', ok: g ? 1 : 0 }); save(); }, onEnd: () => markDone('libero') });
    } else if (tab === 'sz') {
      b.innerHTML = `<div class="card"><h3>Regole utili</h3><ul>${O.regoleSZ.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div><div id="qq"></div>`;
      const items = O.sz.map(x => ({ q: `Nella parola «${x.w}», la S è…`, o: ['sorda (come in «sole»)', 'sonora (come in «rosa» al Nord)'], a: x.k === 's' ? 0 : 1, w: x.k === 's' ? 'S sorda: a inizio parola, doppia o dopo consonante.' : 'S sonora: prima di b, d, g, l, m, n, r, v.' }));
      mcq($('#qq'), items, { n: 10, onAnswer: g => { const q = S.quiz.ortoepia = S.quiz.ortoepia || { ok: 0, tot: 0 }; q.tot++; q.ok += g ? 1 : 0; S.qlog.push({ t: new Date().toISOString(), cat: 'ortoepia', ok: g ? 1 : 0 }); save(); }, onEnd: () => markDone('libero') });
    } else {
      b.innerHTML = `<div class="card"><h3>Raddoppiamento fonosintattico</h3><div class="tip">${esc(O.raddoppiamento.nota)}</div>${O.raddoppiamento.es.map((e, i) => `<div class="card" style="margin:8px 0"><b>${esc(e)}</b><div id="rf${i}"></div></div>`).join('')}</div>`;
      O.raddoppiamento.es.forEach((e, i) => recBox($('#rf' + i), { tag: 'raddoppiamento', onDone: () => markDone('libero') }));
    }
  };
  draw();
}

/* ---------- Intonazione ---------- */
function viewIntonazione() {
  const cur = new Set();
  main.innerHTML = `<div class="card"><h2>Intonazione</h2><div class="tip">Una buona intonazione è metà della dizione. Ascolta il modello, poi registra e riascoltati: la melodia della frase deve salire o scendere dove serve. La voce sintetica del Mac è utile per le parole, meno per la melodia: per quella usa lo shadowing con persone vere.</div>${voiceWarn()}</div>` +
    D.intonazione.map((t, i) => `<div class="card"><h3>${esc(t.nome)}</h3><div>${esc(t.it)}</div><div class="ar">${esc(t.ar)}</div>
      ${t.f.map((f, j) => `<div style="margin:10px 0 2px"><span class="q">${esc(f)}</span> <button class="btn alt sp" data-t="${esc(f)}">🔊</button></div><div id="in${i}_${j}"></div>`).join('')}</div>`).join('') +
    `<div class="card"><h2>Segna le pause</h2><div class="mute">${esc(D.pause.istruzioni)}</div><div class="row" id="ptx"></div><div class="q" id="ptxt" style="margin-top:10px"></div><div id="prec"></div></div>`;
  $$('.sp').forEach(b => b.onclick = () => speak(b.dataset.t, .9));
  D.intonazione.forEach((t, i) => t.f.forEach((f, j) => recBox($(`#in${i}_${j}`), { tag: 'intonazione-' + t.id, target: f, onDone: r => { if (r.score !== null) { S.speech.push({ t: new Date().toISOString(), cat: 'ritmo', score: r.score }); save(); } cur.add(i + '_' + j); if (cur.size >= 3) markDone('libero'); } })));
  let tid = D.pause.testi[0];
  const drawP = () => {
    const L = D.letture.find(l => l.id === tid);
    $('#ptx').innerHTML = D.pause.testi.map(id => `<button class="chip ${id === tid ? 'on' : ''}" data-id="${id}">${id}</button>`).join('');
    $$('#ptx .chip').forEach(c => c.onclick = () => { tid = c.dataset.id; drawP(); });
    const words = L.t.split(/\s+/); const st = words.map(() => 0);
    const paint = () => { $('#ptxt').innerHTML = words.map((w, k) => `<span class="pw" data-k="${k}" style="cursor:pointer">${esc(w)}${st[k] === 1 ? ' <b style="color:var(--acc2)">/</b>' : st[k] === 2 ? ' <b style="color:var(--ko)">//</b>' : ''}</span>`).join(' '); $$('.pw').forEach(s => s.onclick = () => { const k = +s.dataset.k; st[k] = (st[k] + 1) % 3; paint(); }); };
    paint(); recBox($('#prec'), { tag: 'pause-' + tid, target: L.t, onDone: () => markDone('libero') });
  };
  drawP();
}

/* ---------- Giornalismo ---------- */
function viewGiornalismo() {
  const G = D.giornalismo;
  main.innerHTML = `<div class="card"><h2>Giornalismo e radio</h2><div class="mute">Leggere titoli, lanci e domande in modo professionale.</div></div>
    <div class="card"><h3>1. Titoli</h3><div class="tip">${esc(G.titoliNota)}</div>${G.titoli.map((t, i) => `<div class="row" style="margin:6px 0"><span class="q" style="flex:1">${esc(t)}</span><button class="btn alt sp" data-t="${esc(t)}">🔊</button></div>`).join('')}<div id="gt"></div><div class="mute">Registra tutti i titoli di seguito, con una pausa tra l'uno e l'altro.</div></div>
    <div class="card"><h3>2. Lanci</h3><div class="tip">${esc(G.cinqueWNota)}<div class="row" style="margin-top:6px">${G.cinqueW.map(w => `<span class="pill">${esc(w)}</span>`).join('')}</div></div>${G.lanci.map((l, i) => `<div style="margin:12px 0"><div class="q">${esc(l)}</div><div class="row"><button class="btn alt sp" data-t="${esc(l)}">🔊</button></div><div id="gl${i}"></div></div>`).join('')}</div>
    <div class="card"><h3>3. Formule da giornale radio</h3><div class="row">${G.formule.map(f => `<span class="pill">${esc(f)}</span>`).join('')}</div><div class="mute" style="margin-top:6px">Usale per aprire un tuo lancio di 30 secondi e registralo nella sezione Parlato libero.</div></div>
    <div class="card"><h3>4. L'intervista</h3><div class="tip">${esc(G.note)}</div>${G.domande.map(d => `<div class="q">• ${esc(d)}</div>`).join('')}
    <h3 style="margin-top:14px">Trasforma la domanda chiusa in una domanda aperta</h3>${G.riformula.map((r, i) => `<div style="margin:8px 0"><b>${esc(r.c)}</b> <button class="btn alt rv" data-i="${i}">Mostra una soluzione</button><div id="rf${i}" class="ok" hidden>${esc(r.a)}</div></div>`).join('')}</div>`;
  $$('.sp').forEach(b => b.onclick = () => speak(b.dataset.t, .95));
  $$('.rv').forEach(b => b.onclick = () => { $('#rf' + b.dataset.i).hidden = false; });
  recBox($('#gt'), { tag: 'titoli', target: G.titoli.join('. '), onDone: () => markDone('lettura') });
  G.lanci.forEach((l, i) => recBox($('#gl' + i), { tag: 'lancio', target: l, onDone: r => { if (r.score !== null) { S.speech.push({ t: new Date().toISOString(), cat: 'ritmo', score: r.score }); save(); } markDone('lettura'); } }));
}

/* ---------- Esame orale C1 ---------- */
function viewEsame() {
  const E = D.esame; let part = 0; const sel = {};
  const timer = (el, sec, done) => { let left = sec; el.textContent = Math.floor(left / 60) + ':' + pad(left % 60); const iv = setInterval(() => { left--; el.textContent = Math.floor(Math.max(0, left) / 60) + ':' + pad(Math.max(0, left) % 60); if (left <= 0) { clearInterval(iv); if (done) done(); } }, 1000); return iv; };
  const drawPart = () => {
    if (part === 0) {
      main.innerHTML = `<div class="card"><h2>Simulazione d'esame orale C1</h2><div class="tip">${esc(E.nota)}</div><button class="btn" id="go">Comincia la simulazione (circa 10 minuti)</button>
        ${S.esami.length ? '<h3 style="margin-top:14px">Le tue simulazioni</h3><table>' + S.esami.slice(-6).reverse().map(x => `<tr><td>${esc(x.d)}</td><td>Media <b>${x.avg}</b> / 5</td></tr>`).join('') + '</table>' : ''}</div>`;
      $('#go').onclick = () => { part = 1; drawPart(); };
    } else if (part === 1) {
      sel.q = shuffle(E.colloquio).slice(0, 4);
      main.innerHTML = `<div class="card"><h2>Parte 1 · Colloquio <span class="mute">(circa 4 min)</span></h2><div class="mute">Rispondi a voce, con frasi complete, come se l'esaminatore fosse davanti a te.</div>${sel.q.map(q => `<div class="q">• ${esc(q)}</div>`).join('')}<div class="big" id="tm">4:00</div><div id="r1"></div><button class="btn" id="nx">Parte 2</button></div>`;
      const iv = timer($('#tm'), 240); recBox($('#r1'), { tag: 'esame-colloquio' }); $('#nx').onclick = () => { clearInterval(iv); part = 2; drawPart(); };
    } else if (part === 2) {
      sel.m = pick(E.monologo);
      main.innerHTML = `<div class="card"><h2>Parte 2 · Esposizione <span class="mute">(1 min di preparazione, 3 min di discorso)</span></h2><div class="tip"><b>${esc(sel.m.t)}</b><ul>${sel.m.p.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
        <div class="mute">Prendi appunti sul foglio o nel blocco appunti (📝), poi parla.</div><div class="big" id="tm">1:00</div><div id="r2"></div><button class="btn" id="nx">Parte 3</button></div>`;
      let iv = timer($('#tm'), 60, () => { iv = timer($('#tm'), 180); }); recBox($('#r2'), { tag: 'esame-esposizione' }); $('#nx').onclick = () => { clearInterval(iv); part = 3; drawPart(); };
    } else if (part === 3) {
      sel.s = shuffle(E.sfide).slice(0, 3);
      main.innerHTML = `<div class="card"><h2>Parte 3 · Discussione <span class="mute">(circa 3 min)</span></h2><div class="mute">L'esaminatore ti contesta. Rispondi con argomenti e connettori (tuttavia, d'altra parte, a mio avviso...).</div>${sel.s.map(q => `<div class="q">• ${esc(q)}</div>`).join('')}<div class="big" id="tm">3:00</div><div id="r3"></div><button class="btn" id="nx">Autovalutazione</button></div>`;
      const iv = timer($('#tm'), 180); recBox($('#r3'), { tag: 'esame-discussione' }); $('#nx').onclick = () => { clearInterval(iv); part = 4; drawPart(); };
    } else {
      main.innerHTML = `<div class="card"><h2>Autovalutazione</h2><div class="mute">Riascolta le registrazioni nella sezione Progressi e valuta onestamente (1 = molto debole, 5 = molto solido).</div>${E.criteri.map(([k, n]) => `<div class="row" style="margin:8px 0"><span style="flex:1">${esc(n)}</span><select data-k="${k}"><option value="">–</option>${[1, 2, 3, 4, 5].map(v => `<option>${v}</option>`).join('')}</select></div>`).join('')}<p>Cosa devo migliorare?</p><textarea id="enote" rows="3"></textarea><button class="btn" id="sv" style="margin-top:8px">Salva simulazione</button></div>`;
      $('#sv').onclick = () => { const sc = {}; $$('select[data-k]').forEach(s => { if (s.value) sc[s.dataset.k] = +s.value; }); const v = Object.values(sc); if (!v.length) return toast('Dai almeno una valutazione'); S.esami.push({ d: today(), sc, avg: Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10, note: $('#enote').value }); save(); markDone('libero'); part = 0; drawPart(); toast('Simulazione salvata ✓'); };
    }
  };
  drawPart();
}

/* ---------- Quaderno degli errori ---------- */
function addError(wrong, right, note) { S.errors.push({ id: Date.now() + Math.random(), t: new Date().toISOString(), wrong, right, note: note || '' }); save(); }
function viewErrori() {
  const draw = () => {
    main.innerHTML = `<div class="card"><h2>Quaderno degli errori</h2><div class="mute">Scrivi qui ogni errore che ti correggono (insegnante, amici italiani, app). Rivederlo ogni domenica è uno dei metodi più efficaci.</div>
      <div class="row" style="margin-top:8px"><input id="ew" placeholder="Frase sbagliata" style="flex:1;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)"><input id="er" placeholder="Frase corretta" style="flex:1;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)"></div>
      <div class="row" style="margin-top:8px"><input id="en" placeholder="Nota (facoltativa)" style="flex:1;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)"><button class="btn" id="ea">Aggiungi</button></div></div>
      <div class="card"><div class="row" style="justify-content:space-between"><h3>Ripasso rapido</h3><button class="btn alt" id="rev">Estrai 5 errori</button></div><div id="rbox" class="mute">Premi il pulsante per ripassare.</div></div>
      <div class="card"><h3>I tuoi errori (${S.errors.length})</h3>${S.errors.length ? S.errors.slice().reverse().map(e => `<div style="padding:6px 0;border-bottom:1px solid var(--line)"><span class="ko">${esc(e.wrong)}</span> → <span class="ok">${esc(e.right)}</span>${e.note ? `<div class="mute">${esc(e.note)}</div>` : ''}<button class="btn alt del" data-id="${e.id}" style="float:right;padding:2px 8px">✕</button></div>`).join('') : '<div class="mute">Ancora nessun errore: bene, ma sii curiosa!</div>'}</div>`;
    $('#ea').onclick = () => { const w = $('#ew').value.trim(), r = $('#er').value.trim(); if (!w || !r) return toast('Scrivi la frase sbagliata e quella corretta'); addError(w, r, $('#en').value.trim()); draw(); };
    $$('.del').forEach(b => b.onclick = () => { S.errors = S.errors.filter(e => String(e.id) !== b.dataset.id); save(); draw(); });
    $('#rev').onclick = () => {
      const l = shuffle(S.errors).slice(0, 5); if (!l.length) return toast('Aggiungi prima qualche errore'); let i = 0;
      const one = () => { if (i >= l.length) { $('#rbox').innerHTML = '<b>Ripasso finito ✓</b>'; markDone('libero'); return; } const e = l[i]; $('#rbox').innerHTML = `<div class="q ko">${esc(e.wrong)}</div><div class="mute">Dì la versione corretta a voce, poi controlla.</div><button class="btn alt" id="sh">Mostra</button><div id="an" class="q ok" hidden>${esc(e.right)}</div><button class="btn" id="n" hidden>Avanti</button>`; $('#sh').onclick = () => { $('#an').hidden = false; $('#n').hidden = false; }; $('#n').onclick = () => { i++; one(); }; };
      one();
    };
  };
  draw();
}

/* ---------- Blocco appunti ---------- */
const NOTE_TAGS = ['grammatica', 'dizione', 'lessico', 'esame', 'giornalismo', 'altro'];
function newNote(title = 'Nuovo appunto', tag = 'altro', text = '') { const n = { id: 'n' + Date.now(), title, tag, text, upd: new Date().toISOString() }; S.notes.unshift(n); save(); return n; }
function quickNote() { let n = S.notes.find(x => x.id === 'quick'); if (!n) { n = { id: 'quick', title: 'Appunti rapidi', tag: 'altro', text: '', upd: new Date().toISOString() }; S.notes.unshift(n); } return n; }
function exportNotes() {
  const md = '# Appunti di Aya\n\n' + S.notes.map(n => `## ${n.title}\n*${n.tag} · ${n.upd.slice(0, 10)}*\n\n${n.text}\n`).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' })); a.download = 'appunti-aya.md'; a.click();
}
function viewAppunti() {
  let cur = (S.notes[0] || {}).id, q = '', tag = 'tutti';
  const draw = () => {
    const list = S.notes.filter(n => (tag === 'tutti' || n.tag === tag) && (!q || (n.title + n.text).toLowerCase().includes(q.toLowerCase())));
    const n = S.notes.find(x => x.id === cur);
    main.innerHTML = `<div class="card"><div class="row" style="justify-content:space-between"><h2>📝 Blocco appunti</h2><div class="row"><button class="btn" id="nn">+ Nuovo</button><button class="btn alt" id="ex">Esporta (.md)</button></div></div>
      <div class="notes"><div><input id="sq" placeholder="Cerca…" value="${esc(q)}" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);margin-bottom:6px">
      <div class="row" style="margin-bottom:6px">${['tutti', ...NOTE_TAGS].map(t => `<button class="chip ${t === tag ? 'on' : ''}" data-tg="${t}">${t}</button>`).join('')}</div>
      ${list.length ? list.map(x => `<div class="nitem ${x.id === cur ? 'on' : ''}" data-id="${x.id}"><b>${esc(x.title)}</b><span class="tag">${esc(x.tag)}</span><div class="mute">${esc(x.text.slice(0, 60))}</div></div>`).join('') : '<div class="mute">Nessun appunto.</div>'}</div>
      <div>${n ? `<input id="nt" value="${esc(n.title)}" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);font-weight:600"><div class="row" style="margin:6px 0"><select id="ng">${NOTE_TAGS.map(t => `<option ${t === n.tag ? 'selected' : ''}>${t}</option>`).join('')}</select><span class="mute" id="nm">Salvato</span><button class="btn alt" id="nd" style="margin-left:auto">Elimina</button></div><textarea id="nx" rows="18" placeholder="Scrivi qui. Si salva da solo.">${esc(n.text)}</textarea>` : '<div class="mute">Crea il tuo primo appunto con «+ Nuovo».</div>'}</div></div></div>`;
    $('#nn').onclick = () => { cur = newNote().id; tag = 'tutti'; q = ''; draw(); };
    $('#ex').onclick = exportNotes;
    $('#sq').oninput = e => { q = e.target.value; draw(); $('#sq').focus(); $('#sq').setSelectionRange(q.length, q.length); };
    $$('[data-tg]').forEach(b => b.onclick = () => { tag = b.dataset.tg; draw(); });
    $$('.nitem').forEach(b => b.onclick = () => { cur = b.dataset.id; draw(); });
    if (n) {
      const upd = () => { n.title = $('#nt').value; n.tag = $('#ng').value; n.text = $('#nx').value; n.upd = new Date().toISOString(); save(); $('#nm').textContent = 'Salvato ✓'; };
      $('#nt').oninput = upd; $('#nx').oninput = upd; $('#ng').onchange = upd;
      $('#nd').onclick = () => { if (confirm('Eliminare questo appunto?')) { S.notes = S.notes.filter(x => x.id !== n.id); cur = (S.notes[0] || {}).id; save(); draw(); } };
    }
  };
  draw();
}
function initDrawer() {
  const fab = document.createElement('button'); fab.className = 'fab'; fab.title = 'Appunti rapidi'; fab.textContent = '📝';
  const dr = document.createElement('div'); dr.className = 'drawer'; dr.hidden = true;
  dr.innerHTML = `<div class="row" style="justify-content:space-between"><b>📝 Appunti rapidi</b><button class="btn alt" id="dx">Chiudi</button></div><div class="mute">Si salva da solo. <a href="#/appunti">Apri tutti gli appunti</a></div>
    <textarea id="dq" placeholder="Parole nuove, regole, dubbi da chiedere all'insegnante…"></textarea><div class="row"><button class="btn alt" id="dn">Salva come nuovo appunto</button></div>`;
  document.body.append(fab, dr);
  fab.onclick = () => { dr.hidden = !dr.hidden; if (!dr.hidden) { $('#dq', dr).value = quickNote().text; $('#dq', dr).focus(); } };
  $('#dx', dr).onclick = () => { dr.hidden = true; };
  $('#dq', dr).oninput = e => { const n = quickNote(); n.text = e.target.value; n.upd = new Date().toISOString(); save(); };
  $('#dn', dr).onclick = () => { const t = $('#dq', dr).value.trim(); if (!t) return; newNote(t.split('\n')[0].slice(0, 40), 'altro', t); quickNote().text = ''; $('#dq', dr).value = ''; save(); toast('Salvato negli appunti'); };
}

/* ---------- La mia settimana ---------- */
function viewSettimana() {
  let w = weekNum();
  const draw = () => {
    const st = weekStats(w), prev = w > 1 ? weekStats(w - 1) : null, mx = Math.max(TOTAL_MIN + 20, ...st.mins), ng = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    const startDay = new Date(st.dates[0]).getDay(), labels = st.dates.map(d => ng[(new Date(d).getDay() + 6) % 7]);
    const delta = (a, b, u = '') => (a === null || b === null) ? '' : (a - b > 0 ? ` <span class="ok">▲ ${a - b}${u}</span>` : a - b < 0 ? ` <span class="ko">▼ ${Math.abs(a - b)}${u}</span>` : ' =');
    main.innerHTML = `<div class="card"><div class="row" style="justify-content:space-between"><button class="btn alt" id="pw" ${w <= 1 ? 'disabled' : ''}>←</button><h2 style="margin:0">Settimana ${w} · ${esc(D.settimane[w - 1].it)}</h2><button class="btn alt" id="nw" ${w >= weekNum() ? 'disabled' : ''}>→</button></div>
      <div class="mute">${esc(st.dates[0])} – ${esc(st.dates[6])}</div></div>
      <div class="card"><h3>Minuti al giorno <span class="mute">(linea tratteggiata = ${TOTAL_MIN} min)</span></h3>
      <div style="position:relative"><div class="bars">${st.mins.map(m => `<div><i class="${m < TOTAL_MIN ? 'low' : ''}" style="height:${Math.round(100 * m / mx)}%"></i><span>${m}</span></div>`).join('')}</div><div class="goal" style="position:absolute;left:0;right:0;bottom:${Math.round(TOTAL_MIN / mx * 150) + 18}px"></div></div>
      <div class="lbls">${labels.map(l => `<span>${l}</span>`).join('')}</div></div>
      <div class="card"><div class="stats">
        <div class="stat"><div class="big">${st.days60}/5</div>giorni con l'ora completa${st.days60 >= 5 ? ' 🏆' : ''}</div>
        <div class="stat"><div class="big">${Math.round(st.total / 6) / 10} h</div>ore questa settimana${prev ? delta(Math.round(st.total / 6) / 10, Math.round(prev.total / 6) / 10, ' h') : ''}</div>
        <div class="stat"><div class="big">${st.speechAvg === null ? '–' : st.speechAvg + '%'}</div>corrispondenza media${prev ? delta(st.speechAvg, prev.speechAvg, ' pt') : ''}</div>
        <div class="stat"><div class="big">${st.quizPct === null ? '–' : st.quizPct + '%'}</div>quiz d'ascolto e ortoepia${prev ? delta(st.quizPct, prev.quizPct, ' pt') : ''}</div>
        <div class="stat"><div class="big">${st.gramPct === null ? '–' : st.gramPct + '%'}</div>grammatica${prev ? delta(st.gramPct, prev.gramPct, ' pt') : ''}</div>
        <div class="stat"><div class="big">${st.recs}</div>registrazioni</div></div>
      <div class="mute" style="margin-top:8px">Obiettivo della settimana: almeno 5 giorni con l'ora completa.</div></div>
      <div class="card"><h3>Le 20 settimane</h3><div class="bars" style="height:110px">${Array.from({ length: 20 }, (_, i) => { const s = weekStats(i + 1); const h = Math.round(s.total / 6) / 10; return `<div><i class="${i + 1 === w ? '' : 'low'}" style="height:${Math.min(100, Math.round(100 * s.total / 420))}%;${i + 1 > weekNum() ? 'opacity:.25' : ''}"></i><span>${i + 1}</span></div>`; }).join('')}</div><div class="mute">Altezza = ore settimanali (obiettivo: 7 ore). In verde la settimana che stai guardando.</div></div>`;
    $('#pw').onclick = () => { w--; draw(); }; $('#nw').onclick = () => { w++; draw(); };
  };
  draw(); refreshWeekly();
}

/* ---------- Progressi: aggiunte (autovalutazione C1, simulazioni, ore) ---------- */
const _viewProgressi = VIEWS.progressi;
VIEWS.progressi = function () {
  _viewProgressi();
  const mk = today().slice(0, 7), cd = S.cando[mk] || {}, months = Object.keys(S.cando).sort();
  const avgOf = m => { const v = Object.values(S.cando[m] || {}); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10 : null; };
  main.insertAdjacentHTML('beforeend',
    `<div class="card"><h3>Autovalutazione C1 · ${esc(mk)}</h3><div class="mute">Una volta al mese. 1 = non ancora, 5 = lo faccio con sicurezza.</div>
    ${D.cando.map(([k, t]) => `<div class="row" style="margin:6px 0"><span style="flex:1">${esc(t)}</span><select data-cd="${k}"><option value="">–</option>${[1, 2, 3, 4, 5].map(v => `<option ${cd[k] == v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>`).join('')}
    <div class="mute" style="margin-top:8px">Media per mese: ${months.map(m => `${m}: <b>${avgOf(m) === null ? '–' : avgOf(m)}</b>`).join(' · ') || 'ancora nessuna'}</div></div>
    <div class="card"><h3>Simulazioni d'esame</h3>${S.esami.length ? '<table>' + S.esami.slice().reverse().map(x => `<tr><td>${esc(x.d)}</td><td>Media <b>${x.avg}</b>/5</td><td class="mute">${esc(x.note || '')}</td></tr>`).join('') + '</table>' : '<div class="mute">Fai la prima simulazione dalla sezione Parlato → Esame C1.</div>'}</div>`);
  $$('select[data-cd]').forEach(s => s.onchange = () => { S.cando[mk] = S.cando[mk] || {}; if (s.value) S.cando[mk][s.dataset.cd] = +s.value; save(); toast('Salvato'); });
};

/* ---------- Lessico a ripetizione dilazionata ---------- */
const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
function viewLessico2() {
  S.srs = S.srs || {}; const all = lessicoAll(), td = today();
  const due = all.filter(w => S.srs[w.p] && S.srs[w.p].due <= td), fresh = all.filter(w => !S.srs[w.p]), learned = all.filter(w => S.srs[w.p] && S.srs[w.p].box >= 4).length;
  const queue = shuffle(due).concat(fresh.slice(0, Math.max(0, 5)));
  let n = 0;
  const next = () => {
    if (!queue.length || n >= 10) {
      main.innerHTML = `<div class="card"><h2>Lessico C1</h2><div class="flash">${n ? 'Sessione finita ✓' : 'Per oggi non c\'è altro 🎉'}</div><div class="mute" style="text-align:center">Da ripassare: ${due.length} · Nuove: ${fresh.length} · Imparate: ${learned} / ${all.length}</div></div>`; if (n >= 5) markDone('libero'); return;
    }
    const w = queue.shift(), isNew = !S.srs[w.p];
    main.innerHTML = `<div class="card"><h2>Lessico C1</h2><div class="mute">Da ripassare: ${due.length} · Nuove: ${fresh.length} · Imparate: ${learned} / ${all.length}</div>
      <div class="flash">${esc(w.p)} ${isNew ? '<span class="tag">nuova</span>' : ''}</div><div id="rv" class="tip" hidden><b>${esc(w.d)}</b><br><i>${esc(w.e)}</i></div>
      <div class="row"><button class="btn alt" id="show">Mostra il significato</button><button class="btn alt" id="say">🔊</button><button class="btn alt" id="sv">📝 Negli appunti</button></div>
      <div class="row" style="margin-top:10px"><button class="btn" id="yes">La sapevo</button><button class="btn alt" id="no">Da rivedere</button></div>
      <div class="mute" style="margin-top:8px">Dopo il significato, di' ad alta voce una tua frase con la parola.</div></div>`;
    $('#show').onclick = () => { $('#rv').hidden = false; }; $('#say').onclick = () => speak(w.p + '. ' + w.e);
    $('#sv').onclick = () => { newNote(w.p, 'lessico', w.p + ': ' + w.d + '\n' + w.e); toast('Salvata negli appunti'); };
    const rate = ok => { const cur = S.srs[w.p] || { box: 0 }; const box = ok ? Math.min(6, cur.box + 1) : 0; const d = new Date(); d.setDate(d.getDate() + INTERVALS[box]); S.srs[w.p] = { box, due: dstr(d) }; S.words[w.p] = ok && box >= 4 ? 'ok' : 'rivedere'; n++; save(); if (!ok) queue.push(w); next(); };
    $('#yes').onclick = () => rate(true); $('#no').onclick = () => rate(false);
  };
  next();
}

/* ---------- Risorse ---------- */
function viewRisorse() {
  const R = D.risorse;
  main.innerHTML = `<div class="card"><h2>Risorse per approfondire</h2><div class="tip">${esc(R.avviso)}</div>${R.gruppi.map(g => `<h3>${esc(g.nome)}</h3>${g.voci.map(v => `<div style="margin:6px 0"><a href="${esc(v[1])}" target="_blank" rel="noopener"><b>${esc(v[0])}</b></a><div class="mute">${esc(v[2])}</div></div>`).join('')}`).join('')}<p class="mute">${esc(R.libro)}</p></div>`;
}

/* ---------- Registrazione e avvio ---------- */
Object.assign(VIEWS, { grammatica: viewGrammatica, ortoepia: viewOrtoepia, intonazione: viewIntonazione, giornalismo: viewGiornalismo, esame: viewEsame, errori: viewErrori, appunti: viewAppunti, settimana: viewSettimana, risorse: viewRisorse, lessico: viewLessico2 });
initDrawer();
