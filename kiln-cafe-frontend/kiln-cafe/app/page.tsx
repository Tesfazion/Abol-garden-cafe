import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import Link from "next/link";
import { getMenu } from "@/lib/menu";

export default async function HomePage() {
  const { items } = await getMenu();
  const featured = items.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
              This week
            </span>
            <h2 className="mt-2 font-display text-3xl text-ink">
              From the roaster & the oven
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden font-mono text-xs uppercase tracking-wide text-charcoal/60 hover:text-ember md:block"
          >
            View full menu →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-wheat-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
              Foundry Lane
            </span>
            <h2 className="mt-2 font-display text-3xl text-ink">
              A table, held for you
            </h2>
            <p className="mt-4 max-w-md font-body text-charcoal/70">
              Whether it's a slow Sunday breakfast or a Tuesday cupping
              session, reserve ahead and we'll have your table ready.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-mono text-xs uppercase tracking-wide text-wheat transition hover:bg-charcoal"
            >
              Book a table
            </Link>
          </div>
          <div className="paper-edge h-64 w-full bg-ink/90 md:h-80" />
        </div>
      </section>
    </>
  );
}
