-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  league_id TEXT NOT NULL, -- e.g., 'bronze', 'silver', 'gold', 'diamond'
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  results_released BOOLEAN DEFAULT FALSE NOT NULL
);

-- Add unique constraint to ensure only one active competition per league at a time (optional, but good practice)
-- ALTER TABLE public.competitions ADD CONSTRAINT unique_active_competition_per_league UNIQUE (league_id, start_time, end_time);

-- Enable Row Level Security (RLS) on competitions table
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow all authenticated users to read competition details
CREATE POLICY "Authenticated users can read competitions" ON public.competitions
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policy: Allow administrators to manage (insert, update, delete) competitions
-- You'll need to define what makes a user an 'admin'. For now, a placeholder:
-- CREATE POLICY "Admins can manage competitions" ON public.competitions
--   FOR ALL TO authenticated
--   USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
-- For simplicity for now, we will just allow authenticated users to insert/update as well for testing, but ideally this would be restricted.
CREATE POLICY "Authenticated users can insert competitions" ON public.competitions
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update competitions" ON public.competitions
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete competitions" ON public.competitions
  FOR DELETE TO authenticated
  USING (true);

-- Create index for faster lookups by league_id and time
CREATE INDEX IF NOT EXISTS idx_competitions_league_id_start_end_time ON competitions (league_id, start_time, end_time); 