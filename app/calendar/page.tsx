"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, AlertCircle, RefreshCw } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  time: string
  impact: "high" | "medium" | "low"
  currency: string
  actual?: string
  forecast?: string
  previous?: string
}

export default function EconomicCalendarPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulate fetching economic news
  const fetchNews = async () => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: "US Non-Farm Payrolls",
        time: "08:30",
        impact: "high",
        currency: "USD",
        actual: "275K",
        forecast: "200K",
        previous: "150K",
      },
      {
        id: "2",
        title: "Federal Reserve Interest Rate Decision",
        time: "14:00",
        impact: "high",
        currency: "USD",
        forecast: "5.25%",
        previous: "5.00%",
      },
      {
        id: "3",
        title: "European Central Bank Press Conference",
        time: "12:45",
        impact: "high",
        currency: "EUR",
      },
      {
        id: "4",
        title: "UK GDP Growth Rate",
        time: "09:30",
        impact: "medium",
        currency: "GBP",
        actual: "0.3%",
        forecast: "0.2%",
        previous: "0.1%",
      },
      {
        id: "5",
        title: "Japan Consumer Price Index",
        time: "23:30",
        impact: "medium",
        currency: "JPY",
        actual: "3.2%",
        forecast: "3.1%",
        previous: "3.0%",
      },
      {
        id: "6",
        title: "US Initial Jobless Claims",
        time: "08:30",
        impact: "low",
        currency: "USD",
        actual: "220K",
        forecast: "225K",
        previous: "230K",
      },
      {
        id: "7",
        title: "German Manufacturing PMI",
        time: "08:00",
        impact: "medium",
        currency: "EUR",
        actual: "48.5",
        forecast: "49.0",
        previous: "47.8",
      },
      {
        id: "8",
        title: "Oil Inventory Report",
        time: "15:30",
        impact: "medium",
        currency: "USD",
        actual: "-2.1M",
        forecast: "-1.5M",
        previous: "+0.8M",
      },
    ]

    setNews(mockNews)
    setLastUpdate(new Date())
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchNews, 60000)
    return () => clearInterval(interval)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="h-4 w-4" />
      case "medium":
        return <TrendingUp className="h-4 w-4" />
      case "low":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Economic Calendar</h1>
          <p className="text-xl text-slate-600">Stay updated with market-moving economic events</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              Today's Events
            </Badge>
            <span className="text-sm text-slate-600">Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <Button onClick={fetchNews} disabled={loading} className="btn-secondary">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Updating..." : "Refresh"}
          </Button>
        </div>

        {/* Impact Legend */}
        <Card className="card-modern mb-8">
          <CardHeader>
            <CardTitle>Impact Levels</CardTitle>
            <CardDescription>Understanding how events affect market volatility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  High Impact
                </Badge>
                <span className="text-sm text-slate-600">Major market movers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Medium Impact
                </Badge>
                <span className="text-sm text-slate-600">Moderate volatility expected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Clock className="h-4 w-4 mr-1" />
                  Low Impact
                </Badge>
                <span className="text-sm text-slate-600">Minor market influence</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Economic Events */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Today's Economic Events</CardTitle>
            <CardDescription>Key economic releases and their market impact</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && news.length === 0 ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Loading economic events...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Time */}
                      <div className="text-center min-w-[60px]">
                        <div className="font-semibold text-slate-900">{item.time}</div>
                        <div className="text-xs text-slate-600">EST</div>
                      </div>

                      {/* Currency */}
                      <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700">{item.currency}</span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <Badge className={`${getImpactColor(item.impact)} border flex items-center`}>
                            {getImpactIcon(item.impact)}
                            <span className="ml-1 capitalize">{item.impact}</span>
                          </Badge>
                        </div>

                        {/* Data Values */}
                        {(item.actual || item.forecast || item.previous) && (
                          <div className="flex items-center space-x-4 text-sm">
                            {item.actual && (
                              <div>
                                <span className="text-slate-600">Actual: </span>
                                <span className="font-semibold text-slate-900">{item.actual}</span>
                              </div>
                            )}
                            {item.forecast && (
                              <div>
                                <span className="text-slate-600">Forecast: </span>
                                <span className="font-semibold text-slate-900">{item.forecast}</span>
                              </div>
                            )}
                            {item.previous && (
                              <div>
                                <span className="text-slate-600">Previous: </span>
                                <span className="font-semibold text-slate-900">{item.previous}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Market Impact Indicator */}
                    <div className="text-right">
                      {item.actual && item.forecast && (
                        <div className="text-sm">
                          {Number.parseFloat(item.actual.replace(/[^\d.-]/g, "")) >
                          Number.parseFloat(item.forecast.replace(/[^\d.-]/g, "")) ? (
                            <Badge className="bg-emerald-100 text-emerald-800">Bullish</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Bearish</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trading Tips */}
        <Card className="card-modern mt-8">
          <CardHeader>
            <CardTitle>Trading Tips</CardTitle>
            <CardDescription>How to use economic events in your trading strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Before the Event</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Review consensus forecasts and previous data</li>
                  <li>• Identify potential market reactions</li>
                  <li>• Set up alerts for high-impact events</li>
                  <li>• Consider reducing position sizes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">After the Release</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Compare actual vs. forecast results</li>
                  <li>• Monitor immediate market reactions</li>
                  <li>• Look for trading opportunities in volatility</li>
                  <li>• Adjust positions based on new data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
