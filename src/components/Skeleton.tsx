interface SkeletonProps {
  type?: 'card' | 'detail' | 'list'
  count?: number
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="flex items-center gap-2 mt-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  )
}

function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-200 rounded-full" />
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  )
}

export default function Skeleton({ type = 'card', count = 6 }: SkeletonProps) {
  if (type === 'detail') {
    return <SkeletonDetail />
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
