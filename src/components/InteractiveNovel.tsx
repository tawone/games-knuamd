import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { stories, characters, type Story, type StoryChoice, type Character, type StatEffect, type VocabularyWord, type QuizQuestion } from '@/data/stories'
import { ArrowLeft, ChevronRight, X, BookOpen, Sparkles, Volume2, VolumeX, BookMarked } from 'lucide-react'
import { cn } from '@/lib/cn'
import { gameAudio } from '@/lib/audio'
import VocabCard, { speakWord, speakSentence } from './VocabCard'
import Quiz from './Quiz'
import VocabularyBook from './VocabularyBook'

interface Props { onBack: () => void }

interface CharacterStats {
  hp: number; maxHp: number
  hunger: number; maxHunger: number
  courage: number; maxCourage: number
  gold: number
  exp: number; maxExp: number
  level: number
}

type GamePhase = 'select-story' | 'select-character' | 'playing' | 'ending'

const SAVE_KEY = 'knuamd-novel-save'
const CHAR_IMAGES_KEY = 'knuamd-char-images'

function getMood(s: CharacterStats) {
  const hp = s.hp / s.maxHp, hng = s.hunger / s.maxHunger, crg = s.courage / s.maxCourage
  if (s.exp >= s.maxExp) return { e: '🥳', l: 'Level Up!' }
  if (hp <= 0.2) return { e: '😵', l: 'วิกฤต!' }
  if (hng <= 0.15) return { e: '🤤', l: 'หิวมาก' }
  if (crg <= 0.2) return { e: '😨', l: 'กลัวมาก' }
  if (hp <= 0.4) return { e: '😰', l: 'กังวล' }
  if (hp >= 0.8 && hng >= 0.6 && crg >= 0.7) return { e: '😎', l: 'มั่นใจ' }
  if (hp >= 0.6 && hng >= 0.4) return { e: '😊', l: 'มีความสุข' }
  if (crg >= 0.6) return { e: '🙂', l: 'พร้อม' }
  if (s.gold > 50) return { e: '🤑', l: 'รวย!' }
  return { e: '😐', l: 'ปกติ' }
}

