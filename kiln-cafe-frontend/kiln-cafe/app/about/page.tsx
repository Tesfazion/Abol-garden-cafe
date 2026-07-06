import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-garden text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070"
            alt="Garden café background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-sm font-heading font-medium mb-6">
              Our Story
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Welcome to
              <span className="block text-brass mt-2">Abole Garden Café</span>
            </h1>
            <p className="font-body text-xl text-cream/90 leading-relaxed max-w-3xl mx-auto">
              Wolaita Soddo's premier destination for authentic Ethiopian dining, 
              international cuisine, and warm hospitality in a beautiful garden setting.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage/10 text-sage font-heading font-medium text-sm uppercase tracking-wide mb-4">
                Since Day One
              </span>
              <h2 className="section-header">
                A Love Letter to Ethiopian Food & Culture
              </h2>
              <div className="space-y-4 font-body text-charcoal-light leading-relaxed">
                <p>
                  Abole Garden Café began with a simple dream: to create a space where 
                  the rich flavors of Ethiopian cuisine meet international favorites, 
                  all served in the most welcoming environment in Wolaita Soddo.
                </p>
                <p>
                  Our name, "Abole," represents the first cup of coffee in the traditional 
                  Ethiopian coffee ceremony — a symbol of hospitality, community, and the 
                  beginning of something beautiful. Just like that first cup, we strive to 
                  make every visit the start of a wonderful experience.
                </p>
                <p>
                  Today, we're proud to be known as a place where families gather, friends 
                  reconnect, and visitors discover the warmth of Ethiopian hospitality. 
                  From our signature Abole Special combo to authentic coffee ceremonies, 
                  every dish tells a story.
                </p>
              </div>
            </div>
            
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074"
                alt="Restaurant interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Garden Experience */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-header text-center">
              Our Beautiful Garden Setting
            </h2>
            <p className="section-subheader text-center">
              What makes Abole Garden Café truly special is our outdoor space — 
              a peaceful oasis in the heart of Wolaita Soddo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Garden Feature 1 */}
            <div className="card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 text-forest mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Shaded Seating
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                Enjoy your meal under the natural shade of trees, 
                perfect for Soddo's beautiful weather year-round.
              </p>
            </div>

            {/* Garden Feature 2 */}
            <div className="card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brass/20 text-forest mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Family Atmosphere
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                A safe, welcoming space for the whole family, 
                complete with a dedicated kids play area.
              </p>
            </div>

            {/* Garden Feature 3 */}
            <div className="card text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/20 text-forest mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Indoor & Outdoor
              </h3>
              <p className="font-body text-sm text-charcoal-light">
                Choose your perfect ambiance — cozy indoor seating 
                or breezy garden tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Serve */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-elevated order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
                alt="Food presentation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-brass/10 text-brass font-heading font-medium text-sm uppercase tracking-wide mb-4">
                Our Menu
              </span>
              <h2 className="section-header">
                The Best of Both Worlds
              </h2>
              <p className="font-body text-lg text-charcoal-light leading-relaxed mb-6">
                We believe great food brings people together. That's why our menu 
                celebrates both authentic Ethiopian cuisine and international favorites.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center text-2xl">
                    ☕
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-1">
                      Ethiopian Coffee Ceremony
                    </h3>
                    <p className="text-sm text-charcoal-light">
                      Experience the traditional art of Ethiopian coffee preparation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center text-2xl">
                    🍛
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-1">
                      Authentic Ethiopian Dishes
                    </h3>
                    <p className="text-sm text-charcoal-light">
                      Injera, tibs, wat, and our famous Abole Special combo
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center text-2xl">
                    🍕
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-1">
                      International Favorites
                    </h3>
                    <p className="text-sm text-charcoal-light">
                      Pizza, burgers, shawarma, pasta — something for everyone
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center text-2xl">
                    🥤
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-1">
                      Fresh Juices & Beverages
                    </h3>
                    <p className="text-sm text-charcoal-light">
                      Made-to-order fresh juices and refreshing drinks
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/menu" className="btn btn-primary mt-8">
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-forest text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-6">
              What We Stand For
            </h2>
            <p className="font-body text-xl text-cream/90">
              Our values guide everything we do, from sourcing ingredients 
              to serving our guests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                Fresh & Quality
              </h3>
              <p className="text-cream/80">
                We prepare everything fresh daily using the finest ingredients
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                Community First
              </h3>
              <p className="text-cream/80">
                We're more than a restaurant — we're a gathering place for our community
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">💚</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                Ethiopian Hospitality
              </h3>
              <p className="text-cream/80">
                Every guest is treated like family with warmth and respect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-20 bg-gradient-warm">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              Come Experience It Yourself
            </h2>
            <p className="font-body text-xl text-charcoal-light mb-10">
              We're open daily from 7:00 AM to 10:00 PM at {SITE.location.plusCode}, 
              Wolaita Soddo. Whether you're here for breakfast, lunch, dinner, 
              or just coffee — we can't wait to serve you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking" className="btn btn-primary btn-lg">
                Reserve Your Table
              </Link>
              <a
                href={SITE.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
              >
                Get Directions
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="btn btn-secondary btn-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
