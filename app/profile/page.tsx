"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast'; // Assuming you have a toast notification system

export default function ProfilePage() {
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate the username field when the userProfile is loaded
  useEffect(() => {
    if (userProfile?.username) {
      setUsername(userProfile.username);
    }
  }, [userProfile]);

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !username.trim()) return; // Ensure user exists and username is not empty

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username: username.trim() })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Optionally, trigger a refetch of the user profile if useAuth doesn't do it automatically
      // Depending on your useAuth implementation, you might need a manual refetch here
      // For now, we'll rely on the toast message and assumption that useAuth updates state

      toast({
        title: "Username updated successfully!",
        description: "Your username has been saved.",
        variant: "default",
      });

      // Call refreshProfile to update the user profile state in the authentication context
      refreshProfile();

    } catch (error) {
      console.error("Error updating username:", error);
      setError("Failed to update username. Please try again.");
      toast({
        title: "Error updating username",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading or unauthorized state if needed
  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (!user) {
      // Redirect to login or show unauthorized message if user is not logged in
      // For now, showing a simple message
       return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Authentication Required</h2>
          <p className="text-slate-600">Please log in to view your profile.</p>
           {/* Add a login button if needed */}
        </div>
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
          <CardDescription>Manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameUpdate} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your username"
              />
            </div>
             {/* Display error message if any */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Username"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
