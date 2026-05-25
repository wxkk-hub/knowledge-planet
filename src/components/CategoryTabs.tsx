import { useCategoryStore } from '../store/categoryStore'

interface Props {
  current: string
  onChange: (category: string) => void
}

export default function CategoryTabs({ current, onChange }: Props) {
  const categories = useCategoryStore((s) => s.categories)

  return (
    <div className="px-4 py-3 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${current === cat ? 'bg-[#333] text-white' : 'bg-white text-[#666] border border-gray-200 hover:border-[#FF6835] hover:text-[#FF6835]'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
