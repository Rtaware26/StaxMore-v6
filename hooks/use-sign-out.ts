"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signOut = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      // Clear any local storage or session storage if needed
      localStorage.removeItem("supabase.auth.token")
      sessionStorage.clear()

      // Redirect to login page
      router.push("/login")

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      console.error("Sign out error:", err)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signOut,
    isLoading,
    error,
  }
}
