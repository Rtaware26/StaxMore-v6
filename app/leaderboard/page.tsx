"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, TrendingDown, Copy, Users, Star, Crown, Target } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabaseClient"
import Leaderboard from '@/components/Leaderboard'

export default function LeaderboardPage() {
  const { user, loading, userProfile } = useAuth()
  const [copiedTrader, setCopiedTrader] = useState<string | null>(null)

  const pageLoading = loading;

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        <p>Loading leaderboard access...</p>
      </div>
    )
  }

  const hasLeagueMembership = !!userProfile?.league;

  if (!pageLoading && user && !hasLeagueMembership) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-emerald-400">No League Membership</h2>
          <p className="text-gray-400">You need to join a competition league to view leaderboards.</p>
          <Button asChild className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300">
            <a href="/competitions">Explore Leagues</a>
          </Button>
        </div>
      </div>
    )
  }

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        <p>Please log in to view leaderboards.</p>
      </div>
    )
  }

  if (!user || !userProfile?.league) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 py-12 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Global Leaderboard</h1>
          <p className="text-xl text-gray-400 font-light">Top performers across all competitions, showcasing skill and strategy.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/30 to-yellow-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-300 mb-1 drop-shadow">Jack_TheTrader</div>
              <div className="text-emerald-400 font-semibold text-lg">+57.5% Return</div>
              <Badge className="mt-3 bg-gradient-to-r from-purple-600 to-purple-800 text-purple-100 px-3 py-1 rounded-full text-xs font-medium shadow">Diamond League</Badge>
            </CardContent>
          </Card>

          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-300 mb-1 drop-shadow">2,847</div>
              <div className="text-gray-400 text-lg">Active Traders</div>
              <Badge className="mt-3 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium shadow">Community</Badge>
            </CardContent>
          </Card>

          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-300 mb-1 drop-shadow">$2.5M+</div>
              <div className="text-gray-400 text-lg">Simulated Volume</div>
              <Badge className="mt-3 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium shadow">Platform Stats</Badge>
            </CardContent>
          </Card>

          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-300 mb-1 drop-shadow">4.9/5</div>
              <div className="text-gray-400 text-lg">User Rating</div>
              <Badge className="mt-3 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium shadow">Community Trust</Badge>
            </CardContent>
          </Card>
        </div>

        {userProfile?.league ? (
          <Leaderboard leagueId={userProfile.league} />
        ) : (
          !pageLoading && user && <div className="text-center py-4 text-gray-500">You do not have a league membership to view a leaderboard.</div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-xl font-bold text-slate-300 mb-1">Follow Top Traders</div>
              <p className="text-slate-400 text-sm">Choose from verified traders with proven track records</p>
               <Button className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 text-sm">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-xl font-bold text-emerald-300 mb-1">Auto-Execute Trades</div>
              <p className="text-emerald-400 text-sm">Trades are automatically placed when your followed trader makes a move</p>
               <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 text-sm">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="card-luxurious text-center bg-gray-800 border border-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-xl font-bold text-purple-300 mb-1">Risk Management</div>
              <p className="text-purple-400 text-sm">Set position limits and stop-loss rules to protect your capital</p>
               <Button className="mt-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 text-sm">Configure Rules</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
