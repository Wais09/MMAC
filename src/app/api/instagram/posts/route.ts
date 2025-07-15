import { type NextRequest, NextResponse } from 'next/server'
import { instagramService, mockInstagramPosts, type InstagramPost } from '@/lib/instagram'

export const dynamic = 'force-static'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get('limit') || '12')
    const useRealAPI = searchParams.get('real') === 'true'

    // Check if we should use real API or mock data
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const instagramAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

    if (!useRealAPI || !accessToken) {
      console.log('Using mock Instagram data (no access token or real=false)')
      return NextResponse.json({
        success: true,
        data: mockInstagramPosts.slice(0, limit),
        source: 'mock'
      })
    }

    try {
      let posts: InstagramPost[]

      // Try Graph API first (for business accounts)
      if (instagramAccountId) {
        console.log('Fetching Instagram posts using Graph API...')
        posts = await instagramService.fetchPostsGraphAPI(accessToken, instagramAccountId, limit)
      } else {
        console.log('Fetching Instagram posts using Basic Display API...')
        posts = await instagramService.fetchPostsBasicAPI(accessToken, limit)
      }

      return NextResponse.json({
        success: true,
        data: posts,
        source: 'instagram_api'
      })

    } catch (apiError: unknown) {
      const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error'
      console.error('Instagram API failed, falling back to mock data:', errorMessage)

      // Fallback to mock data if API fails
      return NextResponse.json({
        success: true,
        data: mockInstagramPosts.slice(0, limit),
        source: 'mock_fallback',
        error: errorMessage
      })
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in Instagram posts API:', errorMessage)

    return NextResponse.json({
      success: false,
      error: errorMessage || 'Failed to fetch Instagram posts',
      data: mockInstagramPosts.slice(0, 12), // Fallback to mock data
      source: 'error_fallback'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'refresh_token': {
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

        if (!accessToken) {
          return NextResponse.json({
            success: false,
            error: 'No access token available'
          }, { status: 400 })
        }

        const newToken = await instagramService.refreshAccessToken(accessToken)

        return NextResponse.json({
          success: true,
          message: 'Token refreshed successfully',
          // Note: You'll need to manually update your environment variables
          note: 'Please update INSTAGRAM_ACCESS_TOKEN in your environment variables'
        })
      }

      case 'get_account_info':
        const token = process.env.INSTAGRAM_ACCESS_TOKEN

        if (!token) {
          return NextResponse.json({
            success: false,
            error: 'No access token available'
          }, { status: 400 })
        }

        const accountInfo = await instagramService.getAccountInfo(token)

        return NextResponse.json({
          success: true,
          data: accountInfo
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 })
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in Instagram API POST:', errorMessage)

    return NextResponse.json({
      success: false,
      error: errorMessage || 'Failed to process request'
    }, { status: 500 })
  }
}
