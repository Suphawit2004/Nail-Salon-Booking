import { NextResponse } from "next/server";
import { readBookings, writeBookings } from "@/app/lib/store";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json().catch(() => ({}));
  const { status } = body as { status?: "PENDING" | "CONFIRMED" | "CANCELLED" };
  if (!status) return NextResponse.json({ error: "status required" }, { status: 400 });

  const list = await readBookings();
  const idx = list.findIndex(b => b.id === id);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  list[idx] = { ...list[idx], status };
  await writeBookings(list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const list = await readBookings();
  const next = list.filter(b => b.id !== id);
  if (next.length === list.length) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  await writeBookings(next);
  return NextResponse.json({ ok: true });
}
