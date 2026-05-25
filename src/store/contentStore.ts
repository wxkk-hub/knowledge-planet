import { create } from 'zustand'
import type { Content } from '../types'
import { mockContents } from '../data/mockData'

const STORAGE_KEY = 'zs_contents'

function loadContents(): Content[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockContents))
    return mockContents
  }
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {}
  return mockContents
}

function saveContents(contents: Content[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contents))
    return true
  } catch (e) {
    console.error('保存到本地存储失败:', e)
    return false
  }
}

type ContentInput = Omit<Content, 'id' | 'readCount' | 'likeCount'> & { id?: string }

interface ContentStore {
  contents: Content[]
  currentCategory: string
  searchKeyword: string
  setCategory: (category: string) => void
  setSearchKeyword: (keyword: string) => void
  getFilteredContents: () => Content[]
  getContentById: (id: string) => Content | undefined
  addContent: (content: ContentInput) => Content | null
  updateContent: (id: string, updates: Partial<Content>) => boolean
  deleteContent: (id: string) => boolean
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export const useContentStore = create<ContentStore>((set, get) => ({
  contents: loadContents(),
  currentCategory: '全部',
  searchKeyword: '',

  setCategory: (category: string) => {
    set({ currentCategory: category })
  },

  setSearchKeyword: (keyword: string) => {
    set({ searchKeyword: keyword })
  },

  getFilteredContents: () => {
    const { contents, currentCategory, searchKeyword } = get()
    let filtered = contents
    if (currentCategory !== '全部') {
      filtered = filtered.filter(c => c.category === currentCategory)
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase()
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(kw) ||
        c.summary.toLowerCase().includes(kw) ||
        c.author.name.toLowerCase().includes(kw)
      )
    }
    return filtered
  },

  getContentById: (id: string) => {
    return get().contents.find(c => c.id === id)
  },

  addContent: (content) => {
    const newContent: Content = {
      ...content,
      id: content.id || generateId(),
      readCount: 0,
      likeCount: 0
    }
    const updated = [newContent, ...get().contents]
    if (!saveContents(updated)) return null
    set({ contents: updated })
    return newContent
  },

  updateContent: (id, updates) => {
    const updated = get().contents.map(c =>
      c.id === id ? { ...c, ...updates } : c
    )
    if (!saveContents(updated)) return false
    set({ contents: updated })
    return true
  },

  deleteContent: (id) => {
    const updated = get().contents.filter(c => c.id !== id)
    if (!saveContents(updated)) return false
    set({ contents: updated })
    return true
  }
}))