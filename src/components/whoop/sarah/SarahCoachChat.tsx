import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import pamelaImg from '../../../assets/pamela.png'

interface Message {
  role: 'coach' | 'user'
  text: string
}

function getCoachResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('sleep') || lower.includes('tired'))
    return "Your sleep score was 68% — your deep sleep was low. Try dimming lights by 9 PM and skipping screens 30 min before bed. A short magnesium supplement can help too. 😴"
  if (lower.includes('eat') || lower.includes('food'))
    return "Based on your recovery, I'd suggest lean protein + complex carbs today. Your cortisol is slightly elevated, so avoid sugar spikes. Want me to suggest a meal plan? 🥗"
  if (lower.includes('stress'))
    return "Your stress level is at 2.1 — elevated. Try a 5-minute box breathing session: 4 counts in, hold 4, out 4, hold 4. Walking outside helps too! 🧘‍♀️"
  if (lower.includes('workout') || lower.includes('exercise'))
    return "Your strain target today is 10-12. I'd suggest a 30-min strength session focusing on lower body + core. Keep heart rate in zone 2-3 for optimal recovery. 💪"
  if (lower.includes('craving'))
    return "Cravings often spike when sleep is low — which matches your 68% score. Try a handful of almonds or Greek yogurt. Protein helps stabilize blood sugar! 🥜"
  return "You're doing amazing, Sarah! 57 days to the wedding and you're 81% on track. Keep up the momentum — every small choice adds up! 💕"
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function SarahCoachChat({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'coach', text: "Hey Sarah! Ask me anything — workouts, meals, stress, sleep. I'm here for you. 💕" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'coach', text: getCoachResponse(userMsg) }])
    }, 1500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Chat panel */}
      <div
        className="relative w-full max-w-[393px] h-[85vh] bg-whoop-card rounded-t-2xl flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-whoop-border">
          <img src={pamelaImg} alt="Pamela" className="w-10 h-10 rounded-xl object-cover border-2 border-whoop-coral" />
          <div className="flex-1">
            <div className="font-display font-bold text-whoop-coral text-sm">Pamela Reif</div>
            <div className="text-[10px] text-gray-400">Online · Fitness Coach</div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{ background: 'linear-gradient(180deg, #1C1C22 0%, #18181D 100%)' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'coach' && (
                <img src={pamelaImg} alt="" className="w-6 h-6 rounded-lg mr-2 flex-shrink-0 mt-1" />
              )}
              <div className={`max-w-[75%] px-3 py-2 text-sm ${
                msg.role === 'coach'
                  ? 'bg-whoop-inner rounded-xl rounded-bl-sm text-gray-200'
                  : 'bg-whoop-coral/15 border border-whoop-coral/20 rounded-xl rounded-br-sm text-gray-200'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <img src={pamelaImg} alt="" className="w-6 h-6 rounded-lg mr-2 flex-shrink-0 mt-1" />
              <div className="bg-whoop-inner rounded-xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-whoop-border flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask Pamela anything..."
            className="flex-1 bg-whoop-inner rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 outline-none border border-whoop-border focus:border-whoop-coral/40"
          />
          <button onClick={send} className="w-9 h-9 bg-whoop-coral rounded-full flex items-center justify-center">
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
