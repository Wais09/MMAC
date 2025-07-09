import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { format, startOfDay, endOfDay } from "date-fns"

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
    const todayDayOfWeek = today.getDay()

    // Get trainer's classes that are scheduled for today
    const todaysClasses = await prisma.class.findMany({
      where: {
        trainerId,
        dayOfWeek: todayDayOfWeek,
        isActive: true
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    // For each class, get booking and attendance information
    const classesWithDetails = await Promise.all(
      todaysClasses.map(async (classItem) => {
        const todayDateString = format(today, 'yyyy-MM-dd')

        // Get bookings for today
        const bookings = await prisma.booking.findMany({
          where: {
            classId: classItem.id,
            date: startOfDay(today),
            status: 'CONFIRMED'
          }
        })

        // Get attendance for today
        const attendances = await prisma.attendance.findMany({
          where: {
            classId: classItem.id,
            date: startOfDay(today),
            checkedIn: true
          }
        })

        // Determine class status based on current time
        const [startHours, startMinutes] = classItem.startTime.split(':').map(Number)
        const [endHours, endMinutes] = classItem.endTime.split(':').map(Number)

        const classStartTime = new Date(today)
        classStartTime.setHours(startHours, startMinutes, 0, 0)

        const classEndTime = new Date(today)
        classEndTime.setHours(endHours, endMinutes, 0, 0)

        const now = new Date()
        let status: 'upcoming' | 'in_progress' | 'completed'

        if (now < classStartTime) {
          status = 'upcoming'
        } else if (now >= classStartTime && now <= classEndTime) {
          status = 'in_progress'
        } else {
          status = 'completed'
        }

        return {
          id: classItem.id,
          name: classItem.name,
          type: classItem.type,
          date: todayDateString,
          startTime: classItem.startTime,
          endTime: classItem.endTime,
          confirmedBookings: bookings.length,
          attendanceCount: attendances.length,
          maxCapacity: classItem.maxCapacity,
          status
        }
      })
    )

    return NextResponse.json(classesWithDetails)
  } catch (error) {
    console.error("Error fetching today's classes:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
