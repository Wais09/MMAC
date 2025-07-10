import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Gallery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Photo <span className="text-yellow-400">Gallery</span>
            </h1>
            <p className="text-xl text-gray-200">
              See our community in action
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Gallery Coming Soon
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We're working on putting together an amazing photo gallery showcasing our classes,
          events, and community. Check back soon!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/about">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Learn About Us
            </Button>
          </Link>
          <Link href="/styles">
            <Button size="lg" variant="outline">
              View Our Programs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
