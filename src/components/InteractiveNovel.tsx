import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { stories, characters, type Story, type StoryChoice, type Character, type StatEffect } from '@/data/stories'
import { ArrowLeft, ChevronRight, X, BookOpen, Sparkles } from 'lucide-react'
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
const CHAR_IMAGES_KEY = 'knuamd-char-images'

function getCharacterMood(stats: CharacterStats): { emoji: string; label: string } {
  const hpPct = stats.hp / stats.maxHp
  const hungerPct = stats.hunger / stats.maxHunger
  const couragePct = stats.courage / stats.maxCourage
  if (stats.exp >= stats.maxExp) return { emoji: '🥳', label: 'Level Up!' }
  if (hpPct <= 0.2) return { emoji: '😵', label: 'วิกฤต!' }
  if (hungerPct <= 0.15) return { emoji: '🤤', label: 'หิวมาก' }
  if (couragePct <= 0.2) return { emoji: '😨', label: 'กลัวมาก' }
  if (hpPct <= 0.4) return { emoji: '😰', label: 'กังวล' }
  if (hpPct >= 0.8 && hungerPct >= 0.6 && couragePct >= 0.7) return { emoji: '😎', label: 'มั่นใจ' }
  if (hpPct >= 0.6 && hungerPct >= 0.4) return { emoji: '😊', label: 'มีความสุข' }
  if (couragePct >= 0.6) return { emoji: '🙂', label: 'พร้อม' }
  if (stats.gold > 50) return { emoji: '🤑', label: 'รวย!' }
  return { emoji: '😐', label: 'ปกติ' }
}

