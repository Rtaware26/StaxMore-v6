"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Users, DollarSign, Info, BarChart3 } from "lucide-react"
import { LeagueService, type League } from "@/lib/league-service"
import { useAuth } from "@/components/auth-provider"
import { handleCheckout } from "@/lib/checkout-service"
import { useState, useEffect } from "react"
import { TradingService, type Portfolio } from "@/lib/trading-service"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { formatCurrencyAbbreviated } from "@/lib/utils"
import { 
  convertAESTToLocal, 
  formatTimeForDisplay, 
  getCompetitionStatus, 
  getCountdown, 
  getRegistrationCountdown 
} from '@/lib/time-utils';

export default function GoldCompetitionPage() {
  const { user, loading: isUserLoading } = useAuth();
  const [league, setLeague] = useState<League | null>(null);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<Portfolio[]>([]);
  const [rewardsMap, setRewardsMap] = useState<Record<string, number>>({});
  const [userTimezone, setUserTimezone] = useState<string>('loading...');
  const [competitionStatus, setCompetitionStatus] = useState<string>('loading...');
  const [countdownText, setCountdownText] = useState<string>('loading...');

  // Define the total prize pool for this specific gold competition page
  const MAX_COMPETITION_PARTICIPANTS = 100; // Fixed max participants for all competitions
  const GOLD_STARTING_CAPITAL = 50000; // From image

  useEffect(() => {
    // Determine user's timezone once on mount
    try {
      setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (error) {
      console.error("Error determining user timezone:", error);
      setUserTimezone('Local Time'); // Fallback
    }

    const fetchCompetitionData = async () => {
      setLoading(true);
      try {
        const leagueData = await LeagueService.getLeague("gold");
        setLeague(leagueData);

        if (leagueData) {
          const fetchedLeaderboard = await TradingService.getLeaderboard(leagueData.league_id || undefined);
          const sortedLeaderboard = fetchedLeaderboard.sort((a, b) => b.total_equity - a.total_equity);
          setLeaderboard(sortedLeaderboard);

          const distributedRewards = await TradingService.distributePrizePool(
            leagueData.entry_fee * MAX_COMPETITION_PARTICIPANTS, // Use leagueData directly
            sortedLeaderboard
          );
          setRewardsMap(distributedRewards);
        }

      } catch (error) {
        console.error("Error fetching competition data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionData();
  }, []); // Empty dependency array: runs only once on mount

  useEffect(() => {
    // Setup interval for countdown and status updates, depends on league
    if (!league) {
      // Don't start interval until league data is loaded
      setCompetitionStatus('loading...');
      setCountdownText('loading...');
      return;
    }

    const intervalId = setInterval(() => {
      const status = getCompetitionStatus(
        league.registration_open_aest,
        league.registration_close_aest,
        league.start_time_aest,
        league.end_time_aest
      );
      setCompetitionStatus(status);

      let countdown = 'N/A';
      if (status === 'upcoming-registration') {
        countdown = `Opens ${getCountdown(league.registration_open_aest)}`;
      } else if (status === 'registration-open') {
        countdown = `Closes ${getRegistrationCountdown(league.registration_close_aest)}`;
      } else if (status === 'registration-closed') {
        countdown = `Starts ${getCountdown(league.start_time_aest)}`;
      } else if (status === 'active') {
        countdown = `Ends ${getCountdown(league.end_time_aest)}`;
      } else if (status === 'completed') {
        countdown = 'Completed';
      }
      setCountdownText(countdown);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [league]); // Rerun effect when league data is available

  const handleJoinCompetition = async () => {
    if (!user) {
      alert("Please log in to join the competition.");
      return;
    }
    if (!league) {
      alert("League data not loaded yet. Please try again.");
      return;
    }
    handleCheckout(user.id, league.league_id, league.entry_fee);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading || isUserLoading ? (
          <div className="flex items-center justify-center h-64"><p className="text-foreground">Loading competition details...</p></div>
        ) : league ? (
          <>
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-yellow-500 text-yellow-50">{league.name} - {league.competition_type?.toUpperCase()}</Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">{league.name} Trading Competition</h1>
              <p className="text-xl text-muted-foreground">Master your options trading and aim for elite status!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    Competition Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium text-yellow-500">${league.entry_fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{league.competition_type === '1-day' ? '24 Hours' : '5 Days'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting Capital:</span>
                    <span className="font-medium text-foreground">$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Participants:</span>
                    <span className="font-medium text-foreground">100</span>
                  </div>
                  {league.start_time_aest && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Starts (AEST):</span>
                      <span className="font-medium text-foreground">{formatTimeForDisplay(convertAESTToLocal(league.start_time_aest), userTimezone)}</span>
                    </div>
                  )}
                  {league.end_time_aest && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ends (AEST):</span>
                      <span className="font-medium text-foreground">{formatTimeForDisplay(convertAESTToLocal(league.end_time_aest), userTimezone)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                    Prize Pool
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs p-4 bg-popover text-popover-foreground rounded-md shadow-lg">
                          <p className="font-bold mb-2">Prize Distribution:</p>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>1st Place: 40% of Prize Pool</li>
                            <li>2nd Place: 20% of Prize Pool</li>
                            <li>3rd Place: 10% of Prize Pool</li>
                            <li>4th Place: 4% of Prize Pool</li>
                            <li>5th Place: 2% of Prize Pool</li>
                            <li>6th-20th Place: 1% of Prize Pool each</li>
                            <li>Places 21 and below: No rewards</li>
                          </ul>
                          <p className="font-bold mt-3 mb-2">Participant Limits:</p>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Minimum 50 participants to start competition.</li>
                            <li>Maximum 100 participants total for this competition.</li>
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Prize Pool:</span>
                    <span className="font-medium text-primary">{formatCurrencyAbbreviated(league.entry_fee * MAX_COMPETITION_PARTICIPANTS)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1st Place:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-primary cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.40)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          40% of Prize Pool
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2nd Place:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-primary cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.20)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          20% of Prize Pool
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3rd Place:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-foreground cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.10)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          10% of Prize Pool
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">4th Place:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-foreground cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.04)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          4% of Prize Pool
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">5th Place:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-foreground cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.02)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          2% of Prize Pool
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">6th-20th Place (each):</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-foreground cursor-help">{formatCurrencyAbbreviated(league.entry_fee * 0.01)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 bg-popover text-popover-foreground rounded-md shadow-lg">
                          1% of Prize Pool each
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">21st-100th Place:</span>
                    <span className="font-medium text-foreground">No prize</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8 card-modern">
              <CardHeader>
                <CardTitle className="text-foreground">Competition Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Start with ${GOLD_STARTING_CAPITAL} virtual capital</li>
                  <li>• Trade US stocks, ETFs, Forex, and Options</li>
                  <li>• Options trading enabled</li>
                  <li>• Maximum position size: 10% of portfolio</li>
                  <li>• Real-time market data and pricing</li>
                  <li>• Rankings based on total portfolio value</li>
                  <li>• Must maintain minimum 3 trades per week</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                className="mr-4"
                onClick={handleJoinCompetition}
                disabled={competitionStatus !== 'registration-open'}
              >
                {competitionStatus === 'registration-open' && `Join Competition (Closes ${getRegistrationCountdown(league.registration_close_aest)})`}
                {competitionStatus === 'upcoming-registration' && `Registration Opens ${getCountdown(league.registration_open_aest)}`}
                {competitionStatus === 'registration-closed' && `Registration Closed (Starts ${getCountdown(league.start_time_aest)})`}
                {competitionStatus === 'active' && `Competition Active (Ends ${getCountdown(league.end_time_aest)})`}
                {competitionStatus === 'completed' && `View Results`}
                {competitionStatus === 'unknown' && `Loading Status...`}
              </Button>
              <Link href="/leaderboard">
                <Button variant="outline" size="lg" className="text-foreground border-border bg-background hover:bg-accent hover:text-accent-foreground">
                  View Leaderboard
                </Button>
              </Link>
            </div>

            {/* Leaderboard Display */}
            <Card className="mt-8 card-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <BarChart3 className="h-5 w-5 mr-2 text-muted-foreground" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.length === 0 ? (
                  <p className="text-muted-foreground text-center">No participants in this section yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Rank</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">User</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Return (%)</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">PnL</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">Reward</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {leaderboard.map((portfolio, index) => (
                          <tr key={portfolio.user_id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-foreground">{index + 1}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{portfolio.user_id.substring(0, 8)}...</td>
                            <td className={`px-4 py-2 whitespace-nowrap text-sm ${portfolio.total_equity - GOLD_STARTING_CAPITAL >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {((portfolio.total_equity - GOLD_STARTING_CAPITAL) / GOLD_STARTING_CAPITAL * 100).toFixed(2)}%
                            </td>
                            <td className={`px-4 py-2 whitespace-nowrap text-sm ${portfolio.realized_pnl + portfolio.unrealized_pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {formatCurrencyAbbreviated(portfolio.realized_pnl + portfolio.unrealized_pnl)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-primary">
                              {rewardsMap[portfolio.user_id] ? formatCurrencyAbbreviated(rewardsMap[portfolio.user_id]) : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-8 card-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  Current Participants: {leaderboard.length}/{league.max_participants}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(leaderboard.length / league.max_participants) * 100}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {leaderboard.length < 50 ? `Competition starts when ${50 - leaderboard.length} more participants join.` : `Competition is running. ${league.max_participants - leaderboard.length} spots remaining.`}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex items-center justify-center h-64"><p className="text-destructive">Failed to load competition details. Please try again later.</p></div>
        )}
      </div>
    </div>
  )
}
