import { SITE } from "@/lib/site";

export default function TikTokBanner() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-bean/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-leaf/30 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bean">
            Follow along
          </span>
          <h2 className="mt-2 font-display text-3xl text-cream">
            Watch us on TikTok
          </h2>
          <p className="mt-3 font-body text-cream/70">
            Coffee pours, garden sunsets, Abol Special combos, and the everyday
            life of Soddo&apos;s favorite garden café — straight from our
            official page.
          </p>
        </div>

        <a
          href={SITE.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-cream/25 bg-cream/10 px-7 py-3.5 font-mono text-xs uppercase tracking-wide text-cream transition hover:border-bean hover:bg-bean hover:text-forest"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-current"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
          </svg>
          {SITE.tiktok.handle}
        </a>
      </div>
    </section>
  );
}
