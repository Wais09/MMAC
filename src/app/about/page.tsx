"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Trophy } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Marrickville Martial Arts Club"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="text-yellow-400">Our Club</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Empowering Lives Through Martial Arts Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Marrickville Martial Arts Club, we believe in helping people become the best version
              of themselves through embracing the power and discipline of martial arts. By working
              together, gaining strength, courage, and having fun while we do it, we can all be our own heroes!
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We provide a supportive environment led by the nation's most recognizable and
              internationally awarded coaches, offering world-class instruction in Brazilian Jiu-Jitsu,
              Muay Thai, MMA, Wrestling, and specialized kids programs.
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Start Your Journey
            </Button>
          </div>
          <div className="relative h-96">
            <Image
              src="https://ext.same-assets.com/3814609060/2851098477.jpeg"
              alt="Training at Marrickville Martial Arts"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Building a supportive family where everyone helps each other grow and succeed.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Striving for the highest standards in instruction, technique, and personal development.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Respect</h3>
              <p className="text-gray-600">
                Treating everyone with dignity and fostering an inclusive, welcoming environment.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Growth</h3>
              <p className="text-gray-600">
                Encouraging continuous improvement in martial arts, fitness, and life skills.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Story
          </h2>
          <div className="space-y-8 text-lg text-gray-600">
            <p>
              Marrickville Martial Arts Club was founded with a simple yet powerful vision: to create
              a space where people of all ages and backgrounds could discover their inner strength
              through the transformative power of martial arts.
            </p>
            <p>
              Located in the vibrant heart of Marrickville, our club has grown from humble beginnings
              to become one of Sydney's premier martial arts training facilities. We pride ourselves
              on maintaining the traditional values of martial arts while embracing modern training
              methods and techniques.
            </p>
            <p>
              What sets us apart is our incredible team of world-class instructors, including multiple
              national and international champions who bring decades of experience and passion to
              every class. From our Brazilian Jiu-Jitsu black belts to our world champion wrestler
              Tsuchika Shimoyamada, our instructors are dedicated to helping you achieve your goals.
            </p>
            <p>
              Whether you're looking to get fit, learn self-defense, compete at the highest levels,
              or simply join a supportive community, Marrickville Martial Arts Club is here to
              help you discover what it means to be your own hero.
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Visit Our Club</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Location</h3>
              <div className="space-y-2 text-gray-300">
                <p>Unit 5/1-7 Jabez Street</p>
                <p>Marrickville NSW 2204</p>
                <p>5 minutes from Marrickville Station</p>
                <p>Free street parking available</p>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Opening Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Sunday</p>
                <p>Morning: 7:00 - 9:30 AM</p>
                <p>Evening: 4:00 - 9:30 PM</p>
                <p>Classes run throughout the day</p>
              </div>
            </Card>
          </div>
          <div className="mt-8">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black mr-4">
              Get Directions
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Take the first step towards becoming your own hero with a FREE trial class.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Link href="/styles">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Explore Our Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
