import "dotenv/config";
import { connectDB } from "./config/db";
import { createApp } from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8869;

async function main() {
  // Connect to MongoDB first — fail fast if unreachable
  await connectDB();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Abol Garden Cafe API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
