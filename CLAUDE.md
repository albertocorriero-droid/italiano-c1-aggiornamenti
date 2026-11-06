# Italiano C1 – repository degli aggiornamenti

App locale di italiano C1 e dizione per Aya (giornalista, madrelingua arabo tunisino). Gira sul suo Mac
(server Ruby su localhost). Questo repository contiene i **contenuti aggiornabili**: lei clicca
«Progressi → Aggiorna il programma» e il suo Mac scarica la nuova versione.

## Cosa c'è qui
- `index.html`, `app.js` … `app5.js`: interfaccia e logica.
- `data.js` … `data4.js`: contenuti (settimane, frasi, coppie minime, letture, grammatica, lessico, pillole).
- `estetica.css`, `foto/` (foto con licenza libera, crediti in `foto/crediti.js`).
- `manifest.json`: generato da `pubblica.sh`. Non modificarlo a mano.
- Il server (`server.rb`), i dati di Aya (`dati/`, `foto-mie/`), `strumenti/` e `video/` NON sono qui e non si aggiornano.

## Come pubblicare un aggiornamento
1. `git pull`, poi modifica i file dei contenuti (di solito `data*.js`).
2. Spiegazioni sempre in italiano + arabo tunisino. Testi nuovi in italiano: rivederli perché suonino naturali.
3. Controlla che i file `.js` non abbiano errori di sintassi (es. `node --check data.js`).
4. `./pubblica.sh "Nota breve su cosa è cambiato"` → aumenta la versione, calcola gli hash, fa commit e push.
5. Aya clicca «Scarica aggiornamento». La nota che scrivi è quella che legge lei.

## Regole
- Nomi di file solo con lettere, numeri, `_`, `-`, `.`, `/` (lo script rifiuta gli altri).
- Estensioni ammesse: js, css, html, json, txt, jpg, png, webp, svg.
- Niente video YouTube scaricati; solo link incorporati o contenuti con licenza Creative Commons.
- Se serve cambiare `server.rb`, non basta il pulsante: va aggiornato a mano sul Mac di Aya.
- GitHub può tenere i file in cache per ~5 minuti: se Aya vede «non corrisponde», riprova dopo qualche minuto.
