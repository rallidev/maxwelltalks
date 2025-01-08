/*
  # Add admin functionality

  1. Changes
    - Add is_admin column to profiles table
    - Add policy for admin access
*/

-- Add is_admin column to profiles
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;

-- Create policy for admin access
CREATE POLICY "Admins can access all profiles"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );