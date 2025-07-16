"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, ExternalLink, Heart, MessageCircle, Calendar, AlertCircle, RefreshCw, Settings } from "lucide-react"
import type { InstagramPost } from "@/lib/instagram"

interface SocialsClientProps {
  initialPosts: InstagramPost[]
  initialSource: string
}

export default function SocialsClient({ initialPosts, initialSource }: SocialsClientProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<string>(initialSource)
  const [useRealAPI, setUseRealAPI] = useState(initialSource === 'instagram_api')
  const [accountInfo, setAccountInfo] = useState<{
    id: string
    username: string
    account_type: string
    media_count: number
    followers_count?: number
  } | null>(null)

  // Function to format timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  // Fetch Instagram posts from our API
  const fetchInstagramPosts = useCallback(async (limit = 12) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/instagram/posts?limit=${limit}&real=${useRealAPI}`)
      const result = await response.json()

      if (result.success) {
        setPosts(result.data)
        setDataSource(result.source)

        if (result.error) {
          setError(`API Warning: ${result.error}`)
        }
      } else {
        throw new Error(result.error || 'Failed to fetch posts')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching Instagram posts:', err)
    } finally {
      setLoading(false)
    }
  }, [useRealAPI])

  // Fetch account info
  const fetchAccountInfo = useCallback(async () => {
    try {
      const response = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'get_account_info' })
      })

      const result = await response.json()

      if (result.success) {
        setAccountInfo(result.data)
      }
    } catch (err: unknown) {
      console.error('Error fetching account info:', err)
    }
  }, [])

  // Refresh access token
  const refreshToken = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'refresh_token' })
      })

      const result = await response.json()

      if (result.success) {
        alert('Token refreshed! Please update your environment variables.')
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (useRealAPI && initialSource !== 'instagram_api') {
      fetchInstagramPosts()
      fetchAccountInfo()
    }
  }, [useRealAPI, fetchInstagramPosts, fetchAccountInfo, initialSource])

  // Get stats from account info or use defaults
  const stats = accountInfo ? {
    followers: accountInfo.followers_count || '2.5K+',
    posts: accountInfo.media_count || '500+',
    features: '150+',
    updates: 'Daily'
  } : {
    followers: '2.5K+',
    posts: '500+',
    features: '150+',
    updates: 'Daily'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-yellow-400">Socials</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Follow our martial arts journey! See our students in action, training highlights,
            technique breakdowns, and behind-the-scenes moments from Marrickville Martial Arts Club.
          </p>

          {/* Data Source Indicator */}
          <div className="mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              dataSource === 'instagram_api' ? 'bg-green-500' :
              dataSource === 'mock_fallback' ? 'bg-yellow-500' : 'bg-blue-500'
            } text-white`}>
              {dataSource === 'instagram_api' && <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />}
              {dataSource === 'instagram_api' ? 'Live Instagram Feed' :
               dataSource === 'mock_fallback' ? 'Demo Mode (API Issue)' : 'Demo Mode'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => window.open('https://instagram.com/marrickvillemartialartsclub', '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow Us on Instagram
            </Button>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Controls (for testing) */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useRealAPI}
                  onChange={(e) => setUseRealAPI(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Use Real Instagram API</span>
              </label>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {useRealAPI && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshToken}
                  disabled={loading}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh Token
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchInstagramPosts()}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                {loading ? 'Loading...' : 'Refresh Posts'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-yellow-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-black">{stats.followers}</div>
              <div className="text-gray-800">Followers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">{stats.posts}</div>
              <div className="text-gray-800">Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">{stats.features}</div>
              <div className="text-gray-800">Student Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">{stats.updates}</div>
              <div className="text-gray-800">Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest from Instagram</h2>
          <p className="text-lg text-gray-600">
            Stay up to date with our training sessions, student achievements, and martial arts community
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={`loading-${index}`} className="overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-300" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={`Instagram post: ${post.caption ? post.caption.slice(0, 100) + '...' : 'Marrickville Martial Arts training content'}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Video indicator */}
                  {post.media_type === 'VIDEO' && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      VIDEO
                    </div>
                  )}
                  {/* Carousel indicator */}
                  {post.media_type === 'CAROUSEL_ALBUM' && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      📷+
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4 text-white">
                      {post.likes !== undefined && (
                        <div className="flex items-center">
                          <Heart className="w-6 h-6 mr-2" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                      )}
                      {post.comments !== undefined && (
                        <div className="flex items-center">
                          <MessageCircle className="w-6 h-6 mr-2" />
                          <span className="font-semibold">{post.comments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.timestamp)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(post.permalink, '_blank')}
                      className="text-gray-500 hover:text-yellow-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {post.likes !== undefined && (
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                      )}
                      {post.comments !== undefined && (
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(post.permalink, '_blank')}
                      className="border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
                    >
                      View Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => fetchInstagramPosts(24)}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
          >
            <Instagram className="w-5 h-5 mr-2" />
            {loading ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Martial Arts Community
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Be part of our journey! Follow us on social media and book your free trial to start training with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              onClick={() => window.open('https://instagram.com/marrickvillemartialartsclub', '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
            </Button>
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
            >
              Book Your Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.open('https://instagram.com/marrickvillemartialartsclub', '_blank')}
              className="text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              <Instagram className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.open('https://facebook.com/marrickvillemartialartsclub', '_blank')}
              className="text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              <Image
                src="https://ugc.same-assets.com/tKHB9FKtt2hBj6BF7BymSRoIDsuY5v1B.png"
                alt="Follow Marrickville Martial Arts Club on Facebook - martial arts Sydney BJJ Muay Thai MMA wrestling community"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.open('https://tiktok.com/@marrickvillemartialartsclub', '_blank')}
              className="text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              <Image
                src="https://ext.same-assets.com/3814609060/260646423.svg"
                alt="Follow Marrickville Martial Arts Club on TikTok - martial arts training content Sydney BJJ Muay Thai MMA wrestling"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </Button>
          </div>
          <p className="text-gray-400 mt-4">
            Follow us for daily training content, student spotlights, and martial arts tips!
          </p>
        </div>
      </div>
    </div>
  )
}
