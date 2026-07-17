import { useState, useCallback } from 'react'
import { stories, type Story, type StoryChoice } from '@/data/stories'
import { ArrowLeft, Volume2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Props { onBack: () => void }

interface CharacterStats {
  hp: number
  maxHp: number
  hunger: number
  maxHunger: number
  courage: number
  maxCourage: number
  gold: number
  exp: number
  maxExp: number
  level: number
}

const defaultStats: CharacterStats = {
  hp: 100, maxHp: 100,
  hunger: 80, maxHunger: 100,
  courage: 90, maxCourage: 100,
  gold: 10, exp: 0, maxExp: 100, level: 1,
}

const moodGradients: Record<string, string> = {
  calm: 'from-blue-900 to-cyan-900',
  exciting: 'from-orange-900 to-red-900',
  mysterious: 'from-purple-900 to-indigo-900',
  warm: 'from-amber-900 to-yellow-900',
  tense: 'from-red-900 to-pink-900',
  happy: 'from-green-900 to-emerald-900',
}

const sceneIllustrations: Record<string, string> = {
  '🌅': 'linear-gradient(135deg, #1e3a5f 0%, #2d5a3d 50%, #4a7c59 100%)',
  '🚪': 'linear-gradient(135deg, #2d1b0e 0%, #4a3728 50%, #6b4c30 100%)',
  '✨': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  '📋': 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 50%, #4d4d4d 100%)',
  '🍰': 'linear-gradient(135deg, #4a2c2a 0%, #6b3a3a 50%, #8b4c4c 100%)',
  '☕': 'linear-gradient(135deg, #3c2415 0%, #5c3a1f 50%, #7c5230 100%)',
  '🧋': 'linear-gradient(135deg, #2d1810 0%, #5c3420 50%, #8b4c30 100%)',
  '👍': 'linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #3d6a3d 100%)',
  '💬': 'linear-gradient(135deg, #1a1a3e 0%, #2d2d5e 50%, #3d3d7e 100%)',
  '📱': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 50%, #3d3d6e 100%)',
  '📖': 'linear-gradient(135deg, #2a1f0e 0%, #4a3520 50%, #6a4b30 100%)',
  '🌿': 'linear-gradient(135deg, #0a2e1a 0%, #1a4e2a 50%, #2a6e3a 100%)',
  '📋': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 50%, #3d3d6e 100%)',
  '🏛️': 'linear-gradient(135deg, #3a2a10 0%, #5a4020 50%, #7a5a30 100%)',
  '🌿': 'linear-gradient(135deg, #0a2e1a 0%, #1a4e2a 50%, #2a6e3a 100%)',
  '🎨': 'linear-gradient(135deg, #2a1a3e 0%, #4a2a5e 50%, #6a3a7e 100%)',
  '🔒': 'linear-gradient(135deg, #2a1a0e 0%, #4a3020 50%, #6a4530 100%)',
  '🔎': 'linear-gradient(135deg, #1a2a3e 0%, #2a3a5e 50%, #3a4a7e 100%)',
  '🔷': 'linear-gradient(135deg, #1a1a4e 0%, #2a2a6e 50%, #3a3a8e 100%)',
  '🗝️': 'linear-gradient(135deg, #3a2a0e 0%, #5a4020 50%, #7a5530 100%)',
  '🛒': 'linear-gradient(135deg, #1a3a2a 0%, #2a5a3a 50%, #3a7a4a 100%)',
  '🌈': 'linear-gradient(135deg, #1a3a2a 0%, #2a5a3a 50%, #3a7a4a 100%)',
  '🍗': 'linear-gradient(135deg, #3a2010 0%, #5a3820 50%, #7a5030 100%)',
  '💡': 'linear-gradient(135deg, #2a2a10 0%, #4a4a20 50%, #6a6a30 100%)',
  '💬': 'linear-gradient(135deg, #1a2a3a 0%, #2a3a5a 50%, #3a4a7a 100%)',
  '🎉': 'linear-gradient(135deg, #3a1a2a 0%, #5a2a3a 50%, #7a3a4a 100%)',
  '💰': 'linear-gradient(135deg, #3a3a0a 0%, #5a5a1a 50%, #7a7a2a 100%)',
  '🦀': 'linear-gradient(135deg, #4a1a0a 0%, #6a2a1a 50%, #8a3a2a 100%)',
}

function StatBar({ icon, label, value, max, color }: { icon: string; label: string; value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-lg w-7 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[11px] text-gray-300">{label}</span>
          <span className="text-[11px] text-gray-400 font-mono">{value}/{max}</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function CharacterPanel({ stats }: { stats: CharacterStats }) {
  return (
    <div className="bg-gray-800/80 backdrop-blur rounded-xl p-4 border border-gray-700/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧙</span>
          <span className="text-white font-bold text-sm">ตัวละคร</span>
        </div>
        <span className="text-[#C5A55A] text-xs font-bold bg-[#C5A55A]/15 px-2 py-0.5 rounded-full">Lv.{stats.level}</span>
      </div>
      <StatBar icon="❤️" label="HP" value={stats.hp} max={stats.maxHp} color="bg-gradient-to-r from-red-500 to-red-400" />
      <StatBar icon="🍖" label="ความหิว" value={stats.hunger} max={stats.maxHunger} color="bg-gradient-to-r from-orange-500 to-yellow-400" />
      <StatBar icon="💪" label="กําลังใจ" value={stats.courage} max={stats.maxCourage} color="bg-gradient-to-r from-blue-500 to-purple-400" />
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/50">
        <span className="text-lg">💰</span>
        <span className="text-[#C5A55A] font-bold text-sm">{stats.gold} Gold</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[11px] text-gray-300 flex items-center gap-1">⭐ EXP</span>
          <span className="text-[11px] text-gray-400 font-mono">{stats.exp}/{stats.maxExp}</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-500" style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function renderBilingualText(thText: string, enText: string) {
  const thParagraphs = thText.split('\n\n')
  const enParagraphs = enText.split('\n\n')
  return (
    <>
      {thParagraphs.map((para, i) => (
        <p key={`th-${i}`} className="text-gray-200 text-sm leading-relaxed my-3">
          {para}
        </p>
      ))}
      {enParagraphs.map((para, i) => (
        <p key={`en-${i}`} className="text-gray-400 text-sm leading-relaxed my-3 italic">
          {para}
        </p>
      ))}
    </>
  )
}

export default function InteractiveNovel({ onBack }: Props) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [currentScene, setCurrentScene] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [stats, setStats] = useState<CharacterStats>({ ...defaultStats })

  const startStory = useCallback((story: Story) => {
    setSelectedStory(story)
    setCurrentScene(story.startScene)
    setHistory([story.startScene])
    setStats({ ...defaultStats })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const applyStatEffects = useCallback((choice: StoryChoice) => {
    const text = (choice.text + ' ' + choice.textTH).toLowerCase()
    setStats(prev => {
      const s = { ...prev }
      if (text.includes('enter') || text.includes('เข้า') || text.includes('explore') || text.includes('สำรวจ')) s.courage = Math.min(s.maxCourage, s.courage + 5)
      if (text.includes('crawl') || text.includes('คลาน') || text.includes('look into') || text.includes('มองลง')) { s.hunger = Math.max(0, s.hunger - 5); s.exp = Math.min(s.maxExp, s.exp + 5) }
      if (text.includes('examine') || text.includes('ตรวจ') || text.includes('study') || text.includes('ดู')) s.exp = Math.min(s.maxExp, s.exp + 10)
      if (text.includes('buy') || text.includes('สั่ง') || text.includes('grab') || text.includes('หยิบ')) { s.gold = Math.max(0, s.gold - 5); s.hunger = Math.min(s.maxHunger, s.hunger + 10) }
      if (text.includes('ask') || text.includes('ถาม') || text.includes('talk') || text.includes('คุย')) s.exp = Math.min(s.maxExp, s.exp + 5)
      if (text.includes('save') || text.includes('เก็บ')) s.gold += 5
      if (s.exp >= s.maxExp) { s.level += 1; s.exp = 0; s.maxExp = Math.floor(s.maxExp * 1.5); s.maxHp += 10; s.hp = s.maxHp; s.courage = s.maxCourage; s.hunger = s.maxHunger }
      return s
    })
  }, [])

  const handleChoice = useCallback((choice: StoryChoice) => {
    applyStatEffects(choice)
    setCurrentScene(choice.nextScene)
    setHistory(h => [...h, choice.nextScene])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [applyStatEffects])

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const nh = history.slice(0, -1)
      setHistory(nh)
      setCurrentScene(nh[nh.length - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [history])

  // Story Selection
  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <div className="max-w-lg mx-auto p-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>📖 Interactive Novels</h1>
          <p className="text-gray-500 text-xs mb-6">อ่านเรื่องสั้น เลือกทางเลือก เปลี่ยนเรื่องราว</p>
          <div className="space-y-4">
            {stories.map(story => (
              <button key={story.id} onClick={() => startStory(story)} className="w-full text-left rounded-xl overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group border border-gray-700/50">
                <div className={cn('bg-gradient-to-r p-5', story.coverGradient)}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{story.emoji}</span>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg">{story.title}</h2>
                      <p className="text-white/70 text-xs">{story.titleTH} · {story.totalScenes} ฉาก · ~{story.estimatedMinutes} นาที</p>
                    </div>
                    <ChevronRight size={20} className="text-white/40" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const scene = selectedStory.scenes[currentScene]
  if (!scene) return null

  // Ending Screen
  if (scene.isEnding) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <div className="max-w-lg mx-auto p-4">
          <div className="rounded-xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #3d6a3d 100%)' }}>
            <div className="p-8 text-center">
              <div className="text-6xl mb-3">{scene.illustration || '🌟'}</div>
              <h2 className="text-2xl font-bold text-white">{scene.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CharacterPanel stats={stats} />
            <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-white font-bold text-sm mb-3">📊 สรุปการเดินทาง</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-400">ฉากที่ผ่าน</span><span className="text-white font-medium">{history.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Level</span><span className="text-[#C5A55A] font-medium">Lv.{stats.level}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Gold</span><span className="text-[#C5A55A] font-medium">{stats.gold}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">EXP ได้มา</span><span className="text-yellow-400 font-medium">{stats.exp}/{stats.maxExp}</span></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-4 mb-4 border border-gray-700/50">
            <div className="space-y-0">
              {renderBilingualText(scene.contentTH, scene.content)}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSelectedStory(null)} className="flex-1 py-3 rounded-xl bg-gray-800 text-white text-sm font-medium border border-gray-700">เลือกเรื่องใหม่</button>
            <button onClick={() => startStory(selectedStory)} className="flex-1 py-3 rounded-xl bg-[#C5A55A] text-gray-900 text-sm font-bold">อ่านอีก</button>
          </div>
        </div>
      </div>
    )
  }

  const chapterNum = history.length
  const illustrationBg = scene.illustration ? (sceneIllustrations[scene.illustration] || 'linear-gradient(135deg, #1a2a3e 0%, #2a3a5e 50%, #3a4a7e 100%)') : 'linear-gradient(135deg, #1a2a3e 0%, #2a3a5e 50%, #3a4a7e 100%)'
  const choiceLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={history.length > 1 ? goBack : () => setSelectedStory(null)} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white"><Volume2 size={18} /></button>
            <span className="text-gray-500 text-xs flex items-center gap-1">🗺️ ฉาก {chapterNum}</span>
          </div>
        </div>

        {/* Chapter label */}
        <p className="text-gray-500 text-xs mb-3">บทที่ {chapterNum}</p>

        <div className="flex gap-4">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Scene Illustration */}
            <div className="rounded-xl overflow-hidden mb-4 h-32 flex items-center justify-center" style={{ background: illustrationBg }}>
              <span className="text-6xl opacity-60">{scene.illustration || '🌙'}</span>
            </div>

            {/* Title */}
            {scene.title && (
              <h2 className="text-white font-bold text-lg mb-3">§ {scene.title}</h2>
            )}

            {/* Bilingual Story Text */}
            <div className="mb-4">
              {renderBilingualText(scene.contentTH, scene.content)}
            </div>

            {/* Choices */}
            {scene.choices && scene.choices.length > 0 && (
              <div className="space-y-3">
                <p className="text-gray-500 text-xs">เลือกทางของคุณ</p>
                {scene.choices.map((choice, i) => {
                  const choiceText = (choice.text + ' ' + choice.textTH).toLowerCase()
                  const hasPositiveEffect = choiceText.includes('enter') || choiceText.includes('examine') || choiceText.includes('ask') || choiceText.includes('talk') || choiceText.includes('study') || choiceText.includes('grab') || choiceText.includes('explore')
                  const hasNegativeEffect = choiceText.includes('crawl') || choiceText.includes('skip') || choiceText.includes('just')
                  return (
                    <button
                      key={i}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left rounded-xl p-4 bg-gray-800/60 border border-gray-700/50 hover:border-[#C5A55A]/40 hover:bg-gray-800 transition-all active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-gray-500 font-bold text-sm w-5 shrink-0 pt-0.5">{choiceLabels[i]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium">{choice.text}</div>
                          <div className="text-gray-400 text-xs mt-0.5">— {choice.textTH}</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 shrink-0 mt-1" />
                      </div>
                      <div className="flex gap-2 mt-2 ml-8">
                        {hasPositiveEffect && choiceText.includes('courage') && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">+5 กําลังใจ</span>}
                        {hasNegativeEffect && choiceText.includes('hunger') && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">-5 หิวมาก</span>}
                        {choiceText.includes('examine') || choiceText.includes('study') ? <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">+10 EXP</span> : null}
                        {choiceText.includes('ask') || choiceText.includes('talk') ? <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">+5 EXP</span> : null}
                        {choiceText.includes('buy') || choiceText.includes('grab') ? <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">-5 💰</span> : null}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Character Stats Sidebar */}
          <div className="w-48 shrink-0 hidden sm:block">
            <div className="sticky top-4">
              <CharacterPanel stats={stats} />
            </div>
          </div>
        </div>

        {/* Mobile Stats (bottom) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur border-t border-gray-800 p-3 z-50">
          <div className="max-w-lg mx-auto">
            <CharacterPanel stats={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}
