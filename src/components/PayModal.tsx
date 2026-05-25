import { useState } from 'react'
import { X, Loader2, CheckCircle2, XCircle } from 'lucide-react'

interface PayModalProps {
  isOpen: boolean
  onClose: () => void
  price: number
  title: string
  onConfirm: () => Promise<boolean>
}

type PayState = 'confirm' | 'processing' | 'success' | 'fail'

export default function PayModal({ isOpen, onClose, price, title, onConfirm }: PayModalProps) {
  const [payState, setPayState] = useState<PayState>('confirm')
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleConfirm = async () => {
    setPayState('processing')
    const result = await onConfirm()
    if (result) {
      setPayState('success')
      setTimeout(() => {
        setPayState('confirm')
        onClose()
      }, 1500)
    } else {
      setPayState('fail')
      setErrorMsg('支付失败，请重试')
    }
  }

  const handleRetry = () => {
    setPayState('confirm')
    setErrorMsg('')
  }

  const handleClose = () => {
    setPayState('confirm')
    setErrorMsg('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl w-[85%] max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {payState === 'confirm' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#333]">确认支付</h3>
              <button onClick={handleClose}>
                <X className="w-5 h-5 text-[#999]" />
              </button>
            </div>
            <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#666] mb-1 line-clamp-1">{title}</p>
              <p className="text-2xl font-bold text-[#FF6835]">¥{price}</p>
            </div>
            {errorMsg && (
              <p className="text-sm text-red-500 mb-3">{errorMsg}</p>
            )}
            <button
              className="w-full py-3 bg-[#FF6835] text-white rounded-lg font-medium text-base active:bg-[#e55a2b] transition-colors"
              onClick={handleConfirm}
            >
              确认支付 ¥{price}
            </button>
          </div>
        )}

        {payState === 'processing' && (
          <div className="p-8 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-[#FF6835] animate-spin mb-4" />
            <p className="text-base font-medium text-[#333]">支付处理中...</p>
            <p className="text-sm text-[#999] mt-1">请稍候</p>
          </div>
        )}

        {payState === 'success' && (
          <div className="p-8 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-[#4CAF50] mb-4" />
            <p className="text-base font-medium text-[#333]">支付成功！</p>
            <p className="text-sm text-[#999] mt-1">内容已解锁</p>
          </div>
        )}

        {payState === 'fail' && (
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <XCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-base font-medium text-[#333]">支付失败</p>
              <p className="text-sm text-[#999] mt-1">{errorMsg || '请重试'}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 bg-[#F5F5F5] text-[#333] rounded-lg font-medium text-sm"
                onClick={handleClose}
              >
                取消
              </button>
              <button
                className="flex-1 py-3 bg-[#FF6835] text-white rounded-lg font-medium text-sm"
                onClick={handleRetry}
              >
                重试
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}