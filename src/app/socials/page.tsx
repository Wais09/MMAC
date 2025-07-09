import { Suspense } from "react"
import type { Metadata } from "next"
import SocialsClient from "./SocialsClient"
import { instagramService, mockInstagramPosts, type InstagramPost } from '@/lib/instagram'

// SEO metadata for the socials page
export const metadata: Metadata = {
  title: "Our Socials - Marrickville Martial Arts Club | Instagram BJJ Muay Thai MMA Wrestling",
  description: "Follow Marrickville Martial Arts Club on Instagram for daily training content, student achievements, BJJ, Muay Thai, MMA & Wrestling highlights from Sydney's premier martial arts gym.",
  keywords: [
    "Marrickville Martial Arts Instagram",
    "BJJ training videos Sydney",
    "Muay Thai social media",
    "MMA training content",
    "Wrestling highlights Sydney",
    "martial arts community Marrickville",
    "Instagram fitness content",
    "Sydney martial arts social media"
  ].join(", "),
  openGraph: {
    title: "Our Socials - Marrickville Martial Arts Club",
    description: "Follow our martial arts journey on Instagram! Training highlights, student achievements & community from Sydney's premier BJJ, Muay Thai, MMA & Wrestling gym.",
    images: ["/uploads/BJJ2.jpg"],
    url: "https://marrickvillemartialartsclub.com.au/socials",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Socials - Marrickville Martial Arts Club",
    description: "Follow our martial arts journey on Instagram! Training highlights, student achievements & community from Sydney's premier BJJ, Muay Thai, MMA & Wrestling gym.",
    images: ["/uploads/BJJ2.jpg"]
  },
  alternates: {
    canonical: "https://marrickvillemartialartsclub.com.au/socials"
  }
}

// Server-side function to fetch Instagram posts for SEO
async function getInstagramPosts(): Promise<{
  posts: InstagramPost[]
  source: string
}> {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const instagramAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

    // Try to fetch real Instagram data server-side
    if (accessToken) {
      try {
        let posts: InstagramPost[]

        if (instagramAccountId) {
          console.log('Server: Fetching Instagram posts using Graph API...')
          posts = await instagramService.fetchPostsGraphAPI(accessToken, instagramAccountId, 12)
        } else {
          console.log('Server: Fetching Instagram posts using Basic Display API...')
          posts = await instagramService.fetchPostsBasicAPI(accessToken, 12)
        }

        return { posts, source: 'instagram_api' }
      } catch (apiError) {
        console.error('Server: Instagram API failed, using mock data:', apiError)
        return { posts: mockInstagramPosts.slice(0, 12), source: 'mock_fallback' }
      }
    } else {
      console.log('Server: No Instagram access token, using mock data')
      return { posts: mockInstagramPosts.slice(0, 12), source: 'mock' }
    }
  } catch (error) {
    console.error('Server: Error fetching Instagram posts:', error)
    return { posts: mockInstagramPosts.slice(0, 12), source: 'error_fallback' }
  }
}

// SEO-friendly Instagram Posts component for server rendering
function InstagramPostsSSR({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="hidden">
      {/* Hidden content for SEO crawlers - contains all Instagram post captions and hashtags */}
      <section itemScope itemType="https://schema.org/SocialMediaPosting">
        <h2>Marrickville Martial Arts Club Instagram Posts</h2>
        {posts.map((post, index) => (
          <article key={post.id} itemScope itemType="https://schema.org/SocialMediaPosting">
            <meta itemProp="url" content={post.permalink} />
            <meta itemProp="datePublished" content={post.timestamp} />
            <meta itemProp="author" content="Marrickville Martial Arts Club" />
            <meta itemProp="image" content={post.imageUrl} />

            <h3 itemProp="headline">
              Marrickville Martial Arts Training Post {index + 1}
            </h3>

            <div itemProp="articleBody">
              {post.caption}
            </div>

            {/* Extract hashtags for SEO */}
            <div className="hashtags">
              {post.caption?.match(/#[\w\d_]+/g)?.map((hashtag, idx) => (
                <span key={idx} itemProp="keywords">{hashtag.replace('#', '')} </span>
              ))}
            </div>

            {/* Add martial arts context for SEO */}
            <div itemProp="about">
              BJJ Brazilian Jiu-Jitsu Muay Thai Mixed Martial Arts MMA Wrestling Training Classes Marrickville Sydney Inner West Martial Arts Club
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

// Structured data for social media page
function SocialMediaStructuredData({ posts }: { posts: InstagramPost[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://marrickvillemartialartsclub.com.au/#organization",
        "name": "Marrickville Martial Arts Club",
        "url": "https://marrickvillemartialartsclub.com.au",
        "sameAs": [
          "https://instagram.com/marrickvillemartialartsclub",
          "https://facebook.com/marrickvillemartialartsclub",
          "https://tiktok.com/@marrickvillemartialartsclub"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://marrickvillemartialartsclub.com.au/logo.png"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://marrickvillemartialartsclub.com.au/socials#webpage",
        "url": "https://marrickvillemartialartsclub.com.au/socials",
        "name": "Our Socials - Marrickville Martial Arts Club",
        "description": "Follow Marrickville Martial Arts Club on Instagram for daily training content, student achievements, BJJ, Muay Thai, MMA & Wrestling highlights.",
        "isPartOf": {
          "@id": "https://marrickvillemartialartsclub.com.au/#website"
        },
        "about": {
          "@id": "https://marrickvillemartialartsclub.com.au/#organization"
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Instagram Posts",
          "description": "Latest Instagram posts from Marrickville Martial Arts Club featuring BJJ, Muay Thai, MMA and Wrestling training content",
          "numberOfItems": posts.length,
          "itemListElement": posts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "SocialMediaPosting",
              "url": post.permalink,
              "datePublished": post.timestamp,
              "text": post.caption,
              "image": post.imageUrl,
              "author": {
                "@id": "https://marrickvillemartialartsclub.com.au/#organization"
              },
              "publisher": {
                "@id": "https://marrickvillemartialartsclub.com.au/#organization"
              }
            }
          }))
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Main server component
export default async function SocialsPage() {
  // Fetch Instagram posts server-side for SEO
  const { posts, source } = await getInstagramPosts()

  return (
    <>
      {/* Structured Data for SEO */}
      <SocialMediaStructuredData posts={posts} />

      {/* SEO-friendly hidden content for crawlers */}
      <InstagramPostsSSR posts={posts} />

      {/* Client-side interactive component */}
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading our social media content...</p>
          </div>
        </div>
      }>
        <SocialsClient initialPosts={posts} initialSource={source} />
      </Suspense>
    </>
  )
}
