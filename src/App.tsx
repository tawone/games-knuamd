import { useState } from 'react'
import WordMatch from './components/WordMatch'
import WordQuiz from './components/WordQuiz'
import FillBlank from './components/FillBlank'

type Screen = 'menu' | 'match' | 'quiz' | 'fill'

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')

  if (screen === 'match') return <WordMatch onBack={() => setScreen('menu')} />
  if (screen === 'quiz') return <WordQuiz onBack={() => setScreen('menu')} />
  if (screen === 'fill') return <FillBlank onBack={() => setScreen('menu')} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <span className="text-6xl block mb-4">🎓</span>
          <h1 className="text-3xl font-bold text-white mb-2">English Learning Games</h1>
          <p className="text-white/70 text-sm">เกมเรียนรู้คำศัพท์ภาษาอังกฤษ</p>
          <p className="text-white/50 text-xs mt-1">สำหรับนักศึกษามหาวิทยาลัยขอนแก่น</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setScreen('match')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">🔗</span>
              <div>
                <h2 className="text-white font-bold text-lg">จับคู่คำศัพท์</h2>
                <p className="text-white/60 text-xs">Match English ↔ Thai จับคู่คำให้ถูกต้อง</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('quiz')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">📝</span>
              <div>
                <h2 className="text-white font-bold text-lg">Quiz ทายคำ</h2>
                <p className="text-white/60 text-xs">เลือกคำตอบที่ถูก ทั้ง EN→TH และ TH→EN</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('fill')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">✏️</span>
              <div>
                <h2 className="text-white font-bold text-lg">เติมคำ</h2>
                <p className="text-white/60 text-xs">เติมตัวอักษรที่หายไปในคำศัพท์</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {['👋 ทักทาย', '🍽️ อาหาร', '🐾 สัตว์', '🎨 สี', '🔢 ตัวเลข', '🏫 โรงเรียน', '📍 สถานที่', '💭 ความรู้สึก'].map((cat) => (
            <span key={cat} className="text-xs text-white/40">{cat}</span>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-4">8 หมวดหมู่ · 64 คำศัพท์ · 3 เกม</p>
      </div>
    </div>
  )
}
