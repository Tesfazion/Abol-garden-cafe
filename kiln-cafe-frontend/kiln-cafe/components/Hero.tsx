import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start px-6 py-28 md:py-36">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
          Roasted Tuesdays · Baked daily
        </span>
        <h1 className="mt-6 max-w-2xl font-display text-5xl font-medium leading-[1.05] text-wheat md:text-7xl">
          Coffee taken to
          <span className="italic text-brass"> temperature</span>, bread
          taken to the kiln.
        </h1>
        <p className="mt-6 max-w-lg font-body text-lg text-wheat/70">
          Single-origin roasts cupped in-house, sourdough fired daily in our
          wood oven. Order for delivery or book a table on Foundry Lane.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/menu"
            className="rounded-full bg-brass px-7 py-3 font-mono text-xs uppercase tracking-wide text-ink transition hover:bg-brass-light"
          >
            Order delivery
          </Link>
          <Link
            href="/booking"
            className="rounded-full border border-wheat/30 px-7 py-3 font-mono text-xs uppercase tracking-wide text-wheat transition hover:border-wheat"
          >
            Book a table
          </Link>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-ember/20 blur-3xl"
      />
    </section>
  );
}
