import { ChevronLeft, ChevronRight, User, Smartphone } from 'lucide-react'

export default function TopNav() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* Left: Avatar + streak */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-whoop-green flex items-center justify-center bg-whoop-inner">
          <User size={14} className="text-gray-400" />
        </div>
        <span className="text-sm font-semibold">🔥 8</span>
      </div>

      {/* Center: TODAY pill */}
      <div className="flex items-center gap-1 bg-whoop-inner rounded-full px-4 py-1.5">
        <ChevronLeft size={14} className="text-gray-500" />
        <span className="text-xs font-bold tracking-wider text-white">TODAY</span>
        <ChevronRight size={14} className="text-gray-500" />
      </div>

      {/* Right: Battery + device */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-whoop-green">82%</span>
        <div className="relative">
          <Smartphone size={16} className="text-gray-400" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-whoop-green rounded-full" />
        </div>
      </div>
    </div>
  )
}
