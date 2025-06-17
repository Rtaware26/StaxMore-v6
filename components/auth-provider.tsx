"use client"

import { createContext, useContext, type ReactNode, useEffect } from "react"
import { useUser } from "@/hooks/useUser"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import type { UserProfile } from "@/hooks/useUser"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
  userProfile: UserProfile | null
  refreshProfile: () => Promise<void>
  isGuest: boolean;
  isFreeUser: boolean;
  isCompMember: boolean;
  canAccessFeature: (feature: 'chat' | 'demo-trading' | 'live-trading' | 'competitions') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useUser()
  const router = useRouter()

  useEffect(() => {
    const syncProfile = async () => {
      // Wait for the user and ensure auth is not loading before proceeding
      if (auth.user && !auth.loading) {
        console.log("User detected, attempting to sync profile:", auth.user.id);

        const profilePayload = {
          id: auth.user.id,
          username: auth.user.user_metadata?.full_name || auth.user.email,
        };

        console.log("Attempting to sync profile (insert if not exists) with payload:", profilePayload);

        // Attempt to insert the profile. If it already exists, Supabase will return a duplicate key error.
        const { error: insertError } = await supabase.from('profiles').insert([profilePayload]);

        if (insertError) {
          // Check if the error is a duplicate key error (profile already exists)
          // Supabase returns a specific code for duplicate keys, often '23505' for unique violation
          // or 'PGRST116' depending on the exact error details and Supabase version/setup.
          // Let's check for the common SQL state '23505' for unique_violation
          // or potentially the message content if code is unreliable across versions.
          // A safer check might involve attempting a select first, but insert+error handling is often more performant.
          // Let's rely on the SQLSTATE '23505' for unique_violation on the primary key (id).
          if (insertError.code === '23505') { // SQLSTATE for unique_violation
             console.log("Profile already exists for user:", auth.user.id, "- no sync needed.");
             // Profile already exists, do nothing more.
          } else {
            // Handle other insert errors
            console.error("Error inserting profile:", insertError);
            console.error("Full error object:", JSON.stringify(insertError, null, 2)); // Log full error object
            // Optionally throw or set an error state if needed for critical failures
          }
        } else {
          console.log("Profile successfully synced (inserted) for new user:", auth.user.id);
          // Profile was successfully inserted for a new user.
        }
      }
    };

    syncProfile();

  }, [auth.user, auth.loading]); // Re-run effect when user or loading status changes

  // Enhanced signOut function that also handles routing
  const enhancedSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        router.push("/login")
      } else {
        console.error("Logout failed:", error.message)
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err)
    }
  }

  const contextValue: AuthContextType = {
    ...auth,
    signOut: enhancedSignOut,
    userProfile: auth.userProfile,
    refreshProfile: auth.refreshProfile,
    isGuest: auth.isGuest,
    isFreeUser: auth.isFreeUser,
    isCompMember: auth.isCompMember,
    canAccessFeature: auth.canAccessFeature,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
