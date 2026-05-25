import { create } from 'zustand'

const DEFAULT_CATEGORIES = ['全部', '学习方法', '人工智能', '自我管理', '投资理财', '职场成长']
const STORAGE_KEY = 'zs_categories'

function loadCategories(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return [...DEFAULT_CATEGORIES]
}

function saveToStorage(categories: string[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
    return true
  } catch {
    return false
  }
}

interface CategoryStore {
  categories: string[]
  addCategory: (name: string) => boolean
  removeCategory: (name: string) => boolean
  renameCategory: (oldName: string, newName: string) => boolean
  resetToDefault: () => void
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: loadCategories(),

  addCategory: (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return false
    const current = get().categories
    if (current.includes(trimmed)) return false
    const updated = [...current, trimmed]
    if (!saveToStorage(updated)) return false
    set({ categories: updated })
    return true
  },

  removeCategory: (name: string) => {
    if (name === '全部') return false
    const updated = get().categories.filter((c) => c !== name)
    if (!saveToStorage(updated)) return false
    set({ categories: updated })
    return true
  },

  renameCategory: (oldName: string, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed || oldName === '全部') return false
    const current = get().categories
    if (current.includes(trimmed)) return false
    const updated = current.map((c) => (c === oldName ? trimmed : c))
    if (!saveToStorage(updated)) return false
    set({ categories: updated })
    return true
  },

  resetToDefault: () => {
    saveToStorage(DEFAULT_CATEGORIES)
    set({ categories: [...DEFAULT_CATEGORIES] })
  }
}))