"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

type Booking = { id:string; serviceId:string; serviceTitle:string; date:string; time:string; createdAt:string; status:"PENDING"|"CONFIRMED"|"CANCELLED" };
const priceOf = (sid:string)=> sid==="svc-01"?890: sid==="svc-02"?690:490;

export default function PaymentPage(){
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [booking,setBooking] = useState<Booking|null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{(async()=>{
    try{ const res = await fetch(`/api/bookings/${id}`,{cache:"no-store"}); const data = await res.json(); if(res.ok) setBooking(data); }
    finally{ setLoading(false); }
  })();},[id]);

  const confirmPayment = async ()=>{ await fetch(`/api/bookings/${id}`,{ method:"PATCH", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ status:"CONFIRMED" })}); router.push("/all-bookings"); };
  const cancelBooking = async ()=>{ await fetch(`/api/bookings/${id}`,{ method:"PATCH", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ status:"CANCELLED" })}); router.push("/all-bookings"); };

  if(loading) return <main className="p-6">กำลังโหลด…</main>;
  if(!booking) return <main className="p-6">ไม่พบข้อมูลการจอง</main>;

  const price = priceOf(booking.serviceId);

  return (
    <main className="mx-auto max-w-screen-sm min-h-screen bg-white">
      <header className="w-full">
        <div className="h-36 w-full bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
          <Image src="/logo.png" alt="logo" width={160} height={120} className="object-contain"/>
        </div>
      </header>

      <section className="px-4 pt-4 pb-28">
        <h2 className="text-sm font-semibold text-pink-600 mb-3">ชำระค่าจอง</h2>

        <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-4 shadow-[0_6px_14px_rgba(255,182,193,0.25)]">
          <div className="flex gap-3">
            <div className="relative w-[100px] h-[100px] rounded-2xl bg-white ring-1 ring-pink-100 overflow-hidden"/>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-lg">{booking.serviceTitle}</div>
              <div className="mt-2 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-pink-500"/><span>{booking.date}</span></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-pink-500"/><span>{booking.time}</span></div>
              </div>
              <div className="mt-3 border-t border-pink-100 pt-2 flex justify-end text-sm">
                <span className="font-semibold text-pink-700 mr-2">ค่าจอง</span>
                <span className="font-semibold text-pink-700">{price.toLocaleString()}฿</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">ช่องทางการชำระเงิน</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-pink-100 p-4">
              <div className="text-sm font-medium">โอนผ่านธนาคาร</div>
              <div className="text-xs text-gray-500 mt-1">ชื่อบัญชี: มินเล็บสวย</div>
              <div className="text-xs text-gray-500">xxx-x-xxxxx-x</div>
              <div className="mt-2 text-xs text-gray-500">อัปโหลดสลิป (ตัวอย่าง)</div>
              <input type="file" className="mt-1 text-xs"/>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 text-sm text-gray-500">(PromptPay/QR สามารถเพิ่มได้)</div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={cancelBooking} className="px-5 py-2 rounded-xl border border-pink-200 text-sm hover:bg-pink-50">ยกเลิก</button>
          <button onClick={confirmPayment} className="px-6 py-2 rounded-xl bg-pink-400 text-white text-sm font-semibold hover:bg-pink-500">ยืนยัน</button>
        </div>
      </section>
    </main>
  );
}
