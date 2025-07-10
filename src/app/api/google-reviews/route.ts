import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

    if (!apiKey || !placeId) {
      return NextResponse.json(
        { error: 'Missing API key or Place ID' },
        { status: 400 }
      )
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url,website,formatted_address&key=${apiKey}`

    console.log('Fetching from Google Places API:', placeId)

    const response = await fetch(url)

    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText)
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Google Places API response status:', data.status)

    if (data.status === 'OK') {
      console.log('✅ Successfully fetched reviews:', data.result.reviews?.length || 0)
      return NextResponse.json({
        success: true,
        data: data.result
      })
    }

    console.error('Google Places API error:', data.status, data.error_message)
    return NextResponse.json(
      {
        error: 'Google Places API error',
        status: data.status,
        message: data.error_message
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
