import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Not Loaded');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  try {
    const { userId, leagueId } = await req.json();

    if (!userId || !leagueId) {
      return NextResponse.json({ message: 'Missing userId or leagueId in request body' }, { status: 400 });
    }

    let priceId: string | undefined;

    // Note: Double-check these environment variable names match your Stripe price IDs
    switch (leagueId) {
      case 'bronze':
        priceId = process.env.STRIPE_BRONZE_PRICE_ID;
        break;
      case 'silver':
        priceId = process.env.STRIPE_SILVER_PRICE_ID;
        break;
      case 'gold':
        priceId = process.env.STRIPE_GOLD_PRICE_ID;
        break;
      case 'diamond':
        // Potential typo in previous reference, using STRIPE_DIAMOND_PRICE_ID as a more likely name
        priceId = process.env.STRIPE_DIAMOND_PRICE_ID;
        break;
      default:
        return NextResponse.json({ message: 'Invalid league specified' }, { status: 400 });
    }

    if (!priceId) {
       console.error(`Stripe price ID not found for league: ${leagueId}`);
      return NextResponse.json({ message: `Stripe price ID not configured for ${leagueId} league.` }, { status: 500 });
    }

    console.log('NEXT_PUBLIC_SITE_URL in API route:', process.env.NEXT_PUBLIC_SITE_URL);

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/success?league=${leagueId}&user=${userId}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/trade`; // Or a specific cancel page

    console.log('Using priceId:', priceId);
    console.log('Generated successUrl:', successUrl);
    console.log('Generated cancelUrl:', cancelUrl);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
        league: leagueId,
      },
    });

    if (session.url) {
      return NextResponse.json({ url: session.url }, { status: 200 });
    } else {
      console.error('Stripe session creation failed, no URL returned.');
      return NextResponse.json({ message: 'Failed to create Stripe checkout session.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ message: error.message || 'Internal server error creating checkout session' }, { status: 500 });
  }
}

// Add handlers for other methods if needed, otherwise Next.js will return 405 Method Not Allowed by default
export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
} 