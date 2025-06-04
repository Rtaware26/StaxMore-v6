-- Create asset_prices table for caching Yahoo Finance data
CREATE TABLE IF NOT EXISTS asset_prices (
  symbol TEXT PRIMARY KEY,
  price DECIMAL(20, 8) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_asset_prices_updated_at ON asset_prices(updated_at);

-- Enable RLS
ALTER TABLE asset_prices ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to asset prices" ON asset_prices
  FOR SELECT TO authenticated
  USING (true);

-- Allow insert/update only to service role (for cron job)
CREATE POLICY "Allow service role to manage prices" ON asset_prices
  FOR ALL TO service_role
  USING (true);
