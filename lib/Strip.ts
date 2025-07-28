import 'server-only'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIP_PUBLISHABLE_KEY!