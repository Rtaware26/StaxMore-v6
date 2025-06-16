"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"

interface LeaderboardEntry {
  user_id: string;
  username: string | null;
  total_equity: number;
  starting_balance: number;
  return_percentage: number;
  league_id: string;
  can_be_copied: boolean;
  avatar_url?: string; // Assuming avatar_url might be added later
}

interface UserHoverCardProps {
  entry: LeaderboardEntry;
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({
  entry
}) => {
  return (
    <Card className="w-72 bg-gray-800 border border-gray-700 text-gray-200 shadow-xl overflow-hidden rounded-lg">
      <CardHeader className="flex items-center justify-center p-4 pb-2">
        {entry.avatar_url ? (
          <img src={entry.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-emerald-500 shadow-md" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-2xl font-bold border-2 border-gray-600">
            {entry.username ? entry.username.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </CardHeader>
      <CardContent className="text-center p-4 pt-2">
        <CardTitle className="text-xl font-bold text-white mb-1">{entry.username || 'Anonymous'}</CardTitle>
        <CardDescription className="text-sm text-gray-400 mb-3">{entry.league_id.toUpperCase()} League</CardDescription>
        
        <Separator className="my-3 bg-gray-700" />

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">% Return</p>
            <p className={`font-semibold ${entry.return_percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {entry.return_percentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-gray-400">Total Equity</p>
            <p className="font-semibold text-white">
              ${entry.total_equity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {entry.can_be_copied && (
          <Badge className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
            Copy Trades Enabled
          </Badge>
        )}
      </CardContent>
    </Card>
  )
} 