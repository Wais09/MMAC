import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getAllBlogPosts, categories, tags } from "@/lib/blog"
import { getInstructorBySlug } from "@/lib/instructors"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User, Tag, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Martial Arts Training Tips & Expert Advice | Marrickville Blog",
  description: "Get expert martial arts training tips, techniques, and advice from our world-class instructors. BJJ, Muay Thai, MMA training guides and fitness tips.",
  keywords: "martial arts blog, BJJ training tips, Muay Thai techniques, MMA advice, martial arts fitness, training guides, expert instruction",
  openGraph: {
    title: "Martial Arts Training Tips & Expert Advice | Marrickville Blog",
    description: "Get expert martial arts training tips, techniques, and advice from our world-class instructors.",
    images: [
      {
        url: "https://ext.same-assets.com/3814609060/274821222.jpeg",
        width: 1200,
        height: 630,
        alt: "Marrickville Martial Arts Club Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martial Arts Training Tips & Expert Advice | Marrickville Blog",
    description: "Get expert martial arts training tips, techniques, and advice from our world-class instructors.",
    images: ["https://ext.same-assets.com/3814609060/274821222.jpeg"],
  },
  alternates: {
    canonical: "https://marrickvillemartialartsclub.com.au/blog",
  },
}

function BlogSchema() {
  const posts = getAllBlogPosts()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Marrickville Martial Arts Club Blog",
    "description": "Expert martial arts training tips, techniques, and advice from world-class instructors",
    "url": "https://marrickvillemartialartsclub.com.au/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Marrickville Martial Arts Club",
      "url": "https://marrickvillemartialartsclub.com.au"
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featuredImage,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishedAt,
      "url": `https://marrickvillemartialartsclub.com.au/blog/${post.slug}`,
      "keywords": post.keywords.join(", ")
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <BlogSchema />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Blog</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Martial Arts Training Tips & Expert Advice
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get insider training tips, technique breakdowns, and expert advice from our world-class instructors.
            Whether you're a beginner or advanced practitioner, our blog has something to elevate your martial arts journey.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={posts[0].featuredImage}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {posts[0].category}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{posts[0].readTime} min read</span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    <Link href={`/blog/${posts[0].slug}`} className="hover:text-yellow-400">
                      {posts[0].title}
                    </Link>
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {posts[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-yellow-400" />
                      <div>
                        <Link
                          href={`/coaches/${posts[0].authorSlug}`}
                          className="font-medium text-gray-900 hover:text-yellow-400"
                        >
                          {posts[0].author}
                        </Link>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(posts[0].publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/blog/${posts[0].slug}`}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => {
              const author = getInstructorBySlug(post.authorSlug)

              return (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative aspect-video">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-yellow-400">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        {author && (
                          <div className="relative w-8 h-8">
                            <Image
                              src={author.image}
                              alt={post.author}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/coaches/${post.authorSlug}`}
                            className="text-sm font-medium text-gray-900 hover:text-yellow-400"
                          >
                            {post.author}
                          </Link>
                          <div className="text-xs text-gray-600">
                            {new Date(post.publishedAt).toLocaleDateString('en-AU')}
                          </div>
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Topics</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white hover:bg-yellow-100 border border-gray-200 hover:border-yellow-400 text-gray-700 hover:text-yellow-800 px-4 py-2 rounded-full text-sm transition-colors"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            Stay Updated with Training Tips
          </h3>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Get the latest training techniques, expert advice, and martial arts insights delivered straight to your inbox.
            Plus, receive exclusive content from our world-class instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Button className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
