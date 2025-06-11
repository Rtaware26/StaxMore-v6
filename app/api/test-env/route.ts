import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Test API Route: NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
  console.log('Test API Route: STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Loaded' : 'Not Loaded');
  console.log('Test API Route: All Env Vars:', process.env);

  return NextResponse.json({ 
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    stripeKeyLoaded: process.env.STRIPE_SECRET_KEY ? true : false,
    message: 'Check server logs for full environment variables.'
  });
} 