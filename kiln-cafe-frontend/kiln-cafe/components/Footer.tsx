export default function Footer() {
  return (
    <footer className="mt-24 border-t border-charcoal/10 bg-ink text-wheat/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-wheat">Kiln Coffee House</p>
          <p className="mt-3 font-body text-sm leading-relaxed text-wheat/60">
            Small-batch roasted, wood-fired baked. Open daily from the first
            pull to the last loaf.
          </p>
        </div>
        <div className="font-body text-sm text-wheat/70">
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-brass">
            Visit
          </p>
          <p>12 Foundry Lane</p>
          <p>Open 07:00 – 18:00 daily</p>
        </div>
        <div className="font-body text-sm text-wheat/70">
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-brass">
            Contact
          </p>
          <p>hello@kilncoffeehouse.example</p>
          <p>+34 000 000 000</p>
        </div>
      </div>
      <div className="border-t border-wheat/10 px-6 py-4 text-center font-mono text-[11px] text-wheat/40">
        © {new Date().getFullYear()} Kiln Coffee House
      </div>
    </footer>
  );
}
