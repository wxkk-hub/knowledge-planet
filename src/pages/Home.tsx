import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useContentStore } from '../store/contentStore'
import BannerCarousel from '../components/BannerCarousel'
import CategoryTabs from '../components/CategoryTabs'
import ContentList from '../components/ContentList'

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(8)
  const { currentCategory, searchKeyword, setCategory, setSearchKeyword, getFilteredContents } = useContentStore()
  const allContents = getFilteredContents()
  const filteredContents = allContents.slice(0, pageSize)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (value: string) => {
    setSearchKeyword(value)
  }

  const handleRefresh = async () => {
    setLoading(true)
    setPageSize(8)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
  }

  const handleLoadMore = () => {
    setPageSize(prev => Math.min(prev + 8, allContents.length))
  }

  return (
    <div className='min-h-screen bg-[#F5F5F5] max-w-[768px] mx-auto pb-16'>
      <div className='sticky top-0 z-40 bg-white border-b border-gray-100'>
        <div className='flex items-center gap-3 px-4 h-14'>
          <h1 className='text-lg font-bold text-[#333] flex-shrink-0'>知识星球</h1>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]' />
            <input
              type='text'
              placeholder='搜索内容、作者...'
              value={searchKeyword}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => navigate('/search')}
              className='w-full h-9 pl-9 pr-3 bg-[#F5F5F5] rounded-full text-sm text-[#333] placeholder:text-[#999] outline-none cursor-text'
            />
          </div>
        </div>
      </div>

      {!searchKeyword && <BannerCarousel />}

      <CategoryTabs current={currentCategory} onChange={setCategory} />

      <ContentList
        contents={filteredContents}
        loading={loading}
        emptyTitle={searchKeyword ? '未找到相关内容' : '该分类下暂无内容'}
        onRefresh={handleRefresh}
        hasMore={pageSize < allContents.length}
        onLoadMore={handleLoadMore}
      />
    </div>
  )
}
