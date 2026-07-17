export interface VocabularyWord {
  word: string
  ipa?: string
  reading?: string
  meaning: string
  meaningEn?: string
  example?: string
  exampleTH?: string
  difficulty?: 1 | 2 | 3
  category?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'idiom'
}

export interface QuizQuestion {
  question: string
  questionTH?: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface StatEffect {
  hp?: number
  hunger?: number
  courage?: number
  knowledge?: number
  speaking?: number
  gold?: number
  exp?: number
}

export interface Character {
  id: string
  name: string
  emoji: string
  descriptionTH: string
  baseStats: {
    hp: number
    hunger: number
    courage: number
    knowledge: number
    speaking: number
    gold: number
  }
}

export interface StoryChoice {
  text: string
  textTH: string
  nextScene: string
  vocabulary?: VocabularyWord[]
  statEffect?: StatEffect
  quiz?: QuizQuestion
  consequence?: string
}

export interface StoryGoalStep {
  sceneId: string
  labelTH: string
  labelEN: string
}

export interface StoryScene {
  id: string
  contentTH: string
  content: string
  illustration?: string
  mood?: string
  title?: string
  titleTH?: string
  choices?: StoryChoice[]
  isEnding?: boolean
  endingType?: 'good' | 'neutral'
}

export interface Story {
  id: string
  title: string
  titleTH: string
  emoji: string
  coverGradient: string
  scenes: { [key: string]: StoryScene }
  startScene: string
  totalScenes: number
  description?: string
  descriptionTH?: string
  difficulty?: string
  estimatedMinutes?: number
  goal?: {
    title: string
    titleTH: string
    icon: string
    steps: StoryGoalStep[]
  }
}

export const moodStyles: { [key: string]: { bg: string; icon: string; label: string } } = {
  calm: { bg: 'from-blue-500/20 to-cyan-500/20', icon: '😌', label: 'Calm' },
  cheerful: { bg: 'from-green-500/20 to-emerald-500/20', icon: '😊', label: 'Cheerful' },
  mysterious: { bg: 'from-purple-500/20 to-violet-500/20', icon: '🔮', label: 'Mysterious' },
  tense: { bg: 'from-red-500/20 to-orange-500/20', icon: '😰', label: 'Tense' },
  neutral: { bg: 'from-gray-500/20 to-slate-500/20', icon: '😐', label: 'Neutral' },
}

export const difficultyColors: { [key: string]: string } = {
  easy: 'bg-green-500/20 text-green-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  hard: 'bg-red-500/20 text-red-300',
}

export const characters: Character[] = [
  {
    id: 'student',
    name: 'Alex',
    emoji: '🧑‍🎓',
    descriptionTH: 'นักเรียนที่อยากเก่งอังกฤษ',
    baseStats: { hp: 100, hunger: 80, courage: 70, knowledge: 0, speaking: 0, gold: 10 }
  },
  {
    id: 'tourist',
    name: 'Max',
    emoji: '🧑‍💻',
    descriptionTH: 'นักท่องเที่ยวที่มาเที่ยว',
    baseStats: { hp: 100, hunger: 85, courage: 80, knowledge: 0, speaking: 0, gold: 50 }
  },
  {
    id: 'chef',
    name: 'Chef Kim',
    emoji: '👨‍🍳',
    descriptionTH: 'เชฟที่มาหาวัตถุดิบ',
    baseStats: { hp: 100, hunger: 75, courage: 65, knowledge: 0, speaking: 0, gold: 30 }
  },
  {
    id: 'doctor',
    name: 'Dr. Sam',
    emoji: '🧑‍⚕️',
    descriptionTH: 'หมอที่มาพักผ่อน',
    baseStats: { hp: 100, hunger: 80, courage: 75, knowledge: 0, speaking: 0, gold: 40 }
  }
]

export const stories: Story[] = [
  {
    id: 'cozy-cafe',
    title: 'Cozy Cafe',
    titleTH: 'คาเฟ่อบอุ่น',
    emoji: '☕',
    coverGradient: 'from-amber-900/30 to-orange-900/40',
    totalScenes: 6,
    startScene: 'entrance',
    goal: {
      title: 'Language Learner',
      titleTH: 'นักเรียนภาษา',
      icon: '📚',
      steps: [
        { sceneId: 'order-english', labelTH: 'สั่งเป็นอังกฤษ', labelEN: 'Order in English' },
        { sceneId: 'talk-english', labelTH: 'พูดคุยเป็นอังกฤษ', labelEN: 'Chat in English' },
        { sceneId: 'learn-word', labelTH: 'เรียนรู้คำศัพท์ใหม่', labelEN: 'Learn new words' },
      ]
    },
    scenes: {
      entrance: {
        id: 'entrance',
        titleTH: 'scene 1',
        contentTH: 'เดินเข้ามาในร้านคาเฟ่เล็กๆ อบอุ่น มีกลิ่นกาแฟหอมลอยมา\n\nA bell above the door rings as you walk into the cozy cafe.',
        content: 'You step inside the small, warm cafe. The smell of fresh coffee fills the air. A friendly barista greets you.',
        illustration: '🚪',
        mood: 'calm',
        choices: [
          {
            text: 'Look at the menu board',
            textTH: 'ดูเมนูบอร์ด',
            nextScene: 'menu-reading',
            vocabulary: [
              { word: 'menu', ipa: '/ˈmɛnjuː/', reading: 'เม-นิว', meaning: 'เมนู', example: 'Can I see the menu?', category: 'noun' },
              { word: 'board', ipa: '/bɔːrd/', reading: 'บอร์ด', meaning: 'กระดาน', example: 'The menu is on the board.', category: 'noun' },
            ],
            statEffect: { knowledge: 3, exp: 3 },
          },
          {
            text: 'Order directly from memory',
            textTH: 'สั่งตรงๆ จากความจำ',
            nextScene: 'order-english',
            vocabulary: [
              { word: 'order', ipa: '/ˈɔːrdər/', reading: 'ออ-เดอร์', meaning: 'สั่ง', example: 'I would like to order.', category: 'noun' },
            ],
            statEffect: { speaking: 5, courage: 3, exp: 5 },
          }
        ]
      },
      'menu-reading': {
        id: 'menu-reading',
        titleTH: 'scene 2',
        contentTH: 'คุณเห็นเมนูหลายภาษา มีทั้งภาษาอังกฤษ ภาษาไทย และภาษาญี่ปุ่น\n\nYou see a menu with many languages. English, Thai, and Japanese options are listed.',
        content: 'The menu has different sections: Coffee, Tea, Desserts. Each item has a description in English.',
        illustration: '📋',
        mood: 'calm',
        choices: [
          {
            text: 'Try reading the English description aloud',
            textTH: 'ลองอ่านคำอธิบายภาษาอังกฤษออกเสียง',
            nextScene: 'talk-english',
            vocabulary: [
              { word: 'latte', ipa: '/ˈlɑːteɪ/', reading: 'ลา-เต้', meaning: 'ลาเต้', example: 'I would like a vanilla latte.', category: 'noun' },
              { word: 'cappuccino', ipa: '/ˌkæpʊˈtʃiːnoʊ/', reading: 'คา-ปุช-ชิ-โน่', meaning: 'คาปุชชิโน่', example: 'A hot cappuccino please.', category: 'noun' },
            ],
            statEffect: { speaking: 5, knowledge: 3, exp: 5 },
          },
          {
            text: 'Point at what you want',
            textTH: 'ชี้สิ่งที่ต้องการ',
            nextScene: 'order-thai',
            vocabulary: [
              { word: 'this', ipa: '/ðɪs/', reading: 'ดิส', meaning: 'นี่', example: 'This one please.', category: 'noun' },
            ],
            statEffect: { speaking: 1, exp: 1 },
          }
        ]
      },
      'order-english': {
        id: 'order-english',
        titleTH: 'scene 3 - You order!',
        contentTH: 'คุณพูดเป็นภาษาอังกฤษ: "Hello! Can I have a cappuccino, please?"\n\nThe barista smiles and answers in English: "Sure! What size would you like?"',
        content: 'You speak English confidently. The barista responds with a friendly question about your preference.',
        illustration: '💬',
        mood: 'cheerful',
        choices: [
          {
            text: 'Reply: "Medium size, please"',
            textTH: 'ตอบ: "Size กลาง ครับ/ค่ะ"',
            nextScene: 'payment',
            vocabulary: [
              { word: 'medium', ipa: '/ˈmiːdiəm/', reading: 'มี-เดี่ยม', meaning: 'ขนาดกลาง', example: 'Medium size please.', category: 'noun' },
              { word: 'size', ipa: '/saɪz/', reading: 'ไซส์', meaning: 'ขนาด', example: 'What size would you like?', category: 'noun' },
            ],
            statEffect: { speaking: 8, courage: 5, exp: 8, gold: 3 },
          },
          {
            text: 'Reply: "I don\'t know, what do you recommend?"',
            textTH: 'ตอบ: "ไม่รู้จะเอาอะไร แนะนำได้ไหม?"',
            nextScene: 'recommendation',
            vocabulary: [
              { word: 'recommend', ipa: '/ˌrɛkəˈmɛnd/', reading: 'เรค-คา-เมนด์', meaning: 'แนะนำ', example: 'What do you recommend?', category: 'noun' },
              { word: 'recommendation', ipa: '/ˌrɛkəmɛnˈdeɪʃən/', reading: 'เรค-คา-เมน-เด-ชั่น', meaning: 'การแนะนำ', example: 'Your recommendation was great!', category: 'noun' },
            ],
            statEffect: { speaking: 5, knowledge: 5, exp: 6 },
          }
        ]
      },
      'order-thai': {
        id: 'order-thai',
        titleTH: 'scene 3 - You order in Thai',
        contentTH: 'คุณชี้แล้วสั่งเป็นภาษาไทย บาริสต้ายิ้มแล้วถามว่าจะเอาไซส์อะไร\n\nYou point and order in Thai. The barista asks about the size.',
        content: 'You order in Thai. While it works, you miss a chance to practice English.',
        illustration: '☕',
        mood: 'neutral',
        choices: [
          {
            text: 'Try again in English: "Medium, please!"',
            textTH: 'ลองสั่งใหม่เป็นอังกฤษ: "Size กลาง ครับ/ค่ะ"',
            nextScene: 'payment',
            vocabulary: [
              { word: 'try', ipa: '/traɪ/', reading: 'ไทร', meaning: 'ลอง', example: 'Can I try again?', category: 'noun' },
            ],
            statEffect: { speaking: 5, courage: 3, exp: 4 },
          },
          {
            text: 'Just continue with Thai',
            textTH: 'สั่งต่อเป็นภาษาไทย',
            nextScene: 'payment',
            statEffect: { exp: 1 },
          }
        ]
      },
      'recommendation': {
        id: 'recommendation',
        titleTH: 'scene 3b - The barista recommends!',
        contentTH: 'บาริสต้าพูดว่า: "I recommend our Signature Mocha! It\'s made with dark chocolate and fresh milk. Very popular!"\n\nคุณได้เรียนรู้คำศัพท์ใหม่!',
        content: 'The barista enthusiastically recommends a signature drink, using descriptive English.',
        illustration: '✨',
        mood: 'cheerful',
        choices: [
          {
            text: 'Say: "That sounds great! I\'ll take that."',
            textTH: 'พูดว่า: "ฟังดูดีเลย! เอาอันนั้น"',
            nextScene: 'payment',
            vocabulary: [
              { word: 'signature', ipa: '/ˈsɪɡnətʃər/', reading: 'ซิก-เน-เจอร์', meaning: 'ซิกเนเจอร์', example: 'This is our signature drink.', category: 'noun' },
              { word: 'popular', ipa: '/ˈpɒpjʊlər/', reading: 'ป็อป-ยูล่า', meaning: 'ยอดนิยม', example: 'It is very popular.', category: 'noun' },
            ],
            statEffect: { speaking: 8, knowledge: 5, exp: 8 },
          },
          {
            text: 'Ask: "How much is it?"',
            textTH: 'ถามว่า: "ราคาเท่าไร?"',
            nextScene: 'payment',
            vocabulary: [
              { word: 'how much', ipa: '/haʊ mʌtʃ/', reading: 'ฮาว มัทช์', meaning: 'ราคาเท่าไร', example: 'How much is this?', category: 'noun' },
            ],
            statEffect: { speaking: 5, knowledge: 3, exp: 5 },
          }
        ]
      },
      payment: {
        id: 'payment',
        titleTH: 'scene 4 - Payment!',
        contentTH: 'คุณจ่ายเงิน 120 บาท บาริสต้าขอบคุณเป็นภาษาอังกฤษ\n\n"Thank you so much! Your English is really good!"',
        content: 'You pay 120 baht. The barista compliments your English skills!',
        illustration: '💰',
        mood: 'cheerful',
        choices: [
          {
            text: 'Say: "Thank you! I\'m learning."',
            textTH: 'พูดว่า: "ขอบคุณครับ/ค่ะ ผมกำลังเรียนอยู่"',
            nextScene: 'ending',
            vocabulary: [
              { word: 'learning', ipa: '/ˈlɜːrnɪŋ/', reading: 'เลิร์-นิ่ง', meaning: 'กำลังเรียน', example: 'I am learning English.', category: 'noun' },
            ],
            statEffect: { speaking: 10, courage: 5, exp: 10, hunger: 15 },
            quiz: {
              question: '"I\'m learning" means...',
              questionTH: '"I\'m learning" หมายความว่า...',
              options: ['I am studying', 'I am hungry', 'I am tired', 'I am sleeping'],
              correctIndex: 0,
              explanation: '"I\'m learning" = ฉันกำลังเรียนรู้',
            }
          },
          {
            text: 'Just smile and nod',
            textTH: 'ยิ้มแล้วพยักหน้า',
            nextScene: 'ending',
            statEffect: { hunger: 10, exp: 2 },
          }
        ]
      },
      ending: {
        id: 'ending',
        contentTH: 'คุณนั่งจิบกาแฟในคาเฟ่อบอุ่น รู้สึกภูมิใจที่ได้พูดภาษาอังกฤษวันนี้\n\nYou sit in the cozy cafe, proud of yourself for speaking English today!',
        content: 'You enjoy your coffee, feeling accomplished for practicing English.',
        illustration: '☕',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      }
    }
  },
  {
    id: 'lost-temple',
    title: 'The Lost Temple',
    titleTH: 'วัดลึกลับ',
    emoji: '🏛️',
    coverGradient: 'from-emerald-900/30 to-teal-900/40',
    totalScenes: 7,
    startScene: 'temple-entrance',
    goal: {
      title: 'Treasure Hunter',
      titleTH: 'นักล่าสมบัติ',
      icon: '💎',
      steps: [
        { sceneId: 'secret-room', labelTH: 'พบห้องลับ', labelEN: 'Find secret room' },
        { sceneId: 'solve-puzzle', labelTH: 'แก้ปริศนา', labelEN: 'Solve puzzle' },
        { sceneId: 'ending-treasure', labelTH: 'ได้สมบัติ', labelEN: 'Get treasure' },
      ]
    },
    scenes: {
      'temple-entrance': {
        id: 'temple-entrance',
        titleTH: 'scene 1',
        contentTH: 'คุณยืนอยู่หน้าทางเข้าวัดโบราณ มีแสงลอดผ่านซุ้มประตู\n\nBefore you stands an ancient temple. Light streams through the stone archway.',
        content: 'You stand before an ancient temple entrance. Mysterious light filters through the stone archway.',
        illustration: '🏛️',
        mood: 'calm',
        choices: [
          {
            text: 'Enter through the main hall',
            textTH: 'เดินเข้าห้องโถงหลัก',
            nextScene: 'main-hall',
            vocabulary: [
              { word: 'ancient', ipa: '/ˈeɪnʃənt/', reading: 'เอ็น-เชี่ยนท์', meaning: 'โบราณ', example: 'This is an ancient temple.', category: 'noun' },
              { word: 'hall', ipa: '/hɔːl/', reading: 'ฮอล', meaning: 'ห้องโถง', example: 'The main hall is very big.', category: 'noun' },
            ],
            statEffect: { courage: 5, knowledge: 5, exp: 5 },
          },
          {
            text: 'Take the hidden side path',
            textTH: 'เดินทางลัด',
            nextScene: 'side-path',
            vocabulary: [
              { word: 'hidden', ipa: '/ˈhɪdən/', reading: 'ฮิด-เด่น', meaning: 'ซ่อน', example: 'There is a hidden door.', category: 'noun' },
              { word: 'path', ipa: '/pæθ/', reading: 'พะท', meaning: 'ทาง', example: 'Follow this path.', category: 'noun' },
            ],
            statEffect: { courage: 3, exp: 3 },
          }
        ]
      },
      'main-hall': {
        id: 'main-hall',
        titleTH: 'scene 2',
        contentTH: 'ห้องโถงใหญ่มีภาพจิตรกรรมบนผนัง และประตู 3 บาน\n\nThe great hall has murals on the walls and three doors.',
        content: 'The grand hall features ancient murals and three mysterious doors ahead.',
        illustration: '✨',
        mood: 'mysterious',
        choices: [
          {
            text: 'Study the murals for clues',
            textTH: 'ศึกษาภาพจิตรกรรมหาเบาะแส',
            nextScene: 'paintings',
            vocabulary: [
              { word: 'mural', ipa: '/ˈmjʊrəl/', reading: 'มュ-เริล', meaning: 'ภาพจิตรกรรมฝาผนัง', example: 'The murals tell a story.', category: 'noun' },
              { word: 'clue', ipa: '/kluː/', reading: 'คลู', meaning: 'เบาะแส', example: 'Look for clues.', category: 'noun' },
            ],
            statEffect: { knowledge: 8, exp: 8 },
          },
          {
            text: 'Open the golden door',
            textTH: 'เปิดประตูสีทอง',
            nextScene: 'secret-room',
            vocabulary: [
              { word: 'golden', ipa: '/ˈɡoʊldən/', reading: 'โกล-เด่น', meaning: 'สีทอง', example: 'The door is golden.', category: 'noun' },
            ],
            statEffect: { courage: 5, exp: 5 },
            quiz: {
              question: '"Golden" means...',
              questionTH: '"Golden" หมายความว่า...',
              options: ['Color of gold', 'Made of gold', 'Very expensive', 'Shiny'],
              correctIndex: 1,
              explanation: '"Golden" = ทำจากทอง (made of gold)',
            }
          }
        ]
      },
      'side-path': {
        id: 'side-path',
        titleTH: 'scene 2b',
        contentTH: 'ทางลัดผ่านป่า คุณเจอรูปปั้นหินหน้าประตูลับ\n\nThe shortcut leads through a forest. You find a stone statue near a hidden door.',
        content: 'A forest path leads to a hidden doorway guarded by stone statues.',
        illustration: '🌳',
        mood: 'mysterious',
        choices: [
          {
            text: 'Read the inscription on the statue',
            textTH: 'อ่านจารึกบนรูปปั้น',
            nextScene: 'paintings',
            vocabulary: [
              { word: 'statue', ipa: '/ˈstætʃuː/', reading: 'สแต-ชิว', meaning: 'รูปปั้น', example: 'There is a stone statue.', category: 'noun' },
              { word: 'inscription', ipa: '/ɪnˈskrɪpʃən/', reading: 'อิน-สคริพ-ชั่น', meaning: 'จารึก', example: 'Read the inscription.', category: 'noun' },
            ],
            statEffect: { knowledge: 5, courage: 3, exp: 5 },
          },
          {
            text: 'Enter through the hidden door',
            textTH: 'เดินเข้าประตูลับ',
            nextScene: 'secret-room',
            vocabulary: [
              { word: 'door', ipa: '/dɔːr/', reading: 'ดอร์', meaning: 'ประตู', example: 'Open the door.', category: 'noun' },
            ],
            statEffect: { courage: 5, exp: 3 },
          }
        ]
      },
      paintings: {
        id: 'paintings',
        titleTH: 'scene 3',
        contentTH: 'ภาพจิตรกรรมแสดงแผนที่ขุมทรัพย์ มีเบาะแสว่าต้องแก้ปริศนา\n\nThe murals show a treasure map. You need to solve a puzzle to find it.',
        content: 'The ancient murals reveal a treasure map. A riddle must be solved.',
        illustration: '🎨',
        mood: 'mysterious',
        choices: [
          {
            text: 'Solve the riddle: "What has keys but no locks?"',
            textTH: 'แก้ปริศนา: "อะไรที่มีคีย์แต่ไม่มีล็อค?"',
            nextScene: 'solve-puzzle',
            vocabulary: [
              { word: 'riddle', ipa: '/ˈrɪdəl/', reading: 'ริด-เดิล', meaning: 'ปริศนา', example: 'Can you solve this riddle?', category: 'noun' },
              { word: 'puzzle', ipa: '/ˈpʌzəl/', reading: 'พัซ-เซิล', meaning: 'ปริศนา/เกม', example: 'This is a difficult puzzle.', category: 'noun' },
            ],
            statEffect: { knowledge: 10, exp: 10 },
            quiz: {
              question: '"What has keys but no locks?" Answer: A piano',
              questionTH: 'คำตอบคือ: เปียโน (Piano) เพราะมีคีย์บอร์ดแต่ไม่มีล็อค',
              options: ['Computer', 'Piano', 'House', 'Car'],
              correctIndex: 1,
              explanation: 'A piano has keys (แป้นพิมพ์) but no locks (ล็อค)!',
            }
          },
          {
            text: 'Search the room physically',
            textTH: 'ค้นหาห้องด้วยตัวเอง',
            nextScene: 'explore',
            vocabulary: [
              { word: 'search', ipa: '/sɜːrtʃ/', reading: 'เซิร์ช', meaning: 'ค้นหา', example: 'Search the room.', category: 'noun' },
            ],
            statEffect: { courage: 3, exp: 3 },
          }
        ]
      },
      'solve-puzzle': {
        id: 'solve-puzzle',
        titleTH: 'scene 4',
        contentTH: 'คุณตอบว่า "A Piano!" ผนังเปิดออกเผยให้เห็นห้องสมบัติ!\n\n"Correct!" The wall opens, revealing the treasure room!',
        content: 'Your answer is correct! The wall slides open, revealing a room full of treasures.',
        illustration: '🔷',
        mood: 'cheerful',
        choices: [
          {
            text: 'Carefully examine the treasures',
            textTH: 'ค่อยๆ ดูสมบัติอย่างถี่ถ้วน',
            nextScene: 'ending-treasure',
            vocabulary: [
              { word: 'treasure', ipa: '/ˈtrɛʒər/', reading: 'เทร-เชอร์', meaning: 'สมบัติ', example: 'The treasure is beautiful.', category: 'noun' },
              { word: 'carefully', ipa: '/ˈkɛrfəli/', reading: 'แคร์-ฟูล-ลี่', meaning: 'อย่างระมัดระวัง', example: 'Look carefully.', category: 'noun' },
            ],
            statEffect: { knowledge: 10, exp: 15 },
          },
          {
            text: 'Grab everything quickly!',
            textTH: 'คว้าทุกอย่างเร็วๆ!',
            nextScene: 'ending-treasure',
            statEffect: { gold: 20, exp: 5, courage: -5 },
          }
        ]
      },
      explore: {
        id: 'explore',
        titleTH: 'scene 4b',
        contentTH: 'คุณค้นหาทั่วห้องและเจอสวิตซ์ลับบนผนัง\n\nYou search the room and find a hidden switch on the wall.',
        content: 'Searching the room reveals a hidden switch on the wall.',
        illustration: '🔎',
        mood: 'calm',
        choices: [
          {
            text: 'Press the switch',
            textTH: 'กดสวิตซ์',
            nextScene: 'ending-treasure',
            vocabulary: [
              { word: 'switch', ipa: '/swɪtʃ/', reading: 'สวิทช์', meaning: 'สวิตซ์', example: 'Press the switch.', category: 'noun' },
            ],
            statEffect: { courage: 5, gold: 10, exp: 8 },
          }
        ]
      },
      'ending-treasure': {
        id: 'ending-treasure',
        contentTH: 'คุณพบหีบสมบัติโบราณ เปิดออกมาเจอทองคำและอัญมณี!\n\nYou found an ancient chest! Inside are gold and jewels!',
        content: 'You discovered an ancient treasure chest filled with gold and precious stones!',
        illustration: '💎',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      }
    }
  },
  {
    id: 'street-food',
    title: 'Street Food Adventure',
    titleTH: 'ผจญภัยอาหารริมทาง',
    emoji: '🍜',
    coverGradient: 'from-red-900/30 to-orange-900/40',
    totalScenes: 6,
    startScene: 'street-entrance',
    goal: {
      title: 'Food Explorer',
      titleTH: 'นักสำรวจอาหาร',
      icon: '🍽️',
      steps: [
        { sceneId: 'ask-vendor', labelTH: 'ถามแม่ค้า', labelEN: 'Ask the vendor' },
        { sceneId: 'food-area', labelTH: 'กินอาหาร', labelEN: 'Eat the food' },
        { sceneId: 'ending-perfect', labelTH: 'มีความสุข', labelEN: 'Happy ending' },
      ]
    },
    scenes: {
      'street-entrance': {
        id: 'street-entrance',
        titleTH: 'scene 1',
        contentTH: 'คุณเดินเข้าตลาดนัด มีอาหารหลายร้าน กลิ่นหอมลอยมา\n\nYou enter a night market. Various food stalls fill the air with delicious aromas.',
        content: 'Welcome to the night market! Street food vendors line both sides of the street.',
        illustration: '🛒',
        mood: 'calm',
        choices: [
          {
            text: 'Ask a vendor about their food in English',
            textTH: 'ถามแม่ค้าเป็นภาษาอังกฤษ',
            nextScene: 'ask-vendor',
            vocabulary: [
              { word: 'vendor', ipa: '/ˈvɛndər/', reading: 'เวน-เดอร์', meaning: 'แม่ค้า', example: 'The vendor sells pad thai.', category: 'noun' },
              { word: 'stall', ipa: '/stɔːl/', reading: 'สตอล', meaning: 'ร้าน', example: 'This stall has good food.', category: 'noun' },
            ],
            statEffect: { speaking: 5, courage: 5, exp: 5 },
          },
          {
            text: 'Point at food and smile',
            textTH: 'ชี้อาหารแล้วยิ้ม',
            nextScene: 'food-order',
            statEffect: { hunger: 5, exp: 1 },
          }
        ]
      },
      'ask-vendor': {
        id: 'ask-vendor',
        titleTH: 'scene 2',
        contentTH: 'คุณถามว่า: "What is this?" แม่ค้าตอบว่า: "It\'s Tom Yum! Very spicy and delicious!"\n\nYou ask the vendor and learn about the food!',
        content: 'The vendor explains their special Tom Yum with pride!',
        illustration: '🍜',
        mood: 'cheerful',
        choices: [
          {
            text: 'Order: "One bowl, please!"',
            textTH: 'สั่ง: "ชามหนึ่ง ครับ/ค่ะ"',
            nextScene: 'food-eating',
            vocabulary: [
              { word: 'bowl', ipa: '/boʊl/', reading: 'โบล', meaning: 'ชาม', example: 'One bowl of Tom Yum.', category: 'noun' },
              { word: 'spicy', ipa: '/ˈspaɪsi/', reading: 'สไป-ซี่', meaning: 'เผ็ด', example: 'Is it spicy?', category: 'noun' },
            ],
            statEffect: { speaking: 8, hunger: 10, exp: 8, gold: -10 },
          },
          {
            text: 'Ask: "How spicy is it?"',
            textTH: 'ถามว่า: "เผ็ดแค่ไหน?"',
            nextScene: 'food-eating',
            vocabulary: [
              { word: 'how', ipa: '/haʊ/', reading: 'ฮาว', meaning: 'อย่างไร', example: 'How spicy?', category: 'noun' },
            ],
            statEffect: { speaking: 5, knowledge: 3, exp: 5 },
          }
        ]
      },
      'food-order': {
        id: 'food-order',
        titleTH: 'scene 2b',
        contentTH: 'คุณชี้อาหาร แต่แม่ค้าพูดอังกฤษว่า: "Would you like this one?"\n\nThe vendor speaks to you in English!',
        content: 'The vendor tries to communicate in English, giving you a chance to practice!',
        illustration: '🤔',
        mood: 'calm',
        choices: [
          {
            text: 'Try: "Yes, please!"',
            textTH: 'ลองพูด: "ใช่ ครับ/ค่ะ"',
            nextScene: 'food-eating',
            vocabulary: [
              { word: 'please', ipa: '/pliːz/', reading: 'พลีส', meaning: 'กรุณา', example: 'Yes, please.', category: 'noun' },
            ],
            statEffect: { speaking: 5, courage: 3, hunger: 8, exp: 5, gold: -8 },
          },
          {
            text: 'Just point and smile',
            textTH: 'ชี้แล้วยิ้ม',
            nextScene: 'food-eating',
            statEffect: { hunger: 5, exp: 1, gold: -5 },
          }
        ]
      },
      'food-eating': {
        id: 'food-eating',
        titleTH: 'scene 3',
        contentTH: 'คุณนั่งกินอาหารริมทาง อร่อยมาก! มีเสียงดนตรีจากนักดนตรีข้างทาง\n\nYou enjoy delicious street food. A musician plays nearby!',
        content: 'Sitting by the street, you enjoy your meal. Music fills the air.',
        illustration: '🎵',
        mood: 'cheerful',
        choices: [
          {
            text: 'Thank the vendor: "Delicious! Thank you!"',
            textTH: 'ขอบคุณแม่ค้า: "อร่อย! ขอบคุณครับ/ค่ะ"',
            nextScene: 'food-area',
            vocabulary: [
              { word: 'delicious', ipa: '/dɪˈlɪʃəs/', reading: 'ดิ-ลิ-เชิส', meaning: 'อร่อย', example: 'The food is delicious!', category: 'noun' },
            ],
            statEffect: { speaking: 5, hunger: 15, exp: 8 },
          },
          {
            text: 'Just eat and enjoy',
            textTH: 'แค่กินแล้วEnjoy',
            nextScene: 'food-area',
            statEffect: { hunger: 15, exp: 3 },
          }
        ]
      },
      'food-area': {
        id: 'food-area',
        titleTH: 'scene 4',
        contentTH: 'คุณเดินต่อในตลาด เจอร้านขนมไทย\n\nYou continue walking and find a Thai dessert stall.',
        content: 'Further down the market, you discover a traditional Thai dessert stall.',
        illustration: '🌈',
        mood: 'calm',
        choices: [
          {
            text: 'Ask: "What Thai desserts do you have?"',
            textTH: 'ถามว่า: "มีขนมไทยอะไรบ้าง?"',
            nextScene: 'ending-perfect',
            vocabulary: [
              { word: 'dessert', ipa: '/dɪˈzɜːrt/', reading: 'ดิ-เซิร์ต', meaning: 'ขนมหวาน', example: 'Thai desserts are sweet.', category: 'noun' },
              { word: 'traditional', ipa: '/trəˈdɪʃənəl/', reading: 'ทรา-ดิ-ชั่น-นอล', meaning: 'ดั้งเดิม', example: 'This is traditional Thai food.', category: 'noun' },
            ],
            statEffect: { speaking: 5, knowledge: 5, hunger: 10, exp: 8 },
          },
          {
            text: 'Buy something sweet',
            textTH: 'ซื้อของหวาน',
            nextScene: 'ending-perfect',
            vocabulary: [
              { word: 'sweet', ipa: '/swiːt/', reading: 'สวีท', meaning: 'หวาน', example: 'Thai desserts are very sweet.', category: 'noun' },
            ],
            statEffect: { hunger: 10, exp: 3, gold: -5 },
          }
        ]
      },
      'ending-perfect': {
        id: 'ending-perfect',
        contentTH: 'คุณมีความสุขกับอาหาร STREET FOOD และได้ฝึกภาษาอังกฤษ!\n\nWhat a great day! Good food and English practice!',
        content: 'A perfect evening of street food and English conversation!',
        illustration: '🎉',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      }
    }
  }
]
