/*
  # Initial Schema Setup for Mental Health App

  1. Tables
    - profiles
      - Stores user profile information
      - Links to Supabase auth.users
    - characters
      - Stores AI character information
    - chat_sessions
      - Tracks chat sessions between users and characters
    - messages
      - Stores chat messages
    - user_preferences
      - Stores user preferences and settings
    - mood_entries
      - Tracks user mood data
    - resources
      - Stores mental health resources and exercises

  2. Security
    - Enable RLS on all tables
    - Add policies for secure data access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create characters table
CREATE TABLE characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text NOT NULL,
  specialty text NOT NULL,
  background text NOT NULL,
  conversation_style text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create chat_sessions table
CREATE TABLE chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  character_id uuid REFERENCES characters(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) NOT NULL,
  content text NOT NULL,
  is_ai boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  theme text DEFAULT 'light',
  language text DEFAULT 'en',
  notifications_enabled boolean DEFAULT true,
  reminder_frequency text DEFAULT 'daily',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create mood_entries table
CREATE TABLE mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  mood_score integer NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Everyone can read characters"
  ON characters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read messages from their sessions"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = messages.session_id
      AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their sessions"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = session_id
      AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read their preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their mood entries"
  ON mood_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create mood entries"
  ON mood_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can read resources"
  ON resources FOR SELECT
  TO authenticated
  USING (true);