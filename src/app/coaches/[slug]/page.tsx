import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getInstructorBySlug, getAllInstructors, type Instructor } from "@/lib/instructors"
import { getBlogPostsByAuthor } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { BookingButton } from "@/components/BookingButton"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Star, Award, Trophy, Users } from "lucide-react"

interface InstructorPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const instructors = getAllInstructors()
  return instructors.map((instructor) => ({
    slug: instructor.slug,
  }))
}

export async function generateMetadata({ params }: InstructorPageProps): Promise<Metadata> {
  const { slug } = await params
  const instructor = getInstructorBySlug(slug)

  if (!instructor) {
    return {
      title: "Instructor Not Found",
      description: "The requested instructor profile could not be found."
    }
  }

  const seoTitle = `${instructor.name} - ${instructor.title} | Marrickville Martial Arts Club`
  const seoDescription = `Meet ${instructor.name}, expert ${instructor.specialties.join(", ")} instructor at Marrickville Martial Arts Club. ${instructor.experience}. Book your class today!`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      instructor.name,
      ...instructor.specialties,
      ...instructor.martialArts,
      "martial arts instructor",
      "Marrickville",
      "Sydney martial arts",
      "expert coaching"
    ].join(", "),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: instructor.image,
          width: 1200,
          height: 630,
          alt: `${instructor.name} - ${instructor.title}`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [instructor.image],
    },
    alternates: {
      canonical: `https://marrickvillemartialartsclub.com.au/coaches/${instructor.slug}`,
    },
  }
}

function InstructorSchema({ instructor }: { instructor: Instructor }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": instructor.name,
    "jobTitle": instructor.title,
    "worksFor": {
      "@type": "SportsActivityLocation",
      "name": "Marrickville Martial Arts Club",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit 5/1-7 Jabez St",
        "addressLocality": "Marrickville",
        "addressRegion": "NSW",
        "postalCode": "2204",
        "addressCountry": "Australia"
      },
      "telephone": "+61423111999",
      "url": "https://marrickvillemartialartsclub.com.au"
    },
    "description": instructor.bio,
    "image": instructor.image,
    "knowsAbout": instructor.specialties,
    "hasCredential": instructor.certifications,
    "award": instructor.achievements,
    "url": `https://marrickvillemartialartsclub.com.au/coaches/${instructor.slug}`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { slug } = await params
  const instructor = getInstructorBySlug(slug)

  if (!instructor) {
    notFound()
  }

  const blogPosts = getBlogPostsByAuthor(instructor.slug)

  return (
    <>
      <InstructorSchema instructor={instructor} />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <span>/</span>
            <Link href="/coaches" className="hover:text-yellow-400">Coaches</Link>
            <span>/</span>
            <span className="text-gray-900">{instructor.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{instructor.name}</h1>
              <h2 className="text-2xl text-yellow-400 mb-6">{instructor.title}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {instructor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">{instructor.bio}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                  Book a Class with {instructor.name.split(' ')[0]}
                </Button>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                  View All Coaches
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={instructor.image}
                  alt={`${instructor.name} - ${instructor.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{instructor.yearsExperience}+</h3>
                <p className="text-gray-600">Years Experience</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{instructor.achievements.length}</h3>
                <p className="text-gray-600">Major Achievements</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{instructor.martialArts.length}</h3>
                <p className="text-gray-600">Martial Arts Disciplines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* Philosophy */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Philosophy</h3>
                <blockquote className="text-lg text-gray-700 italic border-l-4 border-yellow-400 pl-6 leading-relaxed">
                  "{instructor.philosophy}"
                </blockquote>
              </div>

              {/* Experience */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience & Background</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{instructor.experience}</p>

                <h4 className="text-xl font-semibold text-gray-900 mb-4">Martial Arts Expertise</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {instructor.martialArts.map((art) => (
                    <div key={art} className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700">{art}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog Posts */}
              {blogPosts.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles by {instructor.name.split(' ')[0]}</h3>
                  <div className="space-y-6">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0">
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-gray-900 mb-2">
                                <Link href={`/blog/${post.slug}`} className="hover:text-yellow-400">
                                  {post.title}
                                </Link>
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{post.readTime} min read</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Certifications */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Certifications</h4>
                  <ul className="space-y-2">
                    {instructor.certifications.map((cert) => (
                      <li key={cert} className="flex items-start space-x-2">
                        <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Major Achievements</h4>
                  <ul className="space-y-2">
                    {instructor.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start space-x-2">
                        <Trophy className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Train with {instructor.name.split(' ')[0]}</h4>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700 text-sm">Unit 5/1-7 Jabez St, Marrickville</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700 text-sm">(042) 311 1999</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700 text-sm">info@marrickvillemartialartsclub.com.au</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700 text-sm">Mon-Sun: 7:00-9:30am, 4:00-9:30pm</span>
                    </div>
                  </div>

                  <BookingButton className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                    Book Your Free Trial
                  </BookingButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Train with {instructor.name.split(' ')[0]}?
          </h3>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Experience world-class {instructor.specialties.join(" and ")} instruction in a supportive, professional environment.
            Book your free trial class today and start your martial arts journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-8 py-3">
              Book Free Trial Class
            </BookingButton>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-yellow-400 px-8 py-3">
              View Class Schedule
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
