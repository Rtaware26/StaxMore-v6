"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, DollarSign, Target, Trophy, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const [portfolioValue, setPortfolioValue] = useState(10000)
  const [dailyChange, setDailyChange] = useState(125.5)
  const [totalReturn, setTotalReturn] = useState(1.25)

  useEffect(() => {
    if (!user) return

    const loadDashboardData = async () => {
      try {
        // Simulate fetching user portfolio and trading data
        // In a real app, this would come from your trading service
        console.log("Loading dashboard data for user:", user.email)

        // You can add actual data fetching here when ready
        // const portfolio = await TradingService.getPortfolio(user.id)
        // const trades = await TradingService.getTrades(user.id)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      }
    }

    loadDashboardData()
  }, [user])

  useEffect(() => {
    if (!user) return

    // Example of proper subscription cleanup
    let mounted = true

    const loadData = async () => {
      if (!mounted) return
      // Your data loading logic here
    }

    loadData()

    // Cleanup function
    return () => {
      mounted = false
      // Clean up any subscriptions or intervals here
    }
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 py-8 text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user?.email}!</h1>
              <p className="text-gray-400">Here's your trading overview</p>
            </div>
            <Button onClick={signOut} variant="outline" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 hover:text-white font-semibold">
              Sign Out
            </Button>
          </div>

          {/* Portfolio Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border border-gray-700 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate text-white">${portfolioValue.toLocaleString()}</div>
                <p className="text-xs text-gray-400">+{totalReturn}% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Daily P&L</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-emerald-400 truncate">+${dailyChange}</div>
                <p className="text-xs text-gray-400">+1.25% today</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Positions</CardTitle>
                <Target className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate text-white">7</div>
                <p className="text-xs text-gray-400">3 profitable positions</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-800 border border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Trophy className="h-5 w-5 mr-2 text-blue-400" />
                  Competitions
                </CardTitle>
                <CardDescription className="text-gray-400">Join trading competitions and climb the leaderboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/competitions/bronze">
                    <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 hover:text-white">
                      Bronze League - Free Entry
                    </Button>
                  </Link>
                  <Link href="/competitions/silver">
                    <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 hover:text-white">
                      Silver League - $5 Entry
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  Continue Learning
                </CardTitle>
                <CardDescription className="text-gray-400">Improve your trading skills with our education modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/education/beginner/technical">
                    <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 hover:text-white">
                      Technical Analysis Basics
                    </Button>
                  </Link>
                  <Link href="/education/beginner/psychology">
                    <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 hover:text-white">
                      Trading Psychology
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Trades</CardTitle>
              <CardDescription className="text-gray-400">Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { symbol: "AAPL", action: "BUY", quantity: 10, price: 175.5, pnl: "+$125.00", time: "2 hours ago" },
                  { symbol: "TSLA", action: "SELL", quantity: 5, price: 245.3, pnl: "-$67.50", time: "1 day ago" },
                  { symbol: "MSFT", action: "BUY", quantity: 15, price: 378.9, pnl: "+$234.75", time: "2 days ago" },
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.action === "BUY" ? "bg-emerald-700 text-emerald-100" : "bg-red-700 text-red-100"
                        }`}
                      >
                        {trade.action}
                      </div>
                      <div>
                        <div className="font-medium text-white">{trade.symbol}</div>
                        <div className="text-sm text-gray-400">
                          {trade.quantity} shares @ ${trade.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${trade.pnl.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                        {trade.pnl}
                      </div>
                      <div className="text-sm text-gray-400">{trade.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
