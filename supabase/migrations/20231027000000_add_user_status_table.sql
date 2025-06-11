-- Add user_status table for presence
CREATE TABLE IF NOT EXISTS user_status (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'offline' NOT NULL, -- e.g., 'online', 'offline', 'away'
  last_seen TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to read user statuses (e.g., for online status)
CREATE POLICY "Authenticated users can read user status" ON user_status
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policy: Allow users to update their own status
CREATE POLICY "Users can update their own status" ON user_status
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policy: Allow users to insert their own status (on first login/status set)
CREATE POLICY "Users can insert their own status" ON user_status
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id); 