"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AdminReportsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user && user.role !== "ADMIN" && user.role !== "STAFF"))) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user) return <div className="min-h-screen bg-gradient-warm flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-warm py-12">
      <div className="container-custom max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-forest mb-2">Reports & Analytics</h1>
            <p className="text-charcoal-light">View business insights and statistics</p>
          </div>
          <Link href="/admin" className="btn btn-outline">← Back to Dashboard</Link>
        </div>

        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="font-heading text-2xl font-semibold text-forest mb-2">Reports & Analytics</h2>
          <p className="text-charcoal-light mb-6">Connect to backend API to view analytics</p>
          <p className="text-sm text-charcoal-light">API Endpoint: <code className="bg-forest/5 px-2 py-1 rounded">GET /api/admin/summary</code></p>
        </div>
      </div>
    </div>
  );
}
