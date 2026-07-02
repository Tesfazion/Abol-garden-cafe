import MenuBrowser from "@/components/MenuBrowser";
import { getMenu } from "@/lib/menu";

// Server component: fetches live menu data on each request (no-store),
// so staff-side price/availability changes show up immediately.
export default async function MenuPage() {
  const { items } = await getMenu();

  return (
    <div id="order" className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
        Order for delivery or pickup
      </span>
      <h1 className="mt-2 font-display text-4xl text-ink">The menu</h1>

      <MenuBrowser items={items} />
    </div>
  );
}
