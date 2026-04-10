import { CheckCircle, AlertTriangle } from 'lucide-react'
import RingGauge from '../RingGauge'

export default function SarahStatusSection() {
  return (
    <div className="mx-4 mb-4">
      <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
        Today's Status
      </h3>

      {/* Ring gauges */}
      <div className="flex justify-around mb-3">
        <RingGauge value={68} color="#8BA4C4" label="Sleep" subtitle="Hunger hormone control" />
        <RingGauge value={52} color="#F5C842" label="Recovery" subtitle="Stress eating risk" />
        <RingGauge value={8.4} color="#3DAEF5" label="Strain" subtitle="Target: 10-12" isPercent={false} />
      </div>

      {/* Health + Stress cards */}
      <div className="flex gap-3">
        <div className="flex-1 bg-whoop-card rounded-xl p-3 flex items-center gap-2">
          <CheckCircle size={18} className="text-whoop-green" />
          <div>
            <div className="text-xs font-semibold text-white">Health Monitor</div>
            <div className="text-[10px] text-gray-400">All in range</div>
          </div>
        </div>
        <div className="flex-1 bg-whoop-card rounded-xl p-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-whoop-yellow" />
          <div>
            <div className="text-xs font-semibold text-white">Stress</div>
            <div className="text-[10px] text-whoop-yellow">2.1 · Elevated</div>
          </div>
        </div>
      </div>
    </div>
  )
}
