import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/backend";

// Forwards order requests to the Express backend, which owns pricing
// (recalculated server-side from current menu prices), persistence, and
// status tracking.
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const order = await backendFetch("/orders", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    if (err instanceof BackendError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Order service is unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
