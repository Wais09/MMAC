"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TestReviewsPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testGoogleReviews = async () => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`)
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const checkEnvironmentVariables = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    return {
      apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set',
      placeId: placeId || 'Not set',
      hasApiKey: !!apiKey,
      hasPlaceId: !!placeId
    }
  }

  const envVars = checkEnvironmentVariables()

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Google Reviews API Test</h1>

        {/* Environment Variables Check */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Environment Variables Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Google Places API Key:</span>
                <span className={envVars.hasApiKey ? 'text-green-600' : 'text-red-600'}>
                  {envVars.apiKey}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Google Place ID:</span>
                <span className={envVars.hasPlaceId ? 'text-green-600' : 'text-red-600'}>
                  {envVars.placeId}
                </span>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-sm">
                  {envVars.hasApiKey && envVars.hasPlaceId
                    ? '✅ Environment variables are configured'
                    : '❌ Environment variables are missing. Set them in Netlify dashboard under Site Settings > Environment variables.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Test */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">API Test</h2>
            <Button
              onClick={testGoogleReviews}
              disabled={loading}
              className="mb-4"
            >
              {loading ? 'Testing...' : 'Test Google Reviews API'}
            </Button>

            {loading && (
              <div className="text-blue-600">
                <p>Testing Google Reviews API...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {results && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Success!</strong>
                <pre className="mt-2 text-xs overflow-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Test */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Image Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'BJJ-photo.jpg.jpg',
                'Muay-thai.jpg',
                'MMA.jpeg',
                'kids2.jpg',
                'Wrestling.jpg',
                'womens-muaythai.jpg.jpg'
              ].map((image) => (
                <div key={image} className="text-center">
                  <img
                    src={`/uploads/${image}`}
                    alt={image}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling!.textContent = '❌ Failed to load'
                    }}
                    onLoad={(e) => {
                      e.currentTarget.nextElementSibling!.textContent = '✅ Loaded'
                    }}
                  />
                  <p className="text-sm">Loading...</p>
                  <p className="text-xs text-gray-600">{image}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Setup Instructions</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold">1. Set Environment Variables on Netlify:</h3>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Go to your Netlify dashboard</li>
                  <li>Select your site (mmac.netlify.app)</li>
                  <li>Go to Site Settings → Environment variables</li>
                  <li>Add these variables:</li>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li><code>NEXT_PUBLIC_GOOGLE_PLACES_API_KEY</code> = AIzaSyCtldMho592v2hLQI1WoE5Wkl_y4iMDC_o</li>
                    <li><code>NEXT_PUBLIC_GOOGLE_PLACE_ID</code> = ChIJLeH5UMKxEmsRo6OV-6uCSR4</li>
                  </ul>
                  <li>Deploy the site after adding the variables</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold">2. If Images Still Don't Show:</h3>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Check if the /public/uploads directory is in your GitHub repo</li>
                  <li>Trigger a new deployment on Netlify</li>
                  <li>Clear browser cache and reload</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
