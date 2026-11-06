// Contenuti aggiuntivi: grammatica, ortoepia, intonazione, giornalismo, esame, autovalutazione, premi, risorse.
Object.assign(window.DATA, {

  /* ---------------- GRAMMATICA C1 ---------------- */
  // Ordine di studio: ogni argomento occupa 2 settimane (vedi gramSett)
  gramSett: ['articoli', 'preposizioni', 'passati', 'pronomi', 'congiuntivo', 'ipotetico', 'condizionale', 'passivo', 'implicite', 'connettori'],

  grammatica: [
    {
      id: 'articoli', nome: 'Articoli e preposizioni articolate',
      regola: [
        'Determinativo: il, lo, l\', la, i, gli, le. «Lo» e «gli» davanti a s + consonante, z, gn, ps: lo studente, gli zaini.',
        'Indeterminativo: un, uno, una, un\'. Con l\'apostrofo solo al femminile: un\'amica (mai «una amica»).',
        'Con i nomi di parentela al singolare, il possessivo non vuole l\'articolo: mia madre, tuo fratello. Al plurale sì: i miei genitori. Con «loro» sì: la loro madre.',
        'Preposizioni articolate: di + il = del, a + il = al, da + il = dal, in + il = nel, su + il = sul. «Con» di solito resta separata.',
        'Paesi e regioni: senza articolo dopo «in» (in Tunisia, in Puglia); con articolo come soggetto (la Tunisia è un Paese mediterraneo).'
      ],
      ar: 'في الإيطالية لازم الأداة (il / la) قدّام أغلب الأسماء. أسماء العايلة في المفرد مع ضمير الملكية تتحذف منها الأداة: mia madre، موش la mia madre.',
      errori: [
        ['Mi manca la mia madre.', 'Mi manca mia madre.'],
        ['Sono nata in il 1998.', 'Sono nata nel 1998.'],
        ['Il studente è arrivato.', 'Lo studente è arrivato.'],
        ['Vado a il mercato.', 'Vado al mercato.']
      ],
      es: [
        { q: '___ studente è arrivato tardi.', o: ['Il', 'Lo', 'Un'], a: 1, w: 'Davanti a s + consonante si usa «lo»: lo studente.' },
        { q: 'Ho comprato ___ zaini nuovi.', o: ['i', 'gli', 'le'], a: 1, w: 'Davanti a z si usa «gli» al plurale: gli zaini.' },
        { q: 'Mi manca molto ___.', o: ['la mia madre', 'mia madre', 'una mia madre'], a: 1, w: 'Con i nomi di parentela al singolare il possessivo non vuole l\'articolo.' },
        { q: 'Sono nata ___ Tunisia.', o: ['in', 'a', 'nella'], a: 0, w: 'Con i nomi di Stato, dopo «nata», si usa «in» senza articolo.' },
        { q: 'Ho messo il libro ___ tavolo.', o: ['sul', 'su il', 'nel'], a: 0, w: 'su + il = sul.' },
        { q: 'Vado ___ mercato ogni sabato.', o: ['a il', 'al', 'nel'], a: 1, w: 'a + il = al.' },
        { q: '___ amica di mia sorella è tunisina.', o: ['Un\'', 'Uno', 'Una'], a: 0, w: 'Davanti a vocale il femminile elide: un\'amica. Con l\'articolo determinativo sarebbe «L\'amica».' },
        { q: 'I nonni vivono con ___ genitori.', o: ['i miei', 'miei', 'mio'], a: 0, w: 'Al plurale i nomi di parentela vogliono l\'articolo: i miei genitori.' }
      ]
    },
    {
      id: 'preposizioni', nome: 'Preposizioni e verbi con preposizione',
      regola: [
        'A: città e luoghi puntuali (a Roma, a casa), tempo preciso (alle otto), termine (do il libro a Luca).',
        'In: Paesi e regioni (in Tunisia), mezzi di trasporto (in treno, ma a piedi), mesi e anni (in marzo, nel 2019).',
        'Da: provenienza (vengo da Tunisi), a casa di una persona (vado dal medico), durata che continua (abito qui da tre anni).',
        'Di: argomento, appartenenza, materia (parliamo di cinema, la casa di Aya, un anello d\'oro).',
        'Impara i verbi con la loro preposizione come un blocco unico: pensare a, dipendere da, riuscire a, cercare di, smettere di, continuare a, decidere di, occuparsi di, innamorarsi di, abituarsi a, credere in/a, contare su.'
      ],
      ar: 'حروف الجر (a, in, da, di) ما تترجمش حرف بحرف من العربية. احفظ الفعل مع حرفو كأنو كلمة وحدة: pensare a، dipendere da، riuscire a.',
      errori: [
        ['Dipende di te.', 'Dipende da te.'],
        ['Penso di te spesso.', 'Penso a te spesso.'],
        ['Sono d\'accordo a te.', 'Sono d\'accordo con te.'],
        ['Abito a Italia.', 'Abito in Italia.']
      ],
      es: [
        { q: 'Dipende ___ te.', o: ['da', 'di', 'a'], a: 0, w: 'Dipendere da.' },
        { q: 'Penso spesso ___ te.', o: ['a', 'di', 'per'], a: 0, w: 'Pensare a qualcuno: penso a te. («Pensare di» + infinito esprime un\'opinione o un progetto.)' },
        { q: 'Sono d\'accordo ___ te.', o: ['con', 'a', 'di'], a: 0, w: 'Essere d\'accordo con qualcuno.' },
        { q: 'Abito a Molfetta ___ tre anni.', o: ['da', 'per', 'in'], a: 0, w: 'Un\'azione che continua nel presente si esprime con «da».' },
        { q: 'Vengo ___ Tunisi.', o: ['da', 'di', 'a'], a: 0, w: 'Provenienza: vengo da.' },
        { q: 'Ho deciso ___ restare in Italia.', o: ['di', 'a', 'per'], a: 0, w: 'Decidere di + infinito.' },
        { q: 'Sono riuscita ___ parlare in diretta.', o: ['a', 'di', 'per'], a: 0, w: 'Riuscire a + infinito.' },
        { q: 'Mi occupo ___ mediazione culturale.', o: ['di', 'a', 'in'], a: 0, w: 'Occuparsi di.' },
        { q: 'Domani vado ___ dentista.', o: ['dal', 'al', 'nel'], a: 0, w: 'Per andare da una persona o dal suo studio: da + il = dal.' }
      ]
    },
    {
      id: 'passati', nome: 'Passato prossimo, imperfetto, passato remoto',
      regola: [
        'Passato prossimo: azione conclusa, collegata al presente (Ieri ho incontrato Marco).',
        'Ausiliare ESSERE con verbi di movimento e cambiamento, riflessivi, piacere/succedere: sono andata, mi sono svegliata. Il participio concorda con il soggetto.',
        'Imperfetto: abitudine, descrizione, azione in corso nel passato (Da bambina giocavo in strada; mentre camminavo...).',
        'Passato remoto: azioni concluse e lontane, storia e letteratura. Nel parlato è frequente al Sud, nello scritto ovunque.',
        'Trapassato prossimo: un\'azione anteriore a un\'altra, passata (Quando sono arrivata, il programma era già finito).'
      ],
      ar: 'imperfetto للعادة والوصف (كنت نعمل)، وpassato prossimo لحدث خلص (عملت). الأفعال متاع الحركة تاخذ essere: sono andata، موش ho andato.',
      errori: [
        ['Ho andato al cinema.', 'Sono andata al cinema.'],
        ['Ho stato a Bari.', 'Sono stata a Bari.'],
        ['Mi ho svegliata alle sei.', 'Mi sono svegliata alle sei.'],
        ['Ieri andavo al cinema. (azione conclusa)', 'Ieri sono andata al cinema.']
      ],
      es: [
        { q: 'Ieri ___ al cinema.', o: ['sono andata', 'ho andato', 'andavo'], a: 0, w: 'Andare vuole «essere»; l\'azione è conclusa: passato prossimo.' },
        { q: 'Quando ero piccola, ___ sempre al mare.', o: ['sono andata', 'andavo', 'ho andato'], a: 1, w: 'Abitudine nel passato: imperfetto.' },
        { q: 'Stamattina mi ___ alle sei.', o: ['ho svegliato', 'sono svegliata', 'svegliavo'], a: 1, w: 'I verbi riflessivi vogliono «essere»: mi sono svegliata.' },
        { q: 'Mentre ___ la radio, è arrivato un messaggio.', o: ['ascoltavo', 'ho ascoltato', 'ascoltai'], a: 0, w: 'Azione in corso interrotta da un\'altra: imperfetto.' },
        { q: 'Quando sono arrivata, il programma ___ già finito.', o: ['è', 'era', 'fu'], a: 1, w: 'Azione anteriore: trapassato prossimo (era finito).' },
        { q: 'Ieri sera ___ un film bellissimo.', o: ['ho visto', 'vedevo', 'sono vista'], a: 0, w: 'Azione conclusa: passato prossimo con «avere».' },
        { q: 'Da bambina ___ in un piccolo paese vicino al mare.', o: ['abitavo', 'ho abitato', 'sono abitata'], a: 0, w: 'Descrizione di una situazione abituale: imperfetto.' },
        { q: 'La settimana scorsa ___ a Bari per un\'intervista.', o: ['sono stata', 'ero', 'ho stata'], a: 0, w: 'Essere vuole «essere» come ausiliare: sono stata.' }
      ]
    },
    {
      id: 'pronomi', nome: 'Pronomi diretti, indiretti, combinati, ci, ne, relativi',
      regola: [
        'Diretti: lo, la, li, le (Vedo Marco → Lo vedo). Con il passato prossimo il participio concorda: l\'ho vista, li ho chiamati.',
        'Indiretti: mi, ti, gli (a lui), le (a lei), ci, vi, gli/loro (a loro). Telefono a Maria → Le telefono.',
        'Combinati: me lo, te lo, glielo (gli + lo), ce lo, ve lo. Con infinito e imperativo si attaccano: dammelo, voglio dirtelo (o te lo voglio dire).',
        'Ci = lì / a ciò (ci vado, ci penso). Ne = di ciò / una parte (ne parlo, ne ho due).',
        'Relativi: che (soggetto o oggetto), cui (dopo preposizione: la città in cui vivo), il quale / la quale, chi.'
      ],
      ar: 'الضمائر في الإيطالية تتحط قبل الفعل، ومع الأمر والـ infinito تتلصّق بيه: dammelo (عطيني إياه). ne = «منو / منها»، ci = «هنا / لهنا».',
      errori: [
        ['Ho detto a Maria: «gli ho detto».', 'A Maria le ho detto → Le ho detto.'],
        ['La città che vivo è bella.', 'La città in cui vivo è bella.'],
        ['Dallo a me.', 'Dammelo.'],
        ['Ho visto lei ieri.', 'L\'ho vista ieri.']
      ],
      es: [
        { q: 'Ho incontrato Maria e ___ ho salutata.', o: ['l\'', 'le', 'gli'], a: 0, w: 'Pronome diretto femminile elisione: l\'ho salutata, con participio concordato.' },
        { q: 'A Maria ___ ho scritto ieri.', o: ['la', 'le', 'gli'], a: 1, w: 'Pronome indiretto femminile singolare: le.' },
        { q: 'Il libro? ___ ho dato a Luca.', o: ['Gliel\'', 'Lo gli', 'Gli lo'], a: 0, w: 'gli + lo = glielo → gliel\'ho dato.' },
        { q: 'Quanti caffè hai bevuto? ___ ho bevuti due.', o: ['Ne', 'Li', 'Ci'], a: 0, w: '«Ne» indica la quantità: ne ho bevuti due.' },
        { q: 'La città ___ vivo è molto bella.', o: ['che', 'in cui', 'dove che'], a: 1, w: 'Dopo la preposizione si usa «cui»: la città in cui vivo.' },
        { q: 'Il giornalista ___ ho intervistato è tunisino.', o: ['che', 'cui', 'di cui'], a: 0, w: '«Che» è oggetto diretto: ho intervistato il giornalista.' },
        { q: 'Vai al festival? Sì, ___ vado domani.', o: ['ci', 'ne', 'lo'], a: 0, w: '«Ci» sostituisce un luogo: ci vado.' },
        { q: 'Mi serve la penna: ___ dai?', o: ['me la', 'mi la', 'ti la'], a: 0, w: 'mi + la = me la.' }
      ]
    },
    {
      id: 'congiuntivo', nome: 'Il congiuntivo',
      regola: [
        'Si usa quando il soggetto cambia, dopo verbi di opinione, dubbio, desiderio, emozione: penso che, credo che, spero che, voglio che, temo che, è importante che.',
        'E dopo alcune congiunzioni: sebbene, benché, nonostante, affinché, purché, a meno che, prima che.',
        'Presente: che io parli, che tu legga. Passato: che abbia parlato, che sia andata. Imperfetto: parlassi, fossi, avessi. Trapassato: avessi parlato, fossi andata.',
        'Se il soggetto è lo stesso, si preferisce l\'infinito: Penso di andare (non «penso che io vada»).',
        'Irregolari da sapere a memoria: essere → sia/fossi, avere → abbia/avessi, andare → vada, fare → faccia, venire → venga, dire → dica, potere → possa, volere → voglia, sapere → sappia.'
      ],
      ar: 'الـ congiuntivo للرأي والشك والرغبة والإحساس، وكي يتبدّل الفاعل: penso che sia giusto. كي الفاعل يبقى كيف كيف، استعمل infinito: penso di andare.',
      errori: [
        ['Penso che è giusto.', 'Penso che sia giusto.'],
        ['Spero che vieni.', 'Spero che tu venga.'],
        ['Benché è tardi, resto.', 'Benché sia tardi, resto.'],
        ['Voglio che tu vai.', 'Voglio che tu vada.']
      ],
      es: [
        { q: 'Penso che Marco ___ ragione.', o: ['ha', 'abbia', 'avrebbe'], a: 1, w: 'Dopo «penso che» si usa il congiuntivo: abbia.' },
        { q: 'Spero che tu ___ presto.', o: ['vieni', 'venga', 'verrai'], a: 1, w: 'Dopo «spero che» con soggetto diverso: venga.' },
        { q: 'Benché ___ tardi, continuiamo a lavorare.', o: ['è', 'sia', 'sarebbe'], a: 1, w: '«Benché» vuole sempre il congiuntivo.' },
        { q: 'Voglio che tu ___ la verità.', o: ['dici', 'dica', 'dirai'], a: 1, w: 'Dopo «voglio che»: dica.' },
        { q: 'Credo che ieri lei ___ già partita.', o: ['è', 'sia', 'fosse'], a: 1, w: 'Congiuntivo passato per un\'azione già compiuta: sia partita.' },
        { q: 'Pensavo che voi ___ in Tunisia.', o: ['siete', 'foste', 'siate'], a: 1, w: 'Verbo principale al passato: congiuntivo imperfetto (foste).' },
        { q: 'Penso ___ andare al cinema stasera.', o: ['di', 'che', 'a'], a: 0, w: 'Stesso soggetto: infinito con «di».' },
        { q: 'Ti presto il libro affinché tu lo ___.', o: ['leggi', 'legga', 'leggerai'], a: 1, w: '«Affinché» vuole il congiuntivo.' }
      ]
    },
    {
      id: 'ipotetico', nome: 'Il periodo ipotetico',
      regola: [
        'Realtà: se + indicativo → presente, futuro o imperativo. Se piove, resto a casa.',
        'Possibilità: se + congiuntivo imperfetto → condizionale presente. Se avessi tempo, verrei.',
        'Impossibilità (passato): se + congiuntivo trapassato → condizionale passato. Se avessi studiato, avrei passato l\'esame.',
        'Misto: Se avessi studiato di più, ora parlerei meglio.',
        'Mai «se» + condizionale nella lingua standard: «se avrei tempo» è un errore.'
      ],
      ar: 'بعد «se» ما تحطش condizionale أبدا. استعمل congiuntivo (imperfetto أو trapassato)، والنتيجة تجي بـ condizionale.',
      errori: [
        ['Se avrei tempo, verrei.', 'Se avessi tempo, verrei.'],
        ['Se sarei ricca, comprerei una casa.', 'Se fossi ricca, comprerei una casa.'],
        ['Se l\'avrei saputo, te lo dicevo.', 'Se l\'avessi saputo, te l\'avrei detto.']
      ],
      es: [
        { q: 'Se ___ tempo, verrei volentieri.', o: ['avrei', 'avessi', 'ho'], a: 1, w: 'Possibilità: se + congiuntivo imperfetto.' },
        { q: 'Se piove, ___ a casa.', o: ['resterei', 'resto', 'sarei restato'], a: 1, w: 'Realtà: se + indicativo presente → presente.' },
        { q: 'Se avessi studiato, ___ l\'esame.', o: ['passavo', 'avrei passato', 'passerei'], a: 1, w: 'Irrealtà nel passato: condizionale passato.' },
        { q: 'Se ___ più ricca, comprerei una casa al mare.', o: ['sarei', 'fossi', 'sono'], a: 1, w: 'se + congiuntivo imperfetto: fossi.' },
        { q: 'Se lo ___ saputo, te l\'avrei detto.', o: ['avrei', 'avessi', 'ho'], a: 1, w: 'se + congiuntivo trapassato: avessi saputo.' },
        { q: 'Se fossi in te, ___ questo lavoro.', o: ['accetto', 'accetterei', 'accettassi'], a: 1, w: 'Consiglio: condizionale presente.' },
        { q: 'Se avessi studiato di più, ora ___ meglio.', o: ['parlerei', 'parlavo', 'parlassi'], a: 0, w: 'Periodo misto: condizione passata, effetto presente.' }
      ]
    },
    {
      id: 'condizionale', nome: 'Condizionale e notizie riportate',
      regola: [
        'Presente: cortesia (Vorrei un caffè), consiglio (Dovresti studiare di più), desiderio.',
        'Passato: azione non realizzata (Avrei voluto venire) e futuro nel passato (Mi aveva detto che sarebbe venuto).',
        'Giornalismo: il condizionale segnala che una notizia non è confermata. Il ministro avrebbe lasciato l\'incarico; secondo alcune fonti, l\'accordo sarebbe vicino.',
        'Regola d\'oro: se il fatto è verificato, usa l\'indicativo; se è una voce o un\'indiscrezione, usa il condizionale e cita la fonte.'
      ],
      ar: 'في الصحافة نستعملو condizionale كي الخبر موش مؤكّد: «الوزير avrebbe استقال» يعني «حسب المصادر». كي الخبر مؤكّد استعمل indicativo.',
      errori: [
        ['Mi ha detto che verrà. (nel racconto passato)', 'Mi ha detto che sarebbe venuto.'],
        ['Il sindaco ha lasciato. (voce non confermata)', 'Il sindaco avrebbe lasciato l\'incarico.'],
        ['Voglio un caffè. (richiesta cortese)', 'Vorrei un caffè.']
      ],
      es: [
        { q: '___ un caffè, per favore.', o: ['Voglio', 'Vorrei', 'Volevo'], a: 1, w: 'Richiesta cortese: condizionale presente.' },
        { q: 'Secondo fonti non confermate, il sindaco ___ lasciato l\'incarico.', o: ['ha', 'avrebbe', 'aveva'], a: 1, w: 'Notizia non verificata: condizionale passato.' },
        { q: 'Mi aveva detto che ___ presto.', o: ['verrà', 'sarebbe venuto', 'viene'], a: 1, w: 'Futuro nel passato: condizionale passato.' },
        { q: '___ venire, ma ero stanca.', o: ['Ho voluto', 'Avrei voluto', 'Volessi'], a: 1, w: 'Desiderio non realizzato: condizionale passato.' },
        { q: '___ studiare di più, se vuoi superare l\'esame.', o: ['Devi', 'Dovresti', 'Dovevi'], a: 1, w: 'Consiglio attenuato: dovresti.' },
        { q: 'Il governo ___ pronto a un accordo, secondo alcune indiscrezioni.', o: ['è', 'sarebbe', 'fosse'], a: 1, w: 'Indiscrezione: condizionale presente.' }
      ]
    },
    {
      id: 'passivo', nome: 'Passivo e «si» passivante e impersonale',
      regola: [
        'Passivo con ESSERE: Il film è stato presentato ieri. Con VENIRE (azione in corso, tempi semplici): Il film viene presentato domani.',
        'Con ANDARE = necessità: Il documento va firmato (= deve essere firmato).',
        'Agente con «da»: L\'articolo è stato scritto da una giornalista.',
        'Si passivante: il verbo concorda con la cosa. Si vende un libro / Si vendono libri.',
        'Si impersonale: In Italia si cena tardi. Con «essere» l\'aggettivo va al plurale: quando si è stanchi.'
      ],
      ar: '«si» يعوّض الفاعل ويقعد الفعل متوافق مع الشيء: si vendono libri (تتباع كتب). الـ passivo = essere/venire + participio.',
      errori: [
        ['Si vende libri usati.', 'Si vendono libri usati.'],
        ['Il documento deve firmare.', 'Il documento va firmato.'],
        ['Quando si è stanca, bisogna riposare.', 'Quando si è stanchi, bisogna riposare.']
      ],
      es: [
        { q: 'Il film ___ presentato ieri sera.', o: ['è stato', 'ha', 'viene'], a: 0, w: 'Passivo al passato: è stato presentato.' },
        { q: 'Domani il libro ___ presentato al pubblico.', o: ['viene', 'ha', 'sta'], a: 0, w: 'Passivo con «venire» per un\'azione futura: viene presentato.' },
        { q: 'In questa libreria ___ libri usati.', o: ['si vende', 'si vendono', 'si vendi'], a: 1, w: 'Si passivante: il verbo concorda con «libri» (plurale).' },
        { q: 'Il documento ___ firmato entro venerdì.', o: ['va', 'è', 'viene'], a: 0, w: '«Andare» + participio esprime necessità.' },
        { q: 'L\'articolo è stato scritto ___ una giornalista.', o: ['da', 'di', 'per'], a: 0, w: 'L\'agente del passivo si introduce con «da».' },
        { q: 'In Italia ___ tardi la sera.', o: ['si cena', 'si cenano', 'ci si cena'], a: 0, w: 'Si impersonale con verbo intransitivo: si cena.' },
        { q: 'Quando ___ stanchi, bisogna riposare.', o: ['si è', 'si sono', 'ci è'], a: 0, w: 'Si impersonale con «essere»: si è stanchi.' }
      ]
    },
    {
      id: 'implicite', nome: 'Gerundio, participio, infinito (frasi implicite)',
      regola: [
        'Gerundio: azione contemporanea, modo o causa (Camminando ascolto la radio). Stare + gerundio = azione in corso (sto leggendo).',
        'Participio passato: Finito il lavoro, siamo usciti. («Una volta finito...»)',
        'Infinito: Prima di parlare, rifletto. Dopo aver letto, ho capito.',
        'Di norma il soggetto della frase implicita è lo stesso della principale. Se è diverso, usa la frase esplicita: Prima che io parli, vorrei ringraziare tutti.'
      ],
      ar: 'الـ gerundio يعبّر على حاجة صاير في نفس الوقت: camminando ascolto la radio (نمشي وبنفس الوقت نسمع الراديو).',
      errori: [
        ['Prima di io parlare, voglio ringraziare.', 'Prima di parlare, voglio ringraziare.'],
        ['Dopo di mangiare sono uscita.', 'Dopo aver mangiato sono uscita.'],
        ['Sto scrivere un articolo.', 'Sto scrivendo un articolo.']
      ],
      es: [
        { q: '___ la radio, preparo la cena.', o: ['Ascoltando', 'Ascoltare', 'Ascoltato'], a: 0, w: 'Azione contemporanea: gerundio.' },
        { q: 'Prima ___ parlare, rifletto.', o: ['di', 'che', 'a'], a: 0, w: 'Prima di + infinito, con lo stesso soggetto.' },
        { q: 'Dopo ___ letto il libro, l\'ho restituito.', o: ['aver', 'di', 'avendo di'], a: 0, w: 'Dopo + infinito passato: dopo aver letto.' },
        { q: 'Sto ___ un articolo.', o: ['scrivendo', 'scrivere', 'scritto'], a: 0, w: 'Stare + gerundio.' },
        { q: '___ il lavoro, siamo usciti.', o: ['Finito', 'Finire', 'Finendo di'], a: 0, w: 'Participio passato assoluto.' },
        { q: 'Prima ___ io parli, vorrei ringraziare tutti.', o: ['di', 'che', 'da'], a: 1, w: 'Soggetti diversi: prima che + congiuntivo.' }
      ]
    },
    {
      id: 'connettori', nome: 'Connettori, registro e coesione (C1)',
      regola: [
        'Contrasto: ma, però, tuttavia, eppure, ciononostante, nondimeno.',
        'Causa: perché, poiché, dato che, siccome (a inizio frase), a causa di, grazie a.',
        'Conseguenza: quindi, dunque, perciò, di conseguenza, per cui.',
        'Aggiunta: inoltre, per di più, oltre a, nonché.',
        'Concessione: sebbene / benché / nonostante + congiuntivo; anche se + indicativo o congiuntivo imperfetto.',
        'Conclusione: in conclusione, in sintesi, insomma. Nel parlato evita di ripetere «cioè», «tipo», «praticamente».'
      ],
      ar: 'في مستوى C1 لازم تربط الأفكار: tuttavia (مع ذلك)، inoltre (زيادة على هذا)، di conseguenza (بالتالي)، nonostante (رغم).',
      errori: [
        ['Nonostante è tardi, resto.', 'Nonostante sia tardi, resto.'],
        ['Lei era stanca, siccome ha lavorato. (frase invertita)', 'Siccome era stanca, ha smesso di lavorare.'],
        ['Cioè, cioè, cioè... (intercalare)', 'In altre parole... / Ovvero...']
      ],
      es: [
        { q: 'Era stanca; ___ ha continuato a lavorare.', o: ['tuttavia', 'quindi', 'perché'], a: 0, w: '«Tuttavia» introduce un contrasto.' },
        { q: '___ il treno fosse in ritardo, sono arrivata in tempo.', o: ['Sebbene', 'Perché', 'Dato che'], a: 0, w: '«Sebbene» + congiuntivo: concessione.' },
        { q: 'Ha studiato molto; ___ ha superato l\'esame.', o: ['di conseguenza', 'eppure', 'sebbene'], a: 0, w: 'Conseguenza: di conseguenza.' },
        { q: '___ è tardi, torniamo a casa.', o: ['Siccome', 'Nonostante', 'Benché'], a: 0, w: '«Siccome» introduce una causa, a inizio frase, con l\'indicativo.' },
        { q: 'Il progetto è ambizioso e, ___, costoso.', o: ['per di più', 'tuttavia', 'affinché'], a: 0, w: '«Per di più» aggiunge un elemento.' },
        { q: 'Nonostante ___ stanca, ha parlato per due ore.', o: ['è', 'fosse', 'sarebbe'], a: 1, w: '«Nonostante» + congiuntivo.' }
      ]
    }
  ],

  /* ---------------- ORTOEPIA ---------------- */
  ortoepia: {
    nota: 'Le regole su E/O aperte e chiuse e su S e Z hanno molte eccezioni e variano da regione a regione. Per questo conviene memorizzare le parole più frequenti e verificare le altre in un dizionario di pronuncia.',
    regoleVocali: [
      'Le vocali senza accento sono sempre chiuse e piene.',
      'Accento grafico finale: è (aperta) in caffè, tè, cioè, è; é (chiusa) in perché, né, sé, affinché, poiché.',
      'Tendenza: -ore → o chiusa (amore, signore); -ione → o chiusa (nazione); -oso → o chiusa (famoso). Sono tendenze, con eccezioni.',
      'Tra città: Róma (o chiusa), Matèra e Fidènza (e aperta).'
    ],
    regoleSZ: [
      'S prima di b, d, g, l, m, n, r, v è sonora: sbaglio, sdraio, sgabello, slitta, smalto, snello, sregolato, svago.',
      'S a inizio parola davanti a vocale, S doppia e S dopo consonante sono sorde: sole, sera, rosso, basso, pensare.',
      'S tra due vocali: non c’è una regola sicura. Nel Nord si pronuncia spesso sonora (rosa), nel Centro-Sud spesso sorda. Per il lavoro in radio verifica la parola nel dizionario di pronuncia e segui la pronuncia dei telegiornali.',
      'Z: molte parole ammettono sia la pronuncia sorda sia quella sonora (zio, zero, zucchero). Chiedi sempre al tuo insegnante di dizione quale pronuncia preferire.'
    ],
    vocali: [
      { w: 'bene', v: 'e', k: 'a' }, { w: 'terra', v: 'e', k: 'a' }, { w: 'tema', v: 'e', k: 'a' }, { w: 'problema', v: 'e', k: 'a' },
      { w: 'sistema', v: 'e', k: 'a' }, { w: 'poeta', v: 'e', k: 'a' }, { w: 'dieci', v: 'e', k: 'a' }, { w: 'sette', v: 'e', k: 'a' },
      { w: 'gente', v: 'e', k: 'a' }, { w: 'certo', v: 'e', k: 'a' }, { w: 'bello', v: 'e', k: 'a' }, { w: 'caffè', v: 'e', k: 'a', n: 'Accento grave finale: sempre aperta.' },
      { w: 'sera', v: 'e', k: 'c' }, { w: 'mese', v: 'e', k: 'c' }, { w: 'vero', v: 'e', k: 'c' }, { w: 'avere', v: 'e', k: 'c' },
      { w: 'verde', v: 'e', k: 'c' }, { w: 'tre', v: 'e', k: 'c' }, { w: 'perché', v: 'e', k: 'c', n: 'Accento acuto finale: chiusa.' }, { w: 'stella', v: 'e', k: 'c' },
      { w: 'cena', v: 'e', k: 'c' }, { w: 'nero', v: 'e', k: 'c' },
      { w: 'nove', v: 'o', k: 'a' }, { w: 'otto', v: 'o', k: 'a' }, { w: 'cosa', v: 'o', k: 'a' }, { w: 'porta', v: 'o', k: 'a' },
      { w: 'notte', v: 'o', k: 'a' }, { w: 'troppo', v: 'o', k: 'a' }, { w: 'voglio', v: 'o', k: 'a' }, { w: 'poi', v: 'o', k: 'a' },
      { w: 'storia', v: 'o', k: 'a' }, { w: 'nostro', v: 'o', k: 'a' }, { w: 'dopo', v: 'o', k: 'a' }, { w: 'modo', v: 'o', k: 'a' },
      { w: 'sole', v: 'o', k: 'c' }, { w: 'amore', v: 'o', k: 'c', n: 'Suffisso -ore: tendenza a o chiusa.' }, { w: 'signore', v: 'o', k: 'c' }, { w: 'nome', v: 'o', k: 'c' },
      { w: 'come', v: 'o', k: 'c' }, { w: 'dove', v: 'o', k: 'c' }, { w: 'molto', v: 'o', k: 'c' }, { w: 'rosso', v: 'o', k: 'c' }, { w: 'voce', v: 'o', k: 'c' }, { w: 'sono (io sono)', v: 'o', k: 'c' }
    ],
    coppieAccento: [
      { a: 'pèsca (il frutto)', b: 'pésca (la pesca del pesce)' }, { a: 'lègge (la norma)', b: 'légge (egli legge)' },
      { a: 'accètta (egli accetta)', b: 'accétta (l\'ascia)' }, { a: 'bòtte (le percosse)', b: 'bótte (il barile)' },
      { a: 'vènti (i venti di mare)', b: 'vénti (il numero 20)' }, { a: 'còlto (istruito)', b: 'cólto (da cogliere)' }
    ],
    sz: [
      { w: 'sbaglio', k: 'z' }, { w: 'sdraio', k: 'z' }, { w: 'sgabello', k: 'z' }, { w: 'slitta', k: 'z' }, { w: 'smalto', k: 'z' },
      { w: 'snello', k: 'z' }, { w: 'sregolato', k: 'z' }, { w: 'svago', k: 'z' },
      { w: 'sole', k: 's' }, { w: 'sera', k: 's' }, { w: 'rosso', k: 's' }, { w: 'basso', k: 's' }, { w: 'pensare', k: 's' },
      { w: 'scuola', k: 's' }, { w: 'spesa', k: 's' }, { w: 'stella', k: 's' }
    ],
    raddoppiamento: {
      nota: 'Nella pronuncia standard di riferimento, dopo alcune parole (a, è, tre, più, come, dove, qualche...) la consonante iniziale della parola successiva si pronuncia raddoppiata. Si sente nel Centro-Sud ed è insegnato nei corsi di dizione; nell\'italiano del Nord spesso manca. Chiedi al tuo insegnante se usarlo.',
      es: ['a casa → a ccasa', 'è vero → è vvero', 'più bello → più bbello', 'tre cani → tre ccani', 'come mai → come mmai', 'a Roma → a Rroma', 'dove vai → dove vvai', 'qualche volta → qualche vvolta']
    }
  },

  /* ---------------- INTONAZIONE ---------------- */
  intonazione: [
    { id: 'conclusiva', nome: 'Conclusiva (frase finita)', it: 'La voce scende alla fine e fai una pausa più lunga.', ar: 'الصوت ينزل في الآخر وتوقف وقفة أطول.',
      f: ['Il festival si apre domani sera.', 'Abbiamo finito il programma.', 'Grazie per averci ascoltato.'] },
    { id: 'sospensiva', nome: 'Sospensiva (la frase continua)', it: 'La voce resta sospesa o sale appena: l\'ascoltatore capisce che c\'è dell\'altro.', ar: 'الصوت يبقى معلّق أو يطلع شوية: السامع يفهم أنو فما كمّل.',
      f: ['Quando siamo arrivati a Bari,', 'Se domani il tempo reggerà,', 'Nonostante la stanchezza,'] },
    { id: 'interrogativa', nome: 'Interrogativa', it: 'Nelle domande sì/no la voce sale alla fine. Nelle domande con chi, dove, quando, perché parte alta e scende.', ar: 'في الأسئلة بـ «إيه/لا» الصوت يطلع في الآخر. وفي الأسئلة بـ chi, dove, quando يبدا عالي وينزل.',
      f: ['Hai già letto il giornale?', 'Dove si svolge il festival?', 'Che cosa significa, per lei, questa esperienza?'] },
    { id: 'esclamativa', nome: 'Esclamativa', it: 'Più energia e un picco sulla parola chiave; la voce poi scende.', ar: 'طاقة أكثر وصوت عالي على الكلمة المهمة.',
      f: ['Che bella sorpresa!', 'Non ci posso credere!', 'Benvenuti a tutti!'] },
    { id: 'citazione', nome: 'Citazione', it: 'Fai una pausa prima della citazione e cambia leggermente tono, come se parlasse un\'altra persona.', ar: 'وقّف قبل الاقتباس وبدّل نبرة صوتك شوية.',
      f: ['Il ministro ha dichiarato: «Non ci saranno ritardi».', 'Ha detto soltanto: «Ci vediamo domani».', 'Come scrive l\'autrice: «Le parole costruiscono ponti».'] },
    { id: 'inciso', nome: 'Inciso', it: 'La parte tra virgole si dice più piano e un po\' più in fretta, con tono più basso.', ar: 'الجزء بين الفاصلتين يتقال بصوت أنزل وأسرع شوية.',
      f: ['Il festival, che si tiene ogni anno in autunno, richiama molti visitatori.', 'Aya, giornalista e mediatrice culturale, conduce il programma.', 'La rassegna, come previsto, si chiude domenica.'] }
  ],
  pause: {
    istruzioni: 'Clicca sulle parole per segnare le pause: un clic = pausa breve ( / ), due clic = pausa lunga ( // ), tre clic = nessuna pausa. Poi leggi seguendo i tuoi segni.',
    testi: ['L2', 'L3', 'L6']
  },

  /* ---------------- GIORNALISMO ---------------- */
  giornalismo: {
    titoli: [
      'Cinema, al via la rassegna sul Mediterraneo',
      'Migranti, apre lo sportello di orientamento nel quartiere',
      'Radio, nuova stagione con ospiti da tutta Europa',
      'Cultura, il festival cresce: attesi tremila visitatori',
      'Scuola, corsi di italiano per adulti: aperte le iscrizioni',
      'Teatro, in scena la storia di una famiglia tra due sponde',
      'Musica, concerto sul porto per la Giornata del dialogo',
      'Mare e memoria, mostra fotografica nel centro storico'
    ],
    titoliNota: 'I titoli si leggono con voce un po\' più alta e con una pausa dopo la virgola: la parola prima della virgola dice l\'argomento, il resto dà la notizia.',
    lanci: [
      'Si apre oggi la rassegna dedicata al cinema del Mediterraneo: tre giorni di proiezioni, incontri con i registi e una serata finale sul porto. L\'ingresso è libero.',
      'Nel quartiere nasce uno sportello di orientamento per chi è arrivato da poco: si imparano le basi della lingua e si ricevono informazioni sui servizi. Apre ogni martedì pomeriggio.',
      'Nuova stagione per il programma culturale della radio: ospiti da tutta Europa, musica dal vivo e una rubrica dedicata alle storie di chi vive tra due Paesi.',
      'Aperte le iscrizioni ai corsi gratuiti di italiano per adulti: due livelli, lezioni serali e un servizio di mediazione per le famiglie.'
    ],
    cinqueW: ['Chi?', 'Che cosa?', 'Dove?', 'Quando?', 'Perché?'],
    cinqueWNota: 'Un lancio radiofonico risponde alle 5 W in 20-30 secondi. Prima la notizia più importante, poi i dettagli.',
    formule: ['Buongiorno e bentornati', 'Le notizie del giorno', 'Passiamo ora a', 'Nel dettaglio', 'Secondo quanto riferito', 'Ricordiamo che', 'A questo proposito', 'Torniamo in studio', 'Restate con noi', 'Per concludere'],
    domande: [
      'Come è nato questo progetto?', 'Che cosa l\'ha sorpresa di più?', 'Quali difficoltà avete incontrato?',
      'Che cosa direbbe a chi sta pensando di partecipare?', 'Come vede il futuro di questa iniziativa?',
      'C\'è un momento che ricorda con particolare piacere?', 'Che cosa significa, per lei, questo luogo?', 'Se potesse cambiare una cosa, quale sarebbe?'
    ],
    riformula: [
      { c: 'Il festival è piaciuto?', a: 'Che cosa ha pensato del festival?' },
      { c: 'Avete avuto problemi?', a: 'Quali problemi avete dovuto affrontare?' },
      { c: 'Tornerete l\'anno prossimo?', a: 'Come immaginate la prossima edizione?' },
      { c: 'Le piace il suo lavoro?', a: 'Che cosa le piace di più del suo lavoro?' },
      { c: 'Siete soddisfatti?', a: 'In che modo il risultato ha corrisposto alle vostre attese?' }
    ],
    note: 'Regola d\'oro dell\'intervista: domande brevi, una alla volta, aperte (cominciano con come, perché, che cosa, quali) e poi silenzio: lascia finire la risposta.'
  },

  /* ---------------- ESAME ORALE C1 ---------------- */
  esame: {
    nota: 'Struttura ispirata alle prove orali di livello C1 (CELI 4 e CILS): un colloquio, una breve esposizione con opinioni personali e una discussione. I dettagli ufficiali (durata, formato) cambiano tra le sessioni: controlla sempre i siti degli enti.',
    colloquio: [
      'Mi racconti qualcosa di te e del tuo lavoro.', 'Perché ha scelto di fare la giornalista?', 'Che cosa le piace di più della vita in Italia e che cosa meno?',
      'Come immagina la sua carriera tra cinque anni?', 'Quale esperienza professionale l\'ha segnata di più?', 'Che cosa pensa del ruolo dei media oggi?',
      'Come è cambiato il suo rapporto con la lingua italiana?', 'Quali tradizioni tunisine vorrebbe far conoscere in Italia?', 'Che cosa la preoccupa del futuro?',
      'Quale libro o film consiglierebbe e perché?', 'Come si prepara a un\'intervista importante?', 'Che cosa significa per lei «integrazione»?'
    ],
    monologo: [
      { t: 'I giovani e l\'informazione', p: ['Dove si informano oggi i giovani?', 'Quali sono i rischi dei social?', 'Che cosa dovrebbero fare i giornalisti?'] },
      { t: 'Vivere tra due culture', p: ['Quali vantaggi e quali difficoltà?', 'Che cosa ti porti dietro dal tuo Paese?', 'Che cosa hai imparato qui?'] },
      { t: 'Il ruolo della radio nel tempo di internet', p: ['Perché la radio resiste?', 'Che cosa offre in più di un podcast?', 'Come immagini il suo futuro?'] },
      { t: 'Imparare una lingua da adulti', p: ['Quali sono gli ostacoli?', 'Quali metodi funzionano?', 'Che cosa cambia nella persona?'] },
      { t: 'Il lavoro del mediatore culturale', p: ['Quali competenze servono?', 'Quali situazioni sono più delicate?', 'Perché è importante?'] },
      { t: 'Il turismo e le città del Mediterraneo', p: ['Vantaggi e rischi', 'Rapporto con i residenti', 'Una proposta concreta'] },
      { t: 'La scuola e la diversità', p: ['Che cosa può fare la scuola?', 'Il ruolo delle famiglie', 'Esempi da cui partire'] },
      { t: 'La cultura è un bene necessario?', p: ['Che cosa rischia chi taglia la cultura?', 'Chi dovrebbe finanziarla?', 'Un esempio che conosci'] }
    ],
    sfide: [
      'Non crede che sia una visione un po\' ottimistica?', 'Molti sarebbero in disaccordo con lei: che cosa risponde?', 'Può farmi un esempio concreto di quello che dice?',
      'Quali sarebbero, secondo lei, le possibili conseguenze negative?', 'Questo vale in tutti i casi o solo in alcuni?', 'Se dovesse scegliere una sola priorità, quale sarebbe?',
      'In che modo la sua esperienza personale influenza questa opinione?', 'Come risponderebbe a chi sostiene il contrario?'
    ],
    criteri: [
      ['lessico', 'Varietà e precisione del lessico'], ['grammatica', 'Correttezza grammaticale'], ['coesione', 'Coesione e scorrevolezza (connettori, poche esitazioni)'],
      ['pronuncia', 'Pronuncia e intonazione'], ['adeguatezza', 'Adeguatezza alla situazione e al registro']
    ]
  },

  /* ---------------- AUTOVALUTAZIONE C1 ---------------- */
  cando: [
    ['fluidita', 'Mi esprimo con scioltezza e spontaneità, quasi senza cercare le parole.'],
    ['flessibile', 'Uso la lingua in modo flessibile per scopi sociali e professionali.'],
    ['opinioni', 'Formulo idee e opinioni con precisione e le collego a quelle degli altri.'],
    ['descrizioni', 'Faccio descrizioni chiare e dettagliate su temi complessi, sviluppando i punti e concludendo.'],
    ['coesione', 'Uso con sicurezza connettori e strutture per rendere il discorso coeso.'],
    ['ascolto', 'Capisco programmi radio e TV veloci su temi non familiari.'],
    ['sfumature', 'Uso intonazione ed enfasi per esprimere sfumature di significato.'],
    ['autocorrezione', 'Mi correggo quasi sempre da sola, senza che si noti.'],
    ['pronuncia', 'La mia pronuncia è chiara e naturale: gli errori rimasti non disturbano.'],
    ['registro', 'Passo dal registro formale a quello informale con naturalezza.']
  ],

  /* ---------------- PREMI ---------------- */
  premi: {
    base: [
      'Ora intera completata. Questa è costanza, ed è la cosa che fa davvero la differenza.',
      'Un\'ora di lavoro vero. Oggi la tua voce è un po\' più chiara di ieri.',
      'Brava Aya! Ogni giorno così e tra pochi mesi ti riconosceranno a un microfono.',
      'Sessione finita. Quello che hai fatto oggi sarà domani la tua naturalezza.',
      'Hai dedicato un\'ora alla tua voce: è un investimento che nessuno ti può togliere.',
      'Bel lavoro. La pronuncia si costruisce così: poco ogni giorno, senza saltare.'
    ],
    baseAr: [
      'برافو يا آية! ساعة كاملة، هذا هو السر: الاستمرارية.',
      'عملتي ساعة خدمة حقيقية. صوتك اليوم أوضح من البارح.',
      'كل يوم هكاكا، وبعد شهور يعرفوك في الميكروفون.'
    ],
    serie: {
      3: 'Tre giorni di fila: l\'abitudine comincia a formarsi.',
      7: 'Una settimana intera senza saltare! Il tuo orecchio sta già cambiando.',
      14: 'Due settimane di fila. Qui si vede chi fa sul serio, e tu lo stai facendo.',
      21: 'Tre settimane: ormai è un\'abitudine. Complimenti vivissimi.',
      30: 'Un mese di fila! È un traguardo vero. Concediti una serata di riposo e un buon caffè.'
    },
    ore: {
      10: '10 ore di allenamento totali: un primo traguardo.',
      25: '25 ore totali: sei oltre un quarto del percorso.',
      50: '50 ore totali: la strada è tracciata.',
      75: '75 ore totali: sei ben oltre la metà.',
      100: '100 ore totali! Questo è un risultato da professionista.'
    },
    settimana: 'Settimana completa: almeno 5 giorni con l\'ora intera. Obiettivo raggiunto!',
    miglioramento: 'Rispetto alla settimana scorsa la corrispondenza media delle tue letture è salita di {n} punti.'
  },

  /* ---------------- RISORSE ---------------- */
  risorse: {
    avviso: 'I link vengono dalla ricerca e non li ho verificati uno per uno: controlla sempre che siano ancora attivi e aggiornati.',
    gruppi: [
      { nome: 'Esami ufficiali di livello C1', voci: [
        ['CELI (Università per Stranieri di Perugia)', 'https://www.unistrapg.it', 'Materiali, criteri di valutazione e vademecum per la prova orale CELI 4.'],
        ['CILS (Università per Stranieri di Siena)', 'https://cils.unistrasi.it', 'Informazioni sulla certificazione CILS e sulle prove orali.']
      ] },
      { nome: 'Manuali gratuiti di dizione', voci: [
        ['Manuale di dizione (PDF, Ferai)', 'https://ferai.altervista.org/wp-content/uploads/2023/05/Ferai_Manuale_di_Dizione_2019.pdf', 'Regole di ortoepia e fonetica.'],
        ['Corso di dizione per giornalisti (slide, Stampa Romana)', 'https://stamparomana.it/wp-content/uploads/2020/04/Corso-dizione-slides-on-line.pdf', 'Respirazione, articolazione, pause e tipi di intonazione.']
      ] },
      { nome: 'Pronuncia e dizionari', voci: [
        ['Dizionatore', 'https://www.dizionatore.it', 'Controllo di pronuncia di singole parole.']
      ] },
      { nome: 'Lezioni con un insegnante', voci: [
        ['Superprof: dizione', 'https://www.superprof.it/lezione/dizione/', 'Tariffe indicative intorno a 24-25 € l\'ora (da verificare).'],
        ['italki', 'https://www.italki.com', 'Insegnanti online di italiano e di dizione.']
      ] },
      { nome: 'Per capire gli errori tipici', voci: [
        ['Errori morfosintattici di apprendenti arabofoni (Ca\' Foscari, 2022)', 'https://edizionicafoscari.it/media/pdf/article/elle/2022/2/art-10.30687-ELLE-2280-6792-2022-02-002.pdf', 'Studio sugli errori con articoli, preposizioni, pronomi e congiunzioni.']
      ] }
    ],
    libro: 'Libro consigliato: «Manuale di dizione, voce e respirazione» di Corrado Veneziano (citato nei corsi di tecniche vocali dell\'Università di Bologna).'
  },

  /* ---------------- LESSICO AGGIUNTIVO ---------------- */
  lessicoExtra: [
    { p: 'attendibile', d: 'Degno di fede; di una fonte, che si può considerare affidabile.', e: 'Una fonte attendibile è la base di ogni articolo.' },
    { p: 'imparziale', d: 'Che non prende le parti di nessuno.', e: 'Un giornalista deve essere imparziale.' },
    { p: 'inchiesta', d: 'Indagine approfondita su un fatto di interesse pubblico.', e: 'L\'inchiesta ha richiesto sei mesi di lavoro.' },
    { p: 'smentire', d: 'Dichiarare falso, negare con prove.', e: 'L\'azienda ha smentito le voci sulla chiusura.' },
    { p: 'rettifica', d: 'Correzione di un errore, pubblicata dallo stesso giornale.', e: 'Il giornale ha pubblicato una rettifica.' },
    { p: 'diffamazione', d: 'Danno alla reputazione di una persona con affermazioni false.', e: 'È stato denunciato per diffamazione.' },
    { p: 'deontologia', d: 'Insieme delle regole etiche di una professione.', e: 'La deontologia giornalistica impone di verificare le fonti.' },
    { p: 'reticente', d: 'Che tace o dice meno di quello che sa.', e: 'Il testimone è apparso reticente.' },
    { p: 'palese', d: 'Evidente, manifesto.', e: 'C\'è una palese contraddizione tra le due versioni.' },
    { p: 'opinabile', d: 'Discutibile, su cui si possono avere opinioni diverse.', e: 'È una scelta opinabile.' },
    { p: 'cospicuo', d: 'Rilevante, notevole per quantità.', e: 'Ha ricevuto un cospicuo finanziamento.' },
    { p: 'irrisorio', d: 'Così piccolo da sembrare ridicolo.', e: 'Il compenso era irrisorio.' },
    { p: 'lungimirante', d: 'Che prevede e valuta le conseguenze future.', e: 'È stata una decisione lungimirante.' },
    { p: 'stigmatizzare', d: 'Condannare pubblicamente.', e: 'Il sindaco ha stigmatizzato l\'episodio.' },
    { p: 'avallare', d: 'Approvare, dare credito a qualcosa.', e: 'Non voglio avallare questa tesi.' },
    { p: 'dirimere', d: 'Risolvere una controversia.', e: 'Spetta al giudice dirimere la questione.' },
    { p: 'paventare', d: 'Temere, prevedere con timore.', e: 'Gli esperti paventano un aumento dei prezzi.' },
    { p: 'lenire', d: 'Attenuare un dolore o un problema.', e: 'Il sostegno della comunità ha lenito la sofferenza.' },
    { p: 'esacerbare', d: 'Rendere più grave o più aspro.', e: 'Le polemiche hanno esacerbato gli animi.' },
    { p: 'fomentare', d: 'Alimentare, incoraggiare (un conflitto, un sentimento).', e: 'Alcuni articoli fomentano la paura.' },
    { p: 'latente', d: 'Presente ma nascosto, non ancora manifesto.', e: 'C\'è un conflitto latente tra le due comunità.' },
    { p: 'pervasivo', d: 'Che si diffonde ovunque.', e: 'La presenza dei social è sempre più pervasiva.' },
    { p: 'sinergia', d: 'Collaborazione che dà risultati superiori alla somma delle parti.', e: 'Tra radio e giornale è nata una sinergia.' },
    { p: 'sondaggio', d: 'Rilevazione di opinioni su un campione di persone.', e: 'Il sondaggio ha coinvolto mille persone.' },
    { p: 'testimonianza', d: 'Racconto di chi ha visto o vissuto un fatto.', e: 'La sua testimonianza è stata decisiva.' },
    { p: 'reperire', d: 'Trovare, procurarsi.', e: 'È difficile reperire dati aggiornati.' },
    { p: 'contestualizzare', d: 'Collocare in un contesto.', e: 'Bisogna contestualizzare la dichiarazione.' },
    { p: 'impasse', d: 'Situazione senza via d\'uscita (dal francese).', e: 'Le trattative sono in una fase di impasse.' },
    { p: 'spinoso', d: 'Difficile da affrontare.', e: 'È una questione spinosa.' },
    { p: 'dilagare', d: 'Diffondersi rapidamente e senza controllo.', e: 'Le notizie false dilagano sui social.' }
  ]
});
