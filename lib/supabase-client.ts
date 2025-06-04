import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types (extend as needed)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      user_portfolios: {
        Row: {
          id: string
          user_id: string
          balance: number
          total_value: number
          total_pnl: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          total_value?: number
          total_pnl?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          total_value?: number
          total_pnl?: number
          updated_at?: string
        }
      }
      trading_positions: {
        Row: {
          id: string
          user_id: string
          symbol: string
          position_type: "long" | "short"
          quantity: number
          entry_price: number
          current_price: number
          pnl: number
          status: "open" | "closed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          position_type: "long" | "short"
          quantity: number
          entry_price: number
          current_price?: number
          pnl?: number
          status?: "open" | "closed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          position_type?: "long" | "short"
          quantity?: number
          entry_price?: number
          current_price?: number
          pnl?: number
          status?: "open" | "closed"
          updated_at?: string
        }
      }
      competition_entries: {
        Row: {
          id: string
          user_id: string
          competition_id: string
          league: "bronze" | "silver" | "gold" | "diamond"
          entry_fee: number
          starting_balance: number
          current_balance: number
          return_percentage: number
          rank: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_id: string
          league: "bronze" | "silver" | "gold" | "diamond"
          entry_fee?: number
          starting_balance?: number
          current_balance?: number
          return_percentage?: number
          rank?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_id?: string
          league?: "bronze" | "silver" | "gold" | "diamond"
          entry_fee?: number
          starting_balance?: number
          current_balance?: number
          return_percentage?: number
          rank?: number | null
          updated_at?: string
        }
      }
      user_portfolio_snapshot: {
        Row: {
          id: string
          user_id: string
          total_equity: number
          cash_balance: number
          created_at: string
          updated_at: string
          // P&L Tracking
          realized_pnl: number
          unrealized_pnl: number
          daily_pnl: number
          weekly_pnl: number
          monthly_pnl: number
          // Trading Statistics
          total_trades: number
          winning_trades: number
          losing_trades: number
          win_rate: number
          largest_win: number
          largest_loss: number
          // Competition Features
          league_id: string | null
          competition_rank: number | null
          competition_score: number
          entry_fee_paid: number
          prize_eligibility: boolean
          // Risk Management
          position_count: number
          max_position_size: number
          risk_score: number
          max_drawdown: number
          // Timestamps
          last_trade_at: string | null
          last_login_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          total_equity?: number
          cash_balance?: number
          created_at?: string
          updated_at?: string
          // P&L Tracking
          realized_pnl?: number
          unrealized_pnl?: number
          daily_pnl?: number
          weekly_pnl?: number
          monthly_pnl?: number
          // Trading Statistics
          total_trades?: number
          winning_trades?: number
          losing_trades?: number
          win_rate?: number
          largest_win?: number
          largest_loss?: number
          // Competition Features
          league_id?: string | null
          competition_rank?: number | null
          competition_score?: number
          entry_fee_paid?: number
          prize_eligibility?: boolean
          // Risk Management
          position_count?: number
          max_position_size?: number
          risk_score?: number
          max_drawdown?: number
          // Timestamps
          last_trade_at?: string | null
          last_login_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          total_equity?: number
          cash_balance?: number
          updated_at?: string
          // P&L Tracking
          realized_pnl?: number
          unrealized_pnl?: number
          daily_pnl?: number
          weekly_pnl?: number
          monthly_pnl?: number
          // Trading Statistics
          total_trades?: number
          winning_trades?: number
          losing_trades?: number
          win_rate?: number
          largest_win?: number
          largest_loss?: number
          // Competition Features
          league_id?: string | null
          competition_rank?: number | null
          competition_score?: number
          entry_fee_paid?: number
          prize_eligibility?: boolean
          // Risk Management
          position_count?: number
          max_position_size?: number
          risk_score?: number
          max_drawdown?: number
          // Timestamps
          last_trade_at?: string | null
          last_login_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type Inserts<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type Updates<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]

// Typed Supabase client
export type TypedSupabaseClient = typeof supabase
