import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js"

const TD_KEY = process.env.TWELVE_DATA_API_KEY!
const TD_URL = "https://api.twelvedata.com/price"

type Asset = {
  symbol: string
  asset_class: "stock" | "crypto" | "forex" | "commodity"
}

function tdSymbol(a: Asset) {
  if (a.asset_class === "forex") {
    // AUDUSD   →  AUD/USD
    const b = a.symbol.slice(0, 3)
    const q = a.symbol.slice(3)
    return `${b}/${q}`
  }
  if (a.asset_class === "crypto") {
    // BTCUSD   →  BTC/USD
    const base = a.symbol.replace(/USD$/, "")
    return `${base}/USD`
  }
  // stocks & most ETFs: symbol as-is
  return a.symbol
}

export const runtime = "edge"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables are not set. SUPABASE_URL or SUPABASE_ANON_KEY is missing.");
      return NextResponse.json({ message: "Server configuration error: Supabase credentials missing." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // fetch active symbols
    const { data: assets } = (await supabase.from("assets").select("symbol, asset_class")
      .eq("is_active", true)
      .in("symbol", ['AUDUSD'])
    ) as {
      data: Asset[]
    }

    if (!assets || assets.length === 0) {
      return new Response("No active assets found", { status: 404 })
    }

    // Twelve Data allows 8 symbols / request
    const batches: Asset[][] = []
    for (let i = 0; i < assets.length; i += 8) batches.push(assets.slice(i, i + 8))

    const rows: { symbol: string; price: number }[] = []

    for (const batch of batches) {
      try {
        const symbolsParam = batch.map(tdSymbol).join(",")
        const url = `${TD_URL}?symbol=${symbolsParam}&apikey=${TD_KEY}`
        const response = await fetch(url)

        if (!response.ok) {
          console.error(`Twelve Data API error: ${response.status} ${response.statusText}`)
          continue
        }

        const json = await response.json()

        for (const asset of batch) {
          const tdSym = tdSymbol(asset)
          const priceStr = json[tdSym]?.price
          if (priceStr && !isNaN(Number(priceStr))) {
            rows.push({ symbol: asset.symbol, price: Number(priceStr) })
          }
        }
      } catch (error) {
        console.error(`Error fetching batch:`, error)
        continue
      }
    }

    if (rows.length > 0) {
      const { error } = await supabase.from("asset_prices").upsert(rows)
      if (error) {
        console.error("Error upserting prices:", error)
        return NextResponse.json({ message: `Database error: ${error.message}` }, { status: 500 })
      }
    }

    return new Response(`Updated ${rows.length} prices`)
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }, { status: 500 })
  }
}
