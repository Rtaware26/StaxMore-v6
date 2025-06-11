'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface UseLeagueAccessResult {
  allowed: boolean;
  loading: boolean;
  userLeague: string | null;
}

/**
 * Hook to check user authentication and league membership for page access.
 * Redirects if not authenticated or not authorized for the required league(s).
 * @param requiredLeagues - A single league string or an array of league strings required to access the page.
 *                            If null or undefined, only checks authentication and membership existence.
 */
export function useLeagueAccess(requiredLeagues?: string | string[] | null): UseLeagueAccessResult {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLeague, setUserLeague] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log('User not authenticated, redirecting to login.');
        router.replace('/login');
        return;
      }

      console.log(`Authenticated user: ${user.id}. Checking membership.`);

      // Fetch user's league from the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('league') // Select the league column
        .eq('id', user.id) // Filter by user ID
        .single();

      // Check if there was an error fetching the profile or if league is null/empty
      if (profileError) {
        console.error('Error fetching user profile for league access check:', profileError);
        console.log('User profile not found or error fetching, redirecting to membership required.');
        router.replace('/membership-required');
        setLoading(false);
        return;
      }

      const league = profileData?.league || null; // Get the league from profile data, handle null/undefined

      if (!league) {
        console.log('User profile found but no league assigned, redirecting to membership required.');
        router.replace('/membership-required');
        setLoading(false);
        return;
      }

      setUserLeague(league);
      console.log(`User league: ${league}`);

      // Check if specific league access is required
      if (requiredLeagues !== undefined && requiredLeagues !== null) {
        const allowedLeagues = Array.isArray(requiredLeagues) ? requiredLeagues : [requiredLeagues];

        if (!allowedLeagues.includes(league)) {
          console.log(`User league ${league} not in allowed leagues: ${allowedLeagues.join(', ')}, redirecting to not authorised.`);
          router.replace('/not-authorised');
          setLoading(false);
          return;
        }
        console.log(`User league ${league} is in allowed leagues: ${allowedLeagues.join(', ')}. Access granted.`);

      } else {
          console.log('No specific league required, membership found. Access granted.');
      }

      // If all checks pass
      setAllowed(true);
      setLoading(false);
    };

    checkAccess();

  }, [router, requiredLeagues]); // Re-run effect if requiredLeagues changes

  return { allowed, loading, userLeague };
} 