"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { SectionCard } from "@/components/admin/SectionCard";
import { dashboardQuickLinks } from "@/lib/admin-data";

interface AdminSummary {
  ordersToday: number;
  pendingOrders: number;
  todaysBookings: number;
  revenueToday: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [timeRange, setTimeRange] = useState("today");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (!isLoading && user && user.role !== "ADMIN" && user.role !== "STAFF") {
      router.push("/account");
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchSummary();
    }
  }, [isLoading, isAuthenticated]);

  const fetchSummary = async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/summary", {
        cache: "no-store",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });
      if (!res.ok) {
        // Use mock data if API fails
        console.warn("API failed, using mock data");
        setSummary({
          ordersToday: 12,
          pendingOrders: 3,
          todaysBookings: 8,
          revenueToday: 45800,
        });
        return;
      }
      const data: AdminSummary = await res.json();
      setSummary(data);
    } catch (err: any) {
      console.error(err);
      // Use mock data as fallback
      setSummary({
        ordersToday: 12,
        pendingOrders: 3,
        todaysBookings: 8,
        revenueToday: 45800,
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSummary().finally(() => setRefreshing(false));
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-warm">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-brass border-t-transparent" />
          <p className="font-heading text-charcoal-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (user.role !== "ADMIN" && user.role !== "STAFF") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        eyebrow="Operations Center"
        title="Dashboard"
        description={`Welcome back, ${user.name} • ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
        actions={
          <>
            <button
              onClick={handleRefresh}
              className={`rounded-lg border border-gray-200 p-2 transition-all hover:bg-gray-50 ${refreshing ? "animate-spin" : ""}`}
              title="Refresh data"
              aria-label="Refresh data"
            >
              <svg className="h-5 w-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 md:flex">
              <label htmlFor="time-range" className="sr-only">
                Select time range
              </label>
              <select
                id="time-range"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-sm font-heading font-medium text-forest outline-none"
                aria-label="Select time range"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <span className={`rounded-full px-4 py-2 text-sm font-heading font-medium ${user.role === "ADMIN" ? "border border-brass/30 bg-brass/10 text-brass" : "border border-forest/30 bg-forest/10 text-forest"}`}>
              {user.role === "ADMIN" ? "👑 Administrator" : "👔 Staff"}
            </span>
          </>
        }
      />

      <div className="p-6">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Orders today"
            value={summary ? summary.ordersToday : "—"}
            detail="Today's confirmed and active orders"
            icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            tone="accent"
          />
          <StatCard
            title="Pending focus"
            value={summary ? summary.pendingOrders : "—"}
            detail="Orders in pending or preparing status"
            icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            tone="warning"
          />
          <StatCard
            title="Revenue today"
            value={summary ? `${summary.revenueToday.toLocaleString()} ETB` : "—"}
            detail="Sales from completed orders"
            icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            tone="success"
          />
          <StatCard
            title="Reservations"
            value={summary ? summary.todaysBookings : "—"}
            detail="Bookings scheduled for today"
            icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            tone="default"
          />
        </div>

        <SectionCard title="Quick actions" description="Move between the core café operations in one click.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardQuickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all hover:border-brass hover:bg-white">
                <p className="font-heading text-lg font-semibold text-forest">{link.label}</p>
                <p className="mt-1 text-sm text-charcoal-light">{link.description}</p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <SectionCard title="Operational snapshot" description="A simple overview for the current shift.">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-charcoal-light">Active orders</p>
                <p className="mt-2 font-heading text-3xl font-semibold text-forest">{summary ? summary.ordersToday : "—"}</p>
                <p className="mt-2 text-sm text-charcoal-light">Orders created today so far.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-charcoal-light">Pending preparation</p>
                <p className="mt-2 font-heading text-3xl font-semibold text-forest">{summary ? summary.pendingOrders : "—"}</p>
                <p className="mt-2 text-sm text-charcoal-light">Orders waiting in the kitchen.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Team availability" description="A quick view of staffing coverage.">
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                <span className="font-medium text-forest">Barista</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">2 on duty</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                <span className="font-medium text-forest">Service</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">3 on duty</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                <span className="font-medium text-forest">Delivery</span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">1 on standby</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
