import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, ArrowLeft, Clock, TrendingUp } from 'lucide-react'
import { useContentStore } from '../store/contentStore'
import ContentCard from '../components/ContentCard'
import EmptyState from '../components/EmptyState'
import Skeleton from '../components/Skeleton'

const searchHistoryKey = 'zs_search_history'

function loadHistory(): string[] {
  try {
    const d = localStorage.getItem(searchHistoryKey)
    return d ? JSON.parse(d) : []
  } catch { return [] }
}

function saveHistory(keywords: string[]) {
  localStorage.setItem(searchHistoryKey, JSON.stringify(keywords.slice(0, 10)))
}

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(true)
  const [showHistory, setShowHistory] = useState(true)
  const [history, setHistory] = useState<string[]>(loadHistory())
  const { setSearchKeyword, getFilteredContents } = useContentStore()
  const results = query ? getFilteredContents() : []

  useEffect(() => {
    if (initialQuery) {
      setSearchKeyword(initialQuery)
      setShowHistory(false)
    }
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const doSearch = (keyword: string) => {
    const q = keyword.trim()
    if (!q) return
    setQuery(q)
    setSearchKeyword(q)
    setShowHistory(false)
    const newHistory = [q, ...history.filter(h => h !== q)].slice(0, 10)
    setHistory(newHistory)
    saveHistory(newHistory)
    navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(searchHistoryKey)
  }

  const trendingTags = ['学习方法', '人工智能', '自我管理', 'Python', 'ChatGPT', '时间管理']

  return (
    <div className="min-h-screen bg-white max-w-[768px] mx-auto">
      <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-[#333]" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
          <input
            type="text"
            placeholder="搜索内容、作者..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch(query)}
            className="w-full h-10 pl-9 pr-3 bg-[#F5F5F5] rounded-full text-sm text-[#333] placeholder:text-[#999] outline-none"
            autoFocus
          />
        </div>
        <button onClick={() => doSearch(query)} className="text-sm text-[#FF6835] font-medium flex-shrink-0">
          搜索
        </button>
      </div>

      {showHistory && !query ? (
        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#333] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                搜索历史
              </h3>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-xs text-[#999]">清除</button>
              )}
            </div>
            {history.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => doSearch(h)}
                    className="px-3 py-1.5 bg-[#F5F5F5] rounded-full text-xs text-[#666] hover:bg-gray-200 transition-colors"
                  >
                    {h}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#999]">暂无搜索历史</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#333] flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-4 h-4" />
              热门搜索
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => doSearch(tag)}
                  className="px-3 py-1.5 bg-orange-50 text-[#FF6835] rounded-full text-xs font-medium hover:bg-orange-100 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {loading ? (
            <Skeleton type="card" count={4} />
          ) : results.length > 0 ? (
            <div>
              <p className="text-xs text-[#999] mb-3">找到 {results.length} 个结果</p>
              <div className="grid grid-cols-2 gap-3">
                {results.map(content => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="未找到相关内容" description={`未找到"${query}"相关的内容，请尝试其他关键词`} />
          )}
        </div>
      )}
    </div>
  )
}
