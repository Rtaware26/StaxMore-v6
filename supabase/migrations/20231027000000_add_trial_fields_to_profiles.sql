-- Add free trial and membership columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS free_trial_start TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS free_trial_expiry TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS membership_paid BOOLEAN DEFAULT FALSE; 