import { MenuItem, MenuCategory } from "./types";
import { menu as sampleMenu } from "@/data/menu";
import { backendFetch } from "./backend";

interface BackendMenuItem {
  id: string;
  name: string;
  category: "COFFEE" | "BAKES" | "PLATES";
  price: number; // MongoDB/Mongoose returns a native number
  description: string;
  tastingNotes: string[];
  origin: string | null;
  image: string;
  hot: boolean;
  available: boolean;
}

function mapBackendItem(item: BackendMenuItem): MenuItem {
  return {
    id:           item.id,
    name:         item.name,
    category:     item.category.toLowerCase() as MenuCategory,
    price:        item.price,
    description:  item.description,
    tastingNotes: item.tastingNotes,
    origin:       item.origin ?? undefined,
    image:        item.image,
    hot:          item.hot,
  };
}

/**
 * Fetches the live menu from the backend. Falls back to bundled sample data
 * if the API is unreachable, so the site stays usable (e.g. during local
 * frontend-only development, or a backend outage) rather than showing an
 * empty menu.
 */
export async function getMenu(): Promise<{
  items: MenuItem[];
  source: "backend" | "fallback";
}> {
  try {
    const items = await backendFetch<BackendMenuItem[]>("/menu");
    return { items: items.map(mapBackendItem), source: "backend" };
  } catch {
    return { items: sampleMenu, source: "fallback" };
  }
}
