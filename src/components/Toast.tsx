import { useToastStore, type ToastType } from '../store/toastStore'
import { X, CheckCircle2, XCircle, Info } from 'lucide-react'

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-[#FF6835]" />
}

const bgMap: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-orange-50 border-orange-200'
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 max-w-[90vw] w-[360px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-[slideDown_0.3s_ease-out] ${bgMap[toast.type]}`}
        >
          {iconMap[toast.type]}
          <p className="flex-1 text-sm text-[#333]">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="p-0.5">
            <X className="w-4 h-4 text-[#999]" />
          </button>
        </div>
      ))}
    </div>
  )
}
