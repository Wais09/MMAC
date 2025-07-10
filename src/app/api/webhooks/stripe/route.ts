import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../lib/prisma"
import Stripe from 'stripe'
import { headers } from "next/headers"

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

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
  }
  return secret
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: "No Stripe signature found" },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      const stripe = getStripe()
      const webhookSecret = getWebhookSecret()
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    console.log(`Processing Stripe webhook: ${event.type}`)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const userId = paymentIntent.metadata?.userId

    if (!userId) {
      console.error('No userId in payment intent metadata')
      return
    }

    // Update payment record
    await prisma.payment.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
        memberId: userId
      },
      data: {
        status: 'PAID',
        paidAt: new Date()
      }
    })

    console.log(`Payment succeeded for user ${userId}: ${paymentIntent.amount / 100} ${paymentIntent.currency}`)
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const userId = paymentIntent.metadata?.userId

    if (!userId) {
      console.error('No userId in payment intent metadata')
      return
    }

    // Update payment record
    await prisma.payment.updateMany({
      where: {
        stripePaymentId: paymentIntent.id,
        memberId: userId
      },
      data: {
        status: 'FAILED'
      }
    })

    // TODO: Send notification email to user about failed payment
    console.log(`Payment failed for user ${userId}: ${paymentIntent.amount / 100} ${paymentIntent.currency}`)
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const stripe = getStripe()
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    const userId = subscription.metadata?.userId
    const membershipType = subscription.metadata?.membershipType

    if (!userId) {
      console.error('No userId in subscription metadata')
      return
    }

    // Create payment record for successful subscription payment
    await prisma.payment.create({
      data: {
        memberId: userId,
        amount: (invoice.amount_paid || 0) / 100, // Convert from cents
        currency: invoice.currency.toUpperCase(),
        description: `${membershipType} Membership - Subscription Payment`,
        status: 'PAID',
        stripePaymentId: invoice.payment_intent as string,
        stripeInvoiceId: invoice.id,
        periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : new Date(),
        periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : new Date(),
        paymentMethod: 'card',
        paidAt: new Date()
      }
    })

    // Extend membership period
    const periodEnd = new Date((invoice.period_end || Math.floor(Date.now() / 1000)) * 1000)

    await prisma.user.update({
      where: { id: userId },
      data: {
        membershipEnd: periodEnd,
        isActive: true
      }
    })

    console.log(`Subscription payment succeeded for user ${userId}: ${invoice.amount_paid / 100} ${invoice.currency}`)
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const stripe = getStripe()
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    const userId = subscription.metadata?.userId

    if (!userId) {
      console.error('No userId in subscription metadata')
      return
    }

    // Create failed payment record
    await prisma.payment.create({
      data: {
        memberId: userId,
        amount: (invoice.amount_due || 0) / 100,
        currency: invoice.currency.toUpperCase(),
        description: 'Failed subscription payment',
        status: 'FAILED',
        stripeInvoiceId: invoice.id,
        paymentMethod: 'card'
      }
    })

    // TODO: Send notification about failed payment and payment retry
    console.log(`Subscription payment failed for user ${userId}: ${invoice.amount_due / 100} ${invoice.currency}`)
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId
    const membershipType = subscription.metadata?.membershipType

    if (!userId) {
      console.error('No userId in subscription metadata')
      return
    }

    console.log(`Subscription created for user ${userId}: ${subscription.id}`)
  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId

    if (!userId) {
      console.error('No userId in subscription metadata')
      return
    }

    // Handle subscription status changes
    if (subscription.status === 'active') {
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: true }
      })
    } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      // Don't immediately deactivate - give grace period
      console.log(`Subscription ${subscription.status} for user ${userId}`)
    }

    console.log(`Subscription updated for user ${userId}: ${subscription.status}`)
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId

    if (!userId) {
      console.error('No userId in subscription metadata')
      return
    }

    // Deactivate membership when subscription is deleted
    await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        membershipEnd: new Date() // Set end date to now
      }
    })

    console.log(`Subscription deleted for user ${userId}: ${subscription.id}`)
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}
