'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/auth-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { UserTradesModal } from '@/components/UserTradesModal';
import { Eye, Copy } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserHoverCard } from '@/components/UserHoverCard';
import { Badge } from "@/components/ui/badge";

// Define the expected structure of data returned by the Supabase RPC function
interface LeaderboardEntry {
  user_id: string;
  username: string | null;
  total_equity: number;
  starting_balance: number;
  return_percentage: number;
  league_id: string;
  can_be_copied: boolean;
}

interface LeaderboardProps {
  initialLeagueId?: string; // Make leagueId optional since we'll handle it internally
}

const AVAILABLE_LEAGUES = ['bronze', 'silver', 'gold', 'diamond'];

// Helper to get the target return for the next tier
const getNextTierTarget = (currentLeague: string): number => {
  switch (currentLeague) {
    case 'bronze':
      return 10; // Example: 10% return for Silver
    case 'silver':
      return 25; // Example: 25% return for Gold
    case 'gold':
      return 50; // Example: 50% return for Diamond
    case 'diamond':
      return 100; // Example: 100% return for ultimate tier / max out
    default:
      return 0;
  }
};

// Helper to get the name of the next tier
const getNextTierName = (currentLeague: string): string => {
  switch (currentLeague) {
    case 'bronze':
      return 'Silver';
    case 'silver':
      return 'Gold';
    case 'gold':
      return 'Diamond';
    case 'diamond':
      return 'Master'; // Or simply 'Max Rank'
    default:
      return 'N/A';
  }
};

