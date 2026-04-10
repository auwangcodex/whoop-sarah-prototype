interface RingGaugeProps {
  value: number
  color: string
  label: string
  subtitle: string
  isPercent?: boolean
}

export default function RingGauge({ value, color, label, subtitle, isPercent = true }: RingGaugeProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const percentage = isPercent ? value : (value / 21) * 100 // strain max ~21
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#28282F" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-700"
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="18" fontWeight="700" fontFamily="'Bricolage Grotesque', sans-serif">
          {isPercent ? `${value}%` : value.toFixed(1)}
        </text>
      </svg>
      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{label}</span>
      <span className="text-[10px]" style={{ color }}>{subtitle}</span>
    </div>
  )
}
