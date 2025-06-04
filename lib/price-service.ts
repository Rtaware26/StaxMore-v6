export interface PriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  bid: number
  ask: number
  spread: number
  timestamp: number
  cached?: boolean
  error?: boolean
}

export class PriceService {
  private static priceCache: Map<string, PriceData> = new Map()
  private static lastBatchFetch = 0
  private static readonly CACHE_DURATION = 5000 // 5 seconds cache

  private static detectClass(sym: string): 'stock'|'crypto'|'forex'|'commodity' {
    if (/^[A-Z]{6}$/.test(sym) && sym.endsWith('USD')) return 'forex';
    if (/BTC|ETH|LTC|XRP/.test(sym)) return 'crypto';
    if (sym === 'WTI' || sym === 'BRENT' || sym.startsWith('XAU')) return 'commodity';
    return 'stock';
  }

  // Get price for a single symbol
  static async getPrice(symbol: string): Promise<PriceData | null> {
    try {
      const now = Date.now()
      const cached = this.priceCache.get(symbol)

      // Return from cache if valid
      if (cached && now - cached.timestamp < this.CACHE_DURATION) {
        return cached
      }

      // Fetch from API
      const cls = this.detectClass(symbol);
      const base = typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL
        : '';
      const url = `${base}/api/price?symbol=${encodeURIComponent(symbol)}&class=${cls}`;
      console.log('[PriceService] fetching', url);

      const response = await fetch(url);
      console.log('[PriceService] status', response.status, symbol);

      if (!response.ok) {
        // Return error price data instead of throwing
        const errorPrice: PriceData = {
          symbol,
          price: 0,
          change: 0,
          changePercent: 0,
          bid: 0,
          ask: 0,
          spread: 0,
          timestamp: now,
          error: true,
        }
        this.priceCache.set(symbol, errorPrice)
        return errorPrice
      }

      const data = await response.json()

      if (data.error) {
        // Return error price data
        const errorPrice: PriceData = {
          symbol,
          price: 0,
          change: 0,
          changePercent: 0,
          bid: 0,
          ask: 0,
          spread: 0,
          timestamp: now,
          error: true,
        }
        this.priceCache.set(symbol, errorPrice)
        return errorPrice
      }

      // Create price data object
      const priceData: PriceData = {
        symbol,
        price: data.price || 0,
        change: data.change || 0,
        changePercent: data.changePercent || 0,
        bid: data.bid || data.price * 0.999,
        ask: data.ask || data.price * 1.001,
        spread: data.spread || data.price * 0.002,
        timestamp: now,
        cached: data.cached,
        error: false,
      }

      // Update cache
      this.priceCache.set(symbol, priceData)
      return priceData
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)

      // Return error price data instead of null
      const errorPrice: PriceData = {
        symbol,
        price: 0,
        change: 0,
        changePercent: 0,
        bid: 0,
        ask: 0,
        spread: 0,
        timestamp: Date.now(),
        error: true,
      }
      this.priceCache.set(symbol, errorPrice)
      return errorPrice
    }
  }

  // Get prices for multiple symbols
  static async getPrices(symbols: string[]): Promise<PriceData[]> {
    try {
      const now = Date.now()

      // If we've fetched recently, return from cache
      if (now - this.lastBatchFetch < this.CACHE_DURATION) {
        return symbols.map((symbol) => this.priceCache.get(symbol)).filter(Boolean) as PriceData[]
      }

      this.lastBatchFetch = now

      // Fetch prices in parallel with a limit of 5 concurrent requests
      const results: PriceData[] = []
      const chunks = this.chunkArray(symbols, 5)

      for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map((symbol) => this.getPrice(symbol)))
        results.push(...(chunkResults.filter(Boolean) as PriceData[]))
      }

      return results
    } catch (error) {
      console.error("Error fetching prices:", error)
      return []
    }
  }

  // Helper to chunk array for parallel processing
  private static chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  // Generate mock price data for testing
  static getMockPrice(symbol: string): PriceData {
    const basePrice = this.getBasePriceForSymbol(symbol)
    const change = (Math.random() * 0.02 - 0.01) * basePrice
    const spread = basePrice * 0.0002 // 0.02% spread

    return {
      symbol,
      price: basePrice,
      change,
      changePercent: (change / basePrice) * 100,
      bid: basePrice - spread / 2,
      ask: basePrice + spread / 2,
      spread,
      timestamp: Date.now(),
    }
  }

  // Get a sensible base price for different asset types
  private static getBasePriceForSymbol(symbol: string): number {
    if (symbol.includes("USD=X") || symbol.includes("EUR=X")) {
      return 1.1 + Math.random() * 0.1 // Forex around 1.1-1.2
    } else if (symbol.includes("JPY=X")) {
      return 110 + Math.random() * 10 // JPY around 110-120
    } else if (symbol.includes("BTC") || symbol.includes("ETH")) {
      return 30000 + Math.random() * 5000 // Crypto
    } else {
      return 100 + Math.random() * 50 // Stocks around 100-150
    }
  }
}
