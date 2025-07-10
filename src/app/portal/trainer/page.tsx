"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  UserCheck,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Bell,
  BookOpen,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { format, isToday, isTomorrow, parseISO } from "date-fns"

interface TrainerClass {
  id: string
  name: string
  type: string
  dayOfWeek: number
  startTime: string
  endTime: string
  maxCapacity: number
  nextClassDate: string
  confirmedBookings: number
  waitlistBookings: number
  attendanceRate: number
}

interface TodaysClass {
  id: string
  name: string
  type: string
  date: string
  startTime: string
  endTime: string
  confirmedBookings: number
  attendanceCount: number
  maxCapacity: number
  status: 'upcoming' | 'in_progress' | 'completed'
}

interface TrainerStats {
  totalClasses: number
  totalStudents: number
  averageAttendance: number
  thisWeekClasses: number
  upcomingClasses: number
}

export default function TrainerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [classes, setClasses] = useState<TrainerClass[]>([])
  const [todaysClasses, setTodaysClasses] = useState<TodaysClass[]>([])
  const [stats, setStats] = useState<TrainerStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "TRAINER" && session?.user?.role !== "ADMIN") {
      router.push("/portal")
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch trainer's assigned classes
      const classesResponse = await fetch("/api/trainer/classes")
      if (classesResponse.ok) {
        const classesData = await classesResponse.json()
        setClasses(classesData)
      }

      // Fetch today's classes
      const todayResponse = await fetch("/api/trainer/todays-classes")
      if (todayResponse.ok) {
        const todayData = await todayResponse.json()
        setTodaysClasses(todayData)
      }

      // Fetch trainer stats
      const statsResponse = await fetch("/api/trainer/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
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

  const getNextClassDisplay = (dateString: string) => {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your trainer dashboard...</p>
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
                  Welcome back, Coach {session?.user?.firstName}!
                </h1>
                <p className="text-gray-600">Trainer Portal</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClasses || 0}</div>
              <p className="text-xs text-muted-foreground">
                Your assigned classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
              <p className="text-xs text-muted-foreground">
                Regular attendees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.averageAttendance || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Across all classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.thisWeekClasses || 0}</div>
              <p className="text-xs text-muted-foreground">
                Classes completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.upcomingClasses || 0}</div>
              <p className="text-xs text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today's Classes</CardTitle>
                    <CardDescription>Manage attendance and class progress</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/portal/trainer/attendance">Take Attendance</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {todaysClasses.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No classes today</h3>
                    <p className="text-gray-600">Enjoy your day off!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todaysClasses.map((classItem) => (
                      <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {classItem.startTime} - {classItem.endTime}
                            </div>
                            <Badge variant={classItem.status === 'completed' ? 'default' : 'secondary'}>
                              {classItem.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                            <p className="text-sm text-gray-600">
                              {classItem.attendanceCount}/{classItem.confirmedBookings} attended • {classItem.confirmedBookings}/{classItem.maxCapacity} booked
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {classItem.status === 'upcoming' && (
                            <Button size="sm" asChild>
                              <Link href={`/portal/trainer/class/${classItem.id}?date=${classItem.date}`}>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Manage Class
                              </Link>
                            </Button>
                          )}
                          {classItem.status === 'completed' && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/portal/trainer/class/${classItem.id}?date=${classItem.date}`}>
                                <BarChart3 className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Class Schedule */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/trainer/attendance">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Take Attendance
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/trainer/schedule">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/trainer/students">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/portal/trainer/progress">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Track Progress
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Your Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>Upcoming class schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {classes.slice(0, 5).map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{classItem.name}</h4>
                        <Badge size="sm" className={getClassTypeColor(classItem.type)}>
                          {formatClassType(classItem.type)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        {getDayName(classItem.dayOfWeek)}s {classItem.startTime}
                      </p>
                      <p className="text-xs text-gray-500">
                        Next: {getNextClassDisplay(classItem.nextClassDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {classItem.confirmedBookings}/{classItem.maxCapacity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {classItem.waitlistBookings > 0 && `+${classItem.waitlistBookings} waitlist`}
                      </div>
                    </div>
                  </div>
                ))}

                {classes.length > 5 && (
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/portal/trainer/schedule">View All Classes</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>Attendance rates by class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {classes.slice(0, 3).map((classItem) => (
                  <div key={classItem.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{classItem.name}</span>
                      <span>{classItem.attendanceRate}%</span>
                    </div>
                    <Progress value={classItem.attendanceRate} className="h-2" />
                  </div>
                ))}
                <Button asChild className="w-full" variant="outline">
                  <Link href="/portal/trainer/analytics">View Full Analytics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
