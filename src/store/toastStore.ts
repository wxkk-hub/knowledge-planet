import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2)
    set({ toasts: [...get().toasts, { id, message, type }] })
    setTimeout(() => {
      set({ toasts: get().toasts.filter(t => t.id !== id) })
    }, 3000)
  },
  removeToast: (id: string) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) })
  }
}))
