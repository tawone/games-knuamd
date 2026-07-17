export interface StoryChoice {
  text: string
  textTH: string
  nextScene: string
  vocabulary?: { word: string; meaning: string }[]
  consequence?: string
}

export interface StoryScene {
  id: string
  title?: string
  content: string
  contentTH: string
  mood?: 'calm' | 'exciting' | 'mysterious' | 'warm' | 'tense' | 'happy'
  illustration?: string
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
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  descriptionTH: string
  estimatedMinutes: number
  totalScenes: number
  scenes: { [key: string]: StoryScene }
  startScene: string
}

export const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

export const moodStyles: Record<string, { bg: string; icon: string; label: string }> = {
  calm: { bg: 'from-blue-400/20 to-cyan-400/20', icon: '🌊', label: 'เงียบสงบ' },
  exciting: { bg: 'from-orange-400/20 to-red-400/20', icon: '⚡', label: 'ตื่นเต้น' },
  mysterious: { bg: 'from-purple-400/20 to-indigo-400/20', icon: '🔮', label: 'ลึกลับ' },
  warm: { bg: 'from-amber-400/20 to-yellow-400/20', icon: '☀️', label: 'อบอุ่น' },
  tense: { bg: 'from-red-400/20 to-pink-400/20', icon: '😰', label: 'ตึงเครียด' },
  happy: { bg: 'from-green-400/20 to-emerald-400/20', icon: '🎉', label: 'มีความสุข' },
}

