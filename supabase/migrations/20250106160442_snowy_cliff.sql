/*
  # Set up admin user and initial characters
  
  1. Changes
    - Updates user profile to admin status using auth.users join
    - Adds initial character data
  
  2. Security
    - Maintains existing RLS policies
*/

-- Make specific user admin by joining with auth.users
UPDATE profiles
SET is_admin = true
FROM auth.users
WHERE profiles.id = auth.users.id
AND auth.users.email = 'your-email@example.com';

-- Insert some initial characters
INSERT INTO characters (name, avatar_url, specialty, background, conversation_style)
VALUES
  ('Emma', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', 'Emotional Support', 'A compassionate listener with expertise in emotional intelligence.', 'Warm and empathetic'),
  ('Marcus', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'Mindfulness Coach', 'Experienced meditation teacher with a focus on stress reduction.', 'Calm and focused'),
  ('Sophie', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', 'Life Coach', 'Certified life coach helping people achieve their goals.', 'Motivating and supportive');