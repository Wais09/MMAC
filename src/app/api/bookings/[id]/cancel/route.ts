import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../../lib/auth"
import { prisma } from "../../../../../../lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bookingId = params.id
    const userId = session.user.id

    // Find the booking and verify ownership
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        memberId: userId,
        status: {
          in: ['CONFIRMED', 'WAITLIST']
        }
      },
      include: {
        class: {
          select: {
            name: true,
            maxCapacity: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or you don't have permission to cancel it" },
        { status: 404 }
      )
    }

    const wasConfirmed = booking.status === 'CONFIRMED'

    // Cancel the booking
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        notes: 'Cancelled by member'
      }
    })

    // If this was a confirmed booking, try to promote someone from the waitlist
    if (wasConfirmed) {
      await promoteFromWaitlist(booking.classId, booking.date, booking.class.maxCapacity)
    }

    return NextResponse.json({
      message: `Successfully cancelled your booking for ${booking.class.name}`,
      bookingId: booking.id
    })
  } catch (error) {
    console.error("Error cancelling booking:", error)
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
      // Get the first waitlisted booking (first come, first served)
      const waitlistBooking = await prisma.booking.findFirst({
        where: {
          classId,
          date,
          status: 'WAITLIST'
        },
        orderBy: {
          createdAt: 'asc'
        },
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

      if (waitlistBooking) {
        // Promote the waitlisted member to confirmed
        await prisma.booking.update({
          where: { id: waitlistBooking.id },
          data: {
            status: 'CONFIRMED',
            notes: 'Promoted from waitlist due to cancellation'
          }
        })

        // TODO: Send notification email to member about promotion
        console.log(`Promoted ${waitlistBooking.member.firstName} ${waitlistBooking.member.lastName} from waitlist for ${waitlistBooking.class.name}`)
      }
    }
  } catch (error) {
    console.error("Error promoting from waitlist:", error)
  }
}
