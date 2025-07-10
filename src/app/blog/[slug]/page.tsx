import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "@/lib/blog"
import { getInstructorBySlug } from "@/lib/instructors"
import { Button } from "@/components/ui/button"
import { BookingButton } from "@/components/BookingButton"
import { ShareButton } from "@/components/ShareButton"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, User, Calendar, Tag, ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    }
  }

  const seoTitle = post.seoTitle || `${post.title} | Marrickville Martial Arts Club`

  return {
    title: seoTitle,
    description: post.metaDescription,
    keywords: post.keywords.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: seoTitle,
      description: post.metaDescription,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://marrickvillemartialartsclub.com.au/blog/${post.slug}`,
    },
  }
}

function BlogPostSchema({ post }: { post: BlogPost }) {
  const author = getInstructorBySlug(post.authorSlug)

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": author ? `https://marrickvillemartialartsclub.com.au/coaches/${author.slug}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marrickville Martial Arts Club",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ext.same-assets.com/3814609060/3965628387.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://marrickvillemartialartsclub.com.au/blog/${post.slug}`
    },
    "keywords": post.keywords.join(", "),
    "about": {
      "@type": "Thing",
      "name": post.category
    },
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = getInstructorBySlug(post.authorSlug)
  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3)

  return (
    <>
      <BlogPostSchema post={post} />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-yellow-400">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Back to Blog */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/blog" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                {author && (
                  <div className="relative w-12 h-12">
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
                    href={author ? `/coaches/${author.slug}` : '/coaches'}
                    className="font-medium text-gray-900 hover:text-yellow-400"
                  >
                    {post.author}
                  </Link>
                  <div className="text-sm text-gray-600">
                    {author?.title || 'Martial Arts Instructor'}
                  </div>
                </div>
              </div>

              <ShareButton title={post.title} />
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </div>

              <div
                className="prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-li:text-gray-700 prose-a:text-yellow-600 prose-a:hover:text-yellow-700"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-gray-100 hover:bg-yellow-100 border border-gray-200 hover:border-yellow-400 text-gray-700 hover:text-yellow-800 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      {author && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={author.image}
                        alt={author.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">About {author.name}</h3>
                      <p className="text-yellow-600 mb-3">{author.title}</p>
                      <p className="text-gray-700 mb-4">{author.bio}</p>
                      <Link href={`/coaches/${author.slug}`}>
                        <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                          View Full Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{relatedPost.readTime} min</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-yellow-400">
                          {relatedPost.title}
                        </Link>
                      </h3>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="outline" size="sm" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Martial Arts Journey?
          </h3>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Put these training tips into practice! Book a free trial class with our expert instructors
            and experience world-class martial arts training at Marrickville Martial Arts Club.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-8 py-3">
              Book Free Trial Class
            </BookingButton>
            <Link href="/styles">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-yellow-400 px-8 py-3">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
