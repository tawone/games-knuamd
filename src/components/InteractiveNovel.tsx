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

const sceneIllustrations: Record<string, string> = {
  '🌅': 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
  '🚪': 'linear-gradient(135deg, #D4A574 0%, #C48B5E 100%)',
  '✨': 'linear-gradient(135deg, #A8C0FF 0%, #D4B8FF 100%)',
  '📋': 'linear-gradient(135deg, #E8D5B7 0%, #C9B896 100%)',
  '🍰': 'linear-gradient(135deg, #FECDA6 0%, #F6A6C1 100%)',
  '☕': 'linear-gradient(135deg, #D4A574 0%, #A67C52 100%)',
  '🧋': 'linear-gradient(135deg, #E8C8A0 0%, #D4A574 100%)',
  '👍': 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)',
  '💬': 'linear-gradient(135deg, #B8C6DB 0%, #F5F7FA 100%)',
  '📱': 'linear-gradient(135deg, #C3B1E1 0%, #E8D5F5 100%)',
  '📖': 'linear-gradient(135deg, #F6D365 0%, #E8C87A 100%)',
  '🏛️': 'linear-gradient(135deg, #E8C87A 0%, #D4A574 100%)',
  '🎨': 'linear-gradient(135deg, #FECDA6 0%, #F6A6C1 100%)',
  '🔒': 'linear-gradient(135deg, #C9B896 0%, #A69076 100%)',
  '🔎': 'linear-gradient(135deg, #B8C6DB 0%, #A8C0FF 100%)',
  '🔷': 'linear-gradient(135deg, #A8C0FF 0%, #B8C6DB 100%)',
  '🗝️': 'linear-gradient(135deg, #E8C87A 0%, #F6D365 100%)',
  '🛒': 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)',
  '🌈': 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
  '🍗': 'linear-gradient(135deg, #FECDA6 0%, #E8A87C 100%)',
  '💡': 'linear-gradient(135deg, #F6D365 0%, #FECDA6 100%)',
  '🎉': 'linear-gradient(135deg, #F6A6C1 0%, #FECDA6 100%)',
  '💰': 'linear-gradient(135deg, #F6D365 0%, #E8C87A 100%)',
  '🦀': 'linear-gradient(135deg, #F08A5D 0%, #FECDA6 100%)',
}

const statColors = {
  hp: 'bg-gradient-to-r from-[#E74C3C] to-[#FF6B6B]',
  hunger: 'bg-gradient-to-r from-[#F39C12] to-[#F1C40F]',
  courage: 'bg-gradient-to-r from-[#3498DB] to-[#9B59B6]',
  exp: 'bg-gradient-to-r from-[#F1C40F] to-[#E8C87A]',
}

