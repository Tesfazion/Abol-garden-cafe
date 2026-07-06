import jwt from "jsonwebtoken";
import env from "../config/env";

const JWT_SECRET = env.jwtSecret;
const JWT_EXPIRES_IN = env.jwtExpiresIn as jwt.SignOptions["expiresIn"];

export interface TokenPayload {
  sub: string; // user id
  role: "CUSTOMER" | "STAFF" | "ADMIN";
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
