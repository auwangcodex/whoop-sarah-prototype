import weddingBanner from '../../../assets/wedding-banner.jpg'

export default function SarahGoalSection() {
  const progress = 81
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="mx-4 mb-4 bg-whoop-card rounded-2xl overflow-hidden">
      {/* Banner */}
      <div className="relative h-[120px]">
        <img src={weddingBanner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-whoop-card" />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 -mt-4 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="font-display font-bold text-xl text-white mb-1">
              Feel Amazing on My Wedding Day
            </h2>
            <p className="text-xs text-gray-400">
              Week 6 of 12 · 6 lbs lost · 9 lbs to go
            </p>
          </div>
          {/* Progress ring */}
          <svg viewBox="0 0 70 70" className="w-16 h-16 flex-shrink-0">
            <circle cx="35" cy="35" r={radius} fill="none" stroke="#28282F" strokeWidth="4" />
            <circle cx="35" cy="35" r={radius}
              fill="none" stroke="#00D26A" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              transform="rotate(-90 35 35)"
            />
            <text x="35" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="700"
              fontFamily="'Bricolage Grotesque', sans-serif">{progress}%</text>
            <text x="35" y="44" textAnchor="middle" fill="#9ca3af" fontSize="7"
              fontFamily="'Nunito Sans', sans-serif">ON TRACK</text>
          </svg>
        </div>

        {/* Weight bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>176 lbs</span>
            <span>167 lbs</span>
          </div>
          <div className="h-1.5 bg-whoop-border rounded-full overflow-hidden">
            <div className="h-full bg-whoop-green rounded-full" style={{ width: '67%' }} />
          </div>
        </div>

        {/* Stat chips */}
        <div className="flex gap-2 mt-3">
          <div className="flex-1 bg-whoop-inner rounded-lg px-3 py-2 text-center">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider">This Week</div>
            <div className="text-sm font-bold text-whoop-green">-1.2 lbs</div>
          </div>
          <div className="flex-1 bg-whoop-inner rounded-lg px-3 py-2 text-center">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider">Wedding</div>
            <div className="text-sm font-bold text-white">Aug 15</div>
          </div>
          <div className="flex-1 bg-whoop-inner rounded-lg px-3 py-2 text-center">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider">Days</div>
            <div className="text-sm font-bold text-white">57</div>
          </div>
        </div>
      </div>
    </div>
  )
}
