export interface StoryChoice {
  text: string
  textTH: string
  nextScene: string
  vocabulary?: string[]
}

export interface StoryScene {
  id: string
  title?: string
  content: string
  contentTH: string
  choices?: StoryChoice[]
  isEnding?: boolean
  endingType?: 'good' | 'bad' | 'neutral'
}

export interface Story {
  id: string
  title: string
  titleTH: string
  emoji: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  descriptionTH: string
  scenes: Record<string, StoryScene>
  startScene: string
}

export const stories: Story[] = [
  {
    id: 'cafe-adventure',
    title: 'The Coffee Shop',
    titleTH: 'ร้านกาแฟ',
    emoji: '☕',
    difficulty: 'beginner',
    description: 'A day at a new coffee shop',
    descriptionTH: 'วันที่ร้านกาแฟใหม่',
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'Chapter 1: A New Day',
        content: 'You wake up and feel hungry. You decide to walk to the new coffee shop near your school. The sun is bright and the air is warm. You see a small sign that says "Welcome!"',
        contentTH: 'คุณตื่นขึ้นมาและรู้สึกหิว คุณตัดสินใจเดินไปที่ร้านกาแฟใหม่ใกล้โรงเรียน แดดจ้าและอากาศอบอุ่น คุณเห็นป้ายเล็กๆ เขียนว่า "ยินดีต้อนรับ!"',
        choices: [
          { text: 'Walk inside the coffee shop', textTH: 'เดินเข้าไปในร้านกาแฟ', nextScene: 'inside', vocabulary: ['walk', 'inside'] },
          { text: 'Look at the menu outside', textTH: 'ดูเมนูข้างนอก', nextScene: 'menu', vocabulary: ['menu', 'outside'] },
        ],
      },
      menu: {
        id: 'menu',
        content: 'The menu has many drinks. You see "Coffee", "Tea", "Juice", and "Water". Prices are 40, 30, 35, and 15 baht. You also see a sign: "Today\'s special: Iced Latte for 50 baht!"',
        contentTH: 'เมนูมีเครื่องดื่มหลายอย่าง คุณเห็น "กาแฟ", "ชา", "น้ำผลไม้", และ "น้ำ" ราคา 40, 30, 35, และ 15 บาท คุณยังเห็นป้าย "พิเศษวันนี้: ไอซ์ลาเต้ 50 บาท!"',
        choices: [
          { text: 'Go inside and order', textTH: 'เข้าไปสั่งในร้าน', nextScene: 'inside', vocabulary: ['order', 'inside'] },
          { text: 'Keep reading the menu', textTH: 'อ่านเมนูต่อ', nextScene: 'more-menu', vocabulary: ['reading'] },
        ],
      },
      'more-menu': {
        id: 'more-menu',
        content: 'You see desserts too! Cake, cookies, and croissants. You are very hungry and want everything. Your wallet has 100 baht.',
        contentTH: 'คุณยังเห็นของหวานด้วย! เค้ก คุกกี้ และครัวซองต์ คุณหิวมากและอยากได้ทุกอย่าง กระเป๋าสตางค์มี 100 บาท',
        choices: [
          { text: 'Go inside and order food and drink', textTH: 'เข้าไปสั่งอาหารและเครื่องดื่ม', nextScene: 'order-food' },
          { text: 'Go inside and just order a drink', textTH: 'เข้าไปสั่งแค่เครื่องดื่ม', nextScene: 'inside' },
        ],
      },
      inside: {
        id: 'inside',
        content: 'Inside the shop, it is cool and quiet. Soft music is playing. A friendly barista smiles at you and says, "Hello! What would you like?"',
        contentTH: 'ในร้านอากาศเย็นและเงียบ มีเพลงเบาๆ เปิดอยู่ พนักงานชงกาแฟเป็นมิตรยิ้มให้คุณและพูดว่า "สวัสดี! ต้องการอะไร?"',
        choices: [
          { text: '"Coffee, please"', textTH: '"กาแฟ  בבקשה"', nextScene: 'order-coffee' },
          { text: '"What do you recommend?"', textTH: '"แนะนำอะไรดี?"', nextScene: 'recommend' },
        ],
      },
      'order-food': {
        id: 'order-food',
        content: 'You order a latte (50 baht) and a croissant (35 baht). Total: 85 baht. The barista says, "Great choice! It will be ready in 3 minutes."',
        contentTH: 'คุณสั่งลาเต้ (50 บาท) และครัวซองต์ (35 บาท) รวม 85 บาท พนักงานพูดว่า "เลือกดีมาก! จะเสร็จใน 3 นาที"',
        choices: [
          { text: 'Wait and look around the shop', textTH: 'รอและดูรอบๆ ร้าน', nextScene: 'look-around' },
          { text: 'Check your phone while waiting', textTH: 'ดูมือถือระหว่างรอ', nextScene: 'phone' },
        ],
      },
      'order-coffee': {
        id: 'order-coffee',
        content: 'You order a coffee for 40 baht. The barista prepares it quickly. "Here you go! Enjoy!" You take a sip. It tastes delicious!',
        contentTH: 'คุณสั่งกาแฟ 40 บาท พนักงานเตรียมอย่างรวดเร็ว "นี่เลยครับ/ค่ะ! ดื่มให้อร่อยนะ!" คุณจิบดู อร่อยมาก!',
        choices: [
          { text: 'Stay and read a book', textTH: 'อยู่อ่านหนังสือ', nextScene: 'reading' },
          { text: 'Talk to the barista', textTH: 'คุยกับพนักงาน', nextScene: 'talk' },
        ],
      },
      recommend: {
        id: 'recommend',
        content: 'The barista says, "I recommend our Thai tea latte! It\'s sweet and creamy. Only 45 baht." You think it sounds good. You order it.',
        contentTH: 'พนักงานพูดว่า "แนะนำลาเต้ชาไทยของเรา! หวานและหอมมัน 45 บาท" คุณคิดว่าฟังดูดี คุณสั่งเลย',
        choices: [
          { text: 'Ask about food too', textTH: 'ถามเรื่องอาหารด้วย', nextScene: 'ask-food' },
          { text: 'Find a seat', textTH: 'หาที่นั่ง', nextScene: 'look-around' },
        ],
      },
      'ask-food': {
        id: 'ask-food',
        content: '"Do you have food too?" you ask. "Yes! We have sandwiches, croissants, and muffins. The muffin is very popular - only 30 baht!"',
        contentTH: '"มีอาหารด้วยไหม?" คุณถาม "มีครับ! แซนด์วิช ครัวซองต์ และมัฟฟิน มัฟฟินPopularมาก แค่ 30 บาท!"',
        choices: [
          { text: 'Order a muffin too!', textTH: 'สั่งมัฟฟินด้วย!', nextScene: 'ending-happy', vocabulary: ['popular', 'muffin'] },
          { text: 'Just the drink is fine', textTH: 'แค่เครื่องดื่มก็พอ', nextScene: 'look-around' },
        ],
      },
      phone: {
        id: 'phone',
        content: 'You check your phone. Your friend sends a message: "Where are you? I want to come too!" You look outside and see your friend walking toward the shop.',
        contentTH: 'คุณดูมือถือ เพื่อนส่งข้อความมาว่า "อยู่ไหน? อยากไปด้วย!" คุณมองออกไปข้างนอกและเห็นเพื่อนเดินมาที่ร้าน',
        choices: [
          { text: 'Wave and invite friend inside', textTH: 'โบกมือชวนเพื่อนเข้ามา', nextScene: 'ending-friends' },
          { text: 'Reply "Come in!" on phone', textTH: 'ตอบ "เข้ามาเลย!" ในมือถือ', nextScene: 'ending-friends' },
        ],
      },
      reading: {
        id: 'reading',
        content: 'You sit by the window and read a book. The coffee is warm and the music is relaxing. A cat walks in and sits next to you. It purrs softly.',
        contentTH: 'คุณนั่งข้างหน้าต่างและอ่านหนังสือ กาแฟอุ่นและเพลงผ่อนคลาย แมวเดินเข้ามานั่งข้างคุณ มันส่งเสียงเบาๆ',
        choices: [
          { text: 'Pet the cat and enjoy the moment', textTH: 'ลูบแมวและเพลิดเพลินกับช่วงเวลานี้', nextScene: 'ending-peaceful' },
        ],
      },
      talk: {
        id: 'talk',
        content: '"This is a really nice shop!" you say. "Thank you! I just opened it last week. I love making coffee for people." The barista looks happy and proud.',
        contentTH: '"ร้านนี้สวยมากเลย!" คุณพูด "ขอบคุณครับ/ค่ะ! เปิดได้แค่สัปดาห์เดียว ผม/ดิฉันชอบชงกาแฟให้คน" พนักงานดูมีความสุขและภูมิใจ',
        choices: [
          { text: '"I\'ll come back again!"', textTH: '"จะกลับมาอีกนะ!"', nextScene: 'ending-support' },
        ],
      },
      'look-around': {
        id: 'look-around',
        content: 'You find a cozy seat near the window. Plants hang from the ceiling. There are bookshelves with books and board games. You feel relaxed and happy.',
        contentTH: 'คุณหาที่นั่งสบายๆ ข้างหน้าต่าง ต้นไม้ห้อยจากเพดาน มีชั้นหนังสือกับหนังสือและเกมกระดาน คุณรู้สึกผ่อนคลายและมีความสุข',
        choices: [
          { text: 'This is a great place! (Ending)', textTH: 'ที่นี่สุดยอดเลย! (จบเรื่อง)', nextScene: 'ending-happy' },
        ],
      },
      'ending-happy': {
        id: 'ending-happy',
        content: 'You finish your drink and food happily. The barista says, "See you again!" You leave the shop with a big smile. What a wonderful morning! ☀️',
        contentTH: 'คุณดื่มและกินจนหมดอย่างมีความสุข พนักงานพูดว่า "เจอกันอีกนะ!" คุณออกจากร้านด้วยรอยยิ้มกว้าง เช้าที่ยอดเยี่ยม! ☀️',
        isEnding: true,
        endingType: 'good',
      },
      'ending-friends': {
        id: 'ending-friends',
        content: 'Your friend comes in and orders a drink too. You sit together, chat, laugh, and share stories. The best part of a coffee shop is sharing it with friends! 👫',
        contentTH: 'เพื่อนเข้ามาและสั่งเครื่องดื่มด้วย คุณนั่งด้วยกัน พูดคุย หัวเราะ และแบ่งปันเรื่องราว ส่วนที่ดีที่สุดของร้านกาแฟคือการแบ่งปันกับเพื่อน! 👫',
        isEnding: true,
        endingType: 'good',
      },
      'ending-peaceful': {
        id: 'ending-peaceful',
        content: 'You spend the whole morning reading, drinking coffee, and playing with the cat. Sometimes the best moments are the quiet ones. 🌿',
        contentTH: 'คุณใช้เวลาทั้งเช้าอ่านหนังสือ ดื่มกาแฟ และเล่นกับแมว บางครั้งช่วงเวลาที่ดีที่สุดคือช่วงเวลาที่เงียบสงบ 🌿',
        isEnding: true,
        endingType: 'neutral',
      },
      'ending-support': {
        id: 'ending-support',
        content: '"I\'ll tell my friends about this place!" The barista\'s eyes light up. "That means so much to me. Thank you for supporting my dream!" You feel warm inside. 💛',
        contentTH: '"จะบอกเพื่อนๆ เรื่องที่นี่!" ตาของพนักงานเป็นประกาย "ขอบคุณมากครับ/ค่ะ ขอบคุณที่สนับสนุนความฝันของผม/ดิฉัน!" คุณรู้สึกอบอุ่นภายใน 💛',
        isEnding: true,
        endingType: 'good',
      },
    },
  },
  {
    id: 'temple-mystery',
    title: 'The Temple Mystery',
    titleTH: 'ปริศนาวัด',
    emoji: '🛕',
    difficulty: 'intermediate',
    description: 'Explore a mysterious old temple',
    descriptionTH: 'สำรวจวัดเก่าลึกลับ',
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        content: 'Your teacher gives you a special mission: visit the old temple and find a hidden message. The temple is 200 years old. You arrive at the gate. It is dark and quiet.',
        contentTH: 'ครูของคุณมอบภารกิจพิเศษ: ไปที่วัดเก่าและหาข้อความที่ซ่อนอยู่ วัดมีอายุ 200 ปี คุณมาถึงประตู มืดและเงียบ',
        choices: [
          { text: 'Enter through the main gate', textTH: 'เข้าประตูหลัก', nextScene: 'main-gate' },
          { text: 'Walk around and look for another way', textTH: 'เดินอ้อมหาทางอื่น', nextScene: 'side-path' },
        ],
      },
      'main-gate': {
        id: 'main-gate',
        content: 'The main hall has old paintings on the walls. They show stories from the past. In the center, there is a golden Buddha statue. You notice a small door behind it.',
        contentTH: 'ห้องโถงใหญ่มีภาพวาดเก่าบนผนัง บอกเล่าเรื่องราวจากอดีต ตรงกลางมีพระพุทธรูปสีทอง คุณสังเกตเห็นประตูเล็กๆ หลังองค์พระ',
        choices: [
          { text: 'Open the small door', textTH: 'เปิดประตูเล็ก', nextScene: 'secret-room' },
          { text: 'Look at the paintings first', textTH: 'ดูภาพวาดก่อน', nextScene: 'paintings' },
        ],
      },
      'side-path': {
        id: 'side-path',
        content: 'Behind the temple, you find a garden with old trees. There is a stone path leading to a small well. You see something shiny in the water.',
        contentTH: 'หลังวัด คุณพบสวนที่มีต้นไม้เก่า มีทางหินนำไปบ่อน้ำเล็กๆ คุณเห็นอะไรบางอย่างเป็นประกายในน้ำ',
        choices: [
          { text: 'Look into the well carefully', textTH: 'มองลงในบ่ออย่างระมัดระวัง', nextScene: 'well' },
          { text: 'Go back and enter through the main gate', textTH: 'กลับไปเข้าประตูหลัก', nextScene: 'main-gate' },
        ],
      },
      well: {
        id: 'well',
        content: 'You find an old key at the bottom of the well! It is made of bronze and has strange symbols on it. This must be important.',
        contentTH: 'คุณพบกุญแจเก่าที่ก้นบ่อ! มันทำจากทองแดงและมีสัญลักษณ์ประหลาดอยู่ นี่ต้องเป็นของสำคัญ',
        choices: [
          { text: 'Take the key and go inside', textTH: 'หยิบกุญแจแล้วเข้าไปในวัด', nextScene: 'main-gate' },
        ],
      },
      paintings: {
        id: 'paintings',
        content: 'The paintings tell a story: "A great treasure is hidden in this temple. The key to finding it is... knowledge." Below the painting, you see a riddle carved in stone.',
        contentTH: 'ภาพวาดเล่าเรื่อง: "ขุมทรัพย์อันยิ่งใหญ่ซ่อนอยู่ในวัดนี้ กุญแจสู่การค้นหาคือ... ความรู้" ใต้ภาพวาด คุณเห็นปริศนาสลักบนหิน',
        choices: [
          { text: 'Read the riddle aloud', textTH: 'อ่านปริศนาออกเสียง', nextScene: 'riddle' },
          { text: 'Open the small door behind the statue', textTH: 'เปิดประตูเล็กหลังองค์พระ', nextScene: 'secret-room' },
        ],
      },
      riddle: {
        id: 'riddle',
        content: 'The riddle says: "I have hands but cannot clap. I have a face but cannot smile. What am I?" You think for a moment... A clock! But what does a clock have to do with a temple?',
        contentTH: 'ปริศนาบอกว่า: "ข้ามีมือแต่ตบไม่ได้ ข้ามีหน้าแต่ยิ้มไม่ได้ ข้าคืออะไร?" คุณคิดสักครู่... นาฬิกา! แต่นาฬิกาเกี่ยวกับวัดได้อย่างไร?',
        choices: [
          { text: 'Check the clock on the wall', textTH: 'ดูนาฬิกาบนผนัง', nextScene: 'clock-secret' },
          { text: 'Go through the small door', textTH: 'เข้าประตูเล็ก', nextScene: 'secret-room' },
        ],
      },
      'clock-secret': {
        id: 'clock-secret',
        content: 'The clock shows 3:15. You look behind the clock and find a hidden number: "3-1-5". You remember this for later. Now you feel more confident!',
        contentTH: 'นาฬิกาบอกเวลา 3:15 คุณมองหลังนาฬิกาและพบตัวเลขซ่อน: "3-1-5" คุณจำไว้ ตอนนี้รู้สึกมั่นใจขึ้น!',
        choices: [
          { text: 'Open the small door now', textTH: 'เปิดประตูเล็กตอนนี้', nextScene: 'secret-room' },
        ],
      },
      'secret-room': {
        id: 'secret-room',
        content: 'Behind the statue, there is a small room with old books and scrolls. On the wall, there are three number locks: one for 3 digits, one for letters, and one for symbols. You need to find the codes.',
        contentTH: 'หลังองค์พระมีห้องเล็กๆ มีหนังสือเก่าและม้วนกระดาษ บนผนังมีล็อคตัวเลข 3 ตัว ล็อคตัวอักษร และล็อคสัญลักษณ์ คุณต้องหารหัส',
        choices: [
          { text: 'Try the numbers you found (3-1-5)', textTH: 'ลองตัวเลขที่พบ (3-1-5)', nextScene: 'try-code', vocabulary: ['number', 'lock', 'code'] },
          { text: 'Search the room for clues', textTH: 'ค้นหาเบาะแสในห้อง', nextScene: 'search-room' },
        ],
      },
      'search-room': {
        id: 'search-room',
        content: 'You find a scroll that says: "The secret word is PEACE." Another scroll shows: "The symbol is ◆." Now you have all the clues!',
        contentTH: 'คุณพบม้วนกระดาษที่เขียนว่า "คำลับคือ PEACE" อีกม้วนบอกว่า "สัญลักษณ์คือ ◆" ตอนนี้คุณมีเบาะแสครบแล้ว!',
        choices: [
          { text: 'Open the locks with the codes!', textTH: 'ไขล็อคด้วยรหัส!', nextScene: 'ending-treasure' },
        ],
      },
      'try-code': {
        id: 'try-code',
        content: 'You try 3-1-5 on the first lock. Click! It opens! Inside you find a piece of paper: "PEACE is the word. ◆ is the symbol." You now have everything!',
        contentTH: 'คุณลอง 3-1-5 ที่ล็อคแรก คลิก! เปิดได้! ข้างในมีกระดาษ "PEACE คือคำลับ ◆ คือสัญลักษณ์" ตอนนี้ครบแล้ว!',
        choices: [
          { text: 'Open the remaining locks!', textTH: 'ไขล็อคที่เหลือ!', nextScene: 'ending-treasure' },
        ],
      },
      'ending-treasure': {
        id: 'ending-treasure',
        content: 'The last lock opens! Inside the chest, you find an ancient book: "The History of Khon Kaen." This is the treasure - knowledge from the past! Your teacher will be so proud. 📖✨',
        contentTH: 'ล็อคสุดท้ายเปิด! ในหีบสมบัติ คุณพบหนังสือโบราณ: "ประวัติศาสตร์ขอนแก่น" นี่คือขุมทรัพย์ — ความรู้จากอดีต! ครูของคุณจะภูมิใจมาก 📖✨',
        isEnding: true,
        endingType: 'good',
      },
    },
  },
  {
    id: 'market-day',
    title: 'Market Day Adventure',
    titleTH: 'วันตลาดนัด',
    emoji: '🏪',
    difficulty: 'beginner',
    description: 'A fun day at the Thai market',
    descriptionTH: 'วันสนุกที่ตลาดนัดไทย',
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        content: 'Today is Saturday and there is a big market near your home. Your mom gives you 200 baht and says, "Buy food for the family dinner tonight." You are excited!',
        contentTH: 'วันนี้วันเสาร์และมีตลาดใหญ่ใกล้บ้าน แม่ให้คุณ 200 บาทและบอกว่า "ซื้ออาหารสำหรับมื้อค่ำครอบครัวคืนนี้" คุณตื่นเต้น!',
        choices: [
          { text: 'Go to the food section first', textTH: 'ไปโซนอาหารก่อน', nextScene: 'food-section' },
          { text: 'Walk around and see everything', textTH: 'เดินดูรอบๆ ก่อน', nextScene: 'walk-around' },
        ],
      },
      'walk-around': {
        id: 'walk-around',
        content: 'The market is very busy! There are colorful clothes, fresh fruits, toys, and delicious food smells everywhere. You see a fruit seller with beautiful mangoes.',
        contentTH: 'ตลาดคึกคักมาก! มีเสื้อผ้าสีสันสดใส ผลไม้สด ของเล่น และกลิ่นอาหารอร่อยทุกที่ คุณเห็นแม่ค้าผลไม้มีมะม่วงสวยๆ',
        choices: [
          { text: 'Buy some mangoes (30 baht)', textTH: 'ซื้อมะม่วง (30 บาท)', nextScene: 'buy-mangoes', vocabulary: ['mango', 'fresh'] },
          { text: 'Go to the food section', textTH: 'ไปโซนอาหาร', nextScene: 'food-section' },
        ],
      },
      'buy-mangoes': {
        id: 'buy-mangoes',
        content: 'You buy 1 kg of mangoes for 30 baht. Remaining: 170 baht. The seller says, "Very sweet! Your family will love them." You put them in your bag.',
        contentTH: 'คุณซื้อมะม่วง 1 กก. 30 บาท เหลือ 170 บาท แม่ค้าพูดว่า "หวานมาก! ครอบครัวจะชอบ" คุณใส่ในถุง',
        choices: [
          { text: 'Go to the food section', textTH: 'ไปโซนอาหาร', nextScene: 'food-section' },
        ],
      },
      'food-section': {
        id: 'food-section',
        content: 'At the food section, you see: grilled chicken (60 baht), som tam (30 baht), sticky rice (10 baht), and som tum with crab (40 baht). Everything smells delicious!',
        contentTH: 'ที่โซนอาหาร คุณเห็น: ไก่ย่าง 60 บาท ส้มตำ 30 บาท ข้าวเหนียว 10 บาท และส้มตำปู 40 บาท ทุกอย่างกลิ่นหอม!',
        choices: [
          { text: 'Buy chicken, som tam, and rice (100 baht)', textTH: 'ซื้อไก่ ส้มตำ และข้าว (100 บาท)', nextScene: 'buy-meal' },
          { text: 'Ask what is most popular', textTH: 'ถามว่าอะไรPopularที่สุด', nextScene: 'ask-popular' },
        ],
      },
      'ask-popular': {
        id: 'ask-popular',
        content: '"The grilled chicken is our best seller!" says the vendor. "Everyone loves it. Only 60 baht for a whole chicken!" You decide to get that.',
        contentTH: '"ไก่ย่างขายดีที่สุด!" ผู้ขายพูด "ทุกคนชอบ แค่ 60 บาทได้ทั้งตัว!" คุณตัดสินใจซื้อ',
        choices: [
          { text: 'Buy the chicken + sticky rice + som tam', textTH: 'ซื้อไก่ + ข้าวเหนียว + ส้มตำ', nextScene: 'buy-meal' },
        ],
      },
      'buy-meal': {
        id: 'buy-meal',
        content: 'Great! You bought everything for dinner. Now you have some money left. You walk past a drink stand with fresh coconut water.',
        contentTH: 'ดีมาก! คุณซื้อทุกอย่างสำหรับมื้อค่ำ ตอนนี้ยังมีเงินเหลือ คุณเดินผ่านร้านน้ำมะพร้าวสด',
        choices: [
          { text: 'Buy coconut water (25 baht)', textTH: 'ซื้อน้ำมะพร้าว (25 บาท)', nextScene: 'ending-perfect' },
          { text: 'Save the money', textTH: 'เก็บเงินไว้', nextScene: 'ending-save' },
        ],
      },
      'ending-perfect': {
        id: 'ending-perfect',
        content: 'You walk home with bags of food and fresh coconut water. Mom is so happy! "You did a great job!" she says. Tonight, the whole family enjoys a delicious dinner together. 🥥🍗',
        contentTH: 'คุณเดินกลับบ้านพร้อมถุงอาหารและน้ำมะพร้าวสด แม่ดีใจมาก! "ลูกทำได้ดีมาก!" เธอพูด คืนนี้ทั้งครอบครัวกินมื้อค่ำอร่อยด้วยกัน 🥥🍗',
        isEnding: true,
        endingType: 'good',
      },
      'ending-save': {
        id: 'ending-save',
        content: 'You saved 100 baht! Mom is impressed. "Good job saving money!" she says. "We can use this for next week." You feel proud of being responsible. 💰',
        contentTH: 'คุณเก็บเงินได้ 100 บาท! แม่ประทับใจ "เก่งมากที่เก็บเงิน!" เธอพูด "เอาไว้ใช้สัปดาห์หน้าได้" คุณภูมิใจที่เป็นคนรับผิดชอบ 💰',
        isEnding: true,
        endingType: 'good',
      },
    },
  },
]

export const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}
