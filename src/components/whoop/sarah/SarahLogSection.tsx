import { useState, useRef, useEffect, useCallback } from 'react'
import { Moon, Plus, Play, Mic, Check } from 'lucide-react'
import pamelaImg from '../../../assets/pamela.png'

const weekDays = ['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON']

type VoiceState = 'idle' | 'recording' | 'processing' | 'done'

const demoTranscript = "I had a latte and a croissant this morning on the way to work, then I did Pamela's 15-minute ab workout at lunch."

const parsedActivities = [
  { emoji: '☕', name: 'Latte + Croissant', detail: '420 cal' },
  { emoji: '🏋️', name: 'Ab Workout', detail: 'Strain 6.2' },
]

export default function SarahLogSection() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [sliderValue, setSliderValue] = useState(0)
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(24).fill(4))
  const [typewriterText, setTypewriterText] = useState('')
  const waveInterval = useRef<ReturnType<typeof setInterval>>(undefined)
  const typewriterIndex = useRef(0)

  const startRecording = useCallback(() => {
    setVoiceState('recording')
    waveInterval.current = setInterval(() => {
      setWaveHeights(Array(24).fill(0).map(() => 4 + Math.random() * 20))
    }, 120)
    setTimeout(() => {
      clearInterval(waveInterval.current)
      setVoiceState('processing')
    }, 3000)
  }, [])

  useEffect(() => {
    if (voiceState === 'processing') {
      typewriterIndex.current = 0
      setTypewriterText('')
      const t = setInterval(() => {
        typewriterIndex.current++
        if (typewriterIndex.current <= demoTranscript.length) {
          setTypewriterText(demoTranscript.slice(0, typewriterIndex.current))
        } else {
          clearInterval(t)
          setTimeout(() => setVoiceState('done'), 500)
        }
      }, 25)
      return () => clearInterval(t)
    }
  }, [voiceState])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setSliderValue(v)
    if (v > 80 && voiceState === 'idle') {
      startRecording()
    }
  }

  const reset = () => {
    setVoiceState('idle')
    setSliderValue(0)
    setTypewriterText('')
  }

  return (
    <div className="mx-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-lg text-white">My Log</h3>
        <button className="text-gray-500 hover:text-white">
          <Plus size={18} />
        </button>
      </div>

      {/* Sleep card */}
      <div className="bg-whoop-card rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-whoop-sleep/10 rounded-lg flex items-center justify-center">
          <Moon size={18} className="text-whoop-sleep" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-white">7:12 SLEEP</div>
          <div className="text-[11px] text-gray-400">11:30 PM – 6:42 AM</div>
        </div>
        <div className="w-1 h-8 bg-whoop-sleep rounded-full" />
      </div>

      {/* Activity buttons */}
      <div className="flex gap-2 mb-4">
        <button className="flex-1 bg-whoop-card border border-whoop-border rounded-xl py-2.5 text-xs font-semibold text-gray-300 hover:border-whoop-green/30">
          + ADD ACTIVITY
        </button>
        <button className="flex-1 bg-whoop-card border border-whoop-border rounded-xl py-2.5 text-xs font-semibold text-gray-300 flex items-center justify-center gap-1.5 hover:border-whoop-green/30">
          <Play size={12} fill="currentColor" /> START ACTIVITY
        </button>
      </div>

      {/* Voice logger */}
      <div className="bg-whoop-card rounded-xl p-4 mb-4">
        {voiceState === 'idle' && (
          <div className="relative">
            <input
              type="range" min="0" max="100" value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-10 appearance-none bg-transparent cursor-pointer
                [&::-webkit-slider-runnable-track]:h-10 [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:bg-whoop-inner
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-whoop-coral
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Mic size={14} className="text-white mr-2" />
              <span className="text-xs text-gray-400">Slide to log with voice</span>
            </div>
          </div>
        )}

        {voiceState === 'recording' && (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <div className="flex items-center gap-0.5 h-8">
              {waveHeights.map((h, i) => (
                <div key={i} className="w-1 bg-whoop-coral rounded-full transition-all duration-100"
                  style={{ height: `${h}px` }} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-whoop-red rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Listening...</span>
            </div>
          </div>
        )}

        {voiceState === 'processing' && (
          <div className="animate-fade-in">
            <p className="text-sm text-gray-300 leading-relaxed min-h-[3rem]">
              {typewriterText}<span className="animate-pulse">|</span>
            </p>
          </div>
        )}

        {voiceState === 'done' && (
          <div className="animate-fade-in space-y-2">
            {parsedActivities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-whoop-inner rounded-lg p-2.5">
                <span className="text-lg">{a.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{a.name}</div>
                  <div className="text-[11px] text-gray-400">{a.detail}</div>
                </div>
                <Check size={16} className="text-whoop-green" />
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <img src={pamelaImg} alt="" className="w-5 h-5 rounded-md" />
              <span className="text-[11px] text-gray-400 italic">Nice logging! I've updated your daily plan. ✨</span>
            </div>
            <button onClick={reset} className="text-[10px] text-gray-500 hover:text-gray-300 mt-1">Reset</button>
          </div>
        )}
      </div>

      {/* Journal week dots */}
      <div className="bg-whoop-card rounded-xl p-4">
        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">Journal</h4>
        <div className="flex justify-between mb-3">
          {weekDays.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] text-gray-500">{day}</span>
              {i === 0 ? (
                <div className="w-6 h-6 rounded-full bg-whoop-green flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              ) : i === 1 ? (
                <div className="w-6 h-6 rounded-full border border-whoop-border" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-whoop-inner" />
              )}
            </div>
          ))}
        </div>
        <button className="w-full bg-whoop-inner text-gray-300 text-xs font-semibold rounded-lg py-2 hover:bg-whoop-border">
          Recovery Insights
        </button>
      </div>
    </div>
  )
}
