"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";
import { Loader2, RefreshCcw } from "lucide-react";

const GymPage = () => {
  const { isGuest, user, loading: authLoading } = useAuth();
  const [resetting, setResetting] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading gym access...</p>
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8 text-foreground">
        <div className="max-w-md w-full space-y-6 text-center bg-card p-8 rounded-xl shadow-2xl border border-border">
          <h2 className="text-2xl font-bold text-primary">Stonks Gym Access Restricted</h2>
          <p className="text-muted-foreground">You need to be logged in to access the Stonks Gym and practice your trading skills.</p>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300">
              Sign Up for Free Access
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleResetCapital = async () => {
    if (!user) return;

    setResetting(true);
    try {
      const { error } = await supabase.rpc('reset_demo_capital');

      if (error) {
        console.error("Error resetting capital:", error);
        toast({
          title: "Error",
          description: "Failed to reset capital. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Demo capital reset successfully!",
        });
      }
    } catch (err) {
      console.error("Unexpected error during capital reset:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 p-6 bg-card border border-border rounded-xl shadow-lg flex items-start space-x-4">
          <span className="text-primary text-2xl">💡</span>
          <div>
            <h2 className="text-xl font-bold mb-1">Pro Tip: Navigate with Ease</h2>
            <p className="text-muted-foreground">
              You can quickly access Stonks Gym from the user menu in the top navigation for seamless access to your training modules.
            </p>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold mb-8 text-center leading-tight tracking-tighter">
          Welcome to the <span className="text-primary">Stonks Gym</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Here you can hone your investment skills and become a true master of the market through interactive modules and exercises.
        </p>

        <div className="flex justify-center mb-10">
          <Button 
            onClick={handleResetCapital}
            disabled={resetting}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
          >
            {resetting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCcw className="mr-2 h-5 w-5" />}
            {resetting ? "Resetting Capital..." : "Reset Demo Capital"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Economics Calendar */}
          <Link href="/gym/economics-calendar" className="bg-card rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer block">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              <span className="text-primary mr-2">📅</span> Economics Calendar
            </h2>
            <p className="text-muted-foreground mb-4">
              Stay ahead of market-moving events. Our comprehensive economics calendar provides real-time updates on key economic indicators and announcements.
            </p>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300">
              View Calendar
            </button>
          </Link>

          {/* Demo Trading Section */}
          <Link href="/gym/demo-trading" className="bg-card rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer block">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              <span className="text-primary mr-2">🎮</span> Demo Trading
            </h2>
            <p className="text-muted-foreground mb-4">Practice your trading strategies risk-free with virtual capital. This section is completely separate from live trading and won't affect your real portfolio.</p>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300">
              Start Demo Trading
            </button>
          </Link>

          {/* Feedback & Progress Tracker */}
          <Link href="/gym/progress-tracker" className="bg-card rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer block">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              <span className="text-primary mr-2">📊</span> Feedback & Progress Tracker
            </h2>
            <p className="text-muted-foreground mb-4">Monitor your trading performance based on confidence scores, comments, and risk scores from your past trades. Get personalized insights to improve.</p>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300">
              View Progress
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GymPage;
