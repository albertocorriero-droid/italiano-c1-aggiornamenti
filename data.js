// Contenuti del programma. Questo file si aggiorna ogni settimana (revisione con Claude).
window.DATA = {
  versione: 1,

  aggiornamenti: [
    { data: '2026-10-31', testo: 'Versione iniziale: 20 settimane, 1 ora al giorno, spiegazioni in italiano e arabo tunisino.' }
  ],

  // Le 7 attività della sessione quotidiana (totale 60 minuti)
  blocchi: [
    { id: 'voce', nome: 'Riscaldamento voce', min: 5, vai: 'riscaldamento', it: 'Respirazione e articolazione.', ar: 'تنفّس وتسخين الصوت.' },
    { id: 'ascolto', nome: 'Orecchio: quale senti?', min: 8, vai: 'ascolto', it: 'Distingui i suoni che in arabo non esistono.', ar: 'ميّز الأصوات اللي ما فماش كيفها في العربية.' },
    { id: 'ripeti', nome: 'Ripeti e verifica', min: 10, vai: 'ripeti', it: 'Frasi mirate, con controllo automatico.', ar: 'جمل مختارة، والبرنامج يراجع معاك.' },
    { id: 'scioglilingua', nome: 'Scioglilingua', min: 5, vai: 'scioglilingua', it: 'Velocità e chiarezza.', ar: 'سرعة ووضوح.' },
    { id: 'shadowing', nome: 'Shadowing', min: 15, vai: 'shadowing', it: 'Ascolta e ripeti subito dopo, con lo stesso ritmo.', ar: 'تسمع وتعاود مباشرة بنفس الإيقاع.' },
    { id: 'lettura', nome: 'Lettura registrata', min: 10, vai: 'lettura', it: 'Leggi ad alta voce e riascoltati.', ar: 'اقرا بصوت عالي وعاود اسمع روحك.' },
    { id: 'libero', nome: 'Parlato libero o lessico', min: 7, vai: 'parlato', it: 'Un giorno parli, un giorno studi le parole.', ar: 'نهار تحكي ونهار تتعلّم كلمات.' }
  ],

  fasi: [
    { n: 1, it: 'Suoni di base', ar: 'الأصوات الأساسية', sett: [1, 4] },
    { n: 2, it: 'Suoni difficili', ar: 'الأصوات الصعبة', sett: [5, 8] },
    { n: 3, it: 'Ritmo e intonazione', ar: 'الإيقاع والتنغيم', sett: [9, 12] },
    { n: 4, it: 'Registro giornalistico', ar: 'لغة الصحافة', sett: [13, 16] },
    { n: 5, it: 'Radio e livello C1', ar: 'الراديو ومستوى C1', sett: [17, 20] }
  ],

  settimane: [
    { it: 'Le 7 vocali, bocca ben aperta', cats: ['vocali'] },
    { it: 'Le consonanti doppie', cats: ['doppie'] },
    { it: 'P/B e V/F', cats: ['pb', 'vf'] },
    { it: 'Ripasso fase 1 e registrazione di controllo', cats: ['vocali', 'doppie', 'pb', 'vf'] },
    { it: 'GLI e GN', cats: ['gli_gn'] },
    { it: 'SC, SCI e SCHI', cats: ['sc'] },
    { it: 'C e G dolci e dure', cats: ['cg'] },
    { it: 'La R e l\'accento tonico', cats: ['r', 'accento'] },
    { it: 'Ritmo: sillabe regolari', cats: ['ritmo'] },
    { it: 'Intonazione: domande e affermazioni', cats: ['ritmo'] },
    { it: 'Pause e respiro nella lettura', cats: ['ritmo'] },
    { it: 'Ripasso fase 3 e registrazione di controllo', cats: ['ritmo', 'doppie', 'sc', 'cg'] },
    { it: 'Leggere un titolo e un lancio', cats: ['ritmo', 'accento'] },
    { it: 'Leggere una notizia', cats: ['ritmo', 'accento'] },
    { it: 'L\'intervista: fare domande aperte', cats: ['ritmo'] },
    { it: 'Il reportage: raccontare un fatto', cats: ['ritmo'] },
    { it: 'Conduzione radiofonica: apertura e chiusura', cats: ['ritmo'] },
    { it: 'Improvvisare in diretta', cats: ['ritmo'] },
    { it: 'Simulazione orale C1: monologo e dibattito', cats: ['ritmo'] },
    { it: 'Test finale e confronto con la settimana 1', cats: ['vocali', 'doppie', 'pb', 'vf', 'gli_gn', 'sc', 'cg', 'r'] }
  ],

  // Spiegazioni per categoria: italiano e arabo tunisino
  cat: {
    vocali: {
      nome: 'Vocali',
      it: 'L\'italiano ha 7 vocali: a, i, u e due E e due O (aperta o chiusa). Le vocali senza accento non si riducono mai: ogni vocale si pronuncia piena, a bocca ben aperta.',
      ar: 'الإيطالية عندها 7 حروف علّة: a وi وu وزادة E زوز وO زوز (مفتوحة وإلا مسكّرة). الحروف اللي موش عليها نبر ما تنقّصهاش، كل حرف يتقال كامل.'
    },
    doppie: {
      nome: 'Consonanti doppie',
      it: 'Le consonanti doppie durano di più: «pala» non è «palla». Allunga la consonante, fai una piccola pausa e poi rilasciala.',
      ar: 'الحروف المضاعفة تتطوّل أكثر: pala موش كيف palla. طوّل الحرف، وقّف شوية، وبعدين سيّبو.'
    },
    pb: {
      nome: 'P e B',
      it: 'Nell\'arabo standard la P non esiste. Metti la mano davanti alla bocca: la P spinge aria senza voce, la B ha la voce e meno aria.',
      ar: 'في العربية الفصحى ما فماش P. حطّ يدك قدّام فمك: الـ P فيها هواء بلا صوت، والـ B فيها صوت من الحلق وهواء أقل.'
    },
    vf: {
      nome: 'V e F',
      it: 'Stessa posizione (denti superiori sul labbro inferiore): la F senza voce, la V con la voce.',
      ar: 'V وF نفس الموضع (السنين الفوقانية على الشفّة التحتانية): F بلا صوت وV بصوت.'
    },
    gli_gn: {
      nome: 'GLI e GN',
      it: 'Come in francese: «montagne» → «montagna» (GN); «famille» → «famiglia» (GLI ≈ «ill»). Tieni la lingua piatta contro il palato e allunga il suono.',
      ar: 'كيف الفرنسية: montagne ← montagna (GN)، وfamille ← famiglia (GLI تشبه ill). خلّي لسانك مفرطح على سقف الفم وطوّل الصوت.'
    },
    sc: {
      nome: 'SC',
      it: 'SC davanti a E/I suona come la «sh» (scena, pesce, scienza). Davanti ad A/O/U e a H suona «sk» (scuola, schiena).',
      ar: 'SC قدّام e/i تتقال كيف الشين (scena, pesce). وقدّام a/o/u أو h تتقال «سك» (scuola, schiena).'
    },
    cg: {
      nome: 'C e G',
      it: 'Davanti a E/I sono dolci (cena, gelato). Con la H diventano dure (che, chi, spaghetti, ghiaccio).',
      ar: 'C وG قدّام e/i ناعمين (cena, gelato). كي يجي معاهم h يولّيو قاسيين (che, chi, ghiaccio).'
    },
    r: {
      nome: 'La R',
      it: 'La R italiana si fa con la punta della lingua che batte dietro i denti. Non è la R gutturale del francese.',
      ar: 'الـ R الإيطالية تتعمل بطرف اللسان (كيف الراء العربية)، موش من الحلق كيف الفرنسية.'
    },
    accento: {
      nome: 'Accento tonico',
      it: 'L\'accento cambia il significato (àncora / ancòra) e si nota subito. Impara ogni parola nuova insieme al suo accento.',
      ar: 'النبر يبدّل المعنى (àncora / ancòra) ويبان على طول. احفظ كل كلمة جديدة بنبرها.'
    },
    ritmo: {
      nome: 'Ritmo e intonazione',
      it: 'L\'italiano ha un ritmo regolare: le sillabe durano più o meno uguale e le vocali non si inghiottono. La voce sale nelle domande e scende nelle affermazioni.',
      ar: 'الإيطالية كل مقطع تقريباً نفس المدّة وما تبلعش الحروف. الصوت يطلع في الأسئلة وينزل في الجمل الخبرية.'
    }
  },

  // Coppie minime per il quiz d'ascolto (la voce del Mac legge una delle due)
  coppie: [
    { a: 'pala', b: 'palla', cat: 'doppie' }, { a: 'caro', b: 'carro', cat: 'doppie' },
    { a: 'nono', b: 'nonno', cat: 'doppie' }, { a: 'fato', b: 'fatto', cat: 'doppie' },
    { a: 'sete', b: 'sette', cat: 'doppie' }, { a: 'casa', b: 'cassa', cat: 'doppie' },
    { a: 'pena', b: 'penna', cat: 'doppie' }, { a: 'tuta', b: 'tutta', cat: 'doppie' },
    { a: 'rosa', b: 'rossa', cat: 'doppie' }, { a: 'cola', b: 'colla', cat: 'doppie' },
    { a: 'pasta', b: 'basta', cat: 'pb' }, { a: 'palla', b: 'balla', cat: 'pb' },
    { a: 'pollo', b: 'bollo', cat: 'pb' }, { a: 'pacco', b: 'bacco', cat: 'pb' },
    { a: 'vino', b: 'fino', cat: 'vf' }, { a: 'vanno', b: 'fanno', cat: 'vf' },
    { a: 'fili', b: 'figli', cat: 'gli_gn' }, { a: 'mila', b: 'miglia', cat: 'gli_gn' },
    { a: 'sono', b: 'sogno', cat: 'gli_gn' }, { a: 'vino', b: 'vigna', cat: 'gli_gn' },
    { a: 'sala', b: 'scala', cat: 'sc' }, { a: 'pece', b: 'pesce', cat: 'sc' }, { a: 'sia', b: 'scia', cat: 'sc' },
    { a: 'gola', b: 'cola', cat: 'cg' }, { a: 'cara', b: 'gara', cat: 'cg' },
    { a: 'che', b: 'ce', cat: 'cg' }, { a: 'chi', b: 'ci', cat: 'cg' },
    { a: 'caro', b: 'calo', cat: 'r' }, { a: 'mare', b: 'male', cat: 'r' }, { a: 'pero', b: 'pelo', cat: 'r' }
  ],

  // Frasi per «Ripeti e verifica»
  frasi: {
    vocali: [
      'Il mio nome è Aya e vivo in Italia.',
      'Sono nata a Tunisi, ma ora abito vicino al mare.',
      'Mi piace ascoltare la gente e raccontare le storie.'
    ],
    doppie: [
      'La nonna ha fatto tutta la pasta in casa.',
      'Ho sette penne e quattro matite.',
      'Il carro passa dietro la cassa.'
    ],
    pb: [
      'Prendo il pane, il burro e la pasta.',
      'Il piccolo bar è pieno di persone.',
      'Paolo beve poco, ma porta la birra.'
    ],
    vf: [
      'Il vino fresco è nella cantina vecchia.',
      'Vanno a fare la festa a Venezia.',
      'Voglio vedere un film francese.'
    ],
    gli_gn: [
      'Mia figlia vuole gli gnocchi con l\'aglio.',
      'Ogni signora guarda la montagna.',
      'La famiglia ha un bel giglio in giardino.'
    ],
    sc: [
      'Sciare è bello, ma la scuola è importante.',
      'Il pesce è nella scatola sulla scala.',
      'Conosco la scena e capisco la scelta.'
    ],
    cg: [
      'Il gelato è già nel giardino.',
      'Che cosa chiedi a chi cena con noi?',
      'Cinque ciliegie e due ghiaccioli.'
    ],
    r: [
      'Il treno corre forte per la strada.',
      'Rosa porta rapidamente il registro.',
      'La terra trema vicino al ferro.'
    ],
    accento: [
      'Ancora non so dov\'è l\'àncora.',
      'Il capitano capita sempre a Napoli la domenica.',
      'I principi hanno firmato i principi del trattato.'
    ],
    ritmo: [
      'Oggi, a Molfetta, si apre il festival del cinema mediterraneo.',
      'Che cosa significa, per lei, parlare di identità?',
      'La rassegna proseguirà fino a domenica, con ingresso libero.',
      'Buonasera e bentornati ai microfoni: stasera parliamo di storie che attraversano il mare.'
    ]
  },

  scioglilingua: [
    { t: 'Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando.', cat: 'ritmo' },
    { t: 'Sopra la panca la capra campa, sotto la panca la capra crepa.', cat: 'doppie' },
    { t: 'Apelle, figlio di Apollo, fece una palla di pelle di pollo; tutti i pesci vennero a galla per la palla di pelle di pollo fatta da Apelle, figlio di Apollo.', cat: 'pb' },
    { t: 'Tre tigri contro tre tigri.', cat: 'r' },
    { t: 'Il cuoco, con un coccio, cuoce un pollo coi cocci.', cat: 'cg' },
    { t: 'Se l\'arcivescovo di Costantinopoli si disarcivescovocostantinopolizzasse, vi disarcivescovocostantinopolizzereste voi?', cat: 'ritmo' }
  ],

  // Testi originali per la lettura (scritti per l'esercizio)
  letture: [
    { id: 'L1', titolo: 'Test iniziale: una voce tra due sponde', nota: 'Leggilo alla settimana 1 e alla settimana 20, per confrontare i due audio.',
      t: 'Mi chiamo Aya e vivo in Italia: il mio mestiere è raccontare storie. Ogni giorno ascolto persone che parlano di casa, di lavoro e di futuro, e cerco di capire che cosa le unisce. Il mare tra la Tunisia e l\'Italia sembra una distanza, ma è anche un ponte fatto di parole, di musica e di cibo. Parlare bene questa lingua è il modo più onesto per restituire a ciascuno la propria voce.' },
    { id: 'L2', titolo: 'Notizia di cultura: la rassegna di cinema', nota: 'Tono neutro e chiaro, da giornale radio.',
      t: 'Ieri sera, nella sala del cinema comunale, si è aperta la rassegna dedicata al Mediterraneo. Sono stati proiettati tre film brevi sulla vita nei porti, sulle famiglie divise dal mare e sui giovani che inventano nuovi mestieri. Al termine, il pubblico ha incontrato i registi e ha fatto molte domande. La rassegna proseguirà fino a domenica, con ingresso libero e incontri ogni pomeriggio.' },
    { id: 'L3', titolo: 'Comunità: lo sportello di orientamento', nota: 'Tono sobrio e rispettoso.',
      t: 'Nel quartiere un\'associazione offre ogni settimana uno sportello di orientamento per chi è arrivato da poco. Si imparano le basi della lingua, si compilano i documenti e si trovano informazioni sui servizi. Le volontarie raccontano che il bisogno più grande è essere ascoltati. Per questo, accanto alle pratiche burocratiche, c\'è sempre un tavolo dove si prende un tè e si parla senza fretta.' },
    { id: 'L4', titolo: 'Radio: apertura di una puntata', nota: 'Voce calda, ritmo vivace, sorriso nella voce.',
      t: 'Buonasera e bentornati ai microfoni. Stasera parliamo di cultura, di incontri e di storie che attraversano il mare. Avremo in studio due ospiti, ascolteremo la musica che hanno scelto per voi e risponderemo ai vostri messaggi. Restate con noi: tra pochi istanti si comincia.' },
    { id: 'L5', titolo: 'Intervista: le domande', nota: 'Cura l\'intonazione: ogni domanda sale alla fine.',
      t: 'Come è nata l\'idea del festival? Che cosa significa, per lei, parlare di identità mediterranee? Quali difficoltà avete incontrato nell\'organizzazione? E che cosa vi aspettate dal pubblico di quest\'anno?' },
    { id: 'L6', titolo: 'Commento: raccontare le migrazioni', nota: 'Livello C1: frasi lunghe, pause giuste.',
      t: 'Raccontare le migrazioni richiede precisione e rispetto: non basta riportare i numeri, bisogna dare un volto e un contesto alle persone. Un buon giornalista evita le semplificazioni, verifica le fonti e ascolta prima di giudicare. Solo così il racconto può diventare un ponte e non l\'ennesimo pregiudizio.' }
  ],

  riscaldamento: [
    { it: 'Respirazione: inspira dal naso gonfiando la pancia per 4 secondi, espira lentamente dicendo «ssss» per 8 secondi. Ripeti 5 volte.', ar: 'تنفّس: شهيق من المنخار وانفخ كرشك 4 ثواني، وزفير ببطء بصوت «سسسس» 8 ثواني. عاودها 5 مرات.' },
    { it: 'Labbra: fai vibrare le labbra («brrr») per 20 secondi, poi sorridi ampio e fai la bocca a «o» dieci volte.', ar: 'الشفايف: خلّيهم يرتجفو («برررر») 20 ثانية، وبعدين ابتسم كبير وسكّر الفم كيف «o» عشر مرات.' },
    { it: 'Lingua: tocca con la punta gli angoli della bocca e il palato, lentamente, dieci volte.', ar: 'اللسان: بطرفو المس زوايا الفم وسقف الفم، ببطء، عشر مرات.' },
    { it: 'Vocali: pronuncia a-e-i-o-u con la bocca molto aperta, tre volte, sempre più veloce.', ar: 'الحروف: قول a-e-i-o-u وفمّك مفتوح برشا، ثلاث مرات، وكل مرة أسرع.' },
    { it: 'Matita tra i denti: leggi una frase con una matita in bocca per 30 secondi, poi senza: noterai la differenza.', ar: 'قلم بين الأسنان: اقرا جملة وقلم في فمّك 30 ثانية، وبعدين بلاش قلم وتحسّ بالفرق.' }
  ],

  argomenti: [
    'Descrivi la tua giornata tipo, dal risveglio alla sera.',
    'Racconta un luogo della Tunisia che vorresti far conoscere agli italiani.',
    'Che cosa ti ha sorpreso di più nella vita in Italia?',
    'Spiega che cosa fa un mediatore culturale e perché è utile.',
    'Racconta un film o un libro che ti è piaciuto, senza rovinare il finale.',
    'Qual è la differenza tra giornalismo e comunicazione, secondo te?',
    'Descrivi una persona che ammiri e spiega perché.',
    'Parla di un problema della tua comunità e di una possibile soluzione.',
    'Intervista te stessa: fai tre domande e rispondi.',
    'Racconta una tradizione tunisina a una persona che non la conosce.',
    'Immagina di aprire una puntata radiofonica: presenta il tema e gli ospiti.',
    'Dai un consiglio a chi sta per trasferirsi in Italia.',
    'Racconta un errore che hai fatto in italiano e che cosa hai imparato.',
    'Perché è importante ascoltare le storie dei migranti?'
  ],

  connettori: ['dunque', 'tuttavia', 'ciononostante', 'd\'altra parte', 'in effetti', 'a ben vedere', 'per quanto riguarda', 'in sostanza', 'ciò detto', 'nel complesso'],

  lessico: [
    { p: 'emblematico', d: 'Che rappresenta in modo evidente un fenomeno o un\'idea.', e: 'Quel film è emblematico del cinema degli anni Settanta.' },
    { p: 'integrazione', d: 'Processo con cui una persona entra a far parte pienamente di una comunità.', e: 'L\'integrazione richiede tempo e ascolto reciproco.' },
    { p: 'pregiudizio', d: 'Giudizio formato prima di conoscere i fatti.', e: 'Un buon giornalista lavora contro i pregiudizi.' },
    { p: 'sottintendere', d: 'Lasciar capire qualcosa senza dirlo apertamente.', e: 'Con quel tono sottintendeva una critica.' },
    { p: 'tutelare', d: 'Proteggere diritti o interessi.', e: 'La legge deve tutelare chi è più fragile.' },
    { p: 'divario', d: 'Differenza marcata tra due situazioni.', e: 'Il divario tra le due città è ancora molto ampio.' },
    { p: 'pertinente', d: 'Che riguarda direttamente l\'argomento.', e: 'La tua domanda è molto pertinente.' },
    { p: 'verosimile', d: 'Che sembra vero, credibile.', e: 'La sua versione dei fatti è verosimile.' },
    { p: 'corroborare', d: 'Rafforzare con prove o argomenti.', e: 'I dati corroborano la tesi dell\'inchiesta.' },
    { p: 'dissentire', d: 'Non essere d\'accordo.', e: 'Su questo punto devo dissentire.' },
    { p: 'ineluttabile', d: 'Che non si può evitare.', e: 'Il cambiamento sembrava ineluttabile.' },
    { p: 'controverso', d: 'Oggetto di discussione, con opinioni opposte.', e: 'È un tema controverso nel dibattito pubblico.' },
    { p: 'fruizione', d: 'L\'atto di usufruire di un servizio o di un contenuto.', e: 'La fruizione dei contenuti online è cresciuta molto.' },
    { p: 'esplicitare', d: 'Rendere chiaro ed evidente.', e: 'Vorrei esplicitare meglio il mio ragionamento.' },
    { p: 'ribadire', d: 'Affermare di nuovo con forza.', e: 'Voglio ribadire che le fonti sono verificate.' },
    { p: 'vanificare', d: 'Rendere inutile.', e: 'Un errore può vanificare ore di lavoro.' },
    { p: 'mediare', d: 'Fare da intermediario tra due parti.', e: 'Il suo compito è mediare tra le due culture.' },
    { p: 'sfaccettatura', d: 'Aspetto particolare di una questione complessa.', e: 'Il reportage mostra ogni sfaccettatura del problema.' },
    { p: 'emarginare', d: 'Mettere ai margini della società.', e: 'Le politiche sbagliate rischiano di emarginare i giovani.' },
    { p: 'accoglienza', d: 'Il modo in cui si riceve e si ospita una persona.', e: 'L\'accoglienza del quartiere è stata calorosa.' }
  ],

  // Video YouTube incorporati (non scaricati). La qualità va verificata guardandoli.
  video: [
    { id: 'UL9Czh_LG34', titolo: 'Le vocali dell\'italiano standard', canale: 'Podcast Italiano', dur: '16:01', cat: 'vocali', lingua: 'it' },
    { id: '_7zgnOIWvBA', titolo: 'Differenza tra è, é, ò, ó', canale: 'Fun and Easy Italian', dur: '9:54', cat: 'vocali', lingua: 'it' },
    { id: 'Ro58wUOQieI', titolo: 'Pronuncia bene le vocali italiane', canale: 'CoOl - Cristiana Raggi', dur: '6:28', cat: 'vocali', lingua: 'it' },
    { id: 'S4YaKxoVnh0', titolo: 'La È aperta (lezione 1)', canale: 'Dizione It', dur: '1:44', cat: 'vocali', lingua: 'it' },
    { id: 'G3xfE4PDvEo', titolo: 'La O chiusa', canale: 'Dizione It', dur: '1:32', cat: 'vocali', lingua: 'it' },
    { id: 'HeeXJ8lo8Qc', titolo: 'Corso intensivo di pronuncia italiana (80 minuti)', canale: 'Podcast Italiano', dur: '1:21:17', cat: 'vocali', lingua: 'it', nota: 'Da guardare a pezzi, 10 minuti per volta.' },
    { id: 'l4SetXhS970', titolo: 'Le consonanti doppie', canale: 'Podcast Italiano', dur: '13:57', cat: 'doppie', lingua: 'it' },
    { id: 'rOW9OopYXSs', titolo: 'Il raddoppiamento fonosintattico', canale: 'Podcast Italiano', dur: '15:55', cat: 'doppie', lingua: 'it' },
    { id: '1NicFVUOb5o', titolo: 'Le doppie: come pronunciarle', canale: 'RosItaliano', dur: '4:42', cat: 'doppie', lingua: 'it' },
    { id: '08tL-8Ww5pM', titolo: 'Les doubles consonnes en italien', canale: 'L\'italien avec Silvia', dur: '3:48', cat: 'doppie', lingua: 'fr', nota: 'In francese.' },
    { id: 'cPPK7sbdwvI', titolo: 'Le consonanti B e P', canale: 'CoOl - Cristiana Raggi', dur: '2:36', cat: 'pb', lingua: 'it' },
    { id: 'EEv8whTLTY8', titolo: 'Correggere la cadenza dialettale e l\'accento regionale', canale: 'Gian Luca Caruso', dur: '18:08', cat: 'ritmo', lingua: 'it' },
    { id: '63uLdIb6Wqc', titolo: '5 cose da fare per togliere la cadenza', canale: 'CoOl - Cristiana Raggi', dur: '8:02', cat: 'ritmo', lingua: 'it' },
    { id: 'ozx3SPo2Ewg', titolo: 'Dizione italiana, lezione 1: sciogliamoci', canale: 'Cinematic Rose', dur: '11:07', cat: 'ritmo', lingua: 'it' },
    { id: 'y-GsMR5DVIQ', titolo: 'Esercizio per imparare la dizione', canale: 'Enrica Barel Attrice', dur: '6:31', cat: 'ritmo', lingua: 'it' },
    { id: 'uhfyX2GrqC8', titolo: 'Tre esercizi per l\'articolazione vocale', canale: 'Enrica Barel Attrice', dur: '4:39', cat: 'voce', lingua: 'it' },
    { id: 'z-7WYjkGB28', titolo: 'L\'esercizio della matita tra i denti', canale: 'Gian Luca Caruso', dur: '4:23', cat: 'voce', lingua: 'it' },
    { id: 'Ie9FVNXiEh4', titolo: '7 scioglilingua italiani', canale: 'Fun and Easy Italian', dur: '3:50', cat: 'scioglilingua', lingua: 'it' },
    { id: 'nyc6Omb4wCo', titolo: '20 scioglilingua italiani', canale: 'Language Freak', dur: '6:07', cat: 'scioglilingua', lingua: 'it' },
    { id: 'gXn5EkeZzjo', titolo: 'I 7 scioglilingua più divertenti', canale: 'Italiano Automatico', dur: '14:19', cat: 'scioglilingua', lingua: 'it' },
    { id: 'qkjla0tTslU', titolo: 'Virelangue italien', canale: 'Babbel France', dur: '0:24', cat: 'scioglilingua', lingua: 'fr', nota: 'In francese.' },
    { id: 'FKP_i5WrbGQ', titolo: 'Come parlare in radio: il ritmo', canale: 'ldardano', dur: '3:48', cat: 'radio', lingua: 'it' },
    { id: 'nAyR-uGwxTk', titolo: 'Come parlare in radio: 4 + 1 suggerimenti', canale: 'Giuseppe Franco', dur: '3:41', cat: 'radio', lingua: 'it' },
    { id: 'Fudm04qFGBI', titolo: 'Improvvisare in radio: la lettura improvvisata', canale: 'Giorgio d\'Ecclesia', dur: '3:47', cat: 'radio', lingua: 'it' },
    { id: 'F4nkelHjK4o', titolo: 'Uso della voce: tecniche vocali', canale: 'Radio Speaker', dur: '4:49', cat: 'radio', lingua: 'it' },
    { id: 'ZDgZVWeZrHM', titolo: 'Conversazione naturale in italiano con Francesca', canale: 'Italiano Automatico', dur: '22:36', cat: 'conversazione', lingua: 'it' },
    { id: 'RaGESxMtpLo', titolo: 'Conversazione naturale in italiano', canale: 'Italiano Automatico', dur: '36:04', cat: 'conversazione', lingua: 'it' },
    { id: 'nLiL6sMVd-U', titolo: 'Conversazione avanzata: il congiuntivo', canale: 'Studio Italiano InClasse', dur: '20:36', cat: 'conversazione', lingua: 'it' },
    { id: '9d4gGsfMmVs', titolo: '25 frasi avanzate per non bloccarti quando parli', canale: 'Italiano Automatico', dur: '13:13', cat: 'c1', lingua: 'it' },
    { id: 'qwWH1i2CbcA', titolo: '20 domande e risposte in italiano (livello C1)', canale: 'Studio Italiano InClasse', dur: '18:44', cat: 'c1', lingua: 'it' }
  ],

  catVideo: {
    vocali: 'Vocali', doppie: 'Doppie', pb: 'P e B', ritmo: 'Dizione e ritmo', voce: 'Voce',
    scioglilingua: 'Scioglilingua', radio: 'Radio', conversazione: 'Conversazione', c1: 'Livello C1'
  },

  // Audio scaricato legalmente (licenza Creative Commons)
  locali: [
    { file: 'video/xiKh7ba4IAg.mp4', titolo: 'Lezioni di canto 8: le vocali italiane', autore: 'Elena Villa', licenza: 'CC BY (Creative Commons Attribuzione)', fonte: 'https://www.youtube.com/watch?v=xiKh7ba4IAg', nota: 'Solo audio. Utile per l\'ascolto e la ripetizione delle vocali.' }
  ],

  comunita: {
    server: [
      { nome: 'Japanese, Italian and English', url: 'https://discord.com/servers/japanese-italian-and-english-896432354183225365', nota: 'Scambio linguistico: chi impara aiuta chi impara, con canali vocali.' },
      { nome: 'Learn Italian, English and German Community', url: 'https://discord.com/servers/learn-italian-english-and-german-community-926196860778066050', nota: 'Comunità di studenti di lingue con canali di conversazione.' },
      { nome: 'Italian Learning and Discussion', url: 'https://discordbotlist.com/servers/italian-learning-and-discussion-server-240436732305211392', nota: 'Server grande (oltre 27.000 iscritti secondo l\'elenco).' },
      { nome: 'Elenco di server su Italian (Disboard)', url: 'https://disboard.org/servers/tag/italian', nota: 'Per cercarne altri.' }
    ],
    app: [
      { nome: 'Tandem', url: 'https://www.tandem.net', nota: 'Scambio linguistico con madrelingua: chat, voce e video.' },
      { nome: 'HelloTalk', url: 'https://www.hellotalk.com', nota: 'Ottima per farti correggere i messaggi.' },
      { nome: 'Speaky', url: 'https://www.speaky.com', nota: 'Più informale, soprattutto scritto.' },
      { nome: 'italki', url: 'https://www.italki.com', nota: 'Lezioni a pagamento con insegnanti di dizione (consigliata 1 ora a settimana).' }
    ]
  }
};
