import { supabase } from "./supabaseClient"

export interface League {
  league_id: string
  name: string
  entry_fee: number
  options_enabled: boolean
  created_at: string
  updated_at: string
}

export interface EducationProgress {
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
}

export class LeagueService {
  // Get league by ID
  static async getLeague(leagueId: string): Promise<League | null> {
    try {
      const { data, error } = await supabase.from("leagues").select("*").eq("league_id", leagueId).single()

      if (error) {
        console.error("Error fetching league:", error)
        return this.getMockLeague(leagueId)
      }

      return data
    } catch (error) {
      console.error("Error in getLeague:", error)
      return this.getMockLeague(leagueId)
    }
  }

  // Get user's current league
  static async getUserLeague(userId: string): Promise<League | null> {
    try {
      const { data: portfolio, error } = await supabase
        .from("user_portfolio_snapshot")
        .select("league_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error || !portfolio?.league_id) {
        return null
      }

      return this.getLeague(portfolio.league_id)
    } catch (error) {
      console.error("Error in getUserLeague:", error)
      return null
    }
  }

  // Check education eligibility
  static async checkEducationEligibility(userId: string, requiredTrack: string): Promise<boolean> {
    try {
      // For now, return true as a fallback
      // In production, this would check the education_progress table
      return true
    } catch (error) {
      console.error("Error checking education eligibility:", error)
      return false
    }
  }

  // Get required track for league
  static getRequiredTrack(leagueId: string): string {
    switch (leagueId.toLowerCase()) {
      case "bronze":
      case "silver":
        return "beginner"
      case "gold":
        return "intermediate"
      case "diamond":
        return "advanced"
      default:
        return "beginner"
    }
  }

  // Mock league data for fallback
  private static getMockLeague(leagueId: string): League {
    const mockLeagues: Record<string, League> = {
      bronze: {
        league_id: "bronze",
        name: "Bronze League",
        entry_fee: 5,
        options_enabled: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      silver: {
        league_id: "silver",
        name: "Silver League",
        entry_fee: 10,
        options_enabled: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      gold: {
        league_id: "gold",
        name: "Gold League",
        entry_fee: 25,
        options_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      diamond: {
        league_id: "diamond",
        name: "Diamond League",
        entry_fee: 50,
        options_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }

    return mockLeagues[leagueId.toLowerCase()] || mockLeagues.bronze
  }
}
