"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Search, Copy, CheckCircle, AlertCircle } from "lucide-react"
import { findPlaceId, verifyPlaceId, isValidPlaceId, PLACE_ID_INSTRUCTIONS } from "@/lib/find-place-id"

export default function GoogleBusinessSetup() {
  const [apiKey, setApiKey] = useState("")
  const [placeId, setPlaceId] = useState("")
  const [searchResults, setSearchResults] = useState<{
    place_id: string
    name: string
    formatted_address?: string
    address?: string
    rating?: number
    user_ratings_total?: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSearch = async () => {
    if (!apiKey) {
      setError("Please enter your Google Places API key")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await findPlaceId(
        "Marrickville Martial Arts Club",
        "Unit 5/1-7 Jabez St, Marrickville NSW 2204",
        apiKey
      )

      if (result) {
        setSearchResults(result)
        setPlaceId(result.place_id)
        setSuccess("Business found! Copy the Place ID below to update your configuration.")
      } else {
        setError("Business not found. Try searching manually or check your API key.")
      }
    } catch (err) {
      setError("Error searching for business. Check your API key and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyPlaceId = async () => {
    if (!apiKey || !placeId) {
      setError("Please enter both API key and Place ID")
      return
    }

    if (!isValidPlaceId(placeId)) {
      setError("Invalid Place ID format")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await verifyPlaceId(placeId, apiKey)

      if (result) {
        setSearchResults(result)
        setSuccess("Place ID verified! This is your business.")
      } else {
        setError("Place ID not found or invalid.")
      }
    } catch (err) {
      setError("Error verifying Place ID. Check your inputs and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setSuccess("Copied to clipboard!")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-6 h-6 mr-2" />
            Connect to Your Google Business Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            To display your actual Google Business reviews, we need to connect to your Google Places API.
            Follow the steps below to get your Place ID and API key.
          </p>

          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Google Places API Key</label>
            <Input
              type="password"
              placeholder="Enter your Google Places API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from{" "}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>

          {/* Search for Business */}
          <div>
            <Button
              onClick={handleSearch}
              disabled={!apiKey || isLoading}
              className="w-full"
            >
              {isLoading ? "Searching..." : "Search for Your Business"}
            </Button>
          </div>

          {/* Manual Place ID Input */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium mb-2">Or Enter Place ID Manually</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your Google Place ID"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
              />
              <Button
                onClick={handleVerifyPlaceId}
                disabled={!apiKey || !placeId || isLoading}
                variant="outline"
              >
                Verify
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded">
              <CheckCircle className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          {/* Search Results */}
          {searchResults && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Business Found!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {searchResults.name}</p>
                  <p><strong>Address:</strong> {searchResults.formatted_address || searchResults.address}</p>
                  {searchResults.rating && (
                    <p><strong>Rating:</strong> {searchResults.rating} ({searchResults.user_ratings_total} reviews)</p>
                  )}

                  <div className="bg-white p-3 rounded border mt-4">
                    <label className="block text-sm font-medium mb-2">Your Place ID:</label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 bg-gray-100 p-2 rounded text-sm">
                        {searchResults.place_id}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(searchResults.place_id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border mt-4">
                    <h4 className="font-medium mb-2">Next Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Copy the Place ID above</li>
                      <li>Add it to your .env.local file: <code>NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id</code></li>
                      <li>Add your API key: <code>NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key</code></li>
                      <li>Update the businessInfo in src/lib/google-reviews.ts</li>
                      <li>Restart your development server</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose text-sm">
            <h4>Step 1: Get Google Places API Key</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
              <li>Create a new project or select existing one</li>
              <li>Enable the Places API</li>
              <li>Create credentials (API Key)</li>
              <li>Restrict the key to Places API for security</li>
            </ol>

            <h4 className="mt-4">Step 2: Find Your Place ID</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Maps</a></li>
              <li>Search for "Marrickville Martial Arts Club Unit 5/1-7 Jabez St Marrickville"</li>
              <li>Click on your business listing</li>
              <li>Look at the URL for a long string starting with "ChIJ" - that's your Place ID</li>
              <li>Or use the search tool above with your API key</li>
            </ol>

            <h4 className="mt-4">Step 3: Configure Your Environment</h4>
            <p>Add these to your .env.local file:</p>
            <pre className="bg-gray-100 p-2 rounded text-xs">
{`NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id_here`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
