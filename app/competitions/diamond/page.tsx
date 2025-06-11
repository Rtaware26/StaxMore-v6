"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Users, DollarSign } from "lucide-react"
import { LeagueService, type League } from "@/lib/league-service"
import { useAuth } from "@/components/auth-provider"
import { handleCheckout } from "@/lib/checkout-service"
import { useState, useEffect } from "react"

export default function DiamondCompetitionPage() {
  const { user, isLoading: isUserLoading } = useAuth();
  const [league, setLeague] = useState<League | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true);
      try {
        const leagueData = await LeagueService.getLeague("diamond") // Changed to diamond
        setLeague(leagueData)
      } catch (error) {
        console.error("Error fetching league data:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchLeagueData()
  }, [])

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading || isUserLoading ? (
          <div className="flex items-center justify-center h-64"><p>Loading competition details...</p></div>
        ) : league ? (
          <>
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-purple-100 text-purple-800">{league.name}</Badge> {/* Changed badge color */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{league.name} Trading Competition</h1>
              <p className="text-xl text-gray-600">The ultimate challenge for elite traders!</p> {/* Updated description */}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-purple-600" /> {/* Changed icon color */}
                    Competition Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entry Fee:</span>
                    <span className="font-medium text-green-600">${league.entry_fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Capital:</span>
                    <span className="font-medium">$100,000</span> {/* Updated starting capital */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Participants:</span>
                    <span className="font-medium">100</span> {/* Updated max participants */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Prize Pool
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Prize pool details - updated for Diamond */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">1st Place:</span>
                    <span className="font-medium">$10,000 + Premium Access</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2nd Place:</span>
                    <span className="font-medium">$5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">3rd Place:</span>
                    <span className="font-medium">$2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top 10:</span>
                    <span className="font-medium">Exclusive Mentorship & Resources</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Competition Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Start with $100,000 virtual capital</li> {/* Updated rule */}
                  <li>• Trade all available asset classes (Stocks, ETFs, Forex, Crypto, Commodities, Options)</li> {/* Updated rule */}
                  <li>• Options trading enabled</li>
                  <li>• Maximum position size: 5% of portfolio</li> {/* Updated rule */}
                  <li>• Real-time market data and pricing</li>
                  <li>• Rankings based on total portfolio value</li>
                  <li>• Must maintain minimum 1 trade per week</li> {/* Updated rule */}
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" className="mr-4" onClick={handleJoinCompetition}>
                Join Competition
              </Button>
              <Link href="/leaderboard">
                <Button variant="outline" size="lg">
                  View Leaderboard
                </Button>
              </Link>
            </div>

            {/* Participant count - hardcoded for now */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Current Participants: 15/100
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "15%" }}></div> {/* Updated fill percentage */}
                </div>
                <p className="text-sm text-gray-600 mt-2">Competition starts when 50 participants join</p> {/* Updated text */}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">Failed to load competition details.</div>
        )}
      </div>
    </div>
  )
}
