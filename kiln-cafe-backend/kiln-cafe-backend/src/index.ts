import { connectDB } from "./config/db";
import env from "./config/env";
import { createApp } from "./app";

async function main() {
  await connectDB();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Abol Garden Cafe API listening on http://localhost:${env.port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
