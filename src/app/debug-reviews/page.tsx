"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getReviews } from "@/lib/google-reviews"

interface ReviewData {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url?: string
}

interface BusinessInfo {
  name: string
  rating: number
  user_ratings_total: number
  formatted_address?: string
}

interface DebugInfo {
  reviews?: ReviewData[]
  businessInfo?: BusinessInfo
  isLiveData?: boolean
  needsSetup?: boolean
  error?: string
  directAPI?: unknown
}

export default function DebugReviewsPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const result = await getReviews()
      setDebugInfo(result)
    } catch (error) {
      setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const testDirectAPI = async () => {
    setLoading(true)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    try {
      console.log('API Key:', apiKey ? 'Present' : 'Missing')
      console.log('Place ID:', placeId)

      if (!apiKey) {
        setDebugInfo({ error: 'API Key missing' })
        return
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${apiKey}`
      )

      const data = await response.json()
      setDebugInfo({ directAPI: data })
    } catch (error) {
      setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Google Reviews Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Environment Check */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-2">Environment Variables:</h3>
            <p>API Key: {process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ? '✅ Present' : '❌ Missing'}</p>
            <p>Place ID: {process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ? '✅ Present' : '❌ Missing'}</p>
            {process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID && (
              <p>Place ID Value: {process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}</p>
            )}
          </div>

          {/* Test Buttons */}
          <div className="space-x-4">
            <Button onClick={testAPI} disabled={loading}>
              Test getReviews() Function
            </Button>
            <Button onClick={testDirectAPI} disabled={loading} variant="outline">
              Test Direct API Call
            </Button>
          </div>

          {/* Results */}
          {loading && <p>Testing...</p>}

          {debugInfo && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold mb-2">Debug Results:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
