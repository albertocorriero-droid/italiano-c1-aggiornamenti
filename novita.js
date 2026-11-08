// Registro delle novità: una voce per ogni versione pubblicata (la più recente in fondo).
// A ogni pubblicazione aggiungere la voce nuova con v = versione attuale del manifest + 1.
(function () {
  const D = window.DATA;
  D.novita = [
    { v: 1, data: '2026-10-31',
      it: ['Versione iniziale: 20 settimane, 1 ora al giorno, spiegazioni in italiano e arabo tunisino.'],
      ar: 'النسخة الأولى: 20 جمعة، ساعة كل نهار، والشرح بالطلياني وبالتونسي.' },
    { v: 2, data: '2026-11-06',
      it: ['Orecchio: 38 coppie minime nuove.', 'Ripeti: 40 frasi nuove. Scioglilingua: 9 nuovi.',
        'Ortoepia: 69 parole nuove per E e O aperte o chiuse, 16 per la S sorda o sonora, 7 coppie in cui l\'accento cambia il significato, 8 esempi di raddoppiamento e due regole nuove.'],
      ar: 'الإلقاء: برشا كلمات وتمارين جديدة: أزواج كلمات للسمع، جمل للتكرار، جمل صعيبة في النطق، وكلمات للـ E والـ O المفتوحة والمسكّرة.' },
    { v: 3, data: '2026-11-06',
      it: ['Quando c\'è un aggiornamento, il programma te lo dice da solo appena lo apri.'],
      ar: 'كي يكون فمّة تحديث، البرنامج يقولك وحدو كي تحلّو.' },
    { v: 4, data: '2026-11-06',
      it: ['Nuova sezione «Letture lunghe» (in Parlato): 12 testi da registrare, un paragrafo alla volta o tutti di seguito, con un giudizio dopo ogni registrazione.',
        'Parlato libero: dopo la registrazione ricevi un giudizio su durata, fluidità, connettori e varietà delle parole. 32 argomenti e 15 connettori nuovi, e il pulsante «Un altro argomento».',
        'Il giudizio ti dice anche quali parole ripetere, quale esercizio fare e se stai migliorando rispetto all\'ultima volta. Funziona in Chrome.',
        'Dopo ogni aggiornamento compare questa finestra «Novità». La cronologia completa è nella pagina «Aggiorna il programma».'],
      ar: 'جديد: «Letture lunghe» فيها 12 نص طويل تسجّلهم، وبعد كل تسجيل يجيك تقييم. وفي «Parlato libero» زادة يجيك تقييم: المدّة، السلاسة، أدوات الربط وتنوّع الكلمات. التقييم يقولك شنوّة تعاود وإذا قاعدة تتحسّن. يخدم في Chrome.' },
    { v: 5, data: '2026-11-07',
      it: ['Letture lunghe più lunghe: ogni testo ha ora 6 o 7 paragrafi, 300-350 parole (2-3 minuti di lettura).'],
      ar: 'النصوص الطويلة ولّات أطول: كل نص فيه 6 ولّا 7 فقرات، بين 300 و350 كلمة (دقيقتين لثلاثة دقايق قراية).' },
    { v: 6, data: '2026-11-08',
      it: ['Nuova pagina «I miei premi» (in Progressi): 17 medaglie che si sbloccano con le ore di studio, i giorni di fila, le registrazioni e le risposte giuste.',
        'Ogni medaglia apre un bonus nel «tesoretto»: modi di dire, curiosità sull\'Italia e nuovi colori per il programma.',
        'Alcune medaglie nascondono anche un premio a sorpresa. Quando ne sblocchi uno, puoi dirlo ad Alberto con un tocco.'],
      ar: 'جديد: صفحة «I miei premi» فيها 17 ميدالية تتفتح بساعات الدراسة، الأيام المتتالية، التسجيلات والإجابات الصحيحة. كل ميدالية تفتحلك بونيس: عبارات طليانية، معلومات على إيطاليا وألوان جديدة للبرنامج. وبعض الميداليات فيها كادو مفاجأة: كي تفتح واحد، قول لألبرتو.' }
  ];
  // Il riquadro «Aggiornamenti del programma» nel Piano legge questo elenco (dal più recente).
  D.aggiornamenti = D.novita.slice().reverse().map(n => ({ data: n.data, testo: 'Versione ' + n.v + ': ' + n.it.join(' ') }));
})();
