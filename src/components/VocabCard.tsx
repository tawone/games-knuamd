import { useState } from 'react'
import { gameAudio } from '@/lib/audio'
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface VocabWord {
  word: string
  ipa?: string
  reading?: string
  meaning: string
  meaningEn?: string
  example?: string
  exampleTH?: string
  difficulty?: 1 | 2 | 3
  category?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'idiom'
}

const catColor: Record<string, string> = {
  noun: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  verb: 'bg-green-500/20 text-green-300 border-green-500/30',
  adjective: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  adverb: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  phrase: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  idiom: 'bg-red-500/20 text-red-300 border-red-500/30',
}

const stars = (d?: number) => '⭐'.repeat(d || 1)

export function speakWord(word: string, lang = 'en-US') {
  gameAudio.speak(word, lang, 0.8)
}

export function speakSentence(s: string, lang = 'en-US') {
  gameAudio.speak(s, lang, 0.85)
}

interface CompactProps { word: VocabWord; learned?: boolean }
export function VocabChip({ word, learned }: CompactProps) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors">
      <button
        onClick={(e) => { e.stopPropagation(); speakWord(word.word) }}
        className="text-amber-400 hover:text-amber-300 text-sm shrink-0 active:scale-90 transition-transform"
        title="Listen"
      >
        <Volume2 size={16} />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-sm">{word.word}</span>
          {word.ipa && <span className="text-white/30 text-xs font-mono">{word.ipa}</span>}
          {learned && <span className="text-green-400 text-xs">✓</span>}
        </div>
        {word.reading && <div className="text-amber-400/70 text-xs">{word.reading}</div>}
        <div className="text-white/60 text-xs">{word.meaning}</div>
      </div>
    </div>
  )
}

interface CardProps { word: VocabWord; learned?: boolean; onDismiss?: () => void }
export default function VocabCard({ word, learned, onDismiss }: CardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="chrome-frame overflow-hidden">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => speakWord(word.word)}
              className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center hover:bg-amber-500/30 active:scale-90 transition-all"
            >
              <Volume2 size={18} className="text-amber-400" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white text-lg font-bold">{word.word}</span>
                {word.ipa && <span className="text-white/40 text-sm font-mono">{word.ipa}</span>}
              </div>
              {word.reading && (
                <div className="text-amber-400/80 text-sm">{word.reading}</div>
              )}
            </div>
          </div>
          {word.difficulty && (
            <span className="text-xs">{stars(word.difficulty)}</span>
          )}
        </div>

        {/* Meaning */}
        <div className="space-y-1">
          <div className="text-white/90 text-sm font-medium">{word.meaning}</div>
          {word.meaningEn && (
            <div className="text-white/50 text-xs">{word.meaningEn}</div>
          )}
          {word.category && (
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full border inline-block', catColor[word.category] || '')}>
              {word.category}
            </span>
          )}
        </div>

        {/* Example */}
        {word.example && (
          <div className="bg-black/20 rounded-lg p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-amber-400/60 uppercase tracking-wider font-bold">Example</span>
              <button
                onClick={() => speakSentence(word.example!)}
                className="text-amber-400/60 hover:text-amber-400 active:scale-90 transition-all"
              >
                <Volume2 size={12} />
              </button>
            </div>
            <p className="text-white/80 text-xs italic leading-relaxed">{word.example}</p>
            {word.exampleTH && (
              <p className="text-white/40 text-xs mt-1">{word.exampleTH}</p>
            )}
          </div>
        )}

        {/* Expand for more details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-white/40 text-xs hover:text-white/60 transition-colors"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Less' : 'More details'}
        </button>

        {expanded && (
          <div className="text-white/30 text-xs space-y-1 border-t border-white/5 pt-2">
            <div>📏 Length: {word.word.length} letters</div>
            {word.ipa && <div>🔤 IPA: {word.ipa}</div>}
            {word.category && <div>📂 Category: {word.category}</div>}
            {word.difficulty && <div>🎯 Difficulty: {stars(word.difficulty)}</div>}
          </div>
        )}
      </div>

      {learned && (
        <div className="bg-green-500/10 border-t border-green-500/20 px-4 py-2 text-center">
          <span className="text-green-400 text-xs font-medium">✓ Added to Vocabulary Book</span>
        </div>
      )}
    </div>
  )
}
