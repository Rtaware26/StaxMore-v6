-- Create live_trading_log table
CREATE TABLE IF NOT EXISTS public.live_trading_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  position_type TEXT CHECK (position_type IN ('long', 'short')) NOT NULL,
  quantity DECIMAL(15,4) NOT NULL,
  entry_price DECIMAL(15,4) NOT NULL,
  exit_price DECIMAL(15,4),
  stop_loss DECIMAL(15,4),
  take_profit DECIMAL(15,4),
  is_closed BOOLEAN DEFAULT FALSE,
  pnl DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- Create user_portfolio_snapshot table
CREATE TABLE IF NOT EXISTS public.user_portfolio_snapshot (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cash_balance DECIMAL(15,2) DEFAULT 100000.00,
  total_equity DECIMAL(15,2) DEFAULT 100000.00,
  realized_pnl DECIMAL(15,2) DEFAULT 0.00,
  unrealized_pnl DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.live_trading_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_portfolio_snapshot ENABLE ROW LEVEL SECURITY;

-- RLS Policies for live_trading_log
CREATE POLICY "Users can view own trades" ON public.live_trading_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trades" ON public.live_trading_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trades" ON public.live_trading_log
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_portfolio_snapshot
CREATE POLICY "Users can view own portfolio" ON public.user_portfolio_snapshot
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio" ON public.user_portfolio_snapshot
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio" ON public.user_portfolio_snapshot
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_live_trading_log_user_id ON public.live_trading_log(user_id);
CREATE INDEX IF NOT EXISTS idx_live_trading_log_is_closed ON public.live_trading_log(is_closed);
CREATE INDEX IF NOT EXISTS idx_live_trading_log_symbol ON public.live_trading_log(symbol);
-- Update user_portfolio_snapshot table to handle multiple snapshots per user
ALTER TABLE public.user_portfolio_snapshot DROP CONSTRAINT IF EXISTS user_portfolio_snapshot_user_id_key;

-- Update user_portfolio_snapshot table to only use created_at
ALTER TABLE public.user_portfolio_snapshot DROP COLUMN IF EXISTS updated_at;

-- Remove the trigger for updated_at since we don't have that column
DROP TRIGGER IF EXISTS update_user_portfolio_snapshot_updated_at ON public.user_portfolio_snapshot;

-- Update the index to use created_at
DROP INDEX IF EXISTS idx_user_portfolio_snapshot_user_updated;
CREATE INDEX IF NOT EXISTS idx_user_portfolio_snapshot_user_created ON public.user_portfolio_snapshot(user_id, created_at DESC);

-- Update the index to use created_at
-- Add index for efficient querying of latest snapshot
--CREATE INDEX IF NOT EXISTS idx_user_portfolio_snapshot_user_updated ON public.user_portfolio_snapshot(user_id, updated_at DESC);

-- Function to get latest portfolio snapshot
CREATE OR REPLACE FUNCTION public.get_latest_portfolio(p_user_id UUID)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  cash_balance DECIMAL(15,2),
  total_equity DECIMAL(15,2),
  realized_pnl DECIMAL(15,2),
  unrealized_pnl DECIMAL(15,2),
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT ups.*
  FROM public.user_portfolio_snapshot ups
  WHERE ups.user_id = p_user_id
  ORDER BY ups.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create portfolio snapshot
CREATE OR REPLACE FUNCTION public.create_portfolio_snapshot(
  p_user_id UUID,
  p_cash_balance DECIMAL(15,2) DEFAULT 100000.00,
  p_total_equity DECIMAL(15,2) DEFAULT 100000.00,
  p_realized_pnl DECIMAL(15,2) DEFAULT 0.00,
  p_unrealized_pnl DECIMAL(15,2) DEFAULT 0.00
)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  cash_balance DECIMAL(15,2),
  total_equity DECIMAL(15,2),
  realized_pnl DECIMAL(15,2),
  unrealized_pnl DECIMAL(15,2),
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.user_portfolio_snapshot (
    user_id,
    cash_balance,
    total_equity,
    realized_pnl,
    unrealized_pnl
  ) VALUES (
    p_user_id,
    p_cash_balance,
    p_total_equity,
    p_realized_pnl,
    p_unrealized_pnl
  )
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_live_trading_log_updated_at
  BEFORE UPDATE ON public.live_trading_log
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

--CREATE TRIGGER update_user_portfolio_snapshot_updated_at
--  BEFORE UPDATE ON public.user_portfolio_snapshot
--  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to initialize user portfolio
CREATE OR REPLACE FUNCTION public.initialize_user_portfolio()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if portfolio already exists
  IF NOT EXISTS (
    SELECT 1 FROM public.user_portfolio_snapshot 
    WHERE user_id = NEW.id
  ) THEN
    INSERT INTO public.user_portfolio_snapshot (user_id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create portfolio on user signup
DROP TRIGGER IF EXISTS on_auth_user_created_portfolio ON auth.users;
CREATE TRIGGER on_auth_user_created_portfolio
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_portfolio();
