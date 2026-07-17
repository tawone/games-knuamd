import { useState, useMemo } from 'react'
import { vocabulary, categories, type Word } from '@/data/vocabulary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Trophy, RotateCcw, Star, ChevronRight } from 'lucide-react'
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

interface BlankQuestion {
  word: Word
  blankedWord: string
  hint: string
}

function generateBlankQuestions(cat: string, count: number): BlankQuestion[] {
  const catWords = vocabulary.filter((w) => w.category === cat && w.english.length > 2)
  const selected = shuffle(catWords).slice(0, count)
  return selected.map((word) => {
    const letters = word.english.split('')
    const blankIndex = Math.floor(Math.random() * letters.length)
    const blanked = [...letters]
    blanked[blankIndex] = '_'
    return {
      word,
      blankedWord: blanked.join(''),
      hint: `(${word.thai})`,
    }
  })
}

export default function FillBlank({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [questions, setQuestions] = useState<BlankQuestion[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)

  const startGame = (cat: string) => {
    setSelectedCategory(cat)
    setQuestions(generateBlankQuestions(cat, 10))
    setCurrentQ(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setUserInput('')
    setCorrectCount(0)
    setFeedback(null)
    setShowHint(false)
  }

  const handleSubmit = () => {
    if (!userInput.trim()) return
    const q = questions[currentQ]
    const isCorrect = userInput.trim().toLowerCase() === q.word.english.toLowerCase()

    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setScore((s) => s + 15 + streak * 3)
      setStreak((s) => {
        const ns = s + 1
        if (ns > bestStreak) setBestStreak(ns)
        return ns
      })
      setFeedback('correct')
    } else {
      setStreak(0)
      setFeedback('wrong')
    }
  }

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setCurrentQ(questions.length)
    } else {
      setCurrentQ((q) => q + 1)
      setUserInput('')
      setFeedback(null)
      setShowHint(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !feedback) {
      handleSubmit()
    } else if (e.key === 'Enter' && feedback) {
      nextQuestion()
    }
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-white text-center mb-2">✏️ เติมคำ</h1>
          <p className="text-white/80 text-center mb-6 text-sm">เติมตัวอักษรที่หายไปให้ถูกต้อง</p>
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
      <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4">
        <div className="max-w-lg mx-auto text-center">
          <Card className="p-8 bg-white/95 backdrop-blur">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold mb-2">เติมคำจบแล้ว!</h2>
            <div className="flex justify-center gap-6 my-6">
              <div>
                <div className="text-3xl font-bold text-amber-600">{score}</div>
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
              <Button onClick={() => startGame(selectedCategory)} className="flex-1 bg-orange-600 hover:bg-orange-700">
                <RotateCcw size={16} className="mr-1" /> เล่นอีก
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4">
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
              <Badge className="bg-orange-700 text-white border-0">🔥 {streak}x</Badge>
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
          <p className="text-xs text-gray-400 mb-3">เติมตัวอักษรที่หายไป</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-widest font-mono">{q.blankedWord}</h2>
          {showHint && (
            <p className="text-sm text-gray-500 mt-3">{q.hint}</p>
          )}
        </Card>

        <div className="space-y-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!feedback}
            placeholder="พิมพ์คำตอบที่นี่..."
            className={cn(
              'w-full p-4 rounded-xl text-center text-lg font-medium transition-all outline-none',
              feedback === 'correct'
                ? 'bg-green-100 border-2 border-green-500 text-green-700'
                : feedback === 'wrong'
                ? 'bg-red-100 border-2 border-red-500 text-red-700'
                : 'bg-white/95 border-2 border-transparent focus:border-orange-400 text-gray-800'
            )}
            autoFocus
          />

          {feedback === 'correct' && (
            <div className="text-center text-green-600 font-semibold">✅ ถูกต้อง! +{15 + streak * 3} คะแนน</div>
          )}
          {feedback === 'wrong' && (
            <div className="text-center text-red-600 font-semibold">
              ❌ ผิด! คำตอบคือ <span className="font-bold">{q.word.english}</span>
            </div>
          )}

          {!showHint && !feedback && (
            <button onClick={() => setShowHint(true)} className="text-white/60 text-xs hover:text-white/80">
              💡 ดูคำใบ้
            </button>
          )}

          <div className="flex gap-3 pt-2">
            {!feedback ? (
              <Button onClick={handleSubmit} disabled={!userInput.trim()} className="flex-1 bg-orange-600 hover:bg-orange-700">
                ตรวจคำตอบ
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="flex-1 bg-orange-600 hover:bg-orange-700">
                {currentQ + 1 >= questions.length ? 'ดูผลลัพธ์' : 'ข้อถัดไป'}
                <ChevronRight size={18} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
