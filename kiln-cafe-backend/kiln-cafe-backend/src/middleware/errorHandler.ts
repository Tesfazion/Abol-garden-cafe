import { Request, Response, NextFunction } from "express";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err instanceof Error
      ? err.message
      : "Unknown error";

  res.status(500).json({ error: message });
}
