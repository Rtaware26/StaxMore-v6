import { supabase } from "./supabaseClient"

interface TradeRequest {
  user_id: string
  symbol: string
  position_type: "long" | "short"
  quantity: number
  order_type?: "market" | "limit" | "stop" | "stop_limit"
  limit_price?: number
  stop_loss?: number
  take_profit?: number
  strategy_name?: string
  trade_reason?: string
  confidence_level?: number
  leverage?: number
  asset?: any // Renamed Asset to any to avoid redeclaration
}

interface Trade {
  id: string
  user_id: string
  symbol: string
  position_type: "long" | "short"
  quantity: number
  entry_price: number
  exit_price: number | null
  pnl: number
  is_closed: boolean
  created_at: string
  // Risk Management
  stop_loss: number | null
  take_profit: number | null
  risk_amount: number
  position_size_usd: number
  // Order Execution
  order_status: "pending" | "filled" | "partial" | "cancelled" | "rejected"
  order_type: "market" | "limit" | "stop" | "stop_limit"
  limit_price: number | null
  filled_quantity: number
  average_fill_price: number
  slippage: number
  // Timestamps
  updated_at: string
  closed_at: string | null
  filled_at: string | null
  cancelled_at: string | null
  // Financial Tracking
  commission: number
  swap: number
  gross_pnl: number
  net_pnl: number
  // Market Data
  current_price: number
  highest_price: number
  lowest_price: number
  entry_spread: number
  // Competition & Strategy
  strategy_name: string | null
  trade_reason: string | null
  confidence_level: number | null
  league_id: string | null
  // Technical Fields
  trade_session: string
  platform_version: string
  ip_address: string | null
  device_type: "web" | "mobile" | "api"
  // Risk & Compliance
  margin_used: number
  leverage: number
  risk_warning_shown: boolean
  auto_close_reason: string | null
  asset_class: string | null
  lot_size: number | null
  pip_value: number | null
}

interface Portfolio {
  id: string
  user_id: string
  total_equity: number
  cash_balance: number
  created_at: string
  updated_at: string
  // P&L Tracking
  realized_pnl: number
  unrealized_pnl: number
  daily_pnl: number
  weekly_pnl: number
  monthly_pnl: number
  // Trading Statistics
  total_trades: number
  winning_trades: number
  losing_trades: number
  win_rate: number
  largest_win: number
  largest_loss: number
  // Competition Features
  league_id: string | null
  competition_rank: number | null
  competition_score: number
  entry_fee_paid: number
  prize_eligibility: boolean
  // Risk Management
  position_count: number
  max_position_size: number
  risk_score: number
  max_drawdown: number
  // Timestamps
  last_trade_at: string | null
  last_login_at: string | null
}

interface PriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: number
  bid: number
  ask: number
  spread: number
  asset?: any // Renamed Asset to any to avoid redeclaration
}

const mockPrices: Record<string, { basePrice: number; lastUpdate: number; trend: number }> = {
  AAPL: { basePrice: 175.43, lastUpdate: Date.now(), trend: 0.001 },
  MSFT: { basePrice: 378.92, lastUpdate: Date.now(), trend: 0.0015 },
  GOOGL: { basePrice: 142.38, lastUpdate: Date.now(), trend: -0.0005 },
  AMZN: { basePrice: 153.74, lastUpdate: Date.now(), trend: 0.002 },
  TSLA: { basePrice: 245.67, lastUpdate: Date.now(), trend: -0.001 },
  META: { basePrice: 298.45, lastUpdate: Date.now(), trend: 0.0008 },
  NVDA: { basePrice: 875.23, lastUpdate: Date.now(), trend: 0.003 },
  NFLX: { basePrice: 445.67, lastUpdate: Date.now(), trend: -0.0012 },
  AMD: { basePrice: 112.34, lastUpdate: Date.now(), trend: 0.0018 },
  INTC: { basePrice: 45.67, lastUpdate: Date.now(), trend: -0.0008 },
  "EURUSD=X": { basePrice: 1.0845, lastUpdate: Date.now(), trend: 0.0001 },
  "GBPUSD=X": { basePrice: 1.2634, lastUpdate: Date.now(), trend: -0.0002 },
  "USDJPY=X": { basePrice: 149.85, lastUpdate: Date.now(), trend: 0.0003 },
  "BTC-USD": { basePrice: 43250.67, lastUpdate: Date.now(), trend: 0.002 },
  "ETH-USD": { basePrice: 2456.78, lastUpdate: Date.now(), trend: 0.0015 },
  "GC=F": { basePrice: 2034.5, lastUpdate: Date.now(), trend: 0.0005 },
  "CL=F": { basePrice: 78.45, lastUpdate: Date.now(), trend: -0.001 },
}

