"use client";

import { useState, FormEvent } from "react";
import { BookingRequest } from "@/lib/types";

const initialState: BookingRequest = {
  name: "",
  email: "",
  phone: "",
  partySize: 2,
  date: "",
  time: "",
  notes: "",
};

export default function BookingForm() {
  const [form, setForm] = useState<BookingRequest>(initialState);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof BookingRequest>(
    key: K,
    value: BookingRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Booking failed. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(initialState);
    } catch {
      setErrorMessage(
        "Couldn't reach the booking service. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brass/40 bg-wheat p-8 text-center">
        <p className="font-display text-2xl text-ink">Table booked. ✓</p>
        <p className="mt-2 font-body text-sm text-charcoal/60">
          A confirmation is on its way to your email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-mono text-xs uppercase tracking-wide text-brass hover:underline"
        >
          Book another table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-1">
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Name
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Email
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Phone
        </label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Party size
        </label>
        <input
          required
          type="number"
          min={1}
          max={12}
          value={form.partySize}
          onChange={(e) => update("partySize", Number(e.target.value))}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Date
        </label>
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Time
        </label>
        <input
          required
          type="time"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
          Notes (optional)
        </label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Allergies, high chair, occasion..."
          className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
        />
      </div>

      {status === "error" && (
        <p className="md:col-span-2 font-body text-sm text-ember">
          {errorMessage}
        </p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-wide text-wheat transition hover:bg-charcoal disabled:opacity-50 md:w-auto md:px-10"
        >
          {status === "submitting" ? "Booking..." : "Confirm booking"}
        </button>
      </div>
    </form>
  );
}
