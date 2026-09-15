import { BookTopic, HatCard, QuizQuestion, DachCountryFact, TextbookPage } from '../types';

export const BOOK_METADATA = {
  title: 'Deutsch mit Spaß und Quatsch',
  subtitle: 'Современный интерактивный учебник немецкого языка для школьников',
  authors: ['Ekaterina Rabogoschwili', 'Alina Wlasowa'],
  authorsDisplay: 'Ekaterina Rabogoschwili & Alina Wlasowa',
  targetAudience: 'Для школьников 5–9 классов (11–16 лет)',
  level: 'A1 – A2.1 (GERS / CEFR)',
  motto: 'Lerne Deutsch mit einem Lächeln! (Учи немецкий с улыбкой!)',
  publisher: 'Junior Deutsch Verlag (Berlin — Wien — Zürich)',
  year: '2026',
  isbn: '978-3-948821-04-2',
  bbk: '81.2Нем-922',
  udk: '811.112.2(075.3)',
  pageCount: 120,
  fullAnnotationParagraphs: [
    '„Deutsch mit Spaß und Quatsch“ — это современный, интерактивный и методически выверенный учебник немецкого языка для школьников средней школы. Он разработан с целью сделать процесс овладения иностранным языком естественным, увлекательным и свободным от психологических барьеров («Keine Angst vor Fehlern!»).',
    'Тематическое наполнение курса точно созвучно реальным интересам современного подростка: школьная жизнь и перемены, друзья и компании, семья и домашние питомцы, любимая музыка, видеоигры, блогинг, спорт, уличная еда и праздники в немецкоязычных странах (DACH).',
    'Лексический и грамматический материал подается через живые ситуативные диалоги, иллюстрированные комиксы, молодежные мемы, мини-расследования и игровые механики. Каждая глава включает практический разговорный модуль («Wortschatzkiste»), наглядные правила-схемы без заумной терминологии, а также задания для парной и групповой работы.',
    'Особое внимание уделено подлинной разговорной речи сверстников из Германии, Австрии и Швейцарии — школьники учатся не книжным архаизмам, а живому языку, на котором говорят в Берлине, Мюнхене, Вене и Цюрихе. В учебник интегрирован удобный фонетический практикум с аудио-озвучкой носителями языка.',
    'Издание соответствует требованиям общеевропейских компетенций владения иностранным языком (CEFR / GERS уровня A1–A2) и может использоваться как основной учебник для 5–9 классов, в качестве элективного курса, а также для самостоятельного изучения с родителями или репетитором.'
  ],
  keyFeatures: [
    {
      title: 'Без страха ошибаться',
      subtitle: 'Keine Angst vor Fehlern!',
      description: 'Игровая подача снимает психологический барьер: ошибки — это просто весёлая часть учебного процесса.',
      icon: 'Smile'
    },
    {
      title: 'Темы подростковой жизни',
      subtitle: 'Echte Schulthemen',
      description: 'Музыка, игры, мемы, соцсети, дружба и школьные будни вместо скучных академических текстов.',
      icon: 'Sparkles'
    },
    {
      title: 'Живая разговорная речь',
      subtitle: 'Sprechen wie echte Teenies',
      description: 'Диалоги, комиксы и фразы, которые реально используются в повседневном общении сверстников в DACH-странах.',
      icon: 'MessageCircle'
    },
    {
      title: 'Страноведение DACH',
      subtitle: 'Deutschland, Österreich, Schweiz',
      description: 'Любопытные и забавные факты о культуре, традициях и городах трёх немецкоязычных стран.',
      icon: 'Globe2'
    }
  ]
};

