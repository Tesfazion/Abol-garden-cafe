"use client";

import { useState } from "react";
import Image from "next/image";

// Gallery categories
type GalleryCategory = "all" | "food" | "garden" | "ambiance" | "events";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
}

// Sample gallery images (replace with actual images)
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
    alt: "Traditional Ethiopian platter",
    category: "food",
    title: "Ethiopian Feast"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070",
    alt: "Garden seating area",
    category: "garden",
    title: "Garden Dining"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074",
    alt: "Café interior",
    category: "ambiance",
    title: "Cozy Interior"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=2069",
    alt: "Coffee preparation",
    category: "food",
    title: "Coffee Art"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070",
    alt: "Outdoor seating",
    category: "garden",
    title: "Al Fresco Dining"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070",
    alt: "Pizza",
    category: "food",
    title: "Wood-Fired Pizza"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2069",
    alt: "Ethiopian coffee ceremony",
    category: "events",
    title: "Coffee Ceremony"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070",
    alt: "Fresh juice",
    category: "food",
    title: "Fresh Juices"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047",
    alt: "Outdoor ambiance",
    category: "ambiance",
    title: "Evening Atmosphere"
  },
];

const categories = [
  { id: "all" as GalleryCategory, label: "All Photos", icon: "🖼️" },
  { id: "food" as GalleryCategory, label: "Food", icon: "🍽️" },
  { id: "garden" as GalleryCategory, label: "Garden", icon: "🌳" },
  { id: "ambiance" as GalleryCategory, label: "Ambiance", icon: "✨" },
  { id: "events" as GalleryCategory, label: "Events", icon: "🎉" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-garden text-white">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-sm font-heading font-medium mb-6">
            Photo Gallery
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            A Picture is Worth
            <span className="block text-brass mt-2">A Thousand Tastes</span>
          </h1>
          <p className="font-body text-xl text-cream/90 max-w-3xl mx-auto">
            Explore our collection of moments — from delicious dishes to happy guests 
            enjoying the Abole Garden Café experience.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-brass text-white shadow-md scale-105"
                    : "bg-cream-dark text-forest hover:bg-brass/10 hover:text-brass"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Images Count */}
          <div className="text-center mb-8">
            <p className="font-body text-charcoal-light">
              Showing {filteredImages.length} {filteredImages.length === 1 ? "photo" : "photos"}
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer hover-lift"
                onClick={() => setLightboxImage(image)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-xl font-semibold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Click to view
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-2">
                No photos in this category yet
              </h3>
              <p className="text-charcoal-light">
                Check back soon for more beautiful moments!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <div className="relative aspect-video">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                {lightboxImage.title}
              </h3>
              <p className="text-white/70">
                {lightboxImage.alt}
              </p>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Press ESC or click outside to close
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl font-bold text-forest mb-6">
            Want to Be Featured?
          </h2>
          <p className="font-body text-lg text-charcoal-light mb-8 max-w-2xl mx-auto">
            Tag us on social media @abolegardencafe and share your dining experience. 
            We love seeing our guests enjoy their time with us!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.tiktok.com/@abolegardencafe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Follow on TikTok
            </a>
            <a
              href="/booking"
              className="btn btn-outline btn-lg"
            >
              Visit Us Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
