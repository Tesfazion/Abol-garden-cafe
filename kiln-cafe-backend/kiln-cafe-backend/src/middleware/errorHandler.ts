import { NextFunction, Request, Response } from "express";
import env, { isProduction } from "../config/env";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  const message = isProduction
    ? "Internal server error"
    : err instanceof Error
      ? err.message
      : "Unknown error";

  res.status(500).json({ error: message });
}
