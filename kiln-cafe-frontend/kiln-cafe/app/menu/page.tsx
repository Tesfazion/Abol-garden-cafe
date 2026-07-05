import MenuBrowser from "@/components/MenuBrowser";
import { getMenu } from "@/lib/menu";
import Image from "next/image";

// Server component: fetches live menu data on each request (no-store),
// so staff-side price/availability changes show up immediately.
export default async function MenuPage() {
  const { items } = await getMenu();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-garden text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-sm font-heading font-medium mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Our Complete Menu
            </span>

            {/* Heading */}
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Delicious Food,
              <span className="block text-brass mt-2">Unforgettable Flavors</span>
            </h1>

            {/* Description */}
            <p className="font-body text-xl text-cream/90 leading-relaxed mb-8 max-w-2xl mx-auto">
              From authentic Ethiopian dishes to international favorites, every item 
              is prepared fresh with love. Browse our menu, add to your cart, 
              and enjoy the taste of Abole Garden Café.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brass mb-1">{items.length}+</div>
                <div className="text-sm text-cream/80 font-heading">Menu Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brass mb-1">4</div>
                <div className="text-sm text-cream/80 font-heading">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brass mb-1">100%</div>
                <div className="text-sm text-cream/80 font-heading">Fresh Daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Browser Section */}
      <section id="order" className="py-16 bg-white">
        <div className="container-custom">
          <MenuBrowser items={items} />
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-warm border-t border-forest/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="font-body text-lg text-charcoal-light mb-8">
              Give us a call! We're happy to accommodate special requests and dietary needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+251970193549"
                className="btn btn-primary btn-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +251 97 019 3549
              </a>
              <a
                href="/contact"
                className="btn btn-outline btn-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary Info Section */}
      <section className="py-12 bg-forest text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-xl font-semibold mb-6">
              Dietary Options Available
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-cream/90">Vegetarian Options</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-cream/90">Halal Meat</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-cream/90">Kids Menu</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-cream/90">Special Requests Welcome</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
