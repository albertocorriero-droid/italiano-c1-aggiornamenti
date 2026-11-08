// Premi e medaglie. I premi veri NON sono scritti qui: c'e' solo il loro numero.
(function () {
  const D = window.DATA;

  // Bonus dentro l'app: modi di dire, curiosita' sull'Italia, temi di colore.
  const MODI = [
    { t: 'In bocca al lupo!', x: 'Si dice a chi sta per affrontare una prova (un esame, un colloquio, un\'intervista) per augurargli buona fortuna. Si risponde: «Crepi!».', ar: 'نقولوها لواحد باش يدخل لامتحان ولا مقابلة، نتمنّولو التوفيق. والجواب: «Crepi!».' },
    { t: 'Avere le mani in pasta', x: 'Essere coinvolti in una faccenda e avere una certa influenza su di essa. «Ha le mani in pasta in tutti i giornali della città.»', ar: 'يعني تكون مشارك ومتدخّل في الشيء ويكون عندك كلمة فيه.' },
    { t: 'Non vedo l\'ora', x: 'Sono impaziente che arrivi un momento. «Non vedo l\'ora di partire!»', ar: 'ما نجّمش نستنّى، متشوّق برشا. «ما نجّمش نستنّى باش نسافر!»' },
    { t: 'Chi dorme non piglia pesci', x: 'Chi è pigro e non si impegna non ottiene niente. Si usa per spronare qualcuno a darsi da fare.', ar: 'اللي ينعس ما يصيدش حوت: اللي يكسل ما يلقى شي.' },
    { t: 'Prendere due piccioni con una fava', x: 'Ottenere due risultati con una sola azione. «Vado in banca e passo anche in posta: due piccioni con una fava.»', ar: 'بحجرة وحدة زوز عصافر: بعمل واحد تجيب زوز نتايج.' },
    { t: 'Essere al verde', x: 'Non avere più soldi. «A fine mese sono sempre al verde.»', ar: 'ما عندكش فلوس، مفلّس.' },
    { t: 'Acqua in bocca!', x: 'Non dire niente a nessuno, tieni il segreto. Letteralmente: tieni l\'acqua in bocca, così non puoi parlare.', ar: 'سكّر فمّك، ما تقولش لحد. كأنّك تحط الماء في فمّك باش ما تنجّمش تحكي.' },
    { t: 'Essere in gamba', x: 'Essere bravo, capace, sveglio. «La tua collega è proprio in gamba.»', ar: 'تكون ماهر وذكي وقدّ الشغل.' },
    { t: 'Meglio tardi che mai', x: 'È meglio fare una cosa in ritardo che non farla del tutto.', ar: 'أحسن تتأخّر من ما تعملش الشي أصلاً.' }
  ];
  const CURIO = [
    { t: 'Parole italiane che vengono dall\'arabo', x: 'Molte parole italiane di tutti i giorni arrivano dall\'arabo: zucchero (sukkar), arancia (nāranj), carciofo (kharshūf), zafferano (za\'farān), magazzino (makhāzin), dogana (dīwān), tariffa. Sono arrivate soprattutto dalla Sicilia e dal commercio sul Mediterraneo.', ar: 'برشا كلمات طليانية يوميّة جايين من العربية: zucchero (سكّر)، arancia (نارنج)، carciofo (خرشوف)، zafferano (زعفران)، magazzino (مخازن)، dogana (ديوان). أغلبهم جاوا من صقلية ومن التجارة في المتوسّط.' },
    { t: 'Da dove viene «ciao»', x: '«Ciao» viene dal veneto «s-ciào vostro», cioè «sono vostro schiavo», una formula di cortesia antica. Con il tempo è diventata il saluto più usato nel mondo.', ar: '«Ciao» أصلها من لهجة البندقية «s-ciào vostro» يعني «أنا في خدمتك»، عبارة مجاملة قديمة. مع الوقت ولّات أكثر تحيّة مستعملة في العالم.' },
    { t: 'L\'università più antica', x: 'L\'Università di Bologna, fondata nel 1088, è considerata la più antica del mondo occidentale ancora attiva.', ar: 'جامعة بولونيا، تأسّست في 1088، تعتبر أقدم جامعة في العالم الغربي مازالت تخدم.' },
    { t: 'Il 2 giugno 1946', x: 'Il 2 giugno 1946 gli italiani votarono con un referendum tra monarchia e repubblica, e per la prima volta le donne votarono in una consultazione nazionale. Per questo il 2 giugno è la Festa della Repubblica.', ar: 'في 2 جوان 1946 الطليان صوّتوا بين الملكية والجمهورية، ولأوّل مرّة النساء صوّتن في تصويت وطني. علاش 2 جوان هو عيد الجمهورية.' },
    { t: 'La Tunisia è vicinissima', x: 'Tra la Tunisia e la Sicilia ci sono poco più di 140 chilometri di mare. Per questo per secoli le due sponde si sono scambiate cibo, parole e persone: il cuscus si mangia ancora a Trapani.', ar: 'بين تونس وصقلية أقل من 150 كيلومتر من البحر. علاش على مدى قرون الضفّتين تبادلو الماكلة والكلمات والناس: الكسكسي مازال يتاكل في تراباني.' }
  ];
  // Temi: colori principali in chiaro e in scuro
  const TEMI = [
    { id: 'mare', nome: 'Mare', ar: 'البحر', chiaro: ['#1f6fb2', '#e0a03f'], scuro: ['#5aa7e8', '#f0b95f'] },
    { id: 'gelsomino', nome: 'Gelsomino', ar: 'الياسمين', chiaro: ['#7a5aa6', '#d1789a'], scuro: ['#b79ae0', '#f0a0bf'] },
    { id: 'tramonto', nome: 'Tramonto', ar: 'الغروب', chiaro: ['#c4553a', '#e0a03f'], scuro: ['#ee8466', '#f4be5f'] }
  ];
  D.temi = TEMI;

  const M = i => ({ tipo: 'modo', ...MODI[i] });
  const C = i => ({ tipo: 'curiosita', ...CURIO[i] });
  const T = i => ({ tipo: 'tema', tema: TEMI[i].id, t: 'Tema «' + TEMI[i].nome + '»', x: 'Puoi cambiare i colori del programma. Scegli il tema nella pagina «I miei premi».', ar: 'تنجّم تبدّل ألوان البرنامج. اختار الثيم من صفحة «I miei premi».' });

  // ramo: ore | serie | rec | quiz. premio = numero del premio vero (la lista e' solo di Alberto).
  D.medaglie = [
    { id: 'o2', ramo: 'ore', n: 2, it: 'Primi passi', ar: 'الخطوات الأولى', bonus: M(0) },
    { id: 'o5', ramo: 'ore', n: 5, it: 'Cinque ore di italiano', ar: 'خمس ساعات طلياني', premio: 1, bonus: T(0) },
    { id: 'o10', ramo: 'ore', n: 10, it: 'Dieci ore di voce', ar: 'عشر ساعات صوت', bonus: M(1) },
    { id: 'o25', ramo: 'ore', n: 25, it: 'Venticinque ore', ar: 'خمسة وعشرين ساعة', premio: 3, bonus: C(0) },
    { id: 'o30', ramo: 'ore', n: 30, it: 'Trenta ore', ar: 'ثلاثين ساعة', premio: 7, bonus: M(2) },
    { id: 'o50', ramo: 'ore', n: 50, it: 'Cinquanta ore', ar: 'خمسين ساعة', premio: 5, bonus: T(1) },
    { id: 'o100', ramo: 'ore', n: 100, it: 'Cento ore: sei una giornalista in italiano', ar: 'مية ساعة: ولّيتي صحفية بالطلياني', premio: 6, bonus: T(2) },
    { id: 's3', ramo: 'serie', n: 3, it: 'Tre giorni di fila', ar: 'ثلاثة أيام متتالية', bonus: M(3) },
    { id: 's7', ramo: 'serie', n: 7, it: 'Una settimana intera', ar: 'جمعة كاملة', bonus: C(1) },
    { id: 's14', ramo: 'serie', n: 14, it: 'Due settimane senza fermarti', ar: 'جمعتين من غير ما توقّف', premio: 2, bonus: M(4) },
    { id: 's30', ramo: 'serie', n: 30, it: 'Un mese di fila', ar: 'شهر كامل متتالي', bonus: C(2) },
    { id: 'r5', ramo: 'rec', n: 5, it: 'Cinque registrazioni', ar: 'خمس تسجيلات', bonus: M(5) },
    { id: 'r25', ramo: 'rec', n: 25, it: 'Venticinque registrazioni', ar: 'خمسة وعشرين تسجيل', bonus: C(3) },
    { id: 'r50', ramo: 'rec', n: 50, it: 'Cinquanta registrazioni: la tua voce è cambiata', ar: 'خمسين تسجيل: صوتك تبدّل', premio: 4, bonus: M(6) },
    { id: 'q50', ramo: 'quiz', n: 50, it: 'Cinquanta risposte giuste', ar: 'خمسين إجابة صحيحة', bonus: M(7) },
    { id: 'q200', ramo: 'quiz', n: 200, it: 'Duecento risposte giuste', ar: 'مئتين إجابة صحيحة', bonus: C(4) },
    { id: 'q500', ramo: 'quiz', n: 500, it: 'Cinquecento risposte giuste', ar: 'خمسمائة إجابة صحيحة', bonus: M(8) }
  ];
  D.rami = {
    ore: { nome: 'Ore di studio', ar: 'ساعات الدراسة', e: '⏱', unita: 'ore' },
    serie: { nome: 'Giorni di fila', ar: 'أيام متتالية', e: '🔥', unita: 'giorni' },
    rec: { nome: 'Registrazioni', ar: 'التسجيلات', e: '🎙', unita: 'registrazioni' },
    quiz: { nome: 'Risposte giuste (quiz e grammatica)', ar: 'الإجابات الصحيحة', e: '✅', unita: 'risposte' }
  };
})();
