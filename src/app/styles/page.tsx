"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const martialArtsStyles = [
  {
    title: "Brazilian Jiu-Jitsu (BJJ)",
    slug: "bjj",
    description: "Ground fighting and submission grappling. Known as 'human chess', BJJ focuses on technique over strength.",
    benefits: ["Self-defense skills", "Mental strategy", "Full-body workout", "Stress relief"],
    image: "https://ext.same-assets.com/3814609060/2851098477.jpeg",
    instructors: "Ari Tabak, Felipe Silva, Josh Allsopp"
  },
  {
    title: "Muay Thai",
    slug: "muay-thai",
    description: "The art of eight limbs. Traditional Thai boxing using punches, kicks, knees, and elbows.",
    benefits: ["Cardiovascular fitness", "Self-defense", "Mental discipline", "Stress relief"],
    image: "https://ext.same-assets.com/3814609060/3027934024.jpeg",
    instructors: "Felipe Silva, Bastian Ayala"
  },
  {
    title: "Mixed Martial Arts (MMA)",
    slug: "mma",
    description: "Complete fighting system combining striking, grappling, and ground fighting techniques.",
    benefits: ["Complete martial arts education", "Competition preparation", "Versatile skills", "Peak fitness"],
    image: "https://ext.same-assets.com/3814609060/1633847439.jpeg",
    instructors: "All instructors"
  },
  {
    title: "Wrestling",
    slug: "wrestling",
    description: "Olympic-style wrestling with world champion instruction. Focus on takedowns, control, and mental toughness.",
    benefits: ["Strength & conditioning", "Mental resilience", "Balance & coordination", "Competition skills"],
    image: "https://ext.same-assets.com/3814609060/1572477315.jpeg",
    instructors: "Tsuchika Shimoyamada"
  },
  {
    title: "Kids Programs",
    slug: "kids",
    description: "Age-appropriate martial arts for children 5+. Focus on character development and confidence building.",
    benefits: ["Confidence building", "Discipline", "Anti-bullying skills", "Physical fitness"],
    image: "https://ext.same-assets.com/3814609060/2277852474.jpeg",
    instructors: "All instructors"
  },
  {
    title: "Women's Muay Thai",
    slug: "womens-muay-thai",
    description: "Women-only Muay Thai classes in a supportive, empowering environment led by Johana Reyes Lagos.",
    benefits: ["Women-only environment", "Self-defense", "Fitness & strength", "Confidence building"],
    image: "https://ext.same-assets.com/3814609060/4056987022.jpeg",
    instructors: "Johana Reyes Lagos"
  }
]

export default function StylesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Martial Arts <span className="text-yellow-400">Styles</span>
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of martial arts programs. From traditional disciplines to modern combat sports,
            find the perfect style to match your goals and interests.
          </p>
        </div>
      </div>

      {/* Styles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {martialArtsStyles.map((style) => (
            <Card key={style.slug} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-bold">{style.title}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{style.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {style.benefits.map((benefit, index) => (
                      <li key={`${style.slug}-benefit-${index}`} className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Instructors:</h4>
                  <p className="text-sm text-gray-600">{style.instructors}</p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/styles/${style.slug}`} className="flex-1">
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                      Learn More
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full flex-1"
                    onClick={() => window.open('https://app.clubworx.com/s/K5XfztjN', '_blank')}
                  >
                    Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Martial Arts Journey?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Book a FREE trial class in any of our programs. No experience necessary!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Book Online
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
