/**
 * src/seed.ts
 * Run with: npx tsx src/seed.ts
 * Seeds the MongoDB database with initial menu items and an admin user.
 * Safe to re-run — uses upsert so existing data won't be duplicated.
 */
import "dotenv/config";
import mongoose from "mongoose";
import { hashPassword } from "./utils/password";
import { User } from "./models/user.model";
import { MenuItem } from "./models/menuItem.model";

async function main() {
  const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/cafe";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding...");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const adminEmail    = process.env.SEED_ADMIN_EMAIL    ?? "admin@kilncoffeehouse.example";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "adminpass123";

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name:         "Admin",
      email:        adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role:         "ADMIN",
    },
    { upsert: true, new: true }
  );
  console.log(`Admin user ready: ${adminEmail}`);

  // ── Menu items ──────────────────────────────────────────────────────────────
  const menuItems = [
    {
      name:         "Yirgacheffe Washed",
      category:     "COFFEE",
      price:        4.5,
      description:  "Light roast, filter brew.",
      tastingNotes: ["bergamot", "peach", "black tea"],
      origin:       "Gedeb, Ethiopia · 1,950m",
      image:        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800",
      hot:          true,
    },
    {
      name:         "Huila Decaf",
      category:     "COFFEE",
      price:        4.5,
      description:  "Sugarcane-process decaf, medium roast.",
      tastingNotes: ["brown sugar", "walnut", "cocoa"],
      origin:       "Huila, Colombia · 1,700m",
      image:        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800",
    },
    {
      name:         "House Espresso",
      category:     "COFFEE",
      price:        3.2,
      description:  "Dark roast blend, built for milk.",
      tastingNotes: ["dark chocolate", "toasted hazelnut"],
      origin:       "Brazil & Sumatra blend",
      image:        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    },
    {
      name:         "Kiln Chai Latte",
      category:     "COFFEE",
      price:        4.0,
      description:  "House-blended masala chai with oat milk.",
      tastingNotes: ["cardamom", "cinnamon", "ginger"],
      image:        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=800",
      hot:          true,
    },
    {
      name:         "Wood-Fired Sourdough",
      category:     "BAKES",
      price:        6.0,
      description:  "48-hour ferment, baked to order in the kiln oven.",
      tastingNotes: ["nutty crust", "open crumb"],
      image:        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800",
      hot:          true,
    },
    {
      name:         "Brown Butter Croissant",
      category:     "BAKES",
      price:        4.2,
      description:  "Laminated dough finished with brown butter glaze.",
      tastingNotes: ["butterscotch", "toasted flour"],
      image:        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800",
    },
    {
      name:         "Cardamom Kouign-Amann",
      category:     "BAKES",
      price:        4.8,
      description:  "Caramelised layers of pastry with a cardamom sugar crust.",
      tastingNotes: ["caramel", "spice", "flaky"],
      image:        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
      hot:          true,
    },
    {
      name:         "Kiln-Roasted Tomato Toast",
      category:     "PLATES",
      price:        9.5,
      description:  "Charred sourdough, whipped ricotta, roast tomato, basil oil.",
      tastingNotes: ["smoky", "bright acidity"],
      image:        "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800",
    },
    {
      name:         "Soft Eggs & Anchovy Soldiers",
      category:     "PLATES",
      price:        11.0,
      description:  "Slow-cooked eggs, butter-fried anchovy soldiers, chives.",
      tastingNotes: ["umami", "creamy", "savoury"],
      image:        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800",
    },
    {
      name:         "Mushroom Miso Bowl",
      category:     "PLATES",
      price:        13.5,
      description:  "Mixed mushrooms, white miso, sesame, pickled cucumber, rice.",
      tastingNotes: ["earthy", "savoury", "umami"],
      image:        "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
    },
  ];

  for (const item of menuItems) {
    await MenuItem.findOneAndUpdate(
      { name: item.name },
      item,
      { upsert: true, new: true }
    );
  }
  console.log(`${menuItems.length} menu items seeded.`);

  await mongoose.disconnect();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
