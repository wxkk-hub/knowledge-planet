import { useState, useRef, useCallback, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import type { Content } from '../types'
import ContentCard from './ContentCard'
import Skeleton from './Skeleton'
import EmptyState from './EmptyState'

interface Props {
  contents: Content[]
  loading?: boolean
  emptyTitle?: string
  onRefresh?: () => Promise<void>
  hasMore?: boolean
  onLoadMore?: () => void
}

export default function ContentList({ contents, loading, emptyTitle, onRefresh, hasMore, onLoadMore }: Props) {
  const [refreshing, setRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const startY = useRef(0)
  const listRef = useRef<HTMLDivElement>(null)

  // Pull-to-refresh touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0 && startY.current > 0) {
      const diff = e.touches[0].clientY - startY.current
      if (diff > 0) {
        setPullDistance(Math.min(diff * 0.5, 80))
      }
    }
  }, [])

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 50 && onRefresh) {
      setRefreshing(true)
      setPullDistance(60)
      await onRefresh()
      setRefreshing(false)
    }
    setPullDistance(0)
    startY.current = 0
  }, [pullDistance, onRefresh])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loadingMore || !onLoadMore) return
      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight
      if (scrollBottom >= docHeight - 300) {
        setLoadingMore(true)
        setTimeout(() => {
          onLoadMore()
          setLoadingMore(false)
        }, 500)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, loadingMore, onLoadMore])

  if (loading) {
    return (
      <div className="px-4 mt-4">
        <Skeleton type="card" count={6} />
      </div>
    )
  }

  if (contents.length === 0) {
    return (
      <div className="px-4 mt-4">
        <EmptyState title={emptyTitle || '暂无内容'} />
      </div>
    )
  }

  return (
    <div
      ref={listRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {refreshing && (
        <div className="flex items-center justify-center py-4 text-sm text-[#FF6835]">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          正在刷新...
        </div>
      )}
      {pullDistance > 0 && !refreshing && (
        <div
          className="flex items-center justify-center text-sm text-[#999] transition-all"
          style={{ height: pullDistance }}
        >
          <RefreshCw className={`w-4 h-4 mr-2 transition-transform ${pullDistance > 50 ? 'rotate-180' : ''}`} />
          {pullDistance > 50 ? '释放刷新' : '下拉刷新'}
        </div>
      )}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {contents.map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
        {loadingMore && (
          <div className="flex items-center justify-center py-4 text-sm text-[#999]">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            加载更多...
          </div>
        )}
        {!hasMore && contents.length > 6 && (
          <p className="text-center text-xs text-[#ccc] py-4">— 已加载全部内容 —</p>
        )}
      </div>
    </div>
  )
}
