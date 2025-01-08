/*
  # Update messages table structure

  1. Changes
    - Drop existing messages table
    - Create new messages table with correct structure
    - Add appropriate policies
*/

-- Drop existing messages table
DROP TABLE IF EXISTS messages;

-- Create new messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  character_id uuid REFERENCES characters(id) NOT NULL,
  content text NOT NULL,
  is_ai boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can read their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);