export const BOOK_TOPICS: BookTopic[] = [
  {
    id: 'schule',
    titleRu: 'Школа',
    titleDe: 'Die Schule & Schulalltag',
    icon: 'GraduationCap',
    description: 'Школьное расписание, любимые и нелюбимые предметы, забавные перемены и школьный сленг.',
    funFact: 'В Германии лучшая школьная оценка — это 1 (sehr gut), а худшая — 6 (ungenügend)!',
    sampleWords: [
      { de: 'die Pause', ru: 'перемена', phonetic: 'ди пáузэ' },
      { de: 'das Lieblingsfach', ru: 'любимый предмет', phonetic: 'дас ли́блингсфах' },
      { de: 'die Hausaufgaben', ru: 'домашние задания', phonetic: 'ди хáусауфгабэн' },
      { de: 'keine Lust!', ru: 'неохота / лень!', phonetic: 'кáйнэ луст' }
    ]
  },
  {
    id: 'freunde',
    titleRu: 'Друзья',
    titleDe: 'Freunde & Meine Clique',
    icon: 'Users',
    description: 'Как познакомиться, договориться о встрече, пошутить и рассказать о лучшем друге.',
    funFact: 'Немцы часто называют близкого друга "Kumpel" (приятель) или "bester Freund".',
    sampleWords: [
      { de: 'der Kumpel', ru: 'приятель, бро', phonetic: 'дэр кýмпель' },
      { de: 'zusammen abhängen', ru: 'тусить вместе', phonetic: 'цузáмен áбхенген' },
      { de: 'Wie geht’s?', ru: 'Как дела?', phonetic: 'ви гейтс' },
      { de: 'Alles klar!', ru: 'Всё ясно / порядок!', phonetic: 'áллес кляр' }
    ]
  },
  {
    id: 'familie',
    titleRu: 'Семья',
    titleDe: 'Familie & Haustiere',
    icon: 'Heart',
    description: 'Родители, братья, сёстры и любимые питомцы: от забавных котиков до лающих собак.',
    funFact: 'Самая популярная кличка собак в Германии — Bello или Luna!',
    sampleWords: [
      { de: 'die Geschwister', ru: 'братья и сестры', phonetic: 'ди гешви́стэр' },
      { de: 'das Haustier', ru: 'домашний питомец', phonetic: 'дас хáустир' },
      { de: 'nervig', ru: 'раздражающий / бесячий', phonetic: 'нéрвих' },
      { de: 'lieb haben', ru: 'любить / обожать', phonetic: 'либ хáбэн' }
    ]
  },
  {
    id: 'hobbys',
    titleRu: 'Хобби',
    titleDe: 'Hobbys & Freizeit',
    icon: 'Palette',
    description: 'Чем заняться после уроков: рисование, скейты, кулинария и творчество.',
    funFact: 'Слово "Freizeitstress" (стресс от слишком большого числа кружков и хобби) придумали именно в Германии.',
    sampleWords: [
      { de: 'Spaß machen', ru: 'доставлять удовольствие', phonetic: 'шпас мáхен' },
      { de: 'chillen', ru: 'отдыхать, чилить', phonetic: 'чи́лен' },
      { de: 'zeichnen', ru: 'рисовать', phonetic: 'цáйхнен' },
      { de: 'Skateboard fahren', ru: 'кататься на скейте', phonetic: 'скéйтборд фáрен' }
    ]
  },
  {
    id: 'musik',
    titleRu: 'Музыка',
    titleDe: 'Musik & Beat',
    icon: 'Headphones',
    description: 'Немецкий поп, рэп, инди, фестивали и плейлисты для учебы с отличным настроением.',
    funFact: 'Песня "99 Luftballons" Нелли — один из самых известных немецких хитов во всём мире.',
    sampleWords: [
      { de: 'der Ohrwurm', ru: 'навязчивая мелодия (букв. ушной червь)', phonetic: 'дэр óрвурм' },
      { de: 'die Kopfhörer', ru: 'наушники', phonetic: 'ди кóпфхёрэр' },
      { de: 'laut aufdrehen', ru: 'врубить на полную громкость', phonetic: 'лáут áуфдрейен' },
      { de: 'das Lied', ru: 'песня', phonetic: 'дас лид' }
    ]
  },
  {
    id: 'sport',
    titleRu: 'Спорт',
    titleDe: 'Sport & Action',
    icon: 'Trophy',
    description: 'Футбол (Бундеслига!), плавание, велосипедные прогулки и командные турниры.',
    funFact: 'В Германии зарегистрировано более 24 000 футбольных клубов!',
    sampleWords: [
      { de: 'der Fußball', ru: 'футбол', phonetic: 'дэр фýсбаль' },
      { de: 'das Tor schießen', ru: 'забить гол', phonetic: 'дас тор ши́сэн' },
      { de: 'gewinnen', ru: 'побеждать', phonetic: 'геви́нен' },
      { de: 'trainieren', ru: 'тренироваться', phonetic: 'трени́рен' }
    ]
  },
  {
    id: 'spiele',
    titleRu: 'Игры',
    titleDe: 'Gaming & Zocken',
    icon: 'Gamepad2',
    description: 'Видеоигры, настолки ("Brettspiele") и квесты для изучения лексики без скуки.',
    funFact: 'В Кёльне каждый год проходит крупнейшая в мире выставка видеоигр Gamescom!',
    sampleWords: [
      { de: 'zocken', ru: 'рубиться в видеоигры', phonetic: 'цóкэн' },
      { de: 'das Level schaffen', ru: 'пройти уровень', phonetic: 'дас лéвел шáфен' },
      { de: 'das Würfelspiel', ru: 'игра в кости / настолка', phonetic: 'дас вю́рфельшпиль' },
      { de: 'der Highscore', ru: 'рекорд очков', phonetic: 'дэр хáйскор' }
    ]
  },
  {
    id: 'reisen',
    titleRu: 'Путешествия',
    titleDe: 'Reisen & Abenteuer',
    icon: 'Compass',
    description: 'Путешествия на поезде ICE по Альпам, замки Баварии и поездка в Берлин.',
    funFact: 'В Германии более 25 000 замков и крепостей!',
    sampleWords: [
      { de: 'der Rucksack', ru: 'рюкзак', phonetic: 'дэр рýкзак' },
      { de: 'die Fahrkarte', ru: 'билет на проезд', phonetic: 'ди фáркарте' },
      { de: 'Gute Reise!', ru: 'Счастливого пути!', phonetic: 'гýтэ рáйзэ' },
      { de: 'das Abenteuer', ru: 'приключение', phonetic: 'дас áбентойер' }
    ]
  },
  {
    id: 'socialmedia',
    titleRu: 'Социальные сети',
    titleDe: 'Social Media & Chats',
    icon: 'Share2',
    description: 'Смайлики, чат-сокращения на немецком, мемы и как общаться в директе.',
    funFact: 'Немецкие подростки сокращают слова в чате, например: "LG" = Liebe Grüße, "kA" = keine Ahnung!',
    sampleWords: [
      { de: 'das Foto posten', ru: 'выложить фото', phonetic: 'дас фóто пóстэн' },
      { de: 'die Sprachnachricht', ru: 'голосовое сообщение', phonetic: 'ди шпрáхнахрихт' },
      { de: 'keine Ahnung (kA)', ru: 'без понятия', phonetic: 'кáйнэ áнунг' },
      { de: 'Gefällt mir!', ru: 'Мне нравится! (лайк)', phonetic: 'гефéльт мир' }
    ]
  }
];

