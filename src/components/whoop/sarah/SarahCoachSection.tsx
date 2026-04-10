import { useState } from 'react'
import { ChevronDown, ChevronUp, MessageCircle, Droplets, UtensilsCrossed, Footprints, Dumbbell, Salad, StretchHorizontal, Moon } from 'lucide-react'
import pamelaImg from '../../../assets/pamela.png'
import SarahCoachChat from './SarahCoachChat'
import SarahMealLogger from './SarahMealLogger'

const timeline = [
  { time: 'NOW', label: 'Water', sub: 'Stay hydrated', icon: Droplets, color: '#00D26A', isNow: true },
  { time: '12PM', label: 'Lunch', sub: 'Nutrient boost', icon: UtensilsCrossed, color: '#FF9100', hasMealLog: true, mealName: 'Lunch' },
  { time: '2PM', label: 'Walk', sub: 'Active recovery', icon: Footprints, color: '#3DAEF5' },
  { time: '5:30PM', label: 'Workout', sub: 'Strength training', icon: Dumbbell, color: '#FF8A80' },
  { time: '7PM', label: 'Dinner', sub: 'Clean eating', icon: Salad, color: '#FF9100', hasMealLog: true, mealName: 'Dinner' },
  { time: '9:30PM', label: 'Stretch', sub: 'Flexibility work', icon: StretchHorizontal, color: '#8B6FFF' },
  { time: '11PM', label: 'Sleep', sub: 'Recovery', icon: Moon, color: '#6b7280', isLast: true },
]

export default function SarahCoachSection() {
  const [expanded, setExpanded] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [activeMealLog, setActiveMealLog] = useState<string | null>(null)

  return (
    <div className="mx-4 mb-4">
      <div className="bg-whoop-card rounded-2xl overflow-hidden"
        style={{ background: expanded ? undefined : 'linear-gradient(90deg, rgba(255,138,128,0.06) 0%, transparent 60%)' }}>

        {/* Header */}
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-4">
          <div className="relative flex-shrink-0">
            <img src={pamelaImg} alt="Pamela" className="w-[52px] h-[52px] rounded-[14px] object-cover border-2 border-whoop-coral" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-whoop-green rounded-full border-2 border-whoop-card" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-display font-bold text-whoop-coral text-sm">Pamela Reif</div>
            <div className="text-[11px] text-gray-400">Home Fitness & Clean Eating Coach</div>
          </div>
          <button onClick={e => { e.stopPropagation(); setChatOpen(true) }}
            className="text-whoop-coral mr-2 hover:bg-whoop-coral/10 rounded-lg p-1.5">
            <MessageCircle size={20} />
          </button>
          {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 animate-fade-in">
            {/* Quote */}
            <div className="bg-whoop-inner rounded-xl p-4 mb-4 relative">
              <span className="absolute top-2 left-3 text-5xl text-whoop-coral/10 font-display leading-none">"</span>
              <p className="text-sm text-gray-300 leading-relaxed pl-6">
                Sarah, your recovery is at 52% today — let's keep the workout moderate and focus on nutrition.
                Your sleep debt is catching up, so tonight is key!
              </p>
              <div className="flex items-center gap-2 mt-3 pl-6">
                <img src={pamelaImg} alt="" className="w-4 h-4 rounded-sm" />
                <span className="text-[10px] text-gray-500">based on your last 42 days of data</span>
              </div>
            </div>

            {/* Timeline */}
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
              Today's Wellness Plan
            </h4>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i}>
                  <div className={`flex items-start gap-3 py-2 px-2 rounded-lg ${item.isNow ? 'bg-whoop-green/5' : ''}`}>
                    {/* Time */}
                    <span className="text-[10px] font-bold w-10 flex-shrink-0 pt-0.5" style={{ color: item.color }}>
                      {item.time}
                    </span>

                    {/* Dot + line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full mt-1" style={{ backgroundColor: item.color }} />
                      {!item.isLast && <div className="w-px h-6 bg-whoop-border" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <item.icon size={13} style={{ color: item.color }} />
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                      </div>
                      <span className="text-[11px] text-gray-500">{item.sub}</span>
                      {item.hasMealLog && (
                        <div>
                          {activeMealLog === item.mealName ? (
                            <SarahMealLogger mealName={item.mealName!} onClose={() => setActiveMealLog(null)} />
                          ) : (
                            <button
                              onClick={() => setActiveMealLog(item.mealName!)}
                              className="mt-1 text-[10px] text-whoop-coral border border-whoop-coral/20 rounded-full px-3 py-0.5 hover:bg-whoop-coral/10"
                            >
                              📸 Log meal
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-whoop-green text-white text-sm font-semibold rounded-xl py-2.5">
                ✓ Let's Go
              </button>
              <button className="flex-1 bg-whoop-inner text-gray-300 text-sm font-semibold rounded-xl py-2.5 hover:bg-whoop-border">
                Adjust Plan →
              </button>
            </div>
          </div>
        )}
      </div>

      <SarahCoachChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
