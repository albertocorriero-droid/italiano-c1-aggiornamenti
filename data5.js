// Contenuti aggiuntivi (quinta parte): molte più parole ed esercizi di dizione.
(function () {
  const D = window.DATA;

  D.aggiornamenti.push({ data: '2026-11-06', testo: 'Dizione: nuove coppie minime, frasi da ripetere, scioglilingua, parole per E/O aperte e chiuse, S sorda e sonora, raddoppiamento.' });

  /* ---------- Coppie minime per l'Orecchio ---------- */
  D.coppie.push(
    { a: 'fumo', b: 'fummo', cat: 'doppie' }, { a: 'polo', b: 'pollo', cat: 'doppie' }, { a: 'vile', b: 'ville', cat: 'doppie' },
    { a: 'nona', b: 'nonna', cat: 'doppie' }, { a: 'cane', b: 'canne', cat: 'doppie' }, { a: 'dita', b: 'ditta', cat: 'doppie' },
    { a: 'bruto', b: 'brutto', cat: 'doppie' }, { a: 'camino', b: 'cammino', cat: 'doppie' }, { a: 'sano', b: 'sanno', cat: 'doppie' },
    { a: 'steso', b: 'stesso', cat: 'doppie' }, { a: 'note', b: 'notte', cat: 'doppie' }, { a: 'pane', b: 'panne', cat: 'doppie' },
    { a: 'panca', b: 'banca', cat: 'pb' }, { a: 'pelle', b: 'belle', cat: 'pb' }, { a: 'pacca', b: 'bacca', cat: 'pb' }, { a: 'pasto', b: 'basto', cat: 'pb' },
    { a: 'voce', b: 'foce', cat: 'vf' }, { a: 'volta', b: 'folta', cat: 'vf' }, { a: 'vette', b: 'fette', cat: 'vf' },
    { a: 'vile', b: 'file', cat: 'vf' }, { a: 'vede', b: 'fede', cat: 'vf' },
    { a: 'lena', b: 'legna', cat: 'gli_gn' }, { a: 'rena', b: 'regna', cat: 'gli_gn' }, { a: 'canna', b: 'cagna', cat: 'gli_gn' },
    { a: 'vela', b: 'veglia', cat: 'gli_gn' }, { a: 'molle', b: 'moglie', cat: 'gli_gn' },
    { a: 'cena', b: 'scena', cat: 'sc' }, { a: 'celta', b: 'scelta', cat: 'sc' }, { a: 'cappa', b: 'scappa', cat: 'sc' }, { a: 'carpa', b: 'scarpa', cat: 'sc' },
    { a: 'cesto', b: 'gesto', cat: 'cg' }, { a: 'cotta', b: 'gotta', cat: 'cg' }, { a: 'callo', b: 'gallo', cat: 'cg' },
    { a: 'rana', b: 'lana', cat: 'r' }, { a: 'riso', b: 'liso', cat: 'r' }, { a: 'rotto', b: 'lotto', cat: 'r' },
    { a: 'corto', b: 'colto', cat: 'r' }, { a: 'vero', b: 'velo', cat: 'r' }
  );

  /* ---------- Frasi in più per «Ripeti» ---------- */
  const more = {
    vocali: ['Ogni sera leggo una pagina ad alta voce.', 'Il tempo è bello e la gente passeggia sul lungomare.', 'Ho un\'idea nuova per la puntata di domani.', 'Una volta all\'anno torno a casa per una settimana.'],
    doppie: ['Abbiamo fatto tutto in fretta, ma è venuto bene.', 'Mettete le carte nella cartella rossa.', 'Il gatto dorme sotto il letto della nonna.', 'Allora, ditemi: chi è arrivato per primo?'],
    pb: ['Il pubblico applaude il primo ospite della puntata.', 'Porta una borsa piena di libri e di pane.', 'Bisogna parlare piano e bere un po\' d\'acqua.', 'Il porto di Bari è pieno di barche.'],
    vf: ['Vorrei una fetta di torta e un caffè, per favore.', 'Il vento forte fa volare le foglie verso il fiume.', 'Ogni venerdì facciamo una festa in famiglia.', 'Ho visto un film vecchio e divertente.'],
    gli_gn: ['Gli ospiti vogliono un consiglio sul viaggio in Sardegna.', 'Il ragno sbaglia strada e finisce nella bottiglia.', 'Sogno una vigna sulle colline e un bagno nel mare.', 'Le famiglie si riuniscono ogni domenica.'],
    sc: ['Lo sciopero dei treni è finito ieri sera.', 'Esco presto e scelgo una sciarpa calda.', 'Conosci la scienziata che ha scritto il libro?', 'Il pesce fresco si cucina con poche cose.'],
    cg: ['Ci vediamo in centro alle cinque, davanti alla chiesa.', 'Giorgio gioca a carte con gli amici al circolo.', 'Chiedo un gelato al cioccolato e alla ciliegia.', 'Il giornalista ha chiuso il collegamento in anticipo.'],
    r: ['Raccontare la realtà richiede rigore e rispetto.', 'Il treno regionale arriva a Roma alle tre.', 'Ricordo ancora il rumore del mare in primavera.', 'Per prima cosa, ringrazio chi ci ascolta da casa.'],
    accento: ['Il medico ha letto il referto con attenzione.', 'Abito al terzo piano, ma l\'abito nuovo è in negozio.', 'Leggo il titolo e poi intitolo il servizio.', 'La rubrica telefonica è nel cassetto dell\'ufficio.'],
    ritmo: ['Secondo le prime informazioni, non ci sono feriti.', 'In collegamento dalla redazione, la nostra inviata.', 'Ma andiamo con ordine: che cosa è successo stamattina?', 'Grazie per l\'attenzione, e arrivederci alla prossima settimana.']
  };
  Object.keys(more).forEach(c => D.frasi[c].push(...more[c]));

  /* ---------- Scioglilingua in più ---------- */
  D.scioglilingua.push(
    { t: 'Sereno è, sereno sarà, se non sarà sereno si rasserenerà.', cat: 'r' },
    { t: 'Sul tagliere l\'aglio taglia, non tagliare la tovaglia: la tovaglia non è aglio, se la tagli fai uno sbaglio.', cat: 'gli_gn' },
    { t: 'Stanno stretti sotto i letti sette spettri a denti stretti.', cat: 'doppie' },
    { t: 'Al pozzo dei pazzi c\'è una pazza che lava una pezza; arriva un pazzo con un pezzo di pizza e dà un pizzico alla pazza.', cat: 'doppie' },
    { t: 'Paolo, povero pittore, pitturava paesaggi per poco prezzo.', cat: 'pb' },
    { t: 'Ventitré vecchi vigili videro volare veloci venti vespe.', cat: 'vf' },
    { t: 'La scimmia scivola sullo scoglio e sceglie lo sciroppo.', cat: 'sc' },
    { t: 'Gigi, il gatto grigio, gioca in giardino col ghiro e con la gazza.', cat: 'cg' },
    { t: 'Figlio, sfoglia la foglia; sfogliala bene, figlio, che la foglia si sfoglia.', cat: 'gli_gn' }
  );

  /* ---------- Ortoepia: regole e parole in più ---------- */
  const O = D.ortoepia;
  O.regoleVocali.push(
    'Dittonghi «uo» e «ie»: la vocale accentata è aperta (uòmo, buòno, scuòla, cièlo, piède). · في uo وie الحرف المنبور ديما مفتوح.',
    'Tendenze: -mento, -ezza, -etto, -ese → e chiusa (moménto, bellézza, librétto, francése); -enza, -ente → e aperta (paziènza, gènte). · النهايات -mento, -ezza, -etto, -ese فيها E مسكّرة، و-enza و-ente فيها E مفتوحة. فما استثناءات.'
  );
  O.vocali.push(
    { w: 'festa', v: 'e', k: 'a' }, { w: 'tempo', v: 'e', k: 'a' }, { w: 'sempre', v: 'e', k: 'a' }, { w: 'presto', v: 'e', k: 'a' },
    { w: 'letto', v: 'e', k: 'a' }, { w: 'vento', v: 'e', k: 'a' }, { w: 'lei', v: 'e', k: 'a' }, { w: 'treno', v: 'e', k: 'a' },
    { w: 'medico', v: 'e', k: 'a' }, { w: 'secolo', v: 'e', k: 'a' }, { w: 'regola', v: 'e', k: 'a' }, { w: 'guerra', v: 'e', k: 'a' },
    { w: 'ferro', v: 'e', k: 'a' }, { w: 'pezzo', v: 'e', k: 'a' }, { w: 'sedia', v: 'e', k: 'a' }, { w: 'ecco', v: 'e', k: 'a' },
    { w: 'cielo', v: 'e', k: 'a', n: 'Dittongo «ie»: e aperta.' }, { w: 'piede', v: 'e', k: 'a', n: 'Dittongo «ie»: e aperta.' },
    { w: 'pazienza', v: 'e', k: 'a', n: 'Suffisso -enza: tendenza a e aperta.' },
    { w: 'pesce', v: 'e', k: 'c' }, { w: 'mela', v: 'e', k: 'c' }, { w: 'freddo', v: 'e', k: 'c' }, { w: 'stesso', v: 'e', k: 'c' },
    { w: 'vedere', v: 'e', k: 'c' }, { w: 'fede', v: 'e', k: 'c' }, { w: 'legno', v: 'e', k: 'c' }, { w: 'spesso', v: 'e', k: 'c' },
    { w: 'candela', v: 'e', k: 'c' }, { w: 'chiesa', v: 'e', k: 'c' }, { w: 'testa', v: 'e', k: 'c' }, { w: 'lettera', v: 'e', k: 'c' },
    { w: 'fresco', v: 'e', k: 'c' }, { w: 'neve', v: 'e', k: 'c' }, { w: 'meno', v: 'e', k: 'c' }, { w: 'segno', v: 'e', k: 'c' },
    { w: 'momento', v: 'e', k: 'c', n: 'Suffisso -mento: tendenza a e chiusa.' }, { w: 'bellezza', v: 'e', k: 'c', n: 'Suffisso -ezza: tendenza a e chiusa.' },
    { w: 'francese', v: 'e', k: 'c', n: 'Suffisso -ese: tendenza a e chiusa.' },
    { w: 'uomo', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' }, { w: 'fuoco', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' },
    { w: 'buono', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' }, { w: 'scuola', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' },
    { w: 'nuovo', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' }, { w: 'cuore', v: 'o', k: 'a', n: 'Dittongo «uo»: o aperta.' },
    { w: 'moda', v: 'o', k: 'a' }, { w: 'oggi', v: 'o', k: 'a' }, { w: 'forte', v: 'o', k: 'a' }, { w: 'morte', v: 'o', k: 'a' },
    { w: 'corpo', v: 'o', k: 'a' }, { w: 'donna', v: 'o', k: 'a' }, { w: 'poco', v: 'o', k: 'a' }, { w: 'oro', v: 'o', k: 'a' },
    { w: 'però', v: 'o', k: 'a', n: 'Accento grave finale: sempre aperta.' },
    { w: 'bocca', v: 'o', k: 'c' }, { w: 'giorno', v: 'o', k: 'c' }, { w: 'mondo', v: 'o', k: 'c' }, { w: 'sopra', v: 'o', k: 'c' },
    { w: 'ora', v: 'o', k: 'c' }, { w: 'solo', v: 'o', k: 'c' }, { w: 'forno', v: 'o', k: 'c' }, { w: 'conto', v: 'o', k: 'c' },
    { w: 'ponte', v: 'o', k: 'c' }, { w: 'fronte', v: 'o', k: 'c' }, { w: 'coda', v: 'o', k: 'c' }, { w: 'mostra', v: 'o', k: 'c' },
    { w: 'lavoro', v: 'o', k: 'c' }, { w: 'colore', v: 'o', k: 'c', n: 'Suffisso -ore: tendenza a o chiusa.' },
    { w: 'nazione', v: 'o', k: 'c', n: 'Suffisso -ione: tendenza a o chiusa.' }, { w: 'famoso', v: 'o', k: 'c', n: 'Suffisso -oso: tendenza a o chiusa.' }
  );
  O.coppieAccento.push(
    { a: 'mènto (io mento, dico bugie)', b: 'ménto (il mento)' }, { a: 'tèma (l\'argomento)', b: 'téma (il timore)' },
    { a: 'vòlto (girato)', b: 'vólto (il viso)' }, { a: 'fòro (la piazza romana)', b: 'fóro (il buco)' },
    { a: 'ròsa (il fiore)', b: 'rósa (rosicchiata)' }, { a: 'èsca (che egli esca)', b: 'ésca (per pescare)' },
    { a: 'còrso (della Corsica)', b: 'córso (la lezione, la via)' }
  );
  O.sz.push(
    { w: 'sbarco', k: 'z' }, { w: 'sdegno', k: 'z' }, { w: 'sguardo', k: 'z' }, { w: 'slancio', k: 'z' },
    { w: 'smettere', k: 'z' }, { w: 'snodo', k: 'z' }, { w: 'sradicare', k: 'z' }, { w: 'sveglia', k: 'z' },
    { w: 'sapere', k: 's' }, { w: 'sindaco', k: 's' }, { w: 'falso', k: 's' }, { w: 'borsa', k: 's' },
    { w: 'corsa', k: 's' }, { w: 'sasso', k: 's' }, { w: 'posso', k: 's' }, { w: 'spazio', k: 's' }
  );
  O.raddoppiamento.es.push(
    'da me → da mme', 'so bene → so bbene', 'fra poco → fra ppoco', 'chi sei → chi ssei',
    'ha detto → ha ddetto', 'sto bene → sto bbene', 'tu sai → tu ssai', 'già fatto → già ffatto'
  );
})();
