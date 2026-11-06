/* ---------- Registrazione con giudizio: letture lunghe e parlato libero ---------- */
(function () {
  // Suoni a cui ricondurre una parola non riconosciuta (per suggerire l'esercizio giusto)
  const SUONI = [['gli_gn', /gli|gn/], ['sc', /sc[ei]|sch/], ['doppie', /([bcdfglmnpqrstvz])\1/], ['cg', /c[ei]|g[ei]|ch|gh/], ['r', /r/], ['pb', /[pb]/], ['vf', /[vf]/]];
  const suoniDi = w => SUONI.filter(([, re]) => re.test(w)).map(([c]) => c);
  const VUOTE = new Set(('sono anche molto perché quando questo questa questi queste quello quella quelli quelle della delle dello degli nella nelle nello negli alla alle allo agli dalla dalle dallo dagli sulla sulle sullo sugli come cosa essere stato stata fatto fare sempre ancora ogni loro però dove mentre ma che non per con una uno del dei nel nei sul dal tra fra più poi già solo tutto tutti tutta tutte allora quindi così cioè proprio poco tanto tanti tante altro altri altra altre').split(' '));
  const VOTI = [
    { min: 4, nome: 'Ottimo', ico: '🌟', ar: 'ممتاز! برافو عليك.' },
    { min: 3, nome: 'Buono', ico: '👍', ar: 'باهي برشا! شوية تفاصيل وتولّي ممتازة.' },
    { min: 2, nome: 'Ci siamo quasi', ico: '💪', ar: 'قريب! عاود مرّة أخرى وردّ بالك من النصايح.' },
    { min: 0, nome: 'Da riprovare', ico: '🔁', ar: 'عاود بالشويّة، جملة بجملة. ما تقلقش، هكّا نتعلّمو.' }
  ];
  const voto = p => VOTI.find(v => p >= v.min);
  const quando = iso => { const d = new Date(iso); return d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }); };
  const riga = (ok, it, ar) => '<li style="margin:6px 0">' + (ok === null ? '•' : ok ? '✅' : '⚠️') + ' ' + it + (ar ? '<div class="ar">' + esc(ar) + '</div>' : '') + '</li>';
  const scheda = (v, righe, extra) => '<div class="card" style="margin-top:10px;border-top:4px solid var(--gold)"><div style="font-size:1.4rem"><b>' + v.ico + ' Giudizio: ' + v.nome + '</b></div>' +
    '<div class="ar">' + esc(v.ar) + '</div><ul style="list-style:none;padding:0;margin:10px 0 0">' + righe.join('') + '</ul>' + (extra || '') + '</div>';
  function storico(tag, voce) {
    S.giudizi = S.giudizi || {};
    const prima = (S.giudizi[tag] || []).slice(-1)[0] || null;
    (S.giudizi[tag] = S.giudizi[tag] || []).push(voce);
    if (S.giudizi[tag].length > 30) S.giudizi[tag].shift();
    save();
    return prima;
  }

  /* --- Giudizio di una lettura (testo noto) --- */
  function giudicaLettura(tag, target, heard, secs) {
    const r = diff(target, heard), n = norm(target).length;
    const wpm = secs > 5 ? Math.round(n / secs * 60) : null;
    S.wstat = S.wstat || {}; r.words.forEach(([w, o]) => { const s = S.wstat[w] = S.wstat[w] || [0, 0]; s[o ? 0 : 1]++; });
    const mancate = [...new Set(r.words.filter(([w, o]) => !o && w.length > 2).map(([w]) => w))];
    let punti = r.score >= 92 ? 4 : r.score >= 82 ? 3 : r.score >= 65 ? 2 : 1;
    const ritmoOk = wpm === null || (wpm >= 110 && wpm <= 175);
    if (!ritmoOk && punti > 1) punti--;
    const righe = [];
    righe.push(riga(r.score >= 82, '<b>Chiarezza:</b> ' + r.score + '% delle parole riconosciute' + (r.score >= 92 ? ' — molto chiara.' : r.score >= 82 ? ' — chiara, con qualche incertezza.' : ' — alcune parole non si capiscono ancora.'),
      r.score >= 82 ? 'الكلام واضح.' : 'فما كلمات ما تفهمتش، عاودهم.'));
    if (wpm !== null) {
      if (wpm < 110) righe.push(riga(false, '<b>Ritmo:</b> ' + wpm + ' parole al minuto — un po\' lenta. Per una lettura da radio punta a 130-170: leggi a gruppi di parole, non parola per parola.', 'شوية بطيء. اقرا مجموعات كلمات، موش كلمة كلمة.'));
      else if (wpm > 175) righe.push(riga(false, '<b>Ritmo:</b> ' + wpm + ' parole al minuto — un po\' veloce. Rallenta e fai una vera pausa a ogni punto.', 'شوية فيسع. بطّأ ووقّف في كل نقطة.'));
      else righe.push(riga(true, '<b>Ritmo:</b> ' + wpm + ' parole al minuto — giusto per una lettura chiara.', 'الريتم باهي.'));
    }
    let extra = '';
    if (mancate.length) {
      const conta = {}; mancate.forEach(w => suoniDi(w).forEach(c => { conta[c] = (conta[c] || 0) + 1; }));
      const top = Object.keys(conta).sort((a, b) => conta[b] - conta[a]).slice(0, 2).filter(c => D.cat[c]);
      righe.push(riga(false, '<b>Parole da ripetere:</b> ' + mancate.slice(0, 15).map(w => '<span class="ko">' + esc(w) + '</span>').join(', ') + (mancate.length > 15 ? '…' : ''), 'عاود الكلمات هاذي بالشويّة، وبعد اقرا الجملة الكاملة.'));
      if (top.length) extra = '<div class="row" style="margin-top:8px">' + top.map(c => '<button class="btn alt vai-ripeti" data-c="' + c + '">Esercizio: ' + esc(D.cat[c].nome) + '</button>').join('') + '</div>';
    } else righe.push(riga(true, '<b>Parole:</b> tutte riconosciute. Complimenti!', 'الكلمات الكل تفهمو.'));
    const prima = storico(tag, { t: new Date().toISOString(), score: r.score, wpm });
    if (prima) {
      const d = r.score - prima.score;
      righe.push(riga(null, '<b>Rispetto all\'ultima volta</b> (' + esc(quando(prima.t)) + '): ' + (d > 0 ? '+' + d + '% 📈 stai migliorando!' : d < 0 ? d + '%: capita, riprova con calma.' : 'stesso risultato.'), d > 0 ? 'قاعدة تتحسّن!' : ''));
    } else righe.push(riga(null, 'È la prima volta che registri questo testo: la prossima volta vedrai il confronto.', ''));
    S.speech.push({ t: new Date().toISOString(), cat: 'lettura', score: r.score, testo: tag }); save();
    return { html: '<div class="diff">' + r.html + '</div>' + scheda(voto(punti), righe, extra), score: r.score };
  }

  /* --- Giudizio del parlato libero (testo non noto) --- */
  function giudicaParlato(tag, heard, secs) {
    const parole = norm(heard), n = parole.length;
    const wpm = secs > 5 ? Math.round(n / secs * 60) : 0;
    const testo = ' ' + parole.join(' ') + ' ';
    const usati = D.connettori.filter(c => testo.includes(' ' + norm(c).join(' ') + ' '));
    const freq = {}; parole.filter(w => w.length > 3 && !VUOTE.has(w)).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const ripetute = Object.keys(freq).filter(w => freq[w] >= 4).sort((a, b) => freq[b] - freq[a]).slice(0, 5);
    const varieta = n ? new Set(parole).size / n : 0;
    let punti = 0; const righe = [];
    const durOk = secs >= 100; punti += durOk ? 1 : 0;
    righe.push(riga(durOk, '<b>Durata:</b> ' + Math.floor(secs / 60) + ' min ' + (secs % 60) + ' s' + (durOk ? ' — ottimo, hai sostenuto il discorso.' : ' — prova ad arrivare a 2 minuti: se finisci le idee, aggiungi un esempio o un ricordo.'),
      durOk ? 'حكيت مدّة باهية.' : 'حاول توصل لدقيقتين: زيد مثال ولّا ذكرى.'));
    const rOk = wpm >= 80 && wpm <= 170; punti += rOk ? 1 : 0;
    righe.push(riga(rOk, '<b>Fluidità:</b> circa ' + wpm + ' parole al minuto' + (wpm < 80 ? ' — molte esitazioni. Non cercare la parola perfetta: usa un giro di parole e vai avanti.' : wpm > 170 ? ' — molto veloce: rallenta per farti capire meglio.' : ' — scorrevole.'),
      wpm < 80 ? 'برشا توقّف. ما تفتّشش على الكلمة المثالية، اشرح بكلمات أخرى وكمّل.' : ''));
    const cOk = usati.length >= 3; punti += cOk ? 1 : 0;
    righe.push(riga(cOk, '<b>Connettori:</b> ' + (usati.length ? usati.length + ' (' + usati.map(esc).join(', ') + ')' : 'nessuno riconosciuto') + (cOk ? ' — bene, il discorso è collegato.' : ' — usane almeno 3: rendono il discorso più ordinato e più «C1».'),
      cOk ? '' : 'استعمل على الأقل 3 أدوات ربط.'));
    const vOk = varieta >= 0.45 && !ripetute.length; punti += vOk ? 1 : 0;
    righe.push(riga(vOk, '<b>Lessico:</b> ' + new Set(parole).size + ' parole diverse su ' + n + (ripetute.length ? '. Ripeti spesso: ' + ripetute.map(w => '<b>' + esc(w) + '</b> (' + freq[w] + ' volte)').join(', ') + ' — prova un sinonimo.' : ' — buona varietà.'),
      ripetute.length ? 'فما كلمات تعاود فيهم برشا: جرّب كلمة أخرى بنفس المعنى.' : ''));
    const prima = storico(tag, { t: new Date().toISOString(), punti, wpm, secs, conn: usati.length });
    if (prima) righe.push(riga(null, '<b>Rispetto all\'ultima volta</b> (' + esc(quando(prima.t)) + '): connettori ' + prima.conn + ' → ' + usati.length + ', fluidità ' + prima.wpm + ' → ' + wpm + ' parole al minuto.', ''));
    S.speech.push({ t: new Date().toISOString(), cat: 'parlato', score: punti * 25 }); save();
    return '<details style="margin-top:8px"><summary>Che cosa ha capito il computer</summary><div class="mute">' + esc(heard.trim()) + '</div></details>' + scheda(voto(punti), righe);
  }

  /* --- Registratore con riconoscimento vocale continuo e giudizio --- */
  function registraConGiudizio(host, { tag, target = null, onDone }) {
    host.innerHTML = '<div class="rec"><div class="row"><button class="btn rb">● Registra</button><span class="mute rs"></span></div><div class="rr"></div></div>' +
      (SR ? '' : '<div class="mute">Il giudizio automatico funziona solo in Chrome: qui puoi registrarti e riascoltarti.</div>');
    const btn = $('.rb', host), st = $('.rs', host), out = $('.rr', host);
    let mr, chunks = [], stream, sr = null, heard = '', recording = false, t0 = 0, tick;
    const avviaSR = () => {
      try {
        sr = new SR(); sr.lang = 'it-IT'; sr.continuous = true; sr.interimResults = false;
        sr.onresult = e => { for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) heard += ' ' + e.results[i][0].transcript; };
        sr.onerror = () => {};
        sr.onend = () => { if (recording) avviaSR(); }; // Chrome si ferma dopo un po': riparte da solo
        sr.start();
      } catch (e) { sr = null; }
    };
    btn.onclick = async () => {
      if (!recording) {
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
        catch (e) { st.textContent = 'Microfono non disponibile: controlla i permessi del browser.'; return; }
        chunks = []; heard = ''; out.innerHTML = '';
        const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
        mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
        mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
        mr.onstop = () => finish(mr.mimeType || mime || 'audio/webm');
        mr.start();
        recording = true; t0 = Date.now();
        if (SR) avviaSR();
        btn.textContent = '■ Stop'; btn.classList.add('rec-on');
        tick = setInterval(() => { st.textContent = 'Sto registrando… ' + Math.round((Date.now() - t0) / 1000) + ' s'; }, 500);
      } else {
        recording = false; clearInterval(tick); btn.textContent = '● Registra'; btn.classList.remove('rec-on'); st.textContent = 'Preparo il giudizio…';
        try { if (sr) sr.stop(); } catch (e) {}
        mr.stop(); stream.getTracks().forEach(t => t.stop());
      }
    };
    async function finish(type) {
      await new Promise(r => setTimeout(r, sr ? 1200 : 0));
      const blob = new Blob(chunks, { type }), url = URL.createObjectURL(blob);
      const secs = Math.round((Date.now() - t0) / 1000);
      let html = '<audio controls src="' + url + '"></audio>', score = null;
      if (SR && heard.trim()) {
        if (target) { const g = giudicaLettura(tag, target, heard, secs); html += g.html; score = g.score; }
        else html += giudicaParlato(tag, heard, secs);
      } else if (SR) html += '<div class="mute">Non ho sentito parole: controlla il microfono e riprova, parlando vicino al computer.</div>';
      out.innerHTML = html; st.textContent = secs + ' s';
      $$('.vai-ripeti', out).forEach(b => b.onclick = () => { sessionStorage.setItem('aya.ripcat', b.dataset.c); location.hash = '#/ripeti'; });
      const ext = type.includes('mp4') ? 'm4a' : 'webm';
      const name = new Date().toISOString().replace(/[:.]/g, '-') + '_' + tag.replace(/[^A-Za-z0-9_-]/g, '') + '.' + ext;
      fetch('/api/rec?name=' + encodeURIComponent(name), { method: 'POST', body: blob }).catch(() => {});
      S.recs.push({ file: name, tag, t: new Date().toISOString(), secs }); save();
      if (onDone) onDone({ score, secs });
    }
  }

  /* --- Vista: Letture lunghe --- */
  let idxLL = 0;
  function viewLettureLunghe() {
    const T = D.lettureLunghe, L = T[idxLL];
    const migliore = id => { const g = (S.giudizi || {})['lunga-' + id] || []; return g.length ? Math.max(...g.map(x => x.score)) : null; };
    main.innerHTML = '<div class="card"><h2>Letture lunghe</h2><div class="mute">Testi da leggere ad alta voce, un paragrafo alla volta o tutto di seguito. Dopo ogni registrazione ricevi un giudizio.</div>' +
      '<div class="ar">نصوص طويلة تقراها بصوت عالي، فقرة بفقرة ولّا الكل. بعد كل تسجيل يجيك تقييم.</div>' +
      '<div class="row" style="margin-top:8px">' + T.map((l, i) => { const m = migliore(l.id); return '<button class="chip ' + (i === idxLL ? 'on' : '') + '" data-i="' + i + '" title="' + esc(l.titolo) + '">' + esc(l.id) + (m !== null ? ' · ' + m + '%' : '') + '</button>'; }).join('') + '</div></div>' +
      '<div class="card"><h3>' + esc(L.titolo) + ' <span class="pill">' + esc(L.genere) + '</span></h3><div class="tip">' + esc(L.nota) + '<div class="ar">' + esc(L.ar) + '</div></div>' + voiceWarn() +
      L.par.map((p, j) => '<div class="card" style="margin:12px 0"><div class="mute">Paragrafo ' + (j + 1) + ' di ' + L.par.length + '</div><p style="font-size:1.15rem;line-height:1.9">' + esc(p) + '</p>' +
        '<div class="row"><button class="btn alt sp" data-j="' + j + '" data-r=".95">🔊 Modello</button><button class="btn alt sp" data-j="' + j + '" data-r=".7">🐢 Lento</button></div><div id="llp' + j + '"></div></div>').join('') +
      '<div class="card" style="margin:12px 0"><h3>Tutto il testo di seguito</h3><div class="mute">Quando ti senti pronta, registra l\'intero testo senza fermarti (circa 2 minuti).</div><div id="lltutto"></div></div></div>';
    $$('.chip').forEach(c => c.onclick = () => { idxLL = +c.dataset.i; viewLettureLunghe(); });
    $$('.sp').forEach(b => b.onclick = () => speak(L.par[+b.dataset.j], +b.dataset.r));
    L.par.forEach((p, j) => registraConGiudizio($('#llp' + j), { tag: 'lunga-' + L.id + '-p' + (j + 1), target: p, onDone: () => markDone('lettura') }));
    registraConGiudizio($('#lltutto'), { tag: 'lunga-' + L.id, target: L.par.join(' '), onDone: () => markDone('lettura') });
  }

  /* --- Vista: Parlato libero con giudizio (sostituisce la precedente) --- */
  let argExtra = null;
  function viewParlatoGiudizio() {
    const day = Math.floor((new Date(today()) - new Date(S.start)) / 864e5), A = D.argomenti;
    const arg = argExtra !== null ? A[argExtra] : A[((day % A.length) + A.length) % A.length];
    main.innerHTML = '<div class="card"><h2>Parlato libero · 2 minuti</h2><div class="tip" style="font-size:1.15rem"><b>Argomento:</b> ' + esc(arg) + '</div>' +
      '<div class="row"><button class="btn alt" id="altro">🎲 Un altro argomento</button></div>' +
      '<div class="mute" style="margin-top:8px">Usa almeno 3 connettori, per esempio: ' + D.connettori.slice(0, 12).map(c => '<b>' + esc(c) + '</b>').join(', ') + '…</div>' +
      '<div class="ar">احكي دقيقتين من غير ما توقف. إذا نسيت كلمة، اشرحها بكلمات أخرى بالإيطالية (موش بالعربية ولا الفرنسية). في الآخر يجيك تقييم.</div>' +
      '<div id="pr"></div><div class="tip">Riascoltati e rispondi: ho parlato senza fermarmi? ho usato i connettori? <select id="fl"><option value="">Fluidità –</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>' +
      '<div class="mute">Il giudizio automatico misura durata, fluidità, connettori e varietà delle parole. Non giudica la grammatica né le vocali aperte e chiuse: per quelle serve un orecchio umano.</div></div>';
    $('#altro').onclick = () => { argExtra = Math.floor(Math.random() * A.length); viewParlatoGiudizio(); };
    registraConGiudizio($('#pr'), { tag: 'parlato', onDone: () => markDone('libero') });
    $('#fl').onchange = e => { if (e.target.value) { S.ratings['fluidita-' + today()] = +e.target.value; save(); toast('Salvato'); } };
  }

  VIEWS.letturelunghe = viewLettureLunghe;
  VIEWS.parlato = viewParlatoGiudizio;
  const parlato = GROUPS.find(g => g[0] === 'Parlato');
  if (parlato) { const k = parlato[1].findIndex(x => x[0] === 'lettura'); parlato[1].splice(k + 1, 0, ['letturelunghe', 'Letture lunghe']); }
})();
