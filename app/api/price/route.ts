import { NextResponse } from 'next/server';

const TD_KEY = process.env.TWELVE_DATA_API_KEY!;
const TD_URL = 'https://api.twelvedata.com/price';

function toTdSymbol(sym: string, cls: string) {
  if (cls === 'forex') {
    // AUDUSD  →  AUD/USD
    return `${sym.slice(0, 3)}/${sym.slice(3)}`;
  }
  if (cls === 'crypto') {
    // BTCUSD  →  BTC/USD
    return `${sym.replace(/USD$/, '')}/USD`;
  }
  return sym; // stocks & ETFs unchanged
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const uiSymbol = url.searchParams.get('symbol')?.toUpperCase() || '';
  const assetClass = url.searchParams.get('class') || ''; // 'forex' | 'crypto' | 'stock' | 'commodity'

  if (!uiSymbol || !assetClass) {
    return NextResponse.json({ error: 'symbol or class missing' }, { status: 400 });
  }

  const tdSymbol = toTdSymbol(uiSymbol, assetClass);

  try {
    const resp = await fetch(`${TD_URL}?symbol=${tdSymbol}&apikey=${TD_KEY}`);
    const json = await resp.json();

    if (!json.price) {
      console.error(`Price unavailable for ${uiSymbol}:`, json.message || 'Unknown error'); // Added more specific logging
      return NextResponse.json({ error: 'price unavailable' }, { status: 502 });
    }

    return NextResponse.json({ price: Number(json.price) });
  } catch (error) {
    console.error(`Error fetching price for ${uiSymbol}:`, error);
    return NextResponse.json({ error: 'price unavailable' }, { status: 502 });
  }
}
