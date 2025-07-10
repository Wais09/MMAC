import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "../../../../../lib/prisma"
import { Role, type MembershipType } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      emergencyRelationship,
      membershipType,
      waiverSigned
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        emergencyContactName,
        emergencyContactPhone,
        emergencyRelationship,
        membershipType: membershipType as MembershipType || null,
        waiverSigned,
        waiverSignedDate: waiverSigned ? new Date() : null,
        role: Role.MEMBER,
        isActive: true,
        membershipStart: new Date(), // Start trial immediately
        membershipEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days trial
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
