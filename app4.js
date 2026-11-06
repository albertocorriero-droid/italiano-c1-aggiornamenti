'use strict';
/* Quarta parte: foto, pillole di cultura, «Emergenza dolcezza» (WhatsApp), galleria. */

/* ---------- Foto: quelle con licenza libera (foto/) + quelle personali (foto-mie/) ---------- */
let FOTO_MIE = [];
fetch('/api/foto').then(r => r.ok ? r.json() : []).then(l => { FOTO_MIE = Array.isArray(l) ? l : []; }).catch(() => {});
function tutteLeFoto() {
  return FOTO_MIE.map(f => ({ file: f, luogo: 'Le nostre foto 💗', mia: true })).concat(D.foto || []);
}
const creditoHtml = f => f.mia || !f.autore ? '' : `<a class="credit" href="${esc(f.fonte)}" target="_blank" rel="noopener" title="${esc(f.autore)} · ${esc(f.licenza)}">📷 ${esc(f.autore.slice(0, 28))} · ${esc(f.licenza)}</a>`;

/* ---------- Pillole di cultura ---------- */
const PX = () => (S.pill = S.pill || { order: [], i: 0 });
function prossimaPillola() {
  const p = PX(), n = D.pillole.length;
  p.order = (p.order || []).filter(i => i < n);
  if (!p.order.length || p.i >= p.order.length) { p.order = shuffle(D.pillole.map((_, i) => i)); p.i = 0; }
  const it = D.pillole[p.order[p.i++]]; save(); return it;
}
function pillolaDelGiorno() {
  const d = Math.floor((new Date(today()) - new Date(S.start)) / 864e5);
  return D.pillole[((d % D.pillole.length) + D.pillole.length) % D.pillole.length];
}
const pillolaHtml = it => `<div class="mute">💡 Lo sapevi?</div><h3 style="margin:.2em 0">${it.e} ${esc(it.t)}</h3><div>${esc(it.x)}</div>`;
function salvaPillola(it) { newNote(it.t, 'altro', it.e + ' ' + it.t + '\n' + it.x); toast('Salvata negli appunti'); }
// Piccola finestra tra un'attività e l'altra
function showPillola() {
  const old = document.getElementById('pop'); if (old) old.remove();
  const it = prossimaPillola(), d = document.createElement('div'); d.id = 'pop';
  d.innerHTML = pillolaHtml(it) + `<div class="row" style="margin-top:8px"><button class="btn alt" id="pp1">Un'altra</button><button class="btn alt" id="pp2">📝</button><button class="btn alt" id="pp3">Chiudi</button></div>`;
  document.body.appendChild(d);
  const close = () => { if (d.parentNode) d.remove(); };
  $('#pp1', d).onclick = () => { close(); showPillola(); }; $('#pp2', d).onclick = () => salvaPillola(it); $('#pp3', d).onclick = close;
  setTimeout(close, 25000);
}
const _ap4 = window.afterProgress;
window.afterProgress = function () {
  if (_ap4) _ap4();
  const n = dayDone(today()).length;
  if (n > (window.__lastN || 0) && minutesOf(today()) < TOTAL_MIN) setTimeout(showPillola, 1100);
  window.__lastN = n;
};

