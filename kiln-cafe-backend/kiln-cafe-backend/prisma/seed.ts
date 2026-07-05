import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@kilncoffeehouse.example";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "change-me-immediately";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: "ADMIN",
    },
  });

  const items = [
    // Coffee & Tea (7 items)
    {
      name: "Traditional Ethiopian Buna (Coffee Ceremony)",
      category: "COFFEE" as const,
      price: 250,
      description: "Experience the authentic Ethiopian coffee ceremony with freshly roasted and brewed coffee.",
      tastingNotes: JSON.stringify(["aromatic", "rich", "traditional", "ceremonial"]),
      origin: "Ethiopian Coffee Ceremony",
      image: "/images/menu/coffe and Tea/Traditional Ethiopian Buna (Coffee Ceremony).jpg",
      hot: true,
    },
    {
      name: "Macchiato (Ethiopian Style)",
      category: "COFFEE" as const,
      price: 180,
      description: "Ethiopian-style macchiato with perfectly layered espresso and steamed milk.",
      tastingNotes: JSON.stringify(["bold", "creamy", "smooth", "layered"]),
      image: "/images/menu/coffe and Tea/Macchiato (Ethiopian Style).jpg",
      hot: true,
    },
    {
      name: "Yirgacheffe Coffee",
      category: "COFFEE" as const,
      price: 280,
      description: "Premium single-origin coffee from Yirgacheffe region with floral notes.",
      tastingNotes: JSON.stringify(["floral", "citrus", "bright", "premium"]),
      origin: "Yirgacheffe, Ethiopia",
      image: "/images/menu/coffe and Tea/Yirgacheffe Coffee.jpg",
      hot: true,
    },
    {
      name: "Sidamo Coffee",
      category: "COFFEE" as const,
      price: 260,
      description: "Rich and smooth coffee from the Sidamo region with wine-like notes.",
      tastingNotes: JSON.stringify(["wine-like", "smooth", "rich", "balanced"]),
      origin: "Sidamo, Ethiopia",
      image: "/images/menu/coffe and Tea/Sidamo Coffee.jpg",
      hot: true,
    },
    {
      name: "Harar Coffee",
      category: "COFFEE" as const,
      price: 260,
      description: "Bold coffee from Harar with fruity and spicy undertones.",
      tastingNotes: JSON.stringify(["fruity", "spicy", "bold", "complex"]),
      origin: "Harar, Ethiopia",
      image: "/images/menu/coffe and Tea/Harar Coffee.jpg",
      hot: true,
    },
    {
      name: "Cappuccino",
      category: "COFFEE" as const,
      price: 200,
      description: "Classic cappuccino with rich espresso and velvety foam.",
      tastingNotes: JSON.stringify(["creamy", "balanced", "smooth"]),
      image: "/images/menu/coffe and Tea/Cappuccino.jpg",
      hot: true,
    },
    {
      name: "Spris (Ethiopian Sprite Coffee)",
      category: "COFFEE" as const,
      price: 220,
      description: "Unique Ethiopian coffee drink with a refreshing twist.",
      tastingNotes: JSON.stringify(["refreshing", "unique", "sweet"]),
      image: "/images/menu/coffe and Tea/Spris (Ethiopian Sprite Coffee).jpg",
    },
    // Beverages (2 items)
    {
      name: "Fresh Fruit Juice",
      category: "DRINKS" as const,
      price: 150,
      description: "Freshly squeezed juice — choose from mango, papaya, avocado, or mixed.",
      tastingNotes: JSON.stringify(["fresh", "tropical", "natural", "healthy"]),
      image: "/images/menu/Beverages/Fresh Fruit Juice.jpg",
    },
    {
      name: "Soft Drinks",
      category: "DRINKS" as const,
      price: 80,
      description: "Refreshing cold beverages — Coca-Cola, Sprite, Fanta, and more.",
      tastingNotes: JSON.stringify(["refreshing", "cold", "fizzy"]),
      image: "/images/menu/Beverages/Soft Drinks.jpg",
    },
    // Main Dishes (9 items)
    {
      name: "Special Combo",
      category: "PLATES" as const,
      price: 850,
      description: "Our signature platter with a variety of Ethiopian specialties — the must-try at Abole Garden Café.",
      tastingNotes: JSON.stringify(["variety", "authentic", "filling", "signature"]),
      image: "/images/menu/Main Dishes/Special Combo.jpg",
      hot: true,
    },
    {
      name: "Abol Metiro",
      category: "PLATES" as const,
      price: 650,
      description: "Traditional Ethiopian dish with rich flavors and aromatic spices.",
      tastingNotes: JSON.stringify(["spiced", "traditional", "aromatic"]),
      image: "/images/menu/Main Dishes/Abol Metiro.jpg",
      hot: true,
    },
    {
      name: "Fresh Injera with Wat",
      category: "PLATES" as const,
      price: 450,
      description: "Traditional spongy injera with your choice of wat — the heart of Ethiopian cuisine.",
      tastingNotes: JSON.stringify(["tangy", "spicy", "authentic", "traditional"]),
      image: "/images/menu/Main Dishes/Fresh Injera with Wat.jpg",
      hot: true,
    },
    {
      name: "Tibs (Ethiopian Stir-Fry)",
      category: "PLATES" as const,
      price: 600,
      description: "Sautéed meat with onions, peppers, and Ethiopian spices.",
      tastingNotes: JSON.stringify(["savory", "spiced", "tender", "aromatic"]),
      image: "/images/menu/Main Dishes/Tibs (Ethiopian Stir-Fry).jpg",
      hot: true,
    },
    {
      name: "Kitfo (Ethiopian Steak Tartare)",
      category: "PLATES" as const,
      price: 750,
      description: "Finely minced raw beef seasoned with mitmita and Ethiopian butter.",
      tastingNotes: JSON.stringify(["spiced", "rich", "traditional", "premium"]),
      image: "/images/menu/Main Dishes/Kitfo (Ethiopian Steak Tartare).jpg",
      hot: true,
    },
    {
      name: "Fasting Platter (Vegan)",
      category: "PLATES" as const,
      price: 500,
      description: "Assorted vegan dishes perfect for fasting days or plant-based diets.",
      tastingNotes: JSON.stringify(["vegan", "healthy", "variety", "flavorful"]),
      image: "/images/menu/Main Dishes/Fasting Platter (Vegan).jpg",
      hot: true,
    },
    {
      name: "Chicken Shawarma with Rice",
      category: "PLATES" as const,
      price: 550,
      description: "Tender chicken shawarma served with seasoned rice.",
      tastingNotes: JSON.stringify(["savory", "spiced", "filling", "middle-eastern"]),
      image: "/images/menu/Main Dishes/Chicken Shawarma with Rice.jpg",
      hot: true,
    },
    {
      name: "Pizza Margherita",
      category: "PLATES" as const,
      price: 650,
      description: "Classic pizza with mozzarella, tomato sauce, and fresh basil — baked to perfection.",
      tastingNotes: JSON.stringify(["cheesy", "fresh", "classic", "italian"]),
      image: "/images/menu/Main Dishes/Pizza Margherita.jpg",
      hot: true,
    },
    {
      name: "Cheeseburger",
      category: "PLATES" as const,
      price: 500,
      description: "Juicy beef burger with cheese, lettuce, tomato, and special sauce.",
      tastingNotes: JSON.stringify(["juicy", "cheesy", "satisfying"]),
      image: "/images/menu/Main Dishes/Cheeseburger.jpg",
      hot: true,
    },
    // Bakes & Desserts (5 items)
    {
      name: "Cake (Slice)",
      category: "BAKES" as const,
      price: 200,
      description: "Homemade cake — ask about today's flavors.",
      tastingNotes: JSON.stringify(["sweet", "moist", "delightful"]),
      image: "/images/menu/Bakes and desserts/Cake (Slice).jpg",
    },
    {
      name: "Ambasha (Ethiopian Bread)",
      category: "BAKES" as const,
      price: 120,
      description: "Traditional Ethiopian flatbread with a hint of spice.",
      tastingNotes: JSON.stringify(["aromatic", "traditional", "soft"]),
      image: "/images/menu/Bakes and desserts/Ambasha (Ethiopian Bread).jpg",
    },
    {
      name: "Dabo (Ethiopian Honey Bread)",
      category: "BAKES" as const,
      price: 150,
      description: "Sweet Ethiopian bread with honey and spices.",
      tastingNotes: JSON.stringify(["sweet", "aromatic", "fluffy"]),
      image: "/images/menu/Bakes and desserts/Dabo (Ethiopian Honey Bread.jpg",
    },
    {
      name: "Fresh Pastries",
      category: "BAKES" as const,
      price: 180,
      description: "Selection of freshly baked pastries — croissants, danishes, and more.",
      tastingNotes: JSON.stringify(["buttery", "flaky", "fresh"]),
      image: "/images/menu/Bakes and desserts/Fresh Pastries.jpg",
    },
    {
      name: "Cardamom Kouign-Amann",
      category: "BAKES" as const,
      price: 220,
      description: "French pastry with caramelized sugar and aromatic cardamom.",
      tastingNotes: JSON.stringify(["caramelized", "buttery", "aromatic", "premium"]),
      image: "/images/menu/Bakes and desserts/Cardamom Kouign-Amann.jpg",
    },
  ];

  for (const item of items) {
    const existing = await prisma.menuItem.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.menuItem.create({ data: item });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
