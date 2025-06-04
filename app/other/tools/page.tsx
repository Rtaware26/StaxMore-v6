"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, Target, Percent } from "lucide-react"

export default function TradingToolsPage() {
  const [positionSize, setPositionSize] = useState({
    accountSize: "",
    riskPercent: "",
    entryPrice: "",
    stopLoss: "",
    result: 0,
  })

  const [pipCalculator, setPipCalculator] = useState({
    pair: "EURUSD",
    lotSize: "",
    pips: "",
    result: 0,
  })

  const [riskReward, setRiskReward] = useState({
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    ratio: 0,
  })

  const calculatePositionSize = () => {
    const account = Number.parseFloat(positionSize.accountSize)
    const risk = Number.parseFloat(positionSize.riskPercent) / 100
    const entry = Number.parseFloat(positionSize.entryPrice)
    const stop = Number.parseFloat(positionSize.stopLoss)

    if (account && risk && entry && stop) {
      const riskAmount = account * risk
      const priceRisk = Math.abs(entry - stop)
      const shares = Math.floor(riskAmount / priceRisk)

      setPositionSize((prev) => ({ ...prev, result: shares }))
    }
  }

  const calculatePipValue = () => {
    const lot = Number.parseFloat(pipCalculator.lotSize)
    const pips = Number.parseFloat(pipCalculator.pips)

    if (lot && pips) {
      // Simplified pip calculation (assuming USD account)
      const pipValue = lot * 10 * pips // Standard lot = 100,000 units
      setPipCalculator((prev) => ({ ...prev, result: pipValue }))
    }
  }

  const calculateRiskReward = () => {
    const entry = Number.parseFloat(riskReward.entryPrice)
    const stop = Number.parseFloat(riskReward.stopLoss)
    const target = Number.parseFloat(riskReward.takeProfit)

    if (entry && stop && target) {
      const risk = Math.abs(entry - stop)
      const reward = Math.abs(target - entry)
      const ratio = reward / risk

      setRiskReward((prev) => ({ ...prev, ratio: Number(ratio.toFixed(2)) }))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
            🛠️ Professional Tools
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Trading Tools</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Essential calculators and utilities for professional trading
          </p>
        </div>

        {/* Trading Calculators */}
        <Tabs defaultValue="position" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="position">Position Size</TabsTrigger>
            <TabsTrigger value="pip">Pip Calculator</TabsTrigger>
            <TabsTrigger value="risk">Risk/Reward</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>

          <TabsContent value="position">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                  Position Size Calculator
                </CardTitle>
                <CardDescription>Calculate the optimal position size based on your risk tolerance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountSize">Account Size ($)</Label>
                      <Input
                        id="accountSize"
                        type="number"
                        placeholder="10000"
                        value={positionSize.accountSize}
                        onChange={(e) => setPositionSize((prev) => ({ ...prev, accountSize: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="riskPercent">Risk Per Trade (%)</Label>
                      <Input
                        id="riskPercent"
                        type="number"
                        placeholder="1"
                        value={positionSize.riskPercent}
                        onChange={(e) => setPositionSize((prev) => ({ ...prev, riskPercent: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="entryPrice">Entry Price ($)</Label>
                      <Input
                        id="entryPrice"
                        type="number"
                        placeholder="100"
                        value={positionSize.entryPrice}
                        onChange={(e) => setPositionSize((prev) => ({ ...prev, entryPrice: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stopLoss">Stop Loss ($)</Label>
                      <Input
                        id="stopLoss"
                        type="number"
                        placeholder="95"
                        value={positionSize.stopLoss}
                        onChange={(e) => setPositionSize((prev) => ({ ...prev, stopLoss: e.target.value }))}
                      />
                    </div>
                    <Button onClick={calculatePositionSize} className="w-full btn-primary">
                      Calculate Position Size
                    </Button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Result</h3>
                    {positionSize.result > 0 ? (
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-emerald-600">
                          {positionSize.result.toLocaleString()} shares
                        </div>
                        <div className="text-sm text-slate-600">
                          Total position value: $
                          {(positionSize.result * Number.parseFloat(positionSize.entryPrice || "0")).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">
                          Maximum loss: $
                          {(
                            (Number.parseFloat(positionSize.accountSize || "0") *
                              Number.parseFloat(positionSize.riskPercent || "0")) /
                            100
                          ).toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600">Enter values to calculate position size</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pip">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                  Pip Value Calculator
                </CardTitle>
                <CardDescription>Calculate the monetary value of pips for forex trading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pair">Currency Pair</Label>
                      <select
                        className="w-full p-2 border border-slate-200 rounded-lg"
                        value={pipCalculator.pair}
                        onChange={(e) => setPipCalculator((prev) => ({ ...prev, pair: e.target.value }))}
                      >
                        <option value="EURUSD">EUR/USD</option>
                        <option value="GBPUSD">GBP/USD</option>
                        <option value="USDJPY">USD/JPY</option>
                        <option value="USDCHF">USD/CHF</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="lotSize">Lot Size</Label>
                      <Input
                        id="lotSize"
                        type="number"
                        placeholder="1"
                        value={pipCalculator.lotSize}
                        onChange={(e) => setPipCalculator((prev) => ({ ...prev, lotSize: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pips">Number of Pips</Label>
                      <Input
                        id="pips"
                        type="number"
                        placeholder="10"
                        value={pipCalculator.pips}
                        onChange={(e) => setPipCalculator((prev) => ({ ...prev, pips: e.target.value }))}
                      />
                    </div>
                    <Button onClick={calculatePipValue} className="w-full btn-primary">
                      Calculate Pip Value
                    </Button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Result</h3>
                    {pipCalculator.result > 0 ? (
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-emerald-600">${pipCalculator.result.toFixed(2)}</div>
                        <div className="text-sm text-slate-600">
                          Pip value for {pipCalculator.lotSize} lot(s) of {pipCalculator.pair}
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600">Enter values to calculate pip value</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  Risk/Reward Ratio Calculator
                </CardTitle>
                <CardDescription>Analyze the risk-to-reward ratio of your trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="entryPrice">Entry Price ($)</Label>
                      <Input
                        id="entryPrice"
                        type="number"
                        placeholder="100"
                        value={riskReward.entryPrice}
                        onChange={(e) => setRiskReward((prev) => ({ ...prev, entryPrice: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stopLoss">Stop Loss ($)</Label>
                      <Input
                        id="stopLoss"
                        type="number"
                        placeholder="95"
                        value={riskReward.stopLoss}
                        onChange={(e) => setRiskReward((prev) => ({ ...prev, stopLoss: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="takeProfit">Take Profit ($)</Label>
                      <Input
                        id="takeProfit"
                        type="number"
                        placeholder="110"
                        value={riskReward.takeProfit}
                        onChange={(e) => setRiskReward((prev) => ({ ...prev, takeProfit: e.target.value }))}
                      />
                    </div>
                    <Button onClick={calculateRiskReward} className="w-full btn-primary">
                      Calculate Risk/Reward
                    </Button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Result</h3>
                    {riskReward.ratio > 0 ? (
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-purple-600">1:{riskReward.ratio}</div>
                        <div className="text-sm text-slate-600">Risk/Reward Ratio</div>
                        <div
                          className={`text-sm font-medium ${riskReward.ratio >= 2 ? "text-emerald-600" : riskReward.ratio >= 1 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {riskReward.ratio >= 2
                            ? "Excellent ratio"
                            : riskReward.ratio >= 1
                              ? "Acceptable ratio"
                              : "Poor ratio"}
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600">Enter values to calculate risk/reward ratio</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compound">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="h-5 w-5 mr-2 text-yellow-600" />
                  Compound Interest Calculator
                </CardTitle>
                <CardDescription>See how your trading profits can compound over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-slate-600">
                    Coming soon - Advanced compound interest calculator with monthly contributions and variable returns
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Reference */}
        <Card className="card-modern mt-8">
          <CardHeader>
            <CardTitle>Trading Rules Quick Reference</CardTitle>
            <CardDescription>Essential guidelines for successful trading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Risk Management</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Never risk more than 1-2% per trade</li>
                  <li>• Use stop losses on every position</li>
                  <li>• Maintain risk/reward ratio of 1:2 or better</li>
                  <li>• Diversify across different assets</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Position Sizing</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Calculate position size before entry</li>
                  <li>• Consider volatility and market conditions</li>
                  <li>• Adjust size based on confidence level</li>
                  <li>• Never go all-in on a single trade</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Psychology</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Stick to your trading plan</li>
                  <li>• Don't chase losses with bigger bets</li>
                  <li>• Take profits according to plan</li>
                  <li>• Keep a trading journal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
