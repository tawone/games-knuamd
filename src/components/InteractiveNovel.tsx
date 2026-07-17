import { useState, useCallback, useEffect, useRef } from 'react'
import { stories, characters, type Story, type StoryChoice, type Character, type StatEffect } from '@/data/stories'
import { ArrowLeft, Volume2, ChevronRight, X, BookOpen, Sparkles } from 'lucide-react'
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

type GamePhase = 'select-story' | 'select-character' | 'playing' | 'ending'

const SAVE_KEY = 'knuamd-novel-save'

// ─── Character Mood System ───────────────────────────────────────────────────

function getCharacterMood(stats: CharacterStats): { emoji: string; label: string; color: string } {
  const hpPct = stats.hp / stats.maxHp
  const hungerPct = stats.hunger / stats.maxHunger
  const couragePct = stats.courage / stats.maxCourage

  if (stats.exp >= stats.maxExp) return { emoji: '🥳', label: 'Level Up!', color: 'text-yellow-500' }
  if (hpPct <= 0.2) return { emoji: '😵', label: 'วิกฤต!', color: 'text-red-500' }
  if (hungerPct <= 0.15) return { emoji: '🤤', label: 'หิวมาก', color: 'text-orange-500' }
  if (couragePct <= 0.2) return { emoji: '😨', label: 'กลัวมาก', color: 'text-purple-500' }
  if (hpPct <= 0.4) return { emoji: '😰', label: 'กังวล', color: 'text-amber-500' }
  if (hpPct >= 0.8 && hungerPct >= 0.6 && couragePct >= 0.7) return { emoji: '😎', label: 'มั่นใจ', color: 'text-blue-500' }
  if (hpPct >= 0.6 && hungerPct >= 0.4) return { emoji: '😊', label: 'มีความสุข', color: 'text-green-500' }
  if (couragePct >= 0.6) return { emoji: '🙂', label: 'พร้อม', color: 'text-teal-500' }
  if (stats.gold > 50) return { emoji: '🤑', label: 'รวย!', color: 'text-yellow-600' }
  return { emoji: '😐', label: 'ปกติ', color: 'text-gray-500' }
}

function getCharacterBaseEmoji(characterId: string): string {
  return characters.find(c => c.id === characterId)?.emoji || '🧑'
}

// ─── Stat Effects (Scene-based instead of keyword hack) ───────────────────────

const sceneStatEffects: Record<string, StatEffect> = {
  inside: { courage: 5, exp: 5 },
  menu: { exp: 3 },
  desserts: { hunger: 5 },
  recommend: { exp: 8, hunger: 5 },
  'order-food': { hunger: 15, gold: -15, exp: 5 },
  'order-coffee': { hunger: 8, gold: -8, exp: 5 },
  talk: { exp: 10, courage: 5 },
  phone: { exp: 3 },
  'ending-cozy': { hunger: 10, courage: 5 },
  'ending-peaceful': { exp: 10 },
  'ending-friends': { courage: 10, exp: 8 },
  'ending-support': { exp: 12, courage: 8 },
  'main-hall': { courage: 8, exp: 8 },
  'side-path': { courage: 5, exp: 5 },
  paintings: { exp: 15 },
  'secret-room': { exp: 10, courage: 10 },
  'ending-treasure': { exp: 20, gold: 10 },
  explore: { exp: 5, courage: 3 },
  'food-area': { hunger: 5 },
  'good-deal': { exp: 5, gold: 5 },
  'ask-vendor': { exp: 8 },
  'ending-perfect': { hunger: 20, exp: 10, gold: 10 },
  'ending-save': { gold: 15, exp: 8 },
}

// ─── UI Components ───────────────────────────────────────────────────────────

