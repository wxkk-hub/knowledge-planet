import { create } from 'zustand'
import type { User } from '../types'

const STORAGE_KEY_USERS = 'zs_users'
const STORAGE_KEY_CURRENT = 'zs_current_user'

function loadUsers(): Record<string, User> {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USERS)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, User>) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))
}

function loadCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CURRENT)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY_CURRENT)
  }
}

interface UserStore {
  currentUser: User | null
  isLoggedIn: boolean
  login: (phone: string, code: string) => { success: boolean; message: string }
  logout: () => void
  purchaseContent: (contentId: string) => void
  toggleFavorite: (contentId: string) => void
  addHistory: (contentId: string) => void
  isPurchased: (contentId: string) => boolean
  isFavorited: (contentId: string) => boolean
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: loadCurrentUser(),
  isLoggedIn: loadCurrentUser() !== null,

  login: (phone: string, code: string) => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { success: false, message: '手机号格式不正确' }
    }
    if (code !== '123456') {
      return { success: false, message: '验证码错误' }
    }
    const users = loadUsers()
    if (!users[phone]) {
      users[phone] = {
        phone,
        nickName: `用户${phone.slice(-4)}`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
        purchasedIds: [],
        favoriteIds: [],
        historyIds: []
      }
    }
    saveUsers(users)
    saveCurrentUser(users[phone])
    set({ currentUser: users[phone], isLoggedIn: true })
    return { success: true, message: '' }
  },

  logout: () => {
    saveCurrentUser(null)
    set({ currentUser: null, isLoggedIn: false })
  },

  purchaseContent: (contentId: string) => {
    const { currentUser } = get()
    if (!currentUser) return
    if (currentUser.purchasedIds.includes(contentId)) return
    const updatedUser = {
      ...currentUser,
      purchasedIds: [...currentUser.purchasedIds, contentId]
    }
    const users = loadUsers()
    users[currentUser.phone] = updatedUser
    saveUsers(users)
    saveCurrentUser(updatedUser)
    set({ currentUser: updatedUser })
  },

  toggleFavorite: (contentId: string) => {
    const { currentUser } = get()
    if (!currentUser) return
    const isFav = currentUser.favoriteIds.includes(contentId)
    const updatedUser = {
      ...currentUser,
      favoriteIds: isFav
        ? currentUser.favoriteIds.filter(id => id !== contentId)
        : [...currentUser.favoriteIds, contentId]
    }
    const users = loadUsers()
    users[currentUser.phone] = updatedUser
    saveUsers(users)
    saveCurrentUser(updatedUser)
    set({ currentUser: updatedUser })
  },

  addHistory: (contentId: string) => {
    const { currentUser } = get()
    if (!currentUser) return
    const history = currentUser.historyIds.filter(id => id !== contentId)
    const updatedUser = {
      ...currentUser,
      historyIds: [contentId, ...history].slice(0, 50)
    }
    const users = loadUsers()
    users[currentUser.phone] = updatedUser
    saveUsers(users)
    saveCurrentUser(updatedUser)
    set({ currentUser: updatedUser })
  },

  isPurchased: (contentId: string) => {
    return get().currentUser?.purchasedIds.includes(contentId) ?? false
  },

  isFavorited: (contentId: string) => {
    return get().currentUser?.favoriteIds.includes(contentId) ?? false
  }
}))