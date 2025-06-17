"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function SuccessPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mountedLeagueFromParams, setMountedLeagueFromParams] = useState<string | null>(null);
  const [mountedSessionId, setMountedSessionId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const params = useSearchParams();
    setMountedLeagueFromParams(params.get('league'));
    setMountedSessionId(params.get('session_id'));
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const assignLeague = async () => {
      try {
        setIsLoading(true);

        if (!supabase) {
          setError("Supabase client not configured. Please check environment variables.");
          setIsLoading(false);
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setError("User not found. Please log in again.");
          return;
        }

        if (!mountedLeagueFromParams) {
          setError("League information missing from URL. Please try again.");
          return;
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ league: mountedLeagueFromParams })
          .eq('id', user.id);

        if (updateError) {
          setError("Failed to update league status. Please contact support.");
          console.error("Error updating profile:", updateError);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please contact support.");
        console.error("Error in success page:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (mountedLeagueFromParams) {
      assignLeague();
    } else {
      setIsLoading(false);
    }
  }, [isMounted, mountedLeagueFromParams]);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ✅ Payment successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment has been processed. Details will appear shortly.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Processing your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error}
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayLeague = mountedLeagueFromParams?.charAt(0).toUpperCase() + mountedLeagueFromParams?.slice(1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-xl font-semibold text-indigo-600">
          Welcome to {displayLeague} League!
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Your payment has been processed successfully. You now have access to exclusive league features.
        </p>
        <ul className="mt-4 text-left text-gray-700 list-disc list-inside space-y-2">
          <li>Access to the exclusive Trading Room chat</li>
          <li>Participation in the Leaderboard</li>
          <li>Enhanced trading analytics and tools</li>
          <li>Priority support</li>
        </ul>

        <div className="mt-8 space-y-4">
          <Link href="/trade">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Start Trading
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="w-full">
              Join League Chat
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 