import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Bookmark, MessageCircle, Lock, Eye, Send, Share2 } from 'lucide-react'
import { useContentStore } from '../store/contentStore'
import { useUserStore } from '../store/userStore'
import PayModal from '../components/PayModal'
import { mockComments } from '../data/mockData'
import { useToastStore } from '../store/toastStore'

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getContentById, contents } = useContentStore()
  const { currentUser, isLoggedIn, isPurchased, isFavorited, purchaseContent, toggleFavorite, addHistory } = useUserStore()
  const { addToast } = useToastStore()
  const [showPayModal, setShowPayModal] = useState(false)
  const [liked, setLiked] = useState(false)

  const content = getContentById(id || '')
  const purchased = content ? isPurchased(content.id) : false
  const favorited = content ? isFavorited(content.id) : false
  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState(mockComments.filter(c => c.contentId === id))
  const comments = localComments

  const handlePostComment = () => {
    const text = commentText.trim()
    if (!text || !isLoggedIn) return
    const newComment = {
      id: 'c' + Date.now(),
      contentId: content.id,
      author: currentUser?.nickName || '用户',
      avatar: currentUser?.avatarUrl || '',
      text,
      time: '刚刚',
      likes: 0
    }
    setLocalComments(prev => [...prev, newComment])
    setCommentText('')
    addToast('评论发布成功', 'success')
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: content?.title || '', url }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url)
        addToast('链接已复制', 'success')
      } catch { addToast('复制失败', 'error') }
    }
  }

  useEffect(() => {
    if (content) {
      addHistory(content.id)
    }
  }, [content?.id])

  if (!content) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] max-w-[768px] mx-auto flex items-center justify-center">
        <p className="text-[#999]">内容不存在</p>
      </div>
    )
  }

  const canViewFull = content.isFree || purchased

  const handlePurchase = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: window.location.pathname } })
      return
    }
    setShowPayModal(true)
  }

  const handlePayConfirm = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    purchaseContent(content.id)
    return true
  }

  return (
    <div className="min-h-screen bg-white max-w-[768px] mx-auto pb-16">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft className="w-5 h-5 text-[#333]" />
          </button>
          <h1 className="text-base font-medium text-[#333] truncate flex-1">{content.title}</h1>
        </div>
      </div>

      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-[#333] leading-snug">{content.title}</h1>

        <div className="flex items-center gap-3 mt-4">
          <img
            src={content.author.avatar}
            alt={content.author.name}
            className="w-9 h-9 rounded-full bg-gray-200"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-[#333]">{content.author.name}</p>
            <p className="text-xs text-[#999] mt-0.5">
              {content.publishDate} · {content.readCount}次阅读
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        {canViewFull ? (
          <div
            className="prose prose-sm max-w-none text-[#333] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content || content.previewContent }}
          />
        ) : (
          <div className="relative">
            <div
              className="prose prose-sm max-w-none text-[#333] leading-relaxed line-clamp-6"
              dangerouslySetInnerHTML={{ __html: content.previewContent || content.summary }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />
          </div>
        )}
      </div>

      {!canViewFull && (
        <div className="px-4 mt-4 flex flex-col items-center">
          <div className="flex items-center gap-2 text-[#999] mb-4">
            <Lock className="w-4 h-4" />
            <span className="text-sm">付费内容，解锁后即可查看全文</span>
          </div>
          <div className="bg-[#FFF3ED] rounded-lg px-6 py-4 w-full text-center mb-4">
            <p className="text-2xl font-bold text-[#FF6835]">¥{content.price}</p>
            <button
              className="mt-3 w-full py-3 bg-[#FF6835] text-white rounded-lg font-medium text-base active:bg-[#e55a2b] transition-colors"
              onClick={handlePurchase}
            >
              立即解锁
            </button>
          </div>
        </div>
      )}

      <div className="px-4 mt-6">
        <div className="flex items-center gap-6 py-4 border-t border-gray-100">
          <button
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              liked ? 'text-red-500' : 'text-[#999]'
            }`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
            <span>{content.likeCount + (liked ? 1 : 0)}</span>
          </button>
          <button
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              favorited ? 'text-[#FF6835]' : 'text-[#999]'
            }`}
            onClick={() => toggleFavorite(content.id)}
          >
            <Bookmark className={`w-5 h-5 ${favorited ? 'fill-[#FF6835]' : ''}`} />
            <span>{favorited ? '已收藏' : '收藏'}</span>
          </button>
          <div className="flex items-center gap-1.5 text-sm text-[#999]">
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length}</span>
          </div>
          <button
            onClick={handleShare}
            className='flex items-center gap-1.5 text-sm text-[#999] hover:text-[#333] transition-colors'
          >
            <Share2 className='w-5 h-5' />
            <span>分享</span>
          </button>
        </div>
      </div>

      {isLoggedIn && (
        <div className="px-4 mt-6 border-t border-gray-100 pt-4">
          <div className="flex gap-3">
            <img
              src={currentUser?.avatarUrl || ''}
              alt="avatar"
              className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePostComment()}
                placeholder="写下你的评论..."
                className="flex-1 h-10 px-3 bg-[#F5F5F5] rounded-xl text-sm text-[#333] placeholder:text-[#999] outline-none"
              />
              <button
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className="flex-shrink-0 w-10 h-10 bg-[#333] text-white rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 mt-2 pb-8">
        <h3 className="text-base font-semibold text-[#333] mb-4">
          评论 ({comments.length})
        </h3>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#333]">{comment.author}</span>
                    <span className="text-xs text-[#999]">{comment.time}</span>
                  </div>
                  <p className="text-sm text-[#666] mt-1 leading-relaxed">{comment.text}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-[#999]">
                    <Eye className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#999] text-center py-8">暂无评论</p>
        )}
      </div>

      <PayModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        price={content.price}
        title={content.title}
        onConfirm={handlePayConfirm}
      />
    </div>
  )
}




