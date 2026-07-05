"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

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

  return (
    <div className="min-h-screen bg-gradient-warm py-12">
      <div className="container-custom max-w-4xl">
        
        {/* Header */}
        <div className="card p-8 mb-8 bg-gradient-garden text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-cream/80">
                Manage your orders, bookings, and account settings
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 rounded-full bg-brass/20 border-4 border-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-brass">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Order Online */}
          <Link href="/menu" className="card p-6 hover-lift group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brass/10 flex items-center justify-center group-hover:bg-brass/20 transition-colors">
                <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-forest mb-1 group-hover:text-brass transition-colors">
                  Order Food
                </h3>
                <p className="text-sm text-charcoal-light">
                  Browse menu and place an order
                </p>
              </div>
              <svg className="w-5 h-5 text-charcoal-light group-hover:text-brass transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Reserve Table */}
          <Link href="/booking" className="card p-6 hover-lift group">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-forest mb-1 group-hover:text-sage transition-colors">
                  Reserve Table
                </h3>
                <p className="text-sm text-charcoal-light">
                  Book a table in our garden
                </p>
              </div>
              <svg className="w-5 h-5 text-charcoal-light group-hover:text-sage transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Account Information */}
        <div className="card p-8 mb-8">
          <h2 className="font-heading text-xl font-semibold text-forest mb-6">
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between py-3 border-b border-forest/10">
              <div>
                <p className="text-sm font-heading font-medium text-charcoal-light mb-1">
                  Full Name
                </p>
                <p className="font-body text-forest">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start justify-between py-3 border-b border-forest/10">
              <div>
                <p className="text-sm font-heading font-medium text-charcoal-light mb-1">
                  Email Address
                </p>
                <p className="font-body text-forest">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-start justify-between py-3 border-b border-forest/10">
                <div>
                  <p className="text-sm font-heading font-medium text-charcoal-light mb-1">
                    Phone Number
                  </p>
                  <p className="font-body text-forest">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between py-3">
              <div>
                <p className="text-sm font-heading font-medium text-charcoal-light mb-1">
                  Account Type
                </p>
                <p className="font-body text-forest">
                  {user.role === "ADMIN" ? "Administrator" : 
                   user.role === "STAFF" ? "Staff Member" : 
                   "Customer"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/menu" className="card p-6 text-center hover-lift group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/5 mb-4 group-hover:bg-forest/10 transition-colors">
              <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-forest mb-1">
              Browse Menu
            </h3>
            <p className="text-sm text-charcoal-light">
              View our full menu
            </p>
          </Link>

          <Link href="/contact" className="card p-6 text-center hover-lift group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/5 mb-4 group-hover:bg-forest/10 transition-colors">
              <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-forest mb-1">
              Contact Us
            </h3>
            <p className="text-sm text-charcoal-light">
              Get in touch
            </p>
          </Link>

          <Link href="/gallery" className="card p-6 text-center hover-lift group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/5 mb-4 group-hover:bg-forest/10 transition-colors">
              <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-forest mb-1">
              View Gallery
            </h3>
            <p className="text-sm text-charcoal-light">
              See our photos
            </p>
          </Link>
        </div>

        {/* Sign Out */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-forest mb-1">
                Need to Sign Out?
              </h3>
              <p className="text-sm text-charcoal-light">
                You'll need to sign in again to access your account
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  logout();
                  router.push("/");
                }
              }}
              className="btn btn-outline text-error border-error hover:bg-error hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
