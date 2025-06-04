import { supabase } from "./supabaseClient"

export interface Asset {
  id: string
  symbol: string
  name: string
  asset_class: "forex" | "crypto" | "stock" | "commodity"
  base_currency: string
  quote_currency: string
  precision: number
  lot_size: number
  pip_value?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AssetPriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: number
  bid: number
  ask: number
  spread: number
  asset: Asset
}

export class AssetService {
  private static assetsCache: Asset[] | null = null
  private static assetsCacheTime = 0
  private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes for assets

  // Fetch active assets from Supabase
  static async getActiveAssets(): Promise<Asset[]> {
    try {
      // Check cache first
      const now = Date.now()
      if (this.assetsCache && now - this.assetsCacheTime < this.CACHE_DURATION) {
        return this.assetsCache
      }

      const { data: assets, error } = await supabase
        .from("assets")
        .select("*")
        .eq("is_active", true)
        .order("asset_class, symbol")

      if (error) {
        console.error("Error fetching assets:", error)
        return this.getMockAssets()
      }

      // Update cache
      this.assetsCache = assets || []
      this.assetsCacheTime = now

      // If no data from database, return mock data
      if (this.assetsCache.length === 0) {
        return this.getMockAssets()
      }

      return this.assetsCache
    } catch (error) {
      console.error("Error in getActiveAssets:", error)
      return this.getMockAssets()
    }
  }

  // Get assets grouped by asset class
  static async getAssetsByClass(): Promise<Record<string, Asset[]>> {
    const assets = await this.getActiveAssets()

    return assets.reduce(
      (groups, asset) => {
        const className = asset.asset_class
        if (!groups[className]) {
          groups[className] = []
        }
        groups[className].push(asset)
        return groups
      },
      {} as Record<string, Asset[]>,
    )
  }

  // Find asset by symbol
  static async getAssetBySymbol(symbol: string): Promise<Asset | null> {
    const assets = await this.getActiveAssets()
    return assets.find((asset) => asset.symbol === symbol) || null
  }

  // Calculate forex-specific values
  static calculateForexValues(
    asset: Asset,
    quantity: number,
    price: number,
    leverage = 10,
  ): {
    pipValue: number
    positionValue: number
    lotSize: number
    marginBase: number
    marginQuote: number
  } {
    if (asset.asset_class !== "forex") {
      return {
        pipValue: 0,
        positionValue: quantity * price,
        lotSize: 1,
        marginBase: (quantity * price) / leverage,
        marginQuote: (quantity * price) / leverage,
      }
    }

    const lotSize = asset.lot_size || 100000 // Standard lot size
    const pipValue = (0.0001 / price) * lotSize * quantity
    const positionValue = quantity * lotSize * price

    // Calculate margin requirements
    const marginBase = (lotSize * quantity) / leverage
    const marginQuote = marginBase * price

    return {
      pipValue: Number(pipValue.toFixed(4)),
      positionValue: Number(positionValue.toFixed(2)),
      lotSize,
      marginBase: Number(marginBase.toFixed(2)),
      marginQuote: Number(marginQuote.toFixed(2)),
    }
  }

  // Calculate position size in USD for any asset type
  static calculatePositionSizeUSD(asset: Asset, quantity: number, price: number): number {
    if (asset.asset_class === "forex") {
      const { positionValue } = this.calculateForexValues(asset, quantity, price)
      return positionValue
    }

    return quantity * price
  }

  // Format price based on asset precision
  static formatPrice(price: number, asset: Asset): string {
    return price.toFixed(asset.precision || 4)
  }

  // Get Yahoo Finance symbol format
  static getYahooSymbol(asset: Asset): string {
    switch (asset.asset_class) {
      case "forex":
        // Convert EUR/USD to EURUSD=X format
        return `${asset.base_currency}${asset.quote_currency}=X`

      case "crypto":
        // Convert BTC/USD to BTC-USD format
        return `${asset.base_currency}-${asset.quote_currency}`

      case "commodity":
        // Commodities often have =F suffix
        if (asset.symbol.includes("=F")) {
          return asset.symbol
        }
        return `${asset.symbol}=F`

      case "stock":
      default:
        return asset.symbol
    }
  }

  // Validate if asset exists and is active
  static async validateAsset(symbol: string): Promise<boolean> {
    const asset = await this.getAssetBySymbol(symbol)
    return asset !== null && asset.is_active
  }

  // Get asset display name
  static getAssetDisplayName(asset: Asset): string {
    if (asset.asset_class === "forex") {
      return `${asset.base_currency}/${asset.quote_currency}`
    }
    return `${asset.symbol} - ${asset.name}`
  }

  // Get asset class display name
  static getAssetClassDisplayName(assetClass: string): string {
    const classNames: Record<string, string> = {
      forex: "Forex",
      crypto: "Cryptocurrency",
      stock: "Stocks",
      commodity: "Commodities",
    }
    return classNames[assetClass] || assetClass
  }

  // Clear cache (useful for testing or forced refresh)
  static clearCache(): void {
    this.assetsCache = null
    this.assetsCacheTime = 0
  }

  // Mock assets for testing
  private static getMockAssets(): Asset[] {
    return [
      {
        id: "1",
        symbol: "EURUSD=X",
        name: "Euro/US Dollar",
        asset_class: "forex",
        base_currency: "EUR",
        quote_currency: "USD",
        precision: 5,
        lot_size: 100000,
        pip_value: 10,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        symbol: "GBPUSD=X",
        name: "British Pound/US Dollar",
        asset_class: "forex",
        base_currency: "GBP",
        quote_currency: "USD",
        precision: 5,
        lot_size: 100000,
        pip_value: 10,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        symbol: "AUDUSD=X",
        name: "Australian Dollar/US Dollar",
        asset_class: "forex",
        base_currency: "AUD",
        quote_currency: "USD",
        precision: 5,
        lot_size: 100000,
        pip_value: 10,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "4",
        symbol: "AAPL",
        name: "Apple Inc.",
        asset_class: "stock",
        base_currency: "USD",
        quote_currency: "USD",
        precision: 2,
        lot_size: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "5",
        symbol: "MSFT",
        name: "Microsoft Corporation",
        asset_class: "stock",
        base_currency: "USD",
        quote_currency: "USD",
        precision: 2,
        lot_size: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "6",
        symbol: "BTC-USD",
        name: "Bitcoin",
        asset_class: "crypto",
        base_currency: "BTC",
        quote_currency: "USD",
        precision: 2,
        lot_size: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "7",
        symbol: "ETH-USD",
        name: "Ethereum",
        asset_class: "crypto",
        base_currency: "ETH",
        quote_currency: "USD",
        precision: 2,
        lot_size: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }
}
