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
    {
      name: "Yirgacheffe Washed",
      category: "COFFEE" as const,
      price: 4.5,
      description: "Light roast, filter brew.",
      tastingNotes: JSON.stringify(["bergamot", "peach", "black tea"]),
      origin: "Gedeb, Ethiopia · 1,950m",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800",
      hot: true,
    },
    {
      name: "House Espresso",
      category: "COFFEE" as const,
      price: 3.2,
      description: "Dark roast blend, built for milk.",
      tastingNotes: JSON.stringify(["dark chocolate", "toasted hazelnut"]),
      origin: "Brazil & Sumatra blend",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    },
    {
      name: "Wood-Fired Sourdough",
      category: "BAKES" as const,
      price: 6.0,
      description: "48-hour ferment, baked to order in the kiln oven.",
      tastingNotes: JSON.stringify(["nutty crust", "open crumb"]),
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800",
      hot: true,
    },
    {
      name: "Kiln-Roasted Tomato Toast",
      category: "PLATES" as const,
      price: 9.5,
      description: "Charred sourdough, whipped ricotta, roast tomato, basil oil.",
      tastingNotes: JSON.stringify(["smoky", "bright acidity"]),
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800",
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
