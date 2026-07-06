import "dotenv/config";

function parsePort(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isNaN(parsed) ? 8869 : parsed;
}

function parseCorsOrigins(value: string | undefined): string[] {
  if (!value) {
    return ["http://localhost:3000", "http://localhost:1995"];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const env = {
  port: parsePort(process.env.PORT),
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  mongoUri: process.env.MONGO_URI ?? "mongodb://localhost:27017/cafe",
  jwtSecret: process.env.JWT_SECRET ?? "development-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL ?? "admin@abolgardencafe.et",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD ?? "adminpass123",
} as const;

export const isProduction = env.nodeEnv === "production";

export default env;
