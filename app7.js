'use strict';
/* Medaglie, bonus e premi a tappe. Pagina «I miei premi» in Progressi.
   Lo stato sta in S.medaglie (id -> data di sblocco) e S.tema (tema di colore scelto). */
(function () {
  const MED = D.medaglie || [], RAMI = D.rami || {}, TEMI = D.temi || [];
  if (!MED.length) return;

  /* ---------- Valori correnti dei quattro rami ---------- */
  const sumOk = o => Object.keys(o || {}).reduce((a, k) => a + ((o[k] && o[k].ok) || 0), 0);
  const valore = ramo => {
    if (ramo === 'ore') return totalHours();
    if (ramo === 'serie') return streak();
    if (ramo === 'rec') return (S.recs || []).length;
    if (ramo === 'quiz') return sumOk(S.quiz) + sumOk(S.gram);
    return 0;
  };
  const sbloccate = () => MED.filter(m => S.medaglie && S.medaglie[m.id]);

  /* ---------- Temi di colore ---------- */
  function applicaTema() {
    let st = document.getElementById('tema-aya');
    const t = TEMI.find(x => x.id === S.tema);
    if (!t) { if (st) st.remove(); return; }
    if (!st) { st = document.createElement('style'); st.id = 'tema-aya'; document.head.appendChild(st); }
    const css = c => '--acc:' + c[0] + ';--acc2:' + c[1] + ';--soft:color-mix(in srgb,' + c[0] + ' 13%,var(--bg))';
    st.textContent = ':root{' + css(t.chiaro) + '}@media (prefers-color-scheme:dark){:root{' + css(t.scuro) + '}}';
  }

  /* ---------- Sblocco ---------- */
  function controlla() {
    S.medaglie = S.medaglie || {};
    const nuove = MED.filter(m => !S.medaglie[m.id] && valore(m.ramo) >= m.n);
    if (!nuove.length) return;
    nuove.forEach(m => { S.medaglie[m.id] = today(); });
    save();
    mostraQuandoLibero(() => finestra(nuove));
  }
  // Non si sovrappone al premio di fine giornata né ad altre finestre
  function mostraQuandoLibero(fn, tentativi) {
    tentativi = tentativi || 0;
    if (document.querySelector('.modal') && tentativi < 80) return setTimeout(() => mostraQuandoLibero(fn, tentativi + 1), 1500);
    fn();
  }
  function riga(m) {
    const v = m.premio ? '<div class="tip">🎁 <b>Premio n. ' + m.premio + ' sbloccato!</b></div>' : '';
    return '<div style="margin:10px 0"><div style="font-size:1.1rem"><b>🏅 ' + esc(m.it) + '</b></div><div class="ar" style="text-align:center">' + esc(m.ar) + '</div>' + v +
      '<div class="mute">Bonus nel tesoretto: ' + esc(m.bonus.t) + '</div></div>';
  }
  function finestra(nuove) {
    const premi = nuove.filter(m => m.premio);
    const m = document.createElement('div'); m.className = 'modal';
    const titolo = nuove.length === 1 ? 'Nuova medaglia, Aya!' : 'Hai già sbloccato ' + nuove.length + ' medaglie!';
    m.innerHTML = '<div class="box" style="max-height:88vh;overflow:auto"><div class="trophy">🏅</div><h2>' + titolo + '</h2>' + nuove.map(riga).join('') +
      '<div class="row" style="justify-content:center;margin-top:12px">' +
      (premi.length && typeof waApri === 'function' ? '<button class="btn" id="mwa">Scrivilo ad Alberto 💬</button>' : '') +
      '<a class="btn alt" href="#/premi" id="mpr">I miei premi</a><button class="btn alt" id="mok7">Chiudi</button></div></div>';
    document.body.appendChild(m); if (typeof confetti === 'function') confetti();
    const chiudi = () => m.remove();
    $('#mok7', m).onclick = chiudi; $('#mpr', m).onclick = chiudi; m.onclick = e => { if (e.target === m) chiudi(); };
    if (premi.length && $('#mwa', m)) $('#mwa', m).onclick = () => {
      waApri('Ho sbloccato ' + (premi.length === 1 ? 'il premio n. ' + premi[0].premio : 'i premi n. ' + premi.map(p => p.premio).join(' e n. ')) + '! 🎁');
    };
  }

  /* ---------- Pagina «I miei premi» ---------- */
  function viewPremi() {
    controlla();
    S.medaglie = S.medaglie || {};
    const got = sbloccate(), premiTot = MED.filter(m => m.premio), premiOk = premiTot.filter(m => S.medaglie[m.id]);
    let html = '<div class="card"><h2>I miei premi 🏅</h2><div class="ar" style="text-align:center">جوايزي</div>' +
      '<div class="stats"><div class="stat"><div class="big">' + got.length + ' / ' + MED.length + '</div>medaglie</div>' +
      '<div class="stat"><div class="big">' + premiOk.length + ' / ' + premiTot.length + '</div>premi sbloccati 🎁</div></div>' +
      '<div class="mute" style="margin-top:8px">Ogni medaglia sblocca un bonus dentro il programma. Alcune medaglie sbloccano anche un premio vero: quando succede, dillo ad Alberto!</div></div>';

    html += Object.keys(RAMI).map(k => {
      const R = RAMI[k], ms = MED.filter(m => m.ramo === k), v = valore(k), prox = ms.find(m => v < m.n);
      const vis = k === 'ore' ? Math.round(v * 10) / 10 : Math.floor(v);
      const barra = prox ? '<div class="bar"><i style="width:' + Math.min(100, Math.round(100 * v / prox.n)) + '%"></i></div><div class="mute">' + vis + ' su ' + prox.n + ' ' + R.unita + ' per la prossima medaglia</div>' : '<div class="ok">Hai raggiunto tutte le medaglie di questa serie 🎉</div>';
      return '<div class="card"><h3>' + R.e + ' ' + esc(R.nome) + ' <span class="ar" style="display:inline;font-size:.95rem">· ' + esc(R.ar) + '</span></h3>' + barra +
        '<div style="margin-top:8px">' + ms.map(m => {
          const ok = !!S.medaglie[m.id];
          return '<div class="check" style="' + (ok ? '' : 'opacity:.6') + '"><span style="font-size:1.4rem">' + (ok ? '🏅' : '🔒') + '</span><div style="flex:1"><b>' + esc(m.it) + '</b> <span class="mute">(' + m.n + ' ' + R.unita + ')</span>' +
            '<div class="ar">' + esc(m.ar) + '</div>' +
            (m.premio ? '<div>' + (ok ? '🎁 <b>Premio n. ' + m.premio + '</b>' : '🎁 Premio a sorpresa') + '</div>' : '') +
            '<div class="mute">' + (ok ? 'Sbloccata il ' + esc(S.medaglie[m.id].split('-').reverse().join('/')) : 'Bonus a sorpresa') + '</div></div></div>';
        }).join('') + '</div></div>';
    }).join('');

    const tesoro = got.slice().sort((a, b) => S.medaglie[b.id] < S.medaglie[a.id] ? -1 : S.medaglie[b.id] > S.medaglie[a.id] ? 1 : 0);
    const temi = tesoro.filter(m => m.bonus.tipo === 'tema');
    html += '<div class="card"><h3>🎁 Il tesoretto</h3>' + (tesoro.length ? tesoro.map(m => {
      const b = m.bonus, tag = b.tipo === 'modo' ? 'Modo di dire' : b.tipo === 'curiosita' ? 'Curiosità' : 'Tema di colore';
      return '<details style="margin:8px 0"><summary><b>' + esc(b.t) + '</b> <span class="tag">' + tag + '</span></summary><div style="margin-top:6px">' + esc(b.x) + '</div><div class="ar">' + esc(b.ar) + '</div></details>';
    }).join('') : '<div class="mute">Qui compariranno i bonus che sblocchi: modi di dire, curiosità sull\'Italia e temi di colore.</div>') + '</div>';

    if (temi.length) {
      html += '<div class="card"><h3>🎨 Colori del programma</h3><div class="row"><button class="chip ' + (!S.tema ? 'on' : '') + '" data-t="">Predefinito</button>' +
        temi.map(m => { const t = TEMI.find(x => x.id === m.bonus.tema); return '<button class="chip ' + (S.tema === t.id ? 'on' : '') + '" data-t="' + t.id + '">' + esc(t.nome) + ' · ' + esc(t.ar) + '</button>'; }).join('') + '</div></div>';
    }
    main.innerHTML = html;
    $$('[data-t]').forEach(b => b.onclick = () => { S.tema = b.dataset.t || null; save(); applicaTema(); viewPremi(); });
  }

  /* ---------- Collegamenti ---------- */
  VIEWS.premi = viewPremi;
  const prog = GROUPS.find(g => g[0] === 'Progressi');
  if (prog && !prog[1].some(x => x[0] === 'premi')) prog[1].splice(1, 0, ['premi', 'I miei premi']);

  const _ap7 = window.afterProgress;
  window.afterProgress = function () { if (_ap7) _ap7(); controlla(); };
  // Controllo anche quando cambia pagina (dopo quiz, registrazioni, esercizi)
  window.addEventListener('hashchange', () => { if (S.start) controlla(); });

  // Aspetta che i progressi di Aya siano caricati, poi applica il tema e controlla
  let tentativi = 0;
  const attendi = setInterval(() => {
    if (S.start || ++tentativi > 40) {
      clearInterval(attendi);
      if (S.start) { applicaTema(); controlla(); }
    }
  }, 500);
})();
