"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { lines, isOpen, setOpen, updateQuantity, subtotal } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-wheat shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Order cart"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
            <h2 className="font-display text-xl text-ink">Your order</h2>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-wide text-charcoal/60 hover:text-ember"
              aria-label="Close cart"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {lines.length === 0 ? (
              <p className="mt-8 text-center font-body text-sm text-charcoal/50">
                Nothing here yet. Add something from the menu.
              </p>
            ) : (
              <ul className="space-y-5">
                {lines.map((line) => (
                  <li key={line.item.id} className="flex gap-3">
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium text-ink">
                        {line.item.name}
                      </p>
                      <p className="font-mono text-xs text-charcoal/50">
                        €{line.item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(line.item.id, line.quantity - 1)
                          }
                          className="h-6 w-6 rounded-full border border-charcoal/20 font-mono text-xs hover:border-ember hover:text-ember"
                          aria-label={`Decrease ${line.item.name} quantity`}
                        >
                          −
                        </button>
                        <span className="w-4 text-center font-mono text-xs">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(line.item.id, line.quantity + 1)
                          }
                          className="h-6 w-6 rounded-full border border-charcoal/20 font-mono text-xs hover:border-brass hover:text-brass"
                          aria-label={`Increase ${line.item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-ink">
                      €{(line.item.price * line.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-charcoal/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between font-mono text-sm">
              <span className="text-charcoal/60">Subtotal</span>
              <span className="text-ink">€{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className={`block w-full rounded-full py-3 text-center font-mono text-xs uppercase tracking-wide transition ${
                lines.length === 0
                  ? "pointer-events-none bg-charcoal/10 text-charcoal/30"
                  : "bg-ember text-wheat hover:bg-ember/90"
              }`}
            >
              Go to checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
