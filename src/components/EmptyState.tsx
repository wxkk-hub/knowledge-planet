import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title?: string
  description?: string
}

export default function EmptyState({
  icon,
  title = '暂无内容',
  description = '请尝试其他分类或关键词'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-[#ccc] mb-4">
        {icon || <SearchX className="w-16 h-16" />}
      </div>
      <p className="text-base font-medium text-[#666] mb-1">{title}</p>
      <p className="text-sm text-[#999]">{description}</p>
    </div>
  )
}