import { useState } from 'react'
import { stories, type Story, type StoryScene } from '@/data/stories'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, RotateCcw, Star, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'
import { difficultyColors } from '@/data/stories'

interface Props {
  onBack: () => void
}

export default function InteractiveNovel({ onBack }: Props) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [currentScene, setCurrentScene] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [showTranslation, setShowTranslation] = useState(false)
  const [visitedScenes, setVisitedScenes] = useState<Set<string>>(new Set())
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set())

  const startStory = (story: Story) => {
    setSelectedStory(story)
    setCurrentScene(story.startScene)
    setHistory([story.startScene])
    setShowTranslation(false)
    setVisitedScenes(new Set([story.startScene]))
    setLearnedWords(new Set())
  }

  const handleChoice = (nextScene: string, vocab?: string[]) => {
    if (vocab) {
      const newWords = new Set(learnedWords)
      vocab.forEach((w) => newWords.add(w))
      setLearnedWords(newWords)
    }
    setCurrentScene(nextScene)
    setHistory((h) => [...h, nextScene])
    setVisitedScenes((s) => new Set([...s, nextScene]))
  }

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      setCurrentScene(newHistory[newHistory.length - 1])
    }
  }

  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B] p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-1 mb-6 text-sm">
            <ArrowLeft size={16} /> กลับ
          </button>
          <h1 className="text-2xl font-bold text-white text-center mb-2">📖 Interactive Novels</h1>
          <p className="text-[#C5A55A] text-center mb-6 text-sm">อ่านเรื่องสั้นภาษาอังกฤษ เลือกทางเลือก เปลี่ยนเรื่องราว</p>

          <div className="space-y-4">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => startStory(story)}
                className="w-full bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-left hover:bg-white/25 transition-all active:scale-[0.98] group border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{story.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-white font-bold text-lg">{story.title}</h2>
                      <Badge className={cn('text-xs', difficultyColors[story.difficulty])}>{story.difficulty}</Badge>
                    </div>
                    <p className="text-[#C5A55A]/80 text-xs">{story.titleTH}</p>
                    <p className="text-white/50 text-xs mt-1">{story.descriptionTH}</p>
                  </div>
                  <ChevronRight size={20} className="text-white/40 group-hover:text-white/80 mt-2" />
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

  if (scene.isEnding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B] p-4">
        <div className="max-w-lg mx-auto text-center">
          <Card className="p-8 bg-white/95 backdrop-blur">
            <div className="text-5xl mb-4">{scene.endingType === 'good' ? '🌟' : scene.endingType === 'bad' ? '💀' : '🌿'}</div>
            <h2 className="text-2xl font-bold mb-2 text-[#1B3A5C]">
              {scene.endingType === 'good' ? 'จบสวย! 🎉' : scene.endingType === 'bad' ? 'จบไม่ดี...' : 'จบเงียบๆ'}
            </h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{scene.content}</p>
            <p className="text-gray-400 text-xs mb-6">{scene.contentTH}</p>

            <div className="bg-[#FEF7E8] rounded-xl p-4 mb-6">
              <h3 className="font-bold text-[#1B3A5C] text-sm mb-2">📚 คำศัพท์ที่เรียนรู้ ({learnedWords.size} คำ)</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(learnedWords).map((word) => (
                  <Badge key={word} className="bg-[#2E8B8B]/15 text-[#2E8B8B] border-0">{word}</Badge>
                ))}
                {learnedWords.size === 0 && <span className="text-xs text-gray-400">ไม่มีคำศัพท์ใหม่ในรอบนี้</span>}
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 text-[#C5A55A] mb-4">
              {Array.from({ length: Math.min(5, visitedScenes.size) }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-6">สำรวจ {visitedScenes.size} ฉาก</p>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setSelectedStory(null)} className="flex-1 border-[#1B3A5C]/20">
                เลือกเรื่องใหม่
              </Button>
              <Button onClick={() => startStory(selectedStory)} className="flex-1 bg-[#1B3A5C] hover:bg-[#142D4A] text-white">
                <RotateCcw size={16} className="mr-1" /> อ่านอีก
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A5C] via-[#1E4060] to-[#2E8B8B] p-4">
      <div className="max-w-lg mx-auto">
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
              className="text-white/60 hover:text-white/90 flex items-center gap-1 text-xs bg-white/10 px-2 py-1 rounded-lg"
            >
              {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
              {showTranslation ? 'TH' : 'EN'}
            </button>
            <Badge className="bg-white/20 text-white border-0 text-xs">
              <BookOpen size={12} className="mr-1" /> {visitedScenes.size}
            </Badge>
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-1.5 mb-6">
          <div className="bg-[#C5A55A] rounded-full h-1.5 transition-all" style={{ width: `${Math.min(100, (visitedScenes.size / 6) * 100)}%` }} />
        </div>

        {scene.title && (
          <h2 className="text-[#C5A55A] font-bold text-sm mb-3 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            {scene.title}
          </h2>
        )}

        <Card className="p-6 bg-white/95 backdrop-blur mb-6">
          <p className="text-gray-800 leading-relaxed text-sm mb-3">{scene.content}</p>
          {showTranslation && (
            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-gray-400 text-xs leading-relaxed">{scene.contentTH}</p>
            </div>
          )}
        </Card>

        {scene.choices && scene.choices.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/50 text-xs text-center">เลือกทางเลือกของคุณ:</p>
            {scene.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice.nextScene, choice.vocabulary)}
                className="w-full bg-white/15 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/25 transition-all active:scale-[0.98] border border-white/10 group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#C5A55A]/20 text-[#C5A55A] flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{choice.text}</p>
                    {showTranslation && (
                      <p className="text-white/50 text-xs mt-0.5">{choice.textTH}</p>
                    )}
                    {choice.vocabulary && choice.vocabulary.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {choice.vocabulary.map((v) => (
                          <Badge key={v} className="bg-[#2E8B8B]/20 text-[#2E8B8B]/80 border-0 text-[10px]">{v}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
