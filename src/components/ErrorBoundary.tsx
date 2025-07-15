'use client'
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 ERROR BOUNDARY CAUGHT ERROR:')
    console.error('Error:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('Component stack:', errorInfo.componentStack)
    console.error('Error info:', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            {this.state.error && (
              <div className="text-left bg-red-50 border border-red-200 rounded p-4 mb-4">
                <p className="text-red-800 font-semibold mb-2">Error Details:</p>
                <p className="text-red-700 text-sm break-all">{this.state.error.message}</p>
                {this.state.error.stack && (
                  <details className="mt-2">
                    <summary className="text-red-600 cursor-pointer text-sm">Stack Trace</summary>
                    <pre className="text-xs text-red-600 mt-2 overflow-auto">{this.state.error.stack}</pre>
                  </details>
                )}
              </div>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
