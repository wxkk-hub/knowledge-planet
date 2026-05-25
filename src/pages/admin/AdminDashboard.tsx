import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'
import { useContentStore } from '../../store/contentStore'
import { useToastStore } from '../../store/toastStore'
import { cn } from '../../lib/utils'
import { useCategoryStore } from '../../store/categoryStore'
import type { Content, Author } from '../../types'
import { Plus, Edit3, Trash2, LogOut, ArrowLeft, Search, ExternalLink, X, Image as ImageIcon } from 'lucide-react'

export default function AdminDashboard() {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login', { replace: true })
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  const isFormPage = location.pathname === '/admin/create' || location.pathname.startsWith('/admin/edit/')

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 h-14 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {isFormPage && (
              <Link
                to='/admin'
                className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <ArrowLeft className='w-5 h-5 text-[#666]' />
              </Link>
            )}
            <h1 className='text-base font-bold text-[#333]'>内容管理</h1>
            {!isFormPage && (
              <span className='text-xs text-[#999] bg-gray-100 px-2 py-0.5 rounded-full'>本地管理后台</span>
            )}
          </div>
          <button
            onClick={() => { useAdminStore.getState().logout(); navigate('/admin/login') }}
            className='flex items-center gap-1.5 text-sm text-[#666] hover:text-red-500 transition-colors px-3 py-1.5 hover:bg-red-50 rounded-lg'
          >
            <LogOut className='w-4 h-4' />
            退出管理
          </button>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <Routes>
          <Route index element={<ContentListView />} />
          <Route path='create' element={<ContentFormView />} />
          <Route path='edit/:id' element={<ContentFormView />} />
        </Routes>
      </main>
    </div>
  )
}

