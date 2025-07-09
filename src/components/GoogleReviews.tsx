"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getReviews, type GoogleReview, formatTimeAgo } from "@/lib/google-reviews"

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [businessInfo, setBusinessInfo] = useState({
    name: "Marrickville Martial Arts Club",
    rating: 4.9,
    user_ratings_total: 127,
    google_url: "https://g.co/kgs/QWr1TfG"
  })
  const [loading, setLoading] = useState(true)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  useEffect(() => {
    async function loadReviews() {
      try {
        const {
          reviews: fetchedReviews,
          businessInfo: fetchedBusinessInfo,
          isLiveData,
          needsSetup
        } = await getReviews()

        setReviews(fetchedReviews)
        setBusinessInfo(fetchedBusinessInfo)

        // Log connection status for debugging
        if (isLiveData) {
          console.log('✅ Connected to live Google Business reviews!')
        } else if (needsSetup) {
          console.log('⚠️ Google Places API not configured - using fallback reviews')
        } else {
          console.log('📄 Using fallback reviews (API configured but no data)')
        }
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [])

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
      }, 5000) // Change review every 5 seconds

      return () => clearInterval(interval)
    }
  }, [reviews.length])

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={`star-${rating}-${i}`}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      )
    }
    return stars
  }

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
            <p className="mt-4 text-gray-600">Loading Google Reviews...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with Google Business Info */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
              alt="Google"
              width={32}
              height={32}
              className="w-8 h-8 mr-3"
            />
            <h2 className="text-4xl font-bold text-gray-900">What Our Members Say</h2>
          </div>

          {/* Overall Rating Display */}
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-gray-900 mr-2">{businessInfo.rating}</span>
                <div className="flex">{renderStars(Math.round(businessInfo.rating))}</div>
              </div>
              <p className="text-gray-600">
                Based on {businessInfo.user_ratings_total}+ Google Reviews
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
                <span className="text-2xl font-bold text-gray-900">{businessInfo.rating}</span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">{businessInfo.user_ratings_total}+</span>
              </div>
              <p className="text-sm text-gray-600">Happy Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">96%</span>
              </div>
              <p className="text-sm text-gray-600">5-Star Reviews</p>
            </div>
          </div>
        </div>

        {/* Featured Review Carousel */}
        {reviews.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  {/* Profile Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={reviews[currentReviewIndex].profile_photo_url || "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo"}
                      alt={reviews[currentReviewIndex].author_name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo"
                      }}
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {reviews[currentReviewIndex].author_name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(reviews[currentReviewIndex].rating)}</div>
                          <span className="text-sm text-gray-600">
                            {reviews[currentReviewIndex].relative_time_description}
                          </span>
                        </div>
                      </div>
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                        alt="Google"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      "{reviews[currentReviewIndex].text}"
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={prevReview}
                          className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                          aria-label="Previous review"
                        />
                        {reviews.map((review, index) => (
                          <button
                            key={`nav-${review.author_name}-${index}`}
                            onClick={() => setCurrentReviewIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentReviewIndex ? 'bg-yellow-400' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to review ${index + 1}`}
                          />
                        ))}
                        <button
                          onClick={nextReview}
                          className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                          aria-label="Next review"
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {currentReviewIndex + 1} of {reviews.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.slice(0, 6).map((review, index) => (
            <Card key={`review-${review.author_name}-${index}`} className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={review.profile_photo_url || "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo"}
                      alt={review.author_name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo"
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author_name}</h4>
                    <div className="flex items-center space-x-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-xs text-gray-600 ml-2">
                        {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm flex-1 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical' as const
                }}>
                  {review.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href={businessInfo.google_url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg mr-4">
              <ExternalLink className="w-5 h-5 mr-2" />
              View All Reviews on Google
            </Button>
          </Link>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 text-lg">
            Leave Us a Review
          </Button>
        </div>
      </div>
    </section>
  )
}
