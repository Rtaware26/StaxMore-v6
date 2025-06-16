import { supabase } from "./supabaseClient"
import { PriceService } from "@/lib/price-service"

export interface TradeRequest {
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
  expectedMarginRequired?: number; // New field to pass margin from frontend
  price?: number; // Added missing price property
}

export interface TradeErrorResponse {
  error: boolean;
  message: string;
  details?: any;
}

export interface Trade {
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
  unrealized_pnl?: number; // Added missing unrealized_pnl property
  realized_pnl?: number;   // Added missing realized_pnl property
}

export interface Portfolio {
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

export interface PriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  change_amount?: number
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
  "AUDUSD=X": { basePrice: 0.65, lastUpdate: Date.now(), trend: -0.0001 },
  "USDCAD=X": { basePrice: 1.3567, lastUpdate: Date.now(), trend: 0.00015 },
  "USDCHF=X": { basePrice: 0.8978, lastUpdate: Date.now(), trend: -0.00005 },
  "NZDUSD=X": { basePrice: 0.6056, lastUpdate: Date.now(), trend: 0.0001 },
  "EURGBP=X": { basePrice: 0.8678, lastUpdate: Date.now(), trend: -0.00008 },
  "EURJPY=X": { basePrice: 157.89, lastUpdate: Date.now(), trend: 0.0002 },
  "GBPJPY=X": { basePrice: 190.23, lastUpdate: Date.now(), trend: 0.0003 },
  "BTC-USD": { basePrice: 43250.67, lastUpdate: Date.now(), trend: 0.002 },
  "ETH-USD": { basePrice: 2456.78, lastUpdate: Date.now(), trend: 0.0015 },
  "GC=F": { basePrice: 2034.5, lastUpdate: Date.now(), trend: 0.0005 },
  "CL=F": { basePrice: 78.45, lastUpdate: Date.now(), trend: -0.001 },
}

export class TradingService {
  private static readonly COMMISSION_RATE = 0.001 // 0.1% commission
  private static readonly PLATFORM_VERSION = "1.0.0"
  private static readonly DEFAULT_LEVERAGE = 10
  private static readonly INITIAL_DEMO_BALANCE = 100000.0 // Define initial demo balance centrally

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

