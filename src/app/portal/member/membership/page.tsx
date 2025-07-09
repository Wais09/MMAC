"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loadStripe } from '@stripe/stripe-js'
import {
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react"
import Link from "next/link"
import { format, addDays, differenceInDays } from "date-fns"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface MembershipInfo {
  type: string
  startDate: string
  endDate: string
  isActive: boolean
  daysRemaining: number
  status: string
}

interface PaymentHistory {
  id: string
  amount: number
  currency: string
  description: string
  status: string
  paidAt: string
  periodStart?: string
  periodEnd?: string
}

interface MembershipPlan {
  id: string
  name: string
  price: number
  interval: string
  description: string
  features: string[]
  recommended?: boolean
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'KICK_STARTER',
    name: 'Kick Starter',
    price: 30,
    interval: 'week',
    description: 'Perfect for beginners',
    features: ['1 class per week', 'All martial arts styles', 'Equipment provided', 'Beginner friendly']
  },
  {
    id: 'TWO_X_PLAN',
    name: '2X Plan',
    price: 40,
    interval: 'week',
    description: 'Most popular choice',
    features: ['2 classes per week', 'All martial arts styles', 'Equipment provided', 'Faster progress'],
    recommended: true
  },
  {
    id: 'UNLIMITED',
    name: 'Unlimited',
    price: 55,
    interval: 'week',
    description: 'For dedicated practitioners',
    features: ['Unlimited classes', 'All martial arts styles', 'Equipment provided', 'Maximum flexibility', 'Competition training']
  },
  {
    id: 'CASUAL',
    name: 'Casual',
    price: 35,
    interval: 'class',
    description: 'Pay as you go',
    features: ['Pay per class', 'No commitment', 'All martial arts styles', 'Perfect for trying out']
  }
]

export default function MembershipPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.role !== "MEMBER") {
      router.push("/portal")
      return
    }

    fetchMembershipData()
  }, [session, status, router])

  const fetchMembershipData = async () => {
    try {
      setLoading(true)

      // Fetch membership info
      const membershipResponse = await fetch("/api/member/membership-info")
      if (membershipResponse.ok) {
        const membershipData = await membershipResponse.json()
        setMembershipInfo(membershipData)
      }

      // Fetch payment history
      const paymentsResponse = await fetch("/api/member/payments")
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json()
        setPaymentHistory(paymentsData)
      }
    } catch (error) {
      console.error("Error fetching membership data:", error)
      setError("Failed to load membership information")
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    try {
      setProcessingPayment(true)
      setError("")
      setSuccess("")

      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipType: planId })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process membership change')
      }

      if (planId === 'CASUAL') {
        setSuccess(result.message)
        await fetchMembershipData()
        return
      }

      // For subscription plans, redirect to Stripe Checkout or handle payment
      if (result.clientSecret) {
        const stripe = await stripePromise
        if (stripe) {
          const { error } = await stripe.confirmCardPayment(result.clientSecret)

          if (error) {
            throw new Error(error.message)
          } else {
            setSuccess(`Successfully upgraded to ${result.membershipType}!`)
            await fetchMembershipData()
          }
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to process membership change')
    } finally {
      setProcessingPayment(false)
    }
  }

  const getMembershipStatusColor = (isActive: boolean, daysRemaining: number) => {
    if (!isActive) return 'text-red-600'
    if (daysRemaining <= 3) return 'text-orange-600'
    if (daysRemaining <= 7) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getMembershipStatusText = (isActive: boolean, daysRemaining: number) => {
    if (!isActive) return 'Expired'
    if (daysRemaining <= 0) return 'Expired'
    if (daysRemaining <= 3) return 'Expiring Soon'
    if (daysRemaining <= 7) return 'Expiring'
    return 'Active'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
          <p className="mt-4 text-gray-600">Loading membership information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/portal/member">
                <Button variant="outline" size="sm">← Back to Dashboard</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Membership & Payments</h1>
                <p className="text-gray-600">Manage your subscription and payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6" variant="default" className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Membership */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Current Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                {membershipInfo ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">{membershipInfo.type}</span>
                        <Badge className={getMembershipStatusColor(membershipInfo.isActive, membershipInfo.daysRemaining)}>
                          {getMembershipStatusText(membershipInfo.isActive, membershipInfo.daysRemaining)}
                        </Badge>
                      </div>

                      {membershipInfo.endDate && (
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Expires:</span>
                            <span>{format(new Date(membershipInfo.endDate), 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Days remaining:</span>
                            <span className={getMembershipStatusColor(membershipInfo.isActive, membershipInfo.daysRemaining)}>
                              {membershipInfo.daysRemaining} days
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {membershipInfo.isActive && membershipInfo.daysRemaining <= 7 && (
                      <Alert className="border-orange-200 bg-orange-50">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          Your membership expires soon. Renew to continue accessing classes.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Manage Payment Method
                      </Button>
                      <Button className="w-full" variant="outline">
                        <DollarSign className="w-4 h-4 mr-2" />
                        View Billing History
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600">No active membership</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {paymentHistory.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No payment history</p>
                ) : (
                  <div className="space-y-3">
                    {paymentHistory.slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{payment.description}</p>
                          <p className="text-xs text-gray-600">
                            {format(new Date(payment.paidAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          <Badge
                            variant={payment.status === 'PAID' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Membership Plans */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the membership that best fits your training goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEMBERSHIP_PLANS.map((plan) => {
                const isCurrentPlan = membershipInfo?.type.toLowerCase().replace(/\s+/g, '_') === plan.id.toLowerCase()

                return (
                  <Card key={plan.id} className={`relative ${plan.recommended ? 'ring-2 ring-yellow-400' : ''} ${isCurrentPlan ? 'bg-yellow-50 border-yellow-300' : ''}`}>
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-400 text-black">Most Popular</Badge>
                      </div>
                    )}

                    {isCurrentPlan && (
                      <div className="absolute -top-3 right-4">
                        <Badge className="bg-green-500 text-white">Current Plan</Badge>
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
                        <span className="text-gray-600">/{plan.interval}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {isCurrentPlan ? (
                        <Button className="w-full" variant="outline" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handleUpgrade(plan.id)}
                          disabled={processingPayment}
                          variant={plan.recommended ? "default" : "outline"}
                        >
                          {processingPayment ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                              Processing...
                            </div>
                          ) : (
                            <>
                              {membershipInfo?.type && plan.price > (MEMBERSHIP_PLANS.find(p => p.name.toLowerCase() === membershipInfo.type.toLowerCase())?.price || 0) ? (
                                <>
                                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                                  Upgrade to {plan.name}
                                </>
                              ) : membershipInfo?.type && plan.price < (MEMBERSHIP_PLANS.find(p => p.name.toLowerCase() === membershipInfo.type.toLowerCase())?.price || 0) ? (
                                <>
                                  <ArrowDownCircle className="w-4 h-4 mr-2" />
                                  Downgrade to {plan.name}
                                </>
                              ) : (
                                `Select ${plan.name}`
                              )}
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Membership Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">What's Included</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Access to all martial arts styles</li>
                      <li>• World-class instruction</li>
                      <li>• Equipment provided</li>
                      <li>• Progress tracking</li>
                      <li>• Community support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Flexible Options</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• No lock-in contracts</li>
                      <li>• Cancel with 30 days notice</li>
                      <li>• Freeze membership up to 3 months/year</li>
                      <li>• Upgrade/downgrade anytime</li>
                      <li>• Family discounts available</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
