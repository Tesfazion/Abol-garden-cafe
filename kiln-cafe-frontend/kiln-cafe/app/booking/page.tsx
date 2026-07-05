"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login with return URL
      router.push("/auth/login?redirect=/booking");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-brass border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-heading text-charcoal-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-bean">
        Reserve ahead
      </span>
      <h1 className="mt-2 font-display text-4xl text-forest">Book a garden table</h1>
      <p className="mt-3 max-w-lg font-body text-forest/70">
        Reserve shaded outdoor seating at Abole Garden Café. Tables are held for
        15 minutes past booking time. For parties over 12, call us at +251 97
        019 3549.
      </p>

      <div className="mt-10 rounded-2xl border border-forest/10 bg-cream p-8">
        <BookingForm />
      </div>
    </div>
  );
}
