import { useState } from 'react'
import WordMatch from './components/WordMatch'
import WordQuiz from './components/WordQuiz'
import FillBlank from './components/FillBlank'
import Talks from './components/Talks'
import InteractiveNovel from './components/InteractiveNovel'

type Screen = 'menu' | 'fun' | 'match' | 'quiz' | 'fill' | 'talks' | 'novel'

function FunMenu({ onSelect, onBack }: { onSelect: (s: Screen) => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#234B6E] to-[#2E8B8B] flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <button onClick={onBack} className="text-white/60 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← กลับ
          </button>
          <span className="text-6xl block mb-4">🎮</span>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>Fun</h1>
          <p className="text-[#C5A55A] text-sm font-medium">เกมฝึกคำศัพท์ภาษาอังกฤษ</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onSelect('match')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">🔗</span>
              <div>
                <h2 className="text-white font-bold text-lg">จับคู่คำศัพท์</h2>
                <p className="text-[#C5A55A]/80 text-xs">Match English ↔ Thai จับคู่คำให้ถูกต้อง</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('quiz')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">📝</span>
              <div>
                <h2 className="text-white font-bold text-lg">Quiz ทายคำ</h2>
                <p className="text-[#C5A55A]/80 text-xs">เลือกคำตอบที่ถูก ทั้ง EN→TH และ TH→EN</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('fill')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">✏️</span>
              <div>
                <h2 className="text-white font-bold text-lg">เติมคำ</h2>
                <p className="text-[#C5A55A]/80 text-xs">เติมตัวอักษรที่หายไปในคำศัพท์</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')

  if (screen === 'fun') return <FunMenu onSelect={(s) => setScreen(s)} onBack={() => setScreen('menu')} />
  if (screen === 'match') return <WordMatch onBack={() => setScreen('fun')} />
  if (screen === 'quiz') return <WordQuiz onBack={() => setScreen('fun')} />
  if (screen === 'fill') return <FillBlank onBack={() => setScreen('fun')} />
  if (screen === 'talks') return <Talks onBack={() => setScreen('menu')} />
  if (screen === 'novel') return <InteractiveNovel onBack={() => setScreen('menu')} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#234B6E] to-[#2E8B8B] flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <span className="text-6xl block mb-4">🎓</span>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            English Learning Games
          </h1>
          <p className="text-[#C5A55A] text-sm font-medium">เกมเรียนรู้คำศัพท์ภาษาอังกฤษ</p>
          <p className="text-white/50 text-xs mt-1">สำหรับนักศึกษามหาวิทยาลัยขอนแก่น</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setScreen('fun')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">🎮</span>
              <div>
                <h2 className="text-white font-bold text-lg">Fun</h2>
                <p className="text-[#C5A55A]/80 text-xs">จับคู่ · Quiz · เติมคำ — เกมฝึกคำศัพท์ 3in1</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('talks')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">💬</span>
              <div>
                <h2 className="text-white font-bold text-lg">Talks</h2>
                <p className="text-[#C5A55A]/80 text-xs">ฝึกสนทนาภาษาอังกฤษผ่านเรื่องสั้น</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('novel')}
            className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">⚔️</span>
              <div>
                <h2 className="text-white font-bold text-lg">Interactive Novels</h2>
                <p className="text-[#C5A55A]/80 text-xs">เกม RPG เลือกทางเลือก เก็บ EXP Level Up!</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {['👋 ทักทาย', '🍽️ อาหาร', '🐾 สัตว์', '🎨 สี', '🔢 ตัวเลข', '🏫 โรงเรียน', '📍 สถานที่', '💭 ความรู้สึก'].map((cat) => (
            <span key={cat} className="text-xs text-white/40">{cat}</span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-[#C5A55A]/60 text-xs">8 หมวดหมู่ · 64 คำศัพท์ · 3 เมนูหลัก</p>
          <p className="text-white/30 text-xs mt-1">games.knuamd.com</p>
        </div>
      </div>
    </div>
  )
}