export const DACH_FACTS: DachCountryFact[] = [
  {
    country: 'Германия (Deutschland)',
    flag: '🇩🇪',
    capital: 'Берлин',
    fact: 'Более 300 сортов хлеба и 1 000 видов колбасок, а также страна изобретения мармеладных мишек Haribo!',
    teenCultureFact: 'В первый день учебного года немецким первоклассникам дарят гигантский конус с конфетами — Schultüte!'
  },
  {
    country: 'Австрия (Österreich)',
    flag: '🇦🇹',
    capital: 'Вена',
    fact: 'Родина Моцарта, альпийских лыжных курортов и венского шницеля размером с целую тарелку.',
    teenCultureFact: 'В австрийском немецком картошку называют "Erdäpfel" (земляные яблоки), а помидор — "Paradeiser"!'
  },
  {
    country: 'Швейцария (Die Schweiz)',
    flag: '🇨🇭',
    capital: 'Берн',
    fact: 'Здесь 4 официальных языка, самый вкусный шоколад в мире и более 1 500 кристально чистых горных озёр.',
    teenCultureFact: 'Швейцарский немецкий (Schwyzerdütsch) звучит так забавно и самобытно, что немцы иногда включают субтитры!'
  }
];

// Cards for the Interactive Hat ("Интерактивная шляпа")
export const HAT_CARDS: HatCard[] = [
  {
    id: 'hat-1',
    type: 'word',
    german: 'der Quatsch',
    russian: 'Чепуха, ерунда, шуточные шалости',
    pronunciation: 'дэр кватч',
    exampleDe: 'Mach doch keinen Quatsch!',
    exampleRu: 'Не занимайся ерундой! / Хватит шалить!',
    humorNote: 'Главное слово нашего учебника: учимся играючи!',
    category: 'Школьный сленг'
  },
  {
    id: 'hat-2',
    type: 'phrase',
    german: 'Das macht Spaß!',
    russian: 'Это весело! / Это доставляет удовольствие!',
    pronunciation: 'дас махт шпас',
    exampleDe: 'Deutsch lernen macht richtig Spaß!',
    exampleRu: 'Учить немецкий — это по-настоящему весело!',
    humorNote: 'Фраза, которую вы будете говорить на каждом уроке.',
    category: 'Эмоции'
  },
  {
    id: 'hat-3',
    type: 'word',
    german: 'der Kummerspeck',
    russian: 'Лишний вес от заедания грусти (букв. «жирок печали»)',
    pronunciation: 'дэр кýммершпек',
    exampleDe: 'Ich habe heute Schokolade gegessen gegen Kummerspeck.',
    exampleRu: 'Я сегодня ел шоколад против печали.',
    humorNote: 'Одно из самых смешных непереводимых немецких слов!',
    category: 'Забавные слова'
  },
  {
    id: 'hat-4',
    type: 'phrase',
    german: 'Ich verstehe nur Bahnhof',
    russian: 'Я ничегошеньки не понимаю (букв. «понимаю только вокзал»)',
    pronunciation: 'их фэрштéэ нур бáнхоф',
    exampleDe: 'Was meinst du? Ich verstehe nur Bahnhof!',
    exampleRu: 'О чём ты? Я вообще ничего не догоняю!',
    humorNote: 'Немецкий аналог нашей фразы "это для меня китайская грамота".',
    category: 'Идиомы'
  },
  {
    id: 'hat-5',
    type: 'phrase',
    german: 'Na, alles fit?',
    russian: 'Ну что, как сам? Всё в порядке?',
    pronunciation: 'на, áллес фит?',
    exampleDe: 'Hallo Lukas! Na, alles fit im Schritt?',
    exampleRu: 'Привет, Лукас! Ну что, бодрячком?',
    humorNote: 'Идеальное приветствие для школьного коридора.',
    category: 'Общение'
  },
  {
    id: 'hat-6',
    type: 'word',
    german: 'der Ohrwurm',
    russian: 'Песня, которая засела в голове (букв. «ушной червь»)',
    pronunciation: 'дэр óрвурм',
    exampleDe: 'Dieses Lied ist ein totaler Ohrwurm!',
    exampleRu: 'Эта песня прямо въелась в голову!',
    humorNote: 'Не пугайтесь, никаких червяков, только классный бит!',
    category: 'Музыка'
  },
  {
    id: 'hat-7',
    type: 'word',
    german: 'die Schnapsidee',
    russian: 'Сумасбродная безумная идея, которая пришла спонтанно',
    pronunciation: 'ди шнáпсиде',
    exampleDe: 'Um Mitternacht Vokabeln lernen war eine Schnapsidee.',
    exampleRu: 'Учить слова в полночь было безумной затеей.',
    humorNote: 'Школьники часто называют так идеи сбежать с урока физкультуры.',
    category: 'Забавные слова'
  },
  {
    id: 'hat-8',
    type: 'phrase',
    german: 'Daumen drücken!',
    russian: 'Держать кулачки! / Удачи!',
    pronunciation: 'дáумэн дрю́кэн!',
    exampleDe: 'Morgen habe ich einen Test. Drück mir die Daumen!',
    exampleRu: 'Завтра у меня контрольная. Держи за меня кулачки!',
    humorNote: 'В Германии сжимают не кулаки, а прижимают именно большие пальцы!',
    category: 'Школьные будни'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionDe: 'Was bedeutet das Wort „Quatsch“?',
    questionRu: 'Что означает ключевое слово из названия нашего учебника „Quatsch“?',
    options: ['Серьёзная лекция', 'Чепуха, забавные шалости', 'Строгий экзамен', 'Тяжёлый рюкзак'],
    correctIndex: 1,
    explanation: '„Quatsch“ — это чепуха, шутка и весёлые проказы. Наш учебник именно про учёбу со смехом!'
  },
  {
    id: 'q2',
    questionDe: 'Welche Note ist in Deutschland die BESTE Note in der Schule?',
    questionRu: 'Какая оценка в немецкой школе является самой высшей и лучшей?',
    options: ['Оценка 5', 'Оценка 10', 'Оценка 1 (Eins / sehr gut)', 'Оценка A+'],
    correctIndex: 2,
    explanation: 'В Германии шкала перевёрнута: 1 — отлично (sehr gut), а 6 — совсем плохо (ungenügend)!'
  },
  {
    id: 'q3',
    questionDe: 'Was sagt man, wenn man überhaupt nichts versteht?',
    questionRu: 'Какую идиому используют немцы, если совсем ничего не поняли?',
    options: [
      'Ich verstehe nur Bahnhof (Понимаю только вокзал)',
      'Ich kaufe eine Wurst (Покупаю колбасу)',
      'Mein Hund hat die Hausaufgabe gegessen',
      'Der Kuckuck ruft im Wald'
    ],
    correctIndex: 0,
    explanation: 'Выражение «Ich verstehe nur Bahnhof» зародилось в Первую мировую войну: солдаты так хотели домой, что думали только о вокзале!'
  },
  {
    id: 'q4',
    questionDe: 'Wie heißen die drei Länder im DACH-Raum?',
    questionRu: 'Какие 3 страны скрываются за аббревиатурой DACH, о которых рассказывает учебник?',
    options: [
      'Дания, Англия, Хорватия',
      'Германия (D), Австрия (A), Швейцария (CH)',
      'Дюссельдорф, Амстердам, Хельсинки',
      'Доминикана, Аргентина, Чили'
    ],
    correctIndex: 1,
    explanation: 'D = Deutschland, A = Österreich (Austria), CH = Confoederatio Helvetica (Швейцария).'
  },
  {
    id: 'q5',
    questionDe: 'Was bedeutet das Wort „chillen“ in der Jugendsprache?',
    questionRu: 'Что означает популярное среди школьников слово „chillen“?',
    options: [
      'Отдыхать и расслабляться с друзьями',
      'Быстро бежать на первый урок',
      'Зубрить сложные таблицы падежей',
      'Покупать школьную форму'
    ],
    correctIndex: 0,
    explanation: '„Chillen“ — любимое слово школьников: отдыхать, слушать музыку и общаться без лишней спешки!'
  }
];

