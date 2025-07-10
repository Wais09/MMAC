"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function InstagramAdminPage() {
  const [credentials, setCredentials] = useState({
    appId: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || '',
    appSecret: '',
    accessToken: '',
    businessAccountId: '',
    pageId: ''
  })

  const [testResult, setTestResult] = useState<{
    success: boolean
    data?: unknown
    source?: string
    error?: string
    posts?: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const testConnection = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/instagram/posts?limit=5&real=true')
      const result = await response.json()

      setTestResult({
        success: result.success,
        data: result.data,
        source: result.source,
        error: result.error,
        posts: result.data?.length || 0
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setTestResult({
        success: false,
        error: errorMessage,
        posts: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const generateAuthUrl = () => {
    if (!credentials.appId) {
      alert('Please enter your App ID first')
      return
    }

    const redirectUri = `${window.location.origin}/admin/instagram/callback`
    const scope = 'user_profile,user_media'

    const url = `https://api.instagram.com/oauth/authorize?client_id=${credentials.appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instagram API Setup & Testing
          </h1>
          <p className="text-gray-600">
            Configure and test your Instagram API connection
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= number
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {number}
                </div>
                {number < 4 && (
                  <div
                    className={`w-12 h-1 ${
                      step > number ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-600 text-center">
              {step === 1 && "Setup Facebook App"}
              {step === 2 && "Get Credentials"}
              {step === 3 && "Update Environment"}
              {step === 4 && "Test Connection"}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Setup Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Quick Start:</strong> Read the complete setup guide first!
                  <Link
                    href="/.same/instagram-setup-guide.md"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    View Setup Guide <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Step 1: Facebook App</h4>
                  <p className="text-sm text-blue-800">
                    Create a Facebook app and add Instagram Basic Display product
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => window.open('https://developers.facebook.com/', '_blank')}
                  >
                    Open Facebook Developers
                  </Button>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Step 2: Get Credentials</h4>
                  <p className="text-sm text-green-800">
                    Copy App ID, App Secret, and generate access token
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Step 3: Environment</h4>
                  <p className="text-sm text-purple-800">
                    Update your .env.local file with the credentials
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Step 4: Test</h4>
                  <p className="text-sm text-yellow-800">
                    Use this page to test your Instagram API connection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
                API Connection Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="appId">Instagram App ID</Label>
                  <Input
                    id="appId"
                    value={credentials.appId}
                    onChange={(e) => setCredentials({...credentials, appId: e.target.value})}
                    placeholder="Your Instagram App ID"
                  />
                </div>

                <div>
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Textarea
                    id="accessToken"
                    value={credentials.accessToken}
                    onChange={(e) => setCredentials({...credentials, accessToken: e.target.value})}
                    placeholder="Your Instagram Access Token"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={generateAuthUrl}
                    variant="outline"
                    className="flex-1"
                  >
                    Generate Auth URL
                  </Button>
                  <Button
                    onClick={testConnection}
                    disabled={loading}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    {loading ? 'Testing...' : 'Test Connection'}
                  </Button>
                </div>
              </div>

              {/* Test Results */}
              {testResult && (
                <Alert className={testResult.success ? 'border-green-500' : 'border-red-500'}>
                  <div className="flex items-start">
                    {testResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <AlertDescription>
                        {testResult.success ? (
                          <div>
                            <strong>✅ Connection Successful!</strong>
                            <br />
                            Source: {testResult.source}
                            <br />
                            Posts fetched: {testResult.posts}
                            {testResult.error && (
                              <div className="mt-2 text-yellow-600">
                                Warning: {testResult.error}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <strong>❌ Connection Failed</strong>
                            <br />
                            Error: {testResult.error}
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Environment Variables Helper */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Environment Variables Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Copy this template to your `.env.local` file and replace with your actual values:
              </p>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`# Instagram API Configuration
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_instagram_app_id_here
INSTAGRAM_APP_SECRET=your_instagram_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Optional: For Instagram Graph API (Business accounts)
FACEBOOK_PAGE_ID=your_facebook_page_id_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <pre className="text-sm overflow-x-auto">
{`# Instagram API Configuration
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_instagram_app_id_here
INSTAGRAM_APP_SECRET=your_instagram_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here

# Optional: For Instagram Graph API (Business accounts)
FACEBOOK_PAGE_ID=your_facebook_page_id_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Link href="/socials">
              <Button variant="outline">
                View Socials Page
              </Button>
            </Link>
            <Button
              onClick={() => window.open('https://developers.facebook.com/docs/instagram-basic-display-api/', '_blank')}
              variant="outline"
            >
              Instagram API Docs
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Need help? Check the setup guide or Instagram API documentation above.
          </p>
        </div>
      </div>
    </div>
  )
}
