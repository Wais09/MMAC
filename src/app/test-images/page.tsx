"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TestImagesPage() {
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({})

  const testImages = [
    { name: "BJJ-photo.jpg.jpg", path: "/uploads/BJJ-photo.jpg.jpg", description: "BJJ Style Card" },
    { name: "Muay-thai.jpg", path: "/uploads/Muay-thai.jpg", description: "Muay Thai Style Card" },
    { name: "MMA.jpeg", path: "/uploads/MMA.jpeg", description: "MMA Style Card" },
    { name: "kids2.jpg", path: "/uploads/kids2.jpg", description: "Kids Style Card" },
    { name: "Wrestling.jpg", path: "/uploads/Wrestling.jpg", description: "Wrestling Style Card" },
    { name: "womens-muaythai.jpg.jpg", path: "/uploads/womens-muaythai.jpg.jpg", description: "Women's Muay Thai Style Card" },
    { name: "BJJ2.jpg", path: "/uploads/BJJ2.jpg", description: "BJJ Page Hero" },
    { name: "Muay-thai2.jpg", path: "/uploads/Muay-thai2.jpg", description: "Muay Thai Page Hero" },
    { name: "Womens-muaythai2.jpg", path: "/uploads/Womens-muaythai2.jpg", description: "Women's Muay Thai Page Hero" },
    { name: "Wrestlin2.jpg", path: "/uploads/Wrestlin2.jpg", description: "Wrestling Page Hero" }
  ]

  const updateResult = (imageName: string, status: string) => {
    setTestResults(prev => ({ ...prev, [imageName]: status }))
  }

  const testDirectUrl = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' })
      return response.ok ? '✅ Accessible' : `❌ ${response.status}`
    } catch (error) {
      return `❌ Network Error`
    }
  }

  const runAllTests = async () => {
    setTestResults({})
    for (const image of testImages) {
      const result = await testDirectUrl(image.path)
      updateResult(image.name, result)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">Image Deployment Test</h1>

        <div className="text-center mb-8">
          <Button onClick={runAllTests} className="bg-blue-600 hover:bg-blue-700 text-white">
            Test All Images
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            This tests if images are accessible on the live site
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testImages.map((image) => (
            <Card key={image.name} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-2">{image.description}</h3>
                <div className="relative h-32 bg-gray-200 rounded mb-2">
                  <Image
                    src={image.path}
                    alt={image.description}
                    fill
                    className="object-cover rounded"
                    onLoad={() => updateResult(image.name, '✅ Loaded')}
                    onError={() => updateResult(image.name, '❌ Failed to load')}
                  />
                </div>
                <p className="text-xs text-gray-600 mb-1">{image.name}</p>
                <p className="text-xs font-medium">
                  {testResults[image.name] || '⏳ Testing...'}
                </p>

                {/* Direct URL test */}
                <div className="mt-2">
                  <a
                    href={image.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Test Direct URL →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Debug Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Debug Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Current Domain:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Server-side'}</p>
              <p><strong>Expected Path:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/uploads/` : '/uploads/'}</p>
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            </div>
          </CardContent>
        </Card>

        {/* Manual Test Links */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Manual Test Links</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {testImages.map((image) => (
                <div key={image.name} className="flex justify-between">
                  <span>{image.name}</span>
                  <a
                    href={image.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Test →
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Troubleshooting Steps</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold">If Images Show "❌ Failed to load":</h3>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Check if /uploads/ directory is in your GitHub repository</li>
                  <li>Verify Netlify build logs for any upload/deployment errors</li>
                  <li>Check browser Network tab for 404 errors on image requests</li>
                  <li>Try accessing images directly: <code>yoursite.com/uploads/BJJ-photo.jpg.jpg</code></li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold">If Direct URL Tests Fail:</h3>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Images are not being deployed to Netlify</li>
                  <li>Check netlify.toml for build/publish directory settings</li>
                  <li>Ensure public/ directory is properly configured</li>
                  <li>Try manual deployment with drag-and-drop to test</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
