import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../../lib/auth"
import { prisma } from "../../../../../lib/prisma"
import Stripe from 'stripe'
import { MembershipType } from "@prisma/client"

// Initialize Stripe only when environment variables are available
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia'
  })
}

// Membership plan configurations
const MEMBERSHIP_PLANS = {
  'KICK_STARTER': {
    name: 'Kick Starter',
    amount: 3000, // $30.00 in cents
    interval: 'week' as const,
    description: '1 class per week'
  },
  'TWO_X_PLAN': {
    name: '2X Plan',
    amount: 4000, // $40.00 in cents
    interval: 'week' as const,
    description: '2 classes per week'
  },
  'UNLIMITED': {
    name: 'Unlimited',
    amount: 5500, // $55.00 in cents
    interval: 'week' as const,
    description: 'Unlimited classes'
  },
  'CASUAL': {
    name: 'Casual',
    amount: 3500, // $35.00 per class
    interval: null, // Pay per class
    description: 'Pay per class'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe client
    const stripe = getStripe()

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { membershipType, paymentMethodId } = body

    if (!membershipType || !Object.keys(MEMBERSHIP_PLANS).includes(membershipType)) {
      return NextResponse.json(
        { error: "Invalid membership type" },
        { status: 400 }
      )
    }

    const userId = session.user.id
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const plan = MEMBERSHIP_PLANS[membershipType as keyof typeof MEMBERSHIP_PLANS]

    // For casual membership, don't create subscription
    if (membershipType === 'CASUAL') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          membershipType: MembershipType.CASUAL,
          isActive: true
        }
      })

      return NextResponse.json({
        success: true,
        message: "Casual membership activated. You can now book and pay for individual classes."
      })
    }

    // Create or retrieve Stripe customer
    let stripeCustomerId = user.email // We'll use email as customer lookup initially

    try {
      const customers = await stripe.customers.list({
        email: user.email!,
        limit: 1
      })

      if (customers.data.length > 0) {
        stripeCustomerId = customers.data[0].id
      } else {
        const customer = await stripe.customers.create({
          email: user.email!,
          name: `${user.firstName} ${user.lastName}`,
          metadata: {
            userId: user.id
          }
        })
        stripeCustomerId = customer.id
      }
    } catch (stripeError) {
      console.error("Error creating/finding Stripe customer:", stripeError)
      return NextResponse.json(
        { error: "Payment system error" },
        { status: 500 }
      )
    }

    // Attach payment method to customer
    if (paymentMethodId) {
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: stripeCustomerId
        })

        // Set as default payment method
        await stripe.customers.update(stripeCustomerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId
          }
        })
      } catch (stripeError) {
        console.error("Error attaching payment method:", stripeError)
        return NextResponse.json(
          { error: "Failed to attach payment method" },
          { status: 500 }
        )
      }
    }

    // Create or get existing price for this plan
    let priceId: string

    try {
      const prices = await stripe.prices.list({
        lookup_keys: [`${membershipType.toLowerCase()}_weekly`],
        limit: 1
      })

      if (prices.data.length > 0) {
        priceId = prices.data[0].id
      } else {
        // Create new price
        const price = await stripe.prices.create({
          unit_amount: plan.amount,
          currency: 'aud',
          recurring: {
            interval: plan.interval
          },
          lookup_key: `${membershipType.toLowerCase()}_weekly`,
          product_data: {
            name: `MMAC ${plan.name} Membership`,
            description: plan.description
          }
        })
        priceId = price.id
      }
    } catch (stripeError) {
      console.error("Error creating/finding price:", stripeError)
      return NextResponse.json(
        { error: "Payment system error" },
        { status: 500 }
      )
    }

    // Create subscription
    try {
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: user.id,
          membershipType
        }
      })

      // Update user in database
      const membershipStart = new Date()
      const membershipEnd = new Date()
      membershipEnd.setDate(membershipEnd.getDate() + 30) // 30 days from now

      await prisma.user.update({
        where: { id: userId },
        data: {
          membershipType: membershipType as MembershipType,
          membershipStart,
          membershipEnd,
          isActive: true
        }
      })

      // Create payment record
      await prisma.payment.create({
        data: {
          memberId: userId,
          amount: plan.amount / 100, // Convert from cents to dollars
          currency: 'AUD',
          description: `${plan.name} Membership - Weekly`,
          status: 'PENDING',
          stripePaymentId: subscription.id,
          periodStart: membershipStart,
          periodEnd: membershipEnd,
          paymentMethod: 'card'
        }
      })

      const invoice = subscription.latest_invoice as Stripe.Invoice
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent

      return NextResponse.json({
        success: true,
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        membershipType: plan.name,
        amount: plan.amount / 100,
        message: `${plan.name} membership subscription created successfully`
      })
    } catch (stripeError) {
      console.error("Error creating subscription:", stripeError)
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error in create-subscription:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
