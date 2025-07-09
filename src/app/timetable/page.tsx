"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, Star } from "lucide-react"

export default function TimetablePage() {
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "7:00 - 8:00 AM", program: "Muay Thai", instructor: "Bastian Ayala", level: "All Levels" },
        { time: "4:00 - 4:40 PM", program: "Kids Ninja Warrior", instructor: "Kids Instructors", level: "Ages 5-12" },
        { time: "5:00 - 5:40 PM", program: "Kids BJJ", instructor: "Kids Instructors", level: "Ages 5-12" },
        { time: "6:00 - 7:30 PM", program: "BJJ No Gi", instructor: "Josh Allsopp", level: "All Levels" },
        { time: "6:30 - 7:30 PM", program: "Muay Thai", instructor: "Bastian Ayala", level: "All Levels" },
        { time: "7:30 - 9:00 PM", program: "Wrestling", instructor: "Tsuchika Shimoyamada", level: "All Levels" }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        { time: "4:00 - 4:40 PM", program: "Kids Muay Thai", instructor: "Kids Instructors", level: "Ages 5-12" },
        { time: "6:00 - 7:00 PM", program: "BJJ No Gi", instructor: "Josh Allsopp", level: "All Levels" },
        { time: "6:30 - 7:30 PM", program: "Muay Thai", instructor: "Bastian Ayala", level: "All Levels" },
        { time: "7:30 - 8:30 PM", program: "Mixed Martial Arts", instructor: "Antonio Mammarella", level: "All Levels" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { time: "5:00 - 5:40 PM", program: "Kids BJJ", instructor: "Kids Instructors", level: "Ages 5-12" },
        { time: "6:30 - 7:30 PM", program: "Muay Thai", instructor: "Bastian Ayala", level: "All Levels" },
        { time: "6:30 - 8:00 PM", program: "Wrestling", instructor: "Tsuchika Shimoyamada", level: "All Levels" }
      ]
    },
    {
      day: "Thursday",
      classes: [
        { time: "6:00 - 7:30 PM", program: "BJJ No Gi", instructor: "Josh Allsopp", level: "All Levels" },
        { time: "6:30 - 7:30 PM", program: "Women's Muay Thai", instructor: "Johana Reyes Lagos", level: "Women Only" },
        { time: "7:30 - 8:30 PM", program: "Mixed Martial Arts", instructor: "Antonio Mammarella", level: "All Levels" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { time: "5:30 - 6:30 PM", program: "Muay Thai Sparring", instructor: "Bastian Ayala", level: "Intermediate+" }
      ]
    },
    {
      day: "Saturday",
      classes: [
        { time: "7:00 - 8:00 AM", program: "Muay Thai/MMA", instructor: "Bastian Ayala & Antonio Mammarella", level: "All Levels" }
      ]
    }
  ]

  const getProgramColor = (program: string) => {
    if (program.includes("BJJ") || program.includes("Brazilian Jiu-Jitsu")) return "bg-blue-100 text-blue-800"
    if (program.includes("Muay Thai/MMA")) return "bg-orange-100 text-orange-800"
    if (program.includes("Muay Thai")) return "bg-red-100 text-red-800"
    if (program.includes("MMA") || program.includes("Mixed Martial Arts")) return "bg-purple-100 text-purple-800"
    if (program.includes("Wrestling")) return "bg-green-100 text-green-800"
    if (program.includes("Kids") || program.includes("Ninja Warrior")) return "bg-yellow-100 text-yellow-800"
    if (program.includes("Women")) return "bg-pink-100 text-pink-800"
    if (program.includes("Sparring")) return "bg-red-200 text-red-900"
    if (program.includes("TBA") || program.includes("To Be Announced")) return "bg-gray-100 text-gray-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="https://ext.same-assets.com/3814609060/274821222.jpeg"
          alt="Class Schedule"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Class <span className="text-yellow-400">Timetable</span>
            </h1>
            <p className="text-xl text-gray-200">
              Find the perfect class time for your schedule
            </p>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="bg-yellow-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Opening Hours</h2>
          <div className="grid md:grid-cols-2 gap-4 text-black">
            <div>
              <Clock className="w-6 h-6 inline mr-2" />
              <span className="font-semibold">Monday - Sunday</span>
            </div>
            <div>
              <span>7:00 - 9:30 AM & 4:00 - 9:30 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {schedule.map((day) => (
            <Card key={day.day} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {day.classes.map((classItem, index) => (
                    <div key={`${day.day}-${classItem.time}-${classItem.program}`} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="font-semibold text-gray-900">{classItem.time}</span>
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getProgramColor(classItem.program)}`}>
                            {classItem.program}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">{classItem.instructor}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">{classItem.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Program Legend */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Program Legend
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                Brazilian Jiu-Jitsu
              </span>
              <span className="text-gray-600">Ground fighting & submissions</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mr-3">
                Muay Thai
              </span>
              <span className="text-gray-600">Thai boxing & striking</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mr-3">
                Mixed Martial Arts
              </span>
              <span className="text-gray-600">Complete fighting system</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-3">
                Wrestling
              </span>
              <span className="text-gray-600">Olympic-style wrestling</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mr-3">
                Kids Programs
              </span>
              <span className="text-gray-600">BJJ, Muay Thai & Ninja Warrior (Ages 5-12)</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800 mr-3">
                Women's Classes
              </span>
              <span className="text-gray-600">Female-only sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Important Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">New Students</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• FREE trial class available for all programs</li>
                <li>• No experience necessary - beginners welcome</li>
                <li>• Arrive 15 minutes early for your first class</li>
                <li>• All equipment provided for trial classes</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Class Guidelines</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Classes may be modified based on attendance</li>
                <li>• Private lessons available by appointment</li>
                <li>• Competition training for dedicated students</li>
                <li>• Make-up classes available for missed sessions</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Book Your First Class?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Choose any class that fits your schedule and join us for a FREE trial session!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open('tel:+61423111999', '_self')}
            >
              Call (042) 311 1999
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