function getCharEmoji(id: string) { return characters.find(c => c.id === id)?.emoji || '🧑' }
function getCharName(id: string) { return characters.find(c => c.id === id)?.name || 'Hero' }
function loadImages(): Record<string, string> { try { return JSON.parse(localStorage.getItem(CHAR_IMAGES_KEY) || '{}') } catch { return {} } }
function fmt(ms: number) { const t = Math.floor(ms / 1000); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}` }

const sceneStatEffects: Record<string, StatEffect> = {
  inside: { courage: 5, exp: 5 }, menu: { exp: 3 }, desserts: { hunger: 5 },
  recommend: { exp: 8, hunger: 5 }, 'order-food': { hunger: 15, gold: -15, exp: 5 },
  'order-coffee': { hunger: 8, gold: -8, exp: 5 }, talk: { exp: 10, courage: 5 },
  phone: { exp: 3 }, 'ending-cozy': { hunger: 10, courage: 5 }, 'ending-peaceful': { exp: 10 },
  'ending-friends': { courage: 10, exp: 8 }, 'ending-support': { exp: 12, courage: 8 },
  'main-hall': { courage: 8, exp: 8 }, 'side-path': { courage: 5, exp: 5 },
  paintings: { exp: 15 }, 'secret-room': { exp: 10, courage: 10 },
  'ending-treasure': { exp: 20, gold: 10 }, explore: { exp: 5, courage: 3 },
  'food-area': { hunger: 5 }, 'good-deal': { exp: 5, gold: 5 }, 'ask-vendor': { exp: 8 },
  'ending-perfect': { hunger: 20, exp: 10, gold: 10 }, 'ending-save': { gold: 15, exp: 8 },
}

const sceneIllustrations: Record<string, string> = {
  '🌅': 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)', '🚪': 'linear-gradient(135deg, #D4A574 0%, #C48B5E 100%)',
  '✨': 'linear-gradient(135deg, #A8C0FF 0%, #D4B8FF 100%)', '📋': 'linear-gradient(135deg, #E8D5B7 0%, #C9B896 100%)',
  '🍰': 'linear-gradient(135deg, #FECDA6 0%, #F6A6C1 100%)', '☕': 'linear-gradient(135deg, #D4A574 0%, #A67C52 100%)',
  '🧋': 'linear-gradient(135deg, #E8C8A0 0%, #D4A574 100%)', '👍': 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)',
  '💬': 'linear-gradient(135deg, #B8C6DB 0%, #F5F7FA 100%)', '📱': 'linear-gradient(135deg, #C3B1E1 0%, #E8D5F5 100%)',
  '📖': 'linear-gradient(135deg, #F6D365 0%, #E8C87A 100%)', '🏛️': 'linear-gradient(135deg, #E8C87A 0%, #D4A574 100%)',
  '🎨': 'linear-gradient(135deg, #FECDA6 0%, #F6A6C1 100%)', '🔒': 'linear-gradient(135deg, #C9B896 0%, #A69076 100%)',
  '🔎': 'linear-gradient(135deg, #B8C6DB 0%, #A8C0FF 100%)', '🔷': 'linear-gradient(135deg, #A8C0FF 0%, #B8C6DB 100%)',
  '🗝️': 'linear-gradient(135deg, #E8C87A 0%, #F6D365 100%)', '🛒': 'linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)',
  '🌈': 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)', '🍗': 'linear-gradient(135deg, #FECDA6 0%, #E8A87C 100%)',
  '💡': 'linear-gradient(135deg, #F6D365 0%, #FECDA6 100%)', '🎉': 'linear-gradient(135deg, #F6A6C1 0%, #FECDA6 100%)',
  '💰': 'linear-gradient(135deg, #F6D365 0%, #E8C87A 100%)', '🦀': 'linear-gradient(135deg, #F08A5D 0%, #FECDA6 100%)',
}

// ─── Sparkle Background ──────────────────────────────────────────────────────

function SparkleBG() {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: `${2 + Math.random() * 3}px`,
  })), [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div key={i} className="sparkle-particle" style={{ left: p.left, bottom: '-10px', animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }} />
      ))}
    </div>
  )
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({ characterId, image, size = 'text-4xl' }: { characterId: string; image?: string | null; size?: string }) {
  if (image) return <img src={image} alt="" className={cn(size === 'text-4xl' ? 'w-10 h-10' : size === 'text-5xl' ? 'w-12 h-12' : 'w-14 h-14', 'rounded-full object-cover ring-2 ring-[#C5A55A]/50')} />
  return <span className={size}>{getCharEmoji(characterId)}</span>
}

// ─── Metallic Stat Bar ───────────────────────────────────────────────────────

function MetalBar({ label, icon, value, max, barClass }: { label: string; icon: string; value: number; max: number; barClass: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-[#C5A55A]/70 flex items-center gap-1"><span className="text-xs">{icon}</span>{label}</span>
        <span className="text-[11px] text-[#C5A55A] font-mono font-bold">{value}/{max}</span>
      </div>
      <div className="stat-bar-metallic bg-black/30">
        <div className={cn('h-full rounded-[6px] transition-all duration-700', barClass)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── Wood Character Panel ────────────────────────────────────────────────────

function WoodPanel({ stats, charId, image, compact = false }: { stats: CharacterStats; charId: string; image?: string | null; compact?: boolean }) {
  const mood = getCharacterMood(stats)
  if (compact) {
    return (
      <div className="wood-panel p-3">
        <div className="flex items-center gap-3 mb-2">
          <Avatar characterId={charId} image={image} size="text-4xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[#C5A55A] font-bold text-sm">{getCharName(charId)}</span>
              <span className="text-[10px] font-bold bg-[#C5A55A]/20 text-[#C5A55A] px-1.5 py-0.5 rounded-full border border-[#C5A55A]/30">Lv.{stats.level}</span>
              <span className="text-sm ml-auto">{mood.emoji}</span>
            </div>
            <span className="text-[10px] text-[#C5A55A]/60">{mood.label}</span>
          </div>
        </div>
        <MetalBar label="HP" icon="❤️" value={stats.hp} max={stats.maxHp} barClass="stat-bar-hp" />
        <MetalBar label="หิว" icon="🍖" value={stats.hunger} max={stats.maxHunger} barClass="stat-bar-hunger" />
        <MetalBar label="ใจ" icon="💪" value={stats.courage} max={stats.maxCourage} barClass="stat-bar-courage" />
        <div className="flex gap-3 mt-1.5 pt-1.5 border-t border-[#C5A55A]/20">
          <span className="text-[10px] text-[#C5A55A]">💰 {stats.gold}</span>
          <span className="text-[10px] text-[#C5A55A]/60 ml-auto">⭐ {stats.exp}/{stats.maxExp}</span>
        </div>
      </div>
    )
  }
  return (
    <div className="wood-panel p-4">
      <div className="text-center mb-3">
        <div className="relative inline-block">
          <Avatar characterId={charId} image={image} size="text-5xl" />
          <span className="absolute -bottom-2 -right-2 text-2xl">{mood.emoji}</span>
        </div>
        <div className="mt-2">
          <span className="text-[#C5A55A] font-bold text-sm block">{getCharName(charId)}</span>
          <span className="text-[10px] text-[#C5A55A]/60">{mood.label}</span>
        </div>
        <span className="text-[10px] font-bold bg-[#C5A55A]/20 text-[#C5A55A] px-2 py-0.5 rounded-full border border-[#C5A55A]/30 mt-1 inline-block">Lv.{stats.level}</span>
      </div>
      <MetalBar label="HP" icon="❤️" value={stats.hp} max={stats.maxHp} barClass="stat-bar-hp" />
      <MetalBar label="หิว" icon="🍖" value={stats.hunger} max={stats.maxHunger} barClass="stat-bar-hunger" />
      <MetalBar label="ใจ" icon="💪" value={stats.courage} max={stats.maxCourage} barClass="stat-bar-courage" />
      <div className="mt-2 pt-2 border-t border-[#C5A55A]/20">
        <MetalBar label="EXP" icon="⭐" value={stats.exp} max={stats.maxExp} barClass="stat-bar-exp" />
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C5A55A]/20">
        <span className="text-sm">💰</span>
        <span className="text-[#C5A55A] font-bold text-sm">{stats.gold} Gold</span>
      </div>
    </div>
  )
}

// ─── Vocabulary Popup ────────────────────────────────────────────────────────

function VocabPopup({ vocabulary, statEffect, onClose }: { vocabulary: { word: string; meaning: string }[]; statEffect?: StatEffect; onClose: () => void }) {
  const effects = statEffect ? Object.entries(statEffect).filter(([, v]) => v !== 0) : []
  const labels: Record<string, string> = { hp: '❤️ HP', hunger: '🍖 หิว', courage: '💪 ใจ', gold: '💰 Gold', exp: '⭐ EXP' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="metal-frame p-5 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="gold-text" />
            <span className="text-sm font-bold gold-text">คำศัพท์ใหม่</span>
          </div>
          <button onClick={onClose} className="text-[#C5A55A]/50 hover:text-[#C5A55A]"><X size={16} /></button>
        </div>
        {vocabulary.length > 0 ? (
          <div className="space-y-2 mb-3">
            {vocabulary.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#C5A55A]/10 border border-[#C5A55A]/20">
                <span className="gold-text font-bold text-sm">{v.word}</span>
                <span className="text-[#C5A55A]/30">—</span>
                <span className="text-[#C5A55A]/80 text-sm">{v.meaning}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#C5A55A]/40 text-xs text-center py-2">ไม่มีคำศัพท์ใหม่</p>
        )}
        {effects.length > 0 && (
          <div className="border-t border-[#C5A55A]/20 pt-3 mb-3">
            <p className="text-[10px] text-[#C5A55A]/50 mb-2">📊 ผลต่อตัวละคร</p>
            <div className="flex flex-wrap gap-2">
              {effects.map(([k, v]) => (
                <span key={k} className={cn('text-[11px] px-2 py-0.5 rounded-full font-bold border', (v as number) > 0 ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30')}>
                  {labels[k]} {(v as number) > 0 ? '+' : ''}{v}
                </span>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose} className="w-full py-2.5 rounded-xl font-bold text-sm gold-text border border-[#C5A55A]/30 bg-[#C5A55A]/10 hover:bg-[#C5A55A]/20 transition-all">
          เข้าใจแล้ว ✨
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function InteractiveNovel({ onBack }: Props) {
  const [phase, setPhase] = useState<GamePhase>('select-story')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [currentScene, setCurrentScene] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [stats, setStats] = useState<CharacterStats>({ hp: 100, maxHp: 100, hunger: 80, maxHunger: 100, courage: 90, maxCourage: 100, gold: 10, exp: 0, maxExp: 100, level: 1 })
  const [showVocab, setShowVocab] = useState(false)
  const [vocabData, setVocabData] = useState<{ vocabulary: { word: string; meaning: string }[]; statEffect?: StatEffect }>({ vocabulary: [] })
  const [pendingScene, setPendingScene] = useState<string | null>(null)
  const [sceneTransition, setSceneTransition] = useState(false)
  const [gameStart, setGameStart] = useState(Date.now())
  const [choiceStart, setChoiceStart] = useState(Date.now())
  const [now, setNow] = useState(Date.now())
  const [visitedGoals, setVisitedGoals] = useState<Set<string>>(new Set())
  const [charImages, setCharImages] = useState<Record<string, string>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setCharImages(loadImages()) }, [])
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])

  useEffect(() => {
    try {
      const s = localStorage.getItem(SAVE_KEY)
      if (s) {
        const d = JSON.parse(s)
        if (d.storyId && d.characterId && d.currentScene) {
          const st = stories.find(x => x.id === d.storyId)
          const ch = characters.find(x => x.id === d.characterId)
          if (st && ch && d.stats) { setSelectedStory(st); setSelectedCharacter(ch); setCurrentScene(d.currentScene); setHistory(d.history || [d.currentScene]); setStats(d.stats); setPhase('playing'); setGameStart(d.savedAt || Date.now()); setChoiceStart(d.savedAt || Date.now()) }
        }
      }
    } catch {}
  }, [])

  const save = useCallback((sid: string, cid: string, scene: string, h: string[], s: CharacterStats) => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ storyId: sid, characterId: cid, currentScene: scene, history: h, stats: s, savedAt: Date.now() })) } catch {}
  }, [])
  const clearSave = useCallback(() => { try { localStorage.removeItem(SAVE_KEY) } catch {} }, [])

  const startStory = useCallback((story: Story) => { setSelectedStory(story); setPhase('select-character') }, [])

  const selectChar = useCallback((char: Character) => {
    if (!selectedStory) return
    setSelectedCharacter(char)
    const s: CharacterStats = { hp: char.baseStats.hp, maxHp: char.baseStats.hp + 20, hunger: char.baseStats.hunger, maxHunger: 100, courage: char.baseStats.courage, maxCourage: 100, gold: char.baseStats.gold, exp: 0, maxExp: 100, level: 1 }
    setStats(s); setCurrentScene(selectedStory.startScene); setHistory([selectedStory.startScene]); setPhase('playing')
    setGameStart(Date.now()); setChoiceStart(Date.now()); setVisitedGoals(new Set()); clearSave()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedStory, clearSave])

  const goScene = useCallback((sceneId: string) => {
    setSceneTransition(true)
    setTimeout(() => {
      setCurrentScene(sceneId); setSceneTransition(false); setChoiceStart(Date.now())
      if (selectedStory?.goal) setVisitedGoals(prev => { const n = new Set(prev); if (selectedStory.goal!.steps.find(s => s.sceneId === sceneId)) n.add(sceneId); return n })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [selectedStory])

  const applyEffects = useCallback((sceneId: string): StatEffect => {
    const e = sceneStatEffects[sceneId] || {}
    setStats(p => {
      const s = { ...p }
      if (e.hp) s.hp = Math.max(0, Math.min(s.maxHp, s.hp + e.hp))
      if (e.hunger) s.hunger = Math.max(0, Math.min(s.maxHunger, s.hunger + e.hunger))
      if (e.courage) s.courage = Math.max(0, Math.min(s.maxCourage, s.courage + e.courage))
      if (e.gold) s.gold = Math.max(0, s.gold + e.gold)
      if (e.exp) { s.exp = Math.min(s.maxExp, s.exp + e.exp); if (s.exp >= s.maxExp) { s.level++; s.exp = 0; s.maxExp = Math.floor(s.maxExp * 1.5); s.maxHp += 10; s.hp = s.maxHp; s.courage = s.maxCourage; s.hunger = s.maxHunger } }
      return s
    })
    return e
  }, [])

  const handleChoice = useCallback((choice: StoryChoice) => {
    if (!selectedStory || !selectedCharacter) return
    const vocab = choice.vocabulary || []
    const effect = applyEffects(choice.nextScene)
    if (vocab.length > 0 || Object.keys(effect).length > 0) {
      setVocabData({ vocabulary: vocab, statEffect: effect }); setPendingScene(choice.nextScene); setShowVocab(true)
    } else {
      const h = [...history, choice.nextScene]; setHistory(h); goScene(choice.nextScene); save(selectedStory.id, selectedCharacter.id, choice.nextScene, h, stats)
    }
  }, [selectedStory, selectedCharacter, history, stats, applyEffects, goScene, save])

  const confirmVocab = useCallback(() => {
    if (!selectedStory || !selectedCharacter || !pendingScene) return
    const h = [...history, pendingScene]; setHistory(h); goScene(pendingScene); save(selectedStory.id, selectedCharacter.id, pendingScene, h, stats); setShowVocab(false); setPendingScene(null)
  }, [selectedStory, selectedCharacter, pendingScene, history, stats, goScene, save])

  const goBack = useCallback(() => { if (history.length > 1) { const h = history.slice(0, -1); setHistory(h); goScene(h[h.length - 1]) } }, [history, goScene])

  const restart = useCallback(() => {
    if (!selectedStory || !selectedCharacter) return
    const s: CharacterStats = { hp: selectedCharacter.baseStats.hp, maxHp: selectedCharacter.baseStats.hp + 20, hunger: selectedCharacter.baseStats.hunger, maxHunger: 100, courage: selectedCharacter.baseStats.courage, maxCourage: 100, gold: selectedCharacter.baseStats.gold, exp: 0, maxExp: 100, level: 1 }
    setStats(s); setCurrentScene(selectedStory.startScene); setHistory([selectedStory.startScene]); setPhase('playing'); setGameStart(Date.now()); setChoiceStart(Date.now()); setVisitedGoals(new Set()); clearSave()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedStory, selectedCharacter, clearSave])

  const goMenu = useCallback(() => { clearSave(); setPhase('select-story'); setSelectedStory(null); setSelectedCharacter(null); setHistory([]); setStats({ hp: 100, maxHp: 100, hunger: 80, maxHunger: 100, courage: 90, maxCourage: 100, gold: 10, exp: 0, maxExp: 100, level: 1 }) }, [clearSave])

  // ─── Story Selection ────────────────────────────────────────────────────

  if (phase === 'select-story') {
    return (
      <div className="novel-bg">
        <SparkleBG />
        <div className="max-w-lg mx-auto p-4 relative z-10">
          <button onClick={onBack} className="text-[#C5A55A]/50 hover:text-[#C5A55A] flex items-center gap-1 mb-8 text-sm transition-colors"><ArrowLeft size={16} /> กลับ</button>
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">📖</span>
            <h1 className="text-3xl font-bold gold-text" style={{ fontFamily: 'Georgia, serif' }}>Interactive Novels</h1>
            <p className="text-[#C5A55A]/50 text-xs mt-1">เลือกเรื่อง เลือกตัวละคร เปลี่ยนชะตา</p>
          </div>
          <div className="space-y-4">
            {stories.map(story => (
              <button key={story.id} onClick={() => startStory(story)} className="w-full text-left metal-frame p-0 overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group">
                <div className={cn('p-5 bg-gradient-to-r', story.coverGradient)}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{story.emoji}</span>
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg drop-shadow">{story.title}</h2>
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

  // ─── Character Selection ────────────────────────────────────────────────

  if (phase === 'select-character' && selectedStory) {
    return (
      <div className="novel-bg">
        <SparkleBG />
        <div className="max-w-lg mx-auto p-4 relative z-10">
          <button onClick={() => setPhase('select-story')} className="text-[#C5A55A]/50 hover:text-[#C5A55A] flex items-center gap-1 mb-6 text-sm transition-colors"><ArrowLeft size={16} /> เลือกเรื่องอื่น</button>
          <div className="text-center mb-6">
            <span className="text-5xl block mb-2">{selectedStory.emoji}</span>
            <h2 className="text-xl font-bold gold-text" style={{ fontFamily: 'Georgia, serif' }}>{selectedStory.title}</h2>
            <p className="text-[#C5A55A]/50 text-xs">{selectedStory.titleTH}</p>
          </div>
          <p className="text-[#C5A55A]/70 text-sm text-center mb-4 font-medium" style={{ fontFamily: 'Georgia, serif' }}>— เลือกตัวละคร —</p>
          <div className="grid grid-cols-2 gap-3">
            {characters.map(char => {
              const m = getCharacterMood({ hp: char.baseStats.hp, maxHp: char.baseStats.hp + 20, hunger: char.baseStats.hunger, maxHunger: 100, courage: char.baseStats.courage, maxCourage: 100, gold: char.baseStats.gold, exp: 0, maxExp: 100, level: 1 })
              return (
                <button key={char.id} onClick={() => selectChar(char)} className="metal-frame p-4 text-left hover:scale-[0.98] transition-all active:scale-95 group">
                  <div className="text-center mb-2">
                    <Avatar characterId={char.id} image={charImages[char.id]} size="text-4xl" />
                    <span className="text-lg block">{m.emoji}</span>
                  </div>
                  <h3 className="text-[#C5A55A] font-bold text-sm text-center">{char.name}</h3>
                  <p className="text-[#C5A55A]/50 text-[10px] text-center mt-0.5">{char.descriptionTH}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/50">❤️ HP</span><span className="text-[#C5A55A]">{char.baseStats.hp}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/50">💪 ใจ</span><span className="text-[#C5A55A]">{char.baseStats.courage}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/50">💰 Gold</span><span className="text-[#C5A55A]">{char.baseStats.gold}</span></div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ─── Playing / Ending ───────────────────────────────────────────────────

  if ((phase === 'playing' || phase === 'ending') && selectedStory && selectedCharacter) {
    const scene = selectedStory.scenes[currentScene]
    if (!scene) return null

    const img = charImages[selectedCharacter.id]

    // Ending
    if (scene.isEnding) {
      return (
        <div className="novel-bg">
          <SparkleBG />
          <div className="max-w-lg mx-auto p-4 relative z-10">
            <div className="metal-frame p-0 overflow-hidden mb-6">
              <div className="p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(197,165,90,0.2), rgba(30,20,50,0.8), rgba(197,165,90,0.15))' }}>
                <Avatar characterId={selectedCharacter.id} image={img} size="text-5xl" />
                <span className="text-5xl block my-3">{scene.illustration || '🌟'}</span>
                <h2 className="text-2xl font-bold gold-text" style={{ fontFamily: 'Georgia, serif' }}>{scene.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}</h2>
              </div>
            </div>
            <div className="parchment p-5 mb-4">
              {renderBilingual(scene.contentTH, scene.content)}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <WoodPanel stats={stats} charId={selectedCharacter.id} image={img} />
              <div className="wood-panel p-4">
                <h3 className="text-[#C5A55A] font-bold text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>📊 สรุป</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-[#C5A55A]/50">ตัวละคร</span><span className="text-[#C5A55A]">{selectedCharacter.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/50">ฉาก</span><span className="text-[#C5A55A]">{history.length}/{selectedStory.totalScenes}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/50">Level</span><span className="text-[#C5A55A]">Lv.{stats.level}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/50">Gold</span><span className="text-[#C5A55A]">{stats.gold}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/50">⏱️ เวลา</span><span className="text-[#C5A55A] font-mono">{fmt(now - gameStart)}</span></div>
                  {selectedStory.goal && <div className="flex justify-between"><span className="text-[#C5A55A]/50">{selectedStory.goal.icon} เป้าหมาย</span><span className={cn('font-medium', visitedGoals.size >= selectedStory.goal.steps.length ? 'text-green-400' : 'text-[#C5A55A]')}>{visitedGoals.size}/{selectedStory.goal.steps.length}</span></div>}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={goMenu} className="flex-1 py-3 rounded-xl text-[#C5A55A]/70 text-sm font-medium border border-[#C5A55A]/20 bg-[#C5A55A]/5 hover:bg-[#C5A55A]/10 transition-all">เรื่องใหม่</button>
              <button onClick={restart} className="flex-1 py-3 rounded-xl gold-text text-sm font-bold border border-[#C5A55A]/40 bg-[#C5A55A]/15 hover:bg-[#C5A55A]/25 transition-all">เล่นอีกครั้ง ✨</button>
            </div>
          </div>
        </div>
      )
    }

    // Normal scene
    const chapterNum = history.length
    const illustrationBg = scene.illustration ? (sceneIllustrations[scene.illustration] || 'linear-gradient(135deg, #2d1b4e 0%, #4a2c6e 100%)') : 'linear-gradient(135deg, #2d1b4e 0%, #4a2c6e 100%)'
    const choiceLabels = ['A', 'B', 'C', 'D']
    const mood = getCharacterMood(stats)

    return (
      <div className="novel-bg">
        <SparkleBG />
        <div className="max-w-lg mx-auto p-4 relative z-10">
          {showVocab && <VocabPopup vocabulary={vocabData.vocabulary} statEffect={vocabData.statEffect} onClose={confirmVocab} />}

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={history.length > 1 ? goBack : goMenu} className="text-[#C5A55A]/50 hover:text-[#C5A55A] flex items-center gap-1 text-sm transition-colors"><ArrowLeft size={16} /> {history.length > 1 ? 'กลับ' : 'ออก'}</button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#C5A55A]/40 font-mono bg-[#C5A55A]/10 px-2 py-1 rounded-full border border-[#C5A55A]/20">⏱ {fmt(now - gameStart)}</span>
              <span className="text-[10px] gold-text font-mono bg-[#C5A55A]/15 px-2 py-1 rounded-full border border-[#C5A55A]/30">🔀 {fmt(now - choiceStart)}</span>
              <span className="text-[10px] text-[#C5A55A]/40">{chapterNum}/{selectedStory.totalScenes}</span>
            </div>
          </div>

          {/* Goal Progress */}
          {selectedStory.goal && (
            <div className="metal-frame p-3 mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#C5A55A]/60 flex items-center gap-1">{selectedStory.goal.icon} {selectedStory.goal.titleTH}</span>
                <span className="text-[10px] gold-text font-bold">{visitedGoals.size}/{selectedStory.goal.steps.length}</span>
              </div>
              <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-gradient-to-r from-[#C5A55A] to-[#f1c40f] rounded-full transition-all duration-500" style={{ width: `${(visitedGoals.size / selectedStory.goal.steps.length) * 100}%` }} />
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedStory.goal.steps.map(step => (
                  <span key={step.sceneId} className={cn('text-[9px] px-1.5 py-0.5 rounded-full border', visitedGoals.has(step.sceneId) ? 'bg-[#C5A55A]/20 text-[#C5A55A] border-[#C5A55A]/40' : 'bg-black/10 text-[#C5A55A]/30 border-[#C5A55A]/10')}>
                    {visitedGoals.has(step.sceneId) ? '✓' : '○'} {step.labelTH}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex-1 min-w-0" ref={contentRef}>
              {/* Scene Frame */}
              <div className={cn('scene-frame h-48 flex items-center justify-center relative transition-opacity duration-200', sceneTransition ? 'opacity-0' : 'opacity-100')} style={{ background: illustrationBg }}>
                <span className="text-6xl">{scene.illustration || '🌙'}</span>
                <div className="absolute bottom-3 left-3 flex items-end gap-2 metal-frame px-3 py-2">
                  <Avatar characterId={selectedCharacter.id} image={img} size="text-4xl" />
                  <span className="text-xl">{mood.emoji}</span>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold gold-text bg-black/40 backdrop-blur border border-[#C5A55A]/30">
                  {mood.label}
                </div>
              </div>

              {/* Chapter Divider */}
              {scene.title && (
                <div className="chapter-divider">
                  <span className="text-[#C5A55A] font-bold text-sm whitespace-nowrap" style={{ fontFamily: 'Georgia, serif' }}>§ {scene.title}</span>
                </div>
              )}

              {/* Parchment Text */}
              <div className="parchment p-5 mb-4">
                {renderBilingual(scene.contentTH, scene.content)}
              </div>

              {/* Choices */}
              {scene.choices && scene.choices.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[#C5A55A]/50 text-xs text-center" style={{ fontFamily: 'Georgia, serif' }}>— เลือกทางของคุณ —</p>
                  {scene.choices.map((choice, i) => (
                    <button key={i} onClick={() => handleChoice(choice)} className="choice-btn w-full text-left p-4 group">
                      <div className="flex items-start gap-3 relative z-10">
                        <span className="gold-text font-bold text-sm w-5 shrink-0 pt-0.5" style={{ fontFamily: 'Georgia, serif' }}>{choiceLabels[i]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#C5A55A] text-sm font-medium">{choice.text}</div>
                          <div className="text-[#C5A55A]/50 text-xs mt-0.5">— {choice.textTH}</div>
                        </div>
                        <ChevronRight size={16} className="text-[#C5A55A]/30 group-hover:text-[#C5A55A] shrink-0 mt-1 transition-colors" />
                      </div>
                      {choice.vocabulary && choice.vocabulary.length > 0 && (
                        <div className="flex gap-1 mt-2 ml-8 relative z-10">
                          <span className="text-[10px] bg-[#3498db]/20 text-[#3498db] px-2 py-0.5 rounded-full border border-[#3498db]/30 flex items-center gap-1">
                            <BookOpen size={10} /> {choice.vocabulary.length} คำ
                          </span>
                          {choice.statEffect && Object.keys(choice.statEffect).length > 0 && (
                            <span className="text-[10px] bg-[#2ecc71]/20 text-[#2ecc71] px-2 py-0.5 rounded-full border border-[#2ecc71]/30 flex items-center gap-1">
                              <Sparkles size={10} /> stats
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Panel */}
            <div className="w-44 shrink-0 hidden sm:block">
              <div className="sticky top-4"><WoodPanel stats={stats} charId={selectedCharacter.id} image={img} /></div>
            </div>
          </div>

          {/* Mobile Bottom */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#1a0f2e]/95 backdrop-blur border-t border-[#C5A55A]/20 p-3 z-40">
            <div className="max-w-lg mx-auto"><WoodPanel stats={stats} charId={selectedCharacter.id} image={img} compact /></div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function renderBilingual(th: string, en: string) {
  return (
    <>
      {th.split('\n\n').map((p, i) => <p key={`t${i}`} className="text-[#3a2010] text-sm leading-relaxed my-2" style={{ fontFamily: 'Georgia, serif' }}>{p}</p>)}
      {en.split('\n\n').map((p, i) => <p key={`e${i}`} className="text-[#5a4020]/60 text-sm leading-relaxed my-2 italic" style={{ fontFamily: 'Georgia, serif' }}>{p}</p>)}
    </>
  )
}
