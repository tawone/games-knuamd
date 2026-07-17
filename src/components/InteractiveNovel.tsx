import { useState } from 'react'
import { stories, type Story, type StoryScene, type StoryChoice, moodStyles } from '@/data/stories'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, RotateCcw, Star, ChevronRight, Eye, EyeOff, Clock, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
import { difficultyColors } from '@/data/stories'

interface Props {
  onBack: () => void
}

function renderContent(text: string) {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('"') || para.startsWith('"') || para.startsWith("'")) {
      return (
        <p key={i} className="text-[#2E8B8B] italic text-sm leading-relaxed my-2 pl-4 border-l-2 border-[#C5A55A]/40">
          {para}
        </p>
      )
    }
    return (
      <p key={i} className="text-gray-800 text-sm leading-relaxed my-2">
        {para}
      </p>
    )
  })
}

export default function InteractiveNovel({ onBack }: Props) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [currentScene, setCurrentScene] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [showTranslation, setShowTranslation] = useState(false)
  const [visitedScenes, setVisitedScenes] = useState<Set<string>>(new Set())
  const [learnedWords, setLearnedWords] = useState<{ word: string; meaning: string }[]>([])
  const [choicesMade, setChoicesMade] = useState(0)
  const [showChoices, setShowChoices] = useState(true)

  const startStory = (story: Story) => {
    setSelectedStory(story)
    setCurrentScene(story.startScene)
    setHistory([story.startScene])
    setShowTranslation(false)
    setVisitedScenes(new Set([story.startScene]))
    setLearnedWords([])
    setChoicesMade(0)
    setShowChoices(true)
  }

  const handleChoice = (choice: StoryChoice) => {
    if (choice.vocabulary) {
      const newWords = [...learnedWords]
      choice.vocabulary.forEach((v) => {
        if (!newWords.find((w) => w.word === v.word)) {
          newWords.push(v)
        }
      })
      setLearnedWords(newWords)
    }
    setCurrentScene(choice.nextScene)
    setHistory((h) => [...h, choice.nextScene])
    setVisitedScenes((s) => new Set([...s, choice.nextScene]))
    setChoicesMade((c) => c + 1)
    setShowChoices(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      setCurrentScene(newHistory[newHistory.length - 1])
      setChoicesMade((c) => Math.max(0, c - 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B]">
        <div className="max-w-lg mx-auto p-4">
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              📖 Interactive Novels
            </h1>
            <p className="text-[#C5A55A] text-sm">อ่านเรื่องสั้น เลือกทางเลือก เปลี่ยนเรื่องราว</p>
          </div>

          <div className="space-y-5">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => startStory(story)}
                className="w-full text-left rounded-2xl overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group"
              >
                <div className={cn('bg-gradient-to-r p-6', story.coverGradient)}>
                  <div className="flex items-start gap-4">
                    <span className="text-5xl group-hover:scale-110 transition-transform drop-shadow-lg">{story.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-white font-bold text-xl drop-shadow">{story.title}</h2>
                        <Badge className={cn('text-[10px] bg-white/20 text-white border-white/30')}>
                          {story.difficulty}
                        </Badge>
                      </div>
                      <p className="text-white/80 text-sm">{story.titleTH}</p>
                      <p className="text-white/60 text-xs mt-1">{story.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-white/60 text-[10px]">
                          <Clock size={12} /> {story.estimatedMinutes} นาที
                        </span>
                        <span className="flex items-center gap-1 text-white/60 text-[10px]">
                          <MapPin size={12} /> {story.totalScenes} ฉาก
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white mt-2" />
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
  const mood = scene.mood ? moodStyles[scene.mood] : null

  if (scene.isEnding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B]">
        <div className="max-w-lg mx-auto p-4">
          <Card className="overflow-hidden bg-white/95 backdrop-blur">
            <div className={cn('bg-gradient-to-r p-8 text-center', selectedStory.coverGradient)}>
              <div className="text-6xl mb-3 drop-shadow-lg">{scene.illustration || '🌟'}</div>
              <h2 className="text-2xl font-bold text-white drop-shadow" style={{ fontFamily: 'Georgia, serif' }}>
                {scene.endingType === 'good' ? 'จบสวย! 🎉' : 'จบเรื่อง'}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-2 mb-6">
                {renderContent(scene.content)}
              </div>
              {showTranslation && (
                <div className="bg-[#FEF7E8] rounded-xl p-4 mb-6">
                  <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">{scene.contentTH}</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#FEF7E8] rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[#1B3A5C]">{visitedScenes.size}</div>
                  <div className="text-[10px] text-gray-500">ฉากที่อ่าน</div>
                </div>
                <div className="bg-[#FEF7E8] rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[#2E8B8B]">{choicesMade}</div>
                  <div className="text-[10px] text-gray-500">ทางเลือก</div>
                </div>
                <div className="bg-[#FEF7E8] rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[#C5A55A]">{learnedWords.length}</div>
                  <div className="text-[10px] text-gray-500">คำใหม่</div>
                </div>
              </div>

              {learnedWords.length > 0 && (
                <div className="bg-[#FEF7E8] rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-[#1B3A5C] text-sm mb-3">📚 คำศัพท์ที่เรียนรู้</h3>
                  <div className="space-y-2">
                    {learnedWords.map((w) => (
                      <div key={w.word} className="flex items-center gap-2">
                        <Badge className="bg-[#2E8B8B]/15 text-[#2E8B8B] border-0 font-medium">{w.word}</Badge>
                        <span className="text-gray-500 text-xs">{w.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-1 text-[#C5A55A] mb-2">
                {Array.from({ length: Math.min(5, Math.max(1, Math.floor(visitedScenes.size / 3))) }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setSelectedStory(null)} className="flex-1 border-[#1B3A5C]/20">
                  เลือกเรื่องใหม่
                </Button>
                <Button onClick={() => startStory(selectedStory)} className="flex-1 bg-[#1B3A5C] hover:bg-[#142D4A] text-white">
                  <RotateCcw size={16} className="mr-1" /> อ่านอีก
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B]">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={history.length > 1 ? goBack : () => setSelectedStory(null)}
            className="text-white/80 hover:text-white flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} /> {history.length > 1 ? 'ย้อนกลับ' : 'เรื่อง'}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white/70 hover:text-white transition-all"
            >
              {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
              {showTranslation ? 'TH' : 'EN'}
            </button>
            <Badge className="bg-white/20 text-white border-0 text-xs">
              <BookOpen size={12} className="mr-1" /> {history.length}/{selectedStory.totalScenes}
            </Badge>
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-1.5 mb-6">
          <div
            className="bg-[#C5A55A] rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${Math.min(100, (history.length / selectedStory.totalScenes) * 100)}%` }}
          />
        </div>

        {mood && (
          <div className={cn('rounded-xl p-2 mb-4 text-center', 'bg-gradient-to-r', mood.bg)}>
            <span className="text-xs text-white/80">{mood.icon} {mood.label}</span>
          </div>
        )}

        {scene.title && (
          <h2 className="text-[#C5A55A] font-bold text-sm mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            {scene.title}
          </h2>
        )}

        {scene.illustration && (
          <div className="text-center mb-4">
            <span className="text-5xl">{scene.illustration}</span>
          </div>
        )}

        <Card className="p-6 bg-white/95 backdrop-blur mb-6">
          <div className="space-y-0">
            {renderContent(scene.content)}
          </div>
          {showTranslation && (
            <div className="border-t border-[#E0D5C0] pt-4 mt-4">
              <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-line">{scene.contentTH}</p>
            </div>
          )}
        </Card>

        {scene.choices && scene.choices.length > 0 && showChoices && (
          <div className="space-y-3 mb-6">
            <p className="text-[#C5A55A]/60 text-xs text-center font-medium">คุณจะทำอย่างไรต่อ?</p>
            {scene.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice)}
                className="w-full text-left rounded-xl overflow-hidden hover:scale-[0.98] transition-all active:scale-95 group"
              >
                <div className="bg-white/15 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/25">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#C5A55A] text-[#1B3A5C] flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium leading-snug">{choice.text}</p>
                      {showTranslation && (
                        <p className="text-white/50 text-xs mt-1">{choice.textTH}</p>
                      )}
                      {choice.consequence && (
                        <p className="text-[#C5A55A]/50 text-[10px] mt-1 italic">💡 {choice.consequence}</p>
                      )}
                      {choice.vocabulary && choice.vocabulary.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {choice.vocabulary.map((v) => (
                            <Badge key={v.word} className="bg-[#2E8B8B]/15 text-[#2E8B8B] border-0 text-[10px]">
                              {v.word} ({v.meaning})
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 mt-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {learnedWords.length > 0 && (
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/40">📚 คำศัพท์ ({learnedWords.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {learnedWords.slice(-6).map((w) => (
                <Badge key={w.word} className="bg-[#2E8B8B]/10 text-[#2E8B8B]/60 border-0 text-[10px]">
                  {w.word}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
