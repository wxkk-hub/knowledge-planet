import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'
import { Lock, LogIn } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAdminStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('请输入管理密码')
      return
    }
    const success = login(password)
    if (success) {
      navigate('/admin')
    } else {
      setError('密码错误')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center justify-center w-14 h-14 bg-[#333] rounded-full mx-auto mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-center text-[#333] mb-2">内容管理后台</h1>
        <p className="text-sm text-center text-[#999] mb-6">请输入管理密码以继续</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            placeholder="管理密码"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#333] transition-colors mb-3"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-[#333] text-white rounded-lg font-medium text-sm hover:bg-[#555] transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            进入管理后台
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full text-center text-sm text-[#999] mt-4 hover:text-[#333] transition-colors"
        >
          返回小程序首页
        </button>
      </div>
    </div>
  )
}