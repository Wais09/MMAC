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
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  UserPlus,
  UserCheck,
  AlertTriangle,
  BarChart3,
  Settings,
  CreditCard,
  Target,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface AdminStats {
  totalMembers: number
  activeMembers: number
  totalTrainers: number
  totalRevenue: number
  monthlyRevenue: number
  revenueGrowth: number
  totalClasses: number
  totalBookings: number
  attendanceRate: number
  membershipDistribution: {
    type: string
    count: number
    percentage: number
  }[]
  recentSignups: number
  expiringMemberships: number
}

interface RecentActivity {
  id: string
  type: 'signup' | 'booking' | 'payment' | 'cancellation'
  user: {
    firstName: string
    lastName: string
    email: string
  }
  details: string
  timestamp: string
  amount?: number
}

interface MembershipAlert {
  id: string
  type: 'expiring' | 'payment_failed' | 'inactive'
  user: {
    firstName: string
    lastName: string
    email: string
  }
  message: string
  priority: 'high' | 'medium' | 'low'
  daysUntilAction: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [membershipAlerts, setMembershipAlerts] = useState<MembershipAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/portal")
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch admin statistics
      const statsResponse = await fetch("/api/admin/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent activity
      const activityResponse = await fetch("/api/admin/recent-activity")
      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        setRecentActivity(activityData)
      }

      // Fetch membership alerts
      const alertsResponse = await fetch("/api/admin/membership-alerts")
      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json()
        setMembershipAlerts(alertsData)
      }
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup': return <UserPlus className="w-4 h-4 text-green-600" />
      case 'booking': return <Calendar className="w-4 h-4 text-blue-600" />
      case 'payment': return <DollarSign className="w-4 h-4 text-green-600" />
      case 'cancellation': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-orange-500 bg-orange-50'
      case 'low': return 'border-yellow-500 bg-yellow-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">System Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/portal/admin/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalMembers || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeMembers || 0} active members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats?.monthlyRevenue || 0)}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.revenueGrowth ? `+${stats.revenueGrowth}%` : '0%'} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.attendanceRate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Across all classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        {membershipAlerts.length > 0 && (
          <div className="mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  <CardTitle className="text-orange-800">Membership Alerts</CardTitle>
                  <Badge variant="secondary" className="ml-2">{membershipAlerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {membershipAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.priority)}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">
                            {alert.user.firstName} {alert.user.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                        </div>
                        <Badge variant={alert.priority === 'high' ? 'destructive' : 'secondary'}>
                          {alert.daysUntilAction} days
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {membershipAlerts.length > 3 && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/portal/admin/alerts">View All Alerts ({membershipAlerts.length})</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/portal/admin/members">
                      <Users className="w-6 h-6 mb-2" />
                      Manage Members
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/portal/admin/payments">
                      <CreditCard className="w-6 h-6 mb-2" />
                      Payments
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/portal/admin/classes">
                      <Calendar className="w-6 h-6 mb-2" />
                      Class Schedule
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link href="/portal/admin/reports">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Reports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Membership Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Distribution</CardTitle>
                <CardDescription>Breakdown of membership types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.membershipDistribution?.map((membership) => (
                    <div key={membership.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium capitalize">
                          {membership.type.replace('_', ' ').toLowerCase()}
                        </span>
                        <span>{membership.count} members ({membership.percentage}%)</span>
                      </div>
                      <Progress value={membership.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Active Members</span>
                    <span>{stats?.activeMembers || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activity and member actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  ) : (
                    recentActivity.slice(0, 8).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {activity.user.firstName} {activity.user.lastName}
                              </p>
                              <p className="text-sm text-gray-600">{activity.details}</p>
                            </div>
                            <div className="text-right">
                              {activity.amount && (
                                <p className="text-sm font-medium text-green-600">
                                  {formatCurrency(activity.amount)}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                {format(new Date(activity.timestamp), 'MMM d, HH:mm')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {recentActivity.length > 8 && (
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/portal/admin/activity">View All Activity</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Payment System</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email Service</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup Status</span>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Current</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Signups</span>
                  <span className="font-medium">{stats?.recentSignups || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expiring Soon</span>
                  <span className="font-medium">{stats?.expiringMemberships || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Trainers</span>
                  <span className="font-medium">{stats?.totalTrainers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Classes</span>
                  <span className="font-medium">{stats?.totalClasses || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Links */}
            <Card>
              <CardHeader>
                <CardTitle>Administration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/portal/admin/members">
                    <Users className="w-4 h-4 mr-2" />
                    Member Management
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/portal/admin/trainers">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Trainer Management
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/portal/admin/analytics">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics & Reports
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/portal/admin/clubworx">
                    <Target className="w-4 h-4 mr-2" />
                    ClubWorx Import
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/portal/admin/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
