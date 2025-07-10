"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Train, Car } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Contact Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-200">
              Get in touch and start your martial arts journey today
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 bg-white">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">
                Unit 5/1-7 Jabez Street<br />
                Marrickville NSW 2204
              </p>
            </Card>
            <Card className="text-center p-6 bg-white">
              <Phone className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">
                <Button
                  variant="link"
                  className="text-gray-600 p-0 h-auto"
                  onClick={() => window.open('tel:+61423111999', '_self')}
                >
                  (042) 311 1999
                </Button>
              </p>
            </Card>
            <Card className="text-center p-6 bg-white">
              <Mail className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">
                <a
                  href="mailto:info@marrickvillemartialartsclub.com.au"
                  className="hover:text-yellow-600 break-words text-xs sm:text-sm"
                >
                  info@marrickvillemartialartsclub.com.au
                </a>
              </p>
            </Card>
            <Card className="text-center p-6 bg-white">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon-Sun<br />
                7AM-9:30AM & 4PM-9:30PM
              </p>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
              <p className="text-gray-600">
                Have questions or ready to book your FREE trial? Get in touch and we'll respond within 24 hours!
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input placeholder="Your first name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input placeholder="Your last name" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Interest
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                    <option value="">Select a program (optional)</option>
                    <option value="bjj">Brazilian Jiu-Jitsu (BJJ)</option>
                    <option value="muay-thai">Muay Thai</option>
                    <option value="mma">Mixed Martial Arts (MMA)</option>
                    <option value="wrestling">Wrestling</option>
                    <option value="kids">Kids Programs</option>
                    <option value="womens">Women's Muay Thai</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Tell us about your goals, experience level, or any questions you have..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  Send Message
                </Button>
                <p className="text-sm text-gray-500">
                  * Required fields. We&apos;ll get back to you within 24 hours!
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Location & Getting Here */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Visit Our Club</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Google Maps Embed */}
                <div className="mb-6 rounded-lg overflow-hidden border-4 border-yellow-400 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.741895180147!2d151.15137737652067!3d-33.90247597323076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1b4f1234567%3A0x123456789abcdef0!2sUnit%205%2F1-7%20Jabez%20St%2C%20Marrickville%20NSW%202204%2C%20Australia!5e0!3m2!1sen!2sau!4v1735000000000!5m2!1sen!2sau"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Marrickville Martial Arts Club Location - Unit 5/1-7 Jabez Street, Marrickville NSW 2204"
                    className="w-full h-96"
                  />
                </div>

                {/* Map Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://www.google.com/maps/search/Unit+5%2F1-7+Jabez+Street,+Marrickville+NSW+2204,+Australia', '_blank')}
                    className="font-semibold text-xs"
                  >
                    🗺️ Google Maps
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://maps.apple.com/?q=Unit+5/1-7+Jabez+Street,+Marrickville+NSW+2204,+Australia', '_blank')}
                    className="font-semibold text-xs"
                  >
                    🍎 Apple Maps
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://waze.com/ul?q=Unit+5/1-7+Jabez+Street,+Marrickville+NSW+2204,+Australia', '_blank')}
                    className="font-semibold text-xs"
                  >
                    🚗 Waze
                  </Button>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Unit 5/1-7 Jabez Street</p>
                      <p className="text-gray-600">Marrickville NSW 2204</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Train className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Public Transport</p>
                      <p className="text-gray-600">5 minutes walk from Marrickville Station</p>
                      <p className="text-gray-600">Multiple bus routes nearby</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Car className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Parking</p>
                      <p className="text-gray-600">Free street parking available</p>
                      <p className="text-gray-600">Easy access from main roads</p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <Button
                  className="w-full mt-6 bg-black hover:bg-gray-800 text-white"
                  onClick={() => window.open('https://www.google.com/maps/dir//Unit+5%2F1-7+Jabez+Street,+Marrickville+NSW+2204,+Australia', '_blank')}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  onClick={() => window.open('tel:+61423111999', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (042) 311 1999
                </Button>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('https://wa.me/61423111999?text=Hi! I\'m interested in learning more about martial arts classes at Marrickville Martial Arts Club.', '_blank')}
                >
                  WhatsApp Us
                </Button>
                <Link href="/styles" className="block">
                  <Button variant="outline" className="w-full">
                    Browse Our Programs
                  </Button>
                </Link>
                <Link href="/timetable" className="block">
                  <Button variant="outline" className="w-full">
                    View Class Schedule
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Common Questions Before Visiting
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What should I bring?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Just comfortable workout clothes and a water bottle. We provide all equipment for trial classes.
              </p>
              <Link href="/faq">
                <Button variant="link" className="text-yellow-600 p-0">
                  Learn More →
                </Button>
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How much does it cost?</h3>
              <p className="text-gray-600 text-sm mb-4">
                FREE trial class! Memberships start from $30/week with no lock-in contracts.
              </p>
              <Link href="/membership">
                <Button variant="link" className="text-yellow-600 p-0">
                  See Pricing →
                </Button>
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Complete beginner?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Perfect! 90% of our students start with zero experience. Our instructors specialize in teaching beginners.
              </p>
              <Link href="/faq">
                <Button variant="link" className="text-yellow-600 p-0">
                  Read FAQ →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Don&apos;t wait - your first class is FREE! Contact us today and discover what martial arts can do for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call Now - (042) 311 1999
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Learn About Our Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
