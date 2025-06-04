import { supabase } from "./supabase-client"
import type { Tables, Inserts, Updates } from "./supabase-client"

// Profile operations
export const profileService = {
  async getProfile(userId: string): Promise<Tables<"profiles"> | null> {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return data
  },

  async createProfile(profile: Inserts<"profiles">): Promise<Tables<"profiles"> | null> {
    const { data, error } = await supabase.from("profiles").insert(profile).select().single()

    if (error) {
      console.error("Error creating profile:", error)
      return null
    }

    return data
  },

  async updateProfile(userId: string, updates: Updates<"profiles">): Promise<Tables<"profiles"> | null> {
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      return null
    }

    return data
  },
}

// Portfolio operations
export const portfolioService = {
  async getPortfolio(userId: string): Promise<Tables<"user_portfolios"> | null> {
    const { data, error } = await supabase
      .from("user_portfolios")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error("Error fetching portfolio:", error)
      return null
    }

    // If no portfolio exists, create one
    if (!data) {
      return await this.createPortfolio({ user_id: userId })
    }

    return data
  },

  async createPortfolio(portfolio: Inserts<"user_portfolios">): Promise<Tables<"user_portfolios"> | null> {
    const { data, error } = await supabase.from("user_portfolios").insert(portfolio).select().maybeSingle()

    if (error) {
      console.error("Error creating portfolio:", error)
      return null
    }

    return data
  },

  async updatePortfolio(
    userId: string,
    updates: Updates<"user_portfolios">,
  ): Promise<Tables<"user_portfolios"> | null> {
    // First try to update the most recent portfolio
    const { data, error } = await supabase
      .from("user_portfolios")
      .update({ ...updates })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .select()
      .maybeSingle()

    if (error) {
      console.error("Error updating portfolio:", error)
      return null
    }

    return data
  },
}

// Trading positions operations
export const positionsService = {
  async getPositions(userId: string): Promise<Tables<"trading_positions">[]> {
    const { data, error } = await supabase
      .from("trading_positions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "open")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching positions:", error)
      return []
    }

    return data || []
  },

  async createPosition(position: Inserts<"trading_positions">): Promise<Tables<"trading_positions"> | null> {
    const { data, error } = await supabase.from("trading_positions").insert(position).select().single()

    if (error) {
      console.error("Error creating position:", error)
      return null
    }

    return data
  },

  async updatePosition(
    positionId: string,
    updates: Updates<"trading_positions">,
  ): Promise<Tables<"trading_positions"> | null> {
    const { data, error } = await supabase
      .from("trading_positions")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", positionId)
      .select()
      .single()

    if (error) {
      console.error("Error updating position:", error)
      return null
    }

    return data
  },

  async closePosition(positionId: string): Promise<Tables<"trading_positions"> | null> {
    return this.updatePosition(positionId, { status: "closed" })
  },
}

// Competition operations
export const competitionService = {
  async getCompetitionEntry(userId: string, competitionId: string): Promise<Tables<"competition_entries"> | null> {
    const { data, error } = await supabase
      .from("competition_entries")
      .select("*")
      .eq("user_id", userId)
      .eq("competition_id", competitionId)
      .single()

    if (error) {
      console.error("Error fetching competition entry:", error)
      return null
    }

    return data
  },

  async createCompetitionEntry(entry: Inserts<"competition_entries">): Promise<Tables<"competition_entries"> | null> {
    const { data, error } = await supabase.from("competition_entries").insert(entry).select().single()

    if (error) {
      console.error("Error creating competition entry:", error)
      return null
    }

    return data
  },

  async getLeaderboard(league?: string): Promise<Tables<"competition_entries">[]> {
    let query = supabase
      .from("competition_entries")
      .select(`
        *,
        profiles:user_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .order("return_percentage", { ascending: false })
      .limit(100)

    if (league && league !== "all") {
      query = query.eq("league", league)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching leaderboard:", error)
      return []
    }

    return data || []
  },
}

// Auth helpers
export const authService = {
  async signUp(email: string, password: string, metadata?: { username?: string; full_name?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) {
      throw error
    }

    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      throw error
    }
  },
}
