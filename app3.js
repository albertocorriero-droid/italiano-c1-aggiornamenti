'use strict';
/* Terza parte: test iniziale, punti deboli (pronuncia adattiva), report stampabile, corso di radio. */

/* ---------- Punti deboli: analisi delle parole sbagliate ---------- */
const PAT = {
  doppie: w => /([bcdfglmnprstvz])\1/.test(w), pb: w => /[pb]/.test(w), vf: w => /[vf]/.test(w), gli_gn: w => /gli|gn/.test(w),
  sc: w => /sc[ie]|sch/.test(w), cg: w => /c[ei]|g[ei]|ch|gh/.test(w), r: w => /r/.test(w)
};
function patternStats() {
  const out = {}; Object.keys(PAT).forEach(k => out[k] = { tot: 0, miss: 0 });
  Object.entries(S.wstat || {}).forEach(([w, [ok, miss]]) => { if (w.length < 3) return; Object.keys(PAT).forEach(k => { if (PAT[k](w)) { out[k].tot += ok + miss; out[k].miss += miss; } }); });
  return out;
}
const rankedPatterns = (min = 8) => Object.entries(patternStats()).filter(([, v]) => v.tot >= min).map(([k, v]) => ({ k, tot: v.tot, rate: v.miss / v.tot })).sort((a, b) => b.rate - a.rate);
function weakWords(n = 10) {
  return Object.entries(S.wstat || {}).filter(([w, [ok, miss]]) => w.length >= 4 && miss >= 2 && miss / (ok + miss) >= .4).sort((a, b) => b[1][1] - a[1][1]).slice(0, n).map(([w]) => w);
}
function viewDebolezze() {
  const rp = rankedPatterns(), ww = weakWords(), qz = Object.keys(D.cat).filter(c => S.quiz[c] && S.quiz[c].tot >= 6).map(c => ({ c, p: Math.round(100 * S.quiz[c].ok / S.quiz[c].tot) })).sort((a, b) => a.p - b.p).slice(0, 3);
  main.innerHTML = `<div class="card"><h2>I tuoi punti deboli</h2><div class="tip">Il programma registra quali parole non vengono riconosciute quando ti registri e le raggruppa per suono. Il riconoscimento vocale può sbagliare e dipende dal microfono: usa questi dati come indicazione, non come verdetto. Più ti registri, più sono affidabili.</div></div>` +
    (rp.length ? `<div class="card"><h3>Suoni su cui vieni riconosciuta meno</h3><table>${rp.map(r => `<tr><td>${esc(D.cat[r.k].nome)}</td><td style="width:45%"><div class="bar"><i style="width:${Math.round(100 * (1 - r.rate))}%"></i></div></td><td>${Math.round(100 * (1 - r.rate))}% <span class="mute">(${r.tot})</span></td><td><button class="btn alt gp" data-c="${r.k}">Allenati</button></td></tr>`).join('')}</table></div>` : `<div class="card mute">Servono più registrazioni con controllo automatico (sezioni Ripeti, Scioglilingua, Lettura). Torna qui tra qualche giorno.</div>`) +
    (ww.length ? `<div class="card"><h3>Parole da riprovare</h3><div class="row">${ww.map(w => `<button class="chip sw" data-w="${esc(w)}">🔊 ${esc(w)}</button>`).join('')}</div><div class="mute" style="margin:8px 0">Ascoltale, poi ripetile tutte di seguito.</div><div id="wr"></div></div>` : '') +
    (qz.length ? `<div class="card"><h3>Orecchio: categorie più difficili</h3>${qz.map(q => `<div>${esc(D.cat[q.c] ? D.cat[q.c].nome : q.c)}: <b>${q.p}%</b></div>`).join('')}<a class="btn alt" href="#/ascolto" style="display:inline-block;margin-top:8px">Vai a Orecchio</a></div>` : '');
  $$('.gp').forEach(b => b.onclick = () => { sessionStorage.setItem('aya.ripcat', b.dataset.c); location.hash = '#/ripeti'; });
  $$('.sw').forEach(b => b.onclick = () => speak(b.dataset.w, .8));
  if (ww.length) recBox($('#wr'), { tag: 'parole-difficili', target: ww.join(' ') });
}

