import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { addDays, format } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get bookings for the next 7 days
    const today = new Date()
    const nextWeek = addDays(today, 7)

    const upcomingBookings = await prisma.booking.findMany({
      where: {
        memberId: session.user.id,
        date: {
          gte: today,
          lte: nextWeek
        },
        status: {
          in: ["CONFIRMED", "WAITLIST"]
        }
      },
      include: {
        class: {
          include: {
            trainer: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: {
        date: "asc"
      }
    })

    // Transform the data for the frontend
    const formattedClasses = upcomingBookings.map(booking => ({
      id: booking.id,
      name: booking.class.name,
      type: booking.class.type,
      date: format(booking.date, "yyyy-MM-dd"),
      startTime: booking.class.startTime,
      endTime: booking.class.endTime,
      trainer: {
        firstName: booking.class.trainer?.firstName || "TBA",
        lastName: booking.class.trainer?.lastName || ""
      },
      status: booking.status
    }))

    return NextResponse.json(formattedClasses)
  } catch (error) {
    console.error("Error fetching upcoming classes:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
