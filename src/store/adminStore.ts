import { create } from 'zustand'

const STORAGE_KEY = 'zs_admin_token'
const ADMIN_PASSWORD = 'admin123'

function loadToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function saveToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {}
}

interface AdminStore {
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  isLoggedIn: loadToken() !== null,

  login: (password: string) => {
    if (password !== ADMIN_PASSWORD) return false
    saveToken(btoa(password))
    set({ isLoggedIn: true })
    return true
  },

  logout: () => {
    saveToken(null)
    set({ isLoggedIn: false })
  }
}))