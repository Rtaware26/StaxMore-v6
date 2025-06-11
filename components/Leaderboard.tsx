'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/auth-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

// Define the expected structure of data returned by the Supabase RPC function
interface LeaderboardEntry {
  user_id: string;
  username: string | null;
  total_equity: number;
  starting_balance: number;
  return_percentage: number;
}

interface LeaderboardProps {
  initialLeagueId?: string; // Make leagueId optional since we'll handle it internally
}

const AVAILABLE_LEAGUES = ['bronze', 'silver', 'gold', 'diamond'];

const Leaderboard: React.FC<LeaderboardProps> = ({ initialLeagueId = 'bronze' }) => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(initialLeagueId);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [currentUserReturn, setCurrentUserReturn] = useState<number | null>(null);

  const fetchLeaderboard = async (leagueId: string) => {
    if (!user) {
      setError('Please log in to view the leaderboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    console.log(`Fetching leaderboard for league: ${leagueId}`);

    try {
      const { data, error } = await supabase.rpc('get_leaderboard', { 
        league_id_input: leagueId 
      });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLeaderboardData([]);
      } else {
        console.log('Leaderboard data fetched successfully:', data);
        setLeaderboardData(data || []);

        // Find current user's rank and return
        const userEntry = data?.find(entry => entry.user_id === user.id);
        if (userEntry) {
          const rank = data.findIndex(entry => entry.user_id === user.id) + 1;
          setCurrentUserRank(rank);
          setCurrentUserReturn(userEntry.return_percentage);
        } else {
          setCurrentUserRank(null);
          setCurrentUserReturn(null);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and league change
  useEffect(() => {
    fetchLeaderboard(selectedLeague);
  }, [selectedLeague, user]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard(selectedLeague);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedLeague, user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-gray-600">Please log in to view the leaderboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !leaderboardData.length) {
    return <div className="text-center py-4">Loading leaderboard...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">Error loading leaderboard: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{selectedLeague.toUpperCase()} League Leaderboard</h2>
        <div className="flex items-center gap-4">
          <Select
            value={selectedLeague}
            onValueChange={setSelectedLeague}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select League" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_LEAGUES.map(league => (
                <SelectItem key={league} value={league}>
                  {league.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={() => fetchLeaderboard(selectedLeague)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Current User Stats */}
      {(currentUserRank !== null || currentUserReturn !== null) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {currentUserRank !== null && (
                <div>
                  <p className="text-sm text-gray-600">Current Rank</p>
                  <p className="text-2xl font-bold">#{currentUserRank}</p>
                </div>
              )}
              {currentUserReturn !== null && (
                <div>
                  <p className="text-sm text-gray-600">Return</p>
                  <p className={`text-2xl font-bold ${currentUserReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentUserReturn.toFixed(2)}%
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Rank</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Username</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total Equity</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">% Return</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No results found for {selectedLeague.toUpperCase()} league
                </td>
              </tr>
            ) : (
              leaderboardData.map((entry, index) => {
                const isCurrentUser = user?.id === entry.user_id;

                return (
                  <tr
                    key={entry.user_id}
                    className={`border-b border-gray-200 ${
                      isCurrentUser ? 'bg-yellow-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">#{index + 1}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {entry.username || 'Anonymous'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      ${entry.total_equity?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </td>
                    <td className={`py-3 px-4 text-sm font-semibold ${
                      entry.return_percentage >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.return_percentage.toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard; 