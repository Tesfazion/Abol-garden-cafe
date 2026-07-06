"use client";

import { useState } from "react";
import Image from "next/image";

// Gallery categories
type GalleryCategory = "all" | "coffee" | "dishes" | "desserts" | "beverages";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
}

// Real gallery images from the menu folders
const galleryImages: GalleryImage[] = [
  // Coffee & Tea
  {
    id: 1,
    src: "/images/menu/coffe and Tea/Traditional Ethiopian Buna (Coffee Ceremony).jpg",
    alt: "Traditional Ethiopian Coffee Ceremony",
    category: "coffee",
    title: "Traditional Buna Ceremony"
  },
  {
    id: 2,
    src: "/images/menu/coffe and Tea/Macchiato (Ethiopian Style).jpg",
    alt: "Ethiopian Style Macchiato",
    category: "coffee",
    title: "Ethiopian Macchiato"
  },
  {
    id: 3,
    src: "/images/menu/coffe and Tea/Harar Coffee.jpg",
    alt: "Harar Coffee",
    category: "coffee",
    title: "Premium Harar Coffee"
  },
  {
    id: 4,
    src: "/images/menu/coffe and Tea/Yirgacheffe Coffee.jpg",
    alt: "Yirgacheffe Coffee",
    category: "coffee",
    title: "Yirgacheffe Blend"
  },
  {
    id: 5,
    src: "/images/menu/coffe and Tea/Cappuccino.jpg",
    alt: "Cappuccino",
    category: "coffee",
    title: "Cappuccino"
  },
  {
    id: 6,
    src: "/images/menu/coffe and Tea/Spris (Ethiopian Sprite Coffee).jpg",
    alt: "Spris - Ethiopian Sprite Coffee",
    category: "coffee",
    title: "Spris Coffee"
  },
  // Main Dishes
  {
    id: 7,
    src: "/images/menu/Main Dishes/Kitfo (Ethiopian Steak Tartare).jpg",
    alt: "Kitfo - Ethiopian style steak tartare",
    category: "dishes",
    title: "Traditional Kitfo"
  },
  {
    id: 8,
    src: "/images/menu/Main Dishes/Tibs (Ethiopian Stir-Fry).jpg",
    alt: "Tibs - Ethiopian stir-fry",
    category: "dishes",
    title: "Spiced Tibs"
  },
  {
    id: 9,
    src: "/images/menu/Main Dishes/Fresh Injera with Wat.jpg",
    alt: "Fresh Injera with Wat",
    category: "dishes",
    title: "Injera with Wat"
  },
  {
    id: 10,
    src: "/images/menu/Main Dishes/Fasting Platter (Vegan).jpg",
    alt: "Fasting Platter - Vegan Ethiopian dishes",
    category: "dishes",
    title: "Vegan Fasting Platter"
  },
  {
    id: 11,
    src: "/images/menu/Main Dishes/Special Combo.jpg",
    alt: "Special Combo platter",
    category: "dishes",
    title: "Special Combo"
  },
  {
    id: 12,
    src: "/images/menu/Main Dishes/Pizza Margherita.jpg",
    alt: "Pizza Margherita",
    category: "dishes",
    title: "Pizza Margherita"
  },
  // Bakes & Desserts
  {
    id: 13,
    src: "/images/menu/Bakes and desserts/Cardamom Kouign-Amann.jpg",
    alt: "Cardamom Kouign-Amann pastry",
    category: "desserts",
    title: "Cardamom Kouign-Amann"
  },
  {
    id: 14,
    src: "/images/menu/Bakes and desserts/Dabo (Ethiopian Honey Bread.jpg",
    alt: "Dabo - Ethiopian honey bread",
    category: "desserts",
    title: "Honey Dabo Bread"
  },
  {
    id: 15,
    src: "/images/menu/Bakes and desserts/Cake (Slice).jpg",
    alt: "Fresh cake slice",
    category: "desserts",
    title: "Homemade Cake"
  },
  {
    id: 16,
    src: "/images/menu/Bakes and desserts/Fresh Pastries.jpg",
    alt: "Assorted fresh pastries",
    category: "desserts",
    title: "Daily Fresh Pastries"
  },
  {
    id: 17,
    src: "/images/menu/Bakes and desserts/Ambasha (Ethiopian Bread).jpg",
    alt: "Ambasha - Ethiopian bread",
    category: "desserts",
    title: "Ambasha Bread"
  },
  // Beverages
  {
    id: 18,
    src: "/images/menu/Beverages/Fresh Fruit Juice.jpg",
    alt: "Fresh fruit juice",
    category: "beverages",
    title: "Fresh Fruit Juices"
  },
  {
    id: 19,
    src: "/images/menu/Beverages/Soft Drinks.jpg",
    alt: "Assorted soft drinks",
    category: "beverages",
    title: "Cold Beverages"
  },
];

const categories = [
  { id: "all" as GalleryCategory, label: "All", icon: "🖼️" },
  { id: "coffee" as GalleryCategory, label: "Coffee & Tea", icon: "☕" },
  { id: "dishes" as GalleryCategory, label: "Main Dishes", icon: "🍽️" },
  { id: "desserts" as GalleryCategory, label: "Desserts", icon: "🍰" },
  { id: "beverages" as GalleryCategory, label: "Beverages", icon: "🥤" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image);
    setCurrentIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-forest via-sage to-forest text-white overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-heading font-medium mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Photo Gallery
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Taste The
            <span className="block bg-gradient-to-r from-brass to-yellow-300 bg-clip-text text-transparent mt-2">
              Beauty of Ethiopia
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed">
            Journey through our collection of authentic Ethiopian dishes, premium coffee, 
            and the warm ambiance that makes Abole Garden Café special.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-cream-light">
        <div className="container-custom">
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading font-semibold transition-all duration-300 shadow-sm ${
                  activeCategory === cat.id
                    ? "bg-brass text-white shadow-lg scale-105 ring-2 ring-brass ring-offset-2"
                    : "bg-white text-forest hover:bg-brass/10 hover:text-brass hover:shadow-md hover:scale-102"
                }`}
              >
                <span className="text-xl transition-transform group-hover:scale-110">{cat.icon}</span>
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Images Count */}
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm font-body text-charcoal-light">
              <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              {filteredImages.length} {filteredImages.length === 1 ? "photo" : "photos"}
            </p>
          </div>

          {/* Masonry Grid - Modern Pinterest Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer bg-white"
                onClick={() => openLightbox(image)}
              >
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Click to view</span>
                      </div>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
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
          className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:rotate-90 duration-300 z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {filteredImages.length > 1 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {filteredImages.length > 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center backdrop-blur-sm bg-white/5 rounded-lg p-4">
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                {lightboxImage.title}
              </h3>
              <p className="text-white/70 font-body">
                {lightboxImage.alt}
              </p>
              <p className="text-white/50 text-sm mt-2">
                {currentIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-body flex items-center gap-6">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
              Close
            </span>
            {filteredImages.length > 1 && (
              <>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
                  Navigate
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brass via-brass-dark to-brass relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Experience It In Person
          </h2>
          <p className="font-body text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Photos can only capture so much. Visit Abole Garden Café to taste the authentic 
            flavors and feel the warm hospitality that defines Ethiopian culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brass font-heading font-bold text-lg hover:bg-cream shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reserve a Table
            </a>
            <a
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-lg hover:bg-white/20 border-2 border-white/30 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Full Menu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
