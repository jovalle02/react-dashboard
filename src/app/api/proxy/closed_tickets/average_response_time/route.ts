import { NextResponse } from "next/server";

export async function GET() {
  const endpoint = `${process.env.BACKEND_API_URL}/closed_tickets/average_response_time`;

  try {
    const res = await fetch(endpoint, { method: "GET" });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
