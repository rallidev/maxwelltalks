-- Create stripe_webhook_logs table for debugging
CREATE TABLE IF NOT EXISTS stripe_webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stripe_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access logs
CREATE POLICY "Service role can manage webhook logs"
  ON stripe_webhook_logs FOR ALL
  USING (auth.role() = 'service_role');

-- Function to handle Stripe webhook events
CREATE OR REPLACE FUNCTION handle_stripe_webhook()
RETURNS trigger AS $$
BEGIN
  -- Log the webhook event
  INSERT INTO stripe_webhook_logs (event_type, event_data)
  VALUES (NEW.event_type, NEW.event_data);

  -- Handle different event types
  IF NEW.event_type IN ('customer.subscription.created', 'customer.subscription.updated') THEN
    -- Update subscription status
    INSERT INTO subscriptions (
      user_id,
      stripe_subscription_id,
      status,
      tier,
      current_period_end,
      created_at,
      updated_at
    )
    VALUES (
      (NEW.event_data->>'metadata'->>'userId')::uuid,
      NEW.event_data->>'id',
      NEW.event_data->>'status',
      COALESCE(NEW.event_data->'metadata'->>'tier', 'basic'),
      to_timestamp((NEW.event_data->>'current_period_end')::bigint),
      NOW(),
      NOW()
    )
    ON CONFLICT (stripe_subscription_id) 
    DO UPDATE SET
      status = EXCLUDED.status,
      tier = EXCLUDED.tier,
      current_period_end = EXCLUDED.current_period_end,
      updated_at = NOW();

    -- Update user profile
    UPDATE profiles
    SET 
      subscription_status = NEW.event_data->>'status',
      subscription_tier = COALESCE(NEW.event_data->'metadata'->>'tier', 'basic')
    WHERE id = (NEW.event_data->'metadata'->>'userId')::uuid;

  ELSIF NEW.event_type = 'customer.subscription.deleted' THEN
    -- Update subscription status
    UPDATE subscriptions
    SET 
      status = 'canceled',
      updated_at = NOW()
    WHERE stripe_subscription_id = NEW.event_data->>'id';

    -- Update user profile
    UPDATE profiles
    SET 
      subscription_status = 'canceled',
      subscription_tier = NULL
    WHERE id = (NEW.event_data->'metadata'->>'userId')::uuid;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;