function StatBar({ icon, label, value, max, color }: { icon: string; label: string; value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-lg w-7 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[11px] text-gray-500 font-medium">{label}</span>
          <span className="text-[11px] text-gray-400 font-mono">{value}/{max}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function CharacterPanel({ stats }: { stats: CharacterStats }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧙</span>
          <span className="text-gray-700 font-bold text-sm">ตัวละคร</span>
        </div>
        <span className="text-[#E8734A] text-xs font-bold bg-[#E8734A]/10 px-2.5 py-0.5 rounded-full">Lv.{stats.level}</span>
      </div>
      <StatBar icon="❤️" label="HP" value={stats.hp} max={stats.maxHp} color={statColors.hp} />
      <StatBar icon="🍖" label="ความหิว" value={stats.hunger} max={stats.maxHunger} color={statColors.hunger} />
      <StatBar icon="💪" label="กําลังใจ" value={stats.courage} max={stats.maxCourage} color={statColors.courage} />
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <span className="text-lg">💰</span>
        <span className="text-[#D4A853] font-bold text-sm">{stats.gold} Gold</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">⭐ EXP</span>
          <span className="text-[11px] text-gray-400 font-mono">{stats.exp}/{stats.maxExp}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', statColors.exp)} style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }} />
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
        <p key={`th-${i}`} className="text-gray-700 text-sm leading-relaxed my-3">
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
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-lg mx-auto p-4">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Georgia, serif' }}>📖 Interactive Novels</h1>
          <p className="text-gray-400 text-xs mb-6">อ่านเรื่องสั้น เลือกทางเลือก เปลี่ยนเรื่องราว</p>
          <div className="space-y-4">
            {stories.map(story => (
              <button key={story.id} onClick={() => startStory(story)} className="w-full text-left rounded-2xl overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group bg-white border border-orange-100 shadow-sm hover:shadow-md">
                <div className={cn('bg-gradient-to-r p-5', story.coverGradient)}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{story.emoji}</span>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg drop-shadow-sm">{story.title}</h2>
                      <p className="text-white/80 text-xs">{story.titleTH} · {story.totalScenes} ฉาก · ~{story.estimatedMinutes} นาที</p>
                    </div>
                    <ChevronRight size={20} className="text-white/50 group-hover:text-white" />
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
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-lg mx-auto p-4">
          <div className="rounded-2xl overflow-hidden mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 50%, #F6D365 100%)' }}>
            <div className="p-8 text-center">
              <div className="text-6xl mb-3">{scene.illustration || '🌟'}</div>
              <h2 className="text-2xl font-bold text-gray-800">{scene.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CharacterPanel stats={stats} />
            <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm">
              <h3 className="text-gray-700 font-bold text-sm mb-3">📊 สรุปการเดินทาง</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-400">ฉากที่ผ่าน</span><span className="text-gray-700 font-medium">{history.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Level</span><span className="text-[#E8734A] font-medium">Lv.{stats.level}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Gold</span><span className="text-[#D4A853] font-medium">{stats.gold}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">EXP ได้มา</span><span className="text-[#F1C40F] font-medium">{stats.exp}/{stats.maxExp}</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 mb-4 border border-orange-100 shadow-sm">
            {renderBilingualText(scene.contentTH, scene.content)}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSelectedStory(null)} className="flex-1 py-3 rounded-xl bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:bg-gray-50">เลือกเรื่องใหม่</button>
            <button onClick={() => startStory(selectedStory)} className="flex-1 py-3 rounded-xl bg-[#E8734A] text-white text-sm font-bold hover:bg-[#D4622E]">อ่านอีก</button>
          </div>
        </div>
      </div>
    )
  }

  const chapterNum = history.length
  const illustrationBg = scene.illustration ? (sceneIllustrations[scene.illustration] || 'linear-gradient(135deg, #E8D5F5 0%, #B8C6DB 100%)') : 'linear-gradient(135deg, #E8D5F5 0%, #B8C6DB 100%)'
  const choiceLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-[#FDF6EE]">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={history.length > 1 ? goBack : () => setSelectedStory(null)} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600"><Volume2 size={18} /></button>
            <span className="text-gray-400 text-xs flex items-center gap-1">🗺️ ฉาก {chapterNum}</span>
          </div>
        </div>

        {/* Chapter label */}
        <p className="text-gray-400 text-xs mb-3">บทที่ {chapterNum}</p>

        <div className="flex gap-4">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Scene Illustration */}
            <div className="rounded-2xl overflow-hidden mb-4 h-36 flex items-center justify-center shadow-sm" style={{ background: illustrationBg }}>
              <span className="text-6xl">{scene.illustration || '🌙'}</span>
            </div>

            {/* Title */}
            {scene.title && (
              <h2 className="text-gray-800 font-bold text-lg mb-3">§ {scene.title}</h2>
            )}

            {/* Bilingual Story Text */}
            <div className="mb-4">
              {renderBilingualText(scene.contentTH, scene.content)}
            </div>

            {/* Choices */}
            {scene.choices && scene.choices.length > 0 && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs">เลือกทางของคุณ</p>
                {scene.choices.map((choice, i) => {
                  const choiceText = (choice.text + ' ' + choice.textTH).toLowerCase()
                  const hasPositiveEffect = choiceText.includes('enter') || choiceText.includes('examine') || choiceText.includes('ask') || choiceText.includes('talk') || choiceText.includes('study') || choiceText.includes('grab') || choiceText.includes('explore')
                  const hasNegativeEffect = choiceText.includes('crawl') || choiceText.includes('skip') || choiceText.includes('just')
                  return (
                    <button
                      key={i}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left rounded-2xl p-4 bg-white border border-gray-200 hover:border-[#E8734A]/40 hover:shadow-md transition-all active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-[#E8734A] font-bold text-sm w-5 shrink-0 pt-0.5">{choiceLabels[i]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-700 text-sm font-medium">{choice.text}</div>
                          <div className="text-gray-400 text-xs mt-0.5">— {choice.textTH}</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#E8734A] shrink-0 mt-1" />
                      </div>
                      <div className="flex gap-2 mt-2 ml-8">
                        {hasPositiveEffect && choiceText.includes('courage') && <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full border border-blue-100">+5 กําลังใจ</span>}
                        {hasNegativeEffect && choiceText.includes('hunger') && <span className="text-[10px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full border border-red-100">-5 หิวมาก</span>}
                        {choiceText.includes('examine') || choiceText.includes('study') ? <span className="text-[10px] bg-green-50 text-green-500 px-2 py-0.5 rounded-full border border-green-100">+10 EXP</span> : null}
                        {choiceText.includes('ask') || choiceText.includes('talk') ? <span className="text-[10px] bg-green-50 text-green-500 px-2 py-0.5 rounded-full border border-green-100">+5 EXP</span> : null}
                        {choiceText.includes('buy') || choiceText.includes('grab') ? <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-100">-5 💰</span> : null}
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
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#FDF6EE]/95 backdrop-blur border-t border-orange-100 p-3 z-50">
          <div className="max-w-lg mx-auto">
            <CharacterPanel stats={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}
