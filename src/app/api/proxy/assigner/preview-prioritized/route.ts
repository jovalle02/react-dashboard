import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const endpoint = `${process.env.BACKEND_API_URL}/assigner/preview-prioritized`;

  try {
    const body = await req.json();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Proxy POST error" }, { status: 500 });
  }
}
