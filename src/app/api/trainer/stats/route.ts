import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { startOfWeek, endOfWeek, addDays, startOfDay, endOfDay } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (session.user.role !== "TRAINER" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Trainer access required" },
        { status: 403 }
      )
    }

    const trainerId = session.user.id
    const today = new Date()

    // Get total classes assigned to this trainer
    const totalClasses = await prisma.class.count({
      where: {
        trainerId,
        isActive: true
      }
    })

    // Get unique students who have booked this trainer's classes in the last 30 days
    const thirtyDaysAgo = addDays(today, -30)
    const recentBookings = await prisma.booking.findMany({
      where: {
        class: {
          trainerId
        },
        date: {
          gte: thirtyDaysAgo
        },
        status: {
          in: ['CONFIRMED', 'WAITLIST']
        }
      },
      select: {
        memberId: true
      },
      distinct: ['memberId']
    })

    const totalStudents = recentBookings.length

    // Calculate average attendance across all trainer's classes
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        class: {
          trainerId
        },
        date: {
          gte: thirtyDaysAgo
        }
      }
    })

    const totalAttendanceRecords = attendanceRecords.length
    const checkedInRecords = attendanceRecords.filter(a => a.checkedIn).length
    const averageAttendance = totalAttendanceRecords > 0
      ? Math.round((checkedInRecords / totalAttendanceRecords) * 100)
      : 0

    // Get classes completed this week
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }) // Monday
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 }) // Sunday

    // Count attendances this week where trainer was present
    const thisWeekAttendances = await prisma.attendance.findMany({
      where: {
        class: {
          trainerId
        },
        date: {
          gte: weekStart,
          lte: weekEnd
        }
      },
      select: {
        classId: true,
        date: true
      },
      distinct: ['classId', 'date']
    })

    const thisWeekClasses = thisWeekAttendances.length

    // Get upcoming classes in the next 7 days
    const nextWeek = addDays(today, 7)

    // Get trainer's class schedule
    const trainerClasses = await prisma.class.findMany({
      where: {
        trainerId,
        isActive: true
      }
    })

    // Count how many class instances occur in the next 7 days
    let upcomingClasses = 0
    for (let i = 0; i < 7; i++) {
      const checkDate = addDays(today, i)
      const dayOfWeek = checkDate.getDay()

      const classesOnDay = trainerClasses.filter(c => c.dayOfWeek === dayOfWeek)
      upcomingClasses += classesOnDay.length
    }

    const stats = {
      totalClasses,
      totalStudents,
      averageAttendance,
      thisWeekClasses,
      upcomingClasses
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching trainer stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
