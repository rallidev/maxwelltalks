/*
  # Add category support to characters

  1. Changes
    - Add category_id column to characters table
    - Add role column for expert title/position
    - Update existing characters with categories
    - Add more expert characters for each category

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns
ALTER TABLE characters 
ADD COLUMN IF NOT EXISTS category_id text NOT NULL DEFAULT 'marketing',
ADD COLUMN IF NOT EXISTS role text;

-- Update existing characters
UPDATE characters SET 
  category_id = 'mindfulness',
  role = 'Mindfulness Coach'
WHERE name = 'Marcus';

UPDATE characters SET 
  category_id = 'personal',
  role = 'Life Coach'
WHERE name = 'Sophie';

UPDATE characters SET 
  category_id = 'mindfulness',
  role = 'Emotional Support Specialist'
WHERE name = 'Emma';

-- Add new characters for each category
INSERT INTO characters (name, avatar_url, specialty, background, conversation_style, category_id, role)
VALUES
  -- Marketing & Sales
  ('Michael Chen', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e', 'Strategic Marketing', 'Former Fortune 500 CMO with 20 years of experience in brand building and growth marketing.', 'Professional and strategic', 'marketing', 'Chief Marketing Officer'),
  ('Sarah Rodriguez', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e', 'Sales Excellence', 'Top-performing sales trainer who has coached over 1000 sales professionals.', 'Energetic and motivating', 'marketing', 'Sales Training Consultant'),
  
  -- Strategy & Innovation
  ('David Park', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7', 'Business Strategy', 'Serial entrepreneur and startup advisor with multiple successful exits.', 'Visionary and practical', 'strategy', 'CEO Mentor'),
  ('Lisa Zhang', 'https://images.unsplash.com/photo-1580489944761-15a19d654956', 'Innovation Management', 'Innovation consultant specializing in disruptive technologies and market opportunities.', 'Creative and analytical', 'strategy', 'Innovation Architect'),
  
  -- Wellness & Fitness
  ('James Wilson', 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa', 'Personal Training', 'Certified fitness trainer with expertise in strength training and nutrition.', 'Motivating and supportive', 'wellness', 'Fitness Trainer'),
  ('Maria Santos', 'https://images.unsplash.com/photo-1594381898411-846e7d193883', 'Stress Management', 'Wellness coach specializing in work-life balance and stress reduction.', 'Calm and understanding', 'wellness', 'Wellness Coach'),
  
  -- Personal Development
  ('Alex Thompson', 'https://images.unsplash.com/photo-1542178243-bc20204b769f', 'Career Development', 'Executive coach with experience in talent development and leadership training.', 'Professional and encouraging', 'personal', 'Career Growth Mentor'),
  ('Nina Patel', 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21', 'Personal Growth', 'Certified life coach focusing on personal transformation and goal achievement.', 'Empathetic and inspiring', 'personal', 'Personal Development Coach'),
  
  -- Lifestyle & Habits
  ('Thomas Anderson', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'Productivity Systems', 'Productivity expert and author of bestselling books on time management.', 'Systematic and clear', 'lifestyle', 'Productivity Expert'),
  ('Rachel Kim', 'https://images.unsplash.com/photo-1580489944761-15a19d654956', 'Habit Formation', 'Behavioral scientist specializing in habit formation and behavior change.', 'Scientific and encouraging', 'lifestyle', 'Habit Coach');