/* ---------- Test iniziale (primo accesso) ---------- */
function viewInizio() {
  S.base = S.base || { date: today() }; const L1 = D.letture.find(l => l.id === 'L1'), cd = S.cando.base || {};
  main.innerHTML = `<div class="card"><h2>Benvenuta, Aya 👋</h2><div>Questo test dura circa 10 minuti e fotografa il tuo punto di partenza. Alla settimana 20 lo ripeterai e potrai <b>riascoltare la differenza</b>.</div>
      <div class="ar">هذا الاختبار ياخذ تقريباً 10 دقايق ويصوّر مستواك اليوم. في الأسبوع 20 تعاودو وتسمع الفرق.</div></div>
    <div class="card"><h3>1. Le date</h3><div class="row"><span style="width:180px">Inizio del percorso</span><input type="date" id="d1" value="${esc(S.start)}" style="width:auto"></div>
      <div class="row" style="margin-top:8px"><span style="width:180px">Data dell'esame (facoltativa)</span><input type="date" id="d2" value="${esc(S.examDate || '')}" style="width:auto"></div></div>
    <div class="card"><h3>2. Autovalutazione di partenza</h3><div class="mute">1 = non ancora, 5 = lo faccio con sicurezza. Sii onesta: serve a vedere i progressi.</div>
      ${D.cando.map(([k, t]) => `<div class="row" style="margin:6px 0"><span style="flex:1">${esc(t)}</span><select data-cd="${k}"><option value="">–</option>${[1, 2, 3, 4, 5].map(v => `<option ${cd[k] == v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>`).join('')}</div>
    <div class="card"><h3>3. Lettura di partenza</h3><div class="mute">Leggi con la tua voce naturale, senza correggerti. Questa registrazione sarà il tuo confronto tra cinque mesi.</div><p class="q">${esc(L1.t)}</p><div id="br"></div>${S.base.rec ? '<div class="ok">Registrazione di partenza salvata ✓</div>' : ''}</div>
    <div class="card"><button class="btn" id="fin">Concludi il test iniziale</button></div>`;
  $('#d1').onchange = e => { if (e.target.value) { S.start = e.target.value; save(); updateHeader(); } };
  $('#d2').onchange = e => { S.examDate = e.target.value || null; save(); };
  $$('select[data-cd]').forEach(s => s.onchange = () => { S.cando.base = S.cando.base || {}; if (s.value) S.cando.base[s.dataset.cd] = +s.value; save(); });
  recBox($('#br'), { tag: 'lettura-L1-base', target: L1.t, onDone: () => { S.base.rec = S.recs[S.recs.length - 1].file; save(); toast('Registrazione di partenza salvata ✓'); } });
  $('#fin').onclick = () => { S.onboarded = true; S.base.date = today(); save(); toast('Test iniziale completato ✓'); location.hash = '#/oggi'; };
}

/* ---------- Report settimanale stampabile ---------- */
function viewReport() {
  let w = Math.max(1, weekNum());
  const draw = () => {
    const st = weekStats(w), prev = w > 1 ? weekStats(w - 1) : null, rev = S.ratings['rev-' + w] || {}, ng = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    const errs = S.errors.filter(e => inWeek(e.t, st.dates)), rp = rankedPatterns(6).slice(0, 3), mx = Math.max(TOTAL_MIN, ...st.mins);
    const qs = [];
    rp.forEach(r => qs.push(`Come posso migliorare il suono «${D.cat[r.k].nome}»? Puoi darmi tre esercizi?`));
    errs.slice(-3).forEach(e => qs.push(`Perché è sbagliato «${e.wrong}»?`));
    if (rev.difficile) qs.push('Ho trovato difficile: ' + rev.difficile);
    const delta = (a, b) => (a === null || b === null || a === b) ? '' : (a > b ? ' (▲ ' + (a - b) + ')' : ' (▼ ' + (b - a) + ')');
    main.innerHTML = `<div class="row noprint" style="justify-content:space-between"><div class="row"><button class="btn alt" id="pw" ${w <= 1 ? 'disabled' : ''}>←</button><b>Settimana ${w}</b><button class="btn alt" id="nw" ${w >= weekNum() ? 'disabled' : ''}>→</button></div><button class="btn" id="pr">🖨 Stampa / salva PDF</button></div>
    <div class="card"><h2>Report settimanale · Aya Aouichaoui</h2><div class="mute">Settimana ${w} (${esc(st.dates[0])} – ${esc(st.dates[6])}) · Fase: ${esc(faseOf(w).it)} · Tema: ${esc(D.settimane[w - 1].it)}</div></div>
    <div class="card"><h3>Impegno</h3><table>
      <tr><td>Ore di studio</td><td><b>${Math.round(st.total / 6) / 10} h</b>${prev ? delta(Math.round(st.total / 6), Math.round(prev.total / 6)).replace(/\d+/g, n => (n / 10)) : ''}</td></tr>
      <tr><td>Giorni con l'ora completa</td><td><b>${st.days60}</b> su 7 (obiettivo 5)</td></tr>
      <tr><td>Giorni con almeno un'attività</td><td><b>${st.daysAny}</b></td></tr>
      <tr><td>Registrazioni</td><td><b>${st.recs}</b></td></tr></table>
      <div class="bars" style="height:110px;margin-top:10px">${st.mins.map(m => `<div><i class="${m < TOTAL_MIN ? 'low' : ''}" style="height:${Math.round(100 * m / mx)}%"></i><span>${m}</span></div>`).join('')}</div>
      <div class="lbls">${st.dates.map(d => `<span>${ng[(new Date(d).getDay() + 6) % 7]}</span>`).join('')}</div></div>
    <div class="card"><h3>Risultati</h3><table>
      <tr><td>Corrispondenza media nelle registrazioni</td><td><b>${st.speechAvg === null ? '–' : st.speechAvg + '%'}</b>${prev ? delta(st.speechAvg, prev.speechAvg) : ''} <span class="mute">(${st.speechN} prove)</span></td></tr>
      <tr><td>Quiz d'ascolto e ortoepia</td><td><b>${st.quizPct === null ? '–' : st.quizPct + '%'}</b>${prev ? delta(st.quizPct, prev.quizPct) : ''} <span class="mute">(${st.quizN} risposte)</span></td></tr>
      <tr><td>Grammatica</td><td><b>${st.gramPct === null ? '–' : st.gramPct + '%'}</b>${prev ? delta(st.gramPct, prev.gramPct) : ''} <span class="mute">(${st.gramN} risposte)</span></td></tr></table></div>
    <div class="card"><h3>Suoni da lavorare</h3>${rp.length ? rp.map(r => `<div>${esc(D.cat[r.k].nome)}: riconosciuti <b>${Math.round(100 * (1 - r.rate))}%</b></div>`).join('') : '<div class="mute">Dati ancora insufficienti.</div>'}</div>
    <div class="card"><h3>Errori annotati questa settimana (${errs.length})</h3>${errs.length ? errs.map(e => `<div><span class="ko">${esc(e.wrong)}</span> → <span class="ok">${esc(e.right)}</span></div>`).join('') : '<div class="mute">Nessuno.</div>'}</div>
    <div class="card"><h3>Autovalutazione della settimana</h3>${['chiarezza', 'ritmo', 'scioltezza', 'fiducia'].filter(k => rev[k]).map(k => `<span class="pill">${k}: ${rev[k]}/5</span>`).join('') || '<span class="mute">Non compilata (sezione Progressi).</span>'}
      ${rev.difficile ? `<p><b>Difficile:</b> ${esc(rev.difficile)}</p>` : ''}${rev.vorrei ? `<p><b>Vorrei:</b> ${esc(rev.vorrei)}</p>` : ''}</div>
    <div class="card"><h3>Domande per l'insegnante di dizione</h3>${qs.length ? '<ol>' + qs.map(q => `<li>${esc(q)}</li>`).join('') + '</ol>' : '<div class="mute">Si compilano da sole con i tuoi dati.</div>'}</div>`;
    $('#pw').onclick = () => { w--; draw(); }; $('#nw').onclick = () => { w++; draw(); }; $('#pr').onclick = () => window.print();
  };
  draw();
}

