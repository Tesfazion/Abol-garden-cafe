"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function OrderPage() {
  const { lines, subtotal, clear } = useCart();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [address, setAddress] = useState("");

  async function handleCheckout(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestEmail,
          deliveryAddress: address,
          lines: lines.map((l) => ({
            menuItemId: l.item.id,
            quantity: l.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong placing your order.");
        setStatus("error");
        return;
      }

      setStatus("success");
      clear();
    } catch {
      setErrorMessage(
        "Couldn't reach the ordering service. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="font-display text-3xl text-ink">Order placed. ✓</p>
        <p className="mt-3 font-body text-charcoal/60">
          We'll email you a tracking link once it's on its way.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-full bg-ink px-8 py-3 font-mono text-xs uppercase tracking-wide text-wheat transition hover:bg-charcoal"
        >
          Browse the menu again
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="font-display text-2xl text-ink">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink">Checkout</h1>

      <ul className="mt-8 divide-y divide-charcoal/10">
        {lines.map((line) => (
          <li key={line.item.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-body text-sm font-medium text-ink">
                {line.item.name} × {line.quantity}
              </p>
            </div>
            <p className="font-mono text-sm text-ink">
              €{(line.item.price * line.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-charcoal/10 py-4 font-mono text-base">
        <span>Total</span>
        <span>€{subtotal.toFixed(2)}</span>
      </div>

      <form onSubmit={handleCheckout} className="mt-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
              Name
            </label>
            <input
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
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
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-charcoal/60">
            Delivery address
          </label>
          <textarea
            required
            rows={3}
            minLength={5}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-lg border border-charcoal/15 bg-white/40 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-brass"
          />
        </div>

        {status === "error" && (
          <p className="font-body text-sm text-ember">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-ember py-3 font-mono text-xs uppercase tracking-wide text-wheat transition hover:bg-ember/90 disabled:opacity-50"
        >
          {status === "submitting" ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}
