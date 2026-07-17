import { useState } from 'react'
import { stories, type Story, type StoryScene, type StoryChoice } from '@/data/stories'
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronRight, BookOpen, Layers, MessageSquare, Save, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Props { onBack: () => void }

type View = 'list' | 'story' | 'scene'

const moodOptions = [
  { value: 'calm', label: '🌊 เงียบสงบ' },
  { value: 'exciting', label: '⚡ ตื่นเต้น' },
  { value: 'mysterious', label: '🔮 ลึกลับ' },
  { value: 'warm', label: '☀️ อบอุ่น' },
  { value: 'tense', label: '😰 ตึงเครียด' },
  { value: 'happy', label: '🎉 มีความสุข' },
]

const illustrationOptions = ['🌅', '🚪', '✨', '📋', '🍰', '☕', '🧋', '👍', '💬', '📱', '📖', '🌿', '🏛️', '🎨', '🔒', '🔎', '🔷', '🗝️', '🛒', '🌈', '🍗', '💡', '🎉', '💰', '🦀']

export default function NovelsAdmin({ onBack }: Props) {
  const [allStories, setAllStories] = useState<Story[]>(stories)
  const [view, setView] = useState<View>('list')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [editStory, setEditStory] = useState<Story | null>(null)
  const [editScene, setEditScene] = useState<StoryScene | null>(null)
  const [expandedScenes, setExpandedScenes] = useState<Set<string>>(new Set())

  const selectedStory = allStories.find(s => s.id === selectedStoryId) || null
  const selectedScene = selectedStory?.scenes[selectedSceneId || ''] || null

  const openStory = (story: Story) => {
    setSelectedStoryId(story.id)
    setEditStory({ ...story, scenes: { ...story.scenes } })
    setView('story')
  }

  const openScene = (sceneId: string) => {
    setSelectedSceneId(sceneId)
    if (selectedStory) {
      setEditScene({ ...selectedStory.scenes[sceneId] })
    }
    setView('scene')
  }

  const saveStory = () => {
    if (!editStory) return
    setAllStories(prev => prev.map(s => s.id === editStory.id ? editStory : s))
    setView('story')
  }

  const saveScene = () => {
    if (!editScene || !editStory) return
    const newScenes = { ...editStory.scenes, [editScene.id]: editScene }
    const updatedStory = { ...editStory, scenes: newScenes }
    setEditStory(updatedStory)
    setAllStories(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s))
    setView('story')
  }

  const addScene = () => {
    if (!editStory) return
    const id = `scene-${Date.now()}`
    const newScene: StoryScene = {
      id,
      title: 'New Scene',
      content: '',
      contentTH: '',
      mood: 'calm',
      illustration: '✨',
      choices: [],
    }
    const updatedStory = {
      ...editStory,
      scenes: { ...editStory.scenes, [id]: newScene },
      totalScenes: Object.keys(editStory.scenes).length + 1,
    }
    setEditStory(updatedStory)
    setAllStories(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s))
    openScene(id)
  }

  const deleteScene = (sceneId: string) => {
    if (!editStory) return
    const newScenes = { ...editStory.scenes }
    delete newScenes[sceneId]
    const updatedStory = {
      ...editStory,
      scenes: newScenes,
      totalScenes: Object.keys(newScenes).length,
    }
    setEditStory(updatedStory)
    setAllStories(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s))
    setView('story')
  }

  const updateChoice = (choiceIdx: number, field: keyof StoryChoice, value: string) => {
    if (!editScene) return
    const newChoices = [...(editScene.choices || [])]
    newChoices[choiceIdx] = { ...newChoices[choiceIdx], [field]: value }
    setEditScene({ ...editScene, choices: newChoices })
  }

  const addChoice = () => {
    if (!editScene) return
    const newChoice: StoryChoice = { text: '', textTH: '', nextScene: '' }
    setEditScene({ ...editScene, choices: [...(editScene.choices || []), newChoice] })
  }

  const removeChoice = (idx: number) => {
    if (!editScene) return
    const newChoices = (editScene.choices || []).filter((_, i) => i !== idx)
    setEditScene({ ...editScene, choices: newChoices })
  }

  const addVocab = (choiceIdx: number) => {
    if (!editScene) return
    const newChoices = [...(editScene.choices || [])]
    const choice = { ...newChoices[choiceIdx] }
    choice.vocabulary = [...(choice.vocabulary || []), { word: '', meaning: '' }]
    newChoices[choiceIdx] = choice
    setEditScene({ ...editScene, choices: newChoices })
  }

  const updateVocab = (choiceIdx: number, vocabIdx: number, field: 'word' | 'meaning', value: string) => {
    if (!editScene) return
    const newChoices = [...(editScene.choices || [])]
    const choice = { ...newChoices[choiceIdx] }
    const vocab = [...(choice.vocabulary || [])]
    vocab[vocabIdx] = { ...vocab[vocabIdx], [field]: value }
    choice.vocabulary = vocab
    newChoices[choiceIdx] = choice
    setEditScene({ ...editScene, choices: newChoices })
  }

  const removeVocab = (choiceIdx: number, vocabIdx: number) => {
    if (!editScene) return
    const newChoices = [...(editScene.choices || [])]
    const choice = { ...newChoices[choiceIdx] }
    choice.vocabulary = (choice.vocabulary || []).filter((_, i) => i !== vocabIdx)
    newChoices[choiceIdx] = choice
    setEditScene({ ...editScene, choices: newChoices })
  }

  const InputField = ({ label, value, onChange, multiline, placeholder }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }) => (
    <div className="mb-3">
      <label className="block text-xs text-gray-500 mb-1 font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E8734A] focus:ring-1 focus:ring-[#E8734A]/30 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E8734A] focus:ring-1 focus:ring-[#E8734A]/30"
        />
      )}
    </div>
  )

  // ========== STORY LIST ==========
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-2xl mx-auto p-4">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm mb-4 inline-flex items-center gap-1">
            <ArrowLeft size={16} /> กลับ
          </button>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">📖 Interactive Novels</h1>
              <p className="text-gray-400 text-xs">จัดการเรื่อง ฉาก และทางเลือก</p>
            </div>
          </div>

          <div className="space-y-3">
            {allStories.map(story => {
              const sceneCount = Object.keys(story.scenes).length
              return (
                <button key={story.id} onClick={() => openStory(story)} className="w-full text-left bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
                  <div className={cn('rounded-t-2xl p-4', `bg-gradient-to-r ${story.coverGradient}`)}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{story.emoji}</span>
                      <div className="flex-1">
                        <h2 className="text-white font-bold text-lg drop-shadow-sm">{story.title}</h2>
                        <p className="text-white/80 text-xs">{story.titleTH}</p>
                      </div>
                      <span className="text-white/70 text-xs bg-white/20 px-2 py-1 rounded-full">{story.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Layers size={12} /> {sceneCount} ฉาก</span>
                      <span>~{story.estimatedMinutes} นาที</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ========== STORY EDITOR ==========
  if (view === 'story' && editStory) {
    const sceneIds = Object.keys(editStory.scenes)
    return (
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-2xl mx-auto p-4">
          <button onClick={() => setView('list')} className="text-gray-400 hover:text-gray-600 text-sm mb-4 inline-flex items-center gap-1">
            <ArrowLeft size={16} /> กลับไปรายการ
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-4">แก้ไขเรื่อง</h1>

          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 mb-4">
            <InputField label="ชื่อเรื่อง (EN)" value={editStory.title} onChange={v => setEditStory({ ...editStory, title: v })} />
            <InputField label="ชื่อเรื่อง (TH)" value={editStory.titleTH} onChange={v => setEditStory({ ...editStory, titleTH: v })} />
            <InputField label="Emoji" value={editStory.emoji} onChange={v => setEditStory({ ...editStory, emoji: v })} />
            <InputField label="คำอธิบาย (EN)" value={editStory.description} onChange={v => setEditStory({ ...editStory, description: v })} />
            <InputField label="คำอธิบาย (TH)" value={editStory.descriptionTH} onChange={v => setEditStory({ ...editStory, descriptionTH: v })} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Difficulty</label>
                <select
                  value={editStory.difficulty}
                  onChange={e => setEditStory({ ...editStory, difficulty: e.target.value as Story['difficulty'] })}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <InputField label="เวลา (นาที)" value={String(editStory.estimatedMinutes)} onChange={v => setEditStory({ ...editStory, estimatedMinutes: parseInt(v) || 0 })} />
            </div>

            <div className="flex justify-end mt-3">
              <button onClick={saveStory} className="px-4 py-2 bg-[#E8734A] text-white text-sm font-bold rounded-xl hover:bg-[#D4622E] flex items-center gap-1">
                <Save size={14} /> บันทึก
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">ฉากทั้งหมด ({sceneIds.length})</h2>
            <button onClick={addScene} className="px-3 py-1.5 bg-[#E8734A] text-white text-xs font-bold rounded-xl hover:bg-[#D4622E] flex items-center gap-1">
              <Plus size={14} /> เพิ่มฉาก
            </button>
          </div>

          <div className="space-y-2">
            {sceneIds.map(sceneId => {
              const scene = editStory.scenes[sceneId]
              const isExpanded = expandedScenes.has(sceneId)
              return (
                <div key={sceneId} className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => {
                      const next = new Set(expandedScenes)
                      if (next.has(sceneId)) next.delete(sceneId)
                      else next.add(sceneId)
                      setExpandedScenes(next)
                    }}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-orange-50/50"
                  >
                    <span className="text-lg">{scene.illustration || '✨'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">{scene.title || sceneId}</div>
                      <div className="text-[10px] text-gray-400">{scene.choices?.length || 0} ทางเลือก {scene.isEnding ? '· จบท้าย' : ''}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); openScene(sceneId) }} className="text-[#E8734A] text-xs font-medium px-2 py-1 rounded-lg hover:bg-[#E8734A]/10">แก้ไข</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteScene(sceneId) }} className="text-red-400 p-1 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
                      {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-orange-50">
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{scene.contentTH}</p>
                      <p className="text-xs text-gray-400 italic mt-1 leading-relaxed">{scene.content}</p>
                      {scene.choices && scene.choices.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {scene.choices.map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px]">
                              <span className="text-[#E8734A] font-bold">{String.fromCharCode(65 + i)}</span>
                              <span className="text-gray-600">{c.text}</span>
                              <span className="text-gray-400">→ {c.nextScene}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ========== SCENE EDITOR ==========
  if (view === 'scene' && editScene) {
    return (
      <div className="min-h-screen bg-[#FDF6EE]">
        <div className="max-w-2xl mx-auto p-4">
          <button onClick={() => setView('story')} className="text-gray-400 hover:text-gray-600 text-sm mb-4 inline-flex items-center gap-1">
            <ArrowLeft size={16} /> กลับไปเรื่อง
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">แก้ไขฉาก</h1>
          <p className="text-gray-400 text-xs mb-4">Scene ID: {editScene.id}</p>

          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 mb-4">
            <InputField label="Scene ID" value={editScene.id} onChange={v => setEditScene({ ...editScene, id: v })} />
            <InputField label="ชื่อบท (Title)" value={editScene.title || ''} onChange={v => setEditScene({ ...editScene, title: v })} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Mood</label>
                <select
                  value={editScene.mood || ''}
                  onChange={e => setEditScene({ ...editScene, mood: e.target.value as StoryScene['mood'] })}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  <option value="">— ไม่ระบุ —</option>
                  {moodOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Illustration</label>
                <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-xl border border-gray-200 max-h-20 overflow-y-auto">
                  {illustrationOptions.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setEditScene({ ...editScene, illustration: emoji })}
                      className={cn('text-lg p-1 rounded-lg transition-all', editScene.illustration === emoji ? 'bg-[#E8734A]/20 ring-1 ring-[#E8734A]' : 'hover:bg-gray-100')}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={!!editScene.isEnding} onChange={e => setEditScene({ ...editScene, isEnding: e.target.checked })} className="rounded border-gray-300" />
                เป็นฉากจบ
              </label>
              {editScene.isEnding && (
                <select
                  value={editScene.endingType || 'neutral'}
                  onChange={e => setEditScene({ ...editScene, endingType: e.target.value as StoryScene['endingType'] })}
                  className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl"
                >
                  <option value="good">🎉 จบสวย</option>
                  <option value="neutral">📖 จบปกติ</option>
                  <option value="bad">😢 จบไม่ดี</option>
                </select>
              )}
            </div>

            <InputField label="เนื้อหา (TH)" value={editScene.contentTH} onChange={v => setEditScene({ ...editScene, contentTH: v })} multiline placeholder="เนื้อหาภาษาไทย..." />
            <InputField label="เนื้อหา (EN)" value={editScene.content} onChange={v => setEditScene({ ...editScene, content: v })} multiline placeholder="English content..." />
          </div>

          {/* Choices */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">ทางเลือก ({(editScene.choices || []).length})</h2>
            <button onClick={addChoice} className="px-3 py-1.5 bg-[#E8734A] text-white text-xs font-bold rounded-xl hover:bg-[#D4622E] flex items-center gap-1">
              <Plus size={14} /> เพิ่ม
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {(editScene.choices || []).map((choice, ci) => (
              <div key={ci} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#E8734A] font-bold text-sm">Choice {String.fromCharCode(65 + ci)}</span>
                  <button onClick={() => removeChoice(ci)} className="text-red-400 p-1 rounded-lg hover:bg-red-50"><Trash2 size={14} /></button>
                </div>
                <InputField label="ทางเลือก (EN)" value={choice.text} onChange={v => updateChoice(ci, 'text', v)} />
                <InputField label="ทางเลือก (TH)" value={choice.textTH} onChange={v => updateChoice(ci, 'textTH', v)} />
                <InputField label="ไปฉาก (Scene ID)" value={choice.nextScene} onChange={v => updateChoice(ci, 'nextScene', v)} placeholder="เช่น start, inside, ending-happy" />

                {/* Vocabulary */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 font-medium">คำศัพท์ ({(choice.vocabulary || []).length})</span>
                    <button onClick={() => addVocab(ci)} className="text-[10px] text-[#E8734A] hover:underline">+ เพิ่มคำ</button>
                  </div>
                  {(choice.vocabulary || []).map((v, vi) => (
                    <div key={vi} className="flex items-center gap-2 mb-1">
                      <input
                        type="text"
                        value={v.word}
                        onChange={e => updateVocab(ci, vi, 'word', e.target.value)}
                        placeholder="word"
                        className="flex-1 px-2 py-1 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E8734A]"
                      />
                      <input
                        type="text"
                        value={v.meaning}
                        onChange={e => updateVocab(ci, vi, 'meaning', e.target.value)}
                        placeholder="ความหมาย"
                        className="flex-1 px-2 py-1 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E8734A]"
                      />
                      <button onClick={() => removeVocab(ci, vi)} className="text-red-300 hover:text-red-500 text-xs">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 sticky bottom-4">
            <button onClick={() => setView('story')} className="flex-1 py-3 rounded-xl bg-white text-gray-600 text-sm font-medium border border-gray-200 hover:bg-gray-50">ยกเลิก</button>
            <button onClick={saveScene} className="flex-1 py-3 rounded-xl bg-[#E8734A] text-white text-sm font-bold hover:bg-[#D4622E] flex items-center justify-center gap-1">
              <Save size={14} /> บันทึกฉาก
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
