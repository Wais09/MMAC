import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { addDays, format, startOfWeek, endOfWeek } from "date-fns"

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

    // Get trainer's assigned classes
    const classes = await prisma.class.findMany({
      where: {
        trainerId,
        isActive: true
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })

    // For each class, calculate next class date and booking statistics
    const classesWithStats = await Promise.all(
      classes.map(async (classItem) => {
        // Calculate next class date
        const today = new Date()
        let nextClassDate = today

        // Find the next occurrence of this day of week
        while (nextClassDate.getDay() !== classItem.dayOfWeek) {
          nextClassDate = addDays(nextClassDate, 1)
        }

        // If today is the class day but the time has passed, get next week
        if (nextClassDate.getDay() === classItem.dayOfWeek && nextClassDate <= today) {
          const [hours, minutes] = classItem.startTime.split(':').map(Number)
          const classTime = new Date(nextClassDate)
          classTime.setHours(hours, minutes, 0, 0)

          if (classTime <= today) {
            nextClassDate = addDays(nextClassDate, 7)
          }
        }

        // Get bookings for next class
        const nextClassBookings = await prisma.booking.findMany({
          where: {
            classId: classItem.id,
            date: nextClassDate,
            status: {
              in: ['CONFIRMED', 'WAITLIST']
            }
          }
        })

        const confirmedBookings = nextClassBookings.filter(b => b.status === 'CONFIRMED').length
        const waitlistBookings = nextClassBookings.filter(b => b.status === 'WAITLIST').length

        // Calculate attendance rate for this class over the last 30 days
        const thirtyDaysAgo = addDays(today, -30)
        const pastAttendances = await prisma.attendance.findMany({
          where: {
            classId: classItem.id,
            date: {
              gte: thirtyDaysAgo,
              lte: today
            }
          }
        })

        const totalSessions = pastAttendances.length
        const attendedSessions = pastAttendances.filter(a => a.checkedIn).length
        const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0

        return {
          id: classItem.id,
          name: classItem.name,
          type: classItem.type,
          dayOfWeek: classItem.dayOfWeek,
          startTime: classItem.startTime,
          endTime: classItem.endTime,
          maxCapacity: classItem.maxCapacity,
          nextClassDate: format(nextClassDate, 'yyyy-MM-dd'),
          confirmedBookings,
          waitlistBookings,
          attendanceRate
        }
      })
    )

    return NextResponse.json(classesWithStats)
  } catch (error) {
    console.error("Error fetching trainer classes:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
