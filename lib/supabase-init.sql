-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  can_be_copied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_portfolios table
CREATE TABLE IF NOT EXISTS public.user_portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  balance DECIMAL(15,2) DEFAULT 100000.00,
  total_value DECIMAL(15,2) DEFAULT 100000.00,
  total_pnl DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create trading_positions table
CREATE TABLE IF NOT EXISTS public.trading_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  position_type TEXT CHECK (position_type IN ('long', 'short')) NOT NULL,
  quantity INTEGER NOT NULL,
  entry_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) DEFAULT 0.00,
  pnl DECIMAL(15,2) DEFAULT 0.00,
  status TEXT CHECK (status IN ('open', 'closed')) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create competition_entries table
CREATE TABLE IF NOT EXISTS public.competition_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  competition_id TEXT NOT NULL,
  league TEXT CHECK (league IN ('bronze', 'silver', 'gold', 'diamond')) NOT NULL,
  entry_fee DECIMAL(10,2) DEFAULT 0.00,
  starting_balance DECIMAL(15,2) DEFAULT 100000.00,
  current_balance DECIMAL(15,2) DEFAULT 100000.00,
  return_percentage DECIMAL(8,4) DEFAULT 0.00,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, competition_id)
);

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Portfolio policies
CREATE POLICY "Users can view own portfolio" ON public.user_portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio" ON public.user_portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio" ON public.user_portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trading positions policies
CREATE POLICY "Users can view own positions" ON public.trading_positions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own positions" ON public.trading_positions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own positions" ON public.trading_positions
  FOR UPDATE USING (auth.uid() = user_id);

-- Competition entries policies
CREATE POLICY "Users can view own competition entries" ON public.competition_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own competition entries" ON public.competition_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own competition entries" ON public.competition_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Public leaderboard view (anyone can see competition entries for leaderboard)
CREATE POLICY "Anyone can view leaderboard" ON public.competition_entries
  FOR SELECT USING (true);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_entries ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_portfolios_user_id ON public.user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_trading_positions_user_id ON public.trading_positions(user_id);
CREATE INDEX IF NOT EXISTS idx_trading_positions_status ON public.trading_positions(status);
CREATE INDEX IF NOT EXISTS idx_competition_entries_user_id ON public.competition_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_competition_entries_league ON public.competition_entries(league);
CREATE INDEX IF NOT EXISTS idx_competition_entries_return_percentage ON public.competition_entries(return_percentage DESC);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  
  INSERT INTO public.user_portfolios (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile and portfolio on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at
  BEFORE UPDATE ON public.user_portfolios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trading_positions_updated_at
  BEFORE UPDATE ON public.trading_positions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competition_entries_updated_at
  BEFORE UPDATE ON public.competition_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
