import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Grid3x3, User } from 'lucide-react'

const tabs = [
  { path: '/', label: '首页', icon: Home },
  { path: '/category', label: '分类', icon: Grid3x3 },
  { path: '/mine', label: '我的', icon: User },
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname.startsWith('/detail') || location.pathname === '/login') {
    return null
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] bg-white border-t border-gray-100 z-50 pb-safe">
      <div className="flex items-center h-14">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                isActive ? 'text-[#333]' : 'text-[#999]'
              }`}
              onClick={() => navigate(tab.path)}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
