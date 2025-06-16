"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/components/auth-provider";
import { TradingService, type Portfolio, type Trade } from "@/lib/trading-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyAbbreviated } from "@/lib/utils";
import {
  BarChart2,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const ProgressTrackerPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const fetchedPortfolio = await TradingService.getDemoPortfolio(user.id);
        const fetchedTrades = await TradingService.getDemoTrades(user.id);
        setPortfolio(fetchedPortfolio);
        setTrades(fetchedTrades);
      } catch (err) {
        console.error("Error fetching demo trading data:", err);
        setError("Failed to load demo trading data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  // Calculate statistics
  const totalClosedTrades = trades.filter(trade => trade.is_closed);
  const winningTrades = totalClosedTrades.filter(trade => (trade.realized_pnl || 0) > 0);
  const losingTrades = totalClosedTrades.filter(trade => (trade.realized_pnl || 0) <= 0);
  const winRate = totalClosedTrades.length > 0
    ? (winningTrades.length / totalClosedTrades.length) * 100
    : 0;
  const totalPnL = portfolio?.realized_pnl || 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <div className="p-8 bg-card rounded-lg shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Loading Progress Tracker...</h2>
          <p className="text-muted-foreground">Please wait while we fetch your demo trading data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <div className="p-8 bg-card rounded-lg shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <div className="p-8 bg-card rounded-lg shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to view your progress tracker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="container mx-auto max-w-7xl py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Feedback & Progress Tracker</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Monitor your demo trading performance and gain insights for improvement.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PnL (Closed Trades)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                {formatCurrencyAbbreviated(totalPnL)}
              </div>
              <p className="text-xs text-muted-foreground">Aggregated profit/loss from all closed demo trades.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">Percentage of winning demo trades.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Demo Trades</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClosedTrades.length}</div>
              <p className="text-xs text-muted-foreground">Total number of closed demo trades.</p>
            </CardContent>
          </Card>
        </div>

        {/* Trade History and Feedback */}
        <Card className="bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle>Demo Trade History & Insights</CardTitle>
            <CardDescription>Review your past demo trades, confidence, and reasons.</CardDescription>
          </CardHeader>
          <CardContent>
            {totalClosedTrades.length === 0 ? (
              <p className="text-muted-foreground text-center">No closed demo trades to display yet. Start trading in the <a href="/gym/demo-trading" className="text-primary hover:underline">Demo Trading</a> section!</p>
            ) : (
              <div className="space-y-4">
                {totalClosedTrades.map((trade) => (
                  <Card key={trade.id} className="bg-background border border-border shadow-sm p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{trade.symbol} - {trade.position_type.toUpperCase()}</h3>
                      <Badge variant={trade.realized_pnl && trade.realized_pnl >= 0 ? "default" : "destructive"}>
                        {formatCurrencyAbbreviated(trade.realized_pnl || 0)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <p>Entry Price: <span className="font-medium text-foreground">{trade.entry_price.toFixed(5)}</span></p>
                      <p>Exit Price: <span className="font-medium text-foreground">{trade.exit_price?.toFixed(5) || 'N/A'}</span></p>
                      <p>Quantity: <span className="font-medium text-foreground">{trade.quantity}</span></p>
                      <p>Leverage: <span className="font-medium text-foreground">{trade.leverage}x</span></p>
                      <p>Confidence: <span className="font-medium text-foreground">{trade.confidence_level || 'N/A'}/10</span></p>
                      <p className="col-span-full">Reason: <span className="font-medium text-foreground">{trade.trade_reason || 'N/A'}</span></p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Opened: {new Date(trade.created_at).toLocaleString()} | Closed: {new Date(trade.closed_at || '').toLocaleString()}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTrackerPage; 