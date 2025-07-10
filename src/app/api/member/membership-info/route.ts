import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import { differenceInDays, format } from "date-fns"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get user membership information
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        membershipType: true,
        membershipStart: true,
        membershipEnd: true,
        isActive: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const now = new Date()
    const daysRemaining = user.membershipEnd
      ? Math.max(0, differenceInDays(user.membershipEnd, now))
      : 0

    // Format membership type for display
    const formatMembershipType = (type: string | null) => {
      if (!type) return "Free Trial"

      switch (type) {
        case "KICK_STARTER":
          return "Kick Starter"
        case "TWO_X_PLAN":
          return "2X Plan"
        case "UNLIMITED":
          return "Unlimited"
        case "CASUAL":
          return "Casual"
        default:
          return type
      }
    }

    const membershipInfo = {
      type: formatMembershipType(user.membershipType),
      startDate: user.membershipStart ? format(user.membershipStart, "yyyy-MM-dd") : null,
      endDate: user.membershipEnd ? format(user.membershipEnd, "yyyy-MM-dd") : null,
      isActive: user.isActive && (user.membershipEnd ? user.membershipEnd > now : true),
      daysRemaining
    }

    return NextResponse.json(membershipInfo)
  } catch (error) {
    console.error("Error fetching membership info:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
