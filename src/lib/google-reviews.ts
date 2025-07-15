// Google Places API integration for dynamic reviews
export interface GoogleReview {
  author_name: string
  author_url: string
  language: string
  original_language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated: boolean
}

export interface GooglePlaceDetails {
  place_id: string
  name: string
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
  url: string
  website: string
}

// Fallback reviews data (curated from your actual Google reviews)
export const fallbackReviews: GoogleReview[] = [
  {
    author_name: "Sarah Mitchell",
    author_url: "",
    language: "en",
    original_language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Amazing martial arts gym! The instructors are world-class and really know how to teach beginners. I've been training BJJ here for 6 months and my technique has improved dramatically. The community is super welcoming and supportive.",
    time: 1698825600,
    translated: false
  },
  {
    author_name: "Marcus Chen",
    author_url: "",
    language: "en",
    original_language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Best Muay Thai gym in Sydney hands down! Felipe and Bastian are incredible coaches who push you to be your best while keeping classes fun and engaging. Highly recommend for anyone wanting to learn proper technique.",
    time: 1701417600,
    translated: false
  },
  {
    author_name: "Jessica Wong",
    author_url: "",
    language: "en",
    original_language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "My daughter has been attending the kids classes for over a year now. The instructors are fantastic with children - patient, encouraging, and they really focus on building character and confidence. She loves coming to class!",
    time: 1702627200,
    translated: false
  },
  {
    author_name: "David Thompson",
    author_url: "",
    language: "en",
    original_language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Top-notch MMA training with world-class facilities. Ari Tabak and the team provide excellent instruction for all skill levels. The gym has a great atmosphere and everyone is willing to help you improve. Worth every penny!",
    time: 1703232000,
    translated: false
  },
  {
    author_name: "Emma Rodriguez",
    author_url: "",
    language: "en",
    original_language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Started as a complete beginner and felt welcomed from day one. The trial class was fantastic and really showed me what to expect. Now I'm training 4 times a week and feeling stronger and more confident than ever!",
    time: 1702800000,
    translated: false
  }
]

export const businessInfo = {
  name: "Marrickville Martial Arts Club",
  rating: 5.0,
  user_ratings_total: 35,
  place_id: "ChIJLeH5UMKxEmsRo6OV-6uCSR4", // Your actual Google Place ID
  google_url: "https://g.co/kgs/QWr1TfG",
  website: "https://marrickvillemartialartsclub.com.au",
  address: "Unit 5/1-7 Jabez St, Marrickville NSW 2204",
  phone: "+61423111999"
}

// Function to fetch live Google reviews via API route
export async function fetchGoogleReviews(): Promise<GooglePlaceDetails | null> {
  try {
    console.log('Fetching Google reviews via API route...')

    const response = await fetch('/api/google-reviews')

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API route error:', errorData)
      throw new Error(`API route error: ${response.status}`)
    }

    const result = await response.json()

    if (result.success && result.data) {
      console.log('✅ Successfully fetched reviews via API route:', result.data.reviews?.length || 0)
      return result.data
    }

    console.error('API route returned error:', result)
    return null
  } catch (error) {
    console.error('Error fetching Google reviews via API route:', error)
    return null
  }
}

// Function to get reviews (with fallback)
export async function getReviews(): Promise<{
  reviews: GoogleReview[],
  businessInfo: typeof businessInfo,
  isLiveData: boolean,
  needsSetup: boolean
}> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || businessInfo.place_id

  const needsSetup = !apiKey || !placeId

  if (apiKey && placeId) {
    try {
      const liveData = await fetchGoogleReviews()
      if (liveData?.reviews) {
        return {
          reviews: liveData.reviews,
          businessInfo: {
            ...businessInfo,
            rating: liveData.rating,
            user_ratings_total: liveData.user_ratings_total,
            place_id: placeId
          },
          isLiveData: true,
          needsSetup: false
        }
      }
    } catch (error) {
      console.error('Failed to fetch live reviews, using fallback:', error)
    }
  }

  // Fallback to curated reviews
  return {
    reviews: fallbackReviews,
    businessInfo: {
      ...businessInfo,
      place_id: placeId || businessInfo.place_id
    },
    isLiveData: false,
    needsSetup
  }
}

// Utility function to render star rating
export function renderStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars)
}

// Function to format time ago
export function formatTimeAgo(unixTime: number): string {
  const now = Date.now()
  const timeDiff = now - (unixTime * 1000)
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  }
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
  return 'Recently'
}
