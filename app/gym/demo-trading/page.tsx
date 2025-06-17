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
// import { useLeagueAccess } from "@/hooks/useLeagueAccess" // Removed for demo trading
import { formatCurrencyAbbreviated } from "@/lib/utils"
import { FeatureAccess } from "@/components/feature-access"

export default function DemoTradePage() { // Renamed component for clarity
  const { user, loading: authLoading } = useAuth() // Renamed loading to authLoading to avoid conflicts
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [prices, setPrices] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true) // Overall page loading
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
  const [resettingBalance, setResettingBalance] = useState(false) // New state for reset button loading
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

  // NOTE: For demo trading, we will not use useLeagueAccess
  // const { allowed, loading: leagueAccessLoading } = useLeagueAccess()

  const selectedPrice = prices.find((p) => p.symbol === selectedSymbol)
  const hasPriceError = priceErrors[selectedSymbol] === true
  const effectivePrice = orderType === "limit" && limitPrice ? Number.parseFloat(limitPrice) : selectedPrice?.price || 0

  // Define the fixed opening balance for demo
  const OPENING_DEMO_BALANCE = 100000.0;

  // Calculate percentage return for demo
  const percentageReturn = useMemo(() => {
    if (portfolio?.total_equity === undefined || portfolio?.total_equity === null) {
      return null; // Cannot calculate if equity is not available
    }

    const returnAmount = portfolio.total_equity - OPENING_DEMO_BALANCE;
    return (returnAmount / OPENING_DEMO_BALANCE) * 100;
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

  // Define fetchPortfolio - MODIFIED FOR DEMO
  const fetchPortfolio = useCallback(async () => {
    if (!user) return
    try {
      // Assuming a separate demo portfolio or mocked data for demo
      const portfolioData = await TradingService.getDemoPortfolio(user.id) // Placeholder for DemoTradingService
      if (portfolioData) {
        setPortfolio(portfolioData)
      } else {
        console.warn("No demo portfolio data returned, user may need demo portfolio initialization")
      }
    } catch (error) {
      console.error("Error fetching demo portfolio:", error)
    }
  }, [user])

  // Define fetchTrades - MODIFIED FOR DEMO
  const fetchTrades = useCallback(async () => {
    if (!user) return
    try {
      // Assuming a separate demo trades or mocked data for demo
      const tradesData = await TradingService.getDemoTrades(user.id) // Placeholder for DemoTradingService
      setTrades(tradesData)
    } catch (error) {
      console.error("Error fetching demo trades:", error)
    }
  }, [user])

  // Define fetchPrices - fetches only AUDUSD (same for demo)
  const fetchPrices = useCallback(async () => {
    if (priceLoading) return
    setPriceLoading(true)
    try {
      const symbols = ['AUDUSD']
      // MODIFIED: Use TradingService.getDemoPrices instead of PriceService.getPrices
      const pricesData = await TradingService.getDemoPrices(symbols) 

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
        // These will need to be demo-specific in a DemoTradingService
        await TradingService.processAutoCloseDemo(user.id, validPrices) // Placeholder
        await TradingService.updateUnrealizedPnLDemo(user.id, validPrices) // Placeholder

        const [portfolioData, tradesData] = await Promise.all([
          TradingService.getDemoPortfolio(user.id), // Placeholder
          TradingService.getDemoTrades(user.id), // Placeholder
        ])

        if (portfolioData) setPortfolio(portfolioData)
        if (tradesData) setTrades(tradesData)
      }
    } catch (error) {
      console.error("Error fetching prices for demo:", error)
    } finally {
      setPriceLoading(false)
    }
  }, [user, priceLoading])

  // Define loadData using useCallback directly within the component body - MODIFIED FOR DEMO
  const loadData = useCallback(async () => {
    console.log("loadData: Function called for Demo Trading")
    setLoading(true)
    console.log("loadData: Starting initial demo data fetch")
    try {
      const symbols = ['AUDUSD']

      console.log("loadData: Fetching demo portfolio, trades, prices, and league")
      if (!user) {
        console.log("loadData: User is null, skipping data fetch for demo")
        return
      }
      // Use demo-specific services/functions here
      const [portfolioData, tradesData, pricesData, leagueData] = await Promise.all([
        TradingService.getDemoPortfolio(user.id), // Placeholder
        TradingService.getDemoTrades(user.id), // Placeholder
        TradingService.getDemoPrices(symbols), // MODIFIED: Use TradingService.getDemoPrices
        LeagueService.getUserLeague(user.id), // League info might still be relevant
      ])
      console.log("loadData: Finished fetching initial demo data")

      const errors: Record<string, boolean> = {}
      for (const symbol of symbols) {
        const price = pricesData.find((p) => p.symbol === symbol)
        if (!price || price.error) {
          errors[symbol] = true
        }
      }
      setPriceErrors(errors)

      const validPrices = pricesData.filter((p) => !p.error)
      setPrices(validPrices)

      if (user && validPrices.length > 0) {
        console.log("loadData: Processing demo auto-close and updating demo PnL")
        await TradingService.processAutoCloseDemo(user.id, validPrices) // Placeholder
        await TradingService.updateUnrealizedPnLDemo(user.id, validPrices) // Placeholder

        console.log("loadData: Refetching demo portfolio and trades after PnL update")
        const [portfolioDataUpdated, tradesDataUpdated] = await Promise.all([
          TradingService.getDemoPortfolio(user.id), // Placeholder
          TradingService.getDemoTrades(user.id), // Placeholder
        ])

        if (portfolioDataUpdated) setPortfolio(portfolioDataUpdated)
        if (tradesDataUpdated) setTrades(tradesDataUpdated)
      }
      if (leagueData) setLeague(leagueData)
    } catch (error) {
      console.error("loadData: Error fetching initial demo data:", error)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Initial data load and price polling
  useEffect(() => {
    loadData()
    // Poll prices every 5 seconds
    const interval = setInterval(() => {
      fetchPrices()
    }, 5000)
    return () => clearInterval(interval)
  }, [loadData, fetchPrices])

  const handlePlaceTrade = async () => {
    if (!user || !selectedAsset || !quantity || !effectivePrice || tradeLoading) return

    setTradeLoading(true)
    try {
      const tradeRequest: TradeRequest = {
        asset_id: selectedAsset.id,
        symbol: selectedSymbol,
        quantity: Number.parseFloat(quantity),
        position_type: positionType,
        order_type: orderType,
        price: effectivePrice,
        leverage: leverage[0] || 1,
        stop_loss: stopLoss ? Number.parseFloat(stopLoss) : null,
        take_profit: takeProfit ? Number.parseFloat(takeProfit) : null,
        strategy_name: strategyName || null,
        trade_reason: tradeReason || null,
        confidence_level: confidenceLevel[0] || 5,
        // Ensure this is a demo trade
        is_demo: true, // IMPORTANT: Mark as demo trade
      }
      // Use a demo-specific trading service function
      const newTrade = await TradingService.placeDemoTrade(user.id, tradeRequest) // Placeholder
      if (newTrade) {
        alert("Demo Trade Placed Successfully!")
        // Clear form and refetch data
        setSelectedSymbol("")
        setQuantity("")
        setLimitPrice("")
        setStopLoss("")
        setTakeProfit("")
        setStrategyName("")
        setTradeReason("")
        setConfidenceLevel([5])
        setSelectedAsset(null)
        fetchPortfolio()
        fetchTrades()
      } else {
        alert("Failed to place demo trade. Please try again.")
      }
    } catch (error) {
      console.error("Error placing demo trade:", error)
      alert("Error placing demo trade. Check console for details.")
    } finally {
      setTradeLoading(false)
    }
  }

  const handleResetBalance = async () => {
    if (!user) return;
    setResettingBalance(true);
    try {
      const success = await TradingService.resetDemoBalance(user.id);
      if (success) {
        alert("Demo balance reset successfully to $10,000 and all trades cleared!");
        await fetchPortfolio(); // Re-fetch portfolio data
        await fetchTrades();    // Re-fetch trades data
      } else {
        alert("Failed to reset demo balance. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting demo balance:", error);
      alert("An error occurred while resetting demo balance.");
    } finally {
      setResettingBalance(false);
    }
  };

  // Derived state for UI
  const availableBalance = portfolio?.available_balance || 0
  const equity = portfolio?.total_equity || 0
  const totalPnL = portfolio?.total_pnl || 0

  // Filter and calculate open/closed trades
  const openTrades = trades.filter((trade) => trade.status === "open")
  const closedTrades = trades.filter((trade) => trade.status === "closed")

  // Sum of unrealized PnL for open trades
  const unrealizedPnLSum = openTrades.reduce((sum, trade) => sum + (trade.unrealized_pnl || 0), 0);

  // Error handling for trading form
  const isFormValid = useMemo(() => {
    if (!selectedSymbol || !quantity || Number.parseFloat(quantity) <= 0) return false
    if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) return false
    // Add more validation rules as needed, e.g., stop loss/take profit vs current price
    return true
  }, [selectedSymbol, quantity, orderType, limitPrice])

  return (
    <FeatureAccess feature="demo-trading">
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Stonks Gym: Demo Trading</h1>
          <p className="text-muted-foreground mb-8 text-center">Practice your trading strategies with virtual money, risk-free!</p>

          {/* Key Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border border-border shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrencyAbbreviated(equity)}</div>
                <p className="text-xs text-muted-foreground">Starting: {formatCurrencyAbbreviated(OPENING_DEMO_BALANCE)}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrencyAbbreviated(availableBalance)}</div>
                <p className="text-xs text-muted-foreground">For new demo trades</p>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {formatCurrencyAbbreviated(totalPnL)}
                </div>
                {percentageReturn !== null && (
                  <p className={`text-xs ${percentageReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {percentageReturn.toFixed(2)}%
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              onClick={handleResetBalance}
              disabled={!user || resettingBalance}
              variant="outline"
              className="bg-red-500 text-primary-foreground hover:bg-red-600/90"
            >
              {resettingBalance ? "Resetting Balance..." : "Reset Demo Balance to $10K"}
            </Button>
          </div>

          <Tabs defaultValue="place-trade" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="place-trade">Place Demo Trade</TabsTrigger>
              <TabsTrigger value="open-trades">Open Demo Trades ({openTrades.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="place-trade">
              <Card className="bg-card border border-border shadow-md">
                <CardHeader>
                  <CardTitle>Place New Demo Trade</CardTitle>
                  <CardDescription>Execute a simulated trade on the market.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AssetSelector
                    assets={assets}
                    selectedAsset={selectedAsset}
                    onSelectAsset={setSelectedAsset}
                    onSymbolChange={setSelectedSymbol}
                  />

                  {selectedSymbol && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price Display */}
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="current-price">Current Price ({selectedSymbol})</Label>
                        <Input
                          id="current-price"
                          type="text"
                          value={selectedPrice?.price ? selectedPrice.price.toFixed(selectedAsset?.precision || 5) : "Fetching..."}
                          readOnly
                          className="font-mono bg-muted text-foreground"
                        />
                        {hasPriceError && (
                          <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Failed to fetch price. Try another asset or refresh.
                          </p>
                        )}
                        {selectedPrice?.timestamp && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Last updated: {new Date(selectedPrice.timestamp).toLocaleTimeString()}
                          </p>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity (Units)</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="e.g., 10000"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="bg-input text-foreground border-border"
                        />
                      </div>

                      {/* Position Type */}
                      <div className="space-y-2">
                        <Label>Position Type</Label>
                        <Tabs value={positionType} onValueChange={(value) => setPositionType(value as "long" | "short")} className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="long">Long (Buy)</TabsTrigger>
                            <TabsTrigger value="short">Short (Sell)</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      {/* Order Type */}
                      <div className="space-y-2">
                        <Label>Order Type</Label>
                        <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "market" | "limit")} className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="market">Market</TabsTrigger>
                            <TabsTrigger value="limit">Limit</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      {orderType === "limit" && (
                        <div className="space-y-2 col-span-full">
                          <Label htmlFor="limit-price">Limit Price</Label>
                          <Input
                            id="limit-price"
                            type="number"
                            placeholder="e.g., 1.08000"
                            value={limitPrice}
                            onChange={(e) => setLimitPrice(e.target.value)}
                            className="bg-input text-foreground border-border"
                          />
                          <p className="text-sm text-muted-foreground">
                            Your order will execute when the price reaches this level.
                          </p>
                        </div>
                      )}

                      {/* Stop Loss */}
                      <div className="space-y-2">
                        <Label htmlFor="stop-loss">Stop Loss (Price)</Label>
                        <Input
                          id="stop-loss"
                          type="number"
                          placeholder="Optional"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          className="bg-input text-foreground border-border"
                        />
                      </div>

                      {/* Take Profit */}
                      <div className="space-y-2">
                        <Label htmlFor="take-profit">Take Profit (Price)</Label>
                        <Input
                          id="take-profit"
                          type="number"
                          placeholder="Optional"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          className="bg-input text-foreground border-border"
                        />
                      </div>

                      {/* Leverage */}
                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="leverage">Leverage: {leverage[0]}x</Label>
                        <Slider
                          id="leverage"
                          min={1}
                          max={500} // Max leverage for demo can be higher
                          step={1}
                          value={leverage}
                          onValueChange={setLeverage}
                          className="[&>span:first-child]:h-2 [&>span:first-child]:bg-primary [&>span:last-child]:bg-primary"
                        />
                        <p className="text-sm text-muted-foreground">
                          Higher leverage amplifies both gains and losses.
                        </p>
                      </div>

                      {/* Strategy Name */}
                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="strategy-name">Strategy Name (Optional)</Label>
                        <Input
                          id="strategy-name"
                          placeholder="e.g., Breakout Reversal"
                          value={strategyName}
                          onChange={(e) => setStrategyName(e.target.value)}
                          className="bg-input text-foreground border-border"
                        />
                      </div>

                      {/* Trade Reason */}
                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="trade-reason">Trade Reason / Notes (Optional)</Label>
                        <Textarea
                          id="trade-reason"
                          placeholder="Why are you taking this demo trade? (e.g., 'Double bottom pattern on 4H chart')"
                          value={tradeReason}
                          onChange={(e) => setTradeReason(e.target.value)}
                          className="bg-input text-foreground border-border min-h-[80px]"
                        />
                        <p className="text-sm text-muted-foreground">
                          Helps with post-trade analysis.
                        </p>
                      </div>

                      {/* Confidence Level */}
                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="confidence-level">Confidence Level: {confidenceLevel[0]} / 10</Label>
                        <Slider
                          id="confidence-level"
                          min={1}
                          max={10}
                          step={1}
                          value={confidenceLevel}
                          onValueChange={setConfidenceLevel}
                          className="[&>span:first-child]:h-2 [&>span:first-child]:bg-yellow-500 [&>span:last-child]:bg-yellow-500"
                        />
                        <p className="text-sm text-muted-foreground">
                          Rate your conviction in this demo trade.
                        </p>
                      </div>

                      {/* Order Details Summary */}
                      <div className="col-span-full bg-muted/30 p-4 rounded-lg border border-border space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Demo Order Summary</h3>
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Notional Value:</span>{" "}
                          <span className="font-medium text-foreground">
                            {formatCurrencyAbbreviated(tradeValue)}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Margin Required:</span>{" "}
                          <span className="font-medium text-foreground">
                            {formatCurrencyAbbreviated(marginRequired)}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Est. Commission:</span>{" "}
                          <span className="font-medium text-foreground">
                            {formatCurrencyAbbreviated(commission)}
                          </span>
                        </p>
                        {selectedAsset?.asset_class === "forex" && (
                          <p className="text-sm text-muted-foreground flex justify-between">
                            <span>Pip Value:</span>{" "}
                            <span className="font-medium text-foreground">
                              ${pipValue.toFixed(2)}
                            </span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Available Balance after trade:</span>{" "}
                          <span className="font-medium text-foreground">
                            {formatCurrencyAbbreviated(availableBalance - marginRequired - commission)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handlePlaceTrade}
                    disabled={!isFormValid || tradeLoading || hasPriceError || !user}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {tradeLoading ? "Placing Demo Trade..." : "Place Demo Trade"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="open-trades">
              <Card className="bg-card border border-border shadow-md">
                <CardHeader>
                  <CardTitle>Your Open Demo Trades</CardTitle>
                  <CardDescription>Actively managed simulated positions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {openTrades.length === 0 ? (
                      <p className="text-muted-foreground text-center">No open demo trades. Place a new trade above!</p>
                    ) : (
                      openTrades.map((trade) => (
                        <Card key={trade.id} className="bg-background border border-border shadow-sm p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg">{trade.symbol}</h3>
                            <Badge variant={trade.position_type === "long" ? "default" : "destructive"}>
                              {trade.position_type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <p>Entry Price: <span className="font-medium text-foreground">{trade.entry_price.toFixed(selectedAsset?.precision || 5)}</span></p>
                            <p>Quantity: <span className="font-medium text-foreground">{trade.quantity}</span></p>
                            <p>Leverage: <span className="font-medium text-foreground">{trade.leverage}x</span></p>
                            <p>Current Price: <span className="font-medium text-foreground">{prices.find(p => p.symbol === trade.symbol)?.price.toFixed(selectedAsset?.precision || 5) || "N/A"}</span></p>
                            <p>Unrealized PnL: <span className={`font-medium ${trade.unrealized_pnl && trade.unrealized_pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {formatCurrencyAbbreviated(trade.unrealized_pnl || 0)}
                            </span></p>
                            <p>Confidence: <span className="font-medium text-foreground">{trade.confidence_level || 'N/A'}/10</span></p>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={tradeLoading}
                              onClick={async () => {
                                setTradeLoading(true)
                                try {
                                  // Use a demo-specific trading service function
                                  await TradingService.closeDemoTrade(trade.id, user.id) // Placeholder
                                  alert("Demo Trade Closed Successfully!")
                                  fetchPortfolio()
                                  fetchTrades()
                                } catch (error) {
                                  console.error("Error closing demo trade:", error)
                                  alert("Error closing demo trade. Check console for details.")
                                } finally {
                                  setTradeLoading(false)
                                }
                              }}
                            >
                              <X className="w-4 h-4 mr-1" /> Close Demo Trade
                            </Button>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="closed-trades"> {/* Placeholder for Closed Trades */}
                <Card className="bg-card border border-border shadow-md">
                    <CardHeader>
                        <CardTitle>Your Closed Demo Trades</CardTitle>
                        <CardDescription>Review your past simulated trading performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {closedTrades.length === 0 ? (
                            <p className="text-muted-foreground text-center">No closed demo trades to display.</p>
                        ) : (
                            <div className="space-y-4">
                                {closedTrades.map((trade) => (
                                    <Card key={trade.id} className="bg-background border border-border shadow-sm p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg">{trade.symbol}</h3>
                                            <Badge variant={trade.position_type === "long" ? "default" : "destructive"}>
                                                {trade.position_type.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                            <p>Entry Price: <span className="font-medium text-foreground">{trade.entry_price.toFixed(selectedAsset?.precision || 5)}</span></p>
                                            <p>Exit Price: <span className="font-medium text-foreground">{trade.exit_price?.toFixed(selectedAsset?.precision || 5) || "N/A"}</span></p>
                                            <p>Quantity: <span className="font-medium text-foreground">{trade.quantity}</span></p>
                                            <p>Leverage: <span className="font-medium text-foreground">{trade.leverage}x</span></p>
                                            <p>Realized PnL: <span className={`font-medium ${trade.realized_pnl && trade.realized_pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                {formatCurrencyAbbreviated(trade.realized_pnl || 0)}
                                            </span></p>
                                            <p>Confidence: <span className="font-medium text-foreground">{trade.confidence_level || 'N/A'}/10</span></p>
                                        </div>
                                        {trade.trade_reason && (
                                            <p className="mt-2 text-xs text-muted-foreground">Reason: {trade.trade_reason}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Opened: {new Date(trade.created_at).toLocaleString()} | Closed: {new Date(trade.closed_at || '').toLocaleString()}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          {/* Leaderboard - Only if League exists */}
          {/* NOTE: For demo, this might be simplified or removed */}
          {/* {league && (
            <Card className="mt-8 bg-card border border-border shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Your League Performance ({league.name})
                </CardTitle>
                <CardDescription>See how you stack up against other demo traders in your league.</CardDescription>
              </CardHeader>
              <CardContent>
                 Leaderboard component might need to be adapted for demo data
                <p className="text-muted-foreground text-center">
                  Leaderboard data for demo trading would be displayed here.
                </p>
              </CardContent>
            </Card>
          )} */}

          {/* Price Error Alerts */}
          {Object.keys(priceErrors).length > 0 && (
            <div className="mt-8 p-4 rounded-lg bg-red-900/20 border border-red-700 text-red-300 flex items-start">
              <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-200">Price Fetching Issues!</h3>
                <p className="text-sm">
                  We're having trouble fetching live prices for some assets. Demo trading might not reflect real-time market conditions accurately.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </FeatureAccess>
  );
} 