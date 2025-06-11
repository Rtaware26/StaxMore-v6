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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading leaderboard access...</p>
      </div>
    )
  }

  const hasLeagueMembership = !!userProfile?.league;

  if (!pageLoading && user && !hasLeagueMembership) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900">No League Membership</h2>
          <p className="text-slate-600">You need to join a competition league to view leaderboards.</p>
          <Button asChild>
            <a href="/competitions">Explore Leagues</a>
          </Button>
        </div>
      </div>
    )
  }

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view leaderboards.</p>
      </div>
    )
  }

  if (!user || !userProfile?.league) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Global Leaderboard</h1>
          <p className="text-xl text-slate-600">Top performers across all competitions</p>
        </div>

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

        {userProfile?.league ? (
          <Leaderboard leagueId={userProfile.league} />
        ) : (
          !pageLoading && user && <div className="text-center py-4 text-gray-500">You do not have a league membership to view a leaderboard.</div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">Follow Top Traders</div>
              <p className="text-slate-600 text-sm">Choose from verified traders with proven track records</p>
            </CardContent>
          </Card>

          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">Auto-Execute Trades</div>
              <p className="text-slate-600 text-sm">Trades are automatically placed when your followed trader makes a move</p>
            </CardContent>
          </Card>

          <Card className="card-modern text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold text-slate-900 mb-1">Risk Management</div>
              <p className="text-slate-600 text-sm">Set position limits and stop-loss rules to protect your capital</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