export class TradingService {
  private static readonly COMMISSION_RATE = 0.001 // 0.1% commission
  private static readonly PLATFORM_VERSION = "1.0.0"
  private static readonly DEFAULT_LEVERAGE = 10

  private static async generatePrice(symbol: string): Promise<PriceData | null> {
    const mock = mockPrices[symbol]
    if (!mock) {
      const basePrice = 100 + Math.random() * 50
      const spread = basePrice * 0.0001 // 0.01% spread
      return {
        symbol,
        price: basePrice,
        bid: basePrice - spread / 2,
        ask: basePrice + spread / 2,
        spread: spread,
        change: (Math.random() - 0.5) * 2,
        changePercent: (Math.random() - 0.5) * 4,
        timestamp: Date.now(),
      }
    }

    const timeDiff = Date.now() - mock.lastUpdate
    const volatility = 0.02 // 2% max change per update
    const randomChange = (Math.random() - 0.5) * volatility
    const trendInfluence = mock.trend * (timeDiff / 10000) // Trend influence over time

    const priceChange = randomChange + trendInfluence
    const newPrice = mock.basePrice * (1 + priceChange)
    const change = newPrice - mock.basePrice
    const changePercent = (change / mock.basePrice) * 100

    let spreadPercent = 0.0001 // Default 0.01%
    if (symbol.includes("=X")) spreadPercent = 0.00005 // Forex: 0.005%
    if (symbol.includes("-USD")) spreadPercent = 0.0005 // Crypto: 0.05%
    if (symbol.includes("=F")) spreadPercent = 0.0002 // Commodities: 0.02%

    const spread = newPrice * spreadPercent
    const bid = newPrice - spread / 2
    const ask = newPrice + spread / 2

    mock.basePrice = newPrice
    mock.lastUpdate = Date.now()
    mock.trend = mock.trend + (Math.random() - 0.5) * 0.0001 // Slowly evolving trend

    return {
      symbol,
      price: Number(newPrice.toFixed(symbol.includes("=X") ? 4 : 2)),
      bid: Number(bid.toFixed(symbol.includes("=X") ? 4 : 2)),
      ask: Number(ask.toFixed(symbol.includes("=X") ? 4 : 2)),
      spread: Number(spread.toFixed(symbol.includes("=X") ? 4 : 2)),
      change: Number(change.toFixed(symbol.includes("=X") ? 4 : 2)),
      changePercent: Number(changePercent.toFixed(2)),
      timestamp: Date.now(),
    }
  }

