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
  endingType?: 'good' | 'bad' | 'neutral'
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
    totalScenes: 8,
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
        titleTH: 'scene 1 - หน้าร้าน',
        contentTH: 'คุณเดินเข้ามาในร้านคาเฟ่เล็กๆ อบอุ่น มีกลิ่นกาแฟหอมลอยมา\n\nบาริสต้ายิ้มให้แล้วพูดว่า: "Hi! Welcome! What can I get for you?"',
        content: 'You step inside the cozy cafe. The smell of fresh coffee fills the air. The barista smiles and greets you in English!',
        illustration: '🚪',
        mood: 'calm',
        choices: [
          {
            text: '🗣️ Greet back in English: "Hi! I\'d like a coffee, please."',
            textTH: '🗣️ ทักกลับเป็นอังกฤษ: "Hi! I\'d like a coffee, please."',
            nextScene: 'order-english',
            vocabulary: [
              { word: 'greet', ipa: '/ɡriːt/', reading: 'กรีท', meaning: 'ทักทาย', example: 'She greets customers warmly.', category: 'verb' },
              { word: 'welcome', ipa: '/ˈwɛlkəm/', reading: 'เวล-คัม', meaning: 'ยินดีต้อนรับ', example: 'Welcome to our cafe!', category: 'noun' },
            ],
            statEffect: { speaking: 8, courage: 5, exp: 8 },
            consequence: '✅ เริ่มต้นด้วยความกล้า!',
          },
          {
            text: '🙂 Smile and point at the menu',
            textTH: '🙂 ยิ้มแล้วชี้ที่เมนู',
            nextScene: 'point-order',
            vocabulary: [
              { word: 'menu', ipa: '/ˈmɛnjuː/', reading: 'เม-นิว', meaning: 'เมนู', example: 'Can I see the menu?', category: 'noun' },
            ],
            statEffect: { courage: -3, speaking: 1, exp: 2 },
            consequence: '⚠️ ไม่ได้ฝึกพูด...',
          }
        ]
      },
      'order-english': {
        id: 'order-english',
        titleTH: 'scene 2 - สั่งเป็นอังกฤษ!',
        contentTH: 'บาริสต้ายิ้มกว้าง: "Great English! Our special today is the Caramel Latte. Would you like to try it?"\n\nเขาชมว่าคุณพูดอังกฤษเก่ง!',
        content: 'The barista beams: "Great English! Our special today is the Caramel Latte. Want to try it?"',
        illustration: '💬',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Ask more: "What\'s in it? Is it sweet?"',
            textTH: '🗣️ ถามต่อ: "What\'s in it? Is it sweet?"',
            nextScene: 'conversation',
            vocabulary: [
              { word: 'special', ipa: '/ˈspɛʃəl/', reading: 'สเปเชี่ยล', meaning: 'พิเศษ', example: 'Today\'s special is caramel latte.', category: 'adjective' },
              { word: 'sweet', ipa: '/swiːt/', reading: 'สวีท', meaning: 'หวาน', example: 'Is it sweet?', category: 'adjective' },
            ],
            statEffect: { speaking: 10, knowledge: 5, exp: 10, courage: 5 },
            consequence: '🌟 พูดคุยเป็นอังกฤษได้!',
          },
          {
            text: '👍 Just say "OK, that one"',
            textTH: '👍 แค่พูดว่า "OK, that one"',
            nextScene: 'quick-order',
            statEffect: { speaking: 3, exp: 3 },
            consequence: '🙂 พูดได้นิดหน่อย',
          }
        ]
      },
      'point-order': {
        id: 'point-order',
        titleTH: 'scene 2 - สั่งแบบชี้',
        contentTH: 'บาริสต้าดูงงๆ แล้วถามว่า: "This one? Or this one?"\n\nเขาไม่แน่ใจว่าคุณอยากได้อะไร',
        content: 'The barista looks confused and asks: "This one? Or this one?"',
        illustration: '🤔',
        mood: 'neutral',
        choices: [
          {
            text: '🗣️ Try speaking now: "Sorry! I\'d like the latte, please."',
            textTH: '🗣️ ลองพูดตอนนี้: "Sorry! I\'d like the latte, please."',
            nextScene: 'conversation',
            vocabulary: [
              { word: 'sorry', ipa: '/ˈsɒri/', reading: 'ซอ-รี่', meaning: 'ขอโทษ', example: 'Sorry, I don\'t understand.', category: 'phrase' },
            ],
            statEffect: { speaking: 6, courage: 5, exp: 6 },
            consequence: '💪 แก้ตัวได้!',
          },
          {
            text: '😰 Just point harder and smile',
            textTH: '😰 ชี้แรงขึ้นแล้วยิ้ม',
            nextScene: 'quick-order',
            statEffect: { courage: -5, exp: 1 },
            consequence: '❌ ไม่ได้ฝึกพูดเลย...',
          }
        ]
      },
      'conversation': {
        id: 'conversation',
        titleTH: 'scene 3 - พูดคุยเป็นอังกฤษ!',
        contentTH: 'คุณพูดคุยกับบาริสต้าเป็นภาษาอังกฤษ เขาชมว่าเก่ง!\n\n"My name\'s Tom! You speak English really well. Are you a student?"',
        content: 'You chat with the barista in English. He introduces himself and compliments you!',
        illustration: '🌟',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Keep chatting: "Yes, I\'m learning! How long have you worked here?"',
            textTH: '🗣️ พูดต่อ: "Yes, I\'m learning! How long have you worked here?"',
            nextScene: 'friendship',
            vocabulary: [
              { word: 'learning', ipa: '/ˈlɜːrnɪŋ/', reading: 'เลิร์-นิ่ง', meaning: 'กำลังเรียน', example: 'I am learning English.', category: 'verb' },
              { word: 'student', ipa: '/ˈstjuːdənt/', reading: 'สติว-เด็นท์', meaning: 'นักเรียน', example: 'I am a student.', category: 'noun' },
            ],
            statEffect: { speaking: 12, knowledge: 8, courage: 8, exp: 15, hunger: 10 },
            consequence: '🎉 ได้เพื่อนใหม่!',
            quiz: {
              question: '"How long have you worked here?" asks about...',
              questionTH: '"How long have you worked here?" ถามเกี่ยวกับ...',
              options: ['Duration of employment', 'Daily schedule', 'Salary', 'Job location'],
              correctIndex: 0,
              explanation: '"How long have you worked here?" = ทำงานที่นี่มานานแค่ไหน? (ถามระยะเวลา)',
            }
          },
          {
            text: '😊 Smile and say "Thanks!"',
            textTH: '😊 ยิ้มแล้วพูดว่า "Thanks!"',
            nextScene: 'payment',
            statEffect: { speaking: 3, hunger: 8, exp: 5 },
            consequence: '🙂 ได้แค่ขอบคุณ',
          }
        ]
      },
      'quick-order': {
        id: 'quick-order',
        titleTH: 'scene 3 - สั่งเสร็จแล้ว',
        contentTH: 'คุณได้กาแฟมา 1 แก้ว นั่งจิบคนเดียว\n\nได้กาแฟแต่ไม่ได้คุยกับใคร...',
        content: 'You get your coffee and sit alone. No conversation, just coffee.',
        illustration: '☕',
        mood: 'neutral',
        choices: [
          {
            text: '📖 Look around and try to read English signs',
            textTH: '📖 มองรอบร้านและลองอ่านป้ายภาษาอังกฤษ',
            nextScene: 'payment',
            vocabulary: [
              { word: 'sign', ipa: '/saɪn/', reading: 'ซายน์', meaning: 'ป้าย', example: 'The sign says "Open".', category: 'noun' },
            ],
            statEffect: { knowledge: 5, exp: 5 },
            consequence: '📚 ได้เรียนรู้นิดหน่อย',
          },
          {
            text: '😔 Just drink your coffee quietly',
            textTH: '😔 จิบกาแฟเงียบๆ',
            nextScene: 'payment',
            statEffect: { hunger: 10, exp: 1 },
            consequence: '😐 ไม่ได้อะไรเพิ่ม...',
          }
        ]
      },
      'friendship': {
        id: 'friendship',
        titleTH: 'scene 4 - ได้เพื่อน!',
        contentTH: 'ทอมพูด: "Wow, your English is really good! Here\'s a free cookie — for being such a great customer!"\n\nเขาให้คุกกี้ฟรี!',
        content: 'Tom says: "Your English is great! Here\'s a free cookie — for being such a great customer!"',
        illustration: '🎉',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Thank him: "Thank you so much! I\'ll come back again!"',
            textTH: '🗣️ ขอบคุณ: "Thank you so much! I\'ll come back again!"',
            nextScene: 'ending-good',
            vocabulary: [
              { word: 'customer', ipa: '/ˈkʌstəmər/', reading: 'คัส-ตอ-เมอร์', meaning: 'ลูกค้า', example: 'Thank you for being a great customer.', category: 'noun' },
              { word: 'cookie', ipa: '/ˈkʊki/', reading: 'คุ๊ก-กี่', meaning: 'คุกกี้', example: 'This cookie is delicious!', category: 'noun' },
            ],
            statEffect: { speaking: 10, courage: 5, hunger: 15, exp: 12, gold: 10 },
            consequence: '🌟 ได้เพื่อน + คุกกี้ฟรี!',
          },
          {
            text: '😊 Just take the cookie and smile',
            textTH: '😊 รับคุกกี้แล้วยิ้ม',
            nextScene: 'ending-neutral',
            statEffect: { hunger: 15, exp: 3 },
            consequence: '🙂 ได้คุกกี้แต่ไม่ได้คุย',
          }
        ]
      },
      'payment': {
        id: 'payment',
        titleTH: 'scene 4 - จ่ายเงิน',
        contentTH: 'คุณเดินไปจ่ายเงิน ราคา 120 บาท\n\nYou walk to the counter to pay.',
        content: 'You walk to the counter. The bill is 120 baht.',
        illustration: '💰',
        mood: 'calm',
        choices: [
          {
            text: '🗣️ Say "Here you go. Thank you!"',
            textTH: '🗣️ พูดว่า "Here you go. Thank you!"',
            nextScene: 'ending-neutral',
            vocabulary: [
              { word: 'here you go', ipa: '/hɪər juː ɡoʊ/', reading: 'เฮีย ยู โก', meaning: 'นี่เลย', example: 'Here you go. That\'s 120 baht.', category: 'phrase' },
            ],
            statEffect: { speaking: 5, exp: 5, hunger: 5 },
            consequence: '✅ พูดได้บ้าง',
          },
          {
            text: '💵 Just pay silently',
            textTH: '💵 จ่ายเงินเงียบๆ',
            nextScene: 'ending-bad',
            statEffect: { hunger: 3, exp: 1 },
            consequence: '❌ ไม่ได้ฝึกพูดเลย',
          }
        ]
      },
      'ending-good': {
        id: 'ending-good',
        contentTH: '🎉 คุณเดินออกจากคาเฟ่ด้วยรอยยิ้ม!\n\nวันนี้ได้ฝึกพูดภาษาอังกฤษ ได้เพื่อนใหม่ ได้คุกกี้ฟรี!\n\n"You did great today! Your English improved so much!"',
        content: 'You walk out of the cafe with a big smile! Today you practiced English, made a friend, and got a free cookie!',
        illustration: '🎉',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      },
      'ending-neutral': {
        id: 'ending-neutral',
        contentTH: 'คุณนั่งจิบกาแฟ ได้คาเฟ่อบอุ่น แต่รู้สึกว่าน่าจะพูดมากกว่านี้\n\nYou enjoy the coffee, but wish you had spoken more English.',
        content: 'The coffee was good, but you feel like you missed an opportunity to practice.',
        illustration: '☕',
        mood: 'neutral',
        isEnding: true,
        endingType: 'neutral'
      },
      'ending-bad': {
        id: 'ending-bad',
        contentTH: 'คุณเดินออกจากร้านคาเฟ่ รู้สึกเสียดายที่ไม่ได้ลองพูดภาษาอังกฤษเลย\n\nMaybe next time, you\'ll try speaking English...',
        content: 'You leave the cafe feeling regretful. You had a chance to practice but didn\'t take it.',
        illustration: '😔',
        mood: 'tense',
        isEnding: true,
        endingType: 'bad'
      }
    }
  },
  {
    id: 'lost-temple',
    title: 'The Lost Temple',
    titleTH: 'วัดลึกลับ',
    emoji: '🏛️',
    coverGradient: 'from-emerald-900/30 to-teal-900/40',
    totalScenes: 9,
    startScene: 'temple-entrance',
    goal: {
      title: 'Treasure Hunter',
      titleTH: 'นักล่าสมบัติ',
      icon: '💎',
      steps: [
        { sceneId: 'solve-puzzle', labelTH: 'แก้ปริศนา', labelEN: 'Solve puzzle' },
        { sceneId: 'ending-treasure', labelTH: 'ได้สมบัติ', labelEN: 'Get treasure' },
      ]
    },
    scenes: {
      'temple-entrance': {
        id: 'temple-entrance',
        titleTH: 'scene 1 - ทางเข้า',
        contentTH: 'คุณยืนอยู่หน้าทางเข้าวัดโบราณ มีแสงลอดผ่านซุ้มประตู\n\nมีป้ายเขียนว่า: "Only the wise may enter"\n\nก่อนทางเข้ามีรูปปั้นถือแผ่นจารึก',
        content: 'You stand before an ancient temple. A sign reads: "Only the wise may enter." Stone statues hold tablets at the entrance.',
        illustration: '🏛️',
        mood: 'mysterious',
        choices: [
          {
            text: '📖 Read the inscription carefully',
            textTH: '📖 อ่านจารึกอย่างถี่ถ้วน',
            nextScene: 'inscription',
            vocabulary: [
              { word: 'ancient', ipa: '/ˈeɪnʃənt/', reading: 'เอ็น-เชี่ยนท์', meaning: 'โบราณ', example: 'This is an ancient temple.', category: 'adjective' },
              { word: 'inscription', ipa: '/ɪnˈskrɪpʃən/', reading: 'อิน-สคริพ-ชั่น', meaning: 'จารึก', example: 'Read the inscription on the wall.', category: 'noun' },
            ],
            statEffect: { knowledge: 8, courage: 5, exp: 8 },
            consequence: '📚 ได้เบาะแส!',
          },
          {
            text: '🏃 Rush in without reading',
            textTH: '🏃 วิ่งเข้าไปเลยไม่อ่าน',
            nextScene: 'rush-in',
            statEffect: { courage: 3, knowledge: -5, exp: 2 },
            consequence: '⚠️ ไม่อ่านเบาะแส...',
          }
        ]
      },
      'inscription': {
        id: 'inscription',
        titleTH: 'scene 2 - จารึกโบราณ',
        contentTH: 'คุณอ่านจารึกเขียนว่า: "The answer to all riddles lies within. Seek knowledge, not greed."\n\nแปลว่า: "คำตอบของปริศนาอยู่ข้างใน แสวงหาความรู้ ไม่ใช่ความโลภ"',
        content: 'The inscription reads: "The answer to all riddles lies within. Seek knowledge, not greed."',
        illustration: '📜',
        mood: 'mysterious',
        choices: [
          {
            text: '🧠 Think carefully about the meaning',
            textTH: '🧠 คิดให้ดีเกี่ยวกับความหมาย',
            nextScene: 'main-hall',
            vocabulary: [
              { word: 'riddle', ipa: '/ˈrɪdəl/', reading: 'ริด-เดิล', meaning: 'ปริศนา', example: 'Can you solve this riddle?', category: 'noun' },
              { word: 'knowledge', ipa: '/ˈnɒlɪdʒ/', reading: 'นอ-ลิดจ์', meaning: 'ความรู้', example: 'Knowledge is power.', category: 'noun' },
            ],
            statEffect: { knowledge: 10, courage: 5, exp: 10 },
            consequence: '🌟 เข้าใจเบาะแส!',
          },
          {
            text: '💰 "Forget the riddle, find the treasure!"',
            textTH: '💰 "ไม่สนปริศนา หาสมบัติเลย!"',
            nextScene: 'greedy-path',
            statEffect: { courage: 5, knowledge: -10, gold: 5, exp: 2 },
            consequence: '❌ ไม่สนความรู้...',
          }
        ]
      },
      'rush-in': {
        id: 'rush-in',
        titleTH: 'scene 2b - วิ่งเข้าไป',
        contentTH: 'คุณวิ่งเข้าไปในวัดโดยไม่อ่านอะไร\n\nข้างในมีห้อง 3 ห้อง แต่คุณไม่รู้ว่าจะเข้าห้องไหน\n\nThere are 3 doors but you have no idea which to choose.',
        content: 'You rush in and find 3 doors. Without reading the inscription, you have no clues.',
        illustration: '🚪',
        mood: 'tense',
        choices: [
          {
            text: '🔙 Go back and read the inscription',
            textTH: '🔙 กลับไปอ่านจารึก',
            nextScene: 'inscription',
            vocabulary: [
              { word: 'inscribe', ipa: '/ɪnˈskraɪb/', reading: 'อิน-สไบบ์', meaning: 'จารึก', example: 'Words are inscribed on the stone.', category: 'verb' },
            ],
            statEffect: { courage: 3, knowledge: 5, exp: 5 },
            consequence: '💪 กลับไปหาเบาะแส!',
          },
          {
            text: '🎲 Pick a random door',
            textTH: '🎲 เลือกประตูมั่วๆ',
            nextScene: 'ending-lost',
            statEffect: { courage: 2, exp: 1 },
            consequence: '❌ เสี่ยงเกินไป!',
          }
        ]
      },
      'greedy-path': {
        id: 'greedy-path',
        titleTH: 'scene 2c - เส้นทางโลภ',
        contentTH: 'คุณเดินเข้าไปในห้องมืด มีกับดัก!\n\nYou walk into a dark room. There are traps!',
        content: 'You walk into a dark room. Traps are everywhere!',
        illustration: '⚠️',
        mood: 'tense',
        choices: [
          {
            text: '🔍 Look for clues to avoid traps',
            textTH: '🔍 หาเบาะแสเพื่อหลบกับดัก',
            nextScene: 'main-hall',
            vocabulary: [
              { word: 'trap', ipa: '/træp/', reading: 'ทรัป', meaning: 'กับดัก', example: 'Be careful of the traps!', category: 'noun' },
              { word: 'clue', ipa: '/kluː/', reading: 'คลู', meaning: 'เบาะแส', example: 'Look for clues.', category: 'noun' },
            ],
            statEffect: { knowledge: 5, courage: 5, exp: 5 },
            consequence: '💪 แก้ตัวได้!',
          },
          {
            text: '🏃 Just run through',
            textTH: '🏃 วิ่งผ่านไปเลย',
            nextScene: 'ending-trapped',
            statEffect: { hp: -30, courage: -5, exp: 1 },
            consequence: '❌ บาดเจ็บ!',
          }
        ]
      },
      'main-hall': {
        id: 'main-hall',
        titleTH: 'scene 3 - ห้องโถง',
        contentTH: 'ห้องโถงใหญ่มีภาพจิตรกรรมบนผนัง ตรงกลางมีหีบสมบัติล็อคอยู่\n\nบนหีบเขียนว่า: "Speak the password to open"\n\nข้างหีบมีแผ่นจารึกเขียนว่า: "The password is the answer: What has keys but no locks?"',
        content: 'The grand hall has a locked treasure chest. A tablet says: "Speak the password. What has keys but no locks?"',
        illustration: '🔷',
        mood: 'mysterious',
        choices: [
          {
            text: '🗣️ Speak the answer in English: "A piano!"',
            textTH: '🗣️ พูดคำตอบเป็นอังกฤษ: "A piano!"',
            nextScene: 'puzzle-solved',
            vocabulary: [
              { word: 'piano', ipa: '/piˈænoʊ/', reading: 'เปีย-โน่', meaning: 'เปียโน', example: 'A piano has keys but no locks.', category: 'noun' },
              { word: 'password', ipa: '/ˈpæswɜːrd/', reading: 'พาร์ส-เวิร์ด', meaning: 'รหัสผ่าน', example: 'What is the password?', category: 'noun' },
            ],
            statEffect: { knowledge: 15, speaking: 10, exp: 15 },
            consequence: '🎉 แก้ปริศนาสำเร็จ!',
          },
          {
            text: '🔑 Try to pick the lock',
            textTH: '🔑 ลองงัดล็อค',
            nextScene: 'ending-trapped',
            statEffect: { courage: -5, hp: -10, exp: 1 },
            consequence: '❌ ล็อคแข็งเกินไป!',
          }
        ]
      },
      'puzzle-solved': {
        id: 'puzzle-solved',
        titleTH: 'scene 4 - หีบเปิด!',
        contentTH: 'หีบสมบัติเปิดออก! ข้างในมีทองคำและอัญมณี!\n\nแต่บนฝาหีบเขียนว่า: "Take only what you need. Greed brings curse."\n\n"เอาเฉพาะที่จำเป็น ความโลภนำมาซึ่งคำสาป"',
        content: 'The chest opens! Inside are gold and jewels. But a warning reads: "Take only what you need. Greed brings curse."',
        illustration: '💎',
        mood: 'cheerful',
        choices: [
          {
            text: '⚖️ Take only a few treasures, leave some for others',
            textTH: '⚖️ เอาแค่บางส่วน ทิ้งไว้ให้คนอื่นบ้าง',
            nextScene: 'ending-treasure',
            vocabulary: [
              { word: 'treasure', ipa: '/ˈtrɛʒər/', reading: 'เทร-เชอร์', meaning: 'สมบัติ', example: 'The treasure is beautiful.', category: 'noun' },
              { word: 'greed', ipa: '/ɡriːd/', reading: 'กรีด', meaning: 'ความโลภ', example: 'Greed is not good.', category: 'noun' },
            ],
            statEffect: { knowledge: 10, courage: 5, gold: 20, exp: 15 },
            consequence: '🌟 ฉลาดและพอเพียง!',
          },
          {
            text: '💰 "I want ALL the treasure!"',
            textTH: '💰 "เอาให้หมดเลย!"',
            nextScene: 'ending-cursed',
            statEffect: { gold: 50, courage: -10, knowledge: -10, exp: 5, hp: -30 },
            consequence: '❌ ถูกสาป!',
          }
        ]
      },
      'ending-treasure': {
        id: 'ending-treasure',
        contentTH: '🎉 คุณได้สมบัติอย่างพอเพียง!\n\nวิญญาณของวัดพูดว่า: "You are wise. The treasure is yours."\n\n"เจ้าเป็นผู้ฉลาด สมบัติเป็นของเจ้า"\n\nคุณเดินออกจากวัดด้วยความภูมิใจ!',
        content: 'You wisely take only what you need! The temple spirit says: "You are wise. The treasure is yours."',
        illustration: '💎',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      },
      'ending-cursed': {
        id: 'ending-cursed',
        contentTH: '👻 คุณคว้าสมบัติทั้งหมด!\n\nวิญญาณพูดว่า: "Greed will be your undoing!"\n\nหีบปิดลง สมบัติหายไปหมด เหลือแค่คุณกับความว่างเปล่า\n\nบางครั้งความรู้สำคัญกว่าเงิน...',
        content: 'You grab everything! The spirit cries: "Greed will be your undoing!" The chest closes, treasure vanishes.',
        illustration: '👻',
        mood: 'tense',
        isEnding: true,
        endingType: 'bad'
      },
      'ending-lost': {
        id: 'ending-lost',
        contentTH: '😰 คุณเลือกประตูมั่วๆ แล้วหลงอยู่ในเขาวงกต!\n\nกว่าจะหาทางออกได้ก็หมดวัน\n\nMaybe next time, read the signs first...',
        content: 'You pick a random door and get lost in a maze. By the time you find the exit, the day is gone.',
        illustration: '😰',
        mood: 'tense',
        isEnding: true,
        endingType: 'bad'
      },
      'ending-trapped': {
        id: 'ending-trapped',
        contentTH: '😱 คุณถูกกับดักจับได้! ต้องรอให้คนมาช่วย\n\nNever rush into danger without thinking...',
        content: 'You fall into a trap! You wait for someone to rescue you.',
        illustration: '😱',
        mood: 'tense',
        isEnding: true,
        endingType: 'bad'
      }
    }
  },
  {
    id: 'street-food',
    title: 'Street Food Adventure',
    titleTH: 'ผจญภัยอาหารริมทาง',
    emoji: '🍜',
    coverGradient: 'from-red-900/30 to-orange-900/40',
    totalScenes: 8,
    startScene: 'street-entrance',
    goal: {
      title: 'Food Explorer',
      titleTH: 'นักสำรวจอาหาร',
      icon: '🍽️',
      steps: [
        { sceneId: 'ask-vendor', labelTH: 'ถามแม่ค้า', labelEN: 'Ask the vendor' },
        { sceneId: 'ending-perfect', labelTH: 'มีความสุข', labelEN: 'Happy ending' },
      ]
    },
    scenes: {
      'street-entrance': {
        id: 'street-entrance',
        titleTH: 'scene 1 - ตลาดนัด',
        contentTH: 'คุณเดินเข้าตลาดนัด มีอาหารหลายร้าน กลิ่นหอมลอยมา\n\nแม่ค้าตะโกนว่า: "Come try! Very delicious!"',
        content: 'You enter a night market. Food vendors call out: "Come try! Very delicious!"',
        illustration: '🛒',
        mood: 'calm',
        choices: [
          {
            text: '🗣️ Ask in English: "What do you recommend?"',
            textTH: '🗣️ ถามเป็นอังกฤษ: "What do you recommend?"',
            nextScene: 'ask-vendor',
            vocabulary: [
              { word: 'recommend', ipa: '/ˌrɛkəˈmɛnd/', reading: 'เรค-คา-เมนด์', meaning: 'แนะนำ', example: 'What do you recommend?', category: 'verb' },
              { word: 'delicious', ipa: '/dɪˈlɪʃəs/', reading: 'ดิ-ลิ-เชิส', meaning: 'อร่อย', example: 'This food is delicious!', category: 'adjective' },
            ],
            statEffect: { speaking: 8, courage: 5, exp: 8 },
            consequence: '🌟 เริ่มต้นดี!',
          },
          {
            text: '😐 Walk around silently',
            textTH: '😐 เดินดูเงียบๆ',
            nextScene: 'walking',
            statEffect: { exp: 1 },
            consequence: '😐 ไม่ได้ฝึกพูด',
          }
        ]
      },
      'ask-vendor': {
        id: 'ask-vendor',
        titleTH: 'scene 2 - ถามแม่ค้า',
        contentTH: 'แม่ค้ายิ้ม: "Our best seller is Pad Thai! It\'s spicy and sweet. Very Thai style!"\n\n"ขายดีสุดคือผัดไทย! เผ็ดและหวาน สไตล์ไทยมาก!"',
        content: 'The vendor smiles: "Our best seller is Pad Thai! It\'s spicy and sweet!"',
        illustration: '🍜',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Ask more: "How much? And is it very spicy?"',
            textTH: '🗣️ ถามต่อ: "How much? And is it very spicy?"',
            nextScene: 'negotiate',
            vocabulary: [
              { word: 'spicy', ipa: '/ˈspaɪsi/', reading: 'สไป-ซี่', meaning: 'เผ็ด', example: 'Is it very spicy?', category: 'adjective' },
              { word: 'how much', ipa: '/haʊ mʌtʃ/', reading: 'ฮาว มัทช์', meaning: 'ราคาเท่าไร', example: 'How much is this?', category: 'phrase' },
            ],
            statEffect: { speaking: 10, knowledge: 5, exp: 10 },
            consequence: '🌟 ถามเก่ง!',
          },
          {
            text: '👍 Just say "OK, one please"',
            textTH: '👍 แค่พูดว่า "OK, one please"',
            nextScene: 'food-eating',
            statEffect: { speaking: 3, hunger: 10, exp: 3, gold: -20 },
            consequence: '🙂 สั่งได้',
          }
        ]
      },
      'walking': {
        id: 'walking',
        titleTH: 'scene 2b - เดินดู',
        contentTH: 'คุณเดินผ่านหลายร้าน แต่ไม่ได้ถามอะไร\n\nแม่ค้ามองงงๆ เพราะคุณแค่เดินผ่าน\n\nVendor looks confused as you just walk by.',
        content: 'You walk past several stalls without saying anything. Vendors look confused.',
        illustration: '🚶',
        mood: 'neutral',
        choices: [
          {
            text: '🗣️ Go back and ask a vendor in English',
            textTH: '🗣️ กลับไปถามแม่ค้าเป็นอังกฤษ',
            nextScene: 'ask-vendor',
            vocabulary: [
              { word: 'vendor', ipa: '/ˈvɛndər/', reading: 'เวน-เดอร์', meaning: 'แม่ค้า', example: 'The vendor is friendly.', category: 'noun' },
            ],
            statEffect: { speaking: 5, courage: 5, exp: 5 },
            consequence: '💪 กลับมาแก้ตัว!',
          },
          {
            text: '😔 Just buy something without talking',
            textTH: '😔 ซื้อโดยไม่พูดอะไร',
            nextScene: 'food-eating',
            statEffect: { hunger: 8, gold: -15, exp: 1 },
            consequence: '❌ ไม่ได้ฝึกพูดเลย',
          }
        ]
      },
      'negotiate': {
        id: 'negotiate',
        titleTH: 'scene 3 - ต่อรอง',
        contentTH: 'แม่ค้าพูด: "Only 50 baht! Very cheap for such good food!"\n\nคุณได้เรียนรู้วิธีสั่งอาหารเป็นอังกฤษ!',
        content: 'The vendor says: "Only 50 baht! Very cheap for good food!"',
        illustration: '💰',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Say: "I\'ll take it! Can I also get some water?"',
            textTH: '🗣️ พูดว่า: "I\'ll take it! Can I also get some water?"',
            nextScene: 'food-eating',
            vocabulary: [
              { word: 'water', ipa: '/ˈwɔːtər/', reading: 'วอ-เตอร์', meaning: 'น้ำ', example: 'Can I get some water?', category: 'noun' },
              { word: 'take', ipa: '/teɪk/', reading: 'เทค', meaning: 'เอา', example: 'I\'ll take it.', category: 'verb' },
            ],
            statEffect: { speaking: 10, knowledge: 5, hunger: 12, exp: 10, gold: -15 },
            consequence: '🌟 สั่งเก่งมาก!',
          },
          {
            text: '😊 Just smile and pay',
            textTH: '😊 ยิ้มแล้วจ่ายเงิน',
            nextScene: 'food-eating',
            statEffect: { hunger: 10, gold: -15, exp: 2 },
            consequence: '🙂 ได้กินแต่ไม่ได้ฝึกพูด',
          }
        ]
      },
      'food-eating': {
        id: 'food-eating',
        titleTH: 'scene 4 - กิน!',
        contentTH: 'คุณนั่งกินอาหารริมทาง อร่อยมาก!\n\nมีนักดนตรีข้างทางเปิดเพลงสนุกๆ\n\nA musician plays fun music nearby!',
        content: 'You enjoy delicious street food. A musician plays nearby!',
        illustration: '🎵',
        mood: 'cheerful',
        choices: [
          {
            text: '🗣️ Thank the vendor: "This is amazing! Thank you so much!"',
            textTH: '🗣️ ขอบคุณแม่ค้า: "This is amazing! Thank you so much!"',
            nextScene: 'ending-perfect',
            vocabulary: [
              { word: 'amazing', ipa: '/əˈmeɪzɪŋ/', reading: 'อะ-เม-ซิ่ง', meaning: 'น่าทึ่ง', example: 'The food is amazing!', category: 'adjective' },
            ],
            statEffect: { speaking: 8, courage: 5, hunger: 15, exp: 10 },
            consequence: '🌟 ขอบคุณเก่ง!',
          },
          {
            text: '🍽️ Just eat and enjoy',
            textTH: '🍽️ กินอย่างเดียว',
            nextScene: 'ending-neutral',
            statEffect: { hunger: 15, exp: 3 },
            consequence: '🙂 อร่อยแต่ไม่ได้ฝึก',
          }
        ]
      },
      'ending-perfect': {
        id: 'ending-perfect',
        contentTH: '🎉 คุณมีความสุขกับอาหาร STREET FOOD และได้ฝึกภาษาอังกฤษ!\n\nแม่ค้ายิ้ม: "You are so nice! Come back anytime!"\n\nวันนี้ได้ทั้งอาหารอร่อย ได้ฝึกภาษา ได้เพื่อนใหม่!',
        content: 'What a perfect day! Great food, English practice, and a new friend!',
        illustration: '🎉',
        mood: 'cheerful',
        isEnding: true,
        endingType: 'good'
      },
      'ending-neutral': {
        id: 'ending-neutral',
        contentTH: 'คุณได้กินอาหารอร่อย แต่รู้สึกว่าน่าจะลองพูดมากกว่านี้\n\nThe food was good, but you feel like you could have practiced more.',
        content: 'The food was good, but you missed a chance to practice English.',
        illustration: '🍜',
        mood: 'neutral',
        isEnding: true,
        endingType: 'neutral'
      }
    }
  }
]
