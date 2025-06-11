-- Add status column to competitions table
ALTER TABLE public.competitions
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' NOT NULL;

-- Add an index to the status column for faster queries
CREATE INDEX IF NOT EXISTS idx_competitions_status ON public.competitions (status); 