"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react'; // Using lucide-react for the icon
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { supabase } from "@/lib/supabaseClient"; // Import supabase

export default function SuccessPage() {
  const params = useSearchParams();
  const leagueFromParams = params.get('league'); // Get league from URL params
  const sessionId = params.get('session_id'); // Get session_id (optional, but good practice)

  // Use useEffect to update user's profile with league once after the component mounts
  useEffect(() => {
    const assignLeague = async () => {
      console.log("SuccessPage: useEffect triggered to assign league.");
      const { data: { user } } = await supabase.auth.getUser();

      console.log("SuccessPage: User ID from auth:", user?.id);
      console.log("SuccessPage: League from URL params:", leagueFromParams);

      if (!user) {
        console.warn("SuccessPage: Missing user, skipping league assignment.");
        return;
      }

       if (!leagueFromParams) {
        console.warn("SuccessPage: Missing league in URL params, skipping assignment.");
        // Optionally redirect to an error page or the competitions page
        return;
      }

      console.log(`SuccessPage: Attempting to update profile for user: ${user.id} with league: ${leagueFromParams}`);

      // Update the 'league' column in the 'profiles' table
      const { error } = await supabase
        .from('profiles')
        .update({ league: leagueFromParams })
        .eq('id', user.id);

      if (error) {
        console.error('SuccessPage: Error updating profile with league:', error);
        // Optionally show an error message to the user
      } else {
        console.log('SuccessPage: Profile updated successfully.'); // Simplified log as per example
        // Profile updated, useUser hook should now fetch the correct league
      }
    };

    assignLeague();
  }, []); // Empty dependency array to run only once on mount

  // Basic validation/fallback if league is not provided
  const displayLeague = leagueFromParams ? leagueFromParams.charAt(0).toUpperCase() + leagueFromParams.slice(1) : 'the League';

  // You might want to add conditional rendering or a loading state based on the insert status,
  // but for this request, we'll proceed with displaying the success message immediately.

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome to {displayLeague} League!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Congratulations on joining! You now have access to exclusive league features.
        </p>
        <ul className="mt-4 text-left text-gray-700 list-disc list-inside space-y-2">
          <li>Access to the exclusive Trading Room chat</li>
          <li>Participation in the Leaderboard</li>
          <li>Enhanced trading analytics and tools</li>
          <li>Priority support</li>
        </ul>

        <div className="mt-8 space-y-4">
          <Link href="/trade" passHref>
            <Button className="w-full btn-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Start Trading
            </Button>
          </Link>
          <Link href="/chat" passHref>
            <Button variant="outline" className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Join League Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 