import { NextRequest, NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/backend";

// Forwards booking requests to the Express backend, which owns validation,
// capacity/double-booking checks, and persistence.
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const booking = await backendFetch("/bookings", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    if (err instanceof BackendError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Booking service is unavailable. Please try again shortly." },
      { status: 502 }
    );
  }
}
