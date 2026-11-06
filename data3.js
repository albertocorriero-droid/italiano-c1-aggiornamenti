// Contenuti aggiuntivi (terza parte): nuovi argomenti di grammatica, letture, esercizi, lessico, corso di radio.
(function () {
  const D = window.DATA;

  /* ---------- Grammatica: 3 argomenti in più ---------- */
  D.grammatica.push(
    {
      id: 'accordo', nome: 'Nomi, aggettivi e accordo',
      regola: [
        'Nomi in -ma di origine greca sono maschili: il problema, il tema, il sistema → i problemi, i temi, i sistemi.',
        'Plurali irregolari: l\'uomo → gli uomini; l\'uovo → le uova; il dito → le dita; il braccio → le braccia; la mano → le mani; l\'ala → le ali.',
        'Nomi in -tà e -tù sono femminili e invariabili: la città → le città; l\'università → le università.',
        '«Gente» è singolare: la gente è gentile. «Persone» è femminile: molte persone, tante persone.',
        'Bello davanti al nome si comporta come l\'articolo: un bel libro, un bell\'amico, un bello zaino, dei bei libri, dei begli amici.'
      ],
      ar: 'في الإيطالية كل اسم مذكر أو مؤنث والصفة تتوافق معاه. كلمة gente مفرد: la gente è gentile. وpersone مؤنث: molte persone.',
      errori: [
        ['Ci sono molti persone.', 'Ci sono molte persone.'],
        ['La gente sono gentili.', 'La gente è gentile.'],
        ['I problema sono tanti.', 'I problemi sono tanti.'],
        ['Le uova sono freschi.', 'Le uova sono fresche.']
      ],
      es: [
        { q: 'Ci sono ___ persone in sala.', o: ['molti', 'molte', 'molto'], a: 1, w: '«Persone» è femminile plurale: molte persone.' },
        { q: 'La gente ___ molto gentile.', o: ['è', 'sono', 'siamo'], a: 0, w: '«Gente» è un nome collettivo singolare.' },
        { q: 'Il plurale di «problema» è…', o: ['i problema', 'i problemi', 'le problemi'], a: 1, w: 'Il problema (maschile) → i problemi.' },
        { q: 'Ho comprato sei ___ fresche.', o: ['uovi', 'uova', 'uove'], a: 1, w: 'L\'uovo ha il plurale femminile irregolare: le uova.' },
        { q: 'Le ___ italiane sono piene di storia.', o: ['città', 'citti', 'cittadi'], a: 0, w: 'I nomi in -tà sono invariabili.' },
        { q: 'Mi fanno male le ___.', o: ['dita', 'diti', 'ditti'], a: 0, w: 'Il dito → le dita (plurale femminile irregolare).' },
        { q: 'Che ___ giornata!', o: ['bella', 'bello', 'bel'], a: 0, w: 'Bello si accorda con «giornata» (femminile).' },
        { q: 'Un ___ amico mi ha aiutata.', o: ['bell\'', 'bel', 'bello'], a: 0, w: 'Davanti a vocale: un bell\'amico.' }
      ]
    },
    {
      id: 'futuro', nome: 'Futuro semplice e anteriore, probabilità',
      regola: [
        'Futuro semplice: azioni future (Domani partirò) e probabilità nel presente (Sarà a casa = probabilmente è a casa).',
        'Futuro anteriore: un\'azione futura prima di un\'altra futura (Quando avrò finito, ti chiamerò) e probabilità nel passato (Avrà perso il treno = probabilmente l\'ha perso).',
        'Nel parlato il presente con valore di futuro è comunissimo: Domani parto. Il futuro dà un tono più formale o più incerto.',
        'Irregolari: essere → sarò; avere → avrò; andare → andrò; venire → verrò; fare → farò; potere → potrò; dovere → dovrò; vedere → vedrò; sapere → saprò; volere → vorrò; dare → darò; stare → starò.',
        'Dopo quando, appena, dopo che si usa il futuro (anteriore) se l\'azione è futura: Quando avrò finito, ti scrivo.'
      ],
      ar: 'الـ futuro يتستعمل للمستقبل وزادة للاحتمال: sarà a casa (ممكن يكون في الدار). futuro anteriore: حاجة تصير قبل حاجة أخرى في المستقبل.',
      errori: [
        ['Verrò quando ho finito.', 'Verrò quando avrò finito.'],
        ['Andarò a Bari.', 'Andrò a Bari.'],
        ['Faremo / Farerò domani.', 'Farò domani.']
      ],
      es: [
        { q: 'Domani ___ a Bari per un servizio.', o: ['andrò', 'andai', 'andavo'], a: 0, w: 'Futuro irregolare di andare: andrò.' },
        { q: 'Quando ___ finito, ti chiamerò.', o: ['avrò', 'ho', 'avessi'], a: 0, w: 'Futuro anteriore: avrò finito, prima di chiamare.' },
        { q: 'Dov\'è Marco? ___ in ufficio.', o: ['Sarà', 'Era', 'Fosse'], a: 0, w: 'Il futuro può esprimere una probabilità nel presente.' },
        { q: 'Non è ancora arrivato: ___ il treno.', o: ['avrà perso', 'perderà', 'ha perso'], a: 0, w: 'Probabilità nel passato: futuro anteriore (avrà perso).' },
        { q: 'Il futuro di «fare», io, è…', o: ['farò', 'farerò', 'farei'], a: 0, w: 'Fare ha il futuro irregolare farò.' },
        { q: 'Il futuro di «venire», noi, è…', o: ['verremo', 'veniremo', 'verrimo'], a: 0, w: 'Venire → verrò, verrai, verrà, verremo...' }
      ]
    },
    {
      id: 'discorso', nome: 'Discorso diretto e indiretto',
      regola: [
        'Diretto: Ha detto: «Domani vengo». Indiretto: Ha detto che il giorno dopo sarebbe venuta.',
        'Se il verbo introduttivo è al passato, i tempi cambiano: presente → imperfetto; passato prossimo → trapassato prossimo; futuro → condizionale passato; imperativo → di + infinito.',
        'Cambiano anche i riferimenti: qui → lì, oggi → quel giorno, domani → il giorno dopo, ieri → il giorno prima, questo → quello, io → lui/lei.',
        'Verbi per introdurre una citazione: dichiarare, affermare, sostenere, precisare, aggiungere, ribadire, replicare, ammettere, sottolineare, negare.',
        'Le parole tra virgolette non si modificano: se riporti in forma indiretta, resta fedele al senso.'
      ],
      ar: 'كي الفعل الأول في الماضي، الأزمنة تتبدّل: presente ← imperfetto، futuro ← condizionale passato. وكلمات الزمان والمكان تتبدّل زادة: domani ← il giorno dopo.',
      errori: [
        ['Ha detto che domani viene. (nel racconto passato)', 'Ha detto che il giorno dopo sarebbe venuto.'],
        ['Mi ha detto che sono stanca.', 'Mi ha detto che era stanca.'],
        ['Mi ha detto che vengo lì.', 'Mi ha detto di andare lì.']
      ],
      es: [
        { q: '«Sono stanca», ha detto. → Ha detto che ___ stanca.', o: ['è', 'era', 'sarebbe'], a: 1, w: 'Presente → imperfetto con verbo introduttivo al passato.' },
        { q: '«Domani verrò», ha detto. → Ha detto che ___ il giorno dopo.', o: ['verrà', 'sarebbe venuta', 'è venuta'], a: 1, w: 'Futuro → condizionale passato.' },
        { q: '«Vieni qui!», mi ha detto. → Mi ha detto ___ lì.', o: ['di venire', 'che vieni', 'venire'], a: 0, w: 'Imperativo → di + infinito (e «qui» → «lì»/«là»).' },
        { q: '«Ho finito il lavoro», ha spiegato. → Ha spiegato che ___ finito il lavoro.', o: ['ha', 'aveva', 'avrebbe'], a: 1, w: 'Passato prossimo → trapassato prossimo.' },
        { q: '«Oggi non parlo», ha detto. → Ha detto che ___ non parlava.', o: ['oggi', 'quel giorno', 'domani'], a: 1, w: 'Oggi → quel giorno.' },
        { q: 'Il ministro ha negato ___ ricevuto la lettera.', o: ['di aver', 'che ha', 'di avere stato'], a: 0, w: 'Negare di + infinito passato.' }
      ]
    }
  );
  D.gramSett = ['articoli', 'accordo', 'preposizioni', 'preposizioni', 'passati', 'passati', 'pronomi', 'futuro', 'congiuntivo', 'congiuntivo',
    'ipotetico', 'ipotetico', 'condizionale', 'discorso', 'discorso', 'passivo', 'implicite', 'connettori', 'connettori', 'congiuntivo'];

  /* ---------- Letture in più ---------- */
  D.letture.push(
    { id: 'L7', titolo: 'Notizia: la biblioteca di quartiere', nota: 'Cronaca locale: tono pulito, nessuna enfasi.',
      t: 'La biblioteca del quartiere ha riaperto le porte dopo due anni di lavori. Il nuovo spazio ospita una sala per i bambini, un angolo dedicato ai libri in lingue diverse e un\'aula per i corsi serali. Secondo la direttrice, nelle prime due settimane gli iscritti sono raddoppiati. La biblioteca resterà aperta fino alle nove di sera, dal lunedì al sabato.' },
    { id: 'L8', titolo: 'Servizio: una voce dal porto', nota: 'Racconto: ritmo più disteso, pause che fanno vedere la scena.',
      t: 'Il mercato del pesce si anima all\'alba. Tra le casse di ghiaccio e le voci dei venditori, un uomo racconta di aver cominciato questo mestiere a dodici anni, accanto al padre. Oggi insegna ai più giovani a riconoscere il pesce fresco dall\'odore e dagli occhi. «Il mare non perdona la fretta», dice, mentre pulisce il banco con un secchio d\'acqua.' },
    { id: 'L9', titolo: 'Commento: la lingua come casa', nota: 'Livello C1: frasi lunghe e immagini. Segna le pause prima di registrare.',
      t: 'Imparare una lingua non significa soltanto accumulare parole. Significa trovare un posto dove le proprie idee possano sedersi comodamente. All\'inizio la nuova lingua somiglia a una stanza in prestito: ci si muove con prudenza, si teme di rompere qualcosa. Poi, a poco a poco, si impara dove stanno le cose, si apre una finestra, si sposta una sedia. Ed è in quel momento che la stanza comincia a diventare casa.' },
    { id: 'L10', titolo: 'Radio: chiusura di puntata', nota: 'Voce calda, ritmo che rallenta, sorriso finale.',
      t: 'Siamo arrivati alla fine di questa puntata. Grazie agli ospiti che hanno condiviso con noi le loro storie e grazie a voi che ci avete seguito, in radio e online. Ricordiamo che potete scriverci o mandarci un messaggio vocale: leggeremo i vostri commenti nella prossima trasmissione. Ci ritroviamo martedì, alla stessa ora. Buona serata a tutti, e restate curiosi.' },
    { id: 'L11', titolo: 'Intervista: una risposta articolata', nota: 'Parlato elaborato: connettori e pause logiche.',
      t: 'Credo che il punto non sia scegliere tra tradizione e innovazione, ma capire che cosa vale la pena conservare. Quando abbiamo cominciato, molti ci dicevano che il progetto non sarebbe durato. Eppure, proprio le difficoltà ci hanno obbligati ad ascoltare di più le persone, e questo ha cambiato tutto.' },
    { id: 'L12', titolo: 'Cronaca breve con i numeri', nota: 'Allenati a leggere i numeri con chiarezza.',
      t: 'Sono oltre duecento le persone che sabato scorso hanno partecipato alla pulizia della spiaggia. In tre ore sono stati raccolti circa quattrocento chili di rifiuti, in gran parte plastica. L\'iniziativa, promossa da tre associazioni locali, sarà ripetuta il primo sabato di ogni mese.' }
  );

  /* ---------- Frasi e coppie minime in più ---------- */
  const more = {
    vocali: ['Il mese scorso ho letto un bel libro sul mare.', 'Dieci persone vengono a cena stasera.'],
    doppie: ['Il capello cade sotto il cappello di mio nonno.', 'Mi dispiace, è già tutto pronto.'],
    pb: ['Bevo il tè con poco zucchero e tanta pazienza.', 'La banda suona vicino al porto.'],
    vf: ['Vorrei vedere i fiori freschi di Venezia.', 'Il fiume scorre verso la valle.'],
    gli_gn: ['Gli ho detto che il bagno è in fondo.', 'La sveglia suona e mi alzo con la voglia di lavorare.'],
    sc: ['La scena finale mi ha sciolto il cuore.', 'Prima di uscire, controllo la scheda.'],
    cg: ['Il cielo è chiaro e la giornata è lunga.', 'Gianni cerca ghiaccio e giaccone per la gita.'],
    r: ['Il ritmo della radio corre sul filo della voce.', 'Sono arrivata presto per fare una rapida prova.'],
    accento: ['Subito dopo il telegiornale arrivano le previsioni.', 'Ho capito il concetto, ma non il contesto.'],
    ritmo: ['Nel pomeriggio, dopo la riunione, ascolteremo i messaggi degli ascoltatori.', 'Il sindaco, interpellato dai giornalisti, non ha voluto commentare.']
  };
  Object.keys(more).forEach(c => D.frasi[c].push(...more[c]));
  D.coppie.push(
    { a: 'sono', b: 'sonno', cat: 'doppie' }, { a: 'capelli', b: 'cappelli', cat: 'doppie' }, { a: 'sera', b: 'serra', cat: 'doppie' },
    { a: 'moto', b: 'motto', cat: 'doppie' }, { a: 'tono', b: 'tonno', cat: 'doppie' }, { a: 'eco', b: 'ecco', cat: 'doppie' },
    { a: 'papa', b: 'pappa', cat: 'doppie' }, { a: 'copia', b: 'coppia', cat: 'doppie' }, { a: 'speso', b: 'spesso', cat: 'doppie' },
    { a: 'bere', b: 'pere', cat: 'pb' }, { a: 'banda', b: 'panda', cat: 'pb' },
    { a: 'ali', b: 'agli', cat: 'gli_gn' }, { a: 'sale', b: 'scale', cat: 'sc' },
    { a: 'gelo', b: 'celo', cat: 'cg' }, { a: 'giro', b: 'ciro', cat: 'cg' },
    { a: 'pera', b: 'pela', cat: 'r' }, { a: 'sera', b: 'sela', cat: 'r' }, { a: 'moro', b: 'molo', cat: 'r' }
  );

  /* ---------- Esame: contenuti in più ---------- */
  D.esame.colloquio.push(
    'Quale errore in italiano le capita ancora e come lo corregge?', 'Che cosa farebbe se potesse intervistare chiunque?', 'Come racconterebbe la sua città a un ascoltatore che non la conosce?',
    'Che ruolo hanno i social nel suo lavoro?', 'Quale notizia recente l\'ha colpita e perché?', 'In che cosa la sua formazione si distingue da quella di un collega italiano?'
  );
  D.esame.monologo.push(
    { t: 'Le notizie false e la responsabilità dei giornalisti', p: ['Come si riconoscono?', 'Chi deve intervenire?', 'Un consiglio al pubblico'] },
    { t: 'La musica come ponte tra culture', p: ['Un esempio concreto', 'Perché funziona?', 'Che cosa può fare la radio?'] },
    { t: 'Lavorare da giovani all\'estero', p: ['Opportunità', 'Difficoltà', 'Consigli per chi parte'] },
    { t: 'Il valore delle lingue minoritarie e dei dialetti', p: ['Perché preservarli?', 'Rischi', 'Il ruolo dei media'] }
  );

  /* ---------- Lessico in più ---------- */
  D.lessicoExtra.push(
    { p: 'nevralgico', d: 'Cruciale e delicato; di un punto da cui dipende il resto.', e: 'Il porto è un nodo nevralgico per l\'economia della città.' },
    { p: 'dirompente', d: 'Che ha un effetto forte e improvviso.', e: 'La notizia ha avuto un impatto dirompente.' },
    { p: 'cruciale', d: 'Decisivo.', e: 'Il prossimo incontro sarà cruciale.' },
    { p: 'inderogabile', d: 'Che non si può rimandare o evitare.', e: 'È una scadenza inderogabile.' },
    { p: 'plausibile', d: 'Che si può credere o accettare come ragionevole.', e: 'La tua spiegazione è plausibile.' },
    { p: 'mitigare', d: 'Rendere meno grave o meno forte.', e: 'Occorre mitigare gli effetti della crisi.' },
    { p: 'inficiare', d: 'Compromettere la validità di qualcosa.', e: 'Un errore può inficiare l\'intera ricerca.' },
    { p: 'tangibile', d: 'Concreto, evidente.', e: 'Abbiamo ottenuto risultati tangibili.' },
    { p: 'prassi', d: 'Modo abituale di agire.', e: 'È prassi verificare le fonti prima di pubblicare.' },
    { p: 'sommesso', d: 'Detto con voce bassa, discreto.', e: 'Parlava con tono sommesso.' },
    { p: 'elusivo', d: 'Che evita di rispondere in modo chiaro.', e: 'La sua risposta è stata elusiva.' },
    { p: 'scevro', d: 'Privo, libero da (con «da»).', e: 'Un racconto scevro da pregiudizi.' },
    { p: 'dispendioso', d: 'Che costa molto, in denaro o in energie.', e: 'Il progetto è troppo dispendioso.' },
    { p: 'perentorio', d: 'Che non ammette repliche.', e: 'Ha dato un ordine perentorio.' },
    { p: 'ambivalente', d: 'Che ha due aspetti o sentimenti opposti.', e: 'Ho un rapporto ambivalente con la città.' },
    { p: 'anelare', d: 'Desiderare intensamente.', e: 'Molti giovani anelano a una vita più stabile.' },
    { p: 'ammonire', d: 'Avvertire con severità.', e: 'Il giudice ha ammonito i presenti.' },
    { p: 'esortare', d: 'Invitare con insistenza.', e: 'Il sindaco ha esortato i cittadini alla calma.' },
    { p: 'perorare', d: 'Sostenere con calore una causa.', e: 'Ha perorato la causa della biblioteca.' },
    { p: 'pregnante', d: 'Ricco di significato.', e: 'Una frase breve ma pregnante.' }
  );

  /* ---------- Corso di radio in 8 lezioni ---------- */
  D.corsoRadio = [
    { id: 'r1', titolo: 'Voce e microfono', it: 'Il microfono ascolta tutto: respiro, vicinanza, consonanti esplosive.', ar: 'الميكروفون يسمع كل شيء: التنفس والبعد والحروف القوية.',
      passi: ['Stai in piedi o seduta dritta: il diaframma lavora meglio.', 'Tieni il microfono a circa una spanna dalla bocca e leggermente di lato, per attenuare le P e le B.', 'Respira prima della frase, non dentro il microfono.', 'Fai una prova a tre distanze e riascoltati: scegli quella in cui la voce è piena e senza fruscii.'],
      compito: 'Leggi il testo L4 a tre distanze diverse e confronta le registrazioni.', testo: 'L4' },
    { id: 'r2', titolo: 'L\'apertura della trasmissione', it: 'In 30 secondi: saluto, nome del programma, tema, promessa per l\'ascoltatore.', ar: 'في 30 ثانية: تحية، اسم البرنامج، الموضوع، ووعد للمستمع.',
      passi: ['Saluto breve e caldo.', 'Nome del programma e il tuo nome.', 'Il tema della puntata in una frase.', 'Una promessa: che cosa si porterà a casa chi ascolta.'],
      compito: 'Registra un\'apertura di 30 secondi, senza leggere.', testo: null },
    { id: 'r3', titolo: 'Il lancio di una notizia', it: 'Piramide rovesciata: prima la notizia più importante, poi i dettagli. Frasi brevi, verbi attivi.', ar: 'الخبر الأهم أولا، وبعدين التفاصيل. جمل قصيرة.',
      passi: ['Rispondi alle 5 W (chi, che cosa, dove, quando, perché).', 'Una notizia per frase, massimo 25 parole per frase.', 'Arrotonda i numeri: «circa quattrocento chili», non «398».', 'Leggi a voce alta prima di registrare.'],
      compito: 'Trasforma un lancio della sezione Giornalismo in 25 secondi e registralo.', testo: null },
    { id: 'r4', titolo: 'L\'intervista dal vivo', it: 'Ascolto attivo: domande brevi, una alla volta, e domande di approfondimento.', ar: 'اسمع باهتمام: أسئلة قصيرة، وحدة وحدة، وأسئلة متابعة.',
      passi: ['Prepara 5 domande aperte, ma ascolta la risposta e segui quella.', 'Domande di approfondimento: «Cioè?», «Può farmi un esempio?», «Che cosa intende?».', 'Non interrompere: lascia 2 secondi di silenzio dopo la risposta.', 'Ringrazia e chiudi con una sintesi.'],
      compito: 'Simula un\'intervista di 2 minuti con te stessa, con almeno 3 domande di approfondimento.', testo: null },
    { id: 'r5', titolo: 'Silenzi, errori e imprevisti', it: 'In diretta non si può tornare indietro: si continua con naturalezza.', ar: 'في الدايركت ما تنجمش ترجع: كمّل بطبيعية.',
      passi: ['Se sbagli, riprendi dalla frase e vai avanti, senza scuse ripetute.', 'Se non ricordi una parola, spiegala con altre parole.', 'Se c\'è un silenzio, rilancia: «Dicevamo...», «Torniamo a...».', 'Evita i riempitivi (ehm, cioè): sostituiscili con una breve pausa.'],
      compito: 'Parla 2 minuti su un argomento a caso, senza «ehm» né «cioè»: se li dici, riparti.', testo: null },
    { id: 'r6', titolo: 'Respiro, ritmo e pause', it: 'Le pause danno senso alle frasi lunghe e permettono di respirare.', ar: 'الوقفات تعطي معنى للجمل الطويلة وتخليك تتنفس.',
      passi: ['Segna sul testo dove respirare: dopo virgole e prima dei connettori.', 'Alterna velocità: più lenta sulle informazioni importanti.', 'Abbassa il tono alla fine delle frasi conclusive.', 'Riascoltati: la frase suona naturale o letta?'],
      compito: 'Segna le pause nel testo L9 (sezione Intonazione) e leggilo.', testo: 'L9' },
    { id: 'r7', titolo: 'La chiusura e i saluti', it: 'Riassumi, ringrazia, rimanda alla prossima puntata.', ar: 'لخّص، شكرا، وحدد الموعد القادم.',
      passi: ['Una frase di riepilogo.', 'Ringrazia ospiti e ascoltatori.', 'Dì quando ci si ritrova.', 'Chiusura calda, con il sorriso nella voce.'],
      compito: 'Leggi il testo L10 con un tono caldo e poi improvvisa una tua chiusura.', testo: 'L10' },
    { id: 'r8', titolo: 'Puntata completa (10 minuti)', it: 'Metti insieme tutto: apertura, notizia, intervista, rubrica, chiusura.', ar: 'جمّع كل شيء: افتتاح، خبر، مقابلة، فقرة، خاتمة.',
      passi: ['Scaletta: apertura 1 min · notizia 2 min · intervista 4 min · rubrica 2 min · chiusura 1 min.', 'Scrivi la scaletta con parole chiave, non il testo intero.', 'Registra di seguito, senza fermarti.', 'Riascolta e segna 3 cose belle e 3 da migliorare.'],
      compito: 'Registra una puntata di prova da 10 minuti e salva la scaletta negli appunti.', testo: null, scaletta: true }
  ];
})();