export const SAMPLE_PAGES: TextbookPage[] = [
  {
    pageNumber: 1,
    section: 'Einheit 1: Hallo Welt!',
    title: 'Wie heißt du? — Знакомство без стресса',
    summary: 'Первые фразы приветствия, школьные смайлы, комикс о первом дне в международной школе в Мюнхене.',
    germanHighlights: ['Hallo! / Guten Tag!', 'Ich heiße Max. Und wer bist du?', 'Freut mich!', 'Tschüss! Auf Wiedersehen!']
  },
  {
    pageNumber: 2,
    section: 'Einheit 2: Meine Clique',
    title: 'Freunde, Hobbys & Quatsch in der Pause',
    summary: 'Диалог на школьном дворе, мем-комикс про забытую сменку и любимые видеоигры.',
    germanHighlights: ['Was machst du in der Freizeit?', 'Ich zocke gern Minecraft.', 'Komm, wir chillen zusammen!', 'Kein Problem!']
  },
  {
    pageNumber: 3,
    section: 'Einheit 3: Schule mal anders',
    title: 'Der Stundenplan: Lieblingsfächer & Pausensnacks',
    summary: 'Сравниваем немецкие и наши школы, разбираемся с оценками от 1 до 6 и собираем правильный ланчбокс.',
    germanHighlights: ['Mein Lieblingsfach ist Kunst.', 'Mathe finde ich anstrengend.', 'Hast du ein Brötchen dabei?', 'Die Glocke läutet!']
  },
  {
    pageNumber: 4,
    section: 'Einheit 4: DACH-Entdecker',
    title: 'Wien, Berlin, Zürich — Виртуальный тур',
    summary: 'Интересные факты для тинейджеров: венские сладости, граффити в Берлине и швейцарские альпийские подъёмники.',
    germanHighlights: ['Die Hauptstadt von Österreich ist Wien.', 'Schau mal, das Brandenburger Tor!', 'Das Schokoladenmuseum ist cool.']
  }
];

