import { Role } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      firstName?: string | null
      lastName?: string | null
      role: Role
      profileImage?: string | null
    }
  }

  interface User {
    role: Role
    firstName?: string | null
    lastName?: string | null
    profileImage?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    firstName?: string | null
    lastName?: string | null
    profileImage?: string | null
  }
}
