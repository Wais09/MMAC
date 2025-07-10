// Instagram API service for fetching posts

export interface InstagramPost {
  id: string
  imageUrl: string
  caption: string
  likes?: number
  comments?: number
  timestamp: string
  link: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
}

export interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

interface InstagramRawPost {
  id: string
  caption?: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
  like_count?: number
  comments_count?: number
}

interface InstagramAccountInfo {
  id: string
  username: string
  account_type: string
  media_count: number
  followers_count?: number
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in?: number
}

class InstagramService {
  private baseUrl = 'https://graph.instagram.com'
  private graphUrl = 'https://graph.facebook.com/v18.0'

  /**
   * Fetch Instagram posts using Instagram Basic Display API
   * Good for personal accounts
   */
  async fetchPostsBasicAPI(accessToken: string, limit = 12): Promise<InstagramPost[]> {
    try {
      const fields = 'id,caption,media_type,media_url,permalink,timestamp'
      const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

      const response = await fetch(url)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Instagram API Error: ${error.error?.message || 'Failed to fetch posts'}`)
      }

      const data = await response.json()

      return data.data.map((post: InstagramRawPost) => ({
        id: post.id,
        imageUrl: post.media_url,
        caption: post.caption || '',
        timestamp: post.timestamp,
        link: post.permalink,
        media_type: post.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM',
        media_url: post.media_url,
        permalink: post.permalink
      }))
    } catch (error) {
      console.error('Error fetching Instagram posts (Basic API):', error)
      throw error
    }
  }

  /**
   * Fetch Instagram posts using Instagram Graph API
   * Better for business accounts with more features
   */
  async fetchPostsGraphAPI(accessToken: string, instagramAccountId: string, limit = 12): Promise<InstagramPost[]> {
    try {
      const fields = 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count'
      const url = `${this.graphUrl}/${instagramAccountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

      const response = await fetch(url)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Instagram Graph API Error: ${error.error?.message || 'Failed to fetch posts'}`)
      }

      const data = await response.json()

      return data.data.map((post: InstagramRawPost) => ({
        id: post.id,
        imageUrl: post.media_url,
        caption: post.caption || '',
        likes: post.like_count,
        comments: post.comments_count,
        timestamp: post.timestamp,
        link: post.permalink,
        media_type: post.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM',
        media_url: post.media_url,
        permalink: post.permalink
      }))
    } catch (error) {
      console.error('Error fetching Instagram posts (Graph API):', error)
      throw error
    }
  }

  /**
   * Get Instagram account info
   */
  async getAccountInfo(accessToken: string): Promise<InstagramAccountInfo> {
    try {
      const fields = 'id,username,account_type,media_count,followers_count'
      const url = `${this.baseUrl}/me?fields=${fields}&access_token=${accessToken}`

      const response = await fetch(url)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Instagram API Error: ${error.error?.message || 'Failed to fetch account info'}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching Instagram account info:', error)
      throw error
    }
  }

  /**
   * Refresh long-lived access token
   */
  async refreshAccessToken(accessToken: string): Promise<string> {
    try {
      const url = `${this.baseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`

      const response = await fetch(url)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Token refresh error: ${error.error?.message || 'Failed to refresh token'}`)
      }

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error refreshing access token:', error)
      throw error
    }
  }

  /**
   * Generate Instagram OAuth URL for user authentication
   */
  generateAuthUrl(appId: string, redirectUri: string, scope = 'user_profile,user_media'): string {
    const params = new URLSearchParams({
      client_id: appId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: 'code'
    })

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, appId: string, appSecret: string, redirectUri: string): Promise<TokenResponse> {
    try {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: appId,
          client_secret: appSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Token exchange error: ${error.error_description || 'Failed to exchange code for token'}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      throw error
    }
  }
}

export const instagramService = new InstagramService()

// Mock data fallback for development/demo
export const mockInstagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://ext.same-assets.com/3814609060/274821222.jpeg",
    caption: "🥊 Monday motivation! Our students showing incredible dedication during tonight's Muay Thai class. The energy in the gym is always electric! 💪 #MuayThai #MarrickvilleMMA #MondayMotivation",
    likes: 127,
    comments: 23,
    timestamp: "2024-01-15T18:30:00Z",
    link: "https://instagram.com/p/example1",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/274821222.jpeg",
    permalink: "https://instagram.com/p/example1"
  },
  {
    id: "2",
    imageUrl: "https://ext.same-assets.com/3814609060/2851098477.jpeg",
    caption: "🤼‍♂️ BJJ technique session with our amazing students! Learning the fundamentals of guard passing. The gentle art at its finest 🔥 #BJJ #BrazilianJiuJitsu #TechniqueThursday",
    likes: 89,
    comments: 15,
    timestamp: "2024-01-14T19:00:00Z",
    link: "https://instagram.com/p/example2",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/2851098477.jpeg",
    permalink: "https://instagram.com/p/example2"
  },
  {
    id: "3",
    imageUrl: "https://ext.same-assets.com/3814609060/1572477315.jpeg",
    caption: "🏆 World champion Tsuchika Shimoyamada breaking down wrestling fundamentals! What an honor to learn from the best 🙌 #Wrestling #WorldChampion #MarrickvilleMartialArts",
    likes: 203,
    comments: 41,
    timestamp: "2024-01-13T17:45:00Z",
    link: "https://instagram.com/p/example3",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/1572477315.jpeg",
    permalink: "https://instagram.com/p/example3"
  },
  {
    id: "4",
    imageUrl: "https://ext.same-assets.com/3814609060/2277852474.jpeg",
    caption: "👶 Kids class having a blast! Building confidence, discipline, and friendships through martial arts. Our future champions! 🌟 #KidsMartialsArts #ConfidenceBuilding #FutureChampions",
    likes: 156,
    comments: 28,
    timestamp: "2024-01-12T16:30:00Z",
    link: "https://instagram.com/p/example4",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/2277852474.jpeg",
    permalink: "https://instagram.com/p/example4"
  },
  {
    id: "5",
    imageUrl: "https://ext.same-assets.com/3814609060/4056987022.jpeg",
    caption: "💪 Women's Muay Thai with Johana! Creating a supportive space for women to build strength and confidence. Every Thursday! 👩‍🦳 #WomensMuayThai #Empowerment #ThursdayClass",
    likes: 94,
    comments: 19,
    timestamp: "2024-01-11T19:30:00Z",
    link: "https://instagram.com/p/example5",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/4056987022.jpeg",
    permalink: "https://instagram.com/p/example5"
  },
  {
    id: "6",
    imageUrl: "https://ext.same-assets.com/3814609060/1633847439.jpeg",
    caption: "🔥 MMA training session with coach Antonio! Combining all disciplines for the complete martial artist. Tuesday and Thursday nights! #MMA #MixedMartialArts #CompleteTraining",
    likes: 178,
    comments: 32,
    timestamp: "2024-01-10T20:00:00Z",
    link: "https://instagram.com/p/example6",
    media_type: "IMAGE",
    media_url: "https://ext.same-assets.com/3814609060/1633847439.jpeg",
    permalink: "https://instagram.com/p/example6"
  }
]
