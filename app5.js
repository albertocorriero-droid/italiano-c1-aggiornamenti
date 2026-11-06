/* ---------- Aggiornamento del programma da remoto ---------- */
function viewAggiorna() {
  main.innerHTML = '<div class="card"><h2>Aggiorna il programma <span class="ar" style="display:inline">· تحديث البرنامج</span></h2>' +
    '<p>Scarica i nuovi contenuti (esercizi, letture, lessico) preparati per te. I tuoi progressi, le registrazioni e le tue foto non vengono toccati.</p>' +
    '<p class="ar">يحمّل المحتوى الجديد. تقدّمك وتسجيلاتك وصورك ما يتبدّلوش.</p>' +
    '<div id="upd-stato">Controllo in corso…</div>' +
    '<div class="row" style="margin-top:12px"><button id="upd-check">Controlla di nuovo</button> <button id="upd-go" style="display:none">Scarica aggiornamento</button> <button id="upd-back" style="display:none" class="ghost">Torna alla versione precedente</button></div></div>';
  const st = $('#upd-stato'), go = $('#upd-go'), back = $('#upd-back');
  const chiama = (url, post) => fetch(url, post ? { method: 'POST' } : {}).then(r => r.json());
  function controlla() {
    st.textContent = 'Controllo in corso…'; go.style.display = 'none';
    chiama('/api/update/check').then(r => {
      if (!r.ok) { st.innerHTML = '<b>' + esc(r.errore) + '</b>'; return; }
      back.style.display = r.backup ? '' : 'none';
      if (r.aggiornabile) {
        st.innerHTML = '<b>C\'è un aggiornamento!</b> Versione ' + r.installata + ' → ' + r.disponibile + '<br>' + (r.note ? esc(r.note) : '') + (r.data ? '<br><small>' + esc(r.data) + '</small>' : '');
        go.style.display = '';
      } else {
        st.innerHTML = 'Il programma è aggiornato (versione ' + r.installata + ').';
      }
    }).catch(() => { st.innerHTML = '<b>Il programma non risponde. Riavvialo con Avvia.</b>'; });
  }
  $('#upd-check').onclick = controlla;
  go.onclick = () => {
    go.disabled = true; st.textContent = 'Scarico…';
    chiama('/api/update/apply', true).then(r => {
      go.disabled = false;
      if (!r.ok) { st.innerHTML = '<b>' + esc(r.errore) + '</b>'; return; }
      st.innerHTML = '<b>Fatto!</b> Versione ' + r.installata + ' installata. Ricarico la pagina…';
      setTimeout(() => location.reload(), 1500);
    }).catch(() => { go.disabled = false; st.textContent = 'Errore di rete.'; });
  };
  back.onclick = () => {
    if (!confirm('Tornare alla versione precedente del programma? I tuoi progressi restano.')) return;
    chiama('/api/update/rollback', true).then(r => {
      if (!r.ok) { st.innerHTML = '<b>' + esc(r.errore) + '</b>'; return; }
      st.innerHTML = 'Ripristinata la versione ' + r.installata + '. Ricarico…';
      setTimeout(() => location.reload(), 1200);
    });
  };
  controlla();
}
VIEWS.aggiorna = viewAggiorna;
GROUPS[6][1].push(['aggiorna', 'Aggiorna il programma']);

/* ---------- Avviso automatico: c'è un aggiornamento ---------- */
(function avvisoAggiornamento() {
  const mostra = r => {
    if (document.getElementById('upd-popup')) return;
    const d = document.createElement('div');
    d.id = 'upd-popup';
    d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99999;display:flex;align-items:center;justify-content:center';
    d.innerHTML = '<div style="background:var(--card,#fff);color:var(--ink,#1d2433);border-radius:16px;padding:24px 28px;max-width:420px;box-shadow:0 10px 40px rgba(0,0,0,.3);text-align:center;font-size:17px">' +
      '<div style="font-size:42px">🎁</div><h2 style="margin:8px 0">C\'è un aggiornamento!</h2>' +
      '<p>' + esc(r.note || 'Nuovi contenuti per te.') + '</p>' +
      '<p class="ar" style="direction:rtl">فمّة تحديث جديد!</p>' +
      '<div style="margin-top:16px"><button id="upd-pop-si">Aggiorna ora</button> <button id="upd-pop-no" class="ghost">Più tardi</button></div></div>';
    document.body.appendChild(d);
    document.getElementById('upd-pop-no').onclick = () => d.remove();
    document.getElementById('upd-pop-si').onclick = () => { d.remove(); location.hash = '#/aggiorna'; };
  };
  const controlla = () => fetch('/api/update/check').then(r => r.json())
    .then(r => { if (r.ok && r.aggiornabile) mostra(r); }).catch(() => {});
  setTimeout(controlla, 1500);
  setInterval(controlla, 30 * 60 * 1000);
})();
