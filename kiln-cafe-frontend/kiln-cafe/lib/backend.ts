const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8869/api";

export class BackendError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Thin fetch wrapper for calling the Express backend from Next.js server
 * code (route handlers, server components). Keeps API_BASE_URL and error
 * shape handling in one place.
 */
export async function backendFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : undefined;

  if (!res.ok) {
    throw new BackendError(
      res.status,
      body?.error ?? `Backend request failed with status ${res.status}`
    );
  }

  return body as T;
}
