import { useState } from 'react'
import { useContentStore } from '../store/contentStore'
import { useCategoryStore } from '../store/categoryStore'
import ContentList from '../components/ContentList'

export default function Category() {
  const { currentCategory, setCategory, getFilteredContents } = useContentStore()
  const categories = useCategoryStore((s) => s.categories)
  const allFiltered = getFilteredContents()
  const [pageSize, setPageSize] = useState(6)

  const handleRefresh = async () => {
    setPageSize(6)
  }

  const handleLoadMore = () => {
    setPageSize((prev) => prev + 6)
  }

  const displayContents = allFiltered.slice(0, pageSize)
  const hasMore = displayContents.length < allFiltered.length

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-14">
          <h1 className="text-lg font-bold text-[#333]">分类浏览</h1>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${currentCategory === cat ? 'bg-[#333] text-white' : 'bg-white text-[#666] border border-gray-200'}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ContentList
        contents={displayContents}
        onRefresh={handleRefresh}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  )
}
