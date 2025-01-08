import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import type { SubscriptionTier } from '../../types';

interface StripeCheckoutProps {
  tier: SubscriptionTier;
  className?: string;
}

export function StripeCheckout({ tier, className }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Create a checkout session in Supabase
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: tier.priceId,
          userId: user.id,
          customerEmail: user.email
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      window.location.href = data.url;
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
      {loading ? 'Processing...' : `Subscribe to ${tier.name}`}
    </Button>
  );
}