    // For Forex, do not let the base price drift significantly; simulate fluctuations around the initial base
    if (!symbol.includes("=X")) {
      mock.basePrice = newPrice;
    }
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
      const priceData = await PriceService.getPrice(symbol);
      return priceData;
    } catch (error) {
      console.error(`Error in TradingService.getPrice for ${symbol}:`, error);
      return null;
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

  // --- Demo Trading Specific Functions ---

  /**
   * Fetches mock price data for demo trading.
   * This is to avoid hitting live price APIs for demo purposes.
   */
  static async getDemoPrices(symbols: string[]): Promise<PriceData[]> {
    const promises = symbols.map(symbol => TradingService.generatePrice(symbol));
    const results = await Promise.allSettled(promises);

    return results
      .filter(
        (result): result is PromiseFulfilledResult<PriceData | null> =>
          result.status === "fulfilled" && result.value !== null
      )
      .map(result => result.value as PriceData);
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
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("league")
        .eq("id", userId)
        .single();

      if (profileError && profileError.code !== "PGRST116") { // PGRST116 means no rows found
        console.error("Error fetching profile for new portfolio:", profileError);
        // Continue to create portfolio, but with null league_id
      }

      const leagueId = profile?.league || null; // Get league from profile, default to null

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
          league_id: leagueId, // Set the fetched league_id here
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

      // Fetch the latest league from the user's profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("league")
        .eq("id", userId)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile for portfolio update:", profileError);
      }

      const updatedLeagueId = profile?.league || null; // Get league from profile, default to null

      const { data, error } = await supabase
        .from("user_portfolio_snapshot")
        .update({
          ...updates,
          league_id: updatedLeagueId, // Always update league_id to match profile
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

  static async placeTrade(tradeRequest: TradeRequest): Promise<Trade | TradeErrorResponse> {
    console.log('Received trade request:', tradeRequest);
    console.log('Attempting to place trade for symbol:', tradeRequest.symbol);
    console.log('Trade Request - Expected Margin Required:', tradeRequest.expectedMarginRequired);

    let priceData: PriceData | null = null;
    try {
      priceData = await this.getPrice(tradeRequest.symbol);
    } catch (error: unknown) {
      console.error('Error fetching price in placeTrade:', error);
      return { error: true, message: 'Failed to fetch price for trade.' };
    }

      if (!priceData) {
      console.error('Error in placeTrade: getPrice returned null for symbol:', tradeRequest.symbol);
      return { error: true, message: "Unable to get market price" };
    }
    console.log('Fetched priceData in placeTrade:', priceData);

    let portfolio: Portfolio | null = null;
    try {
      portfolio = await this.getPortfolio(tradeRequest.user_id);
    } catch (error: unknown) {
      console.error('Error fetching portfolio in placeTrade:', error);
      return { error: true, message: 'Failed to fetch portfolio for trade.' };
    }

      if (!portfolio) {
      console.error('Error in placeTrade: getPortfolio returned null for user:', tradeRequest.user_id);
      return { error: true, message: "Portfolio not found" };
      }
    console.log('Fetched portfolio:', portfolio);

      const { price: executionPriceRaw, slippage } = this.calculateExecutionPrice(
        priceData,
        tradeRequest.position_type,
        tradeRequest.order_type || "market",
        tradeRequest.limit_price,
    );
    console.log('Calculated executionPrice in placeTrade:', executionPriceRaw);

    let executionPrice = executionPriceRaw;

    // CRITICAL BUG FIX: Heuristic correction for forex entry price if it appears incorrectly scaled
    // This addresses the issue where AUDUSD was showing prices like 145 instead of 0.64
    if (
      tradeRequest.asset?.asset_class === "forex" &&
      tradeRequest.asset?.quote_currency === "USD" && // Check if it's a USD-quoted pair
      executionPrice > 10 // Price is unusually high for a typical USD-quoted forex pair (e.g., AUDUSD, EURUSD)
    ) {
      // Assuming the API might be returning 100 / actual_price for USD-quoted forex pairs
      console.warn(`[TradingService] Correcting unusually high/inverted forex price for ${tradeRequest.symbol}: ${executionPrice} -> ${100 / executionPrice}`);
      executionPrice = 100 / executionPrice;
    }

    let positionSizeUsd: number; // Notional Value
    let marginUsed: number; // Margin Required
    let commission: number;
    let pipValue: number | null = null; // Initialize pipValue

    const leverage = tradeRequest.leverage || this.DEFAULT_LEVERAGE;
    console.log('Using leverage:', leverage);

    // Calculate Notional Value (Position Size USD)
    let effectiveQuantity = tradeRequest.quantity;
    if (tradeRequest.asset?.asset_class === "forex") {
        effectiveQuantity = tradeRequest.quantity * (tradeRequest.asset?.lot_size || 100000);
    }
    positionSizeUsd = effectiveQuantity * executionPrice;
    console.log('Calculated Notional Value (USD):', positionSizeUsd.toFixed(4));

    // Calculate Margin Required
    // Prioritize expectedMarginRequired from frontend if provided
    if (tradeRequest.expectedMarginRequired !== undefined) {
        marginUsed = tradeRequest.expectedMarginRequired;
        console.log('Using expectedMarginRequired from frontend (USD):', marginUsed.toFixed(4));
    } else {
        marginUsed = positionSizeUsd / leverage;
        console.log('Calculated Margin Required (USD) (fallback):', marginUsed.toFixed(4));
    }

    // Calculate Commission (0.1% of Notional Value)
    commission = positionSizeUsd * this.COMMISSION_RATE;
    console.log('Calculated Commission (USD):', commission.toFixed(4));

    // Calculate Pip Value for Forex (based on standard lot size if applicable)
    if (tradeRequest.asset?.asset_class === "forex") {
      const standardLotSize = tradeRequest.asset?.lot_size || 100000;
      // Pip value calculation: (pip size / exchange rate) * standard lot size
      // For most pairs, pip size is 0.0001, for JPY pairs it's 0.01
      const pipSize = tradeRequest.symbol.includes('JPY') ? 0.01 : 0.0001;
      pipValue = (pipSize / executionPrice) * standardLotSize;
      console.log('Calculated Pip Value:', pipValue.toFixed(4));
    }

    // Final balance check (Total Required = Margin Required + Commission)
    const totalCost = marginUsed + commission;
    console.log('Total cost for trade (Margin + Commission):', totalCost.toFixed(4));

    if (portfolio.cash_balance < totalCost) {
        console.log('Insufficient balance details:', {
        userId: tradeRequest.user_id,
        symbol: tradeRequest.symbol,
        quantity: tradeRequest.quantity,
        leverage: leverage,
        executionPrice: executionPrice,
        positionSizeUsd: positionSizeUsd,
        calculatedMarginUsed: marginUsed, // Log the newly calculated margin
        calculatedCommission: commission, // Log the calculated commission
        portfolioCashBalance: portfolio.cash_balance, // Log the user's cash balance
        totalRequired: totalCost.toFixed(2), // Ensure totalRequired in log is formatted
        message: "Insufficient balance for trade and commission"
      });
      // Instead of throwing, return an object with the details
      return { // Return details object on insufficient balance
        error: true,
        message: "Insufficient balance for trade and commission",
        details: {
          cash_balance: portfolio.cash_balance,
          marginUsed: marginUsed,
          commission: commission,
          totalRequired: totalCost.toFixed(2),
      }
      };
    }
    console.log('Balance check passed.');

    let correctedCurrentPrice = priceData.price;
    // Apply the same heuristic to current_price as executionPrice
    if (
      tradeRequest.asset?.asset_class === "forex" &&
      tradeRequest.asset?.quote_currency === "USD" &&
      correctedCurrentPrice > 10
    ) {
        console.warn(`[TradingService] Correcting current_price for ${tradeRequest.symbol}: ${correctedCurrentPrice} -> ${100 / correctedCurrentPrice}`);
        correctedCurrentPrice = 100 / correctedCurrentPrice;
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
        risk_amount: 0,
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
        current_price: correctedCurrentPrice,
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

    // Return the inserted trade ONLY after all updates are successful
    return insertedTrade;

  } catch (error: unknown) { // This outer catch should now ideally only catch errors from code NOT within the inner try/catch blocks
    // Improved error logging
    if (error instanceof Error) {
      console.error("Caught error in placeTrade (outer catch):", error.message, error.stack);
    } else {
      console.error("Caught unknown error in placeTrade (outer catch):", error);
    }
    // For other errors, continue to return an error object
    return { error: true, message: error instanceof Error ? error.message : "An unexpected error occurred during trade placement." };
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

    // Unrealized PnL is the gross PnL before considering commissions
    return grossPnL
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
            username
          )
        `)
        .order("competition_score", { ascending: false })
        .limit(100)

      if (leagueId && leagueId !== "all") {
        query = query.eq("league_id", leagueId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching leaderboard:", JSON.stringify(error, null, 2))
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getLeaderboard:", JSON.stringify(error, null, 2))
      return []
    }
  }

  private static readonly PRIZE_DISTRIBUTION_PERCENTAGES = {
    1: 0.40, // 40% for 1st place
    2: 0.20, // 20% for 2nd place
    3: 0.10, // 10% for 3rd place
    4: 0.04, // 4% for 4th place
    5: 0.02, // 2% for 5th place
    // 6th to 20th place: 1% each
  };

  /**
   * Distributes the prize pool for a single competition section based on leaderboard ranking.
   * Enforces participant limits and assigns rewards to the top 20 users.
   * @param prizePool The total prize pool for this section.
   * @param leaderboard A sorted list of portfolios (highest return to lowest).
   * @returns A map of user IDs to their reward amounts.
   */
  static async distributePrizePool(
    prizePool: number,
    leaderboard: Portfolio[]
  ): Promise<Record<string, number>> {
    const MIN_PARTICIPANTS = 50;
    const MAX_PARTICIPANTS = 100;
    const rewards: Record<string, number> = {};

    if (leaderboard.length < MIN_PARTICIPANTS || leaderboard.length > MAX_PARTICIPANTS) {
      console.warn(`Prize pool distribution skipped: Participant count (${leaderboard.length}) is not between ${MIN_PARTICIPANTS} and ${MAX_PARTICIPANTS}.`);
      return rewards; // Return empty rewards if criteria not met
    }

    for (let i = 0; i < leaderboard.length && i < 20; i++) {
      const user = leaderboard[i];
      let percentage: number | undefined;

      if (i + 1 <= 5) {
        percentage = this.PRIZE_DISTRIBUTION_PERCENTAGES[i + 1 as keyof typeof this.PRIZE_DISTRIBUTION_PERCENTAGES];
      } else if (i + 1 >= 6 && i + 1 <= 20) {
        percentage = 0.01; // 1% for places 6-20
      }

      if (percentage !== undefined && user.user_id) {
        rewards[user.user_id] = prizePool * percentage;
      }
    }
    return rewards;
  }

  /**
   * Dynamically assigns registered users to competition sections based on participant limits.
   * Creates new sections (leagues) as needed (e.g., Bronze 1, Bronze 2).
   * @param competitionType The overall competition type (e.g., 'bronze', 'silver').
   * @returns True if assignment was successful, false otherwise.
   */
  static async assignCompetitionSections(competitionType: string): Promise<boolean> {
    const MIN_PARTICIPANTS_FOR_COMPETITION = 50;
    const MAX_PARTICIPANTS_FOR_COMPETITION = 100;

    // 1. Fetch all users who have signed up for this competitionType
    const { data: allSignedUpPortfolios, error: portfoliosError } = await supabase
      .from('portfolios')
      .select(`
        user_id,
        league_id,
        leagues!inner (id, name, competition_type)
      `)
      .filter('leagues.competition_type', 'eq', competitionType);

    if (portfoliosError) {
      console.error('Error fetching signed-up portfolios:', portfoliosError);
      return false;
    }

    const registeredUserIds = allSignedUpPortfolios.map(p => p.user_id);
    let numRegisteredUsers = registeredUserIds.length;

    if (numRegisteredUsers < MIN_PARTICIPANTS_FOR_COMPETITION) {
      console.warn(`Not enough participants (${numRegisteredUsers}) for ${competitionType} competition to start. Minimum required: ${MIN_PARTICIPANTS_FOR_COMPETITION}.`);
      return false;
    }

    if (numRegisteredUsers > MAX_PARTICIPANTS_FOR_COMPETITION) {
      console.warn(`Too many participants (${numRegisteredUsers}) for ${competitionType} competition. Capping at ${MAX_PARTICIPANTS_FOR_COMPETITION} participants.`);
      numRegisteredUsers = MAX_PARTICIPANTS_FOR_COMPETITION; // Cap participants if over the max
    }

    // Ensure we have a single league for this competition type
    const competitionLeagueName = competitionType.charAt(0).toUpperCase() + competitionType.slice(1); // e.g., 'Bronze', 'Silver'

    let { data: existingLeague, error: fetchLeagueError } = await supabase
      .from('leagues')
      .select('id')
      .eq('name', competitionLeagueName)
      .single();

    let currentLeagueId: string;

    if (fetchLeagueError && fetchLeagueError.code === 'PGRST116') { // No rows found
      // Create new league for this competition type
      const { data: newLeague, error: createLeagueError } = await supabase
        .from('leagues')
        .insert({ name: competitionLeagueName, competition_type: competitionType }) // Assuming competition_type on leagues
        .select('id')
        .single();

      if (createLeagueError) {
        console.error(`Error creating new league ${competitionLeagueName}:`, createLeagueError);
        return false;
      }
      currentLeagueId = newLeague.id;
    } else if (fetchLeagueError) {
      console.error(`Error fetching league ${competitionLeagueName}:`, fetchLeagueError);
      return false;
    } else if (existingLeague) { // Explicitly check if existingLeague is not null
      currentLeagueId = existingLeague.id;
    } else {
      console.error(`Unexpected state: No league found and no clear error for ${competitionLeagueName}.`);
      return false;
    }

    // Shuffle user IDs and assign the first `numRegisteredUsers` to the league
    const shuffledUserIds = registeredUserIds.sort(() => Math.random() - 0.5);
    const usersToAssign = shuffledUserIds.slice(0, numRegisteredUsers);

    // Update portfolios with the single league_id
    const updatePromises = usersToAssign.map(async (userId) => {
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ league_id: currentLeagueId })
        .eq('user_id', userId);
      if (updateError) {
        console.error(`Error updating portfolio for user ${userId}:`, updateError);
        return false;
      }
      return true;
    });

    const updateResults = await Promise.all(updatePromises);
    if (updateResults.includes(false)) {
      console.error('One or more portfolio updates failed during competition assignment.');
      return false;
    }

    console.log(`Successfully assigned ${usersToAssign.length} users to ${competitionLeagueName} competition.`);
    return true;
  }

  static async getDemoPortfolio(userId: string): Promise<Portfolio | null> {
    console.log(`[DEMO] Fetching demo portfolio for user: ${userId}`);
    // Simulate fetching a demo portfolio
    // In a real application, this would fetch from a separate demo database or service
    return {
      id: `demo-portfolio-${userId}`,
      user_id: userId,
      total_equity: 100000.0 + Math.random() * 5000 - 2500, // Simulate some fluctuations
      cash_balance: 50000.0 + Math.random() * 2000 - 1000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      realized_pnl: Math.random() * 1000 - 500,
      unrealized_pnl: Math.random() * 500 - 250,
      daily_pnl: Math.random() * 100 - 50,
      weekly_pnl: Math.random() * 200 - 100,
      monthly_pnl: Math.random() * 500 - 250,
      total_trades: Math.floor(Math.random() * 100),
      winning_trades: Math.floor(Math.random() * 60),
      losing_trades: Math.floor(Math.random() * 40),
      win_rate: parseFloat((Math.random() * 100).toFixed(2)),
      largest_win: Math.random() * 200,
      largest_loss: -Math.random() * 150,
      league_id: null,
      competition_rank: null,
      competition_score: 0,
      entry_fee_paid: 0,
      prize_eligibility: false,
      position_count: Math.floor(Math.random() * 5),
      max_position_size: 10000,
      risk_score: parseFloat((Math.random() * 10).toFixed(1)),
      max_drawdown: -Math.random() * 500,
      last_trade_at: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      last_login_at: new Date().toISOString(),
    };
  }

  static async getDemoTrades(userId: string): Promise<Trade[]> {
    console.log(`[DEMO] Fetching demo trades for user: ${userId}`);
    // Simulate fetching demo trades
    // In a real application, this would fetch from a separate demo database or service
    const mockTrade: Trade = {
      id: `demo-trade-${Math.random().toString(36).substring(7)}`,
      user_id: userId,
      symbol: "AUDUSD",
      position_type: Math.random() > 0.5 ? "long" : "short",
      quantity: 100000,
      entry_price: 0.65 + (Math.random() * 0.01 - 0.005),
      exit_price: null,
      pnl: 0,
      is_closed: false,
      created_at: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      stop_loss: null,
      take_profit: null,
      risk_amount: 0,
      position_size_usd: 100000 * (0.65 + (Math.random() * 0.01 - 0.005)),
      order_status: "filled",
      order_type: "market",
      limit_price: null,
      filled_quantity: 100000,
      average_fill_price: 0.65 + (Math.random() * 0.01 - 0.005),
      slippage: 0,
      updated_at: new Date().toISOString(),
      closed_at: null,
      filled_at: new Date().toISOString(),
      cancelled_at: null,
      commission: 100000 * (0.65 + (Math.random() * 0.01 - 0.005)) * 0.001,
      swap: 0,
      gross_pnl: 0,
      net_pnl: 0,
      current_price: 0.65 + (Math.random() * 0.01 - 0.005),
      highest_price: 0.65 + (Math.random() * 0.01 - 0.005) + 0.001,
      lowest_price: 0.65 + (Math.random() * 0.01 - 0.005) - 0.001,
      entry_spread: 0.0001,
      strategy_name: "Demo Strategy",
      trade_reason: "Simulated entry for practice",
      confidence_level: Math.floor(Math.random() * 10) + 1,
      league_id: null,
      trade_session: "demo",
      platform_version: "1.0.0",
      ip_address: "127.0.0.1",
      device_type: "web",
      margin_used: 1000,
      leverage: 10,
      risk_warning_shown: true,
      auto_close_reason: null,
      asset_class: "forex",
      lot_size: 100000,
      pip_value: 10,
      unrealized_pnl: (Math.random() * 200 - 100), // Simulate PnL
      realized_pnl: 0,
    };
    return [mockTrade]; // Return a single mock trade for simplicity
  }

  static async placeDemoTrade(userId: string, tradeRequest: TradeRequest): Promise<Trade | TradeErrorResponse> {
    console.log(`[DEMO] Placing demo trade for user ${userId}:`, tradeRequest);
    // Simulate placing a demo trade
    // In a real application, this would store the trade in a demo-specific database or state
    const newTrade: Trade = {
      id: `demo-trade-${Math.random().toString(36).substring(7)}`,
      user_id: userId,
      symbol: tradeRequest.symbol,
      position_type: tradeRequest.position_type,
      quantity: tradeRequest.quantity,
      entry_price: tradeRequest.price || 0,
      exit_price: null,
      pnl: 0,
      is_closed: false,
      created_at: new Date().toISOString(),
      stop_loss: tradeRequest.stop_loss || null,
      take_profit: tradeRequest.take_profit || null,
      risk_amount: 0, // Placeholder
      position_size_usd: tradeRequest.quantity * (tradeRequest.price || 1), // Simple calculation
      order_status: "filled",
      order_type: tradeRequest.order_type || "market",
      limit_price: tradeRequest.limit_price || null,
      filled_quantity: tradeRequest.quantity,
      average_fill_price: tradeRequest.price || 0,
      slippage: 0, // Simplified for demo
      updated_at: new Date().toISOString(),
      closed_at: null,
      filled_at: new Date().toISOString(),
      cancelled_at: null,
      commission: tradeRequest.quantity * (tradeRequest.price || 1) * this.COMMISSION_RATE,
      swap: 0, // Simplified
      gross_pnl: 0,
      net_pnl: 0,
      current_price: tradeRequest.price || 0,
      highest_price: tradeRequest.price || 0,
      lowest_price: tradeRequest.price || 0,
      entry_spread: 0, // Simplified
      strategy_name: tradeRequest.strategy_name || null,
      trade_reason: tradeRequest.trade_reason || null,
      confidence_level: tradeRequest.confidence_level || null,
      league_id: null,
      trade_session: "demo",
      platform_version: this.PLATFORM_VERSION,
      ip_address: null,
      device_type: "web",
      margin_used: tradeRequest.expectedMarginRequired || 0,
      leverage: tradeRequest.leverage || this.DEFAULT_LEVERAGE,
      risk_warning_shown: true,
      auto_close_reason: null,
      asset_class: "forex", // Assuming forex for mock
      lot_size: 100000, // Assuming standard lot for forex
      pip_value: 10, // Assuming standard pip value
      unrealized_pnl: 0,
      realized_pnl: 0,
    };
    return newTrade;
  }

  static async closeDemoTrade(tradeId: string, userId: string, exitPrice?: number, reason?: string): Promise<Trade | null> {
    console.log(`[DEMO] Closing demo trade ${tradeId} for user ${userId} at price ${exitPrice}, reason: ${reason}`);
    // Simulate closing a demo trade
    // In a real application, this would update the trade status in a demo-specific database or state
    // For simplicity, we'll return a mock closed trade
    const closedTrade: Trade = {
      id: tradeId,
      user_id: userId,
      symbol: "AUDUSD", // Mock symbol
      position_type: "long", // Mock position type
      quantity: 100000, // Mock quantity
      entry_price: 0.65, // Mock entry
      exit_price: exitPrice || 0.65 + (Math.random() * 0.005 - 0.0025), // Simulate exit price
      pnl: exitPrice ? (exitPrice - 0.65) * 100000 : (Math.random() * 500 - 250), // Simulate PnL
      is_closed: true,
      created_at: new Date(Date.now() - 3600000).toISOString(), // Mock creation time
      closed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      realized_pnl: exitPrice ? (exitPrice - 0.65) * 100000 : (Math.random() * 500 - 250),
      unrealized_pnl: 0,
      stop_loss: null,
      take_profit: null,
      risk_amount: 0,
      position_size_usd: 65000,
      order_status: "filled",
      order_type: "market",
      limit_price: null,
      filled_quantity: 100000,
      average_fill_price: 0.65,
      slippage: 0,
      commission: 65,
      swap: 0,
      gross_pnl: 0,
      net_pnl: 0,
      current_price: exitPrice || 0,
      highest_price: 0,
      lowest_price: 0,
      entry_spread: 0,
      strategy_name: "Demo Close",
      trade_reason: reason || "Manual close demo",
      confidence_level: 5,
      league_id: null,
      trade_session: "demo",
      platform_version: this.PLATFORM_VERSION,
      ip_address: null,
      device_type: "web",
      margin_used: 0,
      leverage: 10,
      risk_warning_shown: true,
      auto_close_reason: null,
      asset_class: "forex",
      lot_size: 100000,
      pip_value: 10,
      filled_at: null,    // Added missing property
      cancelled_at: null, // Added missing property
    };
    return closedTrade;
  }

  static async updateUnrealizedPnLDemo(userId: string, priceData: PriceData[]): Promise<void> {
    console.log(`[DEMO] Updating unrealized PnL for demo trades for user: ${userId}`);
    // Simulate updating unrealized PnL for demo trades
    // In a real application, this would update demo trade data
    // For now, it just logs
  }

  static async processAutoCloseDemo(userId: string, priceData: PriceData[]): Promise<void> {
    console.log(`[DEMO] Processing auto-close for demo trades for user: ${userId}`);
    // Simulate auto-closing demo trades
    // In a real application, this would process demo trade auto-closures
    // For now, it just logs
  }

  /**
   * Resets the user's demo trading balance to the initial amount and clears all demo trades.
   */
  static async resetDemoBalance(userId: string): Promise<boolean> {
    try {
      // 1. Reset portfolio balance
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolios')
        .update({
          total_equity: this.INITIAL_DEMO_BALANCE,
          cash_balance: this.INITIAL_DEMO_BALANCE,
          realized_pnl: 0,
          unrealized_pnl: 0,
          daily_pnl: 0,
          weekly_pnl: 0,
          monthly_pnl: 0,
          total_trades: 0,
          winning_trades: 0,
          losing_trades: 0,
          win_rate: 0,
          largest_win: 0,
          largest_loss: 0,
          position_count: 0,
          risk_score: 0,
          max_drawdown: 0,
          last_trade_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('is_demo', true)
        .select('*');

      if (portfolioError) {
        console.error('Error resetting demo portfolio:', portfolioError);
        return false;
      }

      // If no demo portfolio found, create one (this scenario should be handled by getDemoPortfolio, but as a fallback)
      if (!portfolioData || portfolioData.length === 0) {
        console.warn('No demo portfolio found to reset, attempting to create a default one.');
        await this.createPortfolio(userId); // Use the existing createPortfolio method
      }

      // 2. Delete all demo trades (both open and closed for a clean slate)
      const { error: deleteError } = await supabase
        .from('trades')
        .delete()
        .eq('user_id', userId)
        .eq('is_demo', true);

      if (deleteError) {
        console.error('Error deleting demo trades:', deleteError);
        return false;
      }

      console.log(`Demo balance reset to $${this.INITIAL_DEMO_BALANCE} and all demo trades cleared for user ${userId}.`);
      return true;
    } catch (error) {
      console.error('An unexpected error occurred during demo balance reset:', error);
      return false;
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
