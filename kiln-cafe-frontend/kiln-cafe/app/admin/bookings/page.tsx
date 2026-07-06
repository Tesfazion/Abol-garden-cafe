"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionCard } from "@/components/admin/SectionCard";
import { reservationsSeed } from "@/lib/admin-data";

export default function AdminBookingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "confirmed" | "declined">("all");

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user && user.role !== "ADMIN" && user.role !== "STAFF"))) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50"><p>Loading...</p></div>;
  }

  const visibleReservations = reservationsSeed.filter((reservation) => selectedFilter === "all" || reservation.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Reservation management" description="Approve bookings, manage seating flow, and keep the café schedule balanced." actions={<button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-forest">Sync calendar</button>} />

      <div className="space-y-6 p-6">
        <SectionCard title="Daily reservations" description="A lightweight calendar-ready view for the current service window.">
          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "pending", "confirmed", "declined"] as const).map((filter) => (
              <button key={filter} onClick={() => setSelectedFilter(filter)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${selectedFilter === filter ? "bg-brass text-white" : "bg-gray-100 text-charcoal"}`}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleReservations.map((reservation) => (
              <div key={reservation.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-lg font-semibold text-forest">{reservation.guestName}</p>
                  <span className={`rounded-full px-3 py-1 text-sm ${reservation.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : reservation.status === "declined" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{reservation.status}</span>
                </div>
                <p className="mt-2 text-sm text-charcoal-light">Party of {reservation.partySize} • {reservation.slot}</p>
                <p className="mt-3 text-sm text-charcoal-light">{reservation.notes ?? "No extra notes"}</p>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-lg bg-forest px-3 py-2 text-sm font-semibold text-white">Approve</button>
                  <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-charcoal">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