const Leaderboard: React.FC<LeaderboardProps> = ({ initialLeagueId = 'bronze' }) => {
  const { user, userProfile } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(initialLeagueId);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [currentUserReturn, setCurrentUserReturn] = useState<number | null>(null);
  const [isTradesModalOpen, setIsTradesModalOpen] = useState(false);
  const [selectedTraderId, setSelectedTraderId] = useState<string | null>(null);
  const [selectedTraderUsername, setSelectedTraderUsername] = useState<string | null>(null);
  const [selectedTraderLeagueId, setSelectedTraderLeagueId] = useState<string | null>(null);
  const [selectedTraderCanBeCopied, setSelectedTraderCanBeCopied] = useState<boolean>(false);

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
        
        if (data) {
            const sortedData = [...data].sort((a, b) => {
                // Sort by return_percentage (highest to lowest)
                if (b.return_percentage !== a.return_percentage) {
                    return b.return_percentage - a.return_percentage;
                }
                // If return_percentage is the same, sort by total_equity (highest to lowest)
                return b.total_equity - a.total_equity;
            });
            setLeaderboardData(sortedData);
    
            // Find current user's rank and return (based on sorted data)
            const userEntry = sortedData.find(entry => entry.user_id === user.id);
            if (userEntry) {
                const rank = sortedData.findIndex(entry => entry.user_id === user.id) + 1;
                setCurrentUserRank(rank);
                setCurrentUserReturn(userEntry.return_percentage);
            } else {
                setCurrentUserRank(null);
                setCurrentUserReturn(null);
            }
        } else {
            setLeaderboardData([]);
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

  const handleViewTrades = (traderId: string, traderUsername: string | null, traderLeagueId: string, can_be_copied: boolean) => {
    setSelectedTraderId(traderId);
    setSelectedTraderUsername(traderUsername);
    setSelectedTraderLeagueId(traderLeagueId);
    setSelectedTraderCanBeCopied(can_be_copied);
    setIsTradesModalOpen(true);
  };

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
        <h2 className="text-2xl font-bold text-gray-100">{selectedLeague.toUpperCase()} League Leaderboard</h2>
        <div className="flex items-center gap-4">
          <Select
            value={selectedLeague}
            onValueChange={setSelectedLeague}
          >
            <SelectTrigger className="w-[180px] bg-gray-700 border border-gray-600 text-gray-200 rounded-full shadow-md hover:bg-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              <SelectValue placeholder="Select League" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg shadow-xl">
              {AVAILABLE_LEAGUES.map(league => (
                <SelectItem key={league} value={league} className="hover:bg-gray-700 focus:bg-gray-700 focus:text-emerald-400 data-[state=checked]:bg-emerald-900 data-[state=checked]:text-emerald-300">
                  {league.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={() => fetchLeaderboard(selectedLeague)}
            className="p-2 bg-gray-700 rounded-full text-gray-200 hover:bg-gray-600 transition-colors duration-200 shadow-md"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Current User Stats */}
      {(currentUserRank !== null || currentUserReturn !== null) && (
        <Card className="mb-6 bg-gray-800 border border-gray-700 text-gray-200 shadow-lg relative overflow-hidden transform transition-transform duration-500 ease-out hover:scale-[1.01] animate-fade-in">
          {/* Subtle glowing border effect for current user's card */}
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, #10B98140, #8B5CF640, #F59E0B40)',
              filter: 'blur(20px)',
              zIndex: 0,
              animation: 'pulse-glow 3s infinite alternate',
            }}
          ></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-emerald-400">Your Performance</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              {currentUserRank !== null && (
                <div>
                  <p className="text-sm text-gray-400">Current Rank</p>
                  <p className="text-3xl font-bold text-white drop-shadow">#{currentUserRank}</p>
                </div>
              )}
              {currentUserReturn !== null && (
                <div>
                  <p className="text-sm text-gray-400">Return</p>
                  <p className={`text-3xl font-bold ${currentUserReturn >= 0 ? 'text-emerald-400' : 'text-red-400'} drop-shadow`}>
                    {currentUserReturn.toFixed(2)}%
                  </p>
                </div>
              )}
              {selectedLeague && (
                <div className="col-span-2 text-center mt-4">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-md font-semibold px-4 py-2 rounded-full shadow-lg tracking-wide animate-bounce-subtle">
                    {selectedLeague.toUpperCase()} League
                  </Badge>
                </div>
              )}
            </div>
            {/* Progress to next tier */}
            {currentUserReturn !== null && userProfile?.league && (
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2 text-center">Progress to Next Tier</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 relative overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (currentUserReturn / getNextTierTarget(userProfile.league)) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  {currentUserReturn.toFixed(2)}% / {getNextTierTarget(userProfile.league)}% to {getNextTierName(userProfile.league)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
        <table className="min-w-full text-gray-200">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Rank</th>
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Username</th>
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Equity</th>
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">% Return</th>
              <th className="py-4 px-4 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 text-lg">
                  No results found for {selectedLeague.toUpperCase()} league
                </td>
              </tr>
            ) : (
              leaderboardData.map((entry, index) => {
                const isCurrentUser = user?.id === entry.user_id;

                return (
                  <tr
                    key={entry.user_id}
                    className={`border-b border-gray-700 transition-all duration-200 ${
                      isCurrentUser ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 hover:from-blue-800/70 hover:to-purple-800/70' : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <td className="py-4 px-4 text-lg font-bold text-white">#{index + 1}</td>
                    <td className="py-4 px-4 text-lg text-gray-200 font-medium flex items-center group cursor-pointer">
                        {/* Avatar Placeholder */}
                        <div className="w-8 h-8 bg-gray-600 rounded-full mr-3 flex items-center justify-center text-gray-300 font-bold text-sm border-2 border-gray-500">
                            {entry.username ? entry.username.charAt(0).toUpperCase() : '-'}
                        </div>
                        <HoverCard openDelay={200} closeDelay={100}>
                            <HoverCardTrigger asChild>
                                <span onClick={() => handleViewTrades(entry.user_id, entry.username, entry.league_id, entry.can_be_copied)} className="hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
                                    {entry.username || 'Anonymous'}
                                </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="p-0 border-none bg-transparent shadow-none">
                                <UserHoverCard entry={entry} />
                            </HoverCardContent>
                        </HoverCard>
                    </td>
                    <td className="py-4 px-4 text-lg text-gray-300">
                      ${entry.total_equity?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                    </td>
                    <td className={`py-4 px-4 text-lg font-bold ${
                      entry.return_percentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {entry.return_percentage.toFixed(2)}%
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-800">
                      <button
                        onClick={() => handleViewTrades(entry.user_id, entry.username, entry.league_id, entry.can_be_copied)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Trades</span>
                      </button>
                      {entry.can_be_copied && (
                        <button
                          onClick={() => { /* Implement copy trade action here */ alert(`Copying trades from ${entry.username} (ID: ${entry.user_id})`); }}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ml-2 mt-2 lg:mt-0"
                        >
                          <Copy className="h-4 w-4" />
                          <span>Copy Trades</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {selectedTraderId && (
        <UserTradesModal
          isOpen={isTradesModalOpen}
          onClose={() => setIsTradesModalOpen(false)}
          traderId={selectedTraderId}
          traderUsername={selectedTraderUsername || 'N/A'}
          isCopyAllowed={selectedTraderCanBeCopied}
          viewerLeagueId={user?.user_metadata?.league_id || null}
          traderLeagueId={selectedTraderLeagueId}
        />
      )}
    </div>
  );
};

export default Leaderboard; 