const ce = (id: string) => characters.find(c => c.id === id)?.emoji || '🧑'
const cn2 = (id: string) => characters.find(c => c.id === id)?.name || 'Hero'
const loadImg = (): Record<string, string> => { try { return JSON.parse(localStorage.getItem(CHAR_IMAGES_KEY) || '{}') } catch { return {} } }
const fmt = (ms: number) => { const t = Math.floor(ms / 1000); return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}` }

const effects: Record<string, StatEffect> = {
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

const illBg: Record<string, string> = {
  '🌅': 'linear-gradient(135deg, #4a3520 0%, #6b4a28 50%, #8b6a38 100%)',
  '🚪': 'linear-gradient(135deg, #3a2818 0%, #5a3a20 50%, #4a3018 100%)',
  '✨': 'linear-gradient(135deg, #2a2848 0%, #4a3868 50%, #3a2858 100%)',
  '📋': 'linear-gradient(135deg, #3a3020 0%, #5a4830 50%, #4a3828 100%)',
  '🍰': 'linear-gradient(135deg, #4a3028 0%, #6a4038 50%, #5a3830 100%)',
  '☕': 'linear-gradient(135deg, #3a2818 0%, #5a3a20 50%, #4a3018 100%)',
  '🧋': 'linear-gradient(135deg, #3a3020 0%, #5a4830 50%, #4a3828 100%)',
  '👍': 'linear-gradient(135deg, #2a3828 0%, #3a5038 50%, #2a4030 100%)',
  '💬': 'linear-gradient(135deg, #2a3040 0%, #3a4858 50%, #2a3848 100%)',
  '📱': 'linear-gradient(135deg, #302848 0%, #483868 50%, #382858 100%)',
  '📖': 'linear-gradient(135deg, #3a3018 0%, #5a4828 50%, #4a3820 100%)',
  '🏛️': 'linear-gradient(135deg, #3a3018 0%, #5a4828 50%, #4a3820 100%)',
  '🎨': 'linear-gradient(135deg, #4a3028 0%, #6a4038 50%, #5a3830 100%)',
  '🔒': 'linear-gradient(135deg, #302818 0%, #4a3820 50%, #3a3018 100%)',
  '🔎': 'linear-gradient(135deg, #2a3040 0%, #3a4858 50%, #2a3848 100%)',
  '🔷': 'linear-gradient(135deg, #282848 0%, #3a3868 50%, #282858 100%)',
  '🗝️': 'linear-gradient(135deg, #3a3018 0%, #5a4828 50%, #4a3820 100%)',
  '🛒': 'linear-gradient(135deg, #2a3828 0%, #3a5038 50%, #2a4030 100%)',
  '🌈': 'linear-gradient(135deg, #3a2820 0%, #5a3830 50%, #4a3028 100%)',
  '🍗': 'linear-gradient(135deg, #3a2818 0%, #5a3a20 50%, #4a3018 100%)',
  '💡': 'linear-gradient(135deg, #3a3018 0%, #5a4828 50%, #4a3820 100%)',
  '🎉': 'linear-gradient(135deg, #4a3028 0%, #6a4038 50%, #5a3830 100%)',
  '💰': 'linear-gradient(135deg, #3a3018 0%, #5a4828 50%, #4a3820 100%)',
  '🦀': 'linear-gradient(135deg, #4a2818 0%, #6a3820 50%, #5a3018 100%)',
}

// ─── Sparkle Background ─────────────────────────────────────────────────

function Sparkles_BG() {
  const p = useMemo(() => Array.from({ length: 35 }, () => ({
    l: `${5 + Math.random() * 90}%`, b: `${-5 + Math.random() * 20}%`,
    d: `${3 + Math.random() * 7}s`, dur: `${5 + Math.random() * 8}s`,
    sz: `${2 + Math.random() * 4}px`, gold: Math.random() > 0.3,
  })), [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {p.map((x, i) => (
        <div key={i} className={`sparkle ${x.gold ? 'sparkle-gold' : 'sparkle-white'}`}
          style={{ left: x.l, bottom: x.b, animation: `sparkle-up ${x.dur} linear ${x.d} infinite`, width: x.sz, height: x.sz }} />
      ))}
    </div>
  )
}

// ─── Glass Dome ─────────────────────────────────────────────────────────

function GlassDome({ emoji, moodEmoji, image }: { emoji: string; moodEmoji: string; image?: string | null }) {
  return (
    <div className="glass-dome">
      <div className="glass-dome-dome">
        <div className="glass-dome-char">
          {image ? <img src={image} alt="" className="w-10 h-10 rounded-full object-cover" /> : <span className="text-3xl">{emoji}</span>}
        </div>
      </div>
      <div className="glass-dome-base" />
      <span className="glass-dome-mood">{moodEmoji}</span>
    </div>
  )
}

// ─── 3D Metallic Bar ────────────────────────────────────────────────────

function Bar3D({ icon, label, value, max, cls }: { icon: string; label: string; value: number; max: number; cls: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="mb-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-[#C5A55A]/70 flex items-center gap-1.5"><span className="text-xs">{icon}</span>{label}</span>
        <span className="value-badge text-[10px] font-bold px-2 py-0.5 rounded font-mono">{value}/{max}</span>
      </div>
      <div className="bar-3d">
        <div className={cn('bar-3d-fill', cls)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── Wood Panel ─────────────────────────────────────────────────────────

function WoodPanel({ stats, cid, img, compact = false }: { stats: CharacterStats; cid: string; img?: string | null; compact?: boolean }) {
  const m = getMood(stats)
  if (compact) {
    return (
      <div className="wood-panel p-3">
        <div className="flex items-center gap-3 mb-3">
          {img ? <img src={img} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C5A55A]/40" /> : <span className="text-3xl">{ce(cid)}</span>}
          <span className="text-lg">{m.e}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="gold-text-bright font-bold text-sm">{cn2(cid)}</span>
              <span className="value-badge text-[10px] font-bold px-1.5 py-0.5 rounded">Lv.{stats.level}</span>
            </div>
            <span className="text-[10px] text-[#C5A55A]/50">{m.l}</span>
          </div>
        </div>
        <Bar3D icon="🍖" label="หิว" value={stats.hunger} max={stats.maxHunger} cls="bar-hunger" />
        <Bar3D icon="💪" label="ใจ" value={stats.courage} max={stats.maxCourage} cls="bar-courage" />
        <div className="flex gap-3 mt-2 pt-2 border-t border-[#C5A55A]/20">
          <span className="text-[10px] text-[#C5A55A]">💰 {stats.gold}</span>
          <span className="text-[10px] text-[#C5A55A]/50 ml-auto">⭐ {stats.exp}/{stats.maxExp}</span>
        </div>
      </div>
    )
  }
  return (
    <div className="wood-panel p-4">
      <div className="flex items-center gap-3 mb-3">
        {img ? <img src={img} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#C5A55A]/40" /> : <span className="text-4xl">{ce(cid)}</span>}
        <span className="text-xl">{m.e}</span>
        <div>
          <span className="gold-text-bright font-bold text-sm block">{cn2(cid)}</span>
          <span className="value-badge text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-0.5">Lv.{stats.level}</span>
        </div>
      </div>
      <Bar3D icon="❤️" label="HP" value={stats.hp} max={stats.maxHp} cls="bar-hp" />
      <Bar3D icon="🍖" label="หิว" value={stats.hunger} max={stats.maxHunger} cls="bar-hunger" />
      <Bar3D icon="💪" label="ใจ" value={stats.courage} max={stats.maxCourage} cls="bar-courage" />
      <div className="mt-2 pt-2 border-t border-[#C5A55A]/20">
        <Bar3D icon="⭐" label="EXP" value={stats.exp} max={stats.maxExp} cls="bar-exp" />
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C5A55A]/20">
        <span className="text-sm">💰</span>
        <span className="gold-text-bright font-bold text-sm">{stats.gold} Gold</span>
      </div>
    </div>
  )
}

// ─── Vocabulary Popup ───────────────────────────────────────────────────

function VocabPopup({ vocab, eff, onClose }: { vocab: VocabularyWord[]; eff?: StatEffect; onClose: () => void }) {
  const e = eff ? Object.entries(eff).filter(([, v]) => v !== 0) : []
  const lb: Record<string, string> = { hp: '❤️ HP', hunger: '🍖 หิว', courage: '💪 ใจ', gold: '💰 Gold', exp: '⭐ EXP' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="chrome-frame p-5 max-w-sm w-full animate-popIn" onClick={ev => ev.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><BookOpen size={16} className="gold-text" /><span className="text-sm font-bold gold-text" style={{ fontFamily: 'Georgia, serif' }}>คำศัพท์ใหม่</span></div>
          <button onClick={onClose} className="text-[#C5A55A]/40 hover:text-[#C5A55A] transition-colors"><X size={16} /></button>
        </div>
        {vocab.length > 0 ? (
          <div className="space-y-2 mb-3">
            {vocab.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#C5A55A]/10 border border-[#C5A55A]/20 animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
                <button onClick={(e) => { e.stopPropagation(); speakWord(v.word) }} className="text-amber-400 hover:text-amber-300 active:scale-90 transition-transform shrink-0">
                  <Volume2 size={16} />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="gold-text-bright font-bold text-sm">{v.word}</span>
                    {v.ipa && <span className="text-[#C5A55A]/40 text-xs font-mono">{v.ipa}</span>}
                  </div>
                  {v.reading && <div className="text-amber-400/60 text-[11px]">{v.reading}</div>}
                  <span className="text-[#C5A55A]/70 text-xs">{v.meaning}</span>
                </div>
                {v.example && (
                  <button onClick={() => speakSentence(v.example!)} className="text-amber-400/40 hover:text-amber-400 transition-colors shrink-0" title="Listen to example">
                    <Volume2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : <p className="text-[#C5A55A]/30 text-xs text-center py-2">ไม่มีคำศัพท์ใหม่</p>}
        {e.length > 0 && (
          <div className="border-t border-[#C5A55A]/20 pt-3 mb-3">
            <p className="text-[10px] text-[#C5A55A]/40 mb-2">📊 ผลต่อตัวละคร</p>
            <div className="flex flex-wrap gap-2">
              {e.map(([k, v]) => (
                <span key={k} className={cn('text-[11px] px-2 py-0.5 rounded-full font-bold border', (v as number) > 0 ? 'bg-green-900/40 text-green-400 border-green-500/30' : 'bg-red-900/40 text-red-400 border-red-500/30')}>
                  {lb[k]} {(v as number) > 0 ? '+' : ''}{v}
                </span>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose} className="w-full py-2.5 rounded-xl font-bold text-sm gold-text border border-[#C5A55A]/30 bg-[#C5A55A]/10 hover:bg-[#C5A55A]/20 transition-all active:scale-[0.98]">เข้าใจแล้ว ✨</button>
      </div>
    </div>
  )
}

function renderText(th: string, en: string) {
  return (
    <>
      {th.split('\n\n').map((p, i) => <p key={`t${i}`} className="text-[#3a2510] text-[15px] leading-[1.8] my-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{p}</p>)}
      {en.split('\n\n').map((p, i) => <p key={`e${i}`} className="text-[#6a5030]/70 text-[15px] leading-[1.8] my-3 italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{p}</p>)}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function InteractiveNovel({ onBack }: Props) {
  const [phase, setPhase] = useState<GamePhase>('select-story')
  const [selStory, setSelStory] = useState<Story | null>(null)
  const [selChar, setSelChar] = useState<Character | null>(null)
  const [scene, setScene] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [stats, setStats] = useState<CharacterStats>({ hp: 100, maxHp: 100, hunger: 80, maxHunger: 100, courage: 90, maxCourage: 100, gold: 10, exp: 0, maxExp: 100, level: 1 })
  const [showVocab, setShowVocab] = useState(false)
  const [vData, setVData] = useState<{ vocab: { word: string; meaning: string }[]; eff?: StatEffect }>({ vocab: [] })
  const [pendScene, setPendScene] = useState<string | null>(null)
  const [trans, setTrans] = useState(false)
  const [gStart, setGStart] = useState(Date.now())
  const [cStart, setCStart] = useState(Date.now())
  const [now, setNow] = useState(Date.now())
  const [gVisited, setGVisited] = useState<Set<string>>(new Set())
  const [charImgs, setCharImgs] = useState<Record<string, string>>({})
  const [muted, setMuted] = useState(false)
  const [learnedWords, setLearnedWords] = useState<VocabularyWord[]>([])
  const [showVocabBook, setShowVocabBook] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizData, setQuizData] = useState<QuizQuestion | null>(null)
  const [pendingChoiceAfterQuiz, setPendingChoiceAfterQuiz] = useState<StoryChoice | null>(null)
  const [notifications, setNotifications] = useState<{ id: number; text: string; icon: string }[]>([])
  const notifIdRef = useRef(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setCharImgs(loadImg()) }, [])
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null')
      if (d?.storyId && d?.characterId && d?.currentScene) {
        const s = stories.find(x => x.id === d.storyId), c = characters.find(x => x.id === d.characterId)
        if (s && c && d.stats) { setSelStory(s); setSelChar(c); setScene(d.currentScene); setHist(d.history || [d.currentScene]); setStats(d.stats); setPhase('playing'); setGStart(d.savedAt || Date.now()); setCStart(d.savedAt || Date.now()) }
      }
    } catch {}
  }, [])

  const saveNow = useCallback((sid: string, cid: string, sc: string, h: string[], s: CharacterStats) => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ storyId: sid, characterId: cid, currentScene: sc, history: h, stats: s, savedAt: Date.now() })) } catch {}
  }, [])
  const clearAll = useCallback(() => { try { localStorage.removeItem(SAVE_KEY) } catch {} }, [])

  const notif = useCallback((text: string, icon = '✨') => {
    const id = ++notifIdRef.current
    setNotifications(p => [...p, { id, text, icon }])
    setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 2500)
  }, [])

  const goTo = useCallback((sid: string) => {
    setTrans(true); setTimeout(() => {
      setScene(sid); setTrans(false); setCStart(Date.now())
      if (selStory?.goal) setGVisited(p => { const n = new Set(p); if (selStory.goal!.steps.find(s => s.sceneId === sid)) n.add(sid); return n })
      gameAudio.startAmbience(selStory?.scenes[sid]?.mood || 'calm')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [selStory])

  const applyFx = useCallback((sid: string): StatEffect => {
    const e = effects[sid] || {}
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

  const pick = useCallback((ch: StoryChoice) => {
    if (!selStory || !selChar) return
    gameAudio.playSfx('choose')
    if (ch.quiz) {
      setQuizData(ch.quiz)
      setPendingChoiceAfterQuiz(ch)
      setShowQuiz(true)
      return
    }
    const v = ch.vocabulary || [], e = applyFx(ch.nextScene)
    if (v.length > 0) {
      setLearnedWords(p => {
        const existing = new Set(p.map(w => w.word))
        const newWords = v.filter(w => !existing.has(w.word))
        return newWords.length > 0 ? [...p, ...newWords] : p
      })
    }
    if (v.length > 0 || Object.keys(e).length > 0) {
      setVData({ vocab: v, eff: e }); setPendScene(ch.nextScene); setShowVocab(true)
    } else {
      const h = [...hist, ch.nextScene]; setHist(h); goTo(ch.nextScene); saveNow(selStory.id, selChar.id, ch.nextScene, h, stats)
    }
  }, [selStory, selChar, hist, stats, applyFx, goTo, saveNow])

  const confirmV = useCallback(() => {
    if (!selStory || !selChar || !pendScene) return
    const h = [...hist, pendScene]; setHist(h); goTo(pendScene); saveNow(selStory.id, selChar.id, pendScene, h, stats); setShowVocab(false); setPendScene(null)
  }, [selStory, selChar, pendScene, hist, stats, goTo, saveNow])

  const handleQuizComplete = useCallback((correct: boolean) => {
    if (correct) {
      notif('+10 EXP', '📝')
      setStats(p => {
        const s = { ...p }
        s.exp = Math.min(s.maxExp, s.exp + 10)
        if (s.exp >= s.maxExp) { s.level++; s.exp = 0; s.maxExp = Math.floor(s.maxExp * 1.5) }
        return s
      })
    }
    setShowQuiz(false)
    if (pendingChoiceAfterQuiz) {
      const ch = pendingChoiceAfterQuiz
      const v = ch.vocabulary || [], e = applyFx(ch.nextScene)
      if (v.length > 0) {
        setLearnedWords(p => {
          const existing = new Set(p.map(w => w.word))
          const nw = v.filter(w => !existing.has(w.word))
          return nw.length > 0 ? [...p, ...nw] : p
        })
      }
      if (v.length > 0 || Object.keys(e).length > 0) {
        setVData({ vocab: v, eff: e }); setPendScene(ch.nextScene); setShowVocab(true)
      } else {
        const h = [...hist, ch.nextScene]; setHist(h); goTo(ch.nextScene); saveNow(selStory!.id, selChar!.id, ch.nextScene, h, stats)
      }
      setPendingChoiceAfterQuiz(null)
    }
  }, [pendingChoiceAfterQuiz, hist, stats, selStory, selChar, applyFx, goTo, saveNow, notif])

  useEffect(() => { gameAudio.startAmbience('calm') }, [])

  const back = useCallback(() => { if (hist.length > 1) { const h = hist.slice(0, -1); setHist(h); goTo(h[h.length - 1]) } }, [hist, goTo])

  const restart = useCallback(() => {
    if (!selStory || !selChar) return
    const s: CharacterStats = { hp: selChar.baseStats.hp, maxHp: selChar.baseStats.hp + 20, hunger: selChar.baseStats.hunger, maxHunger: 100, courage: selChar.baseStats.courage, maxCourage: 100, gold: selChar.baseStats.gold, exp: 0, maxExp: 100, level: 1 }
    setStats(s); setScene(selStory.startScene); setHist([selStory.startScene]); setPhase('playing'); setGStart(Date.now()); setCStart(Date.now()); setGVisited(new Set()); clearAll()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selStory, selChar, clearAll])

  const goMenu = useCallback(() => {
    clearAll(); setPhase('select-story'); setSelStory(null); setSelChar(null); setHist([]); setGVisited(new Set())
    setStats({ hp: 100, maxHp: 100, hunger: 80, maxHunger: 100, courage: 90, maxCourage: 100, gold: 10, exp: 0, maxExp: 100, level: 1 })
  }, [clearAll])

  // ═══ STORY SELECT ═══
  if (phase === 'select-story') {
    return (
      <div className="novel-bg">
        <Sparkles_BG />
        <div className="max-w-lg mx-auto p-4 relative z-10">
          <button onClick={onBack} className="text-[#C5A55A]/40 hover:text-[#C5A55A] flex items-center gap-1 mb-8 text-sm transition-colors"><ArrowLeft size={16} /> กลับ</button>
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">📖</span>
            <h1 className="text-3xl font-bold gold-text-bright" style={{ fontFamily: 'Georgia, serif' }}>Interactive Novels</h1>
            <p className="text-[#C5A55A]/40 text-xs mt-1">เลือกเรื่อง เลือกตัวละคร เปลี่ยนชะตา</p>
          </div>
          <div className="space-y-4">
            {stories.map(st => (
              <button key={st.id} onClick={() => { setSelStory(st); setPhase('select-character') }} className="w-full text-left chrome-frame p-0 overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group">
                <div className={cn('p-5 bg-gradient-to-r', st.coverGradient)}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{st.emoji}</span>
                    <div className="flex-1"><h2 className="text-white font-bold text-lg drop-shadow">{st.title}</h2><p className="text-white/80 text-xs">{st.titleTH} · {st.totalScenes} ฉาก</p></div>
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

  // ═══ CHARACTER SELECT ═══
  if (phase === 'select-character' && selStory) {
    return (
      <div className="novel-bg">
        <Sparkles_BG />
        <div className="max-w-lg mx-auto p-4 relative z-10">
          <button onClick={() => setPhase('select-story')} className="text-[#C5A55A]/40 hover:text-[#C5A55A] flex items-center gap-1 mb-6 text-sm transition-colors"><ArrowLeft size={16} /> เลือกเรื่องอื่น</button>
          <div className="text-center mb-6">
            <span className="text-5xl block mb-2">{selStory.emoji}</span>
            <h2 className="text-xl font-bold gold-text-bright" style={{ fontFamily: 'Georgia, serif' }}>{selStory.title}</h2>
            <p className="text-[#C5A55A]/40 text-xs">{selStory.titleTH}</p>
          </div>
          <p className="text-[#C5A55A]/50 text-sm text-center mb-5" style={{ fontFamily: 'Georgia, serif' }}>— เลือกตัวละคร —</p>
          <div className="grid grid-cols-2 gap-3">
            {characters.map(ch => {
              const m = getMood({ hp: ch.baseStats.hp, maxHp: ch.baseStats.hp + 20, hunger: ch.baseStats.hunger, maxHunger: 100, courage: ch.baseStats.courage, maxCourage: 100, gold: ch.baseStats.gold, exp: 0, maxExp: 100, level: 1 })
              return (
                <button key={ch.id} onClick={() => {
                  setSelChar(ch); const s: CharacterStats = { hp: ch.baseStats.hp, maxHp: ch.baseStats.hp + 20, hunger: ch.baseStats.hunger, maxHunger: 100, courage: ch.baseStats.courage, maxCourage: 100, gold: ch.baseStats.gold, exp: 0, maxExp: 100, level: 1 }
                  setStats(s); setScene(selStory.startScene); setHist([selStory.startScene]); setPhase('playing'); setGStart(Date.now()); setCStart(Date.now()); setGVisited(new Set()); clearAll()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} className="chrome-frame p-4 text-left hover:scale-[0.98] transition-all active:scale-95 group">
                  <div className="text-center mb-2">
                    {charImgs[ch.id] ? <img src={charImgs[ch.id]} alt="" className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-[#C5A55A]/30" /> : <span className="text-4xl block">{ch.emoji}</span>}
                    <span className="text-lg block">{m.e}</span>
                  </div>
                  <h3 className="gold-text-bright font-bold text-sm text-center">{ch.name}</h3>
                  <p className="text-[#C5A55A]/40 text-[10px] text-center mt-0.5">{ch.descriptionTH}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/40">❤️ HP</span><span className="text-[#C5A55A]">{ch.baseStats.hp}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/40">💪 ใจ</span><span className="text-[#C5A55A]">{ch.baseStats.courage}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-[#C5A55A]/40">💰 Gold</span><span className="text-[#C5A55A]">{ch.baseStats.gold}</span></div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ═══ PLAYING / ENDING ═══
  if ((phase === 'playing' || phase === 'ending') && selStory && selChar) {
    const sc = selStory.scenes[scene]
    if (!sc) return null
    const img = charImgs[selChar.id]
    const m = getMood(stats)

    // ─── ENDING ──────────────────────────────────────────────────────────
    if (sc.isEnding) {
      return (
        <div className="novel-bg">
          <Sparkles_BG />
          <div className="max-w-lg mx-auto p-4 relative z-10">
            <div className="chrome-frame p-0 overflow-hidden mb-6">
              <div className="p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(197,165,90,0.15), rgba(40,30,20,0.95), rgba(197,165,90,0.1))' }}>
                {img ? <img src={img} alt="" className="w-16 h-16 rounded-full object-cover mx-auto ring-3 ring-[#C5A55A]/40 mb-2" /> : <span className="text-5xl block mb-2">{ce(selChar.id)}</span>}
                <span className="text-5xl block my-3">{sc.illustration || '🌟'}</span>
                <h2 className="text-2xl font-bold gold-text-bright" style={{ fontFamily: 'Georgia, serif' }}>{sc.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}</h2>
              </div>
            </div>
            <div className="parchment p-5 mb-4">
              <div className="parchment-edge-top" />
              {renderText(sc.contentTH, sc.content)}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <WoodPanel stats={stats} cid={selChar.id} img={img} />
              <div className="wood-panel p-4">
                <h3 className="gold-text-bright font-bold text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>📊 สรุป</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-[#C5A55A]/40">ตัวละคร</span><span className="text-[#C5A55A]">{selChar.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/40">ฉาก</span><span className="text-[#C5A55A]">{hist.length}/{selStory.totalScenes}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/40">Level</span><span className="gold-text-bright">Lv.{stats.level}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/40">Gold</span><span className="text-[#C5A55A]">{stats.gold}</span></div>
                  <div className="flex justify-between"><span className="text-[#C5A55A]/40">⏱️ เวลา</span><span className="text-[#C5A55A] font-mono">{fmt(now - gStart)}</span></div>
                  {selStory.goal && <div className="flex justify-between"><span className="text-[#C5A55A]/40">{selStory.goal.icon} เป้าหมาย</span><span className={cn('font-bold', gVisited.size >= selStory.goal.steps.length ? 'text-green-400' : 'text-[#C5A55A]')}>{gVisited.size}/{selStory.goal.steps.length}</span></div>}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={goMenu} className="flex-1 py-3 rounded-xl text-[#C5A55A]/60 text-sm font-medium border border-[#C5A55A]/20 bg-[#C5A55A]/5 hover:bg-[#C5A55A]/10 transition-all">เรื่องใหม่</button>
              <button onClick={restart} className="flex-1 py-3 rounded-xl gold-text-bright text-sm font-bold border border-[#C5A55A]/40 bg-[#C5A55A]/15 hover:bg-[#C5A55A]/25 transition-all">เล่นอีกครั้ง ✨</button>
            </div>
          </div>
        </div>
      )
    }

    // ─── NORMAL SCENE ────────────────────────────────────────────────────
    const ch = hist.length
    const bg = sc.illustration ? (illBg[sc.illustration] || 'linear-gradient(135deg, #2a2520 0%, #3a3020 100%)') : 'linear-gradient(135deg, #2a2520 0%, #3a3020 100%)'
    const labels = ['A', 'B', 'C', 'D']

    return (
      <div className="novel-bg">
        <Sparkles_BG />
        <div className="max-w-lg mx-auto p-4 relative z-10 pb-48">
          {showVocab && <VocabPopup vocab={vData.vocab} eff={vData.eff} onClose={confirmV} />}
          {showQuiz && quizData && <Quiz quiz={quizData} onComplete={handleQuizComplete} />}
          {showVocabBook && <VocabularyBook words={learnedWords} onClose={() => setShowVocabBook(false)} />}

          {/* Notifications */}
          <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
            {notifications.map(n => (
              <div key={n.id} className="notification-slide chrome-frame px-4 py-2 flex items-center gap-2 shadow-lg pointer-events-auto">
                <span className="text-sm">{n.icon}</span>
                <span className="text-amber-300 text-xs font-bold">{n.text}</span>
              </div>
            ))}
          </div>

          {/* ═══ TOP: Chrome Metal Frame (Glass Dome + Weather + Mood) ═══ */}
          <div className={cn('chrome-frame p-0 overflow-hidden relative mb-4 transition-opacity duration-200', trans ? 'opacity-0' : 'opacity-100')} style={{ background: bg }}>
            {/* Inner sparkles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="sparkle sparkle-gold" style={{
                  left: `${10 + Math.random() * 80}%`, bottom: `${Math.random() * 40}%`,
                  width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
                  animation: `sparkle-up ${4 + Math.random() * 4}s linear ${Math.random() * 3}s infinite`,
                }} />
              ))}
            </div>

            {/* Glass dome character — left side */}
            <div className="absolute bottom-4 left-5">
              <GlassDome emoji={ce(selChar.id)} moodEmoji={m.e} image={img} />
            </div>

            {/* Illustration icon — center right */}
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22, #e74c3c)' }}>
                <span className="text-4xl">{sc.illustration || '🌙'}</span>
              </div>
            </div>

            {/* Mood Badge — top right */}
            <div className="mood-badge absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm">
              {m.l}
            </div>

            {/* Controls — top left */}
            <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
              <button onClick={() => { gameAudio.playSfx('click'); onBack() }} className="text-[#C5A55A]/40 hover:text-[#C5A55A] transition-colors"><ArrowLeft size={16} /></button>
              <button onClick={() => { gameAudio.playSfx('click'); const m2 = gameAudio.toggleMute(); setMuted(m2) }} className="text-[#C5A55A]/40 hover:text-[#C5A55A] transition-colors" title={muted ? 'Unmute' : 'Mute'}>
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button onClick={() => { gameAudio.playSfx('click'); setShowVocabBook(true) }} className="text-[#C5A55A]/40 hover:text-[#C5A55A] transition-colors relative" title="Vocabulary Book">
                <BookMarked size={16} />
                {learnedWords.length > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 text-[8px] text-black font-bold rounded-full flex items-center justify-center">{learnedWords.length}</span>}
              </button>
            </div>

            {/* Timer pills — bottom right */}
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <span className="timer-pill text-[10px] text-[#C5A55A]/40 font-mono px-2 py-1 rounded-full">⏱ {fmt(now - gStart)}</span>
              <span className="timer-pill-active text-[10px] gold-text font-mono px-2 py-1 rounded-full">🔀 {fmt(now - cStart)}</span>
              <span className="text-[10px] text-[#C5A55A]/30">{ch}/{selStory.totalScenes}</span>
            </div>
          </div>

          {/* ═══ MIDDLE: Parchment Text ═══ */}
          {sc.title && (
            <div className="chapter-divider mt-2 mb-2">
              <span className="gold-text-bright font-bold text-[15px] whitespace-nowrap" style={{ fontFamily: 'Georgia, serif' }}>§ {sc.title}</span>
            </div>
          )}

          <div className="parchment p-5 mb-1">
            <div className="parchment-edge-top" />
            {renderText(sc.contentTH, sc.content)}
          </div>

          <p className="text-[11px] text-[#40e0d0]/60 text-center my-3" style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 8px rgba(64,224,208,0.3)' }}>เลือกทางของคุณ</p>

          {/* ─── Choice Buttons ─── */}
          {sc.choices && sc.choices.length > 0 && (
            <div className="space-y-3 mb-4">
              {sc.choices.map((ch2, i) => (
                <button key={i} onClick={() => pick(ch2)} className="choice-btn w-full text-left p-4 group">
                  <div className="flex items-start gap-3 relative z-10">
                    <span className="gold-text font-bold text-sm w-5 shrink-0 pt-0.5" style={{ fontFamily: 'Georgia, serif' }}>{labels[i]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#C5A55A] text-sm font-medium">{ch2.text}</div>
                      <div className="text-[#C5A55A]/40 text-xs mt-0.5">— {ch2.textTH}</div>
                    </div>
                    <ChevronRight size={16} className="text-[#C5A55A]/25 group-hover:text-[#C5A55A] shrink-0 mt-1 transition-colors" />
                  </div>
                  {ch2.vocabulary && ch2.vocabulary.length > 0 && (
                    <div className="flex gap-1 mt-2 ml-8 relative z-10">
                      <span className="text-[10px] bg-[#3498db]/20 text-[#5dade2] px-2 py-0.5 rounded-full border border-[#3498db]/30 flex items-center gap-1"><BookOpen size={10} /> {ch2.vocabulary.length} คำ</span>
                      {ch2.statEffect && Object.keys(ch2.statEffect).length > 0 && (
                        <span className="text-[10px] bg-[#2ecc71]/20 text-[#58d68d] px-2 py-0.5 rounded-full border border-[#2ecc71]/30 flex items-center gap-1"><Sparkles size={10} /> stats</span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Goal progress */}
          {selStory.goal && (
            <div className="chrome-frame p-3 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#C5A55A]/50 flex items-center gap-1">{selStory.goal.icon} {selStory.goal.titleTH}</span>
                <span className="text-[10px] gold-text font-bold">{gVisited.size}/{selStory.goal.steps.length}</span>
              </div>
              <div className="goal-bar-track"><div className="goal-bar-fill" style={{ width: `${(gVisited.size / selStory.goal.steps.length) * 100}%` }} /></div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {selStory.goal.steps.map(st => (
                  <span key={st.sceneId} className={cn('text-[9px] px-1.5 py-0.5 rounded-full border', gVisited.has(st.sceneId) ? 'bg-[#C5A55A]/20 text-[#C5A55A] border-[#C5A55A]/40' : 'bg-black/10 text-[#C5A55A]/25 border-[#C5A55A]/10')}>
                    {gVisited.has(st.sceneId) ? '✓' : '○'} {st.labelTH}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ═══ BOTTOM: Wood Panel (Character + Stats) — Full Width ═══ */}
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <div className="max-w-lg mx-auto" style={{ background: 'linear-gradient(180deg, transparent, rgba(30,25,18,0.95) 20%, rgba(30,25,18,1) 100%)', padding: '16px 16px 12px' }}>
              <WoodPanel stats={stats} cid={selChar.id} img={img} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