// Helper to shuffle arrays randomly on refresh / component mount
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Voice Agent System
export type VoiceAgentId = 'frau_weber' | 'emma' | 'lukas' | 'herr_mueller';

export interface VoiceAgent {
  id: VoiceAgentId;
  name: string;
  titleRu: string;
  role: string;
  avatar: string;
  gender: 'female' | 'male';
  sampleText: string;
  pitch: number;
  rate: number;
  badge: string;
  voice: string;
}

export const VOICE_AGENTS: VoiceAgent[] = [
  {
    id: 'frau_weber',
    name: 'Frau Weber',
    titleRu: 'Учительница Анна',
    role: 'Тёплый, доброжелательный женский голос немецкого педагога с кристальной дикцией.',
    avatar: '👩‍🏫',
    gender: 'female',
    sampleText: 'Hallo! Ich bin Frau Weber. Wir lernen Deutsch mit Freude und ohne Stress! Alles ist ganz einfach.',
    pitch: 1.25,
    rate: 0.92,
    badge: 'Классический школьный',
    voice: 'Kore'
  },
  {
    id: 'emma',
    name: 'Emma',
    titleRu: 'Школьница Эмма',
    role: 'Звонкий, энергичный девичий голос подруги-сверстницы из Берлина.',
    avatar: '👧',
    gender: 'female',
    sampleText: 'Hey zusammen! Ich bin Emma. Deutsch lernen macht mega viel Spaß! Probier es aus!',
    pitch: 1.45,
    rate: 0.98,
    badge: 'Молодёжный & Весёлый',
    voice: 'Aoede'
  },
  {
    id: 'lukas',
    name: 'Lukas',
    titleRu: 'Одноклассник Лукас',
    role: 'Задорный юношеский голос сверстника, фаната игр, комиксов и живого сленга.',
    avatar: '👦',
    gender: 'male',
    sampleText: 'Moin! Ich bin Lukas. Chillen, quatschen und Deutsch sprechen – alles ganz locker!',
    pitch: 1.05,
    rate: 0.96,
    badge: 'Разговорный & Сленг',
    voice: 'Puck'
  },
  {
    id: 'herr_mueller',
    name: 'Herr Müller',
    titleRu: 'Профессор Мюллер',
    role: 'Глубокий основательный мужской голос профессора-лингвиста, медленная уверенная речь.',
    avatar: '🧔',
    gender: 'male',
    sampleText: 'Guten Tag. Ich bin Herr Müller. Deutsch ist eine wunderschöne Sprache. Wir beginnen ganz in Ruhe.',
    pitch: 0.7,
    rate: 0.85,
    badge: 'Глубокий академический',
    voice: 'Charon'
  }
];