export const stories: Story[] = [
  {
    id: 'cafe-adventure',
    title: 'The Coffee Shop',
    titleTH: 'ร้านกาแฟ',
    emoji: '☕',
    coverGradient: 'from-amber-600 via-orange-500 to-yellow-500',
    difficulty: 'beginner',
    description: 'A warm story about discovering a new coffee shop',
    descriptionTH: 'เรื่องอบอุ่นเกี่ยวกับการค้นพบร้านกาแฟใหม่',
    estimatedMinutes: 3,
    totalScenes: 8,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'Chapter 1: A Beautiful Morning',
        illustration: '🌅',
        mood: 'warm',
        content: 'You wake up and feel hungry. You decide to walk to the new coffee shop near your school. The sun is bright and the air is warm. You see a small sign that says "Welcome!"',
        contentTH: 'คุณตื่นขึ้นมาและรู้สึกหิว คุณตัดสินใจเดินไปที่ร้านกาแฟใหม่ใกล้โรงเรียน แดดจ้าและอากาศอบอุ่น คุณเห็นป้ายเล็กๆ เขียนว่า "ยินดีต้อนรับ!"',
        choices: [
          { text: 'Walk inside the coffee shop', textTH: 'เดินเข้าไปในร้านกาแฟ', nextScene: 'inside', vocabulary: [{ word: 'walk', meaning: 'เดิน' }, { word: 'inside', meaning: 'ข้างใน' }] },
          { text: 'Look at the menu outside', textTH: 'ดูเมนูข้างนอก', nextScene: 'menu', vocabulary: [{ word: 'menu', meaning: 'เมนู' }, { word: 'outside', meaning: 'ข้างนอก' }] },
        ],
      },
      menu: {
        id: 'menu',
        title: 'The Menu',
        illustration: '📋',
        mood: 'calm',
        content: 'The menu has many drinks. Coffee 40 baht, Tea 30 baht, Juice 35 baht, Water 15 baht. There\'s also a sign: "Today\'s special: Iced Latte for 50 baht!"',
        contentTH: 'เมนูมีเครื่องดื่มหลายอย่าง กาแฟ 40 บาท ชา 30 บาท น้ำผลไม้ 35 บาท น้ำ 15 บาท มีป้ายด้วย "พิเศษวันนี้: ไอซ์ลาเต้ 50 บาท!"',
        choices: [
          { text: 'Go inside and order', textTH: 'เข้าไปสั่งในร้าน', nextScene: 'inside' },
          { text: 'Check out the desserts', textTH: 'ดูของหวานด้วย', nextScene: 'desserts', vocabulary: [{ word: 'special', meaning: 'พิเศษ' }, { word: 'order', meaning: 'สั่ง' }] },
        ],
      },
      desserts: {
        id: 'desserts',
        title: 'Sweet Treats',
        illustration: '🍰',
        mood: 'happy',
        content: 'You see cake, cookies, and croissants. Everything looks delicious! Your wallet has 100 baht.',
        contentTH: 'คุณเห็นเค้ก คุกกี้ และครัวซองต์ ทุกอย่างน่าอร่อย! กระเป๋าสตางค์มี 100 บาท',
        choices: [
          { text: 'Go inside and order food and drink', textTH: 'เข้าไปสั่งอาหารและเครื่องดื่ม', nextScene: 'order-food', vocabulary: [{ word: 'delicious', meaning: 'อร่อย' }, { word: 'wallet', meaning: 'กระเป๋าสตางค์' }] },
          { text: 'Just get a drink', textTH: 'แค่สั่งเครื่องดื่ม', nextScene: 'inside' },
        ],
      },
      inside: {
        id: 'inside',
        title: 'Welcome In',
        illustration: '✨',
        mood: 'warm',
        content: 'Inside the shop, it\'s cool and quiet. Soft music plays. A friendly barista smiles and says, "Hello! What would you like?"',
        contentTH: 'ในร้านอากาศเย็นและเงียบ มีเพลงเบาๆ พนักงานยิ้มและพูดว่า "สวัสดี! ต้องการอะไร?"',
        choices: [
          { text: '"Coffee, please"', textTH: '"กาแฟ ขอบคุณ"', nextScene: 'order-coffee', vocabulary: [{ word: 'friendly', meaning: 'เป็นมิตร' }, { word: 'quiet', meaning: 'เงียบ' }] },
          { text: '"What do you recommend?"', textTH: '"แนะนำอะไรดี?"', nextScene: 'recommend' },
        ],
      },
      recommend: {
        id: 'recommend',
        title: 'A Good Choice',
        illustration: '👍',
        mood: 'happy',
        content: '"I recommend our Thai tea latte! It\'s sweet and creamy — only 45 baht." You try it and it\'s delicious!',
        contentTH: '"แนะนำลาเต้ชาไทย! หวานและหอมมัน แค่ 45 บาท" คุณลองชิม อร่อยมาก!',
        choices: [
          { text: 'Stay and read a book', textTH: 'อยู่อ่านหนังสือ', nextScene: 'ending-peaceful', vocabulary: [{ word: 'recommend', meaning: 'แนะนำ' }, { word: 'creamy', meaning: 'หอมมัน' }] },
          { text: 'Talk to the barista', textTH: 'คุยกับพนักงาน', nextScene: 'talk' },
        ],
      },
      'order-food': {
        id: 'order-food',
        title: 'Order Up!',
        illustration: '🧋',
        mood: 'exciting',
        content: 'You order a latte (50 baht) and a croissant (35 baht). Total: 85 baht. "Great choice! Ready in 3 minutes," the barista says.',
        contentTH: 'คุณสั่งลาเต้ (50 บาท) และครัวซองต์ (35 บาท) รวม 85 บาท "เลือกดีมาก! เสร็จใน 3 นาที" พนักงานพูด',
        choices: [
          { text: 'Wait and look around', textTH: 'รอและดูรอบๆ', nextScene: 'ending-cozy', vocabulary: [{ word: 'total', meaning: 'รวม' }, { word: 'choice', meaning: 'ทางเลือก' }] },
          { text: 'Check your phone', textTH: 'ดูมือถือ', nextScene: 'phone' },
        ],
      },
      'order-coffee': {
        id: 'order-coffee',
        title: 'Your Coffee',
        illustration: '☕',
        mood: 'happy',
        content: 'You order coffee for 40 baht. The barista prepares it quickly. "Here you go! Enjoy!" You take a sip — it tastes delicious!',
        contentTH: 'คุณสั่งกาแฟ 40 บาท พนักงานเตรียมเร็ว "นี่เลยครับ! ดื่มให้อร่อย!" คุณจิบ — อร่อยมาก!',
        choices: [
          { text: 'Read a book by the window', textTH: 'อ่านหนังสือข้างหน้าต่าง', nextScene: 'ending-peaceful', vocabulary: [{ word: 'enjoy', meaning: 'เพลิดเพลิน' }, { word: 'prepare', meaning: 'เตรียม' }] },
          { text: 'Talk to the barista', textTH: 'คุยกับพนักงาน', nextScene: 'talk' },
        ],
      },
      talk: {
        id: 'talk',
        title: 'A Nice Chat',
        illustration: '💬',
        mood: 'warm',
        content: '"This is a really nice shop!" you say. "Thank you! I just opened it last week. I love making coffee for people," the barista says proudly.',
        contentTH: '"ร้านนี้สวยมากเลย!" คุณพูด "ขอบคุณครับ! เพิ่งเปิดได้สัปดาห์เดียว ผมชอบชงกาแฟให้คน" พนักงานภูมิใจ',
        choices: [
          { text: '"I\'ll come back again!"', textTH: '"จะกลับมาอีกนะ!"', nextScene: 'ending-support', vocabulary: [{ word: 'proud', meaning: 'ภูมิใจ' }, { word: 'open', meaning: 'เปิด' }] },
        ],
      },
      phone: {
        id: 'phone',
        title: 'A Friend!',
        illustration: '📱',
        mood: 'exciting',
        content: 'Your friend texts: "Where are you? I want to come too!" You see them walking toward the shop.',
        contentTH: 'เพื่อนส่งข้อความมา: "อยู่ไหน? อยากไปด้วย!" คุณเห็นเพื่อนเดินมาที่ร้าน',
        choices: [
          { text: 'Invite them in', textTH: 'ชวนเข้ามา', nextScene: 'ending-friends', vocabulary: [{ word: 'friend', meaning: 'เพื่อน' }, { word: 'text', meaning: 'ส่งข้อความ' }] },
        ],
      },
      'ending-cozy': {
        id: 'ending-cozy',
        illustration: '🌿',
        mood: 'calm',
        isEnding: true,
        endingType: 'good',
        content: 'You find a cozy seat near the window. Plants hang from the ceiling. Books and board games line the shelves. You feel relaxed and happy. This is a great place! 🌿',
        contentTH: 'คุณหาที่นั่งสบายๆ ข้างหน้าต่าง ต้นไม้ห้อยจากเพดาน มีหนังสือและเกม คุณรู้สึกผ่อนคลายและมีความสุข 🌿',
      },
      'ending-peaceful': {
        id: 'ending-peaceful',
        illustration: '📖',
        mood: 'calm',
        isEnding: true,
        endingType: 'neutral',
        content: 'You sit by the window and read a book. The coffee is warm, the music is relaxing, and a cat curls up at your feet. Sometimes the best moments are the quiet ones. 📖',
        contentTH: 'คุณนั่งข้างหน้าต่างอ่านหนังสือ กาแฟอุ่น เพลงผ่อนคลาย แมวขดตัวที่เท้า บางครั้งช่วงเวลาที่ดีที่สุดคือช่วงเงียบสงบ 📖',
      },
      'ending-friends': {
        id: 'ending-friends',
        illustration: '👫',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'Your friend comes in and orders a drink too. You sit together, chat, laugh, and share stories. The best part of a coffee shop is sharing it with friends! 👫',
        contentTH: 'เพื่อนเข้ามาและสั่งเครื่องดื่มด้วย คุณนั่งด้วยกัน พูดคุย หัวเราะ แบ่งปันเรื่องราว ส่วนที่ดีที่สุดคือการแบ่งปันกับเพื่อน! 👫',
      },
      'ending-support': {
        id: 'ending-support',
        illustration: '💛',
        mood: 'warm',
        isEnding: true,
        endingType: 'good',
        content: '"I\'ll tell my friends about this place!" The barista\'s eyes light up. "That means so much. Thank you for supporting my dream!" You feel warm inside. 💛',
        contentTH: '"จะบอกเพื่อนๆ เรื่องที่นี่!" พนักงานตาเป็นประกาย "ขอบคุณมาก ขอบคุณที่สนับสนุนความฝันของผม!" คุณรู้สึกอบอุ่นภายใน 💛',
      },
    },
  },
  {
    id: 'temple-mystery',
    title: 'The Temple Mystery',
    titleTH: 'ปริศนาวัด',
    emoji: '🛕',
    coverGradient: 'from-amber-700 via-red-600 to-purple-700',
    difficulty: 'intermediate',
    description: 'Explore a mysterious old temple',
    descriptionTH: 'สำรวจวัดเก่าลึกลับ',
    estimatedMinutes: 4,
    totalScenes: 8,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'The Assignment',
        illustration: '📋',
        mood: 'mysterious',
        content: 'Your teacher gives you a mission: visit the old temple and find a hidden message. The temple is 200 years old. You arrive at the gate. It\'s dark and quiet.',
        contentTH: 'ครูมอบภารกิจ: ไปที่วัดเก่าและหาข้อความที่ซ่อนอยู่ วัดมีอายุ 200 ปี คุณมาถึงประตู มืดและเงียบ',
        choices: [
          { text: 'Enter through the main gate', textTH: 'เข้าประตูหลัก', nextScene: 'main-hall', vocabulary: [{ word: 'mission', meaning: 'ภารกิจ' }, { word: 'hidden', meaning: 'ซ่อน' }] },
          { text: 'Walk around and look for another way', textTH: 'เดินอ้อมหาทางอื่น', nextScene: 'side-path', vocabulary: [{ word: 'gate', meaning: 'ประตู' }, { word: 'dark', meaning: 'มืด' }] },
        ],
      },
      'main-hall': {
        id: 'main-hall',
        title: 'The Main Hall',
        illustration: '🏛️',
        mood: 'mysterious',
        content: 'The main hall has old paintings on the walls. In the center, there\'s a golden Buddha statue. You notice a small door behind it with three locks.',
        contentTH: 'ห้องโถงใหญ่มีภาพวาดเก่าบนผนัง ตรงกลางมีพระพุทธรูปสีทอง คุณเห็นประตูเล็กๆ หลังองค์พระมีล็อคสามตัว',
        choices: [
          { text: 'Open the small door', textTH: 'เปิดประตูเล็ก', nextScene: 'secret-room', vocabulary: [{ word: 'golden', meaning: 'สีทอง' }, { word: 'lock', meaning: 'ล็อค' }] },
          { text: 'Study the paintings first', textTH: 'ดูภาพวาดก่อน', nextScene: 'paintings' },
        ],
      },
      'side-path': {
        id: 'side-path',
        title: 'The Secret Garden',
        illustration: '🌿',
        mood: 'mysterious',
        content: 'Behind the temple, you find a garden with old trees. There\'s a small well. Something shiny catches your eye in the water — a bronze key!',
        contentTH: 'หลังวัดมีสวนต้นไม้เก่า มีบ่อเล็กๆ แสงประกายดึงดูดสายตาในน้ำ — กุญแจทองแดง!',
        choices: [
          { text: 'Grab the key', textTH: 'หยิบกุญแจ', nextScene: 'main-hall', vocabulary: [{ word: 'shiny', meaning: 'เป็นประกาย' }, { word: 'garden', meaning: 'สวน' }] },
          { text: 'Look for more clues', textTH: 'หาเบาะแสเพิ่ม', nextScene: 'paintings' },
        ],
      },
      paintings: {
        id: 'paintings',
        title: 'The Clues',
        illustration: '🎨',
        mood: 'mysterious',
        content: 'The paintings tell a story. You find a riddle carved in stone: "I have hands but cannot clap. I have a face but cannot smile. What am I?" A clock! Behind it: the number "3-1-5".',
        contentTH: 'ภาพวาดเล่าเรื่อง คุณเจอปริศนาสลักบนหิน: "ข้ามีมือแต่ตบไม่ได้ ข้ามีหน้าแต่ยิ้มไม่ได้ ข้าคืออะไร?" นาฬิกา! หลังมันมีตัวเลข "3-1-5"',
        choices: [
          { text: 'Go to the small door with the code', textTH: 'ไปประตูเล็กพร้อมรหัส', nextScene: 'secret-room', vocabulary: [{ word: 'riddle', meaning: 'ปริศนา' }, { word: 'code', meaning: 'รหัส' }] },
        ],
      },
      'secret-room': {
        id: 'secret-room',
        title: 'Three Locks',
        illustration: '🔒',
        mood: 'tense',
        content: 'Behind the statue, a small room with old books. Three number locks on the wall. You find a note: "Numbers: 3-1-5, Word: PEACE, Symbol: ◆"',
        contentTH: 'หลังองค์พระมีห้องเล็กๆ มีหนังสือเก่า ล็อคตัวเลขสามตัวบนผนัง คุณเจอโน้ต: "ตัวเลข: 3-1-5, คำ: PEACE, สัญลักษณ์: ◆"',
        choices: [
          { text: 'Open the locks!', textTH: 'ไขล็อค!', nextScene: 'ending-treasure', vocabulary: [{ word: 'lock', meaning: 'ล็อค' }, { word: 'symbol', meaning: 'สัญลักษณ์' }] },
        ],
      },
      'ending-treasure': {
        id: 'ending-treasure',
        illustration: '📖',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'Click! The locks open. Inside is... not gold, but ancient Buddhist scriptures written in gold ink. "These are priceless!" You photograph everything. Your teacher gives you an A+! The real treasure is the adventure itself. 📖✨',
        contentTH: 'คลิก! ล็อคเปิด ข้างในไม่ใช่ทอง แต่เป็นคัมภีร์โบราณเขียนด้วยหมึกทอง "ล้ำค่ามาก!" คุณถ่ายรูปทุกอย่าง ครูให้ A+! ขุมทรัพย์ที่แท้จริงคือการผจญภัย 📖✨',
      },
    },
  },
  {
    id: 'market-day',
    title: 'Market Day Adventure',
    titleTH: 'วันตลาดนัด',
    emoji: '🏪',
    coverGradient: 'from-green-600 via-emerald-500 to-teal-500',
    difficulty: 'beginner',
    description: 'A fun day at the Thai market',
    descriptionTH: 'วันสนุกที่ตลาดนัดไทย',
    estimatedMinutes: 3,
    totalScenes: 8,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'Mission: Dinner Shopping',
        illustration: '🛒',
        mood: 'exciting',
        content: 'Saturday morning! Mom gives you 200 baht. "Buy food for family dinner — 6 people tonight!" You feel excited and nervous.',
        contentTH: 'เช้าวันเสาร์! แม่ให้ 200 บาท "ซื้ออาหารมื้อค่ำ — 6 คนคืนนี้!" คุณตื่นเต้นและกังวลเล็กน้อย',
        choices: [
          { text: 'Go to the food section', textTH: 'ไปโซนอาหาร', nextScene: 'food-area', vocabulary: [{ word: 'excited', meaning: 'ตื่นเต้น' }, { word: 'nervous', meaning: 'กังวล' }] },
          { text: 'Explore the whole market first', textTH: 'สำรวจตลาดทั้งหมดก่อน', nextScene: 'explore' },
        ],
      },
      explore: {
        id: 'explore',
        title: 'Colorful Market',
        illustration: '🌈',
        mood: 'happy',
        content: 'The market is busy! Clothes, toys, and food smells everywhere. You stop at a fruit seller with the biggest mangoes — 30 baht per kilo.',
        contentTH: 'ตลาดคึกคัก! เสื้อผ้า ของเล่น กลิ่นอาหารทุกที่ คุณหยุดที่ร้านผลไม้มะม่วงใหญ่ — 30 บาทต่อกิโล',
        choices: [
          { text: 'Buy 1kg mangoes (30 THB)', textTH: 'ซื้อมะม่วง 1 กก. (30 บาท)', nextScene: 'food-area', vocabulary: [{ word: 'mango', meaning: 'มะม่วง' }, { word: 'fresh', meaning: 'สด' }] },
          { text: 'Skip to the food section', textTH: 'ข้ามไปโซนอาหาร', nextScene: 'food-area' },
        ],
      },
      'food-area': {
        id: 'food-area',
        title: 'Food Heaven',
        illustration: '🍗',
        mood: 'exciting',
        content: 'Grilled chicken 80 THB, som tam 35 THB, sticky rice 10 THB, crab som tam 50 THB. Everything smells amazing! Budget: 170 THB.',
        contentTH: 'ไก่ย่าง 80 บาท ส้มตำ 35 บาท ข้าวเหนียว 10 บาท ส้มตำปู 50 บาท ทุกอย่างกลิ่นหอม! งบ: 170 บาท',
        choices: [
          { text: 'Buy chicken + rice + som tam (125 THB)', textTH: 'ซื้อไก่ + ข้าว + ส้มตำ (125 บาท)', nextScene: 'good-deal', vocabulary: [{ word: 'budget', meaning: 'งบ' }, { word: 'delicious', meaning: 'อร่อย' }] },
          { text: 'Ask vendor for advice', textTH: 'ถามแม่ค้า', nextScene: 'ask-vendor' },
        ],
      },
      'good-deal': {
        id: 'good-deal',
        title: 'Smart Shopping',
        illustration: '💡',
        mood: 'happy',
        content: 'You still have 45 baht left! You see a coconut stand — cold coconut water for 25 THB.',
        contentTH: 'ยังเหลือ 45 บาท! เห็นร้านน้ำมะพร้าว — 25 บาท',
        choices: [
          { text: 'Buy coconut water (25 THB)', textTH: 'ซื้อน้ำมะพร้าว (25 บาท)', nextScene: 'ending-perfect' },
          { text: 'Save the money for mom', textTH: 'เก็บเงินให้แม่', nextScene: 'ending-save', vocabulary: [{ word: 'coconut', meaning: 'มะพร้าว' }, { word: 'save', meaning: 'เก็บออม' }] },
        ],
      },
      'ask-vendor': {
        id: 'ask-vendor',
        title: 'Expert Advice',
        illustration: '💬',
        mood: 'warm',
        content: '"Buy grilled chicken — 80 baht whole. Sticky rice — 20 baht for two bags. Som tam — 35 baht. Only 135 baht total!" The vendor winks. "Buy coconut ice cream with the rest!"',
        contentTH: '"ซื้อไก่ย่าง — 80 บาททั้งตัว ข้าวเหนียว — 20 บาทสองถุง ส้มตำ — 35 บาท แค่ 135 บาท!" แม่ค้าขยิบตา "ซื้อไอศกรีมมะพร้าวด้วยนะ!"',
        choices: [
          { text: 'Follow her advice!', textTH: 'ทำตามเลย!', nextScene: 'ending-perfect', vocabulary: [{ word: 'advice', meaning: 'คำแนะนำ' }, { word: 'total', meaning: 'รวม' }] },
        ],
      },
      'ending-perfect': {
        id: 'ending-perfect',
        illustration: '🎉',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'You arrive home with bags of food. Everyone is impressed! "How much did you spend?" "Only 135 baht!" Mom hugs you tight. "You\'re so smart!" Best Saturday ever! 🎉',
        contentTH: 'คุณกลับบ้านพร้อมถุงอาหาร ทุกคนประทับใจ! "หมดไปเท่าไหร่?" "แค่ 135 บาท!" แม่กอดแน่น "ลูกเก่งมาก!" เสาร์ที่ดีที่สุด! 🎉',
      },
      'ending-save': {
        id: 'ending-save',
        illustration: '💰',
        mood: 'warm',
        isEnding: true,
        endingType: 'good',
        content: 'You hand mom the remaining 45 baht. "You saved this?" She hugs you. Dinner is delicious. Later, mom gives you 50 baht back as a reward. Being responsible feels great! 💰',
        contentTH: 'คุณยื่นเงินเหลือ 45 บาทให้แม่ "เก็บไว้เหรอ?" เธอกอดคุณ มื้อค่ำอร่อย แม่คืนเงิน 50 บาทเป็นรางวัล การมีความรับผิดชอบรู้สึกดีมาก! 💰',
      },
    },
  },
]
