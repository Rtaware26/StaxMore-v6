"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function MembershipRequiredPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Membership Required</h2>
        <p className="text-gray-600">You need an active league membership to access this page.</p>
        <Link href="/competitions" passHref>
          <Button className="w-full btn-primary">Explore Leagues</Button>
        </Link>
      </div>
    </div>
  );
} 