import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { parseISO } from "date-fns"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { classId, date, isWaitlist = false } = body

    if (!classId || !date) {
      return NextResponse.json(
        { error: "Class ID and date are required" },
        { status: 400 }
      )
    }

    const bookingDate = parseISO(date)
    const userId = session.user.id

    // Check if class exists and is active
    const classData = await prisma.class.findFirst({
      where: {
        id: classId,
        isActive: true
      }
    })

    if (!classData) {
      return NextResponse.json(
        { error: "Class not found or inactive" },
        { status: 404 }
      )
    }

    // Check if user already has a booking for this class on this date
    const existingBooking = await prisma.booking.findFirst({
      where: {
        memberId: userId,
        classId,
        date: bookingDate,
        status: {
          in: ['CONFIRMED', 'WAITLIST']
        }
      }
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: "You already have a booking for this class on this date" },
        { status: 400 }
      )
    }

    // Get current bookings for this class on this date
    const currentBookings = await prisma.booking.findMany({
      where: {
        classId,
        date: bookingDate,
        status: 'CONFIRMED'
      }
    })

    const availableSpots = classData.maxCapacity - currentBookings.length

    // Determine booking status
    let bookingStatus: 'CONFIRMED' | 'WAITLIST'

    if (isWaitlist || availableSpots <= 0) {
      bookingStatus = 'WAITLIST'
    } else {
      bookingStatus = 'CONFIRMED'
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        memberId: userId,
        classId,
        date: bookingDate,
        status: bookingStatus,
        notes: isWaitlist ? 'Joined waitlist' : undefined
      },
      include: {
        class: {
          select: {
            name: true,
            startTime: true,
            endTime: true
          }
        }
      }
    })

    // If this is a waitlist booking, check if we should promote anyone from waitlist to confirmed
    if (bookingStatus === 'CONFIRMED') {
      await promoteFromWaitlist(classId, bookingDate, classData.maxCapacity)
    }

    const responseMessage = bookingStatus === 'CONFIRMED'
      ? `Successfully booked ${booking.class.name} for ${date}`
      : `You've been added to the waitlist for ${booking.class.name} on ${date}`

    return NextResponse.json({
      message: responseMessage,
      booking: {
        id: booking.id,
        status: booking.status,
        classId: booking.classId,
        date: booking.date,
        className: booking.class.name,
        startTime: booking.class.startTime,
        endTime: booking.class.endTime
      }
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Helper function to promote people from waitlist when spots become available
async function promoteFromWaitlist(classId: string, date: Date, maxCapacity: number) {
  try {
    // Get current confirmed bookings
    const confirmedBookings = await prisma.booking.findMany({
      where: {
        classId,
        date,
        status: 'CONFIRMED'
      }
    })

    const availableSpots = maxCapacity - confirmedBookings.length

    if (availableSpots > 0) {
      // Get waitlisted bookings ordered by creation date (first come, first served)
      const waitlistBookings = await prisma.booking.findMany({
        where: {
          classId,
          date,
          status: 'WAITLIST'
        },
        orderBy: {
          createdAt: 'asc'
        },
        take: availableSpots,
        include: {
          member: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          },
          class: {
            select: {
              name: true,
              startTime: true,
              endTime: true
            }
          }
        }
      })

      // Promote waitlisted members to confirmed
      for (const booking of waitlistBookings) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: 'CONFIRMED',
            notes: 'Promoted from waitlist'
          }
        })

        // TODO: Send notification email to member about promotion
        console.log(`Promoted ${booking.member.firstName} ${booking.member.lastName} from waitlist for ${booking.class.name}`)
      }
    }
  } catch (error) {
    console.error("Error promoting from waitlist:", error)
  }
}
