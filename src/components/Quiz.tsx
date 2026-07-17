import { useState } from 'react'
import { gameAudio } from '@/lib/audio'
import { cn } from '@/lib/cn'
import { CheckCircle, XCircle } from 'lucide-react'

export interface QuizQuestion {
  question: string
  questionTH?: string
  options: string[]
  correctIndex: number
  explanation?: string
  explanationTH?: string
  vocabulary?: string
}

interface Props {
  quiz: QuizQuestion
  onComplete: (correct: boolean) => void
}

export default function Quiz({ quiz, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const correct = index === quiz.correctIndex
    gameAudio.playSfx(correct ? 'gold' : 'damage')
    setTimeout(() => onComplete(correct), 1500)
  }

  const isCorrect = selected === quiz.correctIndex
  const isWrong = answered && !isCorrect

  return (
    <div className="chrome-frame overflow-hidden">
      <div className="p-5 space-y-4">
        {/* Question */}
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">📝</span>
          <div>
            <h4 className="text-amber-300 font-bold text-sm uppercase tracking-wider mb-1">Quiz Time!</h4>
            <p className="text-white/90 text-base font-medium">{quiz.question}</p>
            {quiz.questionTH && (
              <p className="text-white/40 text-sm mt-1">{quiz.questionTH}</p>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {quiz.options.map((opt, i) => {
            let style = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            if (answered) {
              if (i === quiz.correctIndex) {
                style = 'bg-green-500/20 border-green-500/50 ring-1 ring-green-500/30'
              } else if (i === selected && i !== quiz.correctIndex) {
                style = 'bg-red-500/20 border-red-500/50 ring-1 ring-red-500/30'
              } else {
                style = 'bg-white/3 border-white/5 opacity-50'
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={cn(
                  'w-full text-left p-3 rounded-xl border transition-all duration-300',
                  style,
                  !answered && 'active:scale-[0.98] cursor-pointer',
                  answered && 'cursor-default'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60 shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-white/80 text-sm flex-1">{opt}</span>
                  {answered && i === quiz.correctIndex && (
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                  )}
                  {answered && i === selected && i !== quiz.correctIndex && (
                    <XCircle size={18} className="text-red-400 shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Result + Explanation */}
        {answered && (
          <div className={cn(
            'rounded-xl p-3 text-sm',
            isCorrect
              ? 'bg-green-500/10 border border-green-500/20 text-green-300'
              : 'bg-red-500/10 border border-red-500/20 text-red-300'
          )}>
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? '✅ Correct! +10 EXP' : '❌ Wrong!'}
            </div>
            {quiz.explanation && (
              <p className="text-white/60 text-xs mt-1">{quiz.explanation}</p>
            )}
            {quiz.explanationTH && (
              <p className="text-white/40 text-xs mt-0.5">{quiz.explanationTH}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