const AGENT_STORAGE_KEY = 'deutsch_selected_voice_agent';

export function getSelectedVoiceAgentId(): VoiceAgentId {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(AGENT_STORAGE_KEY);
      if (saved && VOICE_AGENTS.some(a => a.id === saved)) {
        return saved as VoiceAgentId;
      }
    } catch {
      // ignore
    }
  }
  return 'frau_weber';
}

export function getSelectedVoiceAgent(): VoiceAgent {
  const id = getSelectedVoiceAgentId();
  return VOICE_AGENTS.find(a => a.id === id) || VOICE_AGENTS[0];
}

export function setSelectedVoiceAgent(id: VoiceAgentId) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(AGENT_STORAGE_KEY, id);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('voiceAgentChanged', { detail: id }));
  }
}

let serverAudio: HTMLAudioElement | null = null;
let serverAudioUrl: string | null = null;
let serverAbort: AbortController | null = null;
let speechSeq = 0;

function revokeServerAudioUrl() {
  if (serverAudioUrl) {
    try { URL.revokeObjectURL(serverAudioUrl); } catch {}
    serverAudioUrl = null;
  }
}

function stopServerAudio(silent: boolean) {
  // Invalidate any in-flight request/playback so its .then/.catch/onerror
  // callbacks are ignored (prevents a browser-fallback voice from firing after
  // the user pressed Stop while the server audio was still loading).
  speechSeq++;
  serverAbort?.abort();
  serverAbort = null;
  if (serverAudio) {
    // Detach handlers BEFORE tearing down the element. Setting `src=''` fires an
    // async `error` event, which (if still wired) would launch the browser
    // fallback voice on top of / after the real one.
    try { serverAudio.onended = null; } catch {}
    try { serverAudio.onerror = null; } catch {}
    try { serverAudio.pause(); } catch {}
    try { serverAudio.src = ''; } catch {}
    serverAudio = null;
  }
  revokeServerAudioUrl();
  if (!silent) {
    window.dispatchEvent(new CustomEvent('speechEnded'));
  }
}

// Global cached voice store for speech synthesis (fallback only)
let cachedVoices: SpeechSynthesisVoice[] = [];

function initVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const load = () => {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) cachedVoices = v;
    } catch {}
  };
  load();
  if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = load;
  }
}

if (typeof window !== 'undefined') initVoices();

/**
 * Known German female voice identifiers across Windows, macOS, iOS, Android, and Edge Natural
 * NOTICE: 'google deutsch' is intentionally excluded because in Chrome it is a male voice that ignores pitch!
 */
export const FEMALE_GERMAN_PATTERNS = [
  'amira',
  'katja',
  'hedda',
  'maren',
  'louisa',
  'anna',
  'petra',
  'marlene',
  'helena',
  'vicki',
  'gudrun',
  'elena',
  'karin',
  'claudia',
  'eva',
  'monika',
  'angela',
  'sara',
  'sarah',
  'jeni',
  'leni',
  'babs',
  'weiblich',
  'female',
  'woman',
  'girl'
];

/**
 * Known German male voice identifiers (including 'google deutsch' which is male in Google TTS)
 */
