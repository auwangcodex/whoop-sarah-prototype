import { Home, Heart, Users, MoreHorizontal } from 'lucide-react'

const items = [
  { icon: Home, label: 'Home', active: true },
  { icon: Heart, label: 'Health', active: false },
  { icon: Users, label: 'Community', active: false },
  { icon: MoreHorizontal, label: 'More', active: false },
]

export default function BottomNav() {
  return (
    <div className="shrink-0 w-full bg-whoop-nav border-t border-whoop-border flex items-center justify-around py-2 z-40">
      {items.map((item) => (
        <button key={item.label} className="flex flex-col items-center gap-0.5 px-3 py-1">
          <item.icon size={20} className={item.active ? 'text-white' : 'text-gray-500'} />
          <span className={`text-[10px] ${item.active ? 'text-white' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </button>
      ))}
      <button className="w-9 h-9 rounded-full border-2 border-whoop-blue flex items-center justify-center">
        <span className="text-white font-bold text-sm">W</span>
      </button>
    </div>
  )
}