/* ---------- Emergenza dolcezza → WhatsApp ---------- */
function waApri(testo) {
  const url = 'https://wa.me/' + D.emergenza.numero + '?text=' + encodeURIComponent(testo);
  window.open(url, '_blank', 'noopener');
}
function mostraEmergenza() {
  const E = D.emergenza, m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="box" style="text-align:left"><div style="text-align:center"><div class="trophy">💗</div><h2>${esc(E.titolo)}</h2><div class="mute">${esc(E.sottotitolo)}</div></div>
    <div style="margin-top:12px">${E.messaggi.map((x, i) => `<button class="sos-btn" data-i="${i}"><span>${x.e}</span>${esc(x.b)}</button>`).join('')}</div>
    <textarea id="sosm" rows="2" placeholder="Oppure scrivi tu un messaggio…" style="margin-top:8px"></textarea>
    <div class="row" style="margin-top:8px;justify-content:space-between"><button class="btn" id="sosi">Apri WhatsApp 💬</button><button class="btn alt" id="sosc">Chiudi</button></div>
    <div class="mute" style="margin-top:8px;font-size:.8rem">Si apre WhatsApp con il messaggio già pronto: lo invii tu, quando vuoi.</div></div>`;
  document.body.appendChild(m);
  const close = () => m.remove();
  $$('.sos-btn', m).forEach(b => b.onclick = () => { waApri(E.messaggi[+b.dataset.i].m); close(); });
  $('#sosi', m).onclick = () => { const t = $('#sosm', m).value.trim(); if (!t) return toast('Scrivi qualcosa, o scegli una delle opzioni'); waApri(t); close(); };
  $('#sosc', m).onclick = close; m.onclick = e => { if (e.target === m) close(); };
}
function initSos() {
  const b = document.createElement('button'); b.className = 'fab-sos'; b.title = D.emergenza.titolo;
  b.innerHTML = '💗 <span class="t">' + esc(D.emergenza.titolo) + '</span>'; b.onclick = mostraEmergenza; document.body.appendChild(b);
}

/* ---------- Oggi: foto, saluto in primo piano, pillola del giorno ---------- */
const _vo4 = VIEWS.oggi;
VIEWS.oggi = function () {
  _vo4();
  const h2 = $('h2.ar', main), card = h2 ? h2.closest('.card') : null; if (!card) return;
  const it = h2.nextElementSibling, list = tutteLeFoto();
  const day = Math.floor((new Date(today()) - new Date(S.start)) / 864e5); let k = ((day % Math.max(1, list.length)) + Math.max(1, list.length)) % Math.max(1, list.length);
  const hero = document.createElement('div'); hero.className = 'hero card';
  const paint = () => {
    const f = list[k]; if (!f) return;
    hero.style.backgroundImage = `url("${f.file}")`;
    hero.querySelector && ((hero.querySelector('.luogo') || {}).textContent = '📍 ' + f.luogo);
    const c = hero.querySelector && hero.querySelector('.credit'); if (c) c.remove();
    hero.insertAdjacentHTML('afterbegin', creditoHtml(f));
  };
  hero.innerHTML = '<span class="luogo"></span>'; hero.append(h2); if (it) hero.append(it);
  if (list.length > 1) { const b = document.createElement('button'); b.className = 'btn alt'; b.style.cssText = 'position:absolute;right:12px;bottom:12px;padding:2px 10px'; b.textContent = '📷'; b.title = 'Cambia foto'; b.onclick = () => { k = (k + 1) % list.length; paint(); }; hero.append(b); }
  card.before(hero); paint();
  const p = pillolaDelGiorno();
  card.insertAdjacentHTML('afterend', `<div class="card pillola" id="pcard">${pillolaHtml(p)}<div class="row" style="margin-top:8px"><button class="btn alt" id="pn">Un'altra pillola</button><button class="btn alt" id="pm">📝 Negli appunti</button></div></div>`);
  let cur = p;
  const pn = $('#pn'), pm = $('#pm');
  if (pn) pn.onclick = () => { cur = prossimaPillola(); const c = $('#pcard'); c.innerHTML = pillolaHtml(cur) + '<div class="row" style="margin-top:8px"><button class="btn alt" id="pn">Un\'altra pillola</button><button class="btn alt" id="pm">📝 Negli appunti</button></div>'; $('#pn').onclick = pn.onclick; $('#pm').onclick = () => salvaPillola(cur); };
  if (pm) pm.onclick = () => salvaPillola(cur);
};

/* ---------- Galleria «Italia in foto» ---------- */
function viewGalleria() {
  const list = tutteLeFoto();
  main.innerHTML = `<div class="card"><h2>Italia in foto 📷</h2><div class="mute">Luoghi italiani con i loro crediti. Per ogni foto ho indicato autore e licenza: sono immagini con licenza libera di Wikimedia Commons. Le foto personali si aggiungono copiandole nella cartella <code>foto-mie</code> (formato JPG, PNG o WebP).</div></div>
    <div class="gal">${list.map(f => `<figure><img src="${esc(f.file)}" alt="${esc(f.luogo)}" loading="lazy"><figcaption><b>${esc(f.luogo)}</b><br>${f.mia ? 'Foto personale 💗' : `${esc(f.autore)} · <a href="${esc(f.licenzaUrl || f.fonte)}" target="_blank" rel="noopener">${esc(f.licenza)}</a> · <a href="${esc(f.fonte)}" target="_blank" rel="noopener">fonte</a>`}</figcaption></figure>`).join('')}</div>`;
}

/* ---------- Registrazione e avvio ---------- */
VIEWS.galleria = viewGalleria;
GROUPS[5][1].push(['galleria', 'Italia in foto']);
initSos();
