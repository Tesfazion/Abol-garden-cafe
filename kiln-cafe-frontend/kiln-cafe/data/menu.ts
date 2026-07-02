import { MenuItem } from "@/lib/types";

export const menu: MenuItem[] = [
  {
    id: "coffee-01",
    name: "Yirgacheffe Washed",
    category: "coffee",
    price: 4.5,
    description: "Light roast, filter brew.",
    tastingNotes: ["bergamot", "peach", "black tea"],
    origin: "Gedeb, Ethiopia · 1,950m",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    hot: true,
  },
  {
    id: "coffee-02",
    name: "Huila Decaf",
    category: "coffee",
    price: 4.5,
    description: "Sugarcane-process decaf, medium roast.",
    tastingNotes: ["brown sugar", "walnut", "cocoa"],
    origin: "Huila, Colombia · 1,700m",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "coffee-03",
    name: "House Espresso",
    category: "coffee",
    price: 3.2,
    description: "Dark roast blend, built for milk.",
    tastingNotes: ["dark chocolate", "toasted hazelnut"],
    origin: "Brazil & Sumatra blend",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bake-01",
    name: "Wood-Fired Sourdough",
    category: "bakes",
    price: 6.0,
    description: "48-hour ferment, baked to order in the kiln oven.",
    tastingNotes: ["nutty crust", "open crumb"],
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    hot: true,
  },
  {
    id: "bake-02",
    name: "Brown Butter Croissant",
    category: "bakes",
    price: 4.2,
    description: "Laminated dough finished with brown butter glaze.",
    tastingNotes: ["butterscotch", "toasted flour"],
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "plate-01",
    name: "Kiln-Roasted Tomato Toast",
    category: "plates",
    price: 9.5,
    description: "Charred sourdough, whipped ricotta, roast tomato, basil oil.",
    tastingNotes: ["smoky", "bright acidity"],
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
  },
];
