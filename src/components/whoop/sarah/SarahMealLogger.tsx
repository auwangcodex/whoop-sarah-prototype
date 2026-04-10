import { useState, useEffect } from 'react'
import { Camera, Search } from 'lucide-react'
import pamelaImg from '../../../assets/pamela.png'

interface Props {
  mealName: string
  onClose: () => void
}

const macros: Record<string, { cals: number; protein: number; carbs: number; fat: number; reaction: string }> = {
  Lunch: { cals: 520, protein: 35, carbs: 48, fat: 18, reaction: "Great balance of protein and carbs! 💪" },
  Dinner: { cals: 480, protein: 42, carbs: 32, fat: 16, reaction: "Clean eating! Perfect for recovery tonight. 🌙" },
}

export default function SarahMealLogger({ mealName, onClose }: Props) {
  const [stage, setStage] = useState<1 | 2 | 3>(1)
  const data = macros[mealName] ?? macros.Lunch

  useEffect(() => {
    if (stage === 2) {
      const t = setTimeout(() => setStage(3), 3000)
      return () => clearTimeout(t)
    }
  }, [stage])

  if (stage === 1) {
    return (
      <div className="mt-2 animate-fade-in">
        <button
          onClick={() => setStage(2)}
          className="w-full border-2 border-dashed border-whoop-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-whoop-coral/40 transition-colors"
        >
          <Camera size={28} className="text-gray-500" />
          <span className="text-xs text-gray-400">Tap to snap a photo of your meal</span>
        </button>
      </div>
    )
  }

  if (stage === 2) {
    return (
      <div className="mt-2 animate-fade-in flex flex-col items-center py-6 gap-3">
        <Search size={32} className="text-whoop-coral animate-pulse-scan" />
        <span className="text-sm text-gray-400">Analyzing your meal...</span>
      </div>
    )
  }

  return (
    <div className="mt-2 animate-fade-in bg-whoop-inner rounded-xl p-3">
      <div className="text-sm font-semibold text-white mb-2">{mealName} Logged</div>
      <div className="flex gap-2 mb-3">
        {[
          { label: 'Cal', value: data.cals, color: 'text-whoop-coral' },
          { label: 'Protein', value: `${data.protein}g`, color: 'text-whoop-green' },
          { label: 'Carbs', value: `${data.carbs}g`, color: 'text-whoop-blue' },
          { label: 'Fat', value: `${data.fat}g`, color: 'text-whoop-yellow' },
        ].map(m => (
          <div key={m.label} className="flex-1 bg-whoop-card rounded-lg px-2 py-1.5 text-center">
            <div className="text-[9px] text-gray-500 uppercase">{m.label}</div>
            <div className={`text-xs font-bold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <img src={pamelaImg} alt="" className="w-5 h-5 rounded-md" />
        <span className="text-[11px] text-gray-400 italic">{data.reaction}</span>
      </div>
      <button onClick={onClose} className="mt-2 text-[10px] text-gray-500 hover:text-gray-300">Dismiss</button>
    </div>
  )
}
