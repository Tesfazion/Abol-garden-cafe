"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionCard } from "@/components/admin/SectionCard";
import { reportHighlights } from "@/lib/admin-data";

export default function AdminReportsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user && user.role !== "ADMIN" && user.role !== "STAFF"))) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Reports & analytics" description="Track sales, best-sellers, and business performance for the café." actions={<button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-forest">Export CSV</button>} />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {reportHighlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-charcoal-light">{item.label}</p>
              <p className="mt-2 font-heading text-2xl font-semibold text-forest">{item.value}</p>
            </div>
          ))}
        </div>

        <SectionCard title="Performance overview" description="The analytics workspace for the café admin team.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-heading text-lg font-semibold text-forest">Sales trend</p>
              <p className="mt-3 text-sm text-charcoal-light">Daily sales are trending upward with stronger weekend traffic and solid coffee demand.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-heading text-lg font-semibold text-forest">Top categories</p>
              <p className="mt-3 text-sm text-charcoal-light">Coffee, breakfast plates, and desserts remain the strongest performing groups this week.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