/* ---------- Corso di radio ---------- */
function viewRadio() {
  const done = S.radio, n = D.corsoRadio.filter(l => done[l.id]).length;
  main.innerHTML = `<div class="card"><h2>Corso di radio · 8 lezioni</h2><div class="mute">Completate: ${n} / ${D.corsoRadio.length}. Una lezione ogni settimana o due, al posto dell'esposizione libera quando vuoi.</div><div class="bar"><i style="width:${Math.round(100 * n / D.corsoRadio.length)}%"></i></div></div>` +
    D.corsoRadio.map((l, i) => `<details class="card" ${!done[l.id] && D.corsoRadio.findIndex(x => !done[x.id]) === i ? 'open' : ''}><summary>${done[l.id] ? '✅ ' : ''}Lezione ${i + 1} · ${esc(l.titolo)}</summary>
      <p>${esc(l.it)}</p><div class="ar">${esc(l.ar)}</div><ol>${l.passi.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
      ${l.testo ? `<div class="tip"><b>Testo:</b> ${esc(D.letture.find(x => x.id === l.testo).t)}</div>` : ''}
      <div class="tip"><b>Compito:</b> ${esc(l.compito)}</div><div id="rr${i}"></div>
      <div class="row" style="margin-top:8px"><label><input type="checkbox" class="rd" data-id="${l.id}" ${done[l.id] ? 'checked' : ''}> Lezione completata</label>${l.scaletta ? '<button class="btn alt sc" data-i="' + i + '">Salva la scaletta negli appunti</button>' : ''}</div></details>`).join('');
  D.corsoRadio.forEach((l, i) => recBox($('#rr' + i), { tag: 'radio-' + l.id, target: l.testo ? D.letture.find(x => x.id === l.testo).t : null }));
  $$('.rd').forEach(c => c.onchange = () => { S.radio[c.dataset.id] = c.checked; save(); if (c.checked) markDone('libero'); viewRadio(); });
  $$('.sc').forEach(b => b.onclick = () => { newNote('Scaletta puntata di prova', 'giornalismo', 'SCALETTA (10 minuti)\n\n1. Apertura (1 min): saluto, programma, tema, promessa\n   - \n2. Notizia (2 min): 5 W\n   - \n3. Intervista (4 min): 5 domande aperte\n   - \n4. Rubrica (2 min)\n   - \n5. Chiusura (1 min): riepilogo, ringraziamenti, prossimo appuntamento\n   - \n\nCOSA MI È PIACIUTO (3):\n- \nDA MIGLIORARE (3):\n- '); toast('Scaletta salvata negli appunti'); });
}

