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
  const adminEmail    = process.env.SEED_ADMIN_EMAIL    ?? "admin@abolgardencafe.et";
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

  // ── Clear old menu items ─────────────────────────────────────────────────────
  await MenuItem.deleteMany({});
  console.log("Cleared old menu items.");

  // ── Menu items ───────────────────────────────────────────────────────────────
  // Real menu items from Abol Garden Cafe, Sodo with local images
  const IMG = {
    // Coffee & Tea
    buna: "/images/menu/coffe and Tea/Traditional Ethiopian Buna (Coffee Ceremony).jpg",
    macchiato: "/images/menu/coffe and Tea/Macchiato (Ethiopian Style).jpg",
    yirgacheffe: "/images/menu/coffe and Tea/Yirgacheffe Coffee.jpg",
    sidamo: "/images/menu/coffe and Tea/Sidamo Coffee.jpg",
    harar: "/images/menu/coffe and Tea/Harar Coffee.jpg",
    cappuccino: "/images/menu/coffe and Tea/Cappuccino.jpg",
    spris: "/images/menu/coffe and Tea/Spris (Ethiopian Sprite Coffee).jpg",
    
    // Beverages
    juice: "/images/menu/Beverages/Fresh Fruit Juice.jpg",
    softDrinks: "/images/menu/Beverages/Soft Drinks.jpg",
    
    // Main Dishes
    combo: "/images/menu/Main Dishes/Special Combo.jpg",
    metiro: "/images/menu/Main Dishes/Abol Metiro.jpg",
    injera: "/images/menu/Main Dishes/Fresh Injera with Wat.jpg",
    tibs: "/images/menu/Main Dishes/Tibs (Ethiopian Stir-Fry).jpg",
    kitfo: "/images/menu/Main Dishes/Kitfo (Ethiopian Steak Tartare).jpg",
    fasting: "/images/menu/Main Dishes/Fasting Platter (Vegan).jpg",
    shawarma: "/images/menu/Main Dishes/Chicken Shawarma with Rice.jpg",
    pizza: "/images/menu/Main Dishes/Pizza Margherita.jpg",
    burger: "/images/menu/Main Dishes/Cheeseburger.jpg",
    
    // Bakes & Desserts
    cake: "/images/menu/Bakes and desserts/Cake (Slice).jpg",
    ambasha: "/images/menu/Bakes and desserts/Ambasha (Ethiopian Bread).jpg",
    dabo: "/images/menu/Bakes and desserts/Dabo (Ethiopian Honey Bread.jpg",
    pastries: "/images/menu/Bakes and desserts/Fresh Pastries.jpg",
    cardamom: "/images/menu/Bakes and desserts/Cardamom Kouign-Amann.jpg",
  };

  const menuItems = [
    // ===== COFFEE & TEA =====
    {
      name:         "Traditional Ethiopian Buna (Coffee Ceremony)",
      category:     "COFFEE",
      price:        350,
      description:  "Experience the authentic Ethiopian coffee ceremony with freshly roasted and brewed coffee.",
      tastingNotes: ["aromatic", "rich", "traditional", "ceremonial"],
      origin:       "Ethiopian Coffee Ceremony",
      image:        IMG.buna,
      hot:          true,
    },
    {
      name:         "Macchiato (Ethiopian Style)",
      category:     "COFFEE",
      price:        280,
      description:  "Ethiopian-style macchiato with perfectly layered espresso and steamed milk.",
      tastingNotes: ["bold", "creamy", "smooth", "layered"],
      image:        IMG.macchiato,
      hot:          true,
    },
    {
      name:         "Yirgacheffe Coffee",
      category:     "COFFEE",
      price:        420,
      description:  "Premium single-origin coffee from Yirgacheffe region with floral notes.",
      tastingNotes: ["floral", "citrus", "bright", "premium"],
      origin:       "Yirgacheffe, Ethiopia",
      image:        IMG.yirgacheffe,
      hot:          true,
    },
    {
      name:         "Sidamo Coffee",
      category:     "COFFEE",
      price:        390,
      description:  "Rich and smooth coffee from the Sidamo region with wine-like notes.",
      tastingNotes: ["wine-like", "smooth", "rich", "balanced"],
      origin:       "Sidamo, Ethiopia",
      image:        IMG.sidamo,
      hot:          true,
    },
    {
      name:         "Harar Coffee",
      category:     "COFFEE",
      price:        390,
      description:  "Bold coffee from Harar with fruity and spicy undertones.",
      tastingNotes: ["fruity", "spicy", "bold", "complex"],
      origin:       "Harar, Ethiopia",
      image:        IMG.harar,
      hot:          true,
    },
    {
      name:         "Cappuccino",
      category:     "COFFEE",
      price:        300,
      description:  "Classic cappuccino with rich espresso and velvety foam.",
      tastingNotes: ["creamy", "balanced", "smooth"],
      image:        IMG.cappuccino,
      hot:          true,
    },
    {
      name:         "Spris (Ethiopian Sprite Coffee)",
      category:     "COFFEE",
      price:        320,
      description:  "Unique Ethiopian coffee drink with a refreshing twist.",
      tastingNotes: ["refreshing", "unique", "sweet"],
      image:        IMG.spris,
    },

    // ===== BEVERAGES =====
    {
      name:         "Fresh Fruit Juice",
      category:     "DRINKS",
      price:        220,
      description:  "Freshly squeezed juice — choose from mango, papaya, avocado, or mixed.",
      tastingNotes: ["fresh", "tropical", "natural", "healthy"],
      image:        IMG.juice,
    },
    {
      name:         "Soft Drinks",
      category:     "DRINKS",
      price:        120,
      description:  "Refreshing cold beverages — Coca-Cola, Sprite, Fanta, and more.",
      tastingNotes: ["refreshing", "cold", "fizzy"],
      image:        IMG.softDrinks,
    },

    // ===== MAIN DISHES =====
    {
      name:         "Special Combo",
      category:     "PLATES",
      price:        1290,
      description:  "Our signature platter with a variety of Ethiopian specialties — the must-try at Abole Garden Café.",
      tastingNotes: ["variety", "authentic", "filling", "signature"],
      image:        IMG.combo,
      hot:          true,
    },
    {
      name:         "Abol Metiro",
      category:     "PLATES",
      price:        980,
      description:  "Traditional Ethiopian dish with rich flavors and aromatic spices.",
      tastingNotes: ["spiced", "traditional", "aromatic"],
      image:        IMG.metiro,
      hot:          true,
    },
    {
      name:         "Fresh Injera with Wat",
      category:     "PLATES",
      price:        680,
      description:  "Traditional spongy injera with your choice of wat — the heart of Ethiopian cuisine.",
      tastingNotes: ["tangy", "spicy", "authentic", "traditional"],
      image:        IMG.injera,
      hot:          true,
    },
    {
      name:         "Tibs (Ethiopian Stir-Fry)",
      category:     "PLATES",
      price:        900,
      description:  "Sautéed meat with onions, peppers, and Ethiopian spices.",
      tastingNotes: ["savory", "spiced", "tender", "aromatic"],
      image:        IMG.tibs,
      hot:          true,
    },
    {
      name:         "Kitfo (Ethiopian Steak Tartare)",
      category:     "PLATES",
      price:        1120,
      description:  "Finely minced raw beef seasoned with mitmita and Ethiopian butter.",
      tastingNotes: ["spiced", "rich", "traditional", "premium"],
      image:        IMG.kitfo,
      hot:          true,
    },
    {
      name:         "Fasting Platter (Vegan)",
      category:     "PLATES",
      price:        750,
      description:  "Assorted vegan dishes perfect for fasting days or plant-based diets.",
      tastingNotes: ["vegan", "healthy", "variety", "flavorful"],
      image:        IMG.fasting,
      hot:          true,
    },
    {
      name:         "Chicken Shawarma with Rice",
      category:     "PLATES",
      price:        830,
      description:  "Tender chicken shawarma served with seasoned rice.",
      tastingNotes: ["savory", "spiced", "filling", "middle-eastern"],
      image:        IMG.shawarma,
      hot:          true,
    },
    {
      name:         "Pizza Margherita",
      category:     "PLATES",
      price:        980,
      description:  "Classic pizza with mozzarella, tomato sauce, and fresh basil — baked to perfection.",
      tastingNotes: ["cheesy", "fresh", "classic", "italian"],
      image:        IMG.pizza,
      hot:          true,
    },
    {
      name:         "Cheeseburger",
      category:     "PLATES",
      price:        750,
      description:  "Juicy beef burger with cheese, lettuce, tomato, and special sauce.",
      tastingNotes: ["juicy", "cheesy", "satisfying"],
      image:        IMG.burger,
      hot:          true,
    },

    // ===== BAKES & DESSERTS =====
    {
      name:         "Cake (Slice)",
      category:     "BAKES",
      price:        300,
      description:  "Homemade cake — ask about today's flavors.",
      tastingNotes: ["sweet", "moist", "delightful"],
      image:        IMG.cake,
    },
    {
      name:         "Ambasha (Ethiopian Bread)",
      category:     "BAKES",
      price:        180,
      description:  "Traditional Ethiopian flatbread with a hint of spice.",
      tastingNotes: ["aromatic", "traditional", "soft"],
      image:        IMG.ambasha,
    },
    {
      name:         "Dabo (Ethiopian Honey Bread)",
      category:     "BAKES",
      price:        220,
      description:  "Sweet Ethiopian bread with honey and spices.",
      tastingNotes: ["sweet", "aromatic", "fluffy"],
      image:        IMG.dabo,
    },
    {
      name:         "Fresh Pastries",
      category:     "BAKES",
      price:        270,
      description:  "Selection of freshly baked pastries — croissants, danishes, and more.",
      tastingNotes: ["buttery", "flaky", "fresh"],
      image:        IMG.pastries,
    },
    {
      name:         "Cardamom Kouign-Amann",
      category:     "BAKES",
      price:        330,
      description:  "French pastry with caramelized sugar and aromatic cardamom.",
      tastingNotes: ["caramelized", "buttery", "aromatic", "premium"],
      image:        IMG.cardamom,
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
