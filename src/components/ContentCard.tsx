import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, Heart } from 'lucide-react'
import type { Content } from '../types'

interface ContentCardProps {
  content: Content
}

export default function ContentCard({ content }: ContentCardProps) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/detail/${content.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-3xl text-[#ccc]">📖</span>
          </div>
        ) : (
          <img
            src={content.coverUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        {!content.isFree && (
          <div className="absolute top-2 right-2 bg-[#FF6835] text-white text-xs font-medium px-2 py-0.5 rounded-full">
            ¥{content.price}
          </div>
        )}
        {content.isFree && (
          <div className="absolute top-2 right-2 bg-[#4CAF50] text-white text-xs font-medium px-2 py-0.5 rounded-full">
            免费
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-[#333] line-clamp-2 leading-snug min-h-[2.5em]">
          {content.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={content.author.avatar}
            alt={content.author.name}
            className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0"
          />
          <span className="text-xs text-[#999] truncate">{content.author.name}</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-[#999]">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {content.readCount}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {content.likeCount}
          </span>
        </div>
      </div>
    </div>
  )
}
