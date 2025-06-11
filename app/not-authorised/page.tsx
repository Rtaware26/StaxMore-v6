"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function NotAuthorisedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Not Authorised</h2>
        <p className="text-gray-600">You do not have access to this page with your current league membership.</p>
        {/* Optional: Add a link to upgrade or view other leagues if applicable */}
        <Link href="/competitions" passHref>
          <Button className="w-full btn-primary">View Leagues</Button>
        </Link>
      </div>
    </div>
  );
} 