export const MALE_GERMAN_PATTERNS = [
  'stefan',
  'conrad',
  'florian',
  'killian',
  'yannick',
  'martin',
  'markus',
  'hans',
  'david',
  'george',
  'frank',
  'christoph',
  'daniel',
  'jonas',
  'karsten',
  'viktor',
  'männlich',
  'male',
  'man',
  'boy',
  'google deutsch'
];

/**
 * Returns fresh voices from window.speechSynthesis
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  try {
    const live = window.speechSynthesis.getVoices();
    if (live && live.length > 0) {
      cachedVoices = live;
      return live;
    }
  } catch {
    // fallback to cache
  }
  return cachedVoices;
}

/**
 * Returns German voices available on the current device
 */
export function getAvailableGermanVoices(): SpeechSynthesisVoice[] {
  const all = getAvailableVoices();
  return all.filter(v => v.lang.toLowerCase().startsWith('de'));
}

/**
 * Returns a voice matching the requested agent's gender and profile
 */
export function getVoiceForAgent(agent: VoiceAgent): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const deVoices = getAvailableGermanVoices();
  const allVoices = getAvailableVoices();

  if (agent.gender === 'female') {
    // 1. Specific agent preferred match among German voices
    if (agent.id === 'emma') {
      // Emma: young, cheerful
      const emmaMatch = deVoices.find(v => {
        const n = v.name.toLowerCase();
        return ['maren', 'louisa', 'marlene', 'vicki', 'helena', 'sarah', 'sara', 'eva', 'claudia', 'leni'].some(p => n.includes(p));
      });
      if (emmaMatch) return emmaMatch;
    } else {
      // Frau Weber: clear teacher voice
      const weberMatch = deVoices.find(v => {
        const n = v.name.toLowerCase();
        return ['amira', 'katja', 'hedda', 'anna', 'petra', 'gudrun', 'elena', 'karin', 'monika'].some(p => n.includes(p));
      });
      if (weberMatch) return weberMatch;
    }

    // 2. Any voice matching general female German patterns (excluding male names and 'google deutsch')
    const anyFemale = deVoices.find(v => {
      const n = v.name.toLowerCase();
      return FEMALE_GERMAN_PATTERNS.some(p => n.includes(p)) && !MALE_GERMAN_PATTERNS.some(m => n.includes(m));
    });
    if (anyFemale) return anyFemale;

    // 3. Any German voice that does NOT contain male identifiers (excluding google deutsch)
    const nonMale = deVoices.find(v => {
      const n = v.name.toLowerCase();
      return !MALE_GERMAN_PATTERNS.some(m => n.includes(m));
    });
    if (nonMale) return nonMale;

    // 4. If system only has 'Google Deutsch' or male German voices, look for a multilingual female voice
    const multiFemale = allVoices.find(v => {
      const n = v.name.toLowerCase();
      return FEMALE_GERMAN_PATTERNS.some(p => n.includes(p)) && !MALE_GERMAN_PATTERNS.some(m => n.includes(m));
    });
    if (multiFemale) return multiFemale;

    // 5. Fallback to any German voice if available, else first system voice
    return deVoices[0] || allVoices[0] || null;
  } else {
    // Male agent
    if (agent.id === 'lukas') {
      // Lukas: younger boy
      const lukasMatch = deVoices.find(v => {
        const n = v.name.toLowerCase();
        return ['florian', 'killian', 'yannick', 'conrad', 'david', 'daniel', 'jonas', 'lukas'].some(p => n.includes(p));
      });
      if (lukasMatch) return lukasMatch;
    } else {
      // Herr Müller: mature deep male
      const muellerMatch = deVoices.find(v => {
        const n = v.name.toLowerCase();
        return ['stefan', 'martin', 'markus', 'hans', 'christoph', 'karsten', 'george', 'frank', 'viktor'].some(p => n.includes(p));
      });
      if (muellerMatch) return muellerMatch;
    }

    // 2. Any male German voice
    const anyMale = deVoices.find(v => {
      const n = v.name.toLowerCase();
      return MALE_GERMAN_PATTERNS.some(p => n.includes(p));
    });
    if (anyMale) return anyMale;

    // 3. Fallback to any German voice, else first system voice
    return deVoices[0] || allVoices[0] || null;
  }
}

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentOnEndCallback: (() => void) | null = null;
let fallbackActive = false;

// Stops audio/synthesis. `silent` suppresses the global speechEnded event so a
// new speakGerman() call does not instantly reset the play-button state of the caller.
function hardStop(silent: boolean) {
  fallbackActive = false;
  stopServerAudio(silent);
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch {}
  }
  currentUtterance = null;
}

/**
 * Stop any ongoing speech playback immediately (user-initiated).
 */
