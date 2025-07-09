import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getAllInstructors } from "@/lib/instructors"
import { Button } from "@/components/ui/button"
import { BookingButton } from "@/components/BookingButton"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Star, Trophy } from "lucide-react"

export const metadata: Metadata = {
  title: "Expert Martial Arts Instructors | Marrickville Martial Arts Club",
  description: "Meet our world-class team of martial arts instructors specializing in BJJ, Muay Thai, MMA, and kids programs. Expert coaching in Sydney's premier martial arts gym.",
  keywords: "martial arts instructors, BJJ coaches, Muay Thai trainers, MMA instructors, Sydney martial arts, expert coaching, Marrickville",
  openGraph: {
    title: "Expert Martial Arts Instructors | Marrickville Martial Arts Club",
    description: "Meet our world-class team of martial arts instructors specializing in BJJ, Muay Thai, MMA, and kids programs.",
    images: [
      {
        url: "https://ext.same-assets.com/3814609060/274821222.jpeg",
        width: 1200,
        height: 630,
        alt: "Marrickville Martial Arts Club Instructors",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Martial Arts Instructors | Marrickville Martial Arts Club",
    description: "Meet our world-class team of martial arts instructors specializing in BJJ, Muay Thai, MMA, and kids programs.",
    images: ["https://ext.same-assets.com/3814609060/274821222.jpeg"],
  },
  alternates: {
    canonical: "https://marrickvillemartialartsclub.com.au/coaches",
  },
}

function CoachesSchema() {
  const instructors = getAllInstructors()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marrickville Martial Arts Club",
    "url": "https://marrickvillemartialartsclub.com.au",
    "employee": instructors.map(instructor => ({
      "@type": "Person",
      "name": instructor.name,
      "jobTitle": instructor.title,
      "description": instructor.bio,
      "image": instructor.image,
      "knowsAbout": instructor.specialties,
      "hasCredential": instructor.certifications,
      "award": instructor.achievements,
      "url": `https://marrickvillemartialartsclub.com.au/coaches/${instructor.slug}`
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function CoachesPage() {
  const instructors = getAllInstructors()

  return (
    <>
      <CoachesSchema />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Coaches</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Instructors
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Train with Australia's most respected martial arts instructors. Our team combines decades of experience,
            world-class credentials, and a passion for teaching to provide the highest quality martial arts education in Sydney.
          </p>
          <BookingButton className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 text-lg">
            Book Your Free Trial Class
          </BookingButton>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 h-full">
                  {/* Image */}
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src={instructor.image}
                      alt={`${instructor.name} - ${instructor.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                      <h4 className="text-lg text-yellow-400 mb-4">{instructor.title}</h4>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {instructor.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {instructor.bio}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">{instructor.yearsExperience}+ years experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">{instructor.achievements.length} major achievements</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">{instructor.martialArts.length} martial arts disciplines</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href={`/coaches/${instructor.slug}`} className="block">
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                          View Full Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                        Book Class with {instructor.name.split(' ')[0]}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Instructors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Instructors?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our team represents the highest level of martial arts instruction available in Australia.
              Here's what sets them apart:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">World-Class Experience</h3>
              <p className="text-gray-700">
                Our instructors have trained with the best in the world, competed at the highest levels,
                and bring international experience to every class.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Teaching Methods</h3>
              <p className="text-gray-700">
                Each instructor uses proven, systematic teaching methods that ensure rapid skill development
                while maintaining the highest safety standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Attention</h3>
              <p className="text-gray-700">
                Small class sizes and dedicated instructors mean you'll receive personalized feedback
                and guidance tailored to your individual goals and learning style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Credentials & Achievements
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our instructors' combined achievements speak for themselves:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-700">Combined Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-gray-700">Major Championships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-gray-700">Black Belts Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-700">Students Trained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Train with the Best?
          </h3>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Don't settle for ordinary instruction. Train with world-class martial arts experts who are committed
            to your success. Book your free trial class today and experience the Marrickville difference.
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
