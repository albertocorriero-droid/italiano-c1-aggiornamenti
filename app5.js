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
