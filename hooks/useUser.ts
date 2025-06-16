"use client"

import { useState, useEffect } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { syncUserToDB } from "@/lib/user-sync"

// Define interface for the user profile fetched from the 'profiles' table
export interface UserProfile {
  id: string;
  username: string | null;
  league: string | null; // Assuming league can be null if user hasn't joined yet
  can_be_copied: boolean; // New field for copy trade opt-in
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State for user profile

   // Function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
     console.log("useUser: Fetching user profile for user:", userId);
     const { data: profileData, error: profileError } = await supabase
       .from('profiles')
       .select('id, username, league') // Select the required profile fields
       .eq('id', userId)
       .single();

     if (profileError) {
       console.error("useUser: Error fetching user profile:", profileError);
       return null;
     } else {
       console.log("useUser: User profile fetched:", profileData);
       return profileData;
     }
  };

  // Function to manually refresh the user profile
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchUserProfile(user.id);
      setUserProfile(profileData);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setSession(session)
        const currentUser = session?.user ?? null;
        setUser(currentUser)

        // Sync user to database and fetch profile if they exist and are confirmed
        if (currentUser) {
          try {
            await syncUserToDB(currentUser)

            // Fetch user profile on initial session
            const profileData = await fetchUserProfile(currentUser.id);
            setUserProfile(profileData);

          } catch (syncError) {
            console.error("Failed to sync user on initial session:", syncError)
            setUserProfile(null); // Ensure profile is null on sync error
          } finally {
             // Loading state is handled by the main setLoading(false) below
          }
        } else {
           setUserProfile(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      setSession(session)
      const currentUser = session?.user ?? null;
      setUser(currentUser)
      setLoading(false)

      // Sync user to database and fetch profile on auth state changes
      if (currentUser && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        try {
          await syncUserToDB(currentUser)

          // Fetch user profile on sign in or token refresh
           const profileData = await fetchUserProfile(currentUser.id);
           setUserProfile(profileData);

        } catch (syncError) {
          console.error("Failed to sync user on auth state change:", syncError)
          setUserProfile(null); // Ensure profile is null on sync error
        } finally {
           // Loading state is handled by the main setLoading(false) above
        }
      } else if (!currentUser) { // Handle sign out
         setUserProfile(null);
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      // Clear profile state on sign out
      setUserProfile(null);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred during sign out")
      }
    }
  }

  return {
    user,
    session,
    loading,
    error,
    signOut,
    userProfile, // Include userProfile in the returned object
    refreshProfile, // Include refreshProfile in the returned object
  }
}
