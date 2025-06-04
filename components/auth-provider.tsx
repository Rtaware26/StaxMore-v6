"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useUser } from "@/hooks/useUser"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useUser()
  const router = useRouter()

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

  const contextValue = {
    ...auth,
    signOut: enhancedSignOut,
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
