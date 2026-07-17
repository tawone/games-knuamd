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
  vocabQuiz?: { word: string; options: string[]; correct: number }[]
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
  scenes: Record<string, StoryScene>
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
    estimatedMinutes: 5,
    totalScenes: 18,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'Chapter 1: A Beautiful Morning',
        illustration: '🌅',
        mood: 'warm',
        content: 'The morning sun paints the sky in shades of orange and pink. You stretch your arms and take a deep breath. Today feels special.\n\n"Where should I go?" you wonder aloud.\n\nThen you remember — there\'s a new coffee shop on Sukhumvit Road that just opened last week. Your friend told you it has the best Thai tea latte in town.\n\nYou grab your bag and head out the door.',
        contentTH: 'แสงแดดยามเช้าระบายท้องฟ้าเป็นสีส้มและชมพู คุณยืดแขนและหายใจเข้าลึกๆ วันนี้รู้สึกพิเศษ\n\n"จะไปไหนดี?" คุณพึมพำกับตัวเอง\n\nแล้วคุณก็นึกขึ้นได้ — มีร้านกาแฟใหม่บนถนนสุขุมวิทเพิ่งเปิดได้สัปดาห์เดียว เพื่อนเล่าว่าชาไทยลาเต้ที่นี่อร่อยที่สุดในเมือง\n\nคุณหยิบกระเป๋าแล้วเดินออกจากบ้าน',
        choices: [
          {
            text: '🏃 Walk quickly — you\'re excited!',
            textTH: '🏃 เดินเร็ว — คุณตื่นเต้น!',
            nextScene: 'arrival-excited',
            consequence: 'You arrive with energy and excitement',
            vocabulary: [
              { word: 'stretch', meaning: 'ยืด' },
              { word: 'excited', meaning: 'ตื่นเต้น' },
            ],
          },
          {
            text: '🚶 Walk slowly and enjoy the morning',
            textTH: '🚶 เดินช้าๆ และเพลิดเพลินกับเช้า',
            nextScene: 'arrival-relaxed',
            consequence: 'You notice beautiful details along the way',
            vocabulary: [
              { word: 'morning', meaning: 'ตอนเช้า' },
              { word: 'enjoy', meaning: 'เพลิดเพลิน' },
            ],
          },
        ],
      },
      'arrival-excited': {
        id: 'arrival-excited',
        title: 'At the Door',
        illustration: '🚪',
        mood: 'exciting',
        content: 'You arrive at the coffee shop in just five minutes. Your heart is beating fast with excitement.\n\nThe shop looks beautiful! It has a wooden sign that reads "Sunrise Café" in elegant letters. There are green plants hanging by the entrance, and a warm light glows from inside.\n\nThe door is slightly open, and you can smell the rich aroma of freshly brewed coffee.\n\n"Welcome!" a voice calls from inside.',
        contentTH: 'คุณมาถึงร้านกาแฟในเวลาแค่ห้านาที หัวใจเต้นแรงด้วยความตื่นเต้น\n\nร้านดูสวยมาก! มีป้ายไม้เขียนว่า "Sunrise Café" ด้วยตัวอักษรที่หรูหรา มีต้นไม้สีเขียวแขวนอยู่ทางเข้า และแสงอบอุ่นส่องออกมาจากข้างใน\n\nประตูเปิดอยู่เล็กน้อย คุณได้กลิ่นกาแฟสดหอมกรุ่น\n\n"ยินดีต้อนรับ!" เสียงหนึ่งดังมาจากข้างใน',
        choices: [
          { text: 'Push the door open and walk in', textTH: 'เปิดประตูเดินเข้าไป', nextScene: 'inside', vocabulary: [{ word: 'aroma', meaning: 'กลิ่นหอม' }, { word: 'entrance', meaning: 'ทางเข้า' }] },
          { text: 'Peek inside first — what does it look like?', textTH: 'แอบมองข้างในก่อน — เป็นยังไง?', nextScene: 'peek', vocabulary: [{ word: 'elegant', meaning: 'หรูหรา' }, { word: 'glow', meaning: 'เปล่งประกาย' }] },
        ],
      },
      'arrival-relaxed': {
        id: 'arrival-relaxed',
        title: 'A Peaceful Walk',
        illustration: '🌿',
        mood: 'calm',
        content: 'You walk slowly down the tree-lined street. The morning breeze carries the scent of jasmine flowers.\n\nYou pass by a temple where monks are chanting. The sound is peaceful and calming. You stop for a moment and smile.\n\nFurther down the road, you spot the coffee shop. It\'s smaller than you expected, but absolutely charming. A wooden door, colorful flowers in pots, and a chalkboard menu outside.',
        contentTH: 'คุณเดินช้าๆ ไปตามถนนที่มีต้นไม้เรียงราย ลมพัดยามเช้าพาเอากลิ่นดอกมะลิมาด้วย\n\nคุณเดินผ่านวัดที่พระกำลังสวดมนต์ เสียงเงียบสงบและผ่อนคลาย คุณหยุดสักครู่แล้วยิ้ม\n\nเดินต่อไปอีกหน่อย คุณเห็นร้านกาแฟ มันเล็กกว่าที่คิด แต่น่ารักมาก ประตูไม้ ดอกไม้สีสันสดใสในกระถาง และกระดานดำเมนูอยู่ข้างนอก',
        choices: [
          { text: 'Read the chalkboard menu outside', textTH: 'อ่านเมนูกระดานดำข้างนอก', nextScene: 'menu-outside', vocabulary: [{ word: 'breeze', meaning: 'ลมเอื่อย' }, { word: 'charming', meaning: 'น่ารัก' }] },
          { text: 'Go straight inside', textTH: 'เดินเข้าไปเลย', nextScene: 'inside', vocabulary: [{ word: 'calming', meaning: 'ผ่อนคลาย' }, { word: 'scent', meaning: 'กลิ่น' }] },
        ],
      },
      peek: {
        id: 'peek',
        title: 'A Glimpse Inside',
        illustration: '👀',
        mood: 'calm',
        content: 'You peek through the glass door and gasp softly.\n\nInside is like a cozy wonderland. There are bookshelves along the walls, filled with novels and manga. A large window lets in golden sunlight. There are only three tables, each with a small vase of fresh flowers.\n\nBehind the counter, a young woman with kind eyes is carefully preparing a drink. She notices you and smiles warmly.\n\n"It\'s okay, come in!" she says.',
        contentTH: 'คุณแอบมองผ่านประตูกระจกแล้วอุทานเบาๆ\n\nข้างในเหมือนดินแดนมหัศจรรย์ มีชั้นหนังสือเต็มผนัง เต็มไปด้วยนิยายและมังงะ หน้าต่างใหญ่ให้แสงแดดสีทองส่อง进来 มีแค่สามโต๊ะ แต่ละโต๊ะมีแจกันดอกไม้สด\n\nหลังเคาน์เตอร์ หญิงสาวตาอบอุ่นกำลังเตรียมเครื่องดื่มอย่างตั้งใจ เธอสังเกตเห็นคุณแล้วยิ้มอบอุ่น\n\n"เข้ามาได้เลยค่ะ!" เธอพูด',
        choices: [
          { text: 'Enter with a big smile', textTH: 'เดินเข้าไปพร้อมรอยยิ้มกว้าง', nextScene: 'inside', vocabulary: [{ word: 'cozy', meaning: 'สบายๆ' }, { word: 'warmly', meaning: 'อย่างอบอุ่น' }] },
          { text: 'Say "It\'s so beautiful in here!"', textTH: 'พูดว่า "ข้างในสวยมาก!"', nextScene: 'compliment', vocabulary: [{ word: 'wonderland', meaning: 'ดินแดนมหัศจรรย์' }, { word: 'golden', meaning: 'สีทอง' }] },
        ],
      },
      'menu-outside': {
        id: 'menu-outside',
        title: 'The Menu',
        illustration: '📋',
        mood: 'calm',
        content: 'You look at the chalkboard menu carefully. The handwriting is beautiful and artistic.\n\n☕ COFFEE MENU\n• Americano — 50 THB\n• Latte — 60 THB\n• Cappuccino — 60 THB\n\n🍵 TEA MENU\n• Thai Tea Latte ⭐ — 55 THB\n• Green Tea Latte — 55 THB\n• Chamomile — 45 THB\n\n🍰 DESSERTS\n• Tiramisu Cake — 85 THB\n• Banana Bread — 45 THB\n\n"Thai Tea Latte is our signature!" reads a note at the bottom.\n\nYour wallet has 200 baht.',
        contentTH: 'คุณดูเมนูกระดานดำอย่างตั้งใจ ลายมือสวยและเป็นศิลปะ\n\n☕ เมนูกาแฟ\n• อเมริกาโน่ — 50 บาท\n• ลาเต้ — 60 บาท\n• คาปูชิโน่ — 60 บาท\n\n🍵 เมนูชา\n• ชาไทยลาเต้ ⭐ — 55 บาท\n• ชาเขียวลาเต้ — 55 บาท\n• คาโมมายล์ — 45 บาท\n\n🍰 ของหวาน\n• ทีรามิสุเค้ก — 85 บาท\n• ขนมปังกล้วย — 45 บาท\n\n"ชาไทยลาเต้เป็นซิกเนเจอร์ของเรา!" เขียนไว้ด้านล่าง\n\nกระเป๋าสตางค์มี 200 บาท',
        choices: [
          { text: '"I\'ll try the signature Thai Tea Latte!"', textTH: '"ขอลองชาไทยลาเต้ซิกเนเจอร์!"', nextScene: 'inside', vocabulary: [{ word: 'signature', meaning: 'ซิกเนเจอร์' }, { word: 'artistic', meaning: 'เป็นศิลปะ' }] },
          { text: 'Go inside and ask for recommendations', textTH: 'เข้าไปขอคำแนะนำ', nextScene: 'inside', vocabulary: [{ word: 'recommendation', meaning: 'คำแนะนำ' }, { word: 'carefully', meaning: 'อย่างตั้งใจ' }] },
        ],
      },
      compliment: {
        id: 'compliment',
        title: 'Making a Connection',
        illustration: '💛',
        mood: 'happy',
        content: '"It\'s so beautiful in here!" you exclaim.\n\nThe barista\'s face lights up with genuine happiness. "Thank you so much! I decorated it myself. I wanted to create a place where people can feel at home."\n\nShe introduces herself: "My name is Mint. I just quit my office job to follow my dream of opening this café."\n\nYou feel inspired by her courage. "That\'s amazing!" you say. "I\'m [your name]."\n\n"Nice to meet you, [your name]! What can I get for you today?"',
        contentTH: '"ข้างในสวยมากเลย!" คุณอุทาน\n\nใบหน้าของบาริสต้าเป็นประกายด้วยความสุขจริงใจ "ขอบคุณมากค่ะ! ฉันตกแต่งเองเลย ฉันอยากสร้างที่ที่ผู้คนรู้สึกเหมือนอยู่บ้าน"\n\nเธอแนะนำตัว: "ฉันชื่อมิ้นท์เพิ่งลาออกจากงานออฟฟิศเพื่อทำตามความฝันเปิดร้านกาแฟค่ะ"\n\nคุณรู้สึกประทับใจในความกล้าหาญของเธอ "สุดยอดเลย!" คุณพูด "ผม/ดิฉันชื่อ [ชื่อคุณ]"\n\n"ยินดีที่ได้รู้จักค่ะ! วันนี้จะสั่งอะไรดี?"',
        choices: [
          { text: '"The Thai Tea Latte, please!"', textTH: '"ชาไทยลาเต้ ขอบคุณครับ!"', nextScene: 'order-thai-tea', vocabulary: [{ word: 'courage', meaning: 'ความกล้าหาญ' }, { word: 'inspired', meaning: 'ได้รับแรงบันดาลใจ' }] },
          { text: '"What\'s your personal favorite?"', textTH: '"ถ้าเป็นเมนูส่วนตัว แนะนำอะไร?"', nextScene: 'personal-fav', vocabulary: [{ word: 'genuine', meaning: 'จริงใจ' }, { word: 'follow', meaning: 'ทำตาม' }] },
        ],
      },
      inside: {
        id: 'inside',
        title: 'Welcome In',
        illustration: '✨',
        mood: 'warm',
        content: 'You step inside and feel immediately at peace. The air smells of coffee and cinnamon. Soft jazz music plays in the background.\n\nThe barista — a young woman with a warm smile — greets you from behind the wooden counter.\n\n"Hi there! Welcome to Sunrise Café. Have you been here before?" she asks.\n\nYou shake your head. "No, it\'s my first time."\n\n"Then let me make it special! We just opened last week. Our signature drink is the Thai Tea Latte — it\'s my grandmother\'s recipe."',
        contentTH: 'คุณก้าวเข้ามาแล้วรู้สึกสงบในทันที อากาศอบอวลไปด้วยกลิ่นกาแฟและซินนามอน ดนตรีแจ๊สเบาๆ เล่นเป็นพื้นหลัง\n\nบาริสต้า — หญิงสาวรอยยิ้มอบอุ่น — ทักทายจากหลังเคาน์เตอร์ไม้\n\n"สวัสดีค่ะ! ยินดีต้อนรับที่ Sunrise Café เคยมาที่นี่มาก่อนไหมคะ?"\n\nคุณส่ายหัว "ไม่เคยครับ ครั้งแรก"\n\n"งั้นจะทำให้พิเศษเลย! เราเพิ่งเปิดได้สัปดาห์เดียว เมนูซิกเนเจอร์คือชาไทยลาเต้ — เป็นสูตรคุณยายของดิฉันค่ะ"',
        choices: [
          { text: '"That sounds amazing! I\'ll have that."', textTH: '"ฟังดูสุดยอด! ขอด้วยคน"', nextScene: 'order-thai-tea', vocabulary: [{ word: 'signature', meaning: 'ซิกเนเจอร์' }, { word: 'recipe', meaning: 'สูตร' }] },
          { text: '"Tell me more about this place"', textTH: '"เล่าเรื่องร้านนี้ให้ฟังหน่อย"', nextScene: 'story', vocabulary: [{ word: 'special', meaning: 'พิเศษ' }, { word: 'greet', meaning: 'ทักทาย' }] },
        ],
      },
      'order-thai-tea': {
        id: 'order-thai-tea',
        title: 'The Perfect Drink',
        illustration: '🧋',
        mood: 'happy',
        content: '"One Thai Tea Latte, coming right up!" Mint says with enthusiasm.\n\nYou watch as she carefully brews the tea, adds condensed milk in a perfect swirl, and tops it with a layer of creamy foam. The color is a beautiful deep orange.\n\n"Here you go," she says, placing the cup in front of you. "55 baht, please."\n\nYou take your first sip. The tea is sweet, creamy, and has a hint of vanilla. It\'s absolutely delicious.\n\n"This is the best Thai tea I\'ve ever had!" you exclaim.',
        contentTH: '"ชาไทยลาเต้ 1 แก้ว เดี๋ยวทำให้เลยค่ะ!" มิ้นท์พูดอย่างกระตือรือร้น\n\nคุณมองดูเธอชงชาอย่างตั้งใจ เติมนมข้นหวานเป็นเกลียวสวย แล้วโรยด้วยฟองนมหนานุ่ม สีเป็นสีส้มเข้มที่สวยมาก\n\n"นี่เลยค่ะ" เธอวางแก้วตรงหน้า "55 บาทค่ะ"\n\nคุณจิบคำแรก ชาหวาน หอมมัน มีกลิ่นวานิลลาจางๆ อร่อยมากจริงๆ\n\n"ชาไทยที่อร่อยที่สุดที่เคยกินมาเลย!" คุณอุทาน',
        choices: [
          { text: 'Stay and read a book by the window', textTH: 'อยู่อ่านหนังสือข้างหน้าต่าง', nextScene: 'reading', vocabulary: [{ word: 'creamy', meaning: 'หอมมัน' }, { word: 'delicious', meaning: 'อร่อย' }] },
          { text: 'Chat more with Mint about her dream', textTH: 'คุยเรื่องความฝันกับมิ้นท์ต่อ', nextScene: 'chat', vocabulary: [{ word: 'enthusiasm', meaning: 'ความกระตือรือร้น' }, { word: 'swirl', meaning: 'เกลียว' }] },
        ],
      },
      'personal-fav': {
        id: 'personal-fav',
        title: 'A Personal Touch',
        illustration: '💭',
        mood: 'warm',
        content: 'Mint\'s eyes sparkle. "My personal favorite? That\'s a secret," she says with a wink.\n\n"Actually, it\'s the Green Tea Latte with a shot of espresso. I call it the \'Mint Special.\' Nobody orders it, but I think it\'s the best thing on the menu."\n\nShe leans in and whispers: "I\'ll make it for you at the regular Green Tea Latte price — 55 baht. Consider it a welcome gift!"',
        contentTH: 'ดวงตาของมิ้นท์เป็นประกาย "เมนูส่วนตัวเหรอคะ? นั่นเป็นความลับค่ะ" เธอขยิบตา\n\n"จริงๆ แล้วคือชาเขียวลาเต้ใส่ช็อตเอสเพรสโซ่ ฉันเรียกมันว่า 'Mint Special' ไม่มีใครสั่ง แต่ฉันว่ามันอร่อยที่สุดในเมนูเลย"\n\nเธอโน้มเข้ามากระซิบ: "จะทำให้ในราคาชาเขียวลาเต้ปกติ 55 บาทค่ะ ถือว่าเป็นของขวัญต้อนรับ!"',
        choices: [
          { text: '"I\'d love to try it!"', textTH: '"อยากลองเลย!"', nextScene: 'order-special', vocabulary: [{ word: 'sparkle', meaning: 'เป็นประกาย' }, { word: 'whisper', meaning: 'กระซิบ' }] },
          { text: '"Actually, the Thai Tea Latte sounds great too"', textTH: '"จริงๆ ชาไทยลาเต้ก็น่าอร่อยเหมือนกัน"', nextScene: 'order-thai-tea', vocabulary: [{ word: 'consider', meaning: 'ถือว่า' }, { word: 'welcome', meaning: 'ต้อนรับ' }] },
        ],
      },
      story: {
        id: 'story',
        title: 'Mint\'s Story',
        illustration: '📖',
        mood: 'warm',
        content: 'Mint wipes the counter gently and begins to share.\n\n"I used to work at a big company downtown. Good salary, nice office, everyone said I was lucky. But every morning, I felt... empty."\n\nShe pauses and looks at the coffee plants by the window.\n\n"One day, my grandmother visited me. She made me her Thai tea — the same recipe for 40 years. When I tasted it, I cried. It reminded me of my childhood, of her kitchen, of love."\n\n"That\'s when I knew. I wanted to create a place where people could feel that same warmth."',
        contentTH: 'มิ้นท์เช็ดเคาน์เตอร์เบาๆ แล้วเริ่มเล่า\n\n"เคยทำงานที่บริษัทใหญ่ในเมือง เงินเดือนดี ออฟฟิศสวย ทุกคนบอกว่าโชคดี แต่ทุกเช้ารู้สึก... ว่างเปล่า"\n\nเธอหยุดแล้วมองต้นกาแฟข้างหน้าต่าง\n\n"วันนึงคุณยายมาหา ทำชาไทยให้ สูตรเดิม 40 ปี พอได้จิบ น้ำตาไหล มันทำให้นึกถึงวัยเด็ก ถึงครัวคุณยาย ถึงความรัก"\n\n"ตอนนั้นเองที่รู้ว่าอยากสร้างที่ที่ผู้คนรู้สึกอบอุ่นแบบนั้น"',
        choices: [
          { text: '"That\'s such a beautiful story"', textTH: '"เรื่องเล่าสวยมากเลย"', nextScene: 'after-story', vocabulary: [{ word: 'salary', meaning: 'เงินเดือน' }, { word: 'remind', meaning: 'ทำให้นึกถึง' }] },
          { text: '"Can I try the Thai Tea Latte now?"', textTH: '"ขอลองชาไทยลาเต้ตอนนี้ได้ไหม?"', nextScene: 'order-thai-tea', vocabulary: [{ word: 'empty', meaning: 'ว่างเปล่า' }, { word: 'warmth', meaning: 'ความอบอุ่น' }] },
        ],
      },
      'after-story': {
        id: 'after-story',
        title: 'A Meaningful Moment',
        illustration: '💛',
        mood: 'warm',
        content: 'Mint smiles and places a cup of Thai Tea Latte in front of you.\n\n"This one\'s on the house," she says. "For being my first customer who actually listened to my story."\n\nYou taste it. It\'s unlike any Thai tea you\'ve had before. There\'s something special — a depth of flavor that can only come from generations of love.\n\n"Your grandmother would be proud," you say quietly.\n\nMint\'s eyes glisten. "Thank you. That means the world to me."',
        contentTH: 'มิ้นท์ยิ้มแล้ววางชาไทยลาเต้ตรงหน้าคุณ\n\n"แก้วนี้ไม่คิดเงินค่ะ" เธอพูด "เพราะเป็นลูกค้าคนแรกที่ฟังเรื่องของดิฉันจริงๆ"\n\nคุณลองชิม มันไม่เหมือนชาไทยที่เคยกิน มีอะไรบางอย่างพิเศษ — รสชาติที่ลึกซึ้งซึ่งเกิดได้จากความรักที่สืบทอดมาหลายชั่วอายุคน\n\n"คุณยายของคุณต้องภูมิใจแน่เลย" คุณพูดเบาๆ\n\nดวงตาของมิ้นท์เป็นประกาย "ขอบคุณค่ะ คำพูดนี้หมายความทุกอย่างสำหรับดิฉัน"',
        choices: [
          { text: 'Finish your drink and promise to return', textTH: 'ดื่มจนหมดและสัญญาว่าจะกลับมา', nextScene: 'ending-happy' },
          { text: 'Ask to take a photo for your blog', textTH: 'ขอถ่ายรูปลงบล็อก', nextScene: 'ending-promote' },
        ],
      },
      reading: {
        id: 'reading',
        title: 'A Quiet Afternoon',
        illustration: '📖',
        mood: 'calm',
        content: 'You find a cozy seat by the window. Golden sunlight streams through the glass, warming your face.\n\nYou open your book and begin to read. The coffee shop is quiet — just you, the soft music, and the gentle sound of a pen scratching on paper (Mint is writing in her journal).\n\nAfter an hour, you look up and realize: this is the happiest you\'ve felt in a long time.\n\nA cat — an orange tabby — walks in through the open door and curls up at your feet.',
        contentTH: 'คุณหาที่นั่งสบายๆ ข้างหน้าต่าง แสงแดดสีทองส่องผ่านกระจก อุ่นหน้า\n\nคุณเปิดหนังสือเริ่มอ่าน ร้านเงียบ — มีแค่คุณ เพลงเบาๆ และเสียงปากกาเบาๆ ของมิ้นท์ที่เขียนในไดอารี่\n\nผ่านไปหนึ่งชั่วโมง คุณเงยหน้าขึ้นแล้วรู้ตัว: นี่คือช่วงเวลาที่มีความสุขที่สุดในรอบนานแล้ว\n\nแมว — แมวสีส้ม — เดินเข้ามาทางประตูที่เปิดอยู่แล้วขดตัวที่เท้าคุณ',
        choices: [
          { text: 'Pet the cat and smile at Mint', textTH: 'ลูบแมวและยิ้มให้มิ้นท์', nextScene: 'ending-peaceful' },
          { text: 'Stay until closing time', textTH: 'อยู่จนร้านปิด', nextScene: 'ending-all-day' },
        ],
      },
      chat: {
        id: 'chat',
        title: 'A Conversation',
        illustration: '☕',
        mood: 'happy',
        content: 'You lean against the counter and chat with Mint while she prepares your drink.\n\n"Where did you learn to make coffee so well?" you ask.\n\n"My grandmother taught me everything. She ran a small tea shop in Chiang Rai for 30 years. When she retired, she passed all her recipes to me."\n\nMint places the Thai Tea Latte in front of you. "Here — my grandmother\'s pride and joy."',
        contentTH: 'คุณพิงเคาน์เตอร์คุยกับมิ้นท์ระหว่างที่เธอเตรียมเครื่องดื่ม\n\n"เรียนชงกาแฟมาจากไหนเก่งจัง?" คุณถาม\n\n"คุณยายสอนทุกอย่างค่ะ แกเปิดร้านชาเล็กๆ ที่เชียงรายมา 30 ปี พอเกษียณก็ยกสูตรทั้งหมดให้ดิฉัน"\n\nมิ้นท์วางชาไทยลาเต้ตรงหน้า "นี่ค่ะ — ความภูมิใจของคุณยายดิฉัน"',
        choices: [
          { text: 'Take a sip and smile', textTH: 'จิบแล้วยิ้ม', nextScene: 'ending-happy' },
          { text: '"She would be so proud of you"', textTH: '"คุณยายต้องภูมิใจในตัวคุณมาก"', nextScene: 'ending-heartfelt' },
        ],
      },
      'ending-happy': {
        id: 'ending-happy',
        illustration: '☀️',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'As the afternoon sun dips below the horizon, you finish your last sip of Thai Tea Latte. It was, without doubt, the best coffee experience of your life.\n\nYou walk to the door, turn around, and wave. "Thank you, Mint! I\'ll be back tomorrow!"\n\nShe waves back, her smile as warm as the morning sun.\n\nOutside, the golden light paints everything in a warm glow. You walk home with a light heart and a happy memory.\n\nSometimes, the best adventures begin with a simple cup of tea. ☕💛',
        contentTH: 'เมื่อแสงแดดยามบ่ายจมลงใต้ขอบฟ้า คุณดื่มชาไทยลาเต้คำสุดท้าย มันคือประสบการณ์กาแฟที่ดีที่สุดในชีวิตอย่างไม่ต้องสงสัย\n\nคุณเดินไปที่ประตู หันกลับมาโบกมือ "ขอบคุณมิ้นท์นะ! พรุ่งนี้จะกลับมา!"\n\nเธอกลับโบกมือ รอยยิ้มอบอุ่นเหมือนแสงแดดยามเช้า\n\nข้างนอก แสงสีทองระบายทุกอย่างเป็นประกายอบอุ่น คุณเดินกลับบ้านด้วยหัวใจเบาๆ และความทรงจำที่มีความสุข\n\nบางครั้ง การผจญภัยที่ดีที่สุดเริ่มจากชาแค่แก้วเดียว ☕💛',
      },
      'ending-promote': {
        id: 'ending-promote',
        illustration: '📱',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: '"Can I take a photo? I want to tell my friends about this place!"\n\nMint beams with pride. "Of course! Let me make it pretty for you."\n\nShe arranges the cup with a small flower and snaps the perfect shot for you.\n\nWithin an hour, your post gets 47 likes and 12 comments. Your friend messages: "We\'re going there this weekend!"\n\nMint\'s dream is growing, one customer at a time. And you helped make it happen. 📸✨',
        contentTH: '"ขอถ่ายรูปได้ไหม? อยากบอกเพื่อนๆ เรื่องที่นี่!"\n\nมิ้นท์ยิ้มภูมิใจ "ได้ค่ะ! จัดสวยๆ ให้นะคะ"\n\nเธอจัดแก้วกับดอกไม้เล็กๆ แล้วถ่ายรูปสวยๆ ให้\n\nภายในหนึ่งชั่วโมง โพสต์ของคุณได้ 47 ไลค์และ 12 คอมเมนต์ เพื่อนส่งข้อความมา: "สุดสัปดาห์นี้จะไป!"\n\nความฝันของมิ้นท์กำลังเติบโต ทีละลูกค้า และคุณเป็นส่วนหนึ่งของมัน 📸✨',
      },
      'ending-peaceful': {
        id: 'ending-peaceful',
        illustration: '🌿',
        mood: 'calm',
        isEnding: true,
        endingType: 'neutral',
        content: 'The cat purrs softly against your feet. The music plays. The sun sets slowly, turning the sky into a watercolor painting.\n\nMint brings you a glass of water. "You look very peaceful," she says with a gentle smile.\n\n"I am," you reply. "This is the most comfortable place I\'ve ever been."\n\nYou stay until dusk, reading your book, petting the cat, and savoring every moment of this perfect afternoon.\n\nSome places don\'t just sell coffee. They sell peace. 🌿☕',
        contentTH: 'แมวส่งเสียงเบาๆ ที่เท้าคุณ เพลงเล่น พระอาทิตย์ค่อยๆ ลับขอบฟ้า ระบายท้องฟ้าเป็นภาพสีน้ำ\n\nมิ้นท์หยิบน้ำมาให้ "ดูสงบมากเลยนะคะ" เธอยิ้มเบาๆ\n\n"ครับ" คุณตอบ "ที่นี่舒适ที่สุดที่เคยอยู่"\n\nคุณอยู่จนพลบค่ำ อ่านหนังสือ ลูบแมว และลิ้มรสทุกช่วงเวลาของบ่ายที่สมบูรณ์แบบ\n\nบางที่ไม่ได้แค่ขายกาแฟ แต่ขายความสงบ 🌿☕',
      },
      'ending-all-day': {
        id: 'ending-all-day',
        illustration: '🌙',
        mood: 'warm',
        isEnding: true,
        endingType: 'good',
        content: 'You stay the entire day. Mint brings you drinks, snacks, and stories about her grandmother.\n\nAs she locks up the shop at 6 PM, she turns to you. "Thank you for spending the whole day here. You\'re not just a customer — you\'re a friend now."\n\n"Same time tomorrow?" you ask.\n\n"Same time tomorrow," she confirms with a warm smile.\n\nWalking home under the streetlights, you realize you\'ve found more than a coffee shop. You\'ve found a second home. 🌙☕',
        contentTH: 'คุณอยู่ทั้งวัน มิ้นท์พาเครื่องดื่ม ขนม และเรื่องเล่าของคุณยายมาให้\n\nตอนที่เธอปิดร้านตอน 6 โมงเย็น เธอหันมาหาคุณ "ขอบคุณที่อยู่ทั้งวัน คุณไม่ใช่แค่ลูกค้า — คุณเป็นเพื่อนแล้ว"\n\n"พรุ่งนี้มาเวลาเดิมได้ไหม?" คุณถาม\n\n"มาเวลาเดิมเลยค่ะ" เธอยืนยันด้วยรอยยิ้มอบอุ่น\n\nเดินกลับบ้านใต้แสงไฟถนน คุณรู้ตัวว่าได้พบมากกว่าร้านกาแฟ คุณได้พบบ้านหลังที่สอง 🌙☕',
      },
      'ending-heartfelt': {
        id: 'ending-heartfelt',
        illustration: '🙏',
        mood: 'warm',
        isEnding: true,
        endingType: 'good',
        content: '"She would be so proud of you," you say quietly.\n\nMint pauses, her eyes filling with tears. "Thank you... nobody has ever said that to me before."\n\nShe quickly wipes her eyes and laughs. "Sorry! I promised myself I wouldn\'t cry on my first week!"\n\nYou both laugh together, and in that moment, a friendship is born.\n\nAs you leave, Mint calls after you: "Come back anytime! You\'re always welcome here!"\n\nYou walk home carrying warmth in your heart — the warmth of a new friendship and a truly special place. 💛🙏',
        contentTH: '"คุณยายต้องภูมิใจในตัวคุณมาก" คุณพูดเบาๆ\n\nมิ้นท์หยุดนิ่ง ดวงตาเอ่อ "ขอบคุณ... ไม่เคยมีใครพูดแบบนี้กับดิฉันมาก่อน"\n\nเธอเช็ดน้ำตาแล้วหัวเราะ "ขอโทษค่ะ! สัญญาไว้ว่าสัปดาห์แรกจะไม่ร้องไห้!"\n\nคุณทั้งคู่หัวเราะด้วยกัน และในช่วงเวลานั้น มิตรภาพก็เริ่มต้นขึ้น\n\nตอนที่คุณจาก มิ้นท์เรียกตามหลัง "กลับมาเมื่อไหร่ก็ได้นะ! ยินดีต้อนรับเสมอ!"\n\nคุณเดินกลับบ้านพร้อมความอบอุ่นในหัวใจ — ความอบอุ่นของมิตรภาพใหม่และสถานที่ที่พิเศษจริงๆ 💛🙏',
      },
      'order-special': {
        id: 'order-special',
        title: 'The Mint Special',
        illustration: '🌟',
        mood: 'exciting',
        content: 'Mint\'s eyes light up as she prepares your drink with extra care.\n\nShe adds matcha powder, a shot of espresso, steamed milk, and a tiny pinch of vanilla. She stirs it slowly, watching the colors blend into a beautiful jade green with dark swirls.\n\n"The Mint Special," she announces proudly, placing it before you.\n\nYou take a sip. The matcha and espresso create an incredible harmony — bitter, sweet, earthy, and bright all at once.\n\n"This is incredible!" you say, genuinely amazed.',
        contentTH: 'ดวงตาของมิ้นท์เป็นประกายขณะเตรียมเครื่องดื่มให้คุณเป็นพิเศษ\n\nเธอใส่ผงมัทฉะ ช็อตเอสเพรสโซ่ นมร้อน และวานิลลาเล็กน้อย คนเบาๆ มองสีผสมเป็นสีเขียวหยกสวยกับเกลียวสีเข้ม\n\n"Mint Special ค่ะ!" เธอประกาศอย่างภูมิใจ วางตรงหน้าคุณ\n\nคุณจิบ มัทฉะและเอสเพรสโซ่ประสานเสียงที่น่าทึ่ง — ขม หวาน ดิน และสดใสไปพร้อมๆ กัน\n\n"สุดยอดมาก!" คุณพูด ประทับใจจริงๆ',
        choices: [
          { text: '"You should put this on the secret menu!"', textTH: '"ควรใส่ในเมนูลับเลย!"', nextScene: 'ending-happy', vocabulary: [{ word: 'incredible', meaning: 'น่าทึ่ง' }, { word: 'harmony', meaning: 'ความกลมกลืน' }] },
          { text: 'Just enjoy the moment in silence', textTH: 'เพลิดเพลินกับช่วงเวลาอย่างเงียบๆ', nextScene: 'ending-peaceful', vocabulary: [{ word: 'proudly', meaning: 'อย่างภูมิใจ' }, { word: 'amazed', meaning: 'ประทับใจ' }] },
        ],
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
    description: 'Explore a mysterious 200-year-old temple',
    descriptionTH: 'สำรวจวัดเก่า 200 ปี ที่เต็มไปด้วยปริศนา',
    estimatedMinutes: 8,
    totalScenes: 14,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'The Assignment',
        illustration: '📋',
        mood: 'mysterious',
        content: 'Your English teacher, Kru Sarah, hands you a special assignment.\n\n"Class, your homework is to visit an old temple and write a story about it in English. But this isn\'t just any temple — it\'s Wat Phra Kaew, the oldest temple in our province. It\'s over 200 years old."\n\nShe lowers her voice mysteriously.\n\n"Legend says there\'s a hidden treasure inside. Nobody has found it in 50 years. But I believe... someone in this class might be the one."\n\nYour heart beats faster. This is going to be an adventure.',
        contentTH: 'ครูซาร่า ครูสอนภาษาอังกฤษ มอบหมายงานพิเศษ\n\n"นักเรียนทุกคน การบ้านคือไปเที่ยววัดเก่าแล้วเขียนเรื่องเป็นภาษาอังกฤษ แต่ไม่ใช่แค่วัดไหน — เป็นวัดพระแก้ว วัดเก่าแก่ที่สุดในจังหวัด มีอายุกว่า 200 ปี"\n\nเธอพูดเสียงลึกลับ\n\n"ตำนานเล่าว่ามีขุมทรัพย์ซ่อนอยู่ ไม่มีใครหาเจอมา 50 ปีแล้ว แต่ฉันเชื่อว่า... อาจมีคนในห้องนี้เป็นคนนั้น"\n\nหัวใจคุณเต้นแรงขึ้น นี่จะเป็นการผจญภัยครั้งใหญ่',
        choices: [
          { text: '🎒 Go to the temple right after school', textTH: '🎒 ไปวัดทันทีหลังเลิกเรียน', nextScene: 'arrival', vocabulary: [{ word: 'legend', meaning: 'ตำนาน' }, { word: 'mysterious', meaning: 'ลึกลับ' }] },
          { text: '📚 Research the temple\'s history first', textTH: '📚 หาข้อมูลประวัติวัดก่อน', nextScene: 'research', vocabulary: [{ word: 'assignment', meaning: 'งานมอบหมาย' }, { word: 'hidden', meaning: 'ซ่อนอยู่' }] },
        ],
      },
      research: {
        id: 'research',
        title: 'The History',
        illustration: '📚',
        mood: 'calm',
        content: 'That evening, you open your laptop and search for "Wat Phra Kaew Khon Kaen."\n\nYou find an article from the local newspaper:\n\n"Wat Phra Kaew was built in 1827 by a wealthy merchant named Luang Pho Dam. According to temple records, he hid a precious collection of Buddhist scriptures inside the main hall before he died. The entrance to the hidden chamber was sealed with a triple lock — numbers, letters, and symbols."\n\nBelow the article, someone commented: "I tried to find it last year. The clues are in the paintings on the walls."',
        contentTH: 'คืนนั้น คุณเปิดแล็ปท็อปค้นหา "วัดพระแก้วขอนแก่น"\n\nคุณเจอบทความจากหนังสือพิมพ์ท้องถิ่น:\n\n"วัดพระแก้วสร้างขึ้นในปี 2470 โดยพ่อค้ารวยชื่อหลวงพ่อ dams ตามบันทึกวัด เขาซ่อนคัมภีร์พระพุทธศาสนาล้ำค่าไว้ในห้องโถงใหญ่ก่อนตาย ทางเข้าห้องลับถูกปิดด้วยล็อคสามชั้น — ตัวเลข ตัวอักษร และสัญลักษณ์"\n\nใต้บทความ มีคนคอมเมนต์: "ปีที่แล้วลองไปหา แต่เบาะแสถูกซ่อนไว้ในภาพวาดบนผนัง"',
        choices: [
          { text: 'Print the map and go tomorrow', textTH: 'ปริ้นท์แผนที่แล้วไปพรุ่งนี้', nextScene: 'arrival', vocabulary: [{ word: 'scriptures', meaning: 'คัมภีร์' }, { word: 'sealed', meaning: 'ปิดผนึก' }] },
          { text: 'Note the clues — paintings and locks', textTH: 'จดเบาะแส — ภาพวาดและล็อค', nextScene: 'arrival', vocabulary: [{ word: 'chamber', meaning: 'ห้องลับ' }, { word: 'triple', meaning: 'สามชั้น' }] },
        ],
      },
      arrival: {
        id: 'arrival',
        title: 'The Gate',
        illustration: '🛕',
        mood: 'mysterious',
        content: 'You arrive at Wat Phra Kaew on a cloudy afternoon. The air is cooler here, shaded by ancient trees.\n\nThe temple is more beautiful than you expected. Golden spires reach toward the sky. Stone guardians flank the entrance, their faces worn smooth by centuries of rain.\n\nBut something feels... different. There\'s an energy here that you can\'t explain. The hairs on your arms stand up.\n\nThe main gate is open, but a narrow side path disappears into the jungle behind the temple.',
        contentTH: 'คุณมาถึงวัดพระแก้วในบ่ายที่มีเมฆ อากาศเย็นกว่าที่อื่น ร่มเงาจากต้นไม้โบราณ\n\nวัดสวยกว่าที่คิด ยอดเจดีย์สีทองพุ่งขึ้นฟ้า หินพญานาค守护อยู่สองข้างทางเข้า ใบหน้าเรียบเนียนจากสายฝนหลายศตวรรษ\n\nแต่มีบางอย่างรู้สึก... ต่างออกไป มีพลังงานบางอย่างที่อธิบายไม่ได้ ขนแขนตั้ง\n\nประตูหลักเปิดอยู่ แต่ทางเดินแคบข้างๆ หายเข้าไปในป่าหลังวัด',
        choices: [
          { text: '🏛️ Enter through the main gate', textTH: '🏛️ เข้าประตูหลัก', nextScene: 'main-hall', vocabulary: [{ word: 'guardian', meaning: 'ผู้守护' }, { word: 'spire', meaning: 'ยอดเจดีย์' }] },
          { text: '🌿 Explore the side path first', textTH: '🌿 สำรวจทางเดินข้างก่อน', nextScene: 'side-path', vocabulary: [{ word: 'narrow', meaning: 'แคบ' }, { word: 'centuries', meaning: 'หลายศตวรรษ' }] },
        ],
      },
      'main-hall': {
        id: 'main-hall',
        title: 'The Main Hall',
        illustration: '🏛️',
        mood: 'mysterious',
        content: 'Inside the main hall, you gasp. The ceiling is covered in intricate murals depicting scenes from the Buddha\'s life. Gold leaf glimmers in the dim light.\n\nIn the center stands a magnificent Buddha statue, serene and timeless. Its eyes seem to follow you.\n\nAs you circle the statue, you notice something behind it — a small wooden door, almost invisible in the shadows. It has three padlocks, each with a different type of mechanism.',
        contentTH: 'ในห้องโถงใหญ่ คุณอุทาน เพดานเต็มไปด้วยจิตรกรรมฝาผนังที่ละเอียดเล่าเรื่องชีวิตพระพุทธเจ้า ทองคำเปลวเป็นประกายในแสงสลัว\n\nตรงกลางมีพระพุทธรูปสง่างาม เยือกเย็นและไม่มีวันเก่า ดวงตาเหมือนมองตามคุณ\n\nตอนที่เดินรอบองค์พระ คุณสังเกตเห็นบางอย่างหลังองค์ — ประตูไม้เล็กๆ เกือบมองไม่เห็นในเงามืด มันมีล็อคสามตัว แต่ละตัวมีกลไกต่างกัน',
        choices: [
          { text: '🔍 Inspect the three locks closely', textTH: '🔍 ดูล็อคสามตัวอย่างละเอียด', nextScene: 'inspect-locks', vocabulary: [{ word: 'intricate', meaning: 'ละเอียดซับซ้อน' }, { word: 'serene', meaning: 'เยือกเย็น' }] },
          { text: '🖼️ Study the murals for clues', textTH: '🖼️ ดูภาพจิตรกรรมหาเบาะแส', nextScene: 'murals', vocabulary: [{ word: 'mechanism', meaning: 'กลไก' }, { word: 'glimmer', meaning: 'เป็นประกาย' }] },
        ],
      },
      'side-path': {
        id: 'side-path',
        title: 'The Secret Garden',
        illustration: '🌿',
        mood: 'mysterious',
        content: 'The side path leads you through dense vegetation. Branches reach out like fingers, and you have to push through several thick bushes.\n\nThen suddenly, the path opens into a hidden courtyard. An ancient tree stands in the center, its roots forming natural archways. Beneath it, an old stone well sits quietly.\n\nSomething catches your eye — a glint of metal in the well. You peer over the edge and see a bronze key resting on a submerged stone ledge.',
        contentTH: 'ทางเดินข้างนำคุณผ่านพุ่มไม้หนาทึบ กิ่งไม้ยื่นออกเหมือนนิ้ว คุณต้องฝ่าพุ่มไม้หนาหลายจุด\n\nแล้วจู่ๆ ทางเดินเปิดออกเป็นลานลับ ต้นไม้โบราณต้นหนึ่งยืนอยู่ตรงกลาง รากของมันโค้งเป็นซุ้มธรรมชาติใต้ต้น มีบ่อน้ำหินเก่าตั้งเงียบๆ\n\nบางอย่างดึงดูดสายตา — แสงประกายของโลหะในบ่อ คุณชะโงกดูแล้วเห็นกุญแจทองแดงวางบนหินจมอยู่ในน้ำ',
        choices: [
          { text: '🏊 Reach down and grab the key', textTH: '🏊 เอื้อมหยิบกุญแจ', nextScene: 'got-key', vocabulary: [{ word: 'submerged', meaning: 'จมอยู่ในน้ำ' }, { word: 'courtyard', meaning: 'ลาน' }] },
          { text: '🔍 Look around for more clues first', textTH: '🔍 ดูรอบๆ หาเบาะแสก่อน', nextScene: 'garden-clues', vocabulary: [{ word: 'vegetation', meaning: 'พืชพรรณ' }, { word: 'glint', meaning: 'แสงประกาย' }] },
        ],
      },
      'got-key': {
        id: 'got-key',
        title: 'The Bronze Key',
        illustration: '🗝️',
        mood: 'exciting',
        content: 'You carefully reach into the cold water. Your fingers close around the key — it\'s heavier than expected.\n\nAs you pull it out, you notice strange symbols carved into its surface: "๓-๑-๕"\n\nThese are Thai numerals! 3-1-5. Could this be a code?\n\nThe key looks old — very old. The bronze has developed a beautiful green patina over centuries. This must be the key to one of the locks behind the Buddha statue.',
        contentTH: 'คุณเอื้อมมือลงไปในน้ำเย็น นิ้วปิดรอบกุญแจ — มันหนักกว่าที่คิด\n\nตอนที่หยิบออกมา คุณเห็นสัญลักษณ์แปลกๆ สลักอยู่บนผิว: "๓-๑-๕"\n\nนี่คือตัวเลขไทย! 3-1-5 นี่อาจเป็นรหัส?\n\nกุญแจดูเก่า — เก่ามาก ทองแดงพัฒนาสีเขียวสวยตลอดหลายศตวรรษ นี่ต้องเป็นกุญแจล็อคตัวใดตัวหนึ่งหลังองค์พระ',
        choices: [
          { text: '🏛️ Go to the main hall with the key', textTH: '🏛️ ถือกุญแจไปห้องโถงใหญ่', nextScene: 'main-hall', vocabulary: [{ word: 'patina', meaning: 'คราบสีเขียวบนทองแดง' }, { word: 'numeral', meaning: 'ตัวเลข' }] },
        ],
      },
      'garden-clues': {
        id: 'garden-clues',
        title: 'Hidden Messages',
        illustration: '🔎',
        mood: 'mysterious',
        content: 'You examine the garden more carefully. On the trunk of the ancient tree, someone has carved symbols — but they\'re faded with age.\n\nWith your phone\'s flashlight, you make out:\n\n"The truth lies in the light of wisdom"\n"A key needs a word, and a word needs a key"\n\nBelow the text, you see three small carvings: a clock, a book, and a lotus flower.\n\nThen you notice the well and the glint of metal...',
        contentTH: 'คุณสำรวจสวนอย่างละเอียด บนต้นไม้โบราณมีคนสลักสัญลักษณ์ — แต่เลือนไปตามกาลเวลา\n\nด้วยไฟฉายมือถือ คุณอ่านออก:\n\n"ความจริงอยู่ที่แสงแห่งปัญญา"\n"กุญแจต้องมีคำ และคำต้องมีกุญแจ"\n\nใต้ข้อความ คุณเห็นภาพแกะสลักเล็กๆ สามภาพ: นาฬิกา หนังสือ และดอกบัว\n\nแล้วคุณก็สังเกตเห็นบ่อน้ำและแสงประกายของโลหะ...',
        choices: [
          { text: 'Pool and grab the key', textTH: 'ลงบ่อหยิบกุญแจ', nextScene: 'got-key', vocabulary: [{ word: 'carved', meaning: 'สลัก' }, { word: 'wisdom', meaning: 'ปัญญา' }] },
          { text: 'Head to the main hall with what you know', textTH: 'ไปห้องโถงใหญ่พร้อมสิ่งที่รู้', nextScene: 'main-hall', vocabulary: [{ word: 'faded', meaning: 'เลือน' }, { word: 'lotus', meaning: 'ดอกบัว' }] },
        ],
      },
      'inspect-locks': {
        id: 'inspect-locks',
        title: 'Three Locks',
        illustration: '🔒',
        mood: 'tense',
        content: 'You kneel down to examine the three padlocks:\n\n🔢 LEFT LOCK: A 3-digit number combination\n🔤 MIDDLE LOCK: A word combination (letters only)\n🔷 RIGHT LOCK: A symbol pattern\n\nEach lock is old but functional. You need all three codes to open the door.\n\nWhere could these codes be hidden?',
        contentTH: 'คุณนั่งยองๆ ดูล็อคสามตัว:\n\n🔢 ล็อคซ้าย: รหัสตัวเลข 3 ตัว\n🔤 ล็อคกลาง: รหัสตัวอักษร (คำ)\n🔷 ล็อคขวา: รูปแบบสัญลักษณ์\n\nแต่ละล็อคเก่าแต่ยังใช้ได้ คุณต้องมีรหัสทั้งสามถึงจะเปิดประตูได้\n\nรหัสพวกนี้ซ่อนอยู่ที่ไหน?',
        choices: [
          { text: '🖼️ Check the murals on the walls', textTH: '🖼️ ดูจิตรกรรมบนผนัง', nextScene: 'murals', vocabulary: [{ word: 'combination', meaning: 'รหัส' }, { word: 'mechanism', meaning: 'กลไก' }] },
          { text: '🔎 Search the room systematically', textTH: '🔎 ค้นหาอย่างเป็นระบบ', nextScene: 'search-room', vocabulary: [{ word: 'functional', meaning: 'ใช้ได้' }, { word: 'systematically', meaning: 'อย่างเป็นระบบ' }] },
        ],
      },
      murals: {
        id: 'murals',
        title: 'Paintings of the Past',
        illustration: '🎨',
        mood: 'mysterious',
        content: 'You examine each mural carefully. In the third painting, you spot a hidden message among the painted lotus flowers:\n\n"The number of the merchant\'s birth year, reversed"\n\nLuang Pho Dam was born in 1298 (Buddhist Era), so reversed = 8-9-2-1... but the lock needs only 3 digits. Maybe it\'s just 8-9-2?\n\nIn the fourth painting, hidden in the pattern of a monk\'s robe, you find:\n\n"The word that brings peace to all"\n\nPeace... PEACE!',
        contentTH: 'คุณดูจิตรกรรมแต่ละภาพอย่างละเอียด ในภาพที่สาม คุณเห็นข้อความซ่อนในลวดลายดอกบัว:\n\n"ปีเกิดของพ่อค้า พลิกกลับ"\n\nหลวงพ่อ dams เกิดปี 1298 (พ.ศ.) พลิกกลับ = 8-9-2-1... แต่ล็อคต้องการแค่ 3 ตัว อาจเป็นแค่ 8-9-2?\n\nในภาพที่สี่ ซ่อนในลวดลายจีวรพระ คุณเจอ:\n\n"คำที่นำความสงบสุขมาให้ทุกคน"\n\nสงบ... PEACE!',
        choices: [
          { text: 'Try the codes on the locks!', textTH: 'ลองรหัสที่ล็อค!', nextScene: 'ending-treasure', vocabulary: [{ word: 'reversed', meaning: 'พลิกกลับ' }, { word: 'peaceful', meaning: 'สงบ' }] },
          { text: 'Look for the symbol clue too', textTH: 'หาเบาะแสสัญลักษณ์ด้วย', nextScene: 'find-symbol', vocabulary: [{ word: 'robe', meaning: 'จีวร' }, { word: 'pattern', meaning: 'ลวดลาย' }] },
        ],
      },
      'search-room': {
        id: 'search-room',
        title: 'The Search',
        illustration: '🔎',
        mood: 'mysterious',
        content: 'You search every corner of the small room. Behind a dusty scroll, you find a yellowed note:\n\n"To open the way, remember:\n🔢 8-9-2\n🔤 PEACE\n🔷 ◆"\n\nSomeone was here before you! But they never published their findings. Why?\n\nMaybe they didn\'t have all the pieces. But you do.',
        contentTH: 'คุณค้นทุกมุมห้องเล็กๆ หลังม้วนกระดาษฝุ่น คุณเจอโน้ตเหลือง:\n\n"เพื่อเปิดทาง จำไว้:\n🔢 8-9-2\n🔤 PEACE\n🔷 ◆"\n\nมีคนมาก่อนคุณ! แต่ไม่เคยเผยแพร่ ทำไม?\n\nอาจไม่มีครบทุกอย่าง แต่คุณมีครบ',
        choices: [
          { text: 'Return to the locks with confidence!', textTH: 'กลับไปที่ล็อคด้วยความมั่นใจ!', nextScene: 'ending-treasure', vocabulary: [{ word: 'yellowed', meaning: 'เหลืองซีด' }, { word: 'published', meaning: 'เผยแพร่' }] },
        ],
      },
      'find-symbol': {
        id: 'find-symbol',
        title: 'The Final Clue',
        illustration: '🔷',
        mood: 'mysterious',
        content: 'You search for the symbol. Behind the Buddha statue, scratched into the base, you find a small diamond shape: ◆\n\nNow you have all three:\n🔢 8-9-2\n🔤 PEACE\n🔷 ◆\n\nYour hands are trembling with excitement. This is really happening!',
        contentTH: 'คุณหาสัญลักษณ์ หลังองค์พระ สลักอยู่บนฐาน คุณเห็นรูปdiamondเล็กๆ: ◆\n\nตอนนี้ครบแล้ว:\n🔢 8-9-2\n🔤 PEACE\n🔷 ◆\n\nมือคุณสั่นด้วยความตื่นเต้น นี่กำลังเกิดขึ้นจริงๆ!',
        choices: [
          { text: 'Open the three locks!', textTH: 'ไขล็อคทั้งสาม!', nextScene: 'ending-treasure', vocabulary: [{ word: 'diamond', meaning: 'เพชร' }, { word: 'trembling', meaning: 'สั่น' }] },
        ],
      },
      'ending-treasure': {
        id: 'ending-treasure',
        illustration: '📖',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'Click. Click. Click.\n\nThe three locks fall open. The door creaks, revealing a small chamber bathed in golden light from a hidden window.\n\nInside, on an ancient pedestal, sits a beautiful chest. You open it with trembling hands.\n\nInside is... not gold or jewels. It\'s a collection of ancient Buddhist scriptures, perfectly preserved in silk wrapping. Each one is written in gold ink on palm leaves.\n\n"These are priceless," you whisper. "Luang Pho Dam\'s life\'s work."\n\nYou carefully take photos of everything and rush to tell Kru Sarah.\n\nAt school the next day, your story becomes the talk of the entire class. The ancient scriptures are now safely in a museum, and Kru Sarah gives you an A+.\n\nBut the real treasure? The adventure itself. 🏆📖✨',
        contentTH: 'คลิก คลิก คลิก\n\nล็อคสามตัวหลุดออก ประตูเปิดออกเผยห้องเล็กๆ ที่อาบด้วยแสงสีทองจากหน้าต่างซ่อน\n\nข้างใน บนแท่นโบราณ มีหีบสมบัติสวยๆ คุณเปิดด้วยมือสั่น\n\nข้างในไม่ใช่ทองหรือเพชร แต่เป็นคัมภีร์พระพุทธศาสนาโบราณ อนุรักษ์ไว้อย่างสมบูรณ์ในผ้าไหม แต่ละเล่มเขียนด้วยหมึกทองบนใบตาล\n\n"นี่ล้ำค่ามาก" คุณกระซิบ "งานชีวิตของหลวงพ่อ dams"\n\nคุณถ่ายรูปทุกอย่างอย่างระมัดระวังแล้วรีบไปบอกครูซาร่า\n\nวันรุ่งขึ้นที่โรงเรียน เรื่องของคุณกลายเป็น Talk of the class คัมภีร์โบราณได้รับการดูแลอย่างปลอดภัยในพิพิธภัณฑ์ และครูซาร่าให้คุณ A+\n\nแต่ขุมทรัพย์ที่แท้จริงคืออะไร? การผจญภัยนั่นเอง 🏆📖✨',
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
    description: 'A fun shopping adventure at a Thai market',
    descriptionTH: 'การผจญภัยช้อปปิ้งสนุกๆ ที่ตลาดนัดไทย',
    estimatedMinutes: 4,
    totalScenes: 12,
    startScene: 'start',
    scenes: {
      start: {
        id: 'start',
        title: 'Mission: Dinner Shopping',
        illustration: '🛒',
        mood: 'exciting',
        content: 'It\'s Saturday morning and the big market is open!\n\nYour mom hands you 200 baht. "Please buy dinner for the whole family tonight. We\'re having guests — Aunt Nok and Uncle Boon are coming!"\n\n"That\'s 6 people!" you exclaim.\n\n"Exactly. Make it count." Mom winks.\n\nYou feel the weight of responsibility — and excitement. This is your first time shopping for the whole family!',
        contentTH: 'เช้าวันเสาร์และตลาดใหญ่เปิดแล้ว!\n\nแม่ให้คุณ 200 บาท "ช่วยซื้ออาหารมื้อค่ำให้ทั้งครอบครัวคืนนี้ด้วยนะ มีแขกมาด้วย — ป้านกและลุงบุญมา"\n\n"นั่น 6 คนเลยนะ!" คุณอุทาน\n\n"ใช่แล้ว เลือกดีๆ นะ" แม่ขยิบตา\n\nคุณรู้สึกถึงความรับผิดชอบ — และความตื่นเต้น นี่เป็นครั้งแรกที่ซื้ออาหารให้ทั้งครอบครัว!',
        choices: [
          { text: '🛒 Head straight to the food stalls', textTH: '🛒 ไปร้านอาหารเลย', nextScene: 'food-area', vocabulary: [{ word: 'responsibility', meaning: 'ความรับผิดชอบ' }, { word: 'guests', meaning: 'แขก' }] },
          { text: '👀 First, explore the whole market!', textTH: '👀 สำรวจตลาดทั้งหมดก่อน!', nextScene: 'explore', vocabulary: [{ word: 'exclaim', meaning: 'อุทาน' }, { word: 'weight', meaning: 'น้ำหนัก/ความสำคัญ' }] },
        ],
      },
      explore: {
        id: 'explore',
        title: 'The Colorful Market',
        illustration: '🌈',
        mood: 'happy',
        content: 'The market is a feast for your senses! Bright fabrics hang from every stall. The smell of grilled pork mingles with fresh coconut. Somewhere, a vendor is shouting prices.\n\nYou pass:\n• A clothing stall with beautiful Thai silk (250 THB)\n• A toy shop with model airplanes (180 THB)\n• A fruit seller with the biggest mangoes you\'ve ever seen\n\nYou stop at the mango stall. The mangoes are golden yellow and smell incredible.',
        contentTH: 'ตลาดเป็นงานเลี้ยงสำหรับประสาทสัมผัส! ผ้าสีสันสดใสแขวนทุกร้าน กลิ่นหมูย่างผสมกับมะพร้าวสด ที่ไหนสักแห่งแม่ค้าตะโกนราคา\n\nคุณเดินผ่าน:\n• ร้านผ้าไหมไทยสวยๆ (250 บาท)\n• ร้านของเล่นเครื่องบินจำลอง (180 บาท)\n• ร้านผลไม้มะม่วงใหญ่ที่สุดที่เคยเห็น\n\nคุณหยุดที่ร้านมะม่วง มะม่วงสีทองเหลืองและกลิ่นหอมมาก',
        choices: [
          { text: '🥭 Buy 1kg mangoes (30 THB)', textTH: '🥭 ซื้อมะม่วง 1 กก. (30 บาท)', nextScene: 'buy-mangoes', vocabulary: [{ word: 'fabric', meaning: 'ผ้า' }, { word: 'incredible', meaning: 'น่าทึ่ง' }] },
          { text: '🚶 Remember the mission! Head to food stalls', textTH: '🚶 นึกถึงภารกิจ! ไปร้านอาหาร', nextScene: 'food-area', vocabulary: [{ word: 'vendor', meaning: 'แม่ค้า' }, { word: 'mingle', meaning: 'ผสม' }] },
        ],
      },
      'buy-mangoes': {
        id: 'buy-mangoes',
        title: 'Mango Shopping',
        illustration: '🥭',
        mood: 'happy',
        content: '"How much for 1 kilo?" you ask.\n\n"Only 30 baht! Best mangoes in the market!" the seller smiles.\n\nYou hand over 30 baht. Remaining budget: 170 baht.\n\nThe seller bags the mangoes carefully. "These are Nam Dok Mai — the sweetest variety. Your family will love them!"\n\nYou feel proud of your first purchase. But there\'s still dinner to buy!',
        contentTH: '"1 กิโลเท่าไหร่?" คุณถาม\n\n"30 บาท! มะม่วงดีที่สุดในตลาด!" แม่ค้ายิ้ม\n\nคุณจ่าย 30 บาท งบเหลือ: 170 บาท\n\nแม่ค้าใส่ถุงมะม่วงอย่างดี "นี่น้ำดอกไม้ — พันธุ์หวานที่สุด ครอบครัวจะชอบแน่!"\n\nคุณรู้สึกภูมิใจในการซื้อครั้งแรก แต่ยังต้องซื้ออาหารมื้อค่ำอีก!',
        choices: [
          { text: '🍗 Go to the food section now', textTH: '🍗 ไปโซนอาหารเลย', nextScene: 'food-area', vocabulary: [{ word: 'variety', meaning: 'พันธุ์' }, { word: 'purchase', meaning: 'การซื้อ' }] },
        ],
      },
      'food-area': {
        id: 'food-area',
        title: 'The Food Heaven',
        illustration: '🍗',
        mood: 'exciting',
        content: 'The food section is incredible! The smells make your mouth water.\n\nYou see:\n• 🍗 Grilled Chicken — 80 THB (whole chicken)\n• 🥗 Som Tam — 35 THB\n• 🍚 Sticky Rice — 10 THB per bag\n• 🦀 Crab Som Tam — 50 THB\n• 🍜 Boat Noodles — 40 THB per bowl\n• 🥥 Coconut Ice Cream — 25 THB\n\nBudget remaining: 170 THB (or 140 if you bought mangoes)\n\nYou need to feed 6 people!',
        contentTH: 'โซนอาหารน่าทึ่งมาก! กลิ่นทำให้น้ำลายสอ\n\nคุณเห็น:\n• 🍗 ไก่ย่าง — 80 บาท (ทั้งตัว)\n• 🥗 ส้มตำ — 35 บาท\n• 🍚 ข้าวเหนียว — 10 บาท/ถุง\n• 🦀 ส้มตำปู — 50 บาท\n• 🍜 ก๋วยเตี๋ยวเรือ — 40 บาท/ชาม\n• 🥥 ไอศกรีมมะพร้าว — 25 บาท\n\nงบเหลือ: 170 บาท (หรือ 140 ถ้าซื้อมะม่วงแล้ว)\n\nต้องเลี้ยง 6 คน!',
        choices: [
          { text: '🍗 Buy grilled chicken + rice + som tam (125 THB)', textTH: '🍗 ซื้อไก่ย่าง + ข้าว + ส้มตำ (125 บาท)', nextScene: 'good-deal', vocabulary: [{ word: 'incredible', meaning: 'น่าทึ่ง' }, { word: 'budget', meaning: 'งบ' }] },
          { text: '🤔 Think carefully and ask vendors', textTH: '🤔 คิดให้ดีและถามแม่ค้า', nextScene: 'ask-vendor', vocabulary: [{ word: 'vendor', meaning: 'แม่ค้า' }, { word: 'feed', meaning: 'เลี้ยง' }] },
        ],
      },
      'ask-vendor': {
        id: 'ask-vendor',
        title: 'Expert Advice',
        illustration: '💬',
        mood: 'warm',
        content: '"Excuse me, I need to feed 6 people with 170 baht. What do you recommend?"\n\nThe food vendor thinks for a moment. "Buy my grilled chicken — 80 baht for the whole thing. Get sticky rice — 20 baht for two bags. And som tam — 35 baht. That\'s only 135 baht total! Your guests will be full and happy."\n\nShe adds with a wink: "And with the remaining 35 baht, buy some coconut ice cream for dessert. Trust me — they\'ll love it."',
        contentTH: '"ขอโทษครับ/ค่ะ ต้องเลี้ยง 6 คนด้วย 170 บาท แนะนำอะไรดีครับ/ค่ะ?"\n\nแม่ค้าคิดสักครู่ "ซื้อไก่ย่างของดิฉัน — 80 บาททั้งตัว ซื้อข้าวเหนียว — 20 บาทได้สองถุง กับส้มตำ — 35 บาท แค่ 135 บาท! แขกจะอิ่มและมีความสุข"\n\nเธอเสริมขยิบตา: "แล้วเงินเหลือ 35 บาท ซื้อไอศกรีมมะพร้าวเป็นของหวานด้วย เชื่อดิฉัน — ทุกคนจะชอบ"',
        choices: [
          { text: '✅ Follow her advice exactly!', textTH: '✅ ทำตามคำแนะนำเลย!', nextScene: 'ending-perfect', vocabulary: [{ word: 'recommend', meaning: 'แนะนำ' }, { word: 'remaining', meaning: 'ที่เหลือ' }] },
          { text: '➕ Add crab som tam too!', textTH: '➕ เพิ่มส้มตำปูด้วย!', nextScene: 'ending-luxury', vocabulary: [{ word: 'crab', meaning: 'ปู' }, { word: 'dessert', meaning: 'ของหวาน' }] },
        ],
      },
      'good-deal': {
        id: 'good-deal',
        title: 'Smart Shopping',
        illustration: '💡',
        mood: 'happy',
        content: 'You carry bags of food through the market: the warm grilled chicken, sticky rice, and spicy som tam.\n\nYou still have 45 baht left! You could save it or spend it...\n\nThen you spot a fresh coconut stand. Cold coconut water — 25 THB.',
        contentTH: 'คุณหิ้วถุงอาหารเดินผ่านตลาด: ไก่ย่างอุ่นๆ ข้าวเหนียว และส้มตำแซ่บๆ\n\nยังเหลือ 45 บาท! จะเก็บหรือใช้ดี...\n\nแล้วคุณเห็นร้านน้ำมะพร้าว น้ำมะพร้าวเย็น — 25 บาท',
        choices: [
          { text: '🥥 Buy coconut water for everyone (25 THB)', textTH: '🥥 ซื้อน้ำมะพร้าวให้ทุกคน (25 บาท)', nextScene: 'ending-perfect', vocabulary: [{ word: 'coconut', meaning: 'มะพร้าว' }, { word: 'spicy', meaning: 'แซ่บ/เผ็ด' }] },
          { text: '💰 Save all the money for mom', textTH: '💰 เก็บเงินให้แม่หมด', nextScene: 'ending-save', vocabulary: [{ word: 'save', meaning: 'เก็บออม' }, { word: 'budget', meaning: 'งบ' }] },
        ],
      },
      'ending-perfect': {
        id: 'ending-perfect',
        illustration: '🎉',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'You walk through the front door with bags of food and coconut water. The whole family is waiting.\n\n"Wow! Look at all this food!" Aunt Nok exclaims.\n\nMom tastes the grilled chicken. Her eyes widen. "This is delicious! How much did you spend?"\n\n"135 baht for everything!"\n\n"You\'re a natural shopper!" Uncle Boon laughs.\n\nAs the whole family enjoys dinner together, you feel a warm glow inside. You did it. You fed 6 people with 200 baht — and everyone loved it.\n\nMom squeezes your hand. "I\'m so proud of you."\n\nBest. Saturday. Ever. 🏆❤️',
        contentTH: 'คุณเดินเข้าบ้านพร้อมถุงอาหารและน้ำมะพร้าว ทั้งครอบครัวรออยู่\n\n"ว้าว! เยอะแยะเลย!" ป้านกอุทาน\n\nแม่ชิมไก่ย่าง ตาเป็นกว้าง "อร่อยมาก! หมดไปเท่าไหร่?"\n\n"แค่ 135 บาท ทุกอย่าง!"\n\n"เก่งช็อปปิ้งจริงๆ!" ลุงบุญหัวเราะ\n\nตอนที่ทั้งครอบครัวกินมื้อค่ำด้วยกัน คุณรู้สึกอบอุ่นภายใน คุณทำได้ เลี้ยง 6 คนด้วย 200 บาท — และทุกคนชอบ!\n\nแม่บีบมือ "แม่ภูมิใจมาก"\n\nเสาร์ที่ดีที่สุด เคยมี 🏆❤️',
      },
      'ending-luxury': {
        id: 'ending-luxury',
        illustration: '🦀',
        mood: 'happy',
        isEnding: true,
        endingType: 'good',
        content: 'You go all out: grilled chicken, sticky rice, som tam, AND crab som tam! Total: 160 baht. You have 10 baht left.\n\nAt dinner, everyone is amazed by the variety of food.\n\n"Crab som tam too?! You really went all out!" Dad says, impressed.\n\nAunt Nok tries the grilled chicken and closes her eyes in bliss. "Where did you buy this? It\'s incredible!"\n\n"The market near our house," you say proudly.\n\nMom looks at you with a special smile. "You\'re growing up so fast."\n\nBest dinner party ever. And it was all you. 🦀🏆❤️',
        contentTH: 'คุณจัดเต็ม: ไก่ย่าง ข้าวเหนียว ส้มตำ และส้มตำปู! รวม 160 บาท เหลือ 10 บาท\n\nมื้อค่ำ ทุกคนประทับใจกับอาหาร variety\n\n"ส้มตำปูด้วย?! จัดเต็มจริงๆ!" พ่อพูด ประทับใจ\n\nป้านกชิมไก่ย่างแล้วหลับตา "ซื้อที่ไหน? อร่อยมาก!"\n\n"ตลาดใกล้บ้านเรา" คุณพูดอย่างภูมิใจ\n\nแม่มองคุณด้วยรอยยิ้มพิเศษ "ลูกโตเร็วจริงๆ"\n\nมื้อค่ำที่ดีที่สุด และทุกอย่างเป็นฝีมือคุณ 🦀🏆❤️',
      },
      'ending-save': {
        id: 'ending-save',
        illustration: '💰',
        mood: 'warm',
        isEnding: true,
        endingType: 'good',
        content: 'You hand your mom the remaining 45 baht. She looks surprised.\n\n"You saved this? I thought you\'d spend it all!"\n\n"I wanted to help with the budget," you say.\n\nMom hugs you tight. "You\'re so responsible. I\'m really proud."\n\nDinner is wonderful — grilled chicken, rice, and som tam. Everyone is full and happy.\n\nLater that night, Mom gives you back 50 baht. "This is your reward for being so smart with money. Keep it for yourself."\n\nYou feel warm inside. Being responsible feels really good. 💰❤️',
        contentTH: 'คุณยื่นเงินเหลือ 45 บาทให้แม่ เธอดูแปลกใจ\n\n"เก็บเงินไว้เหรอ? แม่คิดว่าจะใช้หมด!"\n\n"อยากช่วยเรื่องงบ" คุณพูด\n\nแม่กอดคุณแน่น "ลูกมีความรับผิดชอบมาก แม่ภูมิใจจริงๆ"\n\nมื้อค่ำยอดเยี่ยม — ไก่ย่าง ข้าว ส้มตำ ทุกคนอิ่มและมีความสุข\n\nคืนนั้น แม่คืนเงิน 50 บาทให้คุณ "นี่คือรางวัลที่จัดการเงินเก่ง เก็บไว้ใช้เองนะ"\n\nคุณรู้สึกอบอุ่นภายใน การมีความรับผิดชอบรู้สึกดีมาก 💰❤️',
      },
    },
  },
]
