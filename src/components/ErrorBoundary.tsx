import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-[#333] mb-2">页面出现异常</h2>
            <p className="text-sm text-[#999] mb-6">抱歉，页面加载时遇到了问题</p>
            <button onClick={this.handleRetry} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#333] text-white rounded-full text-sm font-medium hover:bg-[#555] transition-colors">
              <RefreshCw className="w-4 h-4" />
              重新加载
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
