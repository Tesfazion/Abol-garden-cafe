"use client";

import { useState, useMemo } from "react";
import MenuCard from "./MenuCard";
import { MenuItem, MenuCategory } from "@/lib/types";

const categories: { id: MenuCategory | "all"; label: string; icon: string; description: string }[] = [
  { 
    id: "all", 
    label: "All Items", 
    icon: "🍽️",
    description: "Browse everything" 
  },
  { 
    id: "coffee", 
    label: "Coffee & Tea", 
    icon: "☕",
    description: "Ethiopian coffee, macchiato, tea" 
  },
  { 
    id: "plates", 
    label: "Main Dishes", 
    icon: "🍛",
    description: "Ethiopian & international plates" 
  },
  { 
    id: "bakes", 
    label: "Bakes & Desserts", 
    icon: "🍰",
    description: "Fresh pastries, cakes, breads" 
  },
  { 
    id: "drinks", 
    label: "Beverages", 
    icon: "🥤",
    description: "Fresh juices, soft drinks" 
  },
];

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<MenuCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search logic
  const visible = useMemo(() => {
    let filtered = active === "all" ? items : items.filter((item) => item.category === active);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.origin?.toLowerCase().includes(query) ||
        item.tastingNotes?.some(note => note.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [items, active, searchQuery]);

  const activeCategory = categories.find(cat => cat.id === active);

  return (
    <>
      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search menu items, ingredients, or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-forest/20 focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all text-charcoal font-body"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-semibold text-forest">
            {activeCategory?.label || "All Items"}
          </h2>
          <span className="text-sm font-body text-charcoal-light">
            {visible.length} {visible.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Desktop Category Cards */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`group relative p-4 rounded-xl border-2 transition-all text-left ${
                active === cat.id
                  ? "border-brass bg-brass/5 shadow-md"
                  : "border-forest/10 hover:border-brass/50 hover:bg-brass/5"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{cat.icon}</span>
                {active === cat.id && (
                  <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h3 className={`font-heading font-semibold text-sm mb-1 ${
                active === cat.id ? "text-brass" : "text-forest group-hover:text-brass"
              }`}>
                {cat.label}
              </h3>
              <p className="text-xs text-charcoal-light">
                {cat.description}
              </p>
            </button>
          ))}
        </div>

        {/* Mobile Category Pills */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-heading text-sm font-medium transition-all ${
                active === cat.id
                  ? "bg-brass text-white shadow-md"
                  : "bg-white border-2 border-forest/10 text-forest hover:border-brass"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      {visible.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest/5 mb-6">
            <svg className="w-10 h-10 text-forest/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-forest mb-2">
            No items found
          </h3>
          <p className="font-body text-charcoal-light mb-6">
            {searchQuery ? (
              <>
                No results for "<span className="font-medium">{searchQuery}</span>".
                <br />Try a different search term.
              </>
            ) : (
              "Nothing in this category right now — check back soon!"
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="btn btn-outline"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* View Cart Sticky Button (Mobile) */}
      {visible.length > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <button
            onClick={() => {
              // This will be handled by the cart context
              document.dispatchEvent(new CustomEvent('openCart'));
            }}
            className="btn btn-primary shadow-elevated"
            aria-label="View cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View Cart
          </button>
        </div>
      )}
    </>
  );
}
