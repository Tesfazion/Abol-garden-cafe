"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function MenuCard({ item }: { item: MenuItem }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isAuthenticated, isLoading } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/auth/login?redirect=/menu");
      return;
    }
    addItem(item);
  };

  return (
    <article className="card hover-lift group">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-warm">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Hot/Featured Badge */}
        {item.hot && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-terracotta text-white text-xs font-heading font-medium shadow-md">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              Hot Now
            </span>
          </div>
        )}

        {/* Price Badge - Bottom Right */}
        <div className="absolute right-3 bottom-3">
          <span className="price price-large px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
            {item.price.toFixed(0)} <span className="text-sm">ETB</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Category/Origin */}
        {item.origin && (
          <span className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-sage mb-2 uppercase tracking-wide">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {item.origin}
          </span>
        )}

        {/* Title */}
        <h3 className="font-display text-xl font-semibold leading-tight text-forest mb-3 group-hover:text-brass transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-charcoal-light leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {/* Tasting Notes / Features */}
        {item.tastingNotes && item.tastingNotes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tastingNotes.map((note) => (
              <span 
                key={note} 
                className="category-tag text-xs px-3 py-1"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full group/btn"
          aria-label={`Add ${item.name} to cart`}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {isAuthenticated ? "Add to Order" : "Login to Order"}
        </button>
      </div>
    </article>
  );
}
