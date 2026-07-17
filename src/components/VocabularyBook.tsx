import { useState } from 'react'
import VocabCard, { type VocabWord, VocabChip, speakWord } from './VocabCard'
import { cn } from '@/lib/cn'
import { X, Search, BookOpen, Volume2, Filter } from 'lucide-react'

interface Props {
  words: VocabWord[]
  onClose: () => void
}

const catFilters = ['all', 'noun', 'verb', 'adjective', 'adverb', 'phrase'] as const
const diffFilters = [0, 1, 2, 3] as const

export default function VocabularyBook({ words, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<string>('all')
  const [diff, setDiff] = useState<number>(0)
  const [expandedWord, setExpandedWord] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(true)

  const filtered = words.filter(w => {
    if (search) {
      const q = search.toLowerCase()
      if (!w.word.toLowerCase().includes(q) && !w.meaning.toLowerCase().includes(q)) return false
    }
    if (cat !== 'all' && w.category !== cat) return false
    if (diff > 0 && w.difficulty !== diff) return false
    return true
  })

  const speakAll = () => {
    filtered.forEach((w, i) => {
      setTimeout(() => speakWord(w.word), i * 800)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[85vh] chrome-frame overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-amber-400" />
              <h3 className="text-amber-300 font-bold text-sm">📚 Vocabulary Book</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={speakAll}
                className="text-amber-400/60 hover:text-amber-400 p-1 transition-colors"
                title="Listen to all words"
              >
                <Volume2 size={16} />
              </button>
              <button onClick={onClose} className="text-white/40 hover:text-white p-1 transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
            <span>{filtered.length} words</span>
            <span>•</span>
            <span>{words.filter(w => w.difficulty === 1).length} ⭐</span>
            <span>{words.filter(w => w.difficulty === 2).length} ⭐⭐</span>
            <span>{words.filter(w => w.difficulty === 3).length} ⭐⭐⭐</span>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search words..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/30"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={12} className="text-white/30" />
            {catFilters.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full border transition-colors',
                  cat === c
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-white/5 text-white/40 border-white/10 hover:text-white/60'
                )}
              >
                {c}
              </button>
            ))}
            <span className="text-white/10">|</span>
            {[0, 1, 2, 3].map(d => (
              <button
                key={d}
                onClick={() => setDiff(d)}
                className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full border transition-colors',
                  diff === d
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-white/5 text-white/40 border-white/10 hover:text-white/60'
                )}
              >
                {d === 0 ? 'All' : '⭐'.repeat(d)}
              </button>
            ))}
          </div>
        </div>

        {/* Word List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-white/30 text-sm">
              <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
              {words.length === 0
                ? 'No words learned yet. Play the story to collect vocabulary!'
                : 'No words match your search.'}
            </div>
          ) : (
            filtered.map((w, i) => (
              <div
                key={`${w.word}-${i}`}
                className="transition-all duration-200"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {expandedWord === i ? (
                  <VocabCard
                    word={w}
                    onDismiss={() => setExpandedWord(null)}
                  />
                ) : (
                  <button
                    onClick={() => setExpandedWord(i)}
                    className="w-full text-left"
                  >
                    <VocabChip word={w} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 text-center">
          <span className="text-white/20 text-[10px]">Tap a word to see full details</span>
        </div>
      </div>
    </div>
  )
}
