import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-forest/10 bg-gradient-garden text-cream">
      
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.jpeg"
              alt="Abole Garden Café"
              width={160}
              height={64}
              className="h-14 w-auto object-contain mb-6 brightness-0 invert"
            />
            <p className="font-display text-2xl text-cream mb-4">
              Abole Garden Café
            </p>
            <p className="font-body text-sm leading-relaxed text-cream/80 max-w-md">
              Experience authentic Ethiopian dining in a beautiful garden setting. 
              From traditional coffee ceremonies to international favorites, 
              we serve delicious food that brings people together in Wolaita Soddo&apos;s 
              most welcoming atmosphere.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SITE.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 hover:text-brass transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span className="text-sm font-medium">{SITE.tiktok.handle}</span>
              </a>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(SITE.rating.score) ? 'text-brass' : 'text-cream/30'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-cream/80">
                {SITE.rating.score} ({SITE.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-semibold text-brass mb-4 uppercase tracking-wide text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link href="/" className="text-cream/80 hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-cream/80 hover:text-cream transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream/80 hover:text-cream transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-cream/80 hover:text-cream transition-colors">
                  Reserve Table
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 hover:text-cream transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-semibold text-brass mb-4 uppercase tracking-wide text-sm">
              Visit & Contact
            </h3>
            <ul className="space-y-4 font-body text-sm text-cream/80">
              
              {/* Location */}
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-cream">{SITE.location.plusCode}</p>
                  <p>{SITE.location.city}, {SITE.location.country}</p>
                  <a
                    href={SITE.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass hover:text-brass-light mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </li>

              {/* Hours */}
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-cream">{SITE.hours}</p>
                  <p className="text-cream/60 text-xs mt-1">Open Daily</p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-cream hover:text-brass transition-colors">
                  {SITE.phone}
                </a>
              </li>

              {/* Email */}
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${SITE.email}`} className="text-cream hover:text-brass transition-colors">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/60">
            <p className="font-body">
              © {currentYear} Abole Garden Café. All rights reserved.
            </p>
            <p className="font-accent text-lg text-brass">
              ሰላም • Welcome
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
