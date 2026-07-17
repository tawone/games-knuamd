import { useState, useEffect, useCallback, useMemo } from 'react'
import { vocabulary, categories, type Word } from '@/data/vocabulary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Trophy, RotateCcw, Star, Zap, Timer } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Props {
  onBack: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function WordMatch({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [selectedThai, setSelectedThai] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)

  const words = useMemo(() => {
    if (!selectedCategory) return []
    const catWords = vocabulary.filter((w) => w.category === selectedCategory)
    return shuffle(catWords).slice(0, 6)
  }, [selectedCategory, round])

  const shuffledThai = useMemo(() => shuffle(words.map((w) => w.thai)), [words])

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    if (timeLeft === 0) setGameOver(true)
    return () => clearTimeout(t)
  }, [timeLeft, timerActive])

  useEffect(() => {
    if (words.length > 0 && matched.size === words.length && words.length > 0) {
      setTimeout(() => setGameOver(true), 500)
    }
  }, [matched, words])

  const startGame = (cat: string) => {
    setSelectedCategory(cat)
    setRound((r) => r + 1)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setTotalQuestions(0)
    setMatched(new Set())
    setGameOver(false)
    setTimeLeft(60)
    setTimerActive(true)
  }

  const handleMatch = useCallback(
    (word: Word) => {
      if (matched.has(word.id) || gameOver) return

      if (selectedWord && selectedWord.id === word.id) {
        setSelectedWord(null)
        return
      }

      setSelectedWord(word)

      if (selectedThai) {
        setTotalQuestions((q) => q + 1)
        if (word.thai === selectedThai) {
          const newMatched = new Set(matched)
          newMatched.add(word.id)
          setMatched(newMatched)
          setScore((s) => s + 10 + streak * 2)
          setStreak((s) => {
            const ns = s + 1
            if (ns > bestStreak) setBestStreak(ns)
            return ns
          })
        } else {
          setWrongPair([word.english, selectedThai])
          setStreak(0)
          setTimeout(() => setWrongPair(null), 600)
        }
        setSelectedWord(null)
        setSelectedThai(null)
      }
    },
    [selectedThai, matched, streak, bestStreak, gameOver, selectedWord]
  )

  const handleThaiClick = useCallback(
    (thai: string) => {
      if (gameOver) return
      setSelectedThai(thai === selectedThai ? null : thai)

      if (selectedWord) {
        setTotalQuestions((q) => q + 1)
        if (selectedWord.thai === thai) {
          const newMatched = new Set(matched)
          newMatched.add(selectedWord.id)
          setMatched(newMatched)
          setScore((s) => s + 10 + streak * 2)
          setStreak((s) => {
            const ns = s + 1
            if (ns > bestStreak) setBestStreak(ns)
            return ns
          })
          setSelectedWord(null)
          setSelectedThai(null)
        } else {
          setWrongPair([selectedWord.english, thai])
          setStreak(0)
          setTimeout(() => {
            setWrongPair(null)
            setSelectedThai(null)
          }, 600)
        }
      }
    },
    [selectedWord, matched, streak, bestStreak, gameOver, selectedThai]
  )

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-white text-center mb-2">🔗 จับคู่คำศัพท์</h1>
          <p className="text-white/80 text-center mb-6 text-sm">เลือกหมวดหมู่แล้วจับคู่ภาษาอังกฤษกับภาษาไทย</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => startGame(cat.id)}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all active:scale-95"
              >
                <span className="text-3xl block mb-2">{cat.emoji}</span>
                <span className="text-white font-semibold text-sm block">{cat.name}</span>
                <span className="text-white/60 text-xs">{cat.nameTH}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (gameOver) {
    const accuracy = totalQuestions > 0 ? Math.round((matched.size / totalQuestions) * 100) : 0
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="max-w-lg mx-auto text-center">
          <Card className="p-8 bg-white/95 backdrop-blur">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">รอบจบแล้ว!</h2>
            <div className="flex justify-center gap-6 my-6">
              <div>
                <div className="text-3xl font-bold text-indigo-600">{score}</div>
                <div className="text-xs text-gray-500">คะแนน</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{matched.size}/{words.length}</div>
                <div className="text-xs text-gray-500">จับคู่ได้</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{accuracy}%</div>
                <div className="text-xs text-gray-500">ความแม่น</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-6">
              {Array.from({ length: Math.min(5, Math.floor(score / 20) + 1) }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-6">🔥 Best Streak: {bestStreak}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="flex-1">
                เลือกหมวดใหม่
              </Button>
              <Button onClick={() => startGame(selectedCategory)} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                <RotateCcw size={16} className="mr-1" /> เล่นอีก
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setSelectedCategory(null)} className="text-white/80 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> หมวด
          </button>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/20 text-white border-0">
              <Timer size={14} className="mr-1" /> {timeLeft}s
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Trophy size={14} className="mr-1" /> {score}
            </Badge>
            {streak > 1 && (
              <Badge className="bg-orange-500 text-white border-0">
                <Zap size={14} className="mr-1" /> {streak}x
              </Badge>
            )}
          </div>
        </div>

        <p className="text-white/70 text-center text-xs mb-4">
          แตะคำภาษาอังกฤษ แล้วแตะคำภาษาไทยที่ตรงกัน
        </p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {words.map((word) => {
            const isMatched = matched.has(word.id)
            const isSelected = selectedWord?.id === word.id
            const isWrong = wrongPair && wrongPair[0] === word.english
            return (
              <button
                key={word.id}
                onClick={() => handleMatch(word)}
                disabled={isMatched}
                className={cn(
                  'rounded-xl p-3 text-center transition-all active:scale-95 font-medium text-sm',
                  isMatched
                    ? 'bg-green-500/80 text-white scale-95'
                    : isWrong
                    ? 'bg-red-500/80 text-white animate-pulse'
                    : isSelected
                    ? 'bg-yellow-400 text-gray-900 ring-2 ring-white scale-105'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                )}
              >
                <span className="text-lg block">{word.emoji}</span>
                {word.english}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {shuffledThai.map((thai) => {
            const isMatched = words.some((w) => w.thai === thai && matched.has(w.id))
            const isSelected = selectedThai === thai
            const isWrong = wrongPair && wrongPair[1] === thai
            return (
              <button
                key={thai}
                onClick={() => handleThaiClick(thai)}
                disabled={isMatched}
                className={cn(
                  'rounded-xl p-3 text-center transition-all active:scale-95 font-medium text-sm',
                  isMatched
                    ? 'bg-green-500/80 text-white scale-95'
                    : isWrong
                    ? 'bg-red-500/80 text-white animate-pulse'
                    : isSelected
                    ? 'bg-yellow-400 text-gray-900 ring-2 ring-white scale-105'
                    : 'bg-white/95 text-gray-800 hover:bg-white'
                )}
              >
                {thai}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <div className="bg-white/20 rounded-full px-4 py-1">
            <span className="text-white text-xs font-medium">
              {matched.size}/{words.length} คู่
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
