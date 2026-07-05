"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [timeRange, setTimeRange] = useState("today");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
    if (!isLoading && user && user.role !== "ADMIN" && user.role !== "STAFF") {
      router.push("/account");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-brass border-t-transparent rounded-full animate-spin mb-4" />
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
      {/* Header with Enhanced Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-6 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-heading text-4xl font-bold text-forest mb-1">
              Dashboard
            </h1>
            <p className="text-charcoal-light">
              Welcome back, {user.name} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all ${refreshing ? 'animate-spin' : ''}`}
              title="Refresh data"
            >
              <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-sm font-heading font-medium text-forest outline-none"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-heading font-medium ${
              user.role === "ADMIN" 
                ? "bg-brass/10 text-brass border border-brass/30" 
                : "bg-forest/10 text-forest border border-forest/30"
            }`}>
              {user.role === "ADMIN" ? "👑 Administrator" : "👔 Staff"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        
        {/* KPI Cards - Enhanced */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          
          {/* Today's Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xs font-heading font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                ↑ 12%
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-1">
              24
            </h3>
            <p className="text-xs text-charcoal-light">Total Orders</p>
            <p className="text-xs text-brass mt-2">vs 21 yesterday</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-heading font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
                Action needed
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-1">
              5
            </h3>
            <p className="text-xs text-charcoal-light">Need Attention</p>
            <Link href="/admin/orders" className="text-xs text-warning hover:text-warning-dark mt-2 inline-block font-medium">
              View now →
            </Link>
          </div>

          {/* Today's Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-heading font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                ↑ 8%
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-1">
              6,450 ETB
            </h3>
            <p className="text-xs text-charcoal-light">Revenue</p>
            <p className="text-xs text-success mt-2">+520 from yesterday</p>
          </div>

          {/* Reservations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-1">
              12
            </h3>
            <p className="text-xs text-charcoal-light">Reservations</p>
            <p className="text-xs text-sage mt-2">Capacity: 87%</p>
          </div>

          {/* Active Staff */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="w-2 h-2 rounded-full bg-success"></div>
            </div>
            <h3 className="font-heading text-2xl font-bold text-forest mb-1">
              8
            </h3>
            <p className="text-xs text-charcoal-light">Staff On Duty</p>
            <Link href="/admin/staff" className="text-xs text-terracotta hover:text-terracotta-dark mt-2 inline-block font-medium">
              Manage →
            </Link>
          </div>
        </div>

        {/* Admin Quick Actions - Enhanced */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-semibold text-forest mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Admin Controls
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Manage Orders */}
            <Link href="/admin/orders" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-brass transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brass/10 flex items-center justify-center mb-4 group-hover:bg-brass/20 transition-colors">
                  <svg className="w-7 h-7 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-forest text-sm mb-1 group-hover:text-brass transition-colors">
                  Orders
                </h3>
                <p className="text-xs text-charcoal-light">
                  Process & track
                </p>
              </div>
            </Link>

            {/* Manage Bookings */}
            <Link href="/admin/bookings" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-sage transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                  <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-forest text-sm mb-1 group-hover:text-sage transition-colors">
                  Reservations
                </h3>
                <p className="text-xs text-charcoal-light">
                  View & manage
                </p>
              </div>
            </Link>

            {/* Manage Menu */}
            <Link href="/admin/menu" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-terracotta transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
                  <svg className="w-7 h-7 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-forest text-sm mb-1 group-hover:text-terracotta transition-colors">
                  Menu
                </h3>
                <p className="text-xs text-charcoal-light">
                  Edit items & prices
                </p>
              </div>
            </Link>

            {/* View Analytics */}
            <Link href="/admin/reports" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-brass transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brass/10 flex items-center justify-center mb-4 group-hover:bg-brass/20 transition-colors">
                  <svg className="w-7 h-7 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-forest text-sm mb-1 group-hover:text-brass transition-colors">
                  Analytics
                </h3>
                <p className="text-xs text-charcoal-light">
                  Reports & trends
                </p>
              </div>
            </Link>

            {/* Staff Management */}
            <Link href="/admin/staff" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-sage transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                  <svg className="w-7 h-7 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-forest text-sm mb-1 group-hover:text-sage transition-colors">
                  Staff
                </h3>
                <p className="text-xs text-charcoal-light">
                  Team & roles
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Charts & Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Sales Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-semibold text-forest">
                Sales Trend
              </h3>
              <select className="text-xs font-heading text-forest bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none">
                <option>7 days</option>
                <option>30 days</option>
                <option>90 days</option>
              </select>
            </div>
            <div className="h-48 flex items-end justify-around gap-2">
              {[45, 52, 48, 65, 72, 58, 78].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-brass/20 rounded-t-lg" style={{ height: `${height * 1.5}px` }}></div>
                  <span className="text-xs text-charcoal-light">Day {i + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-charcoal-light mt-4">Average: 61 orders/day • Peak: 78 orders</p>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-heading text-lg font-semibold text-forest mb-4">
              Top 5 Products
            </h3>
            <div className="space-y-3">
              {[
                { name: "Kitfo", sales: 156, color: "brass" },
                { name: "Tibs", sales: 142, color: "sage" },
                { name: "Cappuccino", sales: 128, color: "terracotta" },
                { name: "Pizza", sales: 115, color: "warning" },
                { name: "Injera", sales: 104, color: "success" },
              ].map((product, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-heading font-medium text-forest">{product.name}</span>
                    <span className="text-xs font-mono text-brass">{product.sales}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${product.color}`}
                      style={{ width: `${(product.sales / 156) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-semibold text-forest">
                Recent Orders
              </h3>
              <Link href="/admin/orders" className="text-sm font-heading font-medium text-brass hover:text-brass-dark transition-colors">
                All Orders →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { id: "#1234", customer: "John Doe", total: "680 ETB", status: "pending", time: "5 min" },
                { id: "#1233", customer: "Jane Smith", total: "480 ETB", status: "confirmed", time: "12 min" },
                { id: "#1232", customer: "Ahmed Ali", total: "1340 ETB", status: "ready", time: "25 min" },
                { id: "#1231", customer: "Sara Lee", total: "750 ETB", status: "delivered", time: "1 hour" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-forest/10 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-medium text-forest text-sm">{order.id}</p>
                      <p className="text-xs text-charcoal-light">{order.customer} • {order.time} ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold text-brass text-sm">{order.total}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "pending" ? "bg-warning/10 text-warning" :
                      order.status === "confirmed" ? "bg-info/10 text-info" :
                      order.status === "ready" ? "bg-sage/10 text-sage" :
                      "bg-success/10 text-success"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-semibold text-forest">
                Today's Bookings
              </h3>
              <Link href="/admin/bookings" className="text-sm font-heading font-medium text-brass hover:text-brass-dark transition-colors">
                All Bookings →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", time: "12:00 PM", party: 4, status: "confirmed", contact: "+251-9XXXX" },
                { name: "Michael Brown", time: "1:30 PM", party: 2, status: "confirmed", contact: "+251-9XXXX" },
                { name: "Emma Davis", time: "7:00 PM", party: 6, status: "pending", contact: "+251-9XXXX" },
                { name: "David Wilson", time: "8:30 PM", party: 3, status: "confirmed", contact: "+251-9XXXX" },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-forest/10 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-medium text-forest text-sm">{booking.name}</p>
                      <p className="text-xs text-charcoal-light">{booking.time} • Party of {booking.party}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
