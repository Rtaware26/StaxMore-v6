"use client"

import { useState, useEffect } from "react"
import { useUser } from "./use-user"
import { portfolioService, positionsService } from "@/lib/supabase-service"
import type { Tables } from "@/lib/supabase-client"

export interface UsePortfolioReturn {
  portfolio: Tables<"user_portfolios"> | null
  positions: Tables<"trading_positions">[]
  loading: boolean
  error: string | null
  refreshPortfolio: () => Promise<void>
  refreshPositions: () => Promise<void>
}

export function usePortfolio(): UsePortfolioReturn {
  const { user } = useUser()
  const [portfolio, setPortfolio] = useState<Tables<"user_portfolios"> | null>(null)
  const [positions, setPositions] = useState<Tables<"trading_positions">[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshPortfolio = async () => {
    if (!user) return

    try {
      setError(null)
      const portfolioData = await portfolioService.getPortfolio(user.id)
      setPortfolio(portfolioData)
    } catch (err) {
      console.error("Error refreshing portfolio:", err)
      setError(err instanceof Error ? err.message : "Failed to refresh portfolio")
    }
  }

  const refreshPositions = async () => {
    if (!user) return

    try {
      setError(null)
      const positionsData = await positionsService.getPositions(user.id)
      setPositions(positionsData)
    } catch (err) {
      console.error("Error refreshing positions:", err)
      setError(err instanceof Error ? err.message : "Failed to refresh positions")
    }
  }

  useEffect(() => {
    if (user) {
      setLoading(true)
      Promise.all([refreshPortfolio(), refreshPositions()])
        .catch((err) => {
          console.error("Error loading portfolio data:", err)
          setError("Failed to load portfolio data")
        })
        .finally(() => setLoading(false))
    } else {
      setPortfolio(null)
      setPositions([])
      setLoading(false)
    }
  }, [user])

  return {
    portfolio,
    positions,
    loading,
    error,
    refreshPortfolio,
    refreshPositions,
  }
}