  static async getPrice(symbol: string): Promise<PriceData | null> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay
      return this.generatePrice(symbol)
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)
      return null
    }
  }

  static async getPrices(symbols: string[]): Promise<PriceData[]> {
    const promises = symbols.map((symbol) => this.getPrice(symbol))
    const results = await Promise.allSettled(promises)

    return results
      .filter(
        (result): result is PromiseFulfilledResult<PriceData> => result.status === "fulfilled" && result.value !== null,
      )
      .map((result) => result.value)
  }

  private static calculateExecutionPrice(
    priceData: PriceData,
    positionType: "long" | "short",
    orderType: "market" | "limit" | "stop" | "stop_limit",
    limitPrice?: number,
  ): { price: number; slippage: number } {
    let executionPrice: number
    let slippage = 0

    switch (orderType) {
      case "market":
        executionPrice = positionType === "long" ? priceData.ask : priceData.bid
        slippage = Math.random() * 0.0005 // Random slippage up to 0.05%
        if (positionType === "long") {
          executionPrice += executionPrice * slippage
        } else {
          executionPrice -= executionPrice * slippage
        }
        break

      case "limit":
        if (!limitPrice) throw new Error("Limit price required for limit orders")
        executionPrice = limitPrice
        break

      default:
        executionPrice = priceData.price
    }

    return {
      price: Number(executionPrice.toFixed(4)),
      slippage: Number(slippage.toFixed(6)),
    }
  }

  private static generateTradeSession(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  static async getPortfolio(userId: string): Promise<Portfolio | null> {
    try {
      const { data, error } = await supabase
        .from("user_portfolio_snapshot")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("Error fetching portfolio:", error)
        return null
      }

      if (!data) {
        console.log("No portfolio found, creating default portfolio for user:", userId)
        return await this.createPortfolio(userId)
      }

      return data
    } catch (error) {
      console.error("Error in getPortfolio:", error)
      return null
    }
  }

  static async createPortfolio(userId: string): Promise<Portfolio | null> {
    try {
      const { data, error } = await supabase
        .from("user_portfolio_snapshot")
        .insert({
          user_id: userId,
          total_equity: 100000.0,
          cash_balance: 100000.0,
          realized_pnl: 0.0,
          unrealized_pnl: 0.0,
          daily_pnl: 0.0,
          weekly_pnl: 0.0,
          monthly_pnl: 0.0,
          total_trades: 0,
          winning_trades: 0,
          losing_trades: 0,
          win_rate: 0.0,
          largest_win: 0.0,
          largest_loss: 0.0,
          league_id: null,
          competition_rank: null,
          competition_score: 0.0,
          entry_fee_paid: 0.0,
          prize_eligibility: true,
          position_count: 0,
          max_position_size: 0.0,
          risk_score: 0.0,
          max_drawdown: 0.0,
          last_trade_at: null,
          last_login_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating portfolio:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in createPortfolio:", error)
      return null
    }
  }

  static async updatePortfolio(userId: string, updates: Partial<Portfolio>): Promise<Portfolio | null> {
    try {
      const currentPortfolio = await this.getPortfolio(userId)
      if (!currentPortfolio) {
        console.error("No portfolio found to update")
        return null
      }

      const { data, error } = await supabase
        .from("user_portfolio_snapshot")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentPortfolio.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating portfolio:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in updatePortfolio:", error)
      return null
    }
  }

  static async calculatePortfolioStats(userId: string): Promise<void> {
    try {
      const portfolio = await this.getPortfolio(userId)
      if (!portfolio) return

      const allTrades = await this.getTrades(userId, true)
      const openTrades = await this.getTrades(userId, false)

      const totalTrades = allTrades.length
      const closedTrades = allTrades.filter((t) => t.is_closed)
      const winningTrades = closedTrades.filter((t) => t.net_pnl > 0).length
      const losingTrades = closedTrades.filter((t) => t.net_pnl < 0).length
      const winRate = closedTrades.length > 0 ? (winningTrades / closedTrades.length) * 100 : 0

      const tradePnLs = closedTrades.map((t) => t.net_pnl)
      const largestWin = tradePnLs.length > 0 ? Math.max(...tradePnLs) : 0
      const largestLoss = tradePnLs.length > 0 ? Math.min(...tradePnLs) : 0

      const realizedPnL = closedTrades.reduce((sum, trade) => sum + trade.net_pnl, 0)

      const positionCount = openTrades.length
      const positionSizes = openTrades.map((t) => t.position_size_usd)
      const maxPositionSize = positionSizes.length > 0 ? Math.max(...positionSizes) : 0

      const totalPositionValue = positionSizes.reduce((sum, size) => sum + size, 0)
      const riskScore = portfolio.cash_balance > 0 ? (totalPositionValue / portfolio.total_equity) * 100 : 0

      await this.updatePortfolio(userId, {
        total_trades: totalTrades,
        winning_trades: winningTrades,
        losing_trades: losingTrades,
        win_rate: Number(winRate.toFixed(2)),
        largest_win: largestWin,
        largest_loss: largestLoss,
        realized_pnl: realizedPnL,
        position_count: positionCount,
        max_position_size: maxPositionSize,
        risk_score: Number(riskScore.toFixed(2)),
        last_trade_at: totalTrades > 0 ? allTrades[0].created_at : null,
      })
    } catch (error) {
      console.error("Error calculating portfolio stats:", error)
    }
  }

  static async getTrades(
    userId: string,
    includeClosedTrades = false,
    limit = 100,
    orderBy: "created_at" | "updated_at" = "created_at",
  ): Promise<Trade[]> {
    try {
      let query = supabase
        .from("live_trading_log")
        .select("*")
        .eq("user_id", userId)
        .order(orderBy, { ascending: false })
        .limit(limit)

      if (!includeClosedTrades) {
        query = query.eq("is_closed", false)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching trades:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getTrades:", error)
      return []
    }
  }

  static async placeTrade(tradeRequest: TradeRequest): Promise<Trade | null> {
    try {
      const priceData = await this.getPrice(tradeRequest.symbol)
      if (!priceData) {
        throw new Error("Unable to get market price")
      }

      const portfolio = await this.getPortfolio(tradeRequest.user_id)
      if (!portfolio) {
        throw new Error("Portfolio not found")
      }

      const { price: executionPrice, slippage } = this.calculateExecutionPrice(
        priceData,
        tradeRequest.position_type,
        tradeRequest.order_type || "market",
        tradeRequest.limit_price,
      )

      let positionSizeUsd: number
      let lotSize = 1
      let pipValue = 0
      let marginUsed = 0; // Initialize marginUsed here

      const leverage = tradeRequest.leverage || this.DEFAULT_LEVERAGE

      if (tradeRequest.asset?.asset_class === "forex") {
        const assetLotSize = tradeRequest.asset.lot_size || 100000
        const marginBase = assetLotSize / leverage
        marginUsed = marginBase * executionPrice // Assign marginUsed here for Forex
        positionSizeUsd = tradeRequest.quantity * assetLotSize * executionPrice
        lotSize = assetLotSize
        pipValue = (0.0001 / executionPrice) * assetLotSize
      } else {
        positionSizeUsd = tradeRequest.quantity * executionPrice
        marginUsed = positionSizeUsd / leverage; // Assign marginUsed here for non-Forex
      }

      const commission = positionSizeUsd * this.COMMISSION_RATE

      let riskAmount = 0
      if (tradeRequest.stop_loss) {
        const stopDistance = Math.abs(executionPrice - tradeRequest.stop_loss)
        riskAmount = stopDistance * tradeRequest.quantity
      }

      if (portfolio.cash_balance < marginUsed + commission) {
        console.log('Insufficient balance details:', {
          cash_balance: portfolio.cash_balance,
          marginUsed: marginUsed,
          commission: commission,
          totalRequired: marginUsed + commission
        });
        throw new Error("Insufficient balance for trade and commission")
      }

      const tradeData = {
        user_id: tradeRequest.user_id,
        symbol: tradeRequest.symbol,
        position_type: tradeRequest.position_type,
        quantity: tradeRequest.quantity,
        entry_price: executionPrice,
        exit_price: null,
        pnl: 0,
        is_closed: false,
        stop_loss: tradeRequest.stop_loss || null,
        take_profit: tradeRequest.take_profit || null,
        risk_amount: riskAmount,
        order_status: "filled" as const,
        order_type: tradeRequest.order_type || ("market" as const),
        limit_price: tradeRequest.limit_price || null,
        filled_quantity: tradeRequest.quantity,
        average_fill_price: executionPrice,
        slippage: slippage,
        updated_at: new Date().toISOString(),
        closed_at: null,
        filled_at: new Date().toISOString(),
        cancelled_at: null,
        commission: commission,
        swap: 0,
        gross_pnl: 0,
        net_pnl: 0,
        current_price: priceData.price,
        highest_price: executionPrice,
        lowest_price: executionPrice,
        entry_spread: priceData.spread,
        strategy_name: tradeRequest.strategy_name || null,
        trade_reason: tradeRequest.trade_reason || null,
        confidence_level: tradeRequest.confidence_level || null,
        league_id: portfolio.league_id,
        trade_session: this.generateTradeSession(),
        platform_version: this.PLATFORM_VERSION,
        ip_address: null,
        device_type: "web" as const,
        margin_used: marginUsed,
        leverage: leverage,
        risk_warning_shown: true,
        auto_close_reason: null,
        asset_class: tradeRequest.asset?.asset_class || null,
        lot_size: lotSize,
        pip_value: pipValue,
        position_size_usd: positionSizeUsd,
      }

      const { data: insertedTrade, error: tradeError } = await supabase
        .from("live_trading_log")
        .insert([tradeData])
        .select()
        .single()

      if (tradeError) {
        throw tradeError
      }

      await this.updatePortfolio(tradeRequest.user_id, {
        cash_balance: portfolio.cash_balance - marginUsed - commission,
        last_trade_at: new Date().toISOString(),
      })

      await this.calculatePortfolioStats(tradeRequest.user_id)

      return insertedTrade
    } catch (error) {
      console.error("Error placing trade:", error)
      return null
    }
  }

  static async closeTrade(tradeId: string, exitPrice?: number, reason?: string): Promise<Trade | null> {
    try {
      const { data: trade, error: fetchError } = await supabase
        .from("live_trading_log")
        .select("*")
        .eq("id", tradeId)
        .single()

      if (fetchError || !trade) {
        throw new Error("Trade not found")
      }

      if (trade.is_closed) {
        throw new Error("Trade is already closed")
      }

      let currentExitPrice = exitPrice
      if (!currentExitPrice) {
        const priceData = await this.getPrice(trade.symbol)
        if (!priceData) {
          throw new Error("Unable to get current market price")
        }
        currentExitPrice = trade.position_type === "long" ? priceData.bid : priceData.ask
      }

      let grossPnL: number
      if (trade.position_type === "long") {
        grossPnL = (currentExitPrice - trade.entry_price) * trade.quantity
      } else {
        grossPnL = (trade.entry_price - currentExitPrice) * trade.quantity
      }

      const exitCommission = currentExitPrice * trade.quantity * this.COMMISSION_RATE
      const totalCommission = trade.commission + exitCommission

      const netPnL = grossPnL - exitCommission - trade.swap

      const { data: updatedTrade, error: updateError } = await supabase
        .from("live_trading_log")
        .update({
          is_closed: true,
          exit_price: currentExitPrice,
          pnl: grossPnL,
          gross_pnl: grossPnL,
          net_pnl: netPnL,
          commission: totalCommission,
          closed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          auto_close_reason: reason || null,
          order_status: "filled",
        })
        .eq("id", tradeId)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      const portfolio = await this.getPortfolio(trade.user_id)
      if (!portfolio) {
        throw new Error("Portfolio not found")
      }

      const marginReturn = trade.margin_used
      const cashChange = marginReturn + netPnL

      await this.updatePortfolio(trade.user_id, {
        cash_balance: portfolio.cash_balance + cashChange,
        last_trade_at: new Date().toISOString(),
      })

      await this.calculatePortfolioStats(trade.user_id)

      return updatedTrade
    } catch (error) {
      console.error("Error closing trade:", error)
      return null
    }
  }

  static calculateUnrealizedPnL(trade: Trade, currentPrice: number): number {
    if (trade.is_closed) return 0

    let grossPnL: number
    if (trade.position_type === "long") {
      grossPnL = (currentPrice - trade.entry_price) * trade.quantity
    } else {
      grossPnL = (trade.entry_price - currentPrice) * trade.quantity
    }

    const estimatedExitCommission = currentPrice * trade.quantity * this.COMMISSION_RATE
    return grossPnL - estimatedExitCommission
  }

  static async updateUnrealizedPnL(userId: string, priceData: PriceData[]): Promise<void> {
    try {
      const openTrades = await this.getTrades(userId, false)
      const priceMap = new Map(priceData.map((p) => [p.symbol, p]))

      const updates = openTrades
        .map((trade) => {
          const currentPriceData = priceMap.get(trade.symbol)
          if (!currentPriceData) return null

          const currentPrice = currentPriceData.price
          const unrealizedPnL = this.calculateUnrealizedPnL(trade, currentPrice)

          const newHighest = Math.max(trade.highest_price, currentPrice)
          const newLowest = Math.min(trade.lowest_price, currentPrice)

          return supabase
            .from("live_trading_log")
            .update({
              current_price: currentPrice,
              pnl: unrealizedPnL,
              gross_pnl: unrealizedPnL + currentPrice * trade.quantity * this.COMMISSION_RATE,
              net_pnl: unrealizedPnL,
              highest_price: newHighest,
              lowest_price: newLowest,
              updated_at: new Date().toISOString(),
            })
            .eq("id", trade.id)
        })
        .filter(Boolean)

      await Promise.all(updates)

      const totalUnrealizedPnL = openTrades.reduce((sum, trade) => {
        const currentPriceData = priceMap.get(trade.symbol)
        if (!currentPriceData) return sum
        return sum + this.calculateUnrealizedPnL(trade, currentPriceData.price)
      }, 0)

      const portfolio = await this.getPortfolio(userId)
      if (portfolio) {
        await this.updatePortfolio(userId, {
          unrealized_pnl: totalUnrealizedPnL,
          total_equity: portfolio.cash_balance + totalUnrealizedPnL,
        })
      }
    } catch (error) {
      console.error("Error updating unrealized PnL:", error)
    }
  }

  static async processAutoClose(userId: string, priceData: PriceData[]): Promise<void> {
    try {
      const openTrades = await this.getTrades(userId, false)
      const priceMap = new Map(priceData.map((p) => [p.symbol, p.price]))

      for (const trade of openTrades) {
        const currentPrice = priceMap.get(trade.symbol)
        if (!currentPrice) continue

        let shouldClose = false
        let closeReason = ""

        if (trade.stop_loss) {
          if (
            (trade.position_type === "long" && currentPrice <= trade.stop_loss) ||
            (trade.position_type === "short" && currentPrice >= trade.stop_loss)
          ) {
            shouldClose = true
            closeReason = "Stop Loss"
          }
        }

        if (trade.take_profit && !shouldClose) {
          if (
            (trade.position_type === "long" && currentPrice >= trade.take_profit) ||
            (trade.position_type === "short" && currentPrice <= trade.take_profit)
          ) {
            shouldClose = true
            closeReason = "Take Profit"
          }
        }

        if (shouldClose) {
          await this.closeTrade(trade.id, currentPrice, closeReason)
        }
      }
    } catch (error) {
      console.error("Error processing auto-close:", error)
    }
  }

  static async getTradingAnalytics(userId: string, days = 30): Promise<any> {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const { data: trades, error } = await supabase
        .from("live_trading_log")
        .select("*")
        .eq("user_id", userId)
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching trading analytics:", error)
        return null
      }

      const closedTrades = trades.filter((t) => t.is_closed)
      const totalTrades = trades.length
      const winningTrades = closedTrades.filter((t) => t.net_pnl > 0)
      const losingTrades = closedTrades.filter((t) => t.net_pnl < 0)

      const totalPnL = closedTrades.reduce((sum, t) => sum + t.net_pnl, 0)
      const totalCommissions = closedTrades.reduce((sum, t) => sum + t.commission, 0)
      const averageWin =
        winningTrades.length > 0 ? winningTrades.reduce((sum, t) => sum + t.net_pnl, 0) / winningTrades.length : 0
      const averageLoss =
        losingTrades.length > 0 ? losingTrades.reduce((sum, t) => sum + t.net_pnl, 0) / losingTrades.length : 0

      return {
        totalTrades,
        closedTrades: closedTrades.length,
        winningTrades: winningTrades.length,
        losingTrades: losingTrades.length,
        winRate: closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0,
        totalPnL,
        totalCommissions,
        averageWin,
        averageLoss,
        profitFactor: Math.abs(averageLoss) > 0 ? averageWin / Math.abs(averageLoss) : 0,
        largestWin: winningTrades.length > 0 ? Math.max(...winningTrades.map((t) => t.net_pnl)) : 0,
        largestLoss: losingTrades.length > 0 ? Math.min(...losingTrades.map((t) => t.net_pnl)) : 0,
        trades: trades,
      }
    } catch (error) {
      console.error("Error in getTradingAnalytics:", error)
      return null
    }
  }

  static async joinCompetition(userId: string, leagueId: string, entryFee: number): Promise<boolean> {
    try {
      const portfolio = await this.getPortfolio(userId)
      if (!portfolio) return false

      if (portfolio.cash_balance < entryFee) {
        throw new Error("Insufficient balance for entry fee")
      }

      await this.updatePortfolio(userId, {
        league_id: leagueId,
        entry_fee_paid: entryFee,
        cash_balance: portfolio.cash_balance - entryFee,
        competition_score: portfolio.total_equity,
        prize_eligibility: true,
      })

      return true
    } catch (error) {
      console.error("Error joining competition:", error)
      return false
    }
  }

  static async getLeaderboard(leagueId?: string): Promise<Portfolio[]> {
    try {
      let query = supabase
        .from("user_portfolio_snapshot")
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .order("competition_score", { ascending: false })
        .limit(100)

      if (leagueId && leagueId !== "all") {
        query = query.eq("league_id", leagueId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching leaderboard:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getLeaderboard:", error)
      return []
    }
  }
}

export const TRADING_SYMBOLS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "AMD",
  "INTC",
  "JPM",
  "BAC",
  "WMT",
  "JNJ",
  "PG",
  "KO",
  "PFE",
  "DIS",
  "ADBE",
  "CRM",
  "EURUSD=X",
  "GBPUSD=X",
  "USDJPY=X",
  "AUDUSD=X",
  "USDCAD=X",
  "USDCHF=X",
  "NZDUSD=X",
  "EURGBP=X",
  "EURJPY=X",
  "GBPJPY=X",
  "BTC-USD",
  "ETH-USD",
  "ADA-USD",
  "DOT-USD",
  "LINK-USD",
  "LTC-USD",
  "XRP-USD",
  "BCH-USD",
  "DOGE-USD",
  "MATIC-USD",
  "GC=F",
  "SI=F",
  "CL=F",
  "NG=F",
  "ZC=F",
  "ZS=F",
  "ZW=F",
  "KC=F",
  "^GSPC",
  "^DJI",
  "^IXIC",
  "^RUT",
  "^VIX",
  "^TNX",
]

export async function getTradingSymbols(): Promise<string[]> {
  return TRADING_SYMBOLS
}
