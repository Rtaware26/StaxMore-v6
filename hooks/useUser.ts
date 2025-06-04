"use client"

import { useState, useEffect } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { syncUserToDB } from "@/lib/user-sync"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        setUser(session?.user ?? null)

        // Sync user to database if they exist and are confirmed
        if (session?.user) {
          try {
            await syncUserToDB(session.user)
          } catch (syncError) {
            console.error("Failed to sync user on initial session:", syncError)
          }
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
      setUser(session?.user ?? null)
      setLoading(false)

      // Sync user to database on auth state changes (like email confirmation)
      if (session?.user && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        try {
          await syncUserToDB(session.user)
        } catch (syncError) {
          console.error("Failed to sync user on auth state change:", syncError)
        }
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
  }
}
