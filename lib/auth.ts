import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { Role } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          profileImage: user.profileImage,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          firstName: token.firstName,
          lastName: token.lastName,
          profileImage: token.profileImage,
        }
      }
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup"
  }
}

// Helper functions for role checking
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy = {
    [Role.MEMBER]: 1,
    [Role.TRAINER]: 2,
    [Role.ADMIN]: 3
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export function isAdmin(userRole: Role): boolean {
  return userRole === Role.ADMIN
}

export function isTrainer(userRole: Role): boolean {
  return userRole === Role.TRAINER || userRole === Role.ADMIN
}

export function isMember(userRole: Role): boolean {
  return userRole === Role.MEMBER || userRole === Role.TRAINER || userRole === Role.ADMIN
}