export function stopSpeaking() {
  if (typeof window === 'undefined') return;
  const cb = currentOnEndCallback;
  currentOnEndCallback = null;
  hardStop(true);
  if (cb) { try { cb(); } catch {} }
  window.dispatchEvent(new CustomEvent('speechEnded'));
}

/**
 * Returns descriptive info about the agent's neural voice.
 */
export function getAgentAssignedVoiceInfo(agent: VoiceAgent): {
  voiceName: string;
  isRealFemale: boolean;
  isRealMale: boolean;
  isNaturalOrLocal: boolean;
} {
  return {
    voiceName: `${agent.voice} · Gemini`,
    isRealFemale: agent.gender === 'female',
    isRealMale: agent.gender === 'male',
    isNaturalOrLocal: true,
  };
}

export function getPleasantFemaleVoice(): SpeechSynthesisVoice | null {
  return getVoiceForAgent(VOICE_AGENTS[0]);
}

/**
 * Returns human-readable name of currently active agent
 */
export function getActiveVoiceName(): string {
  const agent = getSelectedVoiceAgent();
  return `${agent.avatar} ${agent.name} (${agent.titleRu})`;
}

function finishSpeech() {
  const cb = currentOnEndCallback;
  currentOnEndCallback = null;
  hardStop(true);
  if (cb) { try { cb(); } catch {} }
  window.dispatchEvent(new CustomEvent('speechEnded'));
}

function speakFallback(cleanText: string, agent: VoiceAgent) {
  if (!('speechSynthesis' in window)) {
    finishSpeech();
    return;
  }
  fallbackActive = true;
  try {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = agent.rate;
    utterance.pitch = agent.pitch;
    utterance.volume = 0.8;
    utterance.onend = () => { if (fallbackActive) finishSpeech(); };
    utterance.onerror = () => { if (fallbackActive) finishSpeech(); };
    const matchedVoice = getVoiceForAgent(agent);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      if (matchedVoice.lang) utterance.lang = matchedVoice.lang;
    }
    currentUtterance = utterance;
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  } catch {
    finishSpeech();
  }
}

/**
 * Pronounce German text using the server-side Gemini neural voice for the
 * selected agent. Falls back to the browser SpeechSynthesis API if the
 * server is unavailable (no API key / network error).
 */
export function speakGerman(
  text: string,
  customAgentId?: VoiceAgentId,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined') return;

  const agent = customAgentId
    ? (VOICE_AGENTS.find(a => a.id === customAgentId) || getSelectedVoiceAgent())
    : getSelectedVoiceAgent();

  const cleanText = text.trim();

  hardStop(true);
  if (!cleanText) {
    onEnd?.();
    window.dispatchEvent(new CustomEvent('speechEnded'));
    return;
  }

  currentOnEndCallback = onEnd || null;
  const mySeq = ++speechSeq;
  window.dispatchEvent(new CustomEvent('speechStarted', { detail: { text: cleanText, agentId: agent.id } }));

  const controller = new AbortController();
  serverAbort = controller;

  fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: cleanText, agentId: agent.id }),
    signal: controller.signal,
  })
    .then(async resp => {
      if (!resp.ok) throw new Error(`TTS ${resp.status}`);
      const blob = await resp.blob();
      if (mySeq !== speechSeq) return; // superseded by a newer request
      const url = URL.createObjectURL(blob);
      serverAudioUrl = url;
      const audio = new Audio(url);
      audio.volume = 0.9;
      serverAudio = audio;
      audio.onended = () => { if (mySeq === speechSeq) finishSpeech(); };
      audio.onerror = () => { if (mySeq === speechSeq) speakFallback(cleanText, agent); };
      await audio.play().catch(() => { if (mySeq === speechSeq) speakFallback(cleanText, agent); });
    })
    .catch(() => {
      if (mySeq !== speechSeq) return; // aborted / superseded
      serverAbort = null;
      speakFallback(cleanText, agent);
    });
}

/**
 * Play an audition sample for a specific voice agent
 */
export function previewVoiceAgent(agentId: VoiceAgentId, onEnd?: () => void) {
  const agent = VOICE_AGENTS.find(a => a.id === agentId) || VOICE_AGENTS[0];
  speakGerman(agent.sampleText, agentId, onEnd);
}

/**
 * Legacy helper
 */
export function testFemaleVoice(onEnd?: () => void) {
  speakGerman('Hallo! Ich bin deine Deutschlehrerin. Wir lernen Deutsch mit Spaß und Quatsch! Alles ist super einfach!', undefined, onEnd);
}
