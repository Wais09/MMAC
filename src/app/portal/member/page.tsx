"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, TrendingUp, BookOpen, CreditCard, User, Bell } from "lucide-react"
import Link from "next/link"
import { format, isToday, isTomorrow, parseISO } from "date-fns"

interface UpcomingClass {
  id: string
  name: string
  type: string
  date: string
  startTime: string
  endTime: string
  trainer: {
    firstName: string
    lastName: string
  }
  status: string
}

interface AttendanceStats {
  totalClasses: number
  attendedClasses: number
  attendanceRate: number
  currentStreak: number
}

interface MembershipInfo {
  type: string
  startDate: string
  endDate: string
  isActive: boolean
  daysRemaining: number
}

export default function MemberDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([])
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null)
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "MEMBER") {
      // Redirect based on role
      if (session?.user?.role === "ADMIN") {
        router.push("/portal/admin")
      } else if (session?.user?.role === "TRAINER") {
        router.push("/portal/trainer")
      }
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch upcoming classes
      const classesResponse = await fetch("/api/member/upcoming-classes")
      if (classesResponse.ok) {
        const classesData = await classesResponse.json()
        setUpcomingClasses(classesData)
      }

      // Fetch attendance stats
      const statsResponse = await fetch("/api/member/attendance-stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setAttendanceStats(statsData)
      }

      // Fetch membership info
      const membershipResponse = await fetch("/api/member/membership-info")
      if (membershipResponse.ok) {
        const membershipData = await membershipResponse.json()
        setMembershipInfo(membershipData)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDateDisplay = (dateString: string) => {
    const date = parseISO(dateString)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "EEE, MMM d")
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <img src="/logo.png" alt="MMAC" className="h-10 w-10" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session?.user?.firstName}!
                </h1>
                <p className="text-gray-600">Member Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarImage src={session?.user?.profileImage || ""} />
                <AvatarFallback className="bg-yellow-400 text-black">
                  {getInitials(session?.user?.firstName, session?.user?.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceStats ? `${attendanceStats.attendanceRate}%` : "0%"}
              </div>
              <p className="text-xs text-muted-foreground">
                {attendanceStats ? `${attendanceStats.attendedClasses}/${attendanceStats.totalClasses} classes` : "No data"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceStats?.currentStreak || 0} days
              </div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membership</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {membershipInfo?.type || "Free Trial"}
              </div>
              <p className="text-xs text-muted-foreground">
                {membershipInfo?.daysRemaining} days remaining
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingClasses.length > 0 ? getDateDisplay(upcomingClasses[0].date) : "None"}
              </div>
              <p className="text-xs text-muted-foreground">
                {upcomingClasses.length > 0 ? `${upcomingClasses[0].startTime} - ${upcomingClasses[0].name}` : "Book a class"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>Your scheduled classes for the next 7 days</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/portal/member/book-class">Book Class</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingClasses.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming classes</h3>
                    <p className="text-gray-600 mb-4">Book your next class to continue your training journey</p>
                    <Button asChild>
                      <Link href="/portal/member/book-class">Book Your First Class</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingClasses.map((classItem) => (
                      <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {getDateDisplay(classItem.date)}
                            </div>
                            <div className="text-xs text-gray-600">
                              {classItem.startTime} - {classItem.endTime}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                            <p className="text-sm text-gray-600">
                              with {classItem.trainer.firstName} {classItem.trainer.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={classItem.status === "CONFIRMED" ? "default" : "secondary"}>
                            {classItem.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/member/book-class">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Class
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/member/profile">
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/member/attendance">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Attendance
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/member/payments">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Payments
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Your martial arts journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>BJJ Progress</span>
                    <span>White Belt</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Muay Thai Progress</span>
                    <span>Beginner</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/portal/member/progress">View Full Progress</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Membership Status */}
            {membershipInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Membership Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Plan</span>
                      <span className="font-medium">{membershipInfo.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant={membershipInfo.isActive ? "default" : "destructive"}>
                        {membershipInfo.isActive ? "Active" : "Expired"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Days Remaining</span>
                      <span className="font-medium">{membershipInfo.daysRemaining}</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/portal/member/membership">Manage Membership</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
