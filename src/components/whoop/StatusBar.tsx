import { Signal, Wifi, Battery } from 'lucide-react'

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-white">
      <span className="font-display font-bold text-[15px]">6:45</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={14} />
      </div>
    </div>
  )
}
