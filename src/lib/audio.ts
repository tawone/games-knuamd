type AmbienceType = 'forest' | 'cave' | 'ghost' | 'battle' | 'calm' | 'city' | 'none'

const MOOD_AMBIENCE: Record<string, AmbienceType> = {
  calm: 'calm', exciting: 'battle', mysterious: 'ghost',
  warm: 'calm', tense: 'cave', happy: 'calm',
}

let currentOsc: OscillatorNode | null = null
let currentGain: GainNode | null = null
let audioCtx: AudioContext | null = null
let muted = false
let currentAmbience: AmbienceType = 'none'

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function playTone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.15) {
  if (muted) return
  const ctx = getCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + dur)
}

function playChord(freqs: number[], dur: number, type: OscillatorType = 'sine', vol = 0.08) {
  freqs.forEach(f => playTone(f, dur, type, vol))
}

export const gameAudio = {
  playSfx(name: string) {
    if (muted) return
    switch (name) {
      case 'click': playTone(800, 0.08, 'square', 0.1); break
      case 'choose': playChord([523, 659, 784], 0.15, 'sine', 0.1); break
      case 'hover': playTone(600, 0.04, 'sine', 0.05); break
      case 'gold': playChord([523, 659, 784, 1047], 0.3, 'sine', 0.12); break
      case 'damage': playTone(150, 0.25, 'sawtooth', 0.12); break
      case 'heal': playChord([440, 554, 659], 0.25, 'sine', 0.1); break
      case 'levelup': playChord([523, 659, 784, 1047], 0.5, 'sine', 0.15); setTimeout(() => playTone(1175, 0.4, 'sine', 0.12), 200); break
      case 'death': playChord([200, 180, 160], 0.8, 'sawtooth', 0.1); break
      case 'start': playChord([392, 494, 587], 0.3, 'sine', 0.12); setTimeout(() => playChord([523, 659, 784], 0.4, 'sine', 0.1), 150); break
      case 'back': playTone(400, 0.1, 'sine', 0.08); playTone(300, 0.1, 'sine', 0.08); break
    }
  },

  speak(text: string, lang = 'en-US', rate = 0.8) {
    if (muted || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = rate
    u.pitch = 1
    window.speechSynthesis.speak(u)
  },

  startAmbience(mood: string) {
    const amb = MOOD_AMBIENCE[mood] || 'calm'
    if (amb === currentAmbience) return
    this.stopAmbience()
    if (muted || amb === 'none') return
    const ctx = getCtx()
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'lowpass'
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2)

    const freqs: Record<string, [number, number]> = {
      calm: [110, 165], cave: [82, 110], forest: [147, 220],
      ghost: [73, 110], battle: [98, 147], city: [131, 196],
    }
    const [f1, f2] = freqs[amb] || [110, 165]
    osc1.frequency.value = f1
    osc2.frequency.value = f2
    osc1.type = 'sine'
    osc2.type = 'triangle'
    filter.frequency.value = amb === 'ghost' ? 400 : amb === 'cave' ? 500 : 800

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(filter).connect(ctx.destination)
    osc1.start()
    osc2.start()
    currentOsc = osc1
    currentGain = gain
    currentAmbience = amb
  },

  stopAmbience() {
    if (currentGain) {
      const ctx = getCtx()
      currentGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
    }
    setTimeout(() => {
      try { currentOsc?.stop() } catch {}
      currentOsc = null
      currentGain = null
      currentAmbience = 'none'
    }, 1200)
  },

  toggleMute() {
    muted = !muted
    if (muted) this.stopAmbience()
    return muted
  },

  isMuted() { return muted },
}
