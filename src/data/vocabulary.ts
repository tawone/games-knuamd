export interface Word {
  id: number
  english: string
  thai: string
  category: string
  emoji: string
}

export const vocabulary: Word[] = [
  { id: 1, english: 'Hello', thai: 'สวัสดี', category: 'greetings', emoji: '👋' },
  { id: 2, english: 'Goodbye', thai: 'ลาก่อน', category: 'greetings', emoji: '👋' },
  { id: 3, english: 'Thank you', thai: 'ขอบคุณ', category: 'greetings', emoji: '🙏' },
  { id: 4, english: 'Please', thai: 'กรุณา', category: 'greetings', emoji: '🙏' },
  { id: 5, english: 'Sorry', thai: 'ขอโทษ', category: 'greetings', emoji: '😔' },
  { id: 6, english: 'Good morning', thai: 'สวัสดีตอนเช้า', category: 'greetings', emoji: '🌅' },
  { id: 7, english: 'Good night', thai: 'ราตรีสวัสดิ์', category: 'greetings', emoji: '🌙' },
  { id: 8, english: 'How are you?', thai: 'สบายดีไหม', category: 'greetings', emoji: '😊' },

  { id: 9, english: 'Water', thai: 'น้ำ', category: 'food', emoji: '💧' },
  { id: 10, english: 'Rice', thai: 'ข้าว', category: 'food', emoji: '🍚' },
  { id: 11, english: 'Chicken', thai: 'ไก่', category: 'food', emoji: '🍗' },
  { id: 12, english: 'Fish', thai: 'ปลา', category: 'food', emoji: '🐟' },
  { id: 13, english: 'Egg', thai: 'ไข่', category: 'food', emoji: '🥚' },
  { id: 14, english: 'Fruit', thai: 'ผลไม้', category: 'food', emoji: '🍎' },
  { id: 15, english: 'Milk', thai: 'นม', category: 'food', emoji: '🥛' },
  { id: 16, english: 'Bread', thai: 'ขนมปัง', category: 'food', emoji: '🍞' },

  { id: 17, english: 'Dog', thai: 'สุนัข', category: 'animals', emoji: '🐕' },
  { id: 18, english: 'Cat', thai: 'แมว', category: 'animals', emoji: '🐱' },
  { id: 19, english: 'Bird', thai: 'นก', category: 'animals', emoji: '🐦' },
  { id: 20, english: 'Elephant', thai: 'ช้าง', category: 'animals', emoji: '🐘' },
  { id: 21, english: 'Tiger', thai: 'เสือ', category: 'animals', emoji: '🐯' },
  { id: 22, english: 'Horse', thai: 'ม้า', category: 'animals', emoji: '🐴' },
  { id: 23, english: 'Cow', thai: 'วัว', category: 'animals', emoji: '🐄' },
  { id: 24, english: 'Pig', thai: 'หมู', category: 'animals', emoji: '🐷' },

  { id: 25, english: 'Red', thai: 'สีแดง', category: 'colors', emoji: '🔴' },
  { id: 26, english: 'Blue', thai: 'สีน้ำเงิน', category: 'colors', emoji: '🔵' },
  { id: 27, english: 'Green', thai: 'สีเขียว', category: 'colors', emoji: '🟢' },
  { id: 28, english: 'Yellow', thai: 'สีเหลือง', category: 'colors', emoji: '🟡' },
  { id: 29, english: 'Black', thai: 'สีดำ', category: 'colors', emoji: '⚫' },
  { id: 30, english: 'White', thai: 'สีขาว', category: 'colors', emoji: '⚪' },
  { id: 31, english: 'Orange', thai: 'สีส้ม', category: 'colors', emoji: '🟠' },
  { id: 32, english: 'Purple', thai: 'สีม่วง', category: 'colors', emoji: '🟣' },

  { id: 33, english: 'One', thai: 'หนึ่ง', category: 'numbers', emoji: '1️⃣' },
  { id: 34, english: 'Two', thai: 'สอง', category: 'numbers', emoji: '2️⃣' },
  { id: 35, english: 'Three', thai: 'สาม', category: 'numbers', emoji: '3️⃣' },
  { id: 36, english: 'Four', thai: 'สี่', category: 'numbers', emoji: '4️⃣' },
  { id: 37, english: 'Five', thai: 'ห้า', category: 'numbers', emoji: '5️⃣' },
  { id: 38, english: 'Six', thai: 'หก', category: 'numbers', emoji: '6️⃣' },
  { id: 39, english: 'Seven', thai: 'เจ็ด', category: 'numbers', emoji: '7️⃣' },
  { id: 40, english: 'Eight', thai: 'แปด', category: 'numbers', emoji: '8️⃣' },

  { id: 41, english: 'Book', thai: 'หนังสือ', category: 'school', emoji: '📖' },
  { id: 42, english: 'Pen', thai: 'ปากกา', category: 'school', emoji: '🖊️' },
  { id: 43, english: 'Teacher', thai: 'ครู', category: 'school', emoji: '👩‍🏫' },
  { id: 44, english: 'Student', thai: 'นักเรียน', category: 'school', emoji: '👨‍🎓' },
  { id: 45, english: 'School', thai: 'โรงเรียน', category: 'school', emoji: '🏫' },
  { id: 46, english: 'Classroom', thai: 'ห้องเรียน', category: 'school', emoji: '🏠' },
  { id: 47, english: 'Homework', thai: 'การบ้าน', category: 'school', emoji: '📝' },
  { id: 48, english: 'Exam', thai: 'การสอบ', category: 'school', emoji: '📋' },

  { id: 49, english: 'House', thai: 'บ้าน', category: 'places', emoji: '🏠' },
  { id: 50, english: 'Hospital', thai: 'โรงพยาบาล', category: 'places', emoji: '🏥' },
  { id: 51, english: 'Temple', thai: 'วัด', category: 'places', emoji: '🛕' },
  { id: 52, english: 'Market', thai: 'ตลาด', category: 'places', emoji: '🏪' },
  { id: 53, english: 'Park', thai: 'สวนสาธารณะ', category: 'places', emoji: '🌳' },
  { id: 54, english: 'Bank', thai: 'ธนาคาร', category: 'places', emoji: '🏦' },
  { id: 55, english: 'Airport', thai: 'สนามบิน', category: 'places', emoji: '✈️' },
  { id: 56, english: 'Library', thai: 'ห้องสมุด', category: 'places', emoji: '📚' },

  { id: 57, english: 'Happy', thai: 'มีความสุข', category: 'feelings', emoji: '😊' },
  { id: 58, english: 'Sad', thai: 'เศร้า', category: 'feelings', emoji: '😢' },
  { id: 59, english: 'Angry', thai: 'โกรธ', category: 'feelings', emoji: '😠' },
  { id: 60, english: 'Tired', thai: 'เหนื่อย', category: 'feelings', emoji: '😫' },
  { id: 61, english: 'Hungry', thai: 'หิว', category: 'feelings', emoji: '🤤' },
  { id: 62, english: 'Scared', thai: 'กลัว', category: 'feelings', emoji: '😨' },
  { id: 63, english: 'Excited', thai: 'ตื่นเต้น', category: 'feelings', emoji: '🤩' },
  { id: 64, english: 'Beautiful', thai: 'สวยงาม', category: 'feelings', emoji: '😍' },
]

export const categories = [
  { id: 'greetings', name: 'Greetings', nameTH: 'ทักทาย', emoji: '👋' },
  { id: 'food', name: 'Food', nameTH: 'อาหาร', emoji: '🍽️' },
  { id: 'animals', name: 'Animals', nameTH: 'สัตว์', emoji: '🐾' },
  { id: 'colors', name: 'Colors', nameTH: 'สี', emoji: '🎨' },
  { id: 'numbers', name: 'Numbers', nameTH: 'ตัวเลข', emoji: '🔢' },
  { id: 'school', name: 'School', nameTH: 'โรงเรียน', emoji: '🏫' },
  { id: 'places', name: 'Places', nameTH: 'สถานที่', emoji: '📍' },
  { id: 'feelings', name: 'Feelings', nameTH: 'ความรู้สึก', emoji: '💭' },
]
