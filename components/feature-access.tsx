"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface FeatureAccessProps {
  feature: 'chat' | 'demo-trading' | 'live-trading' | 'competitions';
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureAccess({ feature, children, fallback }: FeatureAccessProps) {
  const { canAccessFeature, loading, isGuest } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <div className="p-8 bg-card rounded-lg shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we check your access.</p>
        </div>
      </div>
    );
  }

  if (!canAccessFeature(feature)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGuest ? (
              <>
                <p className="text-muted-foreground">Please sign in to access this feature.</p>
                <Button onClick={() => router.push('/login')}>Sign In</Button>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  {feature === 'chat' || feature === 'live-trading'
                    ? "You need to join a competition to access this feature."
                    : "You don't have access to this feature."}
                </p>
                <Button onClick={() => router.push('/competitions')}>Join a Competition</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
} 