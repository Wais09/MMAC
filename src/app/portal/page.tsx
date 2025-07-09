"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Users, Settings } from "lucide-react"

export default function PortalLanding() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    // Redirect based on user role
    if (session?.user) {
      switch (session.user.role) {
        case "ADMIN":
          router.push("/portal/admin")
          break
        case "TRAINER":
          router.push("/portal/trainer")
          break
        case "MEMBER":
          router.push("/portal/member")
          break
        default:
          // Keep them on this page if role is unclear
          break
      }
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to access the member portal</p>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Fallback content if no automatic redirect happened
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link href="/">
            <img
              className="mx-auto h-16 w-auto mb-6"
              src="/logo.png"
              alt="Marrickville Martial Arts Club"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to MMAC Portal
          </h1>
          <p className="text-lg text-gray-600">
            Select your portal based on your role
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <User className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle>Member Portal</CardTitle>
              <CardDescription>
                Book classes, track progress, manage payments
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/portal/member">
                <Button className="w-full">Access Member Portal</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle>Trainer Portal</CardTitle>
              <CardDescription>
                Manage classes, track student progress
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/portal/trainer">
                <Button className="w-full">Access Trainer Portal</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Settings className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>
                System management, analytics, user administration
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/portal/admin">
                <Button className="w-full">Access Admin Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← Back to main website
          </Link>
        </div>
      </div>
    </div>
  )
}
