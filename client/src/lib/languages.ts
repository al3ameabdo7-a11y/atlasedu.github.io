export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  description: string;
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    color: 'from-blue-500 to-blue-600',
    description: 'The global language of business and technology',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    color: 'from-blue-400 to-red-400',
    description: 'The language of love, art, and cuisine',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    color: 'from-yellow-500 to-red-500',
    description: 'Spoken by 500+ million people worldwide',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    color: 'from-gray-800 to-yellow-500',
    description: 'The language of engineering and philosophy',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    color: 'from-green-600 to-green-800',
    description: 'Rich in history and spoken across 25 countries',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    color: 'from-green-500 to-red-500',
    description: 'The language of music, food, and fashion',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    color: 'from-red-500 to-pink-500',
    description: 'Unique writing systems and rich culture',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    color: 'from-red-600 to-yellow-500',
    description: 'The most spoken language in the world',
  },
];

export interface Lesson {
  id: string;
  languageCode: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'conversation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  content: LessonContent;
}

export interface LessonContent {
  vocabulary?: VocabularyItem[];
  grammar?: GrammarRule[];
  examples?: Example[];
  exercises: Exercise[];
}

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  audio?: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
}

export interface Example {
  original: string;
  translation: string;
  audio?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  xpReward: number;
}

export const lessonsByLanguage: Record<string, Lesson[]> = {
  en: [
    {
      id: 'en-basics-1',
      languageCode: 'en',
      title: 'Basic Greetings',
      description: 'Learn essential greetings and introductions',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Hello', translation: 'Hello', pronunciation: '/həˈloʊ/', example: 'Hello, how are you?' },
          { word: 'Goodbye', translation: 'Goodbye', pronunciation: '/ɡʊdˈbaɪ/', example: 'Goodbye, see you later!' },
          { word: 'Please', translation: 'Please', pronunciation: '/pliːz/', example: 'Please help me.' },
          { word: 'Thank you', translation: 'Thank you', pronunciation: '/θæŋk juː/', example: 'Thank you very much!' },
          { word: 'Sorry', translation: 'Sorry', pronunciation: '/ˈsɒri/', example: 'Sorry for being late.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What do you say when meeting someone?', options: ['Goodbye', 'Hello', 'Sorry', 'Please'], correctAnswer: 'Hello', xpReward: 2 },
          { id: 'ex2', type: 'fill-blank', question: '___ you for your help!', correctAnswer: 'Thank', xpReward: 2 },
          { id: 'ex3', type: 'true-false', question: '"Goodbye" is used when meeting someone.', correctAnswer: 'false', xpReward: 2 },
        ],
      },
    },
    {
      id: 'en-basics-2',
      languageCode: 'en',
      title: 'Numbers 1-10',
      description: 'Count from one to ten in English',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'One', translation: '1', pronunciation: '/wʌn/', example: 'I have one apple.' },
          { word: 'Two', translation: '2', pronunciation: '/tuː/', example: 'Two cups of coffee.' },
          { word: 'Three', translation: '3', pronunciation: '/θriː/', example: 'Three friends came.' },
          { word: 'Four', translation: '4', pronunciation: '/fɔːr/', example: 'Four seasons.' },
          { word: 'Five', translation: '5', pronunciation: '/faɪv/', example: 'Five fingers.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What comes after "two"?', options: ['One', 'Three', 'Four', 'Five'], correctAnswer: 'Three', xpReward: 2 },
          { id: 'ex2', type: 'matching', question: 'Match the numbers', options: ['One', 'Two', 'Three'], correctAnswer: ['1', '2', '3'], xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-grammar-1',
      languageCode: 'en',
      title: 'Present Simple',
      description: 'Learn to use present simple tense',
      type: 'grammar',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        grammar: [
          {
            title: 'Present Simple',
            explanation: 'Use present simple for habits, facts, and regular actions.',
            examples: ['I work every day.', 'She plays tennis.', 'The sun rises in the east.'],
          },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: 'She ___ to school every day.', correctAnswer: 'goes', xpReward: 3 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which is correct?', options: ['He work hard.', 'He works hard.', 'He working hard.'], correctAnswer: 'He works hard.', xpReward: 3 },
        ],
      },
    },
  ],
  fr: [
    {
      id: 'fr-basics-1',
      languageCode: 'fr',
      title: 'Salutations',
      description: 'Essential French greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Bonjour', translation: 'Hello/Good day', pronunciation: '/bɔ̃ʒuʁ/', example: 'Bonjour, comment ça va?' },
          { word: 'Au revoir', translation: 'Goodbye', pronunciation: '/o ʁəvwaʁ/', example: 'Au revoir, à bientôt!' },
          { word: 'Merci', translation: 'Thank you', pronunciation: '/mɛʁsi/', example: 'Merci beaucoup!' },
          { word: 'S\'il vous plaît', translation: 'Please', pronunciation: '/sil vu plɛ/', example: 'Un café, s\'il vous plaît.' },
          { word: 'Excusez-moi', translation: 'Excuse me', pronunciation: '/ɛkskyze mwa/', example: 'Excusez-moi, où est la gare?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in French?', options: ['Bonjour', 'Merci', 'Au revoir', 'Pardon'], correctAnswer: 'Merci', xpReward: 2 },
          { id: 'ex2', type: 'fill-blank', question: '___, comment ça va?', correctAnswer: 'Bonjour', xpReward: 2 },
        ],
      },
    },
    {
      id: 'fr-basics-2',
      languageCode: 'fr',
      title: 'Les Nombres',
      description: 'Count from 1 to 10 in French',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Un', translation: 'One', pronunciation: '/œ̃/', example: 'J\'ai un chat.' },
          { word: 'Deux', translation: 'Two', pronunciation: '/dø/', example: 'Deux cafés, s\'il vous plaît.' },
          { word: 'Trois', translation: 'Three', pronunciation: '/tʁwa/', example: 'Trois amis.' },
          { word: 'Quatre', translation: 'Four', pronunciation: '/katʁ/', example: 'Quatre saisons.' },
          { word: 'Cinq', translation: 'Five', pronunciation: '/sɛ̃k/', example: 'Cinq doigts.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in French?', options: ['Un', 'Deux', 'Trois', 'Quatre'], correctAnswer: 'Trois', xpReward: 2 },
        ],
      },
    },
  ],
  es: [
    {
      id: 'es-basics-1',
      languageCode: 'es',
      title: 'Saludos',
      description: 'Basic Spanish greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Hola', translation: 'Hello', pronunciation: '/ˈola/', example: '¡Hola! ¿Cómo estás?' },
          { word: 'Adiós', translation: 'Goodbye', pronunciation: '/aˈðjos/', example: 'Adiós, hasta mañana.' },
          { word: 'Gracias', translation: 'Thank you', pronunciation: '/ˈɡɾaθjas/', example: 'Muchas gracias.' },
          { word: 'Por favor', translation: 'Please', pronunciation: '/poɾ faˈβoɾ/', example: 'Un café, por favor.' },
          { word: 'Lo siento', translation: 'I\'m sorry', pronunciation: '/lo ˈsjento/', example: 'Lo siento mucho.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Hello" in Spanish?', options: ['Adiós', 'Gracias', 'Hola', 'Por favor'], correctAnswer: 'Hola', xpReward: 2 },
          { id: 'ex2', type: 'fill-blank', question: '¡___! ¿Cómo estás?', correctAnswer: 'Hola', xpReward: 2 },
        ],
      },
    },
  ],
  de: [
    {
      id: 'de-basics-1',
      languageCode: 'de',
      title: 'Begrüßungen',
      description: 'German greetings essentials',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Hallo', translation: 'Hello', pronunciation: '/ˈhalo/', example: 'Hallo, wie geht\'s?' },
          { word: 'Auf Wiedersehen', translation: 'Goodbye', pronunciation: '/aʊf ˈviːdɐzeːən/', example: 'Auf Wiedersehen!' },
          { word: 'Danke', translation: 'Thank you', pronunciation: '/ˈdaŋkə/', example: 'Danke schön!' },
          { word: 'Bitte', translation: 'Please/You\'re welcome', pronunciation: '/ˈbɪtə/', example: 'Bitte schön.' },
          { word: 'Entschuldigung', translation: 'Excuse me', pronunciation: '/ɛntˈʃʊldɪɡʊŋ/', example: 'Entschuldigung, wo ist der Bahnhof?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in German?', options: ['Hallo', 'Danke', 'Bitte', 'Tschüss'], correctAnswer: 'Danke', xpReward: 2 },
        ],
      },
    },
  ],
  ar: [
    {
      id: 'ar-basics-1',
      languageCode: 'ar',
      title: 'التحيات',
      description: 'Arabic greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'مرحبا', translation: 'Hello', pronunciation: '/marħaba/', example: 'مرحبا، كيف حالك؟' },
          { word: 'مع السلامة', translation: 'Goodbye', pronunciation: '/maʕa s-salama/', example: 'مع السلامة!' },
          { word: 'شكرا', translation: 'Thank you', pronunciation: '/ʃukran/', example: 'شكرا جزيلا!' },
          { word: 'من فضلك', translation: 'Please', pronunciation: '/min fadˤlak/', example: 'قهوة، من فضلك.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Arabic?', options: ['مرحبا', 'شكرا', 'مع السلامة', 'من فضلك'], correctAnswer: 'شكرا', xpReward: 2 },
        ],
      },
    },
  ],
  it: [
    {
      id: 'it-basics-1',
      languageCode: 'it',
      title: 'Saluti',
      description: 'Italian greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'Ciao', translation: 'Hello/Bye', pronunciation: '/ˈtʃaːo/', example: 'Ciao, come stai?' },
          { word: 'Buongiorno', translation: 'Good morning', pronunciation: '/ˌbwɔnˈdʒorno/', example: 'Buongiorno, signora!' },
          { word: 'Grazie', translation: 'Thank you', pronunciation: '/ˈɡrattsje/', example: 'Grazie mille!' },
          { word: 'Prego', translation: 'You\'re welcome', pronunciation: '/ˈpreːɡo/', example: 'Prego!' },
          { word: 'Scusi', translation: 'Excuse me', pronunciation: '/ˈskuːzi/', example: 'Scusi, dov\'è la stazione?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Italian?', options: ['Ciao', 'Grazie', 'Prego', 'Scusi'], correctAnswer: 'Grazie', xpReward: 2 },
        ],
      },
    },
  ],
  ja: [
    {
      id: 'ja-basics-1',
      languageCode: 'ja',
      title: '挨拶',
      description: 'Japanese greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: 'こんにちは', translation: 'Hello', pronunciation: '/konnichiwa/', example: 'こんにちは、お元気ですか?' },
          { word: 'さようなら', translation: 'Goodbye', pronunciation: '/sayounara/', example: 'さようなら!' },
          { word: 'ありがとう', translation: 'Thank you', pronunciation: '/arigatou/', example: 'ありがとうございます!' },
          { word: 'すみません', translation: 'Excuse me', pronunciation: '/sumimasen/', example: 'すみません、駅はどこですか?' },
          { word: 'おはよう', translation: 'Good morning', pronunciation: '/ohayou/', example: 'おはようございます!' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Japanese?', options: ['こんにちは', 'ありがとう', 'さようなら', 'すみません'], correctAnswer: 'ありがとう', xpReward: 2 },
        ],
      },
    },
  ],
  zh: [
    {
      id: 'zh-basics-1',
      languageCode: 'zh',
      title: '问候',
      description: 'Chinese greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 10,
      content: {
        vocabulary: [
          { word: '你好', translation: 'Hello', pronunciation: '/nǐ hǎo/', example: '你好，你好吗?' },
          { word: '再见', translation: 'Goodbye', pronunciation: '/zài jiàn/', example: '再见!' },
          { word: '谢谢', translation: 'Thank you', pronunciation: '/xiè xie/', example: '谢谢你!' },
          { word: '请', translation: 'Please', pronunciation: '/qǐng/', example: '请问，洗手间在哪里?' },
          { word: '对不起', translation: 'Sorry', pronunciation: '/duì bu qǐ/', example: '对不起，我迟到了。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Hello" in Chinese?', options: ['再见', '谢谢', '你好', '请'], correctAnswer: '你好', xpReward: 2 },
        ],
      },
    },
  ],
};

export function getLessonsForLanguage(code: string): Lesson[] {
  return lessonsByLanguage[code] || [];
}

export function getLesson(lessonId: string): Lesson | undefined {
  for (const lessons of Object.values(lessonsByLanguage)) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getLanguage(code: string): Language | undefined {
  return languages.find(l => l.code === code);
}
