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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sage/20 text-forest mb-6 group-hover:bg-sage/30 transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brass/20 text-forest mb-6 group-hover:bg-brass/30 transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-terracotta/20 text-forest mb-6 group-hover:bg-terracotta/30 transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-forest/10 text-forest mb-6 group-hover:bg-forest/20 transition-colors">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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

      {/* Garden Dining Experience Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            
            {/* Image */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-elevated group">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
                alt="Garden dining at Abole Garden Café"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-accent text-2xl text-white mb-2">
                  ሰላም • Welcome
                </p>
                <p className="font-heading text-sm text-white/90">
                  Experience Ethiopian hospitality
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage/10 text-sage font-heading font-medium text-sm uppercase tracking-wide mb-4">
                Reserve Your Spot
              </span>
              <h2 className="section-header">
                Your Table Awaits in Our Garden
              </h2>
              <p className="font-body text-lg text-charcoal-light leading-relaxed mb-6">
                Whether you're here for a traditional Ethiopian coffee ceremony, 
                our famous Abole Special combo, international dishes, or simply 
                unwinding under the trees with friends and family — we've got the 
                perfect spot for you.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-brass flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-heading font-medium text-forest">Open Daily 7:00 AM – 10:00 PM</p>
                    <p className="text-sm text-charcoal-light">Perfect for breakfast, lunch, dinner, or coffee</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-brass flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-heading font-medium text-forest">Indoor & Outdoor Seating</p>
                    <p className="text-sm text-charcoal-light">Choose your perfect ambiance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-brass flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-heading font-medium text-forest">Kids Welcome</p>
                    <p className="text-sm text-charcoal-light">Family-friendly with play area</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn btn-primary btn-lg">
                  Reserve a Table
                </Link>
                <a
                  href={SITE.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  Get Directions
                </a>
              </div>
            </div>
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
