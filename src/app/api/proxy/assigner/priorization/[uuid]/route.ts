import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const endpoint = `${process.env.BACKEND_API_URL}/assigner/priorization/${uuid}`;

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // optional: forward cookies/auth headers here if needed
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Error fetching final prioritization:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