function ContentListView() {
  const contents = useContentStore((s) => s.contents)
  const deleteContent = useContentStore((s) => s.deleteContent)
  const addToast = useToastStore((s) => s.addToast)
  const navigate = useNavigate()
  const categories = useCategoryStore((s) => s.categories)
  const addCat = useCategoryStore((s) => s.addCategory)
  const removeCat = useCategoryStore((s) => s.removeCategory)
  const renameCat = useCategoryStore((s) => s.renameCategory)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('全部')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showCatMgr, setShowCatMgr] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [editingCat, setEditingCat] = useState<string | null>(null)
  const [editCatValue, setEditCatValue] = useState('')

  const filtered = contents.filter((c) => {
    if (categoryFilter !== '全部' && c.category !== categoryFilter) return false
    if (search.trim()) {
      const kw = search.toLowerCase()
      return c.title.toLowerCase().includes(kw) || c.summary.toLowerCase().includes(kw) || c.author.name.toLowerCase().includes(kw)
    }
    return true
  })

  const deleteTitle = deleteId ? (contents.find(c => c.id === deleteId)?.title || '') : ''

  const handleDelete = () => {
    if (!deleteId) return
    const ok = deleteContent(deleteId)
    if (!ok) {
      addToast('删除失败，请重试', 'error')
      return
    }
    addToast('删除成功', 'success')
    setDeleteId(null)
  }

  return (
    <>
      <div className='flex items-center justify-between mb-4 flex-wrap gap-3'>
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <div className='relative flex-1 max-w-sm'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='搜索内容标题、摘要、作者...'
              className='w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors'
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors bg-white'
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-2'>
        <button
          onClick={() => setShowCatMgr(true)}
          className='flex items-center gap-1.5 px-4 py-2 bg-white text-[#333] border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex-shrink-0'
        >
          分类管理
        </button>
        <button
          onClick={() => navigate('/admin/create')}
          className='flex items-center gap-1.5 px-4 py-2 bg-[#333] text-white rounded-lg text-sm font-medium hover:bg-[#555] transition-colors flex-shrink-0'
        >
          <Plus className='w-4 h-4' />
          新增内容
        </button>
        </div>
      </div>

      <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='text-left px-4 py-3 font-medium text-[#666] w-14'></th>
                <th className='text-left px-4 py-3 font-medium text-[#666]'>标题</th>
                <th className='text-left px-4 py-3 font-medium text-[#666] w-20'>分类</th>
                <th className='text-right px-4 py-3 font-medium text-[#666] w-16'>价格</th>
                <th className='text-right px-4 py-3 font-medium text-[#666] w-16'>阅读</th>
                <th className='text-left px-4 py-3 font-medium text-[#666] w-24'>发布时间</th>
                <th className='text-center px-4 py-3 font-medium text-[#666] w-24'>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((content) => (
                <tr key={content.id} className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors'>
                  <td className='px-4 py-3'>
                    <div className='w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0'>
                      {content.coverUrl ? (
                        <img src={content.coverUrl} alt='' className='w-full h-full object-cover'
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                          <ImageIcon className='w-5 h-5 text-[#ccc]' />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <p className='font-medium text-[#333] line-clamp-1'>{content.title}</p>
                    <p className='text-xs text-[#999] mt-0.5 line-clamp-1'>{content.author.name}</p>
                  </td>
                  <td className='px-4 py-3'>
                    <span className='text-xs text-[#666] bg-gray-100 px-2 py-0.5 rounded-full'>{content.category}</span>
                  </td>
                  <td className='px-4 py-3 text-right'>
                    <span className={cn('text-sm font-medium', content.isFree ? 'text-green-600' : 'text-[#FF6835]')}>
                      {content.isFree ? '免费' : '\u00a5' + content.price.toFixed(1)}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-right text-[#666] text-xs'>{content.readCount}</td>
                  <td className='px-4 py-3 text-[#666] text-xs'>{content.publishDate}</td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-1.5'>
                      <button
                        onClick={() => navigate('/admin/edit/' + content.id)}
                        className='p-1.5 hover:bg-blue-50 rounded-lg transition-colors group'
                        title='编辑'
                      >
                        <Edit3 className='w-4 h-4 text-[#999] group-hover:text-blue-500' />
                      </button>
                      <button
                        onClick={() => setDeleteId(content.id)}
                        className='p-1.5 hover:bg-red-50 rounded-lg transition-colors group'
                        title='删除'
                      >
                        <Trash2 className='w-4 h-4 text-[#999] group-hover:text-red-500' />
                      </button>
                      <a
                        href={'/detail/' + content.id}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-1.5 hover:bg-green-50 rounded-lg transition-colors group'
                        title='预览'
                      >
                        <ExternalLink className='w-4 h-4 text-[#999] group-hover:text-green-500' />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className='px-4 py-12 text-center text-[#999] text-sm'>暂无匹配内容</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCatMgr && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={() => { setShowCatMgr(false); setEditingCat(null); setNewCatName(''); setEditCatValue('') }}>
          <div className='bg-white rounded-2xl w-[90%] max-w-md p-6' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-lg font-semibold text-[#333]'>分类管理</h3>
              <button onClick={() => { setShowCatMgr(false); setEditingCat(null); setNewCatName(''); setEditCatValue('') }}><X className='w-5 h-5 text-[#999]' /></button>
            </div>

            <div className='flex gap-2 mb-5'>
              <input
                type='text'
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder='输入新分类名称'
                className='flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const ok = addCat(newCatName)
                    if (ok) { setNewCatName('') }
                    else { alert('添加失败：名称重复或无效') }
                  }
                }}
              />
              <button
                onClick={() => {
                  const ok = addCat(newCatName)
                  if (ok) { setNewCatName('') }
                  else { alert('添加失败：名称重复或无效') }
                }}
                className='px-4 py-2 bg-[#333] text-white rounded-lg text-sm font-medium hover:bg-[#555] transition-colors flex-shrink-0'
              >添加</button>
            </div>

            <div className='space-y-2 max-h-64 overflow-y-auto'>
              {categories.filter(c => c !== '全部').map((cat) => (
                <div key={cat} className='flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg group'>
                  {editingCat === cat ? (
                    <div className='flex items-center gap-2 flex-1'>
                      <input
                        type='text'
                        value={editCatValue}
                        onChange={(e) => setEditCatValue(e.target.value)}
                        className='flex-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-[#333]'
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const ok = renameCat(cat, editCatValue)
                            if (ok) { setEditingCat(null) }
                            else { alert('重命名失败：名称重复或无效') }
                          }
                          if (e.key === 'Escape') { setEditingCat(null) }
                        }}
                      />
                      <button onClick={() => { const ok = renameCat(cat, editCatValue); if (ok) setEditingCat(null); else alert('重命名失败：名称重复或无效') }}
                        className='text-xs text-green-600 hover:text-green-700 px-1.5 py-0.5'
                      >保存</button>
                      <button onClick={() => setEditingCat(null)}
                        className='text-xs text-[#999] hover:text-[#666] px-1.5 py-0.5'
                      >取消</button>
                    </div>
                  ) : (
                    <>
                      <span className='text-sm text-[#333]'>{cat}</span>
                      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button onClick={() => { setEditingCat(cat); setEditCatValue(cat) }}
                          className='text-xs text-blue-500 hover:text-blue-600 px-1.5 py-0.5'
                        >重命名</button>
                        <button onClick={() => { const ok = removeCat(cat); if (!ok) alert('删除失败') }}
                          className='text-xs text-red-500 hover:text-red-600 px-1.5 py-0.5'
                        >删除</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {categories.filter(c => c !== '全部').length === 0 && (
                <p className='text-center text-sm text-[#999] py-4'>暂无分类，请在上方添加</p>
              )}
            </div>

            <div className='mt-4 pt-4 border-t border-gray-100 flex items-center justify-between'>
              <span className='text-xs text-[#999]'>共 {categories.length - 1} 个分类</span>
              <button
                onClick={() => { setShowCatMgr(false); setEditingCat(null); setNewCatName(''); setEditCatValue('') }}
                className='px-4 py-2 bg-gray-100 text-[#333] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
              >关闭</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={() => setDeleteId(null)}>
          <div className='bg-white rounded-2xl w-[85%] max-w-sm p-6' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-[#333]'>确认删除</h3>
              <button onClick={() => setDeleteId(null)}><X className='w-5 h-5 text-[#999]' /></button>
            </div>
            <p className='text-sm text-[#666] mb-6'>确定要删除该内容吗？此操作不可撤销。</p>
            <div className='flex gap-3'>
              <button
                onClick={() => setDeleteId(null)}
                className='flex-1 py-2.5 bg-gray-100 text-[#333] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
              >取消</button>
              <button
                onClick={handleDelete}
                className='flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors'
              >确认删除</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ContentFormView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const contents = useContentStore((s) => s.contents)
  const addContent = useContentStore((s) => s.addContent)
  const updateContent = useContentStore((s) => s.updateContent)
  const addToast = useToastStore((s) => s.addToast)
  const allCategories = useCategoryStore((s) => s.categories)
  const isEdit = Boolean(id)
  const existing = id ? contents.find((c) => c.id === id) : null

  const [title, setTitle] = useState(existing?.title || '')
  const [summary, setSummary] = useState(existing?.summary || '')
  const [category, setCategory] = useState(existing?.category || '学习方法')
  const [authorName, setAuthorName] = useState(existing?.author.name || '')
  const [authorAvatar, setAuthorAvatar] = useState(existing?.author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default')
  const [price, setPrice] = useState(existing ? String(existing.price) : '0')
  const [isFree, setIsFree] = useState(existing?.isFree ?? false)
  const [body, setBody] = useState(existing?.content || '')
  const [previewBody, setPreviewBody] = useState(existing?.previewContent || '')
  const [coverUrl, setCoverUrl] = useState(existing?.coverUrl || '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isEdit && existing) {
      setTitle(existing.title)
      setSummary(existing.summary)
      setCategory(existing.category)
      setAuthorName(existing.author.name)
      setAuthorAvatar(existing.author.avatar)
      setPrice(String(existing.price))
      setIsFree(existing.isFree)
      setBody(existing.content)
      setPreviewBody(existing.previewContent)
      setCoverUrl(existing.coverUrl)
    }
  }, [isEdit, existing])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      addToast('请选择图片文件（jpg/png/webp）', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCoverUrl(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!title.trim()) errs.title = '请输入标题'
    if (!authorName.trim()) errs.authorName = '请输入作者名'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const author: Author = { name: authorName.trim(), avatar: authorAvatar.trim() || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(authorName.trim()) }
    const now = new Date().toISOString().slice(0, 10)

    if (isEdit && id) {
      const ok = updateContent(id, {
        title: title.trim(),
        summary: summary.trim(),
        category,
        author,
        price: isFree ? 0 : Math.max(0, parseFloat(price) || 0),
        isFree,
        content: body,
        previewContent: previewBody,
        coverUrl,
        publishDate: existing?.publishDate || now
      })
      if (!ok) {
        addToast('保存失败，请检查图片大小是否超过限制', 'error')
        return
      }
      addToast('保存成功', 'success')
      navigate('/admin')
    } else {
      const result = addContent({
        title: title.trim(),
        summary: summary.trim(),
        coverUrl,
        category,
        author,
        price: isFree ? 0 : Math.max(0, parseFloat(price) || 0),
        content: body,
        previewContent: previewBody,
        isFree,
        publishDate: now
      })
      if (!result) {
        addToast('创建失败，请检查图片大小是否超过限制', 'error')
        return
      }
      addToast('创建成功', 'success')
      navigate('/admin')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h2 className='text-base font-semibold text-[#333] mb-6'>{isEdit ? '编辑内容' : '新增内容'}</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>标题 *</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                className={(errors.title ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#333]') + ' w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors'}
                placeholder='输入内容标题'
              />
              {errors.title && <p className='text-xs text-red-500 mt-1'>{errors.title}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>摘要</label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)}
                className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors resize-none'
                rows={3} placeholder='内容摘要'
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-sm font-medium text-[#333] mb-1.5'>分类</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors bg-white'
                >
                  {allCategories.filter((c) => c !== '全部').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-[#333] mb-1.5'>作者名 *</label>
                <input type='text' value={authorName} onChange={(e) => setAuthorName(e.target.value)}
                  className={(errors.authorName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#333]') + ' w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors'}
                  placeholder='作者名称'
                />
                {errors.authorName && <p className='text-xs text-red-500 mt-1'>{errors.authorName}</p>}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>作者头像 URL</label>
              <input type='text' value={authorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)}
                className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors'
                placeholder='https://api.dicebear.com/7.x/avataaars/svg?seed=...'
              />
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-[#333] mb-1.5'>价格</label>
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}
                  disabled={isFree}
                  className={(isFree ? 'bg-gray-50 text-[#999]' : 'border-gray-200 focus:border-[#333]') + ' w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors'}
                  min='0' step='0.1'
                />
              </div>
              <div className='flex items-center gap-2 pt-6'>
                <input type='checkbox' id='isFree' checked={isFree}
                  onChange={(e) => { setIsFree(e.target.checked); if (e.target.checked) setPrice('0') }}
                  className='w-4 h-4 rounded border-gray-300 text-[#333] focus:ring-[#333]'
                />
                <label htmlFor='isFree' className='text-sm text-[#666] cursor-pointer'>免费</label>
              </div>
            </div>
          </div>

          <div className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>封面图片</label>
              <div className='relative'>
                {coverUrl ? (
                  <div className='relative w-full h-40 rounded-lg overflow-hidden bg-gray-100'>
                    <img src={coverUrl} alt='封面' className='w-full h-full object-cover'
                      onError={(e) => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <button type='button' onClick={() => setCoverUrl('')}
                      className='absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
                    ><X className='w-3.5 h-3.5 text-white' /></button>
                  </div>
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#333] transition-colors bg-gray-50'>
                    <ImageIcon className='w-8 h-8 text-[#ccc] mb-2' />
                    <span className='text-sm text-[#999]'>点击上传封面图片</span>
                    <span className='text-xs text-[#ccc] mt-1'>支持 jpg / png / webp</span>
                    <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
                  </label>
                )}
              </div>
              {coverUrl && coverUrl.startsWith('data:') && (
                <p className='text-xs text-[#999] mt-1'>已使用本地图片（base64）</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>完整内容（HTML）</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)}
                className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors resize-none font-mono'
                rows={6} placeholder='支持 HTML 标签'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-[#333] mb-1.5'>预览内容（用于列表展示）</label>
              <textarea value={previewBody} onChange={(e) => setPreviewBody(e.target.value)}
                className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors resize-none'
                rows={4} placeholder='内容预览文本'
              />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100'>
          <button type='button' onClick={() => navigate('/admin')}
            className='px-5 py-2.5 bg-gray-100 text-[#333] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
          >取消</button>
          <button type='submit'
            className='px-5 py-2.5 bg-[#333] text-white rounded-lg text-sm font-medium hover:bg-[#555] transition-colors'
          >{isEdit ? '保存修改' : '创建内容'}</button>
        </div>
      </div>
    </form>
  )
}