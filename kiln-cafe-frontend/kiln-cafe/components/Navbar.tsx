"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, setOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-wheat/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Kiln
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
              Coffee House
            </span>
          </Link>

          <nav className="hidden items-center gap-8 font-body text-sm text-charcoal/80 md:flex">
            <Link href="/menu" className="hover:text-ink">
              Menu
            </Link>
            <Link href="/booking" className="hover:text-ink">
              Book a table
            </Link>
            <Link href="/menu#order" className="hover:text-ink">
              Delivery
            </Link>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="relative rounded-full border border-ink/15 px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink transition hover:border-brass hover:text-brass"
            aria-label="Open cart"
          >
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-[11px] text-wheat">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
