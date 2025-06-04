"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, TrendingDown, Copy, Users, Star, Crown, Target } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  league: "Bronze" | "Silver" | "Gold" | "Diamond"
  portfolioValue: number
  returnPercent: number
  winRate: number
  totalTrades: number
  followers: number
}

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [selectedLeague, setSelectedLeague] = useState<string>("all")
  const [copiedTrader, setCopiedTrader] = useState<string | null>(null)

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "Jack_TheTrader",
      avatar: "JT",
      league: "Diamond",
      portfolioValue: 157500,
      returnPercent: 57.5,
      winRate: 78.5,
      totalTrades: 234,
      followers: 1247,
    },
    {
      rank: 2,
      username: "Bruce_Wayne_Trades",
      avatar: "BW",
      league: "Diamond",
      portfolioValue: 143200,
      returnPercent: 43.2,
      winRate: 72.1,
      totalTrades: 189,
      followers: 892,
    },
    {
      rank: 3,
      username: "Alana_StockWiz",
      avatar: "AS",
      league: "Gold",
      portfolioValue: 138900,
      returnPercent: 38.9,
      winRate: 69.8,
      totalTrades: 156,
      followers: 634,
    },
    {
      rank: 4,
      username: "CryptoKing2024",
      avatar: "CK",
      league: "Gold",
      portfolioValue: 132450,
      returnPercent: 32.45,
      winRate: 65.2,
      totalTrades: 201,
      followers: 445,
    },
    {
      rank: 5,
      username: "ChartMaster",
      avatar: "CM",
      league: "Silver",
      portfolioValue: 129800,
      returnPercent: 29.8,
      winRate: 63.7,
      totalTrades: 178,
      followers: 321,
    },
    {
      rank: 6,
      username: "DayTrader99",
      avatar: "DT",
      league: "Silver",
      portfolioValue: 127560,
      returnPercent: 27.56,
      winRate: 61.4,
      totalTrades: 267,
      followers: 289,
    },
    {
      rank: 7,
      username: "InvestorAce",
      avatar: "IA",
      league: "Bronze",
      portfolioValue: 122340,
      returnPercent: 22.34,
      winRate: 58.9,
      totalTrades: 143,
      followers: 156,
    },
    {
      rank: 8,
      username: "TrendFollower",
      avatar: "TF",
      league: "Bronze",
      portfolioValue: 118900,
      returnPercent: 18.9,
      winRate: 56.3,
      totalTrades: 198,
      followers: 98,
    },
  ]

  const getLeagueBadge = (league: string) => {
    const colors = {
      Diamond: "bg-purple-100 text-purple-800 border-purple-200",
      Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Silver: "bg-slate-100 text-slate-800 border-slate-200",
      Bronze: "bg-amber-100 text-amber-800 border-amber-200",
    }
    return colors[league as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Trophy className="h-5 w-5 text-slate-400" />
    if (rank === 3) return <Trophy className="h-5 w-5 text-amber-600" />
    return <span className="text-slate-600 font-semibold">#{rank}</span>
  }

  const handleCopyTrade = (username: string) => {
    if (!user) {
      alert("Please log in to copy trades")
      return
    }
    setCopiedTrader(username)
    // Simulate copy trade action
    setTimeout(() => {
      alert(`Now copying trades from ${username}! You'll receive notifications for their future trades.`)
      setCopiedTrader(null)
    }, 1000)
  }

  const filteredData =
    selectedLeague === "all"
      ? leaderboardData
      : leaderboardData.filter((entry) => entry.league.toLowerCase() === selectedLeague)

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Global Leaderboard</h1>
          <p className="text-xl text-slate-600">Top performers across all competitions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">Jack_TheTrader</div>
              <div className="text-emerald-600 font-semibold">+57.5% Return</div>
              <Badge className="mt-2 bg-purple-100 text-purple-800">Diamond League</Badge>
            </CardContent>
          </Card>

          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">2,847</div>
              <div className="text-slate-600">Active Traders</div>
            </CardContent>
          </Card>

          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">$2.5M+</div>
              <div className="text-slate-600">Simulated Volume</div>
            </CardContent>
          </Card>

          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-slate-600">User Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* League Filter */}
        <Card className="card-modern mb-8">
          <CardHeader>
            <CardTitle>Filter by League</CardTitle>
            <CardDescription>View rankings for specific competition tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedLeague} onValueChange={setSelectedLeague}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Leagues</TabsTrigger>
                <TabsTrigger value="bronze">Bronze</TabsTrigger>
                <TabsTrigger value="silver">Silver</TabsTrigger>
                <TabsTrigger value="gold">Gold</TabsTrigger>
                <TabsTrigger value="diamond">Diamond</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Top Traders</span>
              <Badge className="bg-emerald-100 text-emerald-800">{filteredData.length} traders</Badge>
            </CardTitle>
            <CardDescription>Rankings based on portfolio performance and consistency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((trader) => (
                <div
                  key={trader.username}
                  className="flex items-center justify-between p-6 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12">{getRankIcon(trader.rank)}</div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{trader.avatar}</span>
                    </div>

                    {/* Trader Info */}
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-900 text-lg">{trader.username}</span>
                        <Badge className={`${getLeagueBadge(trader.league)} border`}>{trader.league}</Badge>
                        {trader.rank <= 3 && <Badge className="bg-emerald-100 text-emerald-800">Top Performer</Badge>}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span>{trader.followers} followers</span>
                        <span>•</span>
                        <span>{trader.totalTrades} trades</span>
                        <span>•</span>
                        <span>{trader.winRate}% win rate</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance & Actions */}
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-semibold text-slate-900 text-lg">
                        ${trader.portfolioValue.toLocaleString()}
                      </div>
                      <div
                        className={`flex items-center text-sm font-medium ${
                          trader.returnPercent > 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {trader.returnPercent > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {trader.returnPercent > 0 ? "+" : ""}
                        {trader.returnPercent}%
                      </div>
                    </div>

                    {user && (
                      <Button
                        onClick={() => handleCopyTrade(trader.username)}
                        disabled={copiedTrader === trader.username}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Copy className="h-4 w-4" />
                        <span>{copiedTrader === trader.username ? "Copying..." : "Copy Trade"}</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Copy Trading Info */}
        <Card className="card-modern mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Copy className="h-5 w-5 mr-2 text-blue-600" />
              Copy Trading
            </CardTitle>
            <CardDescription>Follow successful traders and automatically replicate their strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Follow Top Traders</h3>
                <p className="text-sm text-slate-600">Choose from verified traders with proven track records</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Auto-Execute Trades</h3>
                <p className="text-sm text-slate-600">
                  Trades are automatically placed when your followed trader makes a move
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Risk Management</h3>
                <p className="text-sm text-slate-600">
                  Set position limits and stop-loss rules to protect your capital
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
