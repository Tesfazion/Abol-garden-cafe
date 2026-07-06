import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  try {
    const summary = await backendFetch("/admin/summary", {
      method: "GET",
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    return NextResponse.json(summary);
  } catch (err) {
    if (err instanceof BackendError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    return NextResponse.json({ error: "Admin summary service unavailable." }, { status: 502 });
  }
}
