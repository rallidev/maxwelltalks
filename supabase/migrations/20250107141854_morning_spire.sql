/*
  # Fix profile creation automation

  1. Changes
    - Add trigger to automatically create profiles for new users
    - Create profiles for existing users

  2. Security
    - Maintains existing RLS policies
*/

-- Create profiles for existing users
INSERT INTO profiles (id, full_name, created_at)
SELECT 
  id,
  raw_user_meta_data->>'full_name',
  created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();