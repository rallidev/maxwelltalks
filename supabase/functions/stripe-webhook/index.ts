import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        const userId = subscription.metadata.userId;
        
        // Update subscription status
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            tier: subscription.metadata.tier || 'basic',
            current_period_end: new Date(subscription.current_period_end * 1000),
            updated_at: new Date()
          });

        // Update user profile
        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            subscription_tier: subscription.metadata.tier || 'basic'
          })
          .eq('id', userId);
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object;
        const canceledUserId = canceledSubscription.metadata.userId;

        // Update subscription status
        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date()
          })
          .eq('stripe_subscription_id', canceledSubscription.id);

        // Update user profile
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            subscription_tier: null
          })
          .eq('id', canceledUserId);
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});