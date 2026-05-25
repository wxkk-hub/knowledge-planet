import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Heart, Clock, LogOut, ChevronRight } from 'lucide-react'
import { useUserStore } from '../store/userStore'
import { useContentStore } from '../store/contentStore'
import ContentCard from '../components/ContentCard'
import EmptyState from '../components/EmptyState'

type TabType = 'purchased' | 'favorites' | 'history'

const tabConfig: { key: TabType; label: string; icon: string }[] = [
  { key: 'purchased', label: '我的已购', icon: '📚' },
  { key: 'favorites', label: '我的收藏', icon: '⭐' },
  { key: 'history', label: '浏览历史', icon: '🕐' },
]

export default function Mine() {
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, logout } = useUserStore()
  const { contents } = useContentStore()
  const [activeTab, setActiveTab] = useState<TabType>('purchased')

  const filteredContents = contents.filter(c => {
    if (activeTab === 'purchased') return currentUser?.purchasedIds.includes(c.id)
    if (activeTab === 'favorites') return currentUser?.favoriteIds.includes(c.id)
    if (activeTab === 'history') return currentUser?.historyIds.includes(c.id)
    return false
  })

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] max-w-[768px] mx-auto pb-16">
        <div className="bg-white px-4 pt-12 pb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <p className="text-base text-[#333] font-medium mb-2">登录后查看更多内容</p>
          <p className="text-xs text-[#999] mb-6">登录后可查看已购、收藏和浏览历史</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-2.5 bg-[#FF6835] text-white rounded-full text-sm font-medium hover:bg-[#e55a2b] transition-colors"
          >
            点击登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] max-w-[768px] mx-auto pb-16">
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg"}
            alt="avatar"
            className="w-16 h-16 rounded-full bg-gray-200"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#333]">{currentUser.nickName}</h2>
            <p className="text-xs text-[#999] mt-0.5">{currentUser.phone}</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/mine') }}
            className="p-2 text-[#999] hover:text-red-500 transition-colors"
            title="退出登录"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-around mt-5 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-lg font-bold text-[#333]">{currentUser.purchasedIds.length}</p>
            <p className="text-xs text-[#999] mt-0.5">已购</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-[#333]">{currentUser.favoriteIds.length}</p>
            <p className="text-xs text-[#999] mt-0.5">收藏</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-[#333]">{currentUser.historyIds.length}</p>
            <p className="text-xs text-[#999] mt-0.5">浏览</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            {tabConfig.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === tab.key
                    ? 'text-[#FF6835] border-b-2 border-[#FF6835]'
                    : 'text-[#666]'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          <div className="p-3">
            {filteredContents.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredContents.map(content => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="暂无内容"
                description={
                  activeTab === 'purchased' ? '还没有购买过内容' :
                  activeTab === 'favorites' ? '还没有收藏过内容' :
                  '还没有浏览记录'
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
