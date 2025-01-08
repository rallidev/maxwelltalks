import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

// Update these with your actual Stripe price IDs from your Stripe Dashboard
export const SUBSCRIPTION_TIERS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 9,
    priceId: 'price_1Qf352A9LZ04ibLGNOGlxnYH', // Replace with your Stripe price ID
    features: [
      'Access to 3 AI companions',
      'Basic chat functionality',
      'Email support'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 24,
    priceId: 'price_1Qf35TA9LZ04ibLGC0ERwBiA', // Replace with your Stripe price ID
    features: [
      'Unlimited AI companions',
      'Advanced chat features',
      'Priority support',
      'Custom companion training'
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    priceId: 'price_1Qf3tHA9LZ04ibLGRT0bKXY8', // Replace with your Stripe price ID
    features: [
      'Everything in Pro',
      'Custom AI companions',
      'Dedicated support',
      'Advanced analytics'
    ]
  }
} as const;