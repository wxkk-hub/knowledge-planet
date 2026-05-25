import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react'
import { useUserStore } from '../store/userStore'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from || '/mine'
  const { login } = useUserStore()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  const isPhoneValid = /^1[3-9]\d{9}$/.test(phone)
  const isCodeValid = code.length >= 4
  const canLogin = isPhoneValid && isCodeValid

  const handleSendCode = () => {
    if (!isPhoneValid) {
      setError('请输入正确的手机号')
      return
    }
    setError('')
    setCountdown(60)
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = () => {
    if (!canLogin) return
    setLoading(true)
    setError('')
    const result = login(phone, code)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-white max-w-[768px] mx-auto">
      <div className="flex items-center px-4 h-14 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-[#333]" />
        </button>
        <h1 className="text-base font-medium text-[#333] ml-3">登录</h1>
      </div>

      <div className="px-6 pt-12">
        <h2 className="text-2xl font-bold text-[#333]">欢迎回来</h2>
        <p className="text-sm text-[#999] mt-2">登录后即可解锁付费内容</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-[#333] mb-2 block">手机号</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
              <input
                type="tel"
                placeholder="请输入手机号"
                maxLength={11}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''))
                  setError('')
                }}
                className="w-full h-12 pl-10 pr-3 bg-[#F5F5F5] rounded-xl text-sm text-[#333] placeholder:text-[#999] outline-none focus:ring-2 focus:ring-[#333]/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#333] mb-2 block">验证码</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                <input
                  type="text"
                  placeholder="请输入验证码"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ''))
                    setError('')
                  }}
                  className="w-full h-12 pl-10 pr-3 bg-[#F5F5F5] rounded-xl text-sm text-[#333] placeholder:text-[#999] outline-none focus:ring-2 focus:ring-[#333]/20"
                />
              </div>
              <button
                className={`flex-shrink-0 h-12 px-5 rounded-xl text-sm font-medium transition-colors ${
                  countdown > 0
                    ? 'bg-[#F5F5F5] text-[#999]'
                    : isPhoneValid
                    ? 'bg-[#333] text-white active:bg-[#555]'
                    : 'bg-[#F5F5F5] text-[#999]'
                }`}
                onClick={handleSendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
            <p className="text-xs text-[#999] mt-1.5">演示验证码：123456</p>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
          )}

          <button
            className={`w-full h-12 rounded-xl text-base font-medium transition-colors ${
              canLogin
                ? 'bg-[#333] text-white active:bg-[#555]'
                : 'bg-[#ccc] text-white'
            }`}
            onClick={handleLogin}
            disabled={!canLogin || loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </div>
      </div>
    </div>
  )
}
