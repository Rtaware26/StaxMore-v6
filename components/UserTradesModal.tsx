"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TradingService, Trade } from "@/lib/trading-service"
import { Eye, Copy, ArrowRight, ArrowDownRight } from "lucide-react"

interface UserTradesModalProps {
  isOpen: boolean
  onClose: () => void
  traderId: string
  traderUsername: string
  isCopyAllowed: boolean
  viewerLeagueId: string | null // League ID of the user viewing
  traderLeagueId: string | null // League ID of the trader being viewed
}

export const UserTradesModal: React.FC<UserTradesModalProps> = ({
  isOpen,
  onClose,
  traderId,
  traderUsername,
  isCopyAllowed,
  viewerLeagueId,
  traderLeagueId,
}) => {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !traderId) {
      setTrades([])
      return
    }

    const fetchTrades = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedTrades = await TradingService.getTrades(traderId, false) // Fetch only open trades
        setTrades(fetchedTrades)
      } catch (err) {
        console.error("Failed to fetch trades:", err)
        setError("Failed to load trades. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTrades()
  }, [isOpen, traderId])

  // Determine if Copy Trades button should be visible based on privacy
  const canSeeCopyTradesButton =
    isCopyAllowed && viewerLeagueId === traderLeagueId && traderLeagueId !== null

  const handleCopyTrades = () => {
    // Placeholder for actual copy trade logic
    alert(`Copying trades from ${traderUsername} is not yet implemented.`)
    console.log(`Attempting to copy trades from ${traderUsername} (ID: ${traderId})`)
    // Here, you would integrate with your backend to initiate trade copying
  }

  const openTrades = trades.filter((trade) => !trade.is_closed)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trades of {traderUsername}</DialogTitle>
          <DialogDescription>
            Overview of {traderUsername}'s open trading positions.
          </DialogDescription>
        </DialogHeader>

        {loading && <div className="text-center py-4">Loading trades...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="space-y-6 mt-4">
            {canSeeCopyTradesButton && (
              <Button onClick={handleCopyTrades} className="w-full btn-primary">
                <Copy className="h-5 w-5 mr-2" />
                Copy Trades
              </Button>
            )}

            {openTrades.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Open Trades ({openTrades.length})</h3>
                <div className="space-y-4">
                  {openTrades.map((trade) => (
                    <div key={trade.id} className="card-modern p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg">{trade.symbol}</span>
                        <Badge
                          className={`${
                            trade.position_type === "long"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trade.position_type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                        <div>Quantity: {trade.quantity}</div>
                        <div>Entry: {trade.entry_price.toFixed(4)}</div>
                        <div>
                          P&L:{" "}
                          <span
                            className={`${
                              (trade.pnl || 0) >= 0 ? "text-emerald-600" : "text-red-600"
                            } font-semibold`}
                          >
                            {(trade.pnl || 0).toLocaleString(undefined, {
                              style: "currency",
                              currency: "USD",
                            })}
                          </span>
                        </div>
                        <div>
                          Margin:{" "}
                          <span className="font-semibold">
                            {trade.margin_used.toLocaleString(undefined, {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openTrades.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                {traderUsername} has no open trades to display.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 