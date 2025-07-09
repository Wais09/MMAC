import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { addDays, format, parseISO, isSameDay } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get("date")
    const selectedDate = dateParam ? parseISO(dateParam) : new Date()

    // Get all active classes
    const classes = await prisma.class.findMany({
      where: {
        isActive: true
      },
      include: {
        trainer: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true
          }
        }
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })

    // For each class, calculate availability for the next 30 days
    const classesWithAvailability = await Promise.all(
      classes.map(async (classItem) => {
        const instances = []

        // Calculate instances for the next 30 days
        for (let i = 0; i < 30; i++) {
          const checkDate = addDays(new Date(), i)

          // Check if this date matches the class day of week
          if (checkDate.getDay() === classItem.dayOfWeek) {
            const dateString = format(checkDate, 'yyyy-MM-dd')

            // Get existing bookings for this class on this date
            const bookings = await prisma.booking.findMany({
              where: {
                classId: classItem.id,
                date: checkDate,
                status: {
                  in: ['CONFIRMED', 'WAITLIST']
                }
              },
              include: {
                member: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true
                  }
                }
              }
            })

            const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED')
            const waitlistBookings = bookings.filter(b => b.status === 'WAITLIST')
            const availableSpots = Math.max(0, classItem.maxCapacity - confirmedBookings.length)

            // Check if current user has a booking
            const userBooking = bookings.find(b => b.memberId === session.user.id)
            let bookingStatus: 'available' | 'full' | 'waitlist' | 'booked' | 'cancelled' = 'available'

            if (userBooking) {
              if (userBooking.status === 'CONFIRMED') {
                bookingStatus = 'booked'
              } else if (userBooking.status === 'WAITLIST') {
                bookingStatus = 'waitlist'
              }
            } else if (availableSpots === 0) {
              bookingStatus = 'full'
            }

            instances.push({
              classId: classItem.id,
              date: dateString,
              availableSpots,
              waitlistCount: waitlistBookings.length,
              bookingStatus,
              userBookingId: userBooking?.id
            })
          }
        }

        return {
          id: classItem.id,
          name: classItem.name,
          type: classItem.type,
          description: classItem.description,
          dayOfWeek: classItem.dayOfWeek,
          startTime: classItem.startTime,
          endTime: classItem.endTime,
          duration: classItem.duration,
          maxCapacity: classItem.maxCapacity,
          price: classItem.price,
          trainer: classItem.trainer,
          isActive: classItem.isActive,
          instances
        }
      })
    )

    // Filter classes that have instances on or after the selected date
    const relevantClasses = classesWithAvailability.filter(cls =>
      cls.instances.some(inst => {
        const instDate = parseISO(inst.date)
        return isSameDay(instDate, selectedDate) || instDate > selectedDate
      })
    )

    return NextResponse.json(relevantClasses)
  } catch (error) {
    console.error("Error fetching available classes:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