/* ---------- Oggi e Progressi: aggiunte ---------- */
const _viewOggi = VIEWS.oggi;
VIEWS.oggi = function () {
  _viewOggi();
  let html = '';
  if (!S.onboarded) html += `<div class="card" style="border-color:var(--acc)"><h3>Comincia da qui 👉</h3><div>Prima di iniziare, fai il test iniziale (10 minuti): registrerai la tua voce di oggi per confrontarla tra cinque mesi.</div><a class="btn" href="#/inizio" style="display:inline-block;margin-top:8px">Fai il test iniziale</a></div>`;
  if (S.examDate) { const dd = Math.ceil((new Date(S.examDate) - new Date(today())) / 864e5); if (dd >= 0) html += `<div class="card"><b>📅 Mancano ${dd} ${dd === 1 ? 'giorno' : 'giorni'} all'esame.</b></div>`; }
  const rp = rankedPatterns(10)[0];
  if (rp && rp.rate >= .25) html += `<div class="card"><h3>Focus extra</h3><div>Il suono su cui vieni riconosciuta meno è <b>${esc(D.cat[rp.k].nome)}</b> (${Math.round(100 * (1 - rp.rate))}% riconosciuto). Dedicagli 5 minuti in più.</div><button class="btn alt" id="fx" style="margin-top:8px">Allenati su questo suono</button></div>`;
  main.insertAdjacentHTML('afterbegin', html);
  const fx = $('#fx'); if (fx) fx.onclick = () => { sessionStorage.setItem('aya.ripcat', rp.k); location.hash = '#/ripeti'; };
};
const _viewProgressi2 = VIEWS.progressi;
VIEWS.progressi = function () {
  _viewProgressi2();
  if (!S.base) return;
  const months = Object.keys(S.cando).filter(m => m !== 'base').sort(), avg = o => { const v = Object.values(o || {}); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10 : null; };
  const first = S.base.rec, last = S.recs.slice().reverse().find(r => r.tag === 'lettura-L1' && (!first || r.file !== first));
  const b = avg(S.cando.base), l = months.length ? avg(S.cando[months[months.length - 1]]) : null;
  main.insertAdjacentHTML('beforeend', `<div class="card"><h3>Confronto: il tuo punto di partenza e oggi</h3>
    <div class="stats"><div class="stat"><div class="big">${b === null ? '–' : b}</div>autovalutazione iniziale</div><div class="stat"><div class="big">${l === null ? '–' : l}</div>ultima autovalutazione</div></div>
    ${first ? `<p>Lettura di partenza (${esc(S.base.date)}):</p><audio controls src="dati/registrazioni/${esc(first)}" style="width:100%"></audio>` : ''}
    ${last ? `<p>La stessa lettura più recente (${esc(last.t.slice(0, 10))}):</p><audio controls src="dati/registrazioni/${esc(last.file)}" style="width:100%"></audio>` : '<div class="mute">Per confrontare, rileggi il testo L1 nella sezione Lettura.</div>'}</div>`);
};

/* ---------- Registrazione e avvio ---------- */
Object.assign(VIEWS, { debolezze: viewDebolezze, inizio: viewInizio, report: viewReport, radio: viewRadio });
GROUPS[1][1].push(['debolezze', 'Punti deboli']);
GROUPS[2][1].push(['radio', 'Corso radio']);
GROUPS[6][1].push(['report', 'Report'], ['inizio', 'Test iniziale']);
// Nessun reindirizzamento automatico: il saluto in Oggi resta visibile. Il test iniziale è proposto da un riquadro in cima.