const moodBgGradients: Record<string, string> = {
  calm: 'from-blue-100/60 to-cyan-100/60',
  exciting: 'from-orange-100/60 to-red-100/60',
  mysterious: 'from-purple-100/60 to-indigo-100/60',
  warm: 'from-amber-100/60 to-yellow-100/60',
  tense: 'from-red-100/60 to-pink-100/60',
  happy: 'from-green-100/60 to-emerald-100/60',
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
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-sm w-5 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[10px] text-gray-500 font-medium">{label}</span>
          <span className="text-[10px] text-gray-400 font-mono">{value}/{max}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function CharacterPanel({ stats, characterId, showMood = true }: { stats: CharacterStats; characterId: string; showMood?: boolean }) {
  const mood = getCharacterMood(stats)
  const baseEmoji = getCharacterBaseEmoji(characterId)
  return (
    <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="text-2xl">{baseEmoji}</span>
            {showMood && (
              <span className="absolute -bottom-1 -right-1 text-sm">{mood.emoji}</span>
            )}
          </div>
          <div>
            <span className="text-gray-700 font-bold text-xs block">{characters.find(c => c.id === characterId)?.name || 'Hero'}</span>
            {showMood && <span className={cn('text-[10px] font-medium', mood.color)}>{mood.label}</span>}
          </div>
        </div>
        <span className="text-[#E8734A] text-[10px] font-bold bg-[#E8734A]/10 px-2 py-0.5 rounded-full">Lv.{stats.level}</span>
      </div>
      <StatBar icon="❤️" label="HP" value={stats.hp} max={stats.maxHp} color={statColors.hp} />
      <StatBar icon="🍖" label="หิว" value={stats.hunger} max={stats.maxHunger} color={statColors.hunger} />
      <StatBar icon="💪" label="ใจ" value={stats.courage} max={stats.maxCourage} color={statColors.courage} />
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
        <span className="text-sm">💰</span>
        <span className="text-[#D4A853] font-bold text-xs">{stats.gold} Gold</span>
      </div>
      <div className="mt-1.5">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[10px] text-gray-500 flex items-center gap-1">⭐ EXP</span>
          <span className="text-[10px] text-gray-400 font-mono">{stats.exp}/{stats.maxExp}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', statColors.exp)} style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function VocabularyPopup({ vocabulary, statEffect, onClose }: { vocabulary: { word: string; meaning: string }[]; statEffect?: StatEffect; onClose: () => void }) {
  const effectEntries = statEffect ? Object.entries(statEffect).filter(([, v]) => v !== 0) : []
  const effectLabels: Record<string, string> = { hp: '❤️ HP', hunger: '🍖 หิว', courage: '💪 ใจ', gold: '💰 Gold', exp: '⭐ EXP' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#E8734A]" />
            <span className="text-sm font-bold text-gray-800">คำศัพท์ใหม่</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>
        {vocabulary.length > 0 ? (
          <div className="space-y-2 mb-3">
            {vocabulary.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-orange-50/50 rounded-xl">
                <span className="text-[#E8734A] font-bold text-sm">{v.word}</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-600 text-sm">{v.meaning}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xs text-center py-2">ไม่มีคำศัพท์ใหม่ในทางเลือกนี้</p>
        )}
        {effectEntries.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-[10px] text-gray-400 mb-2 font-medium">📊 ผลต่อตัวละคร</p>
            <div className="flex flex-wrap gap-2">
              {effectEntries.map(([key, val]) => (
                <span key={key} className={cn(
                  'text-[11px] px-2 py-0.5 rounded-full font-medium',
                  (val as number) > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'
                )}>
                  {effectLabels[key]} {(val as number) > 0 ? '+' : ''}{val}
                </span>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose} className="w-full mt-4 py-2.5 bg-[#E8734A] text-white text-sm font-bold rounded-xl hover:bg-[#D4622E] transition-colors">
          เข้าใจแล้ว 👍
        </button>
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
        <p key={`th-${i}`} className="text-gray-700 text-sm leading-relaxed my-2">{para}</p>
      ))}
      {enParagraphs.map((para, i) => (
        <p key={`en-${i}`} className="text-gray-400 text-sm leading-relaxed my-2 italic">{para}</p>
      ))}
    </>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function InteractiveNovel({ onBack }: Props) {
  const [phase, setPhase] = useState<GamePhase>('select-story')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [currentScene, setCurrentScene] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [stats, setStats] = useState<CharacterStats>({
    hp: 100, maxHp: 100,
    hunger: 80, maxHunger: 100,
    courage: 90, maxCourage: 100,
    gold: 10, exp: 0, maxExp: 100, level: 1,
  })
  const [showVocab, setShowVocab] = useState(false)
  const [vocabData, setVocabData] = useState<{ vocabulary: { word: string; meaning: string }[]; statEffect?: StatEffect }>({ vocabulary: [] })
  const [pendingScene, setPendingScene] = useState<string | null>(null)
  const [sceneTransition, setSceneTransition] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // ─── localStorage Save/Load ────────────────────────────────────────────────

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.storyId && data.characterId && data.currentScene) {
          const story = stories.find(s => s.id === data.storyId)
          const char = characters.find(c => c.id === data.characterId)
          if (story && char && data.stats) {
            setSelectedStory(story)
            setSelectedCharacter(char)
            setCurrentScene(data.currentScene)
            setHistory(data.history || [data.currentScene])
            setStats(data.stats)
            setPhase('playing')
          }
        }
      }
    } catch {}
  }, [])

  const saveProgress = useCallback((storyId: string, characterId: string, scene: string, hist: string[], s: CharacterStats) => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        storyId, characterId, currentScene: scene, history: hist, stats: s, savedAt: Date.now(),
      }))
    } catch {}
  }, [])

  const clearSave = useCallback(() => {
    try { localStorage.removeItem(SAVE_KEY) } catch {}
  }, [])

  // ─── Story Selection ───────────────────────────────────────────────────────

  const startStory = useCallback((story: Story) => {
    setSelectedStory(story)
    setPhase('select-character')
  }, [])

  // ─── Character Selection ───────────────────────────────────────────────────

  const selectCharacter = useCallback((character: Character) => {
    setSelectedCharacter(character)
    const startScene = selectedStory!.startScene
    const newStats: CharacterStats = {
      hp: character.baseStats.hp, maxHp: character.baseStats.hp + 20,
      hunger: character.baseStats.hunger, maxHunger: 100,
      courage: character.baseStats.courage, maxCourage: 100,
      gold: character.baseStats.gold, exp: 0, maxExp: 100, level: 1,
    }
    setStats(newStats)
    setCurrentScene(startScene)
    setHistory([startScene])
    setPhase('playing')
    clearSave()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedStory, clearSave])

  // ─── Scene Transition ──────────────────────────────────────────────────────

  const transitionToScene = useCallback((sceneId: string) => {
    setSceneTransition(true)
    setTimeout(() => {
      setCurrentScene(sceneId)
      setSceneTransition(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [])

  // ─── Apply Stat Effects (from scene-based data, not keyword hack) ──────────

  const applyStatEffects = useCallback((sceneId: string): StatEffect => {
    const effect = sceneStatEffects[sceneId] || {}
    setStats(prev => {
      const s = { ...prev }
      if (effect.hp) s.hp = Math.max(0, Math.min(s.maxHp, s.hp + effect.hp))
      if (effect.hunger) s.hunger = Math.max(0, Math.min(s.maxHunger, s.hunger + effect.hunger))
      if (effect.courage) s.courage = Math.max(0, Math.min(s.maxCourage, s.courage + effect.courage))
      if (effect.gold) s.gold = Math.max(0, s.gold + effect.gold)
      if (effect.exp) {
        s.exp = Math.min(s.maxExp, s.exp + effect.exp)
        if (s.exp >= s.maxExp) {
          s.level += 1
          s.exp = 0
          s.maxExp = Math.floor(s.maxExp * 1.5)
          s.maxHp += 10
          s.hp = s.maxHp
          s.courage = s.maxCourage
          s.hunger = s.maxHunger
        }
      }
      return s
    })
    return effect
  }, [])

  // ─── Handle Choice ─────────────────────────────────────────────────────────

  const handleChoice = useCallback((choice: StoryChoice) => {
    if (!selectedStory || !selectedCharacter) return

    const vocab = choice.vocabulary || []
    const effect = applyStatEffects(choice.nextScene)

    if (vocab.length > 0 || Object.keys(effect).length > 0) {
      setVocabData({ vocabulary: vocab, statEffect: effect })
      setPendingScene(choice.nextScene)
      setShowVocab(true)
    } else {
      const newHistory = [...history, choice.nextScene]
      setHistory(newHistory)
      transitionToScene(choice.nextScene)
      saveProgress(selectedStory.id, selectedCharacter.id, choice.nextScene, newHistory, stats)
    }
  }, [selectedStory, selectedCharacter, history, stats, applyStatEffects, transitionToScene, saveProgress])

  const confirmVocab = useCallback(() => {
    if (!selectedStory || !selectedCharacter || !pendingScene) return
    const newHistory = [...history, pendingScene]
    setHistory(newHistory)
    transitionToScene(pendingScene)
    saveProgress(selectedStory.id, selectedCharacter.id, pendingScene, newHistory, stats)
    setShowVocab(false)
    setPendingScene(null)
  }, [selectedStory, selectedCharacter, pendingScene, history, stats, transitionToScene, saveProgress])

  // ─── Navigation ────────────────────────────────────────────────────────────

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const nh = history.slice(0, -1)
      setHistory(nh)
      transitionToScene(nh[nh.length - 1])
    }
  }, [history, transitionToScene])

  const restartStory = useCallback(() => {
    if (!selectedStory || !selectedCharacter) return
    const startScene = selectedStory.startScene
    const newStats: CharacterStats = {
      hp: selectedCharacter.baseStats.hp, maxHp: selectedCharacter.baseStats.hp + 20,
      hunger: selectedCharacter.baseStats.hunger, maxHunger: 100,
      courage: selectedCharacter.baseStats.courage, maxCourage: 100,
      gold: selectedCharacter.baseStats.gold, exp: 0, maxExp: 100, level: 1,
    }
    setStats(newStats)
    setCurrentScene(startScene)
    setHistory([startScene])
    setPhase('playing')
    clearSave()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedStory, selectedCharacter, clearSave])

  const goToMenu = useCallback(() => {
    clearSave()
    setPhase('select-story')
    setSelectedStory(null)
    setSelectedCharacter(null)
    setHistory([])
    setStats({ hp: 100, maxHp: 100, hunger: 80, maxHunger: 100, courage: 90, maxCourage: 100, gold: 10, exp: 0, maxExp: 100, level: 1 })
  }, [clearSave])

  // ─── Render: Story Selection ───────────────────────────────────────────────

  if (phase === 'select-story') {
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

  // ─── Render: Character Selection ───────────────────────────────────────────

  if (phase === 'select-character' && selectedStory) {
    return (
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-lg mx-auto p-4">
          <button onClick={() => setPhase('select-story')} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> เลือกเรื่องอื่น
          </button>
          <div className="text-center mb-6">
            <span className="text-5xl block mb-2">{selectedStory.emoji}</span>
            <h2 className="text-xl font-bold text-gray-800">{selectedStory.title}</h2>
            <p className="text-gray-400 text-xs">{selectedStory.titleTH}</p>
          </div>
          <p className="text-gray-500 text-sm text-center mb-4">เลือกตัวละครของคุณ</p>
          <div className="grid grid-cols-2 gap-3">
            {characters.map(char => {
              const mood = getCharacterMood({ hp: char.baseStats.hp, maxHp: char.baseStats.hp + 20, hunger: char.baseStats.hunger, maxHunger: 100, courage: char.baseStats.courage, maxCourage: 100, gold: char.baseStats.gold, exp: 0, maxExp: 100, level: 1 })
              return (
                <button key={char.id} onClick={() => selectCharacter(char)} className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left group">
                  <div className="text-center mb-2">
                    <span className="text-4xl block group-hover:scale-110 transition-transform">{char.emoji}</span>
                    <span className="text-lg">{mood.emoji}</span>
                  </div>
                  <h3 className="text-gray-800 font-bold text-sm text-center">{char.name}</h3>
                  <p className="text-gray-400 text-[10px] text-center mt-0.5">{char.descriptionTH}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">❤️ HP</span><span className="text-gray-600">{char.baseStats.hp}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">💪 ใจ</span><span className="text-gray-600">{char.baseStats.courage}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">💰 Gold</span><span className="text-gray-600">{char.baseStats.gold}</span></div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ─── Render: Playing / Ending ──────────────────────────────────────────────

  if ((phase === 'playing' || phase === 'ending') && selectedStory && selectedCharacter) {
    const scene = selectedStory.scenes[currentScene]
    if (!scene) return null

    // ─── Ending Screen ─────────────────────────────────────────────────────
    if (scene.isEnding) {
      return (
        <div className="min-h-screen bg-[#FDF6EE]">
          <div className="max-w-lg mx-auto p-4">
            <div className="rounded-2xl overflow-hidden mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 50%, #F6D365 100%)' }}>
              <div className="p-8 text-center">
                <span className="text-6xl block mb-2">{getCharacterBaseEmoji(selectedCharacter.id)}</span>
                <span className="text-5xl block mb-3">{scene.illustration || '🌟'}</span>
                <h2 className="text-2xl font-bold text-gray-800">{scene.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <CharacterPanel stats={stats} characterId={selectedCharacter.id} />
              <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm">
                <h3 className="text-gray-700 font-bold text-sm mb-3">📊 สรุปการเดินทาง</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">ตัวละคร</span><span className="text-gray-700 font-medium">{selectedCharacter.emoji} {selectedCharacter.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">ฉากที่ผ่าน</span><span className="text-gray-700 font-medium">{history.length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Level</span><span className="text-[#E8734A] font-medium">Lv.{stats.level}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Gold</span><span className="text-[#D4A853] font-medium">{stats.gold}</span></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4 border border-orange-100 shadow-sm">
              {renderBilingualText(scene.contentTH, scene.content)}
            </div>
            <div className="flex gap-3">
              <button onClick={goToMenu} className="flex-1 py-3 rounded-xl bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:bg-gray-50">เลือกเรื่องใหม่</button>
              <button onClick={restartStory} className="flex-1 py-3 rounded-xl bg-[#E8734A] text-white text-sm font-bold hover:bg-[#D4622E]">เล่นอีกครั้ง</button>
            </div>
          </div>
        </div>
      )
    }

    // ─── Normal Scene ──────────────────────────────────────────────────────
    const chapterNum = history.length
    const illustrationBg = scene.illustration ? (sceneIllustrations[scene.illustration] || 'linear-gradient(135deg, #E8D5F5 0%, #B8C6DB 100%)') : 'linear-gradient(135deg, #E8D5F5 0%, #B8C6DB 100%)'
    const moodBg = scene.mood ? moodBgGradients[scene.mood] : ''
    const choiceLabels = ['A', 'B', 'C', 'D']
    const mood = getCharacterMood(stats)

    return (
      <div className={cn('min-h-screen transition-colors duration-500', moodBg ? `bg-gradient-to-b ${moodBg}` : 'bg-[#FDF6EE]')}>
        <div className="max-w-lg mx-auto p-4">
          {/* Vocabulary Popup */}
          {showVocab && (
            <VocabularyPopup
              vocabulary={vocabData.vocabulary}
              statEffect={vocabData.statEffect}
              onClose={confirmVocab}
            />
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={history.length > 1 ? goBack : goToMenu} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
              <ArrowLeft size={16} /> {history.length > 1 ? 'กลับ' : 'ออก'}
            </button>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600"><Volume2 size={18} /></button>
              <span className="text-gray-400 text-xs flex items-center gap-1">🗺️ ฉาก {chapterNum}</span>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-3">บทที่ {chapterNum}</p>

          <div className="flex gap-4">
            {/* Main Content */}
            <div className="flex-1 min-w-0" ref={contentRef}>
              {/* Scene Illustration */}
              <div className={cn('rounded-2xl overflow-hidden mb-4 h-36 flex items-center justify-center shadow-sm transition-opacity duration-200', sceneTransition ? 'opacity-0' : 'opacity-100')} style={{ background: illustrationBg }}>
                <span className="text-6xl">{scene.illustration || '🌙'}</span>
              </div>

              {/* Title */}
              {scene.title && (
                <h2 className="text-gray-800 font-bold text-lg mb-3">§ {scene.title}</h2>
              )}

              {/* Character + Mood inline */}
              <div className="flex items-center gap-2 mb-3 p-2 bg-white/60 rounded-xl">
                <span className="text-xl">{getCharacterBaseEmoji(selectedCharacter.id)}</span>
                <span className="text-lg">{mood.emoji}</span>
                <span className={cn('text-xs font-medium', mood.color)}>{mood.label}</span>
                <span className="text-gray-300 text-[10px] ml-auto">Lv.{stats.level} {selectedCharacter.name}</span>
              </div>

              {/* Bilingual Story Text */}
              <div className="mb-4">
                {renderBilingualText(scene.contentTH, scene.content)}
              </div>

              {/* Choices */}
              {scene.choices && scene.choices.length > 0 && (
                <div className="space-y-3">
                  <p className="text-gray-400 text-xs">เลือกทางของคุณ</p>
                  {scene.choices.map((choice, i) => (
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
                      {/* Show vocab preview count */}
                      {choice.vocabulary && choice.vocabulary.length > 0 && (
                        <div className="flex gap-1 mt-2 ml-8">
                          <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                            <BookOpen size={10} /> {choice.vocabulary.length} คำศัพท์
                          </span>
                          {choice.statEffect && Object.keys(choice.statEffect).length > 0 && (
                            <span className="text-[10px] bg-green-50 text-green-500 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                              <Sparkles size={10} /> มีผลต่อ stats
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Character Stats Sidebar (desktop) */}
            <div className="w-44 shrink-0 hidden sm:block">
              <div className="sticky top-4">
                <CharacterPanel stats={stats} characterId={selectedCharacter.id} />
              </div>
            </div>
          </div>

          {/* Mobile Stats (bottom) */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#FDF6EE]/95 backdrop-blur border-t border-orange-100 p-3 z-40">
            <div className="max-w-lg mx-auto">
              <CharacterPanel stats={stats} characterId={selectedCharacter.id} showMood={false} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
