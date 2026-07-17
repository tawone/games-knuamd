import { useState } from 'react'
import WordMatch from './components/WordMatch'
import WordQuiz from './components/WordQuiz'
import FillBlank from './components/FillBlank'
import Talks from './components/Talks'
import InteractiveNovel from './components/InteractiveNovel'
import NovelsAdmin from './components/admin/NovelsAdmin'

type Screen = 'menu' | 'fun' | 'match' | 'quiz' | 'fill' | 'talks' | 'novel' | 'admin-novels'

function FunMenu({ onSelect, onBack }: { onSelect: (s: Screen) => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#FDF6EE]">
      <div className="max-w-lg mx-auto p-4">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm mb-6 inline-flex items-center gap-1">
          ← กลับ
        </button>
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🎮</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Fun</h1>
          <p className="text-gray-400 text-sm">เกมฝึกคำศัพท์ภาษาอังกฤษ</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onSelect('match')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">🔗</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">จับคู่คำศัพท์</h2>
                <p className="text-gray-400 text-xs">Match English ↔ Thai จับคู่คำให้ถูกต้อง</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('quiz')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">📝</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">Quiz ทายคำ</h2>
                <p className="text-gray-400 text-xs">เลือกคำตอบที่ถูก ทั้ง EN→TH และ TH→EN</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('fill')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">✏️</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">เติมคำ</h2>
                <p className="text-gray-400 text-xs">เติมตัวอักษรที่หายไปในคำศัพท์</p>
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
  if (screen === 'admin-novels') return <NovelsAdmin onBack={() => setScreen('menu')} />

  return (
    <div className="min-h-screen bg-[#FDF6EE]">
      <div className="max-w-lg mx-auto p-4">
        <div className="text-center mb-8 pt-8">
          <span className="text-5xl block mb-3">🎓</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            English Learning Games
          </h1>
          <p className="text-[#E8734A] text-sm font-medium">เกมเรียนรู้คำศัพท์ภาษาอังกฤษ</p>
          <p className="text-gray-400 text-xs mt-1">สำหรับนักศึกษามหาวิทยาลัยขอนแก่น</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setScreen('fun')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">🎮</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">Fun</h2>
                <p className="text-gray-400 text-xs">จับคู่ · Quiz · เติมคำ — เกมฝึกคำศัพท์ 3in1</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('talks')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">💬</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">Talks</h2>
                <p className="text-gray-400 text-xs">ฝึกสนทนาภาษาอังกฤษผ่านเรื่องสั้น</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setScreen('novel')}
            className="w-full bg-white rounded-2xl p-5 text-left hover:shadow-md transition-all active:scale-[0.98] group border border-orange-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">⚔️</span>
              <div>
                <h2 className="text-gray-700 font-bold text-lg">Interactive Novels</h2>
                <p className="text-gray-400 text-xs">เกม RPG เลือกทางเลือก เก็บ EXP Level Up!</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {['👋 ทักทาย', '🍽️ อาหาร', '🐾 สัตว์', '🎨 สี', '🔢 ตัวเลข', '🏫 โรงเรียน', '📍 สถานที่', '💭 ความรู้สึก'].map((cat) => (
            <span key={cat} className="text-xs text-gray-300">{cat}</span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-orange-100">
          <p className="text-gray-400 text-xs text-center">8 หมวดหมู่ · 64 คำศัพท์ · 3 เมนูหลัก</p>
          <p className="text-gray-300 text-xs text-center mt-1">games.knuamd.com</p>
          <button onClick={() => setScreen('admin-novels')} className="mt-3 text-gray-300 hover:text-gray-500 text-[10px] text-center w-full transition-colors">
            ⚙️ Admin
          </button>
        </div>
      </div>
    </div>
  )
}
