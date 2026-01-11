export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  description: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', color: 'from-blue-500 to-blue-600', description: 'The global language of business and technology' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', color: 'from-blue-400 to-red-400', description: 'The language of love, art, and cuisine' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', color: 'from-yellow-500 to-red-500', description: 'Spoken by 500+ million people worldwide' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', color: 'from-gray-800 to-yellow-500', description: 'The language of engineering and philosophy' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', color: 'from-green-600 to-green-800', description: 'Rich in history and spoken across 25 countries' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', color: 'from-green-500 to-red-500', description: 'The language of music, food, and fashion' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', color: 'from-red-500 to-pink-500', description: 'Unique writing systems and rich culture' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', color: 'from-red-600 to-yellow-500', description: 'The most spoken language in the world' },
];

export interface Lesson {
  id: string;
  languageCode: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'conversation' | 'pronunciation';
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
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
}

export interface Example {
  original: string;
  translation: string;
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
      id: 'en-vocab-greetings',
      languageCode: 'en',
      title: 'Basic Greetings',
      description: 'Learn essential greetings and introductions',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Hello', translation: 'مرحبا', pronunciation: '/həˈloʊ/', example: 'Hello, how are you?' },
          { word: 'Good morning', translation: 'صباح الخير', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', example: 'Good morning, everyone!' },
          { word: 'Good evening', translation: 'مساء الخير', pronunciation: '/ɡʊd ˈiːvnɪŋ/', example: 'Good evening, sir.' },
          { word: 'Goodbye', translation: 'وداعا', pronunciation: '/ɡʊdˈbaɪ/', example: 'Goodbye, see you later!' },
          { word: 'Please', translation: 'من فضلك', pronunciation: '/pliːz/', example: 'Please help me.' },
          { word: 'Thank you', translation: 'شكرا لك', pronunciation: '/θæŋk juː/', example: 'Thank you very much!' },
          { word: 'You are welcome', translation: 'عفوا', pronunciation: '/jʊər ˈwelkəm/', example: 'You are welcome!' },
          { word: 'Sorry', translation: 'آسف', pronunciation: '/ˈsɒri/', example: 'Sorry for being late.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What do you say when meeting someone?', options: ['Goodbye', 'Hello', 'Sorry', 'Please'], correctAnswer: 'Hello', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: '___ you for your help!', correctAnswer: 'Thank', xpReward: 3 },
          { id: 'ex3', type: 'true-false', question: '"Goodbye" is used when meeting someone.', correctAnswer: 'false', xpReward: 3 },
          { id: 'ex4', type: 'multiple-choice', question: 'What do you say in the morning?', options: ['Good evening', 'Good night', 'Good morning', 'Goodbye'], correctAnswer: 'Good morning', xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-vocab-numbers',
      languageCode: 'en',
      title: 'Numbers 1-20',
      description: 'Count from one to twenty in English',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'One', translation: '1 - واحد', pronunciation: '/wʌn/', example: 'I have one apple.' },
          { word: 'Two', translation: '2 - اثنان', pronunciation: '/tuː/', example: 'Two cups of coffee.' },
          { word: 'Three', translation: '3 - ثلاثة', pronunciation: '/θriː/', example: 'Three friends came.' },
          { word: 'Four', translation: '4 - أربعة', pronunciation: '/fɔːr/', example: 'Four seasons.' },
          { word: 'Five', translation: '5 - خمسة', pronunciation: '/faɪv/', example: 'Five fingers.' },
          { word: 'Ten', translation: '10 - عشرة', pronunciation: '/ten/', example: 'Ten students.' },
          { word: 'Fifteen', translation: '15 - خمسة عشر', pronunciation: '/fɪfˈtiːn/', example: 'Fifteen minutes.' },
          { word: 'Twenty', translation: '20 - عشرون', pronunciation: '/ˈtwenti/', example: 'Twenty years old.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What comes after "two"?', options: ['One', 'Three', 'Four', 'Five'], correctAnswer: 'Three', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'I have ___ apples. (5)', correctAnswer: 'five', xpReward: 3 },
          { id: 'ex3', type: 'multiple-choice', question: 'Which number is "fifteen"?', options: ['5', '10', '15', '20'], correctAnswer: '15', xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-vocab-colors',
      languageCode: 'en',
      title: 'Colors',
      description: 'Learn the names of colors',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Red', translation: 'أحمر', pronunciation: '/red/', example: 'The apple is red.' },
          { word: 'Blue', translation: 'أزرق', pronunciation: '/bluː/', example: 'The sky is blue.' },
          { word: 'Green', translation: 'أخضر', pronunciation: '/ɡriːn/', example: 'The grass is green.' },
          { word: 'Yellow', translation: 'أصفر', pronunciation: '/ˈjeloʊ/', example: 'The sun is yellow.' },
          { word: 'Black', translation: 'أسود', pronunciation: '/blæk/', example: 'My car is black.' },
          { word: 'White', translation: 'أبيض', pronunciation: '/waɪt/', example: 'Snow is white.' },
          { word: 'Orange', translation: 'برتقالي', pronunciation: '/ˈɒrɪndʒ/', example: 'Oranges are orange.' },
          { word: 'Purple', translation: 'بنفسجي', pronunciation: '/ˈpɜːrpl/', example: 'Grapes can be purple.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What color is the sky?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 'Blue', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'The grass is ___.', correctAnswer: 'green', xpReward: 3 },
          { id: 'ex3', type: 'true-false', question: 'Snow is black.', correctAnswer: 'false', xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-vocab-family',
      languageCode: 'en',
      title: 'Family Members',
      description: 'Learn vocabulary for family relationships',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Mother', translation: 'أم', pronunciation: '/ˈmʌðər/', example: 'My mother is kind.' },
          { word: 'Father', translation: 'أب', pronunciation: '/ˈfɑːðər/', example: 'My father works hard.' },
          { word: 'Sister', translation: 'أخت', pronunciation: '/ˈsɪstər/', example: 'I have one sister.' },
          { word: 'Brother', translation: 'أخ', pronunciation: '/ˈbrʌðər/', example: 'My brother is tall.' },
          { word: 'Grandmother', translation: 'جدة', pronunciation: '/ˈɡrænmʌðər/', example: 'My grandmother cooks well.' },
          { word: 'Grandfather', translation: 'جد', pronunciation: '/ˈɡrænfɑːðər/', example: 'Grandfather tells stories.' },
          { word: 'Son', translation: 'ابن', pronunciation: '/sʌn/', example: 'He is my son.' },
          { word: 'Daughter', translation: 'ابنة', pronunciation: '/ˈdɔːtər/', example: 'She is my daughter.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'Who is your mother\'s mother?', options: ['Sister', 'Grandmother', 'Aunt', 'Daughter'], correctAnswer: 'Grandmother', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'My ___ is my parent.', correctAnswer: 'father', xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-vocab-food',
      languageCode: 'en',
      title: 'Food & Drinks',
      description: 'Common food and beverage vocabulary',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Water', translation: 'ماء', pronunciation: '/ˈwɔːtər/', example: 'I drink water every day.' },
          { word: 'Bread', translation: 'خبز', pronunciation: '/bred/', example: 'I eat bread for breakfast.' },
          { word: 'Rice', translation: 'أرز', pronunciation: '/raɪs/', example: 'Rice is delicious.' },
          { word: 'Chicken', translation: 'دجاج', pronunciation: '/ˈtʃɪkɪn/', example: 'I like grilled chicken.' },
          { word: 'Fish', translation: 'سمك', pronunciation: '/fɪʃ/', example: 'Fish is healthy.' },
          { word: 'Coffee', translation: 'قهوة', pronunciation: '/ˈkɒfi/', example: 'I drink coffee in the morning.' },
          { word: 'Tea', translation: 'شاي', pronunciation: '/tiː/', example: 'Would you like some tea?' },
          { word: 'Milk', translation: 'حليب', pronunciation: '/mɪlk/', example: 'Children drink milk.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What do you drink in the morning?', options: ['Rice', 'Bread', 'Coffee', 'Chicken'], correctAnswer: 'Coffee', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'I drink ___ every day.', correctAnswer: 'water', xpReward: 3 },
        ],
      },
    },
    {
      id: 'en-grammar-present',
      languageCode: 'en',
      title: 'Present Simple Tense',
      description: 'Learn to use present simple tense',
      type: 'grammar',
      difficulty: 'beginner',
      xpReward: 20,
      content: {
        grammar: [
          { title: 'Present Simple', explanation: 'Use present simple for habits, facts, and regular actions. Add -s/-es for he/she/it.', examples: ['I work every day.', 'She plays tennis.', 'The sun rises in the east.', 'He goes to school.'] },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: 'She ___ to school every day. (go)', correctAnswer: 'goes', xpReward: 4 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which is correct?', options: ['He work hard.', 'He works hard.', 'He working hard.'], correctAnswer: 'He works hard.', xpReward: 4 },
          { id: 'ex3', type: 'fill-blank', question: 'They ___ English. (speak)', correctAnswer: 'speak', xpReward: 4 },
          { id: 'ex4', type: 'true-false', question: '"She play football" is grammatically correct.', correctAnswer: 'false', xpReward: 4 },
        ],
      },
    },
    {
      id: 'en-grammar-past',
      languageCode: 'en',
      title: 'Past Simple Tense',
      description: 'Learn to talk about past events',
      type: 'grammar',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        grammar: [
          { title: 'Past Simple', explanation: 'Use past simple for completed actions in the past. Regular verbs add -ed.', examples: ['I walked to school yesterday.', 'She visited Paris last year.', 'They played football.', 'He studied hard.'] },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: 'Yesterday, I ___ to the store. (walk)', correctAnswer: 'walked', xpReward: 4 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which is correct?', options: ['She go yesterday.', 'She went yesterday.', 'She goed yesterday.'], correctAnswer: 'She went yesterday.', xpReward: 4 },
          { id: 'ex3', type: 'fill-blank', question: 'They ___ a movie last night. (watch)', correctAnswer: 'watched', xpReward: 4 },
        ],
      },
    },
    {
      id: 'en-conv-restaurant',
      languageCode: 'en',
      title: 'At the Restaurant',
      description: 'Learn conversations for ordering food',
      type: 'conversation',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        examples: [
          { original: 'Can I see the menu, please?', translation: 'هل يمكنني رؤية القائمة من فضلك؟' },
          { original: 'I would like to order...', translation: 'أود أن أطلب...' },
          { original: 'What do you recommend?', translation: 'ماذا تنصح؟' },
          { original: 'The bill, please.', translation: 'الفاتورة من فضلك.' },
          { original: 'Is service included?', translation: 'هل الخدمة مشمولة؟' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you ask for the menu?', options: ['Give me food!', 'Can I see the menu, please?', 'I want to eat!', 'Food now!'], correctAnswer: 'Can I see the menu, please?', xpReward: 4 },
          { id: 'ex2', type: 'fill-blank', question: 'I would like to ___ the steak.', correctAnswer: 'order', xpReward: 4 },
        ],
      },
    },
    {
      id: 'en-conv-shopping',
      languageCode: 'en',
      title: 'Shopping Conversations',
      description: 'Learn how to shop in English',
      type: 'conversation',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        examples: [
          { original: 'How much does this cost?', translation: 'كم يكلف هذا؟' },
          { original: 'Do you have this in a different size?', translation: 'هل لديك هذا بمقاس مختلف؟' },
          { original: 'Can I try this on?', translation: 'هل يمكنني تجربة هذا؟' },
          { original: 'I will take it.', translation: 'سآخذه.' },
          { original: 'Do you accept credit cards?', translation: 'هل تقبلون بطاقات الائتمان؟' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you ask about the price?', options: ['How much does this cost?', 'Give me price!', 'Money?', 'Price it!'], correctAnswer: 'How much does this cost?', xpReward: 4 },
          { id: 'ex2', type: 'fill-blank', question: 'Can I ___ this on?', correctAnswer: 'try', xpReward: 4 },
        ],
      },
    },
    {
      id: 'en-pron-vowels',
      languageCode: 'en',
      title: 'Vowel Sounds',
      description: 'Master English vowel pronunciation',
      type: 'pronunciation',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'cat', translation: 'قطة', pronunciation: '/kæt/', example: 'Short a sound' },
          { word: 'bed', translation: 'سرير', pronunciation: '/bed/', example: 'Short e sound' },
          { word: 'sit', translation: 'اجلس', pronunciation: '/sɪt/', example: 'Short i sound' },
          { word: 'hot', translation: 'حار', pronunciation: '/hɒt/', example: 'Short o sound' },
          { word: 'cup', translation: 'كوب', pronunciation: '/kʌp/', example: 'Short u sound' },
          { word: 'cake', translation: 'كعكة', pronunciation: '/keɪk/', example: 'Long a sound' },
          { word: 'feet', translation: 'أقدام', pronunciation: '/fiːt/', example: 'Long e sound' },
          { word: 'like', translation: 'مثل', pronunciation: '/laɪk/', example: 'Long i sound' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'Which word has a long "a" sound?', options: ['cat', 'cake', 'cap', 'can'], correctAnswer: 'cake', xpReward: 3 },
          { id: 'ex2', type: 'true-false', question: '"Bed" and "bad" have the same vowel sound.', correctAnswer: 'false', xpReward: 3 },
        ],
      },
    },
  ],
  fr: [
    {
      id: 'fr-vocab-greetings',
      languageCode: 'fr',
      title: 'Salutations',
      description: 'Essential French greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Bonjour', translation: 'Hello/Good day', pronunciation: '/bɔ̃ʒuʁ/', example: 'Bonjour, comment ça va?' },
          { word: 'Bonsoir', translation: 'Good evening', pronunciation: '/bɔ̃swaʁ/', example: 'Bonsoir, madame.' },
          { word: 'Au revoir', translation: 'Goodbye', pronunciation: '/o ʁəvwaʁ/', example: 'Au revoir, à bientôt!' },
          { word: 'Merci', translation: 'Thank you', pronunciation: '/mɛʁsi/', example: 'Merci beaucoup!' },
          { word: 'Merci beaucoup', translation: 'Thank you very much', pronunciation: '/mɛʁsi boku/', example: 'Merci beaucoup pour votre aide.' },
          { word: "S'il vous plaît", translation: 'Please', pronunciation: '/sil vu plɛ/', example: 'Un café, s\'il vous plaît.' },
          { word: 'Excusez-moi', translation: 'Excuse me', pronunciation: '/ɛkskyze mwa/', example: 'Excusez-moi, où est la gare?' },
          { word: 'De rien', translation: "You're welcome", pronunciation: '/də ʁjɛ̃/', example: 'De rien!' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in French?', options: ['Bonjour', 'Merci', 'Au revoir', 'Pardon'], correctAnswer: 'Merci', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: '___, comment ça va?', correctAnswer: 'Bonjour', xpReward: 3 },
          { id: 'ex3', type: 'multiple-choice', question: 'What does "Au revoir" mean?', options: ['Hello', 'Please', 'Goodbye', 'Thank you'], correctAnswer: 'Goodbye', xpReward: 3 },
        ],
      },
    },
    {
      id: 'fr-vocab-numbers',
      languageCode: 'fr',
      title: 'Les Nombres',
      description: 'Count from 1 to 20 in French',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Un', translation: 'One', pronunciation: '/œ̃/', example: "J'ai un chat." },
          { word: 'Deux', translation: 'Two', pronunciation: '/dø/', example: "Deux cafés, s'il vous plaît." },
          { word: 'Trois', translation: 'Three', pronunciation: '/tʁwa/', example: 'Trois amis.' },
          { word: 'Quatre', translation: 'Four', pronunciation: '/katʁ/', example: 'Quatre saisons.' },
          { word: 'Cinq', translation: 'Five', pronunciation: '/sɛ̃k/', example: 'Cinq doigts.' },
          { word: 'Dix', translation: 'Ten', pronunciation: '/dis/', example: 'Dix euros.' },
          { word: 'Quinze', translation: 'Fifteen', pronunciation: '/kɛ̃z/', example: 'Quinze minutes.' },
          { word: 'Vingt', translation: 'Twenty', pronunciation: '/vɛ̃/', example: 'Vingt ans.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in French?', options: ['Un', 'Deux', 'Trois', 'Quatre'], correctAnswer: 'Trois', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: "___ cafés, s'il vous plaît. (2)", correctAnswer: 'Deux', xpReward: 3 },
        ],
      },
    },
    {
      id: 'fr-vocab-colors',
      languageCode: 'fr',
      title: 'Les Couleurs',
      description: 'Learn colors in French',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Rouge', translation: 'Red', pronunciation: '/ʁuʒ/', example: 'La pomme est rouge.' },
          { word: 'Bleu', translation: 'Blue', pronunciation: '/blø/', example: 'Le ciel est bleu.' },
          { word: 'Vert', translation: 'Green', pronunciation: '/vɛʁ/', example: "L'herbe est verte." },
          { word: 'Jaune', translation: 'Yellow', pronunciation: '/ʒon/', example: 'Le soleil est jaune.' },
          { word: 'Noir', translation: 'Black', pronunciation: '/nwaʁ/', example: 'Le chat est noir.' },
          { word: 'Blanc', translation: 'White', pronunciation: '/blɑ̃/', example: 'La neige est blanche.' },
          { word: 'Orange', translation: 'Orange', pronunciation: '/ɔʁɑ̃ʒ/', example: "L'orange est orange." },
          { word: 'Rose', translation: 'Pink', pronunciation: '/ʁoz/', example: 'La fleur est rose.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What color is "le ciel" (the sky)?', options: ['Rouge', 'Vert', 'Bleu', 'Jaune'], correctAnswer: 'Bleu', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'La pomme est ___.', correctAnswer: 'rouge', xpReward: 3 },
        ],
      },
    },
    {
      id: 'fr-vocab-family',
      languageCode: 'fr',
      title: 'La Famille',
      description: 'Family vocabulary in French',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'La mère', translation: 'Mother', pronunciation: '/la mɛʁ/', example: 'Ma mère est gentille.' },
          { word: 'Le père', translation: 'Father', pronunciation: '/lə pɛʁ/', example: 'Mon père travaille.' },
          { word: 'La sœur', translation: 'Sister', pronunciation: '/la sœʁ/', example: "J'ai une sœur." },
          { word: 'Le frère', translation: 'Brother', pronunciation: '/lə fʁɛʁ/', example: 'Mon frère est grand.' },
          { word: 'La grand-mère', translation: 'Grandmother', pronunciation: '/la ɡʁɑ̃ mɛʁ/', example: 'Ma grand-mère cuisine bien.' },
          { word: 'Le grand-père', translation: 'Grandfather', pronunciation: '/lə ɡʁɑ̃ pɛʁ/', example: 'Mon grand-père raconte des histoires.' },
          { word: 'Le fils', translation: 'Son', pronunciation: '/lə fis/', example: 'C\'est mon fils.' },
          { word: 'La fille', translation: 'Daughter', pronunciation: '/la fij/', example: 'C\'est ma fille.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "mother" in French?', options: ['Le père', 'La mère', 'La sœur', 'Le frère'], correctAnswer: 'La mère', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Mon ___ est grand. (brother)', correctAnswer: 'frère', xpReward: 3 },
        ],
      },
    },
    {
      id: 'fr-vocab-food',
      languageCode: 'fr',
      title: 'La Nourriture',
      description: 'Food vocabulary in French',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: "L'eau", translation: 'Water', pronunciation: '/lo/', example: 'Je bois de l\'eau.' },
          { word: 'Le pain', translation: 'Bread', pronunciation: '/lə pɛ̃/', example: 'Je mange du pain.' },
          { word: 'Le fromage', translation: 'Cheese', pronunciation: '/lə fʁɔmaʒ/', example: 'Le fromage français est délicieux.' },
          { word: 'Le vin', translation: 'Wine', pronunciation: '/lə vɛ̃/', example: 'Un verre de vin rouge.' },
          { word: 'Le café', translation: 'Coffee', pronunciation: '/lə kafe/', example: 'Un café, s\'il vous plaît.' },
          { word: 'Le croissant', translation: 'Croissant', pronunciation: '/lə kʁwasɑ̃/', example: 'Un croissant au beurre.' },
          { word: 'La baguette', translation: 'Baguette', pronunciation: '/la baɡɛt/', example: 'Une baguette, s\'il vous plaît.' },
          { word: 'Le poulet', translation: 'Chicken', pronunciation: '/lə pulɛ/', example: 'Le poulet rôti.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "bread" in French?', options: ['Le fromage', 'Le pain', 'Le vin', 'Le café'], correctAnswer: 'Le pain', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Un ___, s\'il vous plaît. (coffee)', correctAnswer: 'café', xpReward: 3 },
        ],
      },
    },
    {
      id: 'fr-grammar-articles',
      languageCode: 'fr',
      title: 'Articles Définis et Indéfinis',
      description: 'Learn French articles',
      type: 'grammar',
      difficulty: 'beginner',
      xpReward: 20,
      content: {
        grammar: [
          { title: 'Definite Articles', explanation: 'Le (masc.), La (fem.), Les (plural) = The', examples: ['Le livre (the book)', 'La table (the table)', 'Les enfants (the children)'] },
          { title: 'Indefinite Articles', explanation: 'Un (masc.), Une (fem.), Des (plural) = A/An/Some', examples: ['Un chat (a cat)', 'Une maison (a house)', 'Des livres (some books)'] },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: '___ chat est noir. (The)', correctAnswer: 'Le', xpReward: 4 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which is correct for "a house"?', options: ['Le maison', 'La maison', 'Un maison', 'Une maison'], correctAnswer: 'Une maison', xpReward: 4 },
        ],
      },
    },
    {
      id: 'fr-conv-cafe',
      languageCode: 'fr',
      title: 'Au Café',
      description: 'Ordering at a French café',
      type: 'conversation',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        examples: [
          { original: 'Un café, s\'il vous plaît.', translation: 'A coffee, please.' },
          { original: 'L\'addition, s\'il vous plaît.', translation: 'The bill, please.' },
          { original: 'Qu\'est-ce que vous avez?', translation: 'What do you have?' },
          { original: 'Je voudrais un croissant.', translation: 'I would like a croissant.' },
          { original: 'C\'est combien?', translation: 'How much is it?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you ask for the bill?', options: ['Un café', 'L\'addition, s\'il vous plaît', 'Merci', 'Au revoir'], correctAnswer: 'L\'addition, s\'il vous plaît', xpReward: 4 },
          { id: 'ex2', type: 'fill-blank', question: 'Je ___ un croissant.', correctAnswer: 'voudrais', xpReward: 4 },
        ],
      },
    },
  ],
  es: [
    {
      id: 'es-vocab-greetings',
      languageCode: 'es',
      title: 'Saludos',
      description: 'Basic Spanish greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Hola', translation: 'Hello', pronunciation: '/ˈola/', example: '¡Hola! ¿Cómo estás?' },
          { word: 'Buenos días', translation: 'Good morning', pronunciation: '/ˈbwenos ˈdias/', example: 'Buenos días, señor.' },
          { word: 'Buenas tardes', translation: 'Good afternoon', pronunciation: '/ˈbwenas ˈtaɾðes/', example: 'Buenas tardes a todos.' },
          { word: 'Buenas noches', translation: 'Good evening/night', pronunciation: '/ˈbwenas ˈnotʃes/', example: 'Buenas noches.' },
          { word: 'Adiós', translation: 'Goodbye', pronunciation: '/aˈðjos/', example: 'Adiós, hasta mañana.' },
          { word: 'Gracias', translation: 'Thank you', pronunciation: '/ˈɡɾaθjas/', example: 'Muchas gracias.' },
          { word: 'Por favor', translation: 'Please', pronunciation: '/poɾ faˈβoɾ/', example: 'Un café, por favor.' },
          { word: 'Lo siento', translation: "I'm sorry", pronunciation: '/lo ˈsjento/', example: 'Lo siento mucho.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Hello" in Spanish?', options: ['Adiós', 'Gracias', 'Hola', 'Por favor'], correctAnswer: 'Hola', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: '¡___! ¿Cómo estás?', correctAnswer: 'Hola', xpReward: 3 },
          { id: 'ex3', type: 'multiple-choice', question: 'What does "Gracias" mean?', options: ['Please', 'Goodbye', 'Hello', 'Thank you'], correctAnswer: 'Thank you', xpReward: 3 },
        ],
      },
    },
    {
      id: 'es-vocab-numbers',
      languageCode: 'es',
      title: 'Los Números',
      description: 'Numbers in Spanish',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Uno', translation: 'One', pronunciation: '/ˈuno/', example: 'Tengo uno.' },
          { word: 'Dos', translation: 'Two', pronunciation: '/dos/', example: 'Dos cervezas, por favor.' },
          { word: 'Tres', translation: 'Three', pronunciation: '/tɾes/', example: 'Tres amigos.' },
          { word: 'Cuatro', translation: 'Four', pronunciation: '/ˈkwatɾo/', example: 'Cuatro estaciones.' },
          { word: 'Cinco', translation: 'Five', pronunciation: '/ˈθiŋko/', example: 'Cinco dedos.' },
          { word: 'Diez', translation: 'Ten', pronunciation: '/djeθ/', example: 'Diez euros.' },
          { word: 'Veinte', translation: 'Twenty', pronunciation: '/ˈbeinte/', example: 'Veinte años.' },
          { word: 'Cien', translation: 'One hundred', pronunciation: '/θjen/', example: 'Cien personas.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "five" in Spanish?', options: ['Uno', 'Dos', 'Cinco', 'Diez'], correctAnswer: 'Cinco', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: '___ cervezas, por favor. (2)', correctAnswer: 'Dos', xpReward: 3 },
        ],
      },
    },
    {
      id: 'es-vocab-colors',
      languageCode: 'es',
      title: 'Los Colores',
      description: 'Colors in Spanish',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Rojo', translation: 'Red', pronunciation: '/ˈroxo/', example: 'El tomate es rojo.' },
          { word: 'Azul', translation: 'Blue', pronunciation: '/aˈθul/', example: 'El cielo es azul.' },
          { word: 'Verde', translation: 'Green', pronunciation: '/ˈbeɾðe/', example: 'La hierba es verde.' },
          { word: 'Amarillo', translation: 'Yellow', pronunciation: '/amaˈɾiʎo/', example: 'El sol es amarillo.' },
          { word: 'Negro', translation: 'Black', pronunciation: '/ˈneɣɾo/', example: 'El gato es negro.' },
          { word: 'Blanco', translation: 'White', pronunciation: '/ˈblaŋko/', example: 'La nieve es blanca.' },
          { word: 'Naranja', translation: 'Orange', pronunciation: '/naˈɾaŋxa/', example: 'La naranja es naranja.' },
          { word: 'Morado', translation: 'Purple', pronunciation: '/moˈɾaðo/', example: 'Las uvas son moradas.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What color is "el cielo" (the sky)?', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], correctAnswer: 'Azul', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'El tomate es ___.', correctAnswer: 'rojo', xpReward: 3 },
        ],
      },
    },
    {
      id: 'es-vocab-family',
      languageCode: 'es',
      title: 'La Familia',
      description: 'Family in Spanish',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'La madre', translation: 'Mother', pronunciation: '/la ˈmaðɾe/', example: 'Mi madre es amable.' },
          { word: 'El padre', translation: 'Father', pronunciation: '/el ˈpaðɾe/', example: 'Mi padre trabaja mucho.' },
          { word: 'La hermana', translation: 'Sister', pronunciation: '/la eɾˈmana/', example: 'Tengo una hermana.' },
          { word: 'El hermano', translation: 'Brother', pronunciation: '/el eɾˈmano/', example: 'Mi hermano es alto.' },
          { word: 'La abuela', translation: 'Grandmother', pronunciation: '/la aˈbwela/', example: 'Mi abuela cocina bien.' },
          { word: 'El abuelo', translation: 'Grandfather', pronunciation: '/el aˈbwelo/', example: 'Mi abuelo cuenta historias.' },
          { word: 'El hijo', translation: 'Son', pronunciation: '/el ˈixo/', example: 'Es mi hijo.' },
          { word: 'La hija', translation: 'Daughter', pronunciation: '/la ˈixa/', example: 'Es mi hija.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "mother" in Spanish?', options: ['El padre', 'La madre', 'La hermana', 'El hermano'], correctAnswer: 'La madre', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Mi ___ es alto. (brother)', correctAnswer: 'hermano', xpReward: 3 },
        ],
      },
    },
    {
      id: 'es-grammar-ser-estar',
      languageCode: 'es',
      title: 'Ser vs Estar',
      description: 'Learn the two verbs for "to be"',
      type: 'grammar',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        grammar: [
          { title: 'Ser', explanation: 'Use SER for permanent characteristics, origin, profession, time.', examples: ['Soy español. (I am Spanish)', 'Es profesor. (He is a teacher)', 'Son las tres. (It is 3 o\'clock)'] },
          { title: 'Estar', explanation: 'Use ESTAR for location, temporary states, emotions.', examples: ['Estoy en casa. (I am at home)', 'Estoy cansado. (I am tired)', 'El café está caliente. (The coffee is hot)'] },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: 'Yo ___ español. (I am Spanish)', correctAnswer: 'soy', xpReward: 4 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which verb for "I am tired"?', options: ['Soy cansado', 'Estoy cansado', 'Es cansado'], correctAnswer: 'Estoy cansado', xpReward: 4 },
        ],
      },
    },
    {
      id: 'es-conv-restaurant',
      languageCode: 'es',
      title: 'En el Restaurante',
      description: 'Restaurant conversations in Spanish',
      type: 'conversation',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        examples: [
          { original: '¿Me puede traer el menú?', translation: 'Can you bring me the menu?' },
          { original: 'Quisiera pedir...', translation: 'I would like to order...' },
          { original: '¿Qué me recomienda?', translation: 'What do you recommend?' },
          { original: 'La cuenta, por favor.', translation: 'The bill, please.' },
          { original: '¿Está incluida la propina?', translation: 'Is the tip included?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you ask for the bill?', options: ['El menú', 'La cuenta, por favor', 'Gracias', 'Adiós'], correctAnswer: 'La cuenta, por favor', xpReward: 4 },
          { id: 'ex2', type: 'fill-blank', question: '¿Me puede traer el ___?', correctAnswer: 'menú', xpReward: 4 },
        ],
      },
    },
  ],
  de: [
    {
      id: 'de-vocab-greetings',
      languageCode: 'de',
      title: 'Begrüßungen',
      description: 'German greetings essentials',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Hallo', translation: 'Hello', pronunciation: '/ˈhalo/', example: "Hallo, wie geht's?" },
          { word: 'Guten Morgen', translation: 'Good morning', pronunciation: '/ˈɡuːtn̩ ˈmɔʁɡn̩/', example: 'Guten Morgen!' },
          { word: 'Guten Tag', translation: 'Good day', pronunciation: '/ˈɡuːtn̩ taːk/', example: 'Guten Tag, Herr Müller.' },
          { word: 'Guten Abend', translation: 'Good evening', pronunciation: '/ˈɡuːtn̩ ˈaːbn̩t/', example: 'Guten Abend!' },
          { word: 'Auf Wiedersehen', translation: 'Goodbye', pronunciation: '/aʊf ˈviːdɐzeːən/', example: 'Auf Wiedersehen!' },
          { word: 'Tschüss', translation: 'Bye (informal)', pronunciation: '/tʃʏs/', example: 'Tschüss!' },
          { word: 'Danke', translation: 'Thank you', pronunciation: '/ˈdaŋkə/', example: 'Danke schön!' },
          { word: 'Bitte', translation: 'Please/You\'re welcome', pronunciation: '/ˈbɪtə/', example: 'Bitte schön.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in German?', options: ['Hallo', 'Danke', 'Bitte', 'Tschüss'], correctAnswer: 'Danke', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Guten ___, Herr Müller. (day)', correctAnswer: 'Tag', xpReward: 3 },
        ],
      },
    },
    {
      id: 'de-vocab-numbers',
      languageCode: 'de',
      title: 'Die Zahlen',
      description: 'Numbers in German',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Eins', translation: 'One', pronunciation: '/aɪns/', example: 'Ich habe eins.' },
          { word: 'Zwei', translation: 'Two', pronunciation: '/tsvaɪ/', example: 'Zwei Kaffee, bitte.' },
          { word: 'Drei', translation: 'Three', pronunciation: '/dʁaɪ/', example: 'Drei Freunde.' },
          { word: 'Vier', translation: 'Four', pronunciation: '/fiːɐ/', example: 'Vier Jahreszeiten.' },
          { word: 'Fünf', translation: 'Five', pronunciation: '/fʏnf/', example: 'Fünf Finger.' },
          { word: 'Zehn', translation: 'Ten', pronunciation: '/tseːn/', example: 'Zehn Euro.' },
          { word: 'Zwanzig', translation: 'Twenty', pronunciation: '/ˈtsvantsɪç/', example: 'Zwanzig Jahre alt.' },
          { word: 'Hundert', translation: 'Hundred', pronunciation: '/ˈhʊndɐt/', example: 'Hundert Prozent.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in German?', options: ['Eins', 'Zwei', 'Drei', 'Vier'], correctAnswer: 'Drei', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: '___ Kaffee, bitte. (2)', correctAnswer: 'Zwei', xpReward: 3 },
        ],
      },
    },
    {
      id: 'de-vocab-food',
      languageCode: 'de',
      title: 'Essen und Trinken',
      description: 'Food and drinks in German',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Das Wasser', translation: 'Water', pronunciation: '/das ˈvasɐ/', example: 'Ich trinke Wasser.' },
          { word: 'Das Brot', translation: 'Bread', pronunciation: '/das bʁoːt/', example: 'Ich esse Brot.' },
          { word: 'Das Bier', translation: 'Beer', pronunciation: '/das biːɐ/', example: 'Ein Bier, bitte.' },
          { word: 'Der Kaffee', translation: 'Coffee', pronunciation: '/deːɐ ˈkafe/', example: 'Einen Kaffee, bitte.' },
          { word: 'Die Wurst', translation: 'Sausage', pronunciation: '/diː vʊʁst/', example: 'Deutsche Wurst ist lecker.' },
          { word: 'Der Kuchen', translation: 'Cake', pronunciation: '/deːɐ ˈkuːxn̩/', example: 'Der Kuchen ist süß.' },
          { word: 'Das Hähnchen', translation: 'Chicken', pronunciation: '/das ˈhɛːnçən/', example: 'Gebratenes Hähnchen.' },
          { word: 'Die Kartoffel', translation: 'Potato', pronunciation: '/diː kaʁˈtɔfl̩/', example: 'Kartoffeln mit Wurst.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "bread" in German?', options: ['Das Wasser', 'Das Brot', 'Das Bier', 'Der Kaffee'], correctAnswer: 'Das Brot', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Ein ___, bitte. (beer)', correctAnswer: 'Bier', xpReward: 3 },
        ],
      },
    },
    {
      id: 'de-grammar-articles',
      languageCode: 'de',
      title: 'Der, Die, Das',
      description: 'German definite articles',
      type: 'grammar',
      difficulty: 'beginner',
      xpReward: 20,
      content: {
        grammar: [
          { title: 'German Articles', explanation: 'Der (masc.), Die (fem.), Das (neuter) = The. German nouns have grammatical gender.', examples: ['Der Mann (the man)', 'Die Frau (the woman)', 'Das Kind (the child)', 'Die Kinder (the children - plural)'] },
        ],
        exercises: [
          { id: 'ex1', type: 'fill-blank', question: '___ Mann ist groß. (The)', correctAnswer: 'Der', xpReward: 4 },
          { id: 'ex2', type: 'multiple-choice', question: 'Which article for "Kind" (child)?', options: ['Der', 'Die', 'Das'], correctAnswer: 'Das', xpReward: 4 },
        ],
      },
    },
  ],
  ar: [
    {
      id: 'ar-vocab-greetings',
      languageCode: 'ar',
      title: 'التحيات',
      description: 'Arabic greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'مرحبا', translation: 'Hello', pronunciation: '/marħaba/', example: 'مرحبا، كيف حالك؟' },
          { word: 'السلام عليكم', translation: 'Peace be upon you', pronunciation: '/as-salāmu ʿalaykum/', example: 'السلام عليكم ورحمة الله' },
          { word: 'صباح الخير', translation: 'Good morning', pronunciation: '/ṣabāḥ al-khayr/', example: 'صباح الخير!' },
          { word: 'مساء الخير', translation: 'Good evening', pronunciation: '/masāʾ al-khayr/', example: 'مساء الخير!' },
          { word: 'مع السلامة', translation: 'Goodbye', pronunciation: '/maʿa s-salāma/', example: 'مع السلامة!' },
          { word: 'شكرا', translation: 'Thank you', pronunciation: '/shukran/', example: 'شكرا جزيلا!' },
          { word: 'عفوا', translation: "You're welcome", pronunciation: '/ʿafwan/', example: 'عفوا!' },
          { word: 'من فضلك', translation: 'Please', pronunciation: '/min faḍlak/', example: 'قهوة، من فضلك.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Arabic?', options: ['مرحبا', 'شكرا', 'مع السلامة', 'من فضلك'], correctAnswer: 'شكرا', xpReward: 3 },
          { id: 'ex2', type: 'multiple-choice', question: 'What is the formal Islamic greeting?', options: ['مرحبا', 'السلام عليكم', 'صباح الخير', 'مساء الخير'], correctAnswer: 'السلام عليكم', xpReward: 3 },
        ],
      },
    },
    {
      id: 'ar-vocab-numbers',
      languageCode: 'ar',
      title: 'الأرقام',
      description: 'Numbers in Arabic',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'واحد', translation: 'One', pronunciation: '/wāḥid/', example: 'عندي واحد.' },
          { word: 'اثنان', translation: 'Two', pronunciation: '/ithnān/', example: 'اثنان قهوة.' },
          { word: 'ثلاثة', translation: 'Three', pronunciation: '/thalātha/', example: 'ثلاثة أصدقاء.' },
          { word: 'أربعة', translation: 'Four', pronunciation: '/arbaʿa/', example: 'أربعة فصول.' },
          { word: 'خمسة', translation: 'Five', pronunciation: '/khamsa/', example: 'خمسة أصابع.' },
          { word: 'عشرة', translation: 'Ten', pronunciation: '/ʿashara/', example: 'عشرة دولارات.' },
          { word: 'عشرون', translation: 'Twenty', pronunciation: '/ʿishrūn/', example: 'عشرون سنة.' },
          { word: 'مائة', translation: 'Hundred', pronunciation: '/miʾa/', example: 'مائة شخص.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in Arabic?', options: ['واحد', 'اثنان', 'ثلاثة', 'أربعة'], correctAnswer: 'ثلاثة', xpReward: 3 },
        ],
      },
    },
    {
      id: 'ar-vocab-family',
      languageCode: 'ar',
      title: 'العائلة',
      description: 'Family vocabulary in Arabic',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'أم', translation: 'Mother', pronunciation: '/umm/', example: 'أمي لطيفة.' },
          { word: 'أب', translation: 'Father', pronunciation: '/ab/', example: 'أبي يعمل كثيرا.' },
          { word: 'أخت', translation: 'Sister', pronunciation: '/ukht/', example: 'عندي أخت.' },
          { word: 'أخ', translation: 'Brother', pronunciation: '/akh/', example: 'أخي طويل.' },
          { word: 'جدة', translation: 'Grandmother', pronunciation: '/jadda/', example: 'جدتي تطبخ جيدا.' },
          { word: 'جد', translation: 'Grandfather', pronunciation: '/jadd/', example: 'جدي يحكي قصص.' },
          { word: 'ابن', translation: 'Son', pronunciation: '/ibn/', example: 'هذا ابني.' },
          { word: 'ابنة', translation: 'Daughter', pronunciation: '/ibna/', example: 'هذه ابنتي.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "mother" in Arabic?', options: ['أب', 'أم', 'أخت', 'أخ'], correctAnswer: 'أم', xpReward: 3 },
        ],
      },
    },
  ],
  it: [
    {
      id: 'it-vocab-greetings',
      languageCode: 'it',
      title: 'Saluti',
      description: 'Italian greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'Ciao', translation: 'Hello/Bye', pronunciation: '/ˈtʃaːo/', example: 'Ciao, come stai?' },
          { word: 'Buongiorno', translation: 'Good morning/day', pronunciation: '/ˌbwɔnˈdʒorno/', example: 'Buongiorno, signora!' },
          { word: 'Buonasera', translation: 'Good evening', pronunciation: '/ˌbwɔnaˈsera/', example: 'Buonasera a tutti!' },
          { word: 'Arrivederci', translation: 'Goodbye', pronunciation: '/arriˈvederci/', example: 'Arrivederci!' },
          { word: 'Grazie', translation: 'Thank you', pronunciation: '/ˈɡrattsje/', example: 'Grazie mille!' },
          { word: 'Prego', translation: "You're welcome", pronunciation: '/ˈpreːɡo/', example: 'Prego!' },
          { word: 'Per favore', translation: 'Please', pronunciation: '/per faˈvore/', example: 'Un caffè, per favore.' },
          { word: 'Scusi', translation: 'Excuse me', pronunciation: '/ˈskuːzi/', example: "Scusi, dov'è la stazione?" },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Italian?', options: ['Ciao', 'Grazie', 'Prego', 'Scusi'], correctAnswer: 'Grazie', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Un caffè, per ___.', correctAnswer: 'favore', xpReward: 3 },
        ],
      },
    },
    {
      id: 'it-vocab-food',
      languageCode: 'it',
      title: 'Il Cibo',
      description: 'Italian food vocabulary',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'La pizza', translation: 'Pizza', pronunciation: '/la ˈpittsa/', example: 'Una pizza margherita.' },
          { word: 'La pasta', translation: 'Pasta', pronunciation: '/la ˈpasta/', example: 'La pasta è deliziosa.' },
          { word: 'Il caffè', translation: 'Coffee', pronunciation: '/il kafˈfɛ/', example: 'Un caffè, per favore.' },
          { word: 'Il gelato', translation: 'Ice cream', pronunciation: '/il dʒeˈlato/', example: 'Il gelato italiano è il migliore.' },
          { word: 'Il vino', translation: 'Wine', pronunciation: '/il ˈvino/', example: 'Un bicchiere di vino rosso.' },
          { word: "L'acqua", translation: 'Water', pronunciation: '/ˈlakkwa/', example: "Un'acqua minerale." },
          { word: 'Il pane', translation: 'Bread', pronunciation: '/il ˈpane/', example: 'Il pane fresco.' },
          { word: 'Il formaggio', translation: 'Cheese', pronunciation: '/il forˈmaddʒo/', example: 'Il formaggio parmigiano.' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "ice cream" in Italian?', options: ['La pizza', 'La pasta', 'Il gelato', 'Il caffè'], correctAnswer: 'Il gelato', xpReward: 3 },
          { id: 'ex2', type: 'fill-blank', question: 'Un ___, per favore. (coffee)', correctAnswer: 'caffè', xpReward: 3 },
        ],
      },
    },
    {
      id: 'it-conv-restaurant',
      languageCode: 'it',
      title: 'Al Ristorante',
      description: 'Restaurant conversations in Italian',
      type: 'conversation',
      difficulty: 'intermediate',
      xpReward: 20,
      content: {
        examples: [
          { original: 'Posso avere il menù?', translation: 'Can I have the menu?' },
          { original: 'Vorrei ordinare...', translation: 'I would like to order...' },
          { original: 'Cosa mi consiglia?', translation: 'What do you recommend?' },
          { original: 'Il conto, per favore.', translation: 'The bill, please.' },
          { original: 'È incluso il servizio?', translation: 'Is service included?' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you ask for the bill?', options: ['Il menù', 'Il conto, per favore', 'Grazie', 'Arrivederci'], correctAnswer: 'Il conto, per favore', xpReward: 4 },
        ],
      },
    },
  ],
  ja: [
    {
      id: 'ja-vocab-greetings',
      languageCode: 'ja',
      title: '挨拶',
      description: 'Japanese greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'こんにちは', translation: 'Hello', pronunciation: '/konnichiwa/', example: 'こんにちは、お元気ですか？' },
          { word: 'おはよう', translation: 'Good morning', pronunciation: '/ohayou/', example: 'おはようございます！' },
          { word: 'こんばんは', translation: 'Good evening', pronunciation: '/konbanwa/', example: 'こんばんは！' },
          { word: 'さようなら', translation: 'Goodbye', pronunciation: '/sayounara/', example: 'さようなら！' },
          { word: 'ありがとう', translation: 'Thank you', pronunciation: '/arigatou/', example: 'ありがとうございます！' },
          { word: 'すみません', translation: 'Excuse me/Sorry', pronunciation: '/sumimasen/', example: 'すみません、駅はどこですか？' },
          { word: 'はい', translation: 'Yes', pronunciation: '/hai/', example: 'はい、そうです。' },
          { word: 'いいえ', translation: 'No', pronunciation: '/iie/', example: 'いいえ、違います。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Thank you" in Japanese?', options: ['こんにちは', 'ありがとう', 'さようなら', 'すみません'], correctAnswer: 'ありがとう', xpReward: 3 },
          { id: 'ex2', type: 'multiple-choice', question: 'What does "おはよう" mean?', options: ['Good evening', 'Goodbye', 'Good morning', 'Thank you'], correctAnswer: 'Good morning', xpReward: 3 },
        ],
      },
    },
    {
      id: 'ja-vocab-numbers',
      languageCode: 'ja',
      title: '数字',
      description: 'Numbers in Japanese',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: '一 (いち)', translation: 'One', pronunciation: '/ichi/', example: '一つください。' },
          { word: '二 (に)', translation: 'Two', pronunciation: '/ni/', example: '二人です。' },
          { word: '三 (さん)', translation: 'Three', pronunciation: '/san/', example: '三時です。' },
          { word: '四 (よん/し)', translation: 'Four', pronunciation: '/yon/', example: '四つ。' },
          { word: '五 (ご)', translation: 'Five', pronunciation: '/go/', example: '五分。' },
          { word: '十 (じゅう)', translation: 'Ten', pronunciation: '/juu/', example: '十円。' },
          { word: '百 (ひゃく)', translation: 'Hundred', pronunciation: '/hyaku/', example: '百円。' },
          { word: '千 (せん)', translation: 'Thousand', pronunciation: '/sen/', example: '千円。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in Japanese?', options: ['一', '二', '三', '四'], correctAnswer: '三', xpReward: 3 },
        ],
      },
    },
    {
      id: 'ja-vocab-food',
      languageCode: 'ja',
      title: '食べ物',
      description: 'Food vocabulary in Japanese',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: 'ご飯', translation: 'Rice', pronunciation: '/gohan/', example: 'ご飯を食べます。' },
          { word: '寿司', translation: 'Sushi', pronunciation: '/sushi/', example: '寿司が好きです。' },
          { word: 'ラーメン', translation: 'Ramen', pronunciation: '/raamen/', example: 'ラーメンを食べたい。' },
          { word: 'お茶', translation: 'Tea', pronunciation: '/ocha/', example: 'お茶をください。' },
          { word: '水', translation: 'Water', pronunciation: '/mizu/', example: '水をください。' },
          { word: '魚', translation: 'Fish', pronunciation: '/sakana/', example: '魚が新鮮です。' },
          { word: '肉', translation: 'Meat', pronunciation: '/niku/', example: '肉を食べます。' },
          { word: '野菜', translation: 'Vegetables', pronunciation: '/yasai/', example: '野菜は健康的です。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "rice" in Japanese?', options: ['寿司', 'ご飯', 'ラーメン', 'お茶'], correctAnswer: 'ご飯', xpReward: 3 },
        ],
      },
    },
  ],
  zh: [
    {
      id: 'zh-vocab-greetings',
      languageCode: 'zh',
      title: '问候',
      description: 'Chinese greetings',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: '你好', translation: 'Hello', pronunciation: '/nǐ hǎo/', example: '你好，你好吗？' },
          { word: '早上好', translation: 'Good morning', pronunciation: '/zǎo shang hǎo/', example: '早上好！' },
          { word: '晚上好', translation: 'Good evening', pronunciation: '/wǎn shang hǎo/', example: '晚上好！' },
          { word: '再见', translation: 'Goodbye', pronunciation: '/zài jiàn/', example: '再见！' },
          { word: '谢谢', translation: 'Thank you', pronunciation: '/xiè xie/', example: '谢谢你！' },
          { word: '不客气', translation: "You're welcome", pronunciation: '/bù kè qi/', example: '不客气！' },
          { word: '请', translation: 'Please', pronunciation: '/qǐng/', example: '请问，洗手间在哪里？' },
          { word: '对不起', translation: 'Sorry', pronunciation: '/duì bu qǐ/', example: '对不起，我迟到了。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "Hello" in Chinese?', options: ['再见', '谢谢', '你好', '请'], correctAnswer: '你好', xpReward: 3 },
          { id: 'ex2', type: 'multiple-choice', question: 'What does "谢谢" mean?', options: ['Hello', 'Goodbye', 'Please', 'Thank you'], correctAnswer: 'Thank you', xpReward: 3 },
        ],
      },
    },
    {
      id: 'zh-vocab-numbers',
      languageCode: 'zh',
      title: '数字',
      description: 'Numbers in Chinese',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: '一', translation: 'One', pronunciation: '/yī/', example: '一个苹果。' },
          { word: '二', translation: 'Two', pronunciation: '/èr/', example: '二杯咖啡。' },
          { word: '三', translation: 'Three', pronunciation: '/sān/', example: '三个朋友。' },
          { word: '四', translation: 'Four', pronunciation: '/sì/', example: '四季。' },
          { word: '五', translation: 'Five', pronunciation: '/wǔ/', example: '五个手指。' },
          { word: '十', translation: 'Ten', pronunciation: '/shí/', example: '十块钱。' },
          { word: '百', translation: 'Hundred', pronunciation: '/bǎi/', example: '一百块。' },
          { word: '千', translation: 'Thousand', pronunciation: '/qiān/', example: '一千人。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "three" in Chinese?', options: ['一', '二', '三', '四'], correctAnswer: '三', xpReward: 3 },
        ],
      },
    },
    {
      id: 'zh-vocab-family',
      languageCode: 'zh',
      title: '家庭',
      description: 'Family vocabulary in Chinese',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: '妈妈', translation: 'Mother', pronunciation: '/māma/', example: '我妈妈很善良。' },
          { word: '爸爸', translation: 'Father', pronunciation: '/bàba/', example: '我爸爸工作很努力。' },
          { word: '姐姐', translation: 'Older sister', pronunciation: '/jiějie/', example: '我有一个姐姐。' },
          { word: '哥哥', translation: 'Older brother', pronunciation: '/gēge/', example: '我哥哥很高。' },
          { word: '妹妹', translation: 'Younger sister', pronunciation: '/mèimei/', example: '我妹妹很可爱。' },
          { word: '弟弟', translation: 'Younger brother', pronunciation: '/dìdi/', example: '我弟弟还小。' },
          { word: '奶奶', translation: 'Grandmother', pronunciation: '/nǎinai/', example: '奶奶做饭很好吃。' },
          { word: '爷爷', translation: 'Grandfather', pronunciation: '/yéye/', example: '爷爷讲故事。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'How do you say "mother" in Chinese?', options: ['爸爸', '妈妈', '姐姐', '哥哥'], correctAnswer: '妈妈', xpReward: 3 },
        ],
      },
    },
    {
      id: 'zh-vocab-food',
      languageCode: 'zh',
      title: '食物',
      description: 'Food vocabulary in Chinese',
      type: 'vocabulary',
      difficulty: 'beginner',
      xpReward: 15,
      content: {
        vocabulary: [
          { word: '米饭', translation: 'Rice', pronunciation: '/mǐfàn/', example: '我吃米饭。' },
          { word: '面条', translation: 'Noodles', pronunciation: '/miàntiáo/', example: '面条很好吃。' },
          { word: '茶', translation: 'Tea', pronunciation: '/chá/', example: '请给我茶。' },
          { word: '水', translation: 'Water', pronunciation: '/shuǐ/', example: '我要水。' },
          { word: '鸡肉', translation: 'Chicken', pronunciation: '/jīròu/', example: '鸡肉很嫩。' },
          { word: '鱼', translation: 'Fish', pronunciation: '/yú/', example: '鱼很新鲜。' },
          { word: '蔬菜', translation: 'Vegetables', pronunciation: '/shūcài/', example: '多吃蔬菜。' },
          { word: '水果', translation: 'Fruit', pronunciation: '/shuǐguǒ/', example: '水果很甜。' },
        ],
        exercises: [
          { id: 'ex1', type: 'multiple-choice', question: 'What is "rice" in Chinese?', options: ['面条', '米饭', '茶', '水'], correctAnswer: '米饭', xpReward: 3 },
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
