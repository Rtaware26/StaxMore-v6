-- Create league_messages table
CREATE TABLE IF NOT EXISTS league_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  content TEXT NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_username TEXT NOT NULL, -- Store username denormalized for easier display
  league TEXT NOT NULL, -- e.g., 'bronze', 'silver', 'gold', 'diamond'

  -- Optional: Index for faster lookups by league and timestamp
  -- CREATE INDEX idx_league_messages_league_created_at ON league_messages(league, created_at);
);

-- Enable Row Level Security (RLS)
ALTER TABLE league_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to read messages in their league (requires checking user's league from profiles table or similar)
-- This policy needs to be refined based on where user's league is stored and how to access it securely.
-- A basic policy allowing authenticated users to read:
CREATE POLICY "Authenticated users can read league messages" ON league_messages
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policy: Allow authenticated users to insert messages (will need to check league matches user's league)
CREATE POLICY "Authenticated users can insert league messages" ON league_messages
  FOR INSERT TO authenticated
  WITH CHECK (true); -- This check needs to be refined to ensure user is in the league they are posting to.

-- Create direct_messages table
CREATE TABLE IF NOT EXISTS direct_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  chat_id TEXT NOT NULL, -- Unique ID for a 1:1 chat thread (e.g., sorted user IDs like 'user1_id_user2_id')

  -- Optional: Index for faster lookups by chat_id and timestamp
  -- CREATE INDEX idx_direct_messages_chat_id_created_at ON direct_messages(chat_id, created_at);

  -- Constraint to ensure chat_id is consistent for a pair of users (optional but good practice)
  -- This is harder to enforce purely in SQL and might be better handled in application logic.
);

-- Enable Row Level Security (RLS)
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to read direct messages if they are the sender or receiver
CREATE POLICY "Users can read their direct messages" ON direct_messages
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- RLS Policy: Allow users to insert direct messages
CREATE POLICY "Users can insert direct messages" ON direct_messages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id); -- Ensure the sender matches the authenticated user

-- Optional: user_status table for presence
-- CREATE TABLE IF NOT EXISTS user_status (
--   user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   status TEXT DEFAULT 'offline' NOT NULL, -- e.g., 'online', 'offline', 'away'
--   last_seen TIMESTAMP WITH TIME ZONE
-- );

-- -- Enable RLS
-- ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;

-- -- RLS Policy: Allow users to read user statuses (e.g., for online status)
-- CREATE POLICY "Authenticated users can read user status" ON user_status
--   FOR SELECT TO authenticated
--   USING (true);

-- -- RLS Policy: Allow users to update their own status
-- CREATE POLICY "Users can update their own status" ON user_status
--   FOR UPDATE TO authenticated
--   USING (auth.uid() = user_id); 