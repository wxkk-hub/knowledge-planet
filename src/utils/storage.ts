export const STORAGE_KEYS = {
  CONTENTS: 'zs_contents',
  USERS: 'zs_users',
  CURRENT_USER: 'zs_current_user',
  SEARCH_HISTORY: 'zs_search_history',
} as const

export function getStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn('Storage write failed:', e)
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {}
}
