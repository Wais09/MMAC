"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { format, addDays, isSameDay, isAfter, startOfDay } from "date-fns"

interface ClassSchedule {
  id: string
  name: string
  type: string
  description: string
  dayOfWeek: number
  startTime: string
  endTime: string
  duration: number
  maxCapacity: number
  price: number
  trainer: {
    firstName: string
    lastName: string
    profileImage?: string
  }
  isActive: boolean
}

interface ClassInstance {
  classId: string
  date: string
  availableSpots: number
  waitlistCount: number
  bookingStatus: 'available' | 'full' | 'waitlist' | 'booked' | 'cancelled'
  userBookingId?: string
}

interface BookingData extends ClassSchedule {
  instances: ClassInstance[]
}

export default function BookClassPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [classes, setClasses] = useState<BookingData[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [selectedClassType, setSelectedClassType] = useState<string>("all")

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "MEMBER") {
      router.push("/portal")
      return
    }

    fetchClasses()
  }, [session, status, router, selectedDate])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/classes/available?date=${format(selectedDate, "yyyy-MM-dd")}`)
      if (!response.ok) throw new Error('Failed to fetch classes')

      const data = await response.json()
      setClasses(data)
    } catch (error) {
      console.error("Error fetching classes:", error)
      setError("Failed to load classes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBookClass = async (classId: string, date: string, isWaitlist = false) => {
    setBookingLoading(classId)
    setError("")

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId,
          date,
          isWaitlist
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Booking failed')
      }

      // Refresh classes to show updated availability
      await fetchClasses()

      // Show success message based on booking type
      setError("") // Clear any previous errors

    } catch (error: any) {
      setError(error.message || 'Booking failed. Please try again.')
    } finally {
      setBookingLoading(null)
    }
  }

  const handleCancelBooking = async (bookingId: string, classId: string) => {
    setBookingLoading(classId)

    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT'
      })

      if (!response.ok) {
        throw new Error('Failed to cancel booking')
      }

      await fetchClasses()
    } catch (error: any) {
      setError(error.message || 'Failed to cancel booking.')
    } finally {
      setBookingLoading(null)
    }
  }

  const getClassTypeColor = (type: string) => {
    const colors = {
      'BJJ': 'bg-blue-100 text-blue-800',
      'MUAY_THAI': 'bg-red-100 text-red-800',
      'MMA': 'bg-purple-100 text-purple-800',
      'WRESTLING': 'bg-green-100 text-green-800',
      'KIDS_BJJ': 'bg-orange-100 text-orange-800',
      'KIDS_MUAY_THAI': 'bg-pink-100 text-pink-800',
      'WOMENS_MUAY_THAI': 'bg-rose-100 text-rose-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatClassType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayOfWeek]
  }

  const getNextClassDate = (dayOfWeek: number, fromDate: Date) => {
    const today = startOfDay(fromDate)
    const daysUntilClass = (dayOfWeek - today.getDay() + 7) % 7
    return addDays(today, daysUntilClass === 0 ? 7 : daysUntilClass)
  }

  const filteredClasses = selectedClassType === "all"
    ? classes
    : classes.filter(cls => cls.type === selectedClassType)

  const classTypes = [...new Set(classes.map(cls => cls.type))]

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading classes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/portal/member">
                <Button variant="outline" size="sm">← Back to Dashboard</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Book a Class</h1>
                <p className="text-gray-600">Select and book your training sessions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium">{session?.user?.firstName}</p>
              </div>
              <Avatar>
                <AvatarImage src={session?.user?.profileImage || ""} />
                <AvatarFallback className="bg-yellow-400 text-black">
                  {session?.user?.firstName?.charAt(0)}{session?.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      disabled={(date) => isAfter(startOfDay(new Date()), date)}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Class Type Filter */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Filter by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={selectedClassType === "all" ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedClassType("all")}
                      >
                        All Classes
                      </Button>
                      {classTypes.map(type => (
                        <Button
                          key={type}
                          variant={selectedClassType === type ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedClassType(type)}
                        >
                          {formatClassType(type)}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Classes for Selected Date */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Classes for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </h2>
                  <p className="text-gray-600">
                    {filteredClasses.length} classes available
                  </p>
                </div>

                {filteredClasses.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled</h3>
                      <p className="text-gray-600">Try selecting a different date or class type.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredClasses.map((classItem) => {
                      const instance = classItem.instances.find(inst =>
                        isSameDay(new Date(inst.date), selectedDate)
                      )

                      if (!instance && !isSameDay(getNextClassDate(classItem.dayOfWeek, selectedDate), selectedDate)) {
                        return null
                      }

                      const actualInstance = instance || {
                        classId: classItem.id,
                        date: format(getNextClassDate(classItem.dayOfWeek, selectedDate), 'yyyy-MM-dd'),
                        availableSpots: classItem.maxCapacity,
                        waitlistCount: 0,
                        bookingStatus: 'available' as const
                      }

                      return (
                        <Card key={`${classItem.id}-${actualInstance.date}`} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-3">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {classItem.name}
                                  </h3>
                                  <Badge className={getClassTypeColor(classItem.type)}>
                                    {formatClassType(classItem.type)}
                                  </Badge>
                                  {actualInstance.bookingStatus === 'booked' && (
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Booked
                                    </Badge>
                                  )}
                                  {actualInstance.bookingStatus === 'waitlist' && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Waitlisted
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-gray-600 mb-4">{classItem.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {classItem.startTime} - {classItem.endTime}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Users className="w-4 h-4 mr-2" />
                                    {actualInstance.availableSpots}/{classItem.maxCapacity} spots
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <User className="w-4 h-4 mr-2" />
                                    {classItem.trainer.firstName} {classItem.trainer.lastName}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    ${classItem.price}
                                  </div>
                                </div>

                                {actualInstance.waitlistCount > 0 && (
                                  <div className="mt-3 text-sm text-orange-600">
                                    {actualInstance.waitlistCount} people on waitlist
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col space-y-2 ml-6">
                                {actualInstance.bookingStatus === 'booked' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => actualInstance.userBookingId &&
                                      handleCancelBooking(actualInstance.userBookingId, classItem.id)
                                    }
                                    disabled={bookingLoading === classItem.id}
                                  >
                                    {bookingLoading === classItem.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                      <XCircle className="w-4 h-4 mr-2" />
                                    )}
                                    Cancel
                                  </Button>
                                )}

                                {actualInstance.bookingStatus === 'waitlist' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => actualInstance.userBookingId &&
                                      handleCancelBooking(actualInstance.userBookingId, classItem.id)
                                    }
                                    disabled={bookingLoading === classItem.id}
                                  >
                                    {bookingLoading === classItem.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                      <XCircle className="w-4 h-4 mr-2" />
                                    )}
                                    Leave Waitlist
                                  </Button>
                                )}

                                {actualInstance.bookingStatus === 'available' && actualInstance.availableSpots > 0 && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleBookClass(classItem.id, actualInstance.date)}
                                    disabled={bookingLoading === classItem.id}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                                  >
                                    {bookingLoading === classItem.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                    )}
                                    Book Class
                                  </Button>
                                )}

                                {actualInstance.bookingStatus === 'available' && actualInstance.availableSpots === 0 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleBookClass(classItem.id, actualInstance.date, true)}
                                    disabled={bookingLoading === classItem.id}
                                  >
                                    {bookingLoading === classItem.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                      <Clock className="w-4 h-4 mr-2" />
                                    )}
                                    Join Waitlist
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <Badge className={getClassTypeColor(classItem.type)}>
                        {formatClassType(classItem.type)}
                      </Badge>
                    </div>
                    <CardDescription>{classItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium">
                          {getDayName(classItem.dayOfWeek)}s {classItem.startTime}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Trainer:</span>
                        <span className="font-medium">
                          {classItem.trainer.firstName} {classItem.trainer.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{classItem.maxCapacity} students</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">${classItem.price}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        const nextDate = getNextClassDate(classItem.dayOfWeek, new Date())
                        setSelectedDate(nextDate)
                        // Switch to calendar view to show this class
                        document.querySelector('[value="calendar"]')?.click()
                      }}
                    >
                      Book Next Class
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
