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
import { formatCurrencyAbbreviated } from "@/lib/utils"

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

  // Handle enhanced trade submission
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
        expectedMarginRequired: marginRequired, // Pass the calculated marginRequired from frontend
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
  }, [user, selectedSymbol, positionType, quantity, orderType, limitPrice, stopLoss, takeProfit, leverage, strategyName, tradeReason, confidenceLevel, selectedAsset, prices, fetchPortfolio, fetchTrades, marginRequired])

  // Handle close trade
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
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Live Trading</h1>

          {/* Financial Overview Cards */}
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-8">
            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Total Equity</CardTitle>
              <CardContent className="p-0 text-center">
                <div className="text-base font-bold text-foreground truncate min-w-0 text-center">
                  {portfolio?.total_equity !== undefined && portfolio?.total_equity !== null
                    ? `$${formatCurrencyAbbreviated(portfolio.total_equity)}`
                    : '$0.00'}
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Available Cash</CardTitle>
              <CardContent className="p-0 text-center">
                <div className="text-base font-bold text-foreground truncate min-w-0 text-center">
                  {portfolio?.cash_balance !== undefined && portfolio?.cash_balance !== null
                    ? `$${formatCurrencyAbbreviated(portfolio.cash_balance)}`
                    : '$0.00'}
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Unrealized P&L</CardTitle>
              <CardContent className="p-0 text-center">
                <div
                  className={`text-base font-bold truncate min-w-0 text-center ${
                    (portfolio?.unrealized_pnl || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {portfolio?.unrealized_pnl !== undefined && portfolio?.unrealized_pnl !== null
                    ? `$${formatCurrencyAbbreviated(portfolio.unrealized_pnl)}`
                    : '$0.00'}
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Realized P&L</CardTitle>
              <CardContent className="p-0 text-center">
                <div
                  className={`text-base font-bold truncate min-w-0 text-center ${
                    (portfolio?.realized_pnl || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {portfolio?.realized_pnl !== undefined && portfolio?.realized_pnl !== null
                    ? `$${formatCurrencyAbbreviated(portfolio.realized_pnl)}`
                    : '$0.00'}
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Win Rate</CardTitle>
              <CardContent className="p-0 text-center">
                <div className="text-base font-bold text-foreground truncate min-w-0 text-center">
                  {(portfolio?.win_rate || 0).toFixed(2)}%
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern text-center p-3 flex flex-col items-center justify-center">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Risk Score</CardTitle>
              <CardContent className="p-0 text-center">
                <div className="text-base font-bold text-foreground truncate min-w-0 text-center">
                  {(portfolio?.risk_score || 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Trading Form Card */}
            <Card className="card-modern p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Place New Trade</CardTitle>
                <CardDescription className="text-muted-foreground">Execute market or limit orders</CardDescription>
                </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="market" className="w-full" onValueChange={(value) => setOrderType(value as "market" | "limit")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="market">Market Order</TabsTrigger>
                    <TabsTrigger value="limit">Limit Order</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symbol-selector" className="block text-sm font-medium text-muted-foreground mb-2">Symbol</Label>
                    <AssetSelector
                      onSymbolChange={(symbol, asset) => {
                        setSelectedSymbol(symbol)
                        setSelectedAsset(asset)
                      }}
                      selectedSymbol={selectedSymbol}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="quantity" className="block text-sm font-medium text-muted-foreground mb-2">Quantity (Lots)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                        placeholder="e.g. 0.1, 1, 10"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                        className="w-full"
                    />
                    </div>
                    <div>
                      <Label htmlFor="position-type" className="block text-sm font-medium text-muted-foreground mb-2">Position Type</Label>
                      <Tabs defaultValue="long" className="w-full" onValueChange={(value) => setPositionType(value as "long" | "short")}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="long">Long</TabsTrigger>
                          <TabsTrigger value="short">Short</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>

                  {orderType === "limit" && (
                    <div>
                      <Label htmlFor="limit-price" className="block text-sm font-medium text-muted-foreground mb-2">Limit Price</Label>
                      <Input
                        id="limit-price"
                        type="number"
                        step="0.0001"
                        placeholder="Enter limit price"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Advanced Fields - Only show for market or limit orders */}
                  {(orderType === "market" || orderType === "limit") && (
                    <>
                      <div className="space-y-2">
                        <Label className="block text-sm font-medium text-muted-foreground">Leverage: {leverage[0]}×</Label>
                        <Slider
                          value={leverage}
                          onValueChange={setLeverage}
                          max={1000}
                          min={10}
                          step={10}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>10×</span>
                          <span>500×</span>
                          <span>1000×</span>
                        </div>
                      </div>

                      {/* Stop Loss & Take Profit */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="stopLoss" className="block text-sm font-medium text-muted-foreground mb-2">Stop Loss</Label>
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
                          <Label htmlFor="takeProfit" className="block text-sm font-medium text-muted-foreground mb-2">Take Profit</Label>
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

                      {/* Strategy and Reason */}
                      <div>
                        <Label htmlFor="strategyName" className="block text-sm font-medium text-muted-foreground mb-2">Strategy Name</Label>
                        <Input
                          id="strategyName"
                          type="text"
                          placeholder="e.g. Scalping, Day Trade, Swing"
                          value={strategyName}
                          onChange={(e) => setStrategyName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tradeReason" className="block text-sm font-medium text-muted-foreground mb-2">Trade Reason</Label>
                        <Textarea
                          id="tradeReason"
                          placeholder="Why are you taking this trade?"
                          value={tradeReason}
                          onChange={(e) => setTradeReason(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="block text-sm font-medium text-muted-foreground">Confidence Level: {confidenceLevel[0]}/10</Label>
                        <Slider
                          value={confidenceLevel}
                          onValueChange={setConfidenceLevel}
                          max={10}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>High</span>
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
                    <div className="p-4 bg-accent text-accent-foreground rounded-lg space-y-2">
                      <div className="text-sm font-medium">Trade Summary</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Symbol: <span className="font-semibold">{selectedSymbol}</span></div>
                        <div>Current Price: <span className="font-semibold">{selectedPrice.price.toFixed(5)}</span></div>
                        <div>Quantity: <span className="font-semibold">{quantity} {selectedAsset?.asset_class === "forex" ? 'Lots' : 'Units'}</span></div>
                        <div>Position Type: <span className="font-semibold">{positionType.toUpperCase()}</span></div>
                        <div>Trade Value: <span className="font-semibold">${tradeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div>Margin Required: <span className="font-semibold">${marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div>Commission: <span className="font-semibold">${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        {pipValue > 0 && <div>Pip Value: <span className="font-semibold">${pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>}
                        </div>
                          </div>
                        )}

                  {hasPriceError && (
                    <div className="flex items-center p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Price data not available for {selectedSymbol}.
                            </div>
                  )}

                  {portfolio && marginRequired + commission > portfolio.cash_balance && (
                    <div className="flex items-center p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Insufficient balance to place this trade. Required: ${marginRequired.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Margin) + ${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Commission)
                    </div>
                  )}

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
                    ) : (
                      "Place Trade"
                    )}
                  </Button>
                </div>
                </CardContent>
              </Card>

            {/* Open Positions Card */}
            <Card className="card-modern p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Open Positions</CardTitle>
                <CardDescription className="text-muted-foreground">Manage your active trades</CardDescription>
                    </CardHeader>
                    <CardContent>
                {trades.filter(trade => !trade.is_closed).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>No open positions yet. Place a trade to get started!</p>
                        </div>
                      ) : (
                  <div className="space-y-4">
                    {trades.filter(trade => !trade.is_closed).map((trade) => {
                      const currentPrice = prices.find(p => p.symbol === trade.symbol)?.price || trade.current_price || trade.entry_price;
                      const pnl = (currentPrice - trade.entry_price) * trade.quantity * (trade.position_type === 'long' ? 1 : -1);
                      const pnlClass = pnl >= 0 ? 'text-green-600' : 'text-red-600';

                            return (
                        <Card key={trade.id} className="border border-border p-4 bg-card shadow-sm">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="font-medium text-muted-foreground">Symbol: <span className="font-semibold text-foreground">{trade.symbol}</span></div>
                            <div className="font-medium text-muted-foreground">Type: <span className={`font-semibold ${trade.position_type === 'long' ? 'text-green-600' : 'text-red-600'}`}>{trade.position_type.toUpperCase()}</span></div>
                            <div className="font-medium text-muted-foreground">Quantity: <span className="font-semibold text-foreground">{trade.quantity.toFixed(2)}</span></div>
                            <div className="font-medium text-muted-foreground">Entry Price: <span className="font-semibold text-foreground">{trade.entry_price.toFixed(trade.symbol.includes("=X") ? 4 : 2)}</span></div>
                            <div className="font-medium text-muted-foreground">Current Price: <span className="font-semibold text-foreground">{currentPrice.toFixed(trade.symbol.includes("=X") ? 4 : 2) || 'N/A'}</span></div>
                            <div className="font-medium text-muted-foreground">P&L: <span className={`font-semibold ${pnlClass}`}>${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="font-medium text-muted-foreground">Margin: <span className="font-semibold text-foreground">${trade.margin_used.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="font-medium text-muted-foreground">Leverage: <span className="font-semibold text-foreground">{trade.leverage}x</span></div>
                            {trade.stop_loss && <div className="font-medium text-muted-foreground">SL: <span className="font-semibold text-foreground">{trade.stop_loss.toFixed(trade.symbol.includes("=X") ? 4 : 2)}</span></div>}
                            {trade.take_profit && <div className="font-medium text-muted-foreground">TP: <span className="font-semibold text-foreground">{trade.take_profit.toFixed(trade.symbol.includes("=X") ? 4 : 2)}</span></div>}
                            <div className="font-medium text-muted-foreground">Opened: <span className="font-semibold text-foreground">{new Date(trade.created_at).toLocaleString()}</span></div>
                                  </div>
                                <Button
                                  onClick={() => handleCloseTrade(trade.id, trade.symbol)}
                            className="mt-4 w-full"
                            variant="secondary"
                            size="sm"
                                >
                            Close Trade
                                </Button>
                        </Card>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                                </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
