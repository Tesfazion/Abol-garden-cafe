"use client";

import { useState } from "react";
import MenuCard from "./MenuCard";
import { MenuItem, MenuCategory } from "@/lib/types";

const categories: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "bakes", label: "Bakes" },
  { id: "plates", label: "Plates" },
];

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const visible =
    active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
              active === cat.id
                ? "border-ink bg-ink text-wheat"
                : "border-charcoal/20 text-charcoal/60 hover:border-brass hover:text-brass"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center font-body text-sm text-charcoal/50">
          Nothing in this category right now — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
