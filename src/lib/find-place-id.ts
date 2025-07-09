// Utility to help find Google Place ID for Marrickville Martial Arts Club

export async function findPlaceId(businessName: string, address: string, apiKey: string) {
  try {
    // Use Google Places Text Search to find the business
    const searchQuery = `${businessName} ${address}`
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      return {
        place_id: data.results[0].place_id,
        name: data.results[0].name,
        address: data.results[0].formatted_address,
        rating: data.results[0].rating,
        user_ratings_total: data.results[0].user_ratings_total
      }
    }

    return null
  } catch (error) {
    console.error('Error finding place ID:', error)
    return null
  }
}

// Alternative method using Place Details if you have a partial Place ID
export async function verifyPlaceId(placeId: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,rating,user_ratings_total,url&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === 'OK') {
      return data.result
    }

    return null
  } catch (error) {
    console.error('Error verifying place ID:', error)
    return null
  }
}

// Instructions for finding your Google Place ID manually
export const PLACE_ID_INSTRUCTIONS = `
To find your Google Place ID:

1. Go to Google Maps (maps.google.com)
2. Search for "Marrickville Martial Arts Club Unit 5/1-7 Jabez St Marrickville"
3. Click on your business listing
4. Look at the URL - it will contain something like: "place/[NAME]/data=!3m1!4b1!4m6!3m5!1s[PLACE_ID]"
5. Copy the Place ID from the URL

Alternatively:
1. Go to Google My Business (business.google.com)
2. Select your business
3. The Place ID will be in the URL or available in the business info

OR use this Place ID Finder tool:
https://developers.google.com/maps/documentation/places/web-service/place-id
`

// Common Place ID patterns for validation
export function isValidPlaceId(placeId: string): boolean {
  // Google Place IDs can be in different formats:
  // 1. Traditional format: ChIJ... (27 characters)
  // 2. Numeric format: long numbers (like 12391023002963607581)
  const traditionalPattern = /^ChIJ[A-Za-z0-9_-]{23}$/
  const numericPattern = /^\d{15,25}$/

  return traditionalPattern.test(placeId) || numericPattern.test(placeId)
}

// Fallback method to construct likely Place ID based on business info
export function generateSearchQueries(businessName: string, address: string): string[] {
  return [
    `${businessName} ${address}`,
    `${businessName} Marrickville`,
    `${businessName} martial arts gym Sydney`,
    "Marrickville Martial Arts Club BJJ Muay Thai",
    "martial arts gym Unit 5 Jabez Street Marrickville"
  ]
}
