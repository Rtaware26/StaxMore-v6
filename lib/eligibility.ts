import { LeagueService } from "./league-service"

// Check if a user is eligible for a specific league
export async function checkEligibility(leagueId: string): Promise<boolean> {
  try {
    // Get the current user ID from session or local storage
    // In a real app, this would come from authentication
    const userId = localStorage.getItem("userId") || "current-user"

    // Get the required education track for this league
    const requiredTrack = LeagueService.getRequiredTrack(leagueId)

    // Check if the user has completed the required education track
    const isEligible = await LeagueService.checkEducationEligibility(userId, requiredTrack)

    return isEligible
  } catch (error) {
    console.error("Error checking eligibility:", error)
    // Default to false if there's an error
    return false
  }
}

// Get the education track required for a league
export function getRequiredTrack(leagueId: string): string {
  return LeagueService.getRequiredTrack(leagueId)
}
