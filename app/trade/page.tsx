"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useAuth } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { TradingService, type Trade, type Portfolio, type PriceData, type TradeRequest } from "@/lib/trading-service"
import {
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Trophy,
  BarChart3,
  AlertTriangle,
  Clock,
  Zap,
  AlertCircle,
} from "lucide-react"
import { AssetService, type Asset } from "@/lib/asset-service"
import { PriceService } from "@/lib/price-service"
import { AssetSelector } from "@/components/asset-selector"
import { LeagueService, type League } from "@/lib/league-service"
import { handleCheckout } from "@/lib/checkout-service"
import { useLeagueAccess } from "@/hooks/useLeagueAccess"

export default function TradePage() {
  const { user } = useAuth()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [prices, setPrices] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [priceLoading, setPriceLoading] = useState(false)
  const [priceErrors, setPriceErrors] = useState<Record<string, boolean>>({})

  // Enhanced trading form state
  const [selectedSymbol, setSelectedSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [positionType, setPositionType] = useState<"long" | "short">("long")
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [limitPrice, setLimitPrice] = useState("")
  const [stopLoss, setStopLoss] = useState("")
  const [takeProfit, setTakeProfit] = useState("")
  const [leverage, setLeverage] = useState([10])
  const [strategyName, setStrategyName] = useState("")
  const [tradeReason, setTradeReason] = useState("")
  const [confidenceLevel, setConfidenceLevel] = useState([5])
  const [tradeLoading, setTradeLoading] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'mock-audusd-id',
      symbol: 'AUDUSD',
      name: 'Australian Dollar / US Dollar',
      asset_class: 'forex',
      base_currency: 'AUD',
      quote_currency: 'USD',
      precision: 5,
      lot_size: 100000,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ])
  const [league, setLeague] = useState<League | null>(null)
  const [optionsEligible, setOptionsEligible] = useState(false)

  const { allowed, loading: leagueAccessLoading } = useLeagueAccess()

  const selectedPrice = prices.find((p) => p.symbol === selectedSymbol)
  const hasPriceError = priceErrors[selectedSymbol] === true
  const effectivePrice = orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedPrice?.price || 0

  // Define the fixed opening balance
  const OPENING_BALANCE = 100000.0;

  // Calculate percentage return
  const percentageReturn = useMemo(() => {
    if (portfolio?.total_equity === undefined || portfolio?.total_equity === null) {
      return null; // Cannot calculate if equity is not available
    }

    const returnAmount = portfolio.total_equity - OPENING_BALANCE;
    return (returnAmount / OPENING_BALANCE) * 100;
  }, [portfolio?.total_equity]); // Recalculate when total_equity changes

  const { tradeValue, marginRequired, commission, pipValue } = useMemo(() => {
    let tradeValue = 0; // Notional Value
    let marginRequired = 0;
    let commission = 0;
    let pipValue = 0;

    if (selectedAsset && effectivePrice && quantity) {
      const quantityNum = Number.parseFloat(quantity);
      const leverageAmount = leverage[0] || 1; // Default leverage to 1 if not set

      let effectiveQuantity = quantityNum;
      if (selectedAsset.asset_class === "forex") {
        // Assume quantity is in lots for Forex, multiply by lot size to get units
        effectiveQuantity = quantityNum * (selectedAsset.lot_size || 100000);
      }
      tradeValue = effectiveQuantity * effectivePrice;

      // Calculate Margin Required
      marginRequired = tradeValue / leverageAmount;

      // Calculate Commission (using the same rate as backend)
      // NOTE: COMMISSION_RATE needs to be accessible here or hardcoded/defined locally
      // For now, hardcoding based on lib/trading-service.ts
      const frontendCommissionRate = 0.001;
      commission = tradeValue * frontendCommissionRate;

      // Calculate Pip Value for Forex (based on standard lot size if applicable)
      if (selectedAsset.asset_class === "forex") {
        const standardLotSize = selectedAsset.lot_size || 100000;
        // Pip value calculation: (pip size / exchange rate) * standard lot size
        // For most pairs, pip size is 0.0001, for JPY pairs it's 0.01
        const pipSize = selectedAsset.symbol.includes('JPY') ? 0.01 : 0.0001;
        pipValue = (pipSize / effectivePrice) * standardLotSize;
      }
    }
    return { tradeValue, marginRequired, commission, pipValue };
  }, [selectedAsset, effectivePrice, quantity, leverage]);

  // Define fetchPortfolio
  const fetchPortfolio = useCallback(async () => {
    if (!user) return
    try {
      const portfolioData = await TradingService.getPortfolio(user.id)
      if (portfolioData) {
        setPortfolio(portfolioData)
      } else {
        console.warn("No portfolio data returned, user may need portfolio initialization")
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error)
    }
  }, [user])

  // Define fetchTrades
  const fetchTrades = useCallback(async () => {
    if (!user) return
    try {
      const tradesData = await TradingService.getTrades(user.id)
      setTrades(tradesData)
    } catch (error) {
      console.error("Error fetching trades:", error)
    }
  }, [user])

  // Define fetchPrices - fetches only AUDUSD
  const fetchPrices = useCallback(async () => {
    if (priceLoading) return
    setPriceLoading(true)
    try {
      const symbols = ['AUDUSD']
      const pricesData = await PriceService.getPrices(symbols)

      // Track which symbols had errors
      const errors: Record<string, boolean> = {}
      for (const symbol of symbols) {
        const price = pricesData.find((p) => p.symbol === symbol)
        if (!price || price.error) {
          errors[symbol] = true
        }
      }
      setPriceErrors(errors)

      // Filter out error prices
      const validPrices = pricesData.filter((p) => !p.error)
      setPrices(validPrices)

      if (user && validPrices.length > 0) {
        await TradingService.processAutoClose(user.id, validPrices)
        await TradingService.updateUnrealizedPnL(user.id, validPrices)

        const [portfolioData, tradesData] = await Promise.all([
          TradingService.getPortfolio(user.id),
          TradingService.getTrades(user.id),
        ])

        if (portfolioData) setPortfolio(portfolioData)
        if (tradesData) setTrades(tradesData)
      }
    } catch (error) {
      console.error("Error fetching prices:", error)
    } finally {
      setPriceLoading(false)
    }
  }, [user, priceLoading])

  // Define loadData using useCallback directly within the component body
  const loadData = useCallback(async () => {
    console.log("loadData: Function called")
    setLoading(true)
    console.log("loadData: Starting initial data fetch")
    try {
      // Fetch prices for a limited set of symbols on initial load
      const symbols = ['AUDUSD']

      console.log("loadData: Fetching portfolio, trades, prices, and league")
      if (!user) {
        console.log("loadData: User is null, skipping data fetch")
        return
      }
      const [portfolioData, tradesData, pricesData, leagueData] = await Promise.all([
        TradingService.getPortfolio(user.id),
        TradingService.getTrades(user.id),
        PriceService.getPrices(symbols),
        LeagueService.getUserLeague(user.id),
      ])
      console.log("loadData: Finished fetching initial data")

      // Track which symbols had errors
      const errors: Record<string, boolean> = {}
      for (const symbol of symbols) {
        const price = pricesData.find((p) => p.symbol === symbol)
        if (!price || price.error) {
          errors[symbol] = true
        }
      }
      setPriceErrors(errors)

      // Filter out error prices
      const validPrices = pricesData.filter((p) => !p.error)
      setPrices(validPrices)

      if (user && validPrices.length > 0) {
        console.log("loadData: Processing auto-close and updating PnL")
        await TradingService.processAutoClose(user.id, validPrices)
        await TradingService.updateUnrealizedPnL(user.id, validPrices)

        console.log("loadData: Refetching portfolio and trades after PnL update")
        const [portfolioDataUpdated, tradesDataUpdated] = await Promise.all([
          TradingService.getPortfolio(user.id),
          TradingService.getTrades(user.id),
        ])

        if (portfolioDataUpdated) setPortfolio(portfolioDataUpdated)
        if (tradesDataUpdated) setTrades(tradesDataUpdated)
      } else {
        // Set initial data even if no valid prices or user not found
        if (portfolioData) setPortfolio(portfolioData)
        if (tradesData) setTrades(tradesData)
      }

      if (leagueData) setLeague(leagueData)
      console.log("loadData: Initial data processing complete")

    } catch (error) {
      console.error("loadData: Error during initial data fetch or processing:", error)
    } finally {
      setLoading(false)
      console.log("loadData: Loading state set to false")
    }

    // Note: Assets state is initialized directly, not fetched here.

  }, [user, setPortfolio, setTrades, setPrices, setLoading, setPriceErrors, setLeague])

  // Initial data load - Call loadData from useEffect
  useEffect(() => {
    if (!user) {
      setPortfolio(null)
      setTrades([])
      setPrices([])
      setLoading(false)
      return
    }

    // Call the loadData function
    loadData()

    // Set initial selected asset to AUDUSD
    const audusdAsset = assets.find(asset => asset.symbol === 'AUDUSD');
    if(audusdAsset) {
      setSelectedSymbol('AUDUSD');
      setSelectedAsset(audusdAsset);
    }

  }, [user, loadData, assets])

  // Set up price updates every 10 seconds
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      fetchPrices()
    }, 10000) // 10 seconds for direct API calls

    return () => clearInterval(interval)
  }, [user, fetchPrices])

  // Handle enhanced trade submission - Basic implementation assumed if removed
  const handlePlaceTrade = useCallback(async () => {
    if (!user || !selectedSymbol || !quantity) return

    setTradeLoading(true)
    try {
      const selectedPrice = prices.find((p) => p.symbol === selectedSymbol)
      if (!selectedPrice) {
        alert("Price not available for selected symbol")
        setTradeLoading(false)
        return
      }

      if (!selectedAsset) {
        alert("Please select a valid asset before placing a trade.")
        console.error("Trade placement failed: No asset selected.")
        setTradeLoading(false)
        return
      }

      if (!selectedAsset.asset_class) {
        alert(`Missing asset class for ${selectedAsset.symbol}. Cannot place trade.`)
        console.error(`Trade placement failed: Missing asset_class for ${selectedAsset.symbol}.`)
        setTradeLoading(false)
        return
      }

      if (selectedAsset.asset_class === 'forex' && !selectedAsset.lot_size) {
        console.warn(`Lot size not defined for Forex asset ${selectedAsset.symbol}. Using default in TradingService.`)
      }

      const tradeRequest: TradeRequest = {
        user_id: user.id,
        symbol: selectedSymbol,
        position_type: positionType,
        quantity: Number.parseFloat(quantity),
        order_type: orderType,
        limit_price: orderType === 'limit' ? Number.parseFloat(limitPrice) : undefined, // Correctly get limitPrice for limit orders
        stop_loss: stopLoss ? Number.parseFloat(stopLoss) : undefined,
        take_profit: takeProfit ? Number.parseFloat(takeProfit) : undefined,
        leverage: leverage[0],
        strategy_name: strategyName || undefined,
        trade_reason: tradeReason || undefined,
        confidence_level: confidenceLevel[0],
        asset: selectedAsset, // Pass selectedAsset
      }

      console.log('Sending trade request to server:', tradeRequest);

      const result = await TradingService.placeTrade(tradeRequest)

      // Check if the result is a Trade object (successful trade)
      if (result && typeof result === 'object' && 'id' in result) {
        // Reset form
        setSelectedSymbol("")
        setQuantity("")
        setLimitPrice("")
        setStopLoss("")
        setTakeProfit("")
        setStrategyName("")
        setTradeReason("")
        setLeverage([10])
        setConfidenceLevel([5])
        // Refresh data
        await fetchPortfolio()
        await fetchTrades()
        alert("Trade placed successfully!")
      } else {
        // The server returned a generic error object or something unexpected
        const errorMessage = (result && typeof result === 'object' && result.error && result.message) ? result.message : "Failed to place trade. Please check your balance and try again.";
        alert(errorMessage);
      }
    } catch (error: any) {
      let errorMsg = "Unknown error";

      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === "object" && error !== null) {
        errorMsg = error.message || error.error || error.msg || JSON.stringify(error);
      }

      console.error("Error placing trade:", errorMsg, error);
      alert("Error placing trade: " + errorMsg);
    } finally {
      setTradeLoading(false)
    }
  }, [user, selectedSymbol, positionType, quantity, orderType, limitPrice, stopLoss, takeProfit, leverage, strategyName, tradeReason, confidenceLevel, selectedAsset, prices, fetchPortfolio, fetchTrades]) // Added dependencies

  // Handle close trade - Basic implementation assumed if removed
  const handleCloseTrade = useCallback(async (tradeId: string, symbol: string) => {
    console.log("handleCloseTrade: called for", tradeId, symbol);
    try {
      // Call the backend to close the trade
      const closedTrade = await TradingService.closeTrade(tradeId);

      if (closedTrade) {
        console.log('Trade closed successfully:', closedTrade);
        // Refresh portfolio and trades data
        await fetchPortfolio();
        await fetchTrades();
        alert(`Trade ${tradeId} closed successfully!`);
    } else {
        console.error('Failed to close trade:', tradeId);
        alert(`Failed to close trade ${tradeId}. Please try again.`);
    }
    } catch (error) {
      console.error('Error closing trade:', error);
      alert(`An error occurred while closing trade ${tradeId}.`);
    }
  }, [])

  if (loading || leagueAccessLoading) {
    return <div className="flex justify-center items-center h-screen">Loading live trading...</div>;
  }

  if (!allowed) {
    // useLeagueAccess will handle the redirect, but we can show a message here too
    return <div className="flex justify-center items-center h-screen">Access Denied. Redirecting...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Professional Trading Platform</h1>
            <p className="text-xl text-slate-600">Advanced trading with comprehensive risk management</p>
          </div>

          {/* Enhanced Portfolio Overview */}
          <div className="grid lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolio?.total_equity?.toLocaleString() || "100,000"}</div>
                <p className="text-xs text-slate-600">
                  {portfolio ? "Cash + Unrealized P&L" : "Initializing portfolio..."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
                <Target className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolio?.cash_balance?.toLocaleString() || "100,000"}</div>
                <p className="text-xs text-slate-600">Ready for trading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${(portfolio?.unrealized_pnl || 0) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {(portfolio?.unrealized_pnl || 0) >= 0 ? "+" : ""}${portfolio?.unrealized_pnl?.toFixed(2) || "0.00"}
                </div>
                <p className="text-xs text-slate-600">Open positions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Realized P&L</CardTitle>
                <Activity className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${(portfolio?.realized_pnl || 0) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {(portfolio?.realized_pnl || 0) >= 0 ? "+" : ""}${portfolio?.realized_pnl?.toFixed(2) || "0.00"}
                </div>
                <p className="text-xs text-slate-600">Closed trades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Trophy className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolio?.win_rate?.toFixed(1) || "0.0"}%</div>
                <p className="text-xs text-slate-600">
                  {portfolio?.winning_trades || 0}W / {portfolio?.losing_trades || 0}L
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${(portfolio?.risk_score || 0) > 50 ? "text-red-600" : "text-emerald-600"}`}
                >
                  {portfolio?.risk_score?.toFixed(1) || "0.0"}%
                </div>
                <p className="text-xs text-slate-600">{portfolio?.position_count || 0} open positions</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Trading Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Trading</CardTitle>
                  <CardDescription>Professional trading with risk management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Symbol Selection */}
                  <div>
                    <Label htmlFor="symbol">Trading Asset</Label>
                    <AssetSelector
                      selectedSymbol={selectedSymbol}
                      onSymbolChange={(symbol, asset) => {
                        setSelectedSymbol(symbol)
                        setSelectedAsset(asset)
                      }}
                    />
                  </div>

                  {/* Market Data Display */}
                  {selectedSymbol && (
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{selectedSymbol}</span>
                        <div className="text-right">
                          {hasPriceError ? (
                            <div className="flex items-center text-amber-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span>—</span>
                            </div>
                          ) : selectedPrice ? (
                            <>
                              <div className="font-bold">${selectedPrice.price.toFixed(4)}</div>
                              <div
                                className={`text-sm ${selectedPrice.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                              >
                                {selectedPrice.change >= 0 ? "+" : ""}
                                {selectedPrice.change.toFixed(4)} ({selectedPrice.changePercent.toFixed(2)}%)
                              </div>
                            </>
                          ) : (
                            <div className="text-xs text-slate-500">Select an asset</div>
                          )}
                        </div>
                      </div>
                      {selectedPrice && !hasPriceError && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Bid: ${selectedPrice.bid.toFixed(4)}</div>
                          <div>Ask: ${selectedPrice.ask.toFixed(4)}</div>
                          <div className="col-span-2">Spread: ${selectedPrice.spread.toFixed(4)}</div>
                        </div>
                      )}
                      {hasPriceError && (
                        <div className="text-xs text-amber-600">
                          Price data temporarily unavailable. Please try again later.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Type */}
                  <div>
                    <Label>Order Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        variant={orderType === "market" ? "default" : "outline"}
                        onClick={() => setOrderType("market")}
                        className="w-full"
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Market
                      </Button>
                      <Button
                        variant={orderType === "limit" ? "default" : "outline"}
                        onClick={() => setOrderType("limit")}
                        className="w-full"
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Limit
                      </Button>
                    </div>
                  </div>

                  {/* Position Type */}
                  <div>
                    <Label>Position Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        variant={positionType === "long" ? "default" : "outline"}
                        onClick={() => setPositionType("long")}
                        className="w-full"
                      >
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Long (Buy)
                      </Button>
                      <Button
                        variant={positionType === "short" ? "default" : "outline"}
                        onClick={() => setPositionType("short")}
                        className="w-full"
                      >
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        Short (Sell)
                      </Button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  {/* Limit Price (if limit order) */}
                  {orderType === "limit" && (
                    <div>
                      <Label htmlFor="limitPrice">Limit Price</Label>
                      <Input
                        id="limitPrice"
                        type="number"
                        step="0.0001"
                        placeholder="Enter limit price"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Advanced Fields - Only show for market or limit orders */}
                  {(orderType === "market" || orderType === "limit") && (
                    <>
                      <div className="space-y-2">
                        <Label>Leverage: {leverage[0]}×</Label>
                        <Slider
                          value={leverage}
                          onValueChange={setLeverage}
                          max={1000}
                          min={10}
                          step={10}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>10×</span>
                          <span>500×</span>
                          <span>1000×</span>
                        </div>
                      </div>

                      {/* Stop Loss & Take Profit */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="stopLoss">Stop Loss</Label>
                          <Input
                            id="stopLoss"
                            type="number"
                            step="0.0001"
                            placeholder="SL Price"
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="takeProfit">Take Profit</Label>
                          <Input
                            id="takeProfit"
                            type="number"
                            step="0.0001"
                            placeholder="TP Price"
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Strategy Name */}
                      <div>
                        <Label htmlFor="strategy">Strategy</Label>
                        <Input
                          id="strategy"
                          placeholder="e.g., Breakout, Mean Reversion, Scalping"
                          value={strategyName}
                          onChange={(e) => setStrategyName(e.target.value)}
                        />
                      </div>

                      {/* Trade Reason */}
                      <div>
                        <Label htmlFor="reason">Trade Reason</Label>
                        <Textarea
                          id="reason"
                          placeholder="Why are you taking this trade? Technical analysis, news, etc."
                          value={tradeReason}
                          onChange={(e) => setTradeReason(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                      </div>

                      {/* Confidence Level Slider */}
                      <div className="space-y-2">
                        <Label>Confidence Level: {confidenceLevel[0]}/10</Label>
                        <Slider
                          value={confidenceLevel}
                          onValueChange={setConfidenceLevel}
                          max={10}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Low (1)</span>
                          <span>Medium (5)</span>
                          <span>High (10)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {league?.options_enabled && (
                    <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-100 text-purple-800">Options Trading</Badge>
                        <span className="text-sm text-purple-700">Available in your league</span>
                      </div>
                      {/* Add options trading controls here */}
                    </div>
                  )}

                  {/* Trade Summary */}
                  {selectedPrice && !hasPriceError && tradeValue > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                      <div className="text-sm font-medium text-blue-900">Trade Summary</div>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div className="flex justify-between">
                          <span>Position Value:</span>
                          <span className="font-medium">${tradeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Margin Required:</span>
                          <span className="font-medium">${marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Commission:</span>
                          <span className="font-medium">${commission.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Balance:</span>
                          <span className="font-medium">${portfolio?.cash_balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0"}</span>
                        </div>
                        {leverage[0] > 1 && (
                          <div className="flex justify-between">
                            <span>Leverage:</span>
                            <span className="font-medium">{leverage[0]}x</span>
                          </div>
                        )}
                        {selectedAsset?.asset_class === "forex" && pipValue > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span>Lot Size:</span>
                              <span className="font-medium">{selectedAsset.lot_size?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pip Value:</span>
                              <span className="font-medium">${pipValue.toFixed(4)}</span>
                            </div>
                          </>
                        )}
                      </div>
                      {marginRequired + commission > (portfolio?.cash_balance || 0) && (
                        <div className="flex items-center text-red-600 text-sm mt-2">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Insufficient balance for this trade
                        </div>
                      )}
                    </div>
                  )}

                  {/* Place Trade Button */}
                  <Button
                    onClick={handlePlaceTrade}
                    disabled={
                      !selectedSymbol ||
                      !quantity ||
                      tradeLoading ||
                      hasPriceError ||
                      marginRequired + commission > (portfolio?.cash_balance || 0) ||
                      (orderType === "limit" && !limitPrice)
                    }
                    className="w-full"
                    size="lg"
                  >
                    {tradeLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Placing Trade...
                      </>
                    ) : hasPriceError ? (
                      "Price Unavailable"
                    ) : (
                      `Place ${positionType === "long" ? "Buy" : "Sell"} Order`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Market Data & Positions */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="positions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="positions">Open Positions</TabsTrigger>
                  <TabsTrigger value="market">Market Data</TabsTrigger>
                </TabsList>

                <TabsContent value="positions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Open Positions</span>
                        <Badge variant="outline">{trades.length} positions</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {trades.length === 0 ? (
                        <div className="text-center py-8 text-slate-600">
                          No open positions. Place your first trade!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {trades.map((trade) => {
                            const currentPrice =
                              prices.find((p) => p.symbol === trade.symbol)?.price || trade.current_price
                            const unrealizedPnL = TradingService.calculateUnrealizedPnL(trade, currentPrice)
                            const hasError = priceErrors[trade.symbol] === true

                            return (
                              <div key={trade.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-semibold">{trade.symbol}</span>
                                    <Badge
                                      className={`${
                                        trade.position_type === "long"
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {trade.position_type.toUpperCase()}
                                    </Badge>
                                    {trade.leverage > 1 && <Badge variant="outline">{trade.leverage}x</Badge>}
                                  </div>
                                  <div className="text-right">
                                    {hasError ? (
                                      <div className="flex items-center text-amber-600">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        <span>—</span>
                                      </div>
                                    ) : (
                                      <>
                                        <div
                                          className={`font-semibold ${unrealizedPnL >= 0 ? "text-emerald-600" : "text-red-600"}`}
                                        >
                                          {unrealizedPnL >= 0 ? "+" : ""}${unrealizedPnL.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-slate-600">
                                          {((unrealizedPnL / trade.position_size_usd) * 100).toFixed(2)}%
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                                  <div>
                                    <div>Quantity: {trade.quantity}</div>
                                    <div>Entry: ${trade.entry_price.toFixed(4)}</div>
                                    <div>Current: {hasError ? "—" : `$${currentPrice.toFixed(4)}`}</div>
                                  </div>
                                  <div>
                                    <div>Size: ${trade.position_size_usd.toLocaleString()}</div>
                                    <div>Margin: ${trade.margin_used.toLocaleString()}</div>
                                    {trade.strategy_name && <div>Strategy: {trade.strategy_name}</div>}
                                  </div>
                                </div>

                                {/* Risk Management Levels */}
                                {(trade.stop_loss || trade.take_profit) && (
                                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 mb-3">
                                    {trade.stop_loss && (
                                      <div className="flex items-center">
                                        <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                                        SL: ${trade.stop_loss.toFixed(4)}
                                      </div>
                                    )}
                                    {trade.take_profit && (
                                      <div className="flex items-center">
                                        <Target className="h-3 w-3 mr-1 text-emerald-500" />
                                        TP: ${trade.take_profit.toFixed(4)}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Trade Metadata */}
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {new Date(trade.created_at).toLocaleDateString()}
                                    </div>
                                    {trade.confidence_level && <div>Confidence: {trade.confidence_level}/10</div>}
                                  </div>
                                  <div>Session: {trade.trade_session.slice(-6)}</div>
                                </div>

                                {/* Trade Reason */}
                                {trade.trade_reason && (
                                  <div className="text-xs text-slate-600 mb-3 p-2 bg-slate-50 rounded">
                                    <strong>Reason:</strong> {trade.trade_reason}
                                  </div>
                                )}

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCloseTrade(trade.id, trade.symbol)}
                                  className="w-full"
                                  disabled={hasError}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Close Position
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="market">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Live Market Data</span>
                        <Button size="sm" variant="outline" onClick={fetchPrices} disabled={priceLoading}>
                          <RefreshCw className={`h-4 w-4 mr-2 ${priceLoading ? "animate-spin" : ""}`} />
                          Refresh
                        </Button>
                      </CardTitle>
                      <CardDescription>Prices update every 10 seconds from Twelve Data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {assets.map((asset) => {
                          const price = prices.find((p) => p.symbol === asset.symbol)
                          const hasError = priceErrors[asset.symbol] === true

                          return (
                            <div
                              key={asset.symbol}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
                              onClick={() => setSelectedSymbol(asset.symbol)}
                            >
                              <div>
                                <div className="font-semibold">{asset.symbol}</div>
                                <div className="text-xs text-slate-500">
                                  {asset.name} • {asset.asset_class}
                                </div>
                              </div>
                              <div className="text-right">
                                {hasError ? (
                                  <div className="flex items-center text-amber-600">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    <span>—</span>
                                  </div>
                                ) : price ? (
                                  <>
                                    <div className="font-semibold">${price.price.toFixed(4)}</div>
                                    <div
                                      className={`text-sm flex items-center ${
                                        price.change >= 0 ? "text-emerald-600" : "text-red-600"
                                      }`}
                                    >
                                      {price.change >= 0 ? (
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                      ) : (
                                        <ArrowDownRight className="h-3 w-3 mr-1" />
                                      )}
                                      {price.change >= 0 ? "+" : ""}
                                      {price.change.toFixed(4)} ({price.changePercent.toFixed(2)}%)
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-xs text-slate-500">No data</div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Trading Statistics */}
          <div className="grid lg:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Trades:</span>
                  <span className="font-semibold">{portfolio?.total_trades || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Largest Win:</span>
                  <span className="font-semibold text-emerald-600">
                    ${portfolio?.largest_win?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Largest Loss:</span>
                  <span className="font-semibold text-red-600">${portfolio?.largest_loss?.toFixed(2) || "0.00"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Competition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">League:</span>
                  <Badge className="capitalize">{portfolio?.league_id || "Not Joined"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rank:</span>
                  <span className="font-semibold">#{portfolio?.competition_rank || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Score:</span>
                  <span className="font-semibold">{portfolio?.competition_score?.toFixed(0) || "0"}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Percentage Return Box */}
            <Card>
              <CardHeader>
              <CardTitle className="text-lg font-semibold">Percentage Return</CardTitle>
              </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${percentageReturn !== null && percentageReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {percentageReturn !== null ? `$${percentageReturn.toFixed(2)}%` : '--%'}
                </div>
              <CardDescription>Calculated based on Total Equity / Opening Balance (100,000)</CardDescription>
              </CardContent>
            </Card>

          {/* Portfolio Summary */}
            <Card>
              <CardHeader>
              <CardTitle className="text-lg font-semibold">Portfolio Summary</CardTitle>
              </CardHeader>
            <CardContent>
              {/* Existing portfolio summary content */}
              </CardContent>
            </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
