import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { startOfMonth, endOfMonth, addMonths, addDays } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    const today = new Date()
    const thisMonth = startOfMonth(today)
    const nextMonth = endOfMonth(today)
    const lastMonth = startOfMonth(addMonths(today, -1))
    const lastMonthEnd = endOfMonth(addMonths(today, -1))

    // Total members
    const totalMembers = await prisma.user.count({
      where: { role: 'MEMBER' }
    })

    // Active members (with active membership)
    const activeMembers = await prisma.user.count({
      where: {
        role: 'MEMBER',
        isActive: true,
        membershipEnd: {
          gte: today
        }
      }
    })

    // Total trainers
    const totalTrainers = await prisma.user.count({
      where: { role: 'TRAINER' }
    })

    // Revenue calculations
    const thisMonthPayments = await prisma.payment.findMany({
      where: {
        status: 'PAID',
        paidAt: {
          gte: thisMonth,
          lte: nextMonth
        }
      }
    })

    const lastMonthPayments = await prisma.payment.findMany({
      where: {
        status: 'PAID',
        paidAt: {
          gte: lastMonth,
          lte: lastMonthEnd
        }
      }
    })

    const monthlyRevenue = thisMonthPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const lastMonthRevenue = lastMonthPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const revenueGrowth = lastMonthRevenue > 0
      ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
      : 0

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true }
    })

    // Total classes
    const totalClasses = await prisma.class.count({
      where: { isActive: true }
    })

    // Total bookings this month
    const totalBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: thisMonth,
          lte: nextMonth
        }
      }
    })

    // Attendance rate calculation
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        date: {
          gte: addDays(today, -30)
        }
      }
    })

    const totalAttendanceRecords = attendanceRecords.length
    const checkedInRecords = attendanceRecords.filter(a => a.checkedIn).length
    const attendanceRate = totalAttendanceRecords > 0
      ? Math.round((checkedInRecords / totalAttendanceRecords) * 100)
      : 0

    // Membership distribution
    const membershipCounts = await prisma.user.groupBy({
      by: ['membershipType'],
      where: {
        role: 'MEMBER',
        isActive: true
      },
      _count: true
    })

    const membershipDistribution = membershipCounts.map(item => ({
      type: item.membershipType || 'FREE_TRIAL',
      count: item._count,
      percentage: activeMembers > 0 ? Math.round((item._count / activeMembers) * 100) : 0
    }))

    // Recent signups (today)
    const recentSignups = await prisma.user.count({
      where: {
        role: 'MEMBER',
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
      }
    })

    // Expiring memberships (next 7 days)
    const sevenDaysFromNow = addDays(today, 7)
    const expiringMemberships = await prisma.user.count({
      where: {
        role: 'MEMBER',
        isActive: true,
        membershipEnd: {
          gte: today,
          lte: sevenDaysFromNow
        }
      }
    })

    const stats = {
      totalMembers,
      activeMembers,
      totalTrainers,
      totalRevenue: totalRevenue._sum.amount || 0,
      monthlyRevenue,
      revenueGrowth,
      totalClasses,
      totalBookings,
      attendanceRate,
      membershipDistribution,
      recentSignups,
      expiringMemberships
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
