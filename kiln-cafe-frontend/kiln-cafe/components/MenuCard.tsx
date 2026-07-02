"use client";

import Image from "next/image";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-wheat transition hover:border-brass/50">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {item.hot && (
          <span className="absolute left-3 top-3 rounded-full bg-ember px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-wheat">
            Hot now
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-ink">
            {item.name}
          </h3>
          <span className="whitespace-nowrap font-mono text-sm text-brass">
            €{item.price.toFixed(2)}
          </span>
        </div>

        {item.origin && (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-charcoal/40">
            {item.origin}
          </p>
        )}

        <p className="mt-2 font-body text-sm text-charcoal/70">
          {item.description}
        </p>

        {item.tastingNotes && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tastingNotes.map((note) => (
              <span key={note} className="tasting-tag">
                {note}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => addItem(item)}
          className="mt-4 w-full rounded-full border border-ink/15 py-2 font-mono text-xs uppercase tracking-wide text-ink transition hover:border-ink hover:bg-ink hover:text-wheat"
        >
          Add to order
        </button>
      </div>
    </article>
  );
}
