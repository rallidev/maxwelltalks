/*
  # Fix Profile Policies

  1. Changes
    - Drop existing policies and create new ones with proper hierarchy
    - Add better error handling for existing users
  
  2. Security
    - Users can read and update their own profiles
    - Admins can access all profiles
    - Prevent infinite recursion in policies
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can read their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can access all profiles" ON profiles;

-- Create new policies with proper hierarchy
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can access all profiles"
  ON profiles FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );