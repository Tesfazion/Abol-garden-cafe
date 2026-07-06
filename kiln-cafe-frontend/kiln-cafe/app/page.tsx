import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import TikTokBanner from "@/components/TikTokBanner";
import VideoShowcase from "@/components/VideoShowcase";
import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/menu";
import { SITE } from "@/lib/site";

export default async function HomePage() {
  const { items } = await getMenu();
  const featured = items.slice(0, 6);

  return (
    <>
      {/* Hero Section with Video */}
      <Hero />

      {/* Featured Menu Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-brass/10 text-brass font-heading font-medium text-sm uppercase tracking-wide mb-4">
              Our Specialties
            </span>
            <h2 className="section-header text-center">
              Taste the Best of Both Worlds
            </h2>
            <p className="section-subheader text-center">
              From authentic Ethiopian dishes to international favorites, 
              every meal is prepared fresh in our garden kitchen with love and care.
            </p>
          </div>

          {/* Featured Items Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {featured.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          {/* View Full Menu CTA */}
          <div className="text-center">
            <Link href="/menu" className="btn btn-outline btn-lg group">
              View Complete Menu
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-header text-center">
              Why Abole Garden Café?
            </h2>
            <p className="section-subheader text-center">
              More than just food – it's an experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Feature 1: Garden Setting */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                    <img src={`/api/why/${encodeURIComponent("Beautiful Garden.png")}`} alt="Beautiful Garden" className="w-full h-full object-cover" />
                  </div>
              <h3 className="font-heading text-lg font-semibold text-forest mb-3">
                Beautiful Garden
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                Relax in our shaded outdoor seating with Soddo's perfect weather
              </p>
            </div>

            {/* Feature 2: Authentic Cuisine */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src={`/api/why/${encodeURIComponent("Diverse Menu.png")}`} alt="Diverse Menu" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-forest mb-3">
                Diverse Menu
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                Ethiopian classics, international favorites, fresh juices, and more
              </p>
            </div>

            {/* Feature 3: Family Friendly */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src={`/api/why/${encodeURIComponent("Family Friendly.png")}`} alt="Family Friendly" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-forest mb-3">
                Family Friendly
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                Safe, welcoming space with kids play area for the whole family
              </p>
            </div>

            {/* Feature 4: Quality Service */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                <img src={`/api/why/${encodeURIComponent("Quality Service.png")}`} alt="Quality Service" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-forest mb-3">
                Quality Service
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                ⭐ 4.2 rating from 22 reviews – we make every visit special
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Experience Authentic Ethiopian Dining Section - REDESIGNED */}
      <section className="relative py-24 bg-gradient-to-br from-forest via-sage to-forest text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-heading font-medium mb-6 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Your Ethiopian Experience Awaits
            </span>
            
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Experience Authentic
              <span className="block bg-gradient-to-r from-brass via-yellow-300 to-brass bg-clip-text text-transparent mt-2">
                Ethiopian Dining
              </span>
            </h2>
            
            <p className="font-body text-xl text-cream/90 leading-relaxed max-w-3xl mx-auto">
              Step into a world where ancient traditions meet modern comfort. From our traditional coffee ceremony 
              to our garden setting, every moment at Abole Garden Café is designed to transport you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Feature 1 - Coffee Ceremony */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brass/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brass/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brass" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Traditional Coffee Ceremony
                </h3>
                <p className="text-cream/80 leading-relaxed">
                  Experience the ancient ritual of Ethiopian coffee - roasted, ground, and brewed fresh before your eyes.
                </p>
              </div>
            </div>

            {/* Feature 2 - Garden Setting */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-sage/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-sage" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Beautiful Garden Oasis
                </h3>
                <p className="text-cream/80 leading-relaxed">
                  Dine under the shade of trees in our lush garden setting - perfect for relaxation and conversation.
                </p>
              </div>
            </div>

            {/* Feature 3 - Authentic Flavors */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-terracotta/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Authentic Ethiopian Cuisine
                </h3>
                <p className="text-cream/80 leading-relaxed">
                  Taste traditional recipes passed down through generations, made with imported Ethiopian spices.
                </p>
              </div>
            </div>

            {/* Feature 4 - Warm Hospitality */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-yellow-300/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Warm Ethiopian Hospitality
                </h3>
                <p className="text-cream/80 leading-relaxed">
                  Feel at home with our friendly staff who treat every guest like family - ሰላም (Selam)!
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center my-12">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="mx-4 text-white/40">✦</div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>

          {/* Stats & CTA */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="font-display text-5xl font-bold text-brass mb-2">15+</div>
              <p className="text-cream/80 font-heading">Years of Service</p>
            </div>
            <div className="p-6">
              <div className="font-display text-5xl font-bold text-brass mb-2">27+</div>
              <p className="text-cream/80 font-heading">Menu Specialties</p>
            </div>
            <div className="p-6">
              <div className="font-display text-5xl font-bold text-brass mb-2">1000+</div>
              <p className="text-cream/80 font-heading">Happy Guests</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brass text-forest font-heading font-bold text-lg hover:bg-yellow-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reserve Your Table
            </Link>
            <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-lg hover:bg-white/20 border-2 border-white/30 transition-all duration-300 hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explore Our Menu
            </Link>
            <a
              href={SITE.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-lg hover:bg-white/20 border-2 border-white/30 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* TikTok Social Proof */}
      <TikTokBanner />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-garden text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Hungry? We're Ready to Serve!
          </h2>
          <p className="font-body text-xl text-cream/90 max-w-2xl mx-auto mb-10">
            Order online for pickup or reserve your table in our beautiful garden. 
            Great food and hospitality await you at Abole Garden Café.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn btn-primary btn-lg bg-white text-forest hover:bg-cream">
              Order Food Online
            </Link>
            <Link href="/booking" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-forest">
              Book Your Table
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="btn btn-ghost btn-lg text-white hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
