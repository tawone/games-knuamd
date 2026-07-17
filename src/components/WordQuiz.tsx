import { useState, useMemo } from 'react'
import { vocabulary, categories, type Word } from '@/data/vocabulary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Trophy, RotateCcw, Star, ChevronRight, Check, X } from 'lucide-react'
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

interface Question {
  word: Word
  options: string[]
  correctIndex: number
}

function generateQuestions(cat: string, count: number): Question[] {
  const catWords = vocabulary.filter((w) => w.category === cat)
  const selected = shuffle(catWords).slice(0, count)
  return selected.map((word) => {
    const others = vocabulary.filter((w) => w.id !== word.id)
    const distractors = shuffle(others).slice(0, 3).map((w) => w.thai)
    const options = shuffle([word.thai, ...distractors])
    return { word, options, correctIndex: options.indexOf(word.thai) }
  })
}

export default function WordQuiz({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showEmoji, setShowEmoji] = useState<string | null>(null)
  const [direction, setDirection] = useState<'en2th' | 'th2en'>('en2th')

  const startGame = (cat: string) => {
    setSelectedCategory(cat)
    setQuestions(generateQuestions(cat, 10))
    setCurrentQ(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setCorrectCount(0)
    setDirection(Math.random() > 0.5 ? 'en2th' : 'th2en')
  }

  const handleAnswer = (index: number) => {
    if (answered) return
    setSelectedAnswer(index)
    setAnswered(true)

    const q = questions[currentQ]
    const isCorrect = index === q.correctIndex

    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setScore((s) => s + 10 + streak * 2)
      setStreak((s) => {
        const ns = s + 1
        if (ns > bestStreak) setBestStreak(ns)
        return ns
      })
      setShowEmoji('✅')
    } else {
      setStreak(0)
      setShowEmoji('❌')
    }

    setTimeout(() => setShowEmoji(null), 500)
  }

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setCurrentQ(questions.length)
    } else {
      setCurrentQ((q) => q + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E8B8B] via-[#234B6E] to-[#1B3A5C] p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-white text-center mb-2">📝 Quiz ทายคำ</h1>
          <p className="text-white/80 text-center mb-6 text-sm">เลือกคำตอบที่ถูกต้อง ทั้ง EN→TH และ TH→EN</p>
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

  const isGameOver = currentQ >= questions.length

  if (isGameOver) {
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E8B8B] via-[#234B6E] to-[#1B3A5C] p-4">
        <div className="max-w-lg mx-auto text-center">
          <Card className="p-8 bg-white/95 backdrop-blur">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Quiz จบแล้ว!</h2>
            <div className="flex justify-center gap-6 my-6">
              <div>
                <div className="text-3xl font-bold text-emerald-600">{score}</div>
                <div className="text-xs text-gray-500">คะแนน</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{correctCount}/{questions.length}</div>
                <div className="text-xs text-gray-500">ถูกต้อง</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{accuracy}%</div>
                <div className="text-xs text-gray-500">ความแม่น</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
              {Array.from({ length: Math.min(5, Math.floor(score / 20) + 1) }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-6">🔥 Best Streak: {bestStreak}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSelectedCategory(null)} className="flex-1">
                เลือกหมวดใหม่
              </Button>
              <Button onClick={() => startGame(selectedCategory)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                <RotateCcw size={16} className="mr-1" /> เล่นอีก
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  const questionText = direction === 'en2th' ? q.word.english : q.word.thai
  const questionLabel = direction === 'en2th' ? 'แปลเป็นภาษาไทยว่าอะไร?' : 'Translate to English?'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B8B] via-[#234B6E] to-[#1B3A5C] p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setSelectedCategory(null)} className="text-white/80 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> หมวด
          </button>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/20 text-white border-0">
              {currentQ + 1}/{questions.length}
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Trophy size={14} className="mr-1" /> {score}
            </Badge>
            {streak > 1 && (
              <Badge className="bg-orange-500 text-white border-0">🔥 {streak}x</Badge>
            )}
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-2 mb-6">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur text-center mb-6">
          <div className="text-4xl mb-3">{q.word.emoji}</div>
          <p className="text-xs text-gray-400 mb-2">{questionLabel}</p>
          <h2 className="text-3xl font-bold text-gray-900">{questionText}</h2>
          <p className="text-xs text-gray-400 mt-2">{direction === 'en2th' ? 'English → ไทย' : 'ไทย → English'}</p>
        </Card>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, i) => {
            const isCorrectOption = i === q.correctIndex
            const isSelectedOption = i === selectedAnswer
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={cn(
                  'rounded-xl p-4 text-center font-medium transition-all active:scale-95 text-sm',
                  answered && isCorrectOption
                    ? 'bg-green-500 text-white'
                    : answered && isSelectedOption && !isCorrectOption
                    ? 'bg-red-500 text-white'
                    : isSelectedOption
                    ? 'bg-teal-500 text-white ring-2 ring-white'
                    : 'bg-white/95 text-gray-800 hover:bg-white'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {answered && isCorrectOption && <Check size={18} />}
                  {answered && isSelectedOption && !isCorrectOption && <X size={18} />}
                  {option}
                </div>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-4 text-center">
            <Button onClick={nextQuestion} className="bg-white text-gray-800 hover:bg-gray-100">
              {currentQ + 1 >= questions.length ? 'ดูผลลัพธ์' : 'ข้อถัดไป'}
              <ChevronRight size={18} className="ml-1" />
            </Button>
          </div>
        )}

        {showEmoji && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <span className="text-7xl animate-bounce">{showEmoji}</span>
          </div>
        )}
      </div>
    </div>
  )
}
