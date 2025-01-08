import { useState } from 'react';
import { Button } from '../ui/Button';
import { stripe } from '../../lib/stripe';
import { useAuthStore } from '../../store/authStore';

interface CheckoutButtonProps {
  priceId: string;
  className?: string;
}

export function CheckoutButton({ priceId, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const stripeInstance = await stripe;
      if (!stripeInstance) throw new Error('Stripe failed to initialize');

      // Redirect to Stripe Checkout
      const { error } = await stripeInstance.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        customerEmail: user.email,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('Failed to start checkout process');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Processing...' : 'Subscribe Now'}
    </Button>
  );
}