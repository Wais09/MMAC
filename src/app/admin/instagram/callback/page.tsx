"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Copy } from "lucide-react"
import Link from "next/link"

function InstagramCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [accessToken, setAccessToken] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setStatus('error')
      setError(errorParam)
      return
    }

    if (code) {
      exchangeCodeForToken(code)
    } else {
      setStatus('error')
      setError('No authorization code received')
    }
  }, [searchParams])

  const exchangeCodeForToken = async (code: string) => {
    try {
      // Note: In a real app, this should be done server-side for security
      // This is just for demonstration purposes

      const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
      if (!appId) {
        throw new Error('Instagram App ID not configured')
      }

      // For demo purposes, we'll show the code and instructions
      // In production, you'd make a server-side request to exchange the code
      setStatus('success')
      setError(`Authorization code received: ${code}`)

    } catch (error: unknown) {
      setStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMessage)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Instagram Authorization Callback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === 'loading' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4" />
                <p className="text-gray-600">Processing authorization...</p>
              </div>
            )}

            {status === 'success' && (
              <Alert className="border-green-500">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <AlertDescription>
                  <div className="space-y-4">
                    <div>
                      <strong>✅ Authorization Code Received!</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        You now need to exchange this code for an access token.
                      </p>
                    </div>

                    <div className="bg-gray-100 p-3 rounded text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">Authorization Code:</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(error.replace('Authorization code received: ', ''))}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <code className="break-all">{error.replace('Authorization code received: ', '')}</code>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Next Steps:</h4>
                      <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600">
                        <li>Use this code to get an access token via the Instagram API</li>
                        <li>Make a POST request to the token endpoint (see documentation)</li>
                        <li>Add the access token to your environment variables</li>
                        <li>Test the connection on the admin page</li>
                      </ol>
                    </div>

                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Security Note:</strong> In production, the code-to-token exchange should be done server-side to keep your App Secret secure. This demo page is for testing purposes only.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert className="border-red-500">
                <XCircle className="w-5 h-5 text-red-500" />
                <AlertDescription>
                  <div>
                    <strong>❌ Authorization Failed</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {error || 'An unknown error occurred during authorization.'}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center space-x-4">
              <Link href="/admin/instagram">
                <Button variant="outline">
                  Back to Setup
                </Button>
              </Link>
              <Link href="/socials">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  View Socials Page
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help? Check the{" "}
                <Link href="/.same/instagram-setup-guide.md" className="text-blue-600 hover:underline">
                  setup guide
                </Link>{" "}
                for detailed instructions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function InstagramCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <InstagramCallbackContent />
    </Suspense>
  )
}
