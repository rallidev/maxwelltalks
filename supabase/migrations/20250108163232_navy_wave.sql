-- Add subscription fields to profiles
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'subscription_status'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN subscription_status text,
    ADD COLUMN subscription_tier text,
    ADD COLUMN stripe_customer_id text;
  END IF;
END $$;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  stripe_subscription_id text NOT NULL,
  status text NOT NULL,
  tier text NOT NULL,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');