import { supabase } from "./supabaseClient"

export interface League {
  league_id: string
  name: string
  entry_fee: number
  options_enabled: boolean
  created_at: string
  updated_at: string
  max_participants: number
  competition_type: '1-day' | '5-day'
  start_time_aest: string
  end_time_aest: string
  registration_open_aest: string
  registration_close_aest: string
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
    // Helper to get a date in AEST for consistent mock data generation
    const getAESTDate = (date: Date, hours: number, minutes: number) => {
      const zonedDate = new Date(date.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
      zonedDate.setHours(hours, minutes, 0, 0);
      return zonedDate.toISOString();
    };

    const now = new Date();
    // For consistent mock data, let's make sure our mock dates are always in the future relative to 'now'
    // and align with the specified days of the week.
    // This is a simplified mock for demonstration. In a real system, these would be dynamic.

    // Calculate next Monday and Friday for consistent mock data
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
    if ((1 + 7 - now.getDay()) % 7 === 0 && now.getDay() === 1 && now.getHours() >= 7) {
      nextMonday.setDate(nextMonday.getDate() + 7);
    }

    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + (5 + 7 - now.getDay()) % 7);
    if ((5 + 7 - now.getDay()) % 7 === 0 && now.getDay() === 5 && now.getHours() >= 7) {
      nextFriday.setDate(nextFriday.getDate() + 7);
    }

    const oneDayCompStartTime = getAESTDate(nextFriday, 7, 0);
    const oneDayCompEndTime = getAESTDate(new Date(nextFriday.getTime() + 24 * 60 * 60 * 1000), 7, 0); // 24 hours later (Saturday 7 AM AEST)
    const oneDayRegCloseTime = getAESTDate(nextFriday, 6, 0); // 1 hour before start

    const fiveDayCompStartTime = getAESTDate(nextMonday, 7, 0);
    const fiveDayCompEndTime = getAESTDate(new Date(nextMonday.getTime() + 5 * 24 * 60 * 60 * 1000), 7, 0); // 5 days later (Saturday 7 AM AEST)
    const fiveDayRegCloseTime = getAESTDate(nextMonday, 6, 0); // 1 hour before start

    const mockLeagues: Record<string, League> = {
      bronze: {
        league_id: "bronze",
        name: "Bronze League",
        entry_fee: 5,
        options_enabled: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        max_participants: 100,
        competition_type: '1-day',
        start_time_aest: oneDayCompStartTime,
        end_time_aest: oneDayCompEndTime,
        registration_open_aest: getAESTDate(new Date(nextFriday.getTime() - 7 * 24 * 60 * 60 * 1000), 7, 0), // Opens 7 days before Friday 7 AM AEST for mock
        registration_close_aest: oneDayRegCloseTime,
      },
      silver: {
        league_id: "silver",
        name: "Silver League",
        entry_fee: 10,
        options_enabled: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        max_participants: 100,
        competition_type: '1-day',
        start_time_aest: oneDayCompStartTime,
        end_time_aest: oneDayCompEndTime,
        registration_open_aest: getAESTDate(new Date(nextFriday.getTime() - 7 * 24 * 60 * 60 * 1000), 7, 0), // Opens 7 days before Friday 7 AM AEST for mock
        registration_close_aest: oneDayRegCloseTime,
      },
      gold: {
        league_id: "gold",
        name: "Gold League",
        entry_fee: 25,
        options_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        max_participants: 100,
        competition_type: '5-day',
        start_time_aest: fiveDayCompStartTime,
        end_time_aest: fiveDayCompEndTime,
        registration_open_aest: getAESTDate(new Date(nextMonday.getTime() - 7 * 24 * 60 * 60 * 1000), 7, 0), // Opens 7 days before Monday 7 AM AEST for mock
        registration_close_aest: fiveDayRegCloseTime,
      },
      diamond: {
        league_id: "diamond",
        name: "Diamond League",
        entry_fee: 50,
        options_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        max_participants: 100,
        competition_type: '5-day',
        start_time_aest: fiveDayCompStartTime,
        end_time_aest: fiveDayCompEndTime,
        registration_open_aest: getAESTDate(new Date(nextMonday.getTime() - 7 * 24 * 60 * 60 * 1000), 7, 0), // Opens 7 days before Monday 7 AM AEST for mock
        registration_close_aest: fiveDayRegCloseTime,
      },
    }

    return mockLeagues[leagueId.toLowerCase()] || mockLeagues.bronze
  }
}
