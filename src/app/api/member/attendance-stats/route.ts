import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { subDays, isAfter } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const thirtyDaysAgo = subDays(new Date(), 30)

    // Get all attendances in the last 30 days
    const attendances = await prisma.attendance.findMany({
      where: {
        memberId: userId,
        date: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: {
        date: "desc"
      }
    })

    // Get all bookings in the last 30 days for comparison
    const bookings = await prisma.booking.findMany({
      where: {
        memberId: userId,
        date: {
          gte: thirtyDaysAgo
        }
      }
    })

    const totalClasses = bookings.length
    const attendedClasses = attendances.filter(a => a.checkedIn).length
    const attendanceRate = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0

    // Calculate current streak (consecutive days with attendance)
    let currentStreak = 0
    const sortedAttendances = attendances
      .filter(a => a.checkedIn)
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    if (sortedAttendances.length > 0) {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)

      // Check if there's an attendance today or yesterday to start the streak
      const latestAttendance = sortedAttendances[0]
      const latestAttendanceDate = new Date(latestAttendance.date)
      latestAttendanceDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((currentDate.getTime() - latestAttendanceDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff <= 1) {
        // Start counting from the latest attendance
        currentStreak = 1
        let checkDate = new Date(latestAttendanceDate)

        for (let i = 1; i < sortedAttendances.length; i++) {
          const attendanceDate = new Date(sortedAttendances[i].date)
          attendanceDate.setHours(0, 0, 0, 0)

          const expectedDate = new Date(checkDate)
          expectedDate.setDate(expectedDate.getDate() - 1)

          if (attendanceDate.getTime() === expectedDate.getTime()) {
            currentStreak++
            checkDate = attendanceDate
          } else {
            break
          }
        }
      }
    }

    const stats = {
      totalClasses,
      attendedClasses,
      attendanceRate,
      currentStreak
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching attendance stats:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
