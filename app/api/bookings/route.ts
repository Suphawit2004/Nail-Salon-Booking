import { NextResponse } from "next/server";
import { readBookings, writeBookings, Booking } from "@/app/lib/store";

export async function GET(){
  const list = await readBookings();
  list.sort((a,b)=> a.createdAt < b.createdAt ? 1 : -1);
  return NextResponse.json(list);
}

export async function POST(req:Request){
  const body = await req.json();
  const { serviceId, serviceTitle, date, time } = body ?? {};
  if(!serviceId || !serviceTitle || !date || !time){
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  const now = new Date().toISOString();
  const booking: Booking = { id: `bk_${Date.now()}`, serviceId, serviceTitle, date, time, createdAt: now, status: "PENDING" };
  const list = await readBookings();
  list.unshift(booking);
  await writeBookings(list);
  return NextResponse.json(booking,{status:201});
}

export async function DELETE(){
  await writeBookings([]);
  return NextResponse.json({ ok: true });
}
