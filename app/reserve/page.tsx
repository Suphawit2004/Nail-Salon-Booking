"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

const SERVICES=[
  { id:"svc-01", title:"ถอดPVC และต่อเล็บ" },
  { id:"svc-02", title:"ถอดPVC ทาสีเจล" },
  { id:"svc-03", title:"ทาสีเจล" },
];

export default function ReservePage(){
  const q = useSearchParams();
  const router = useRouter();
  const serviceId = q.get("serviceId") ?? "";
  const service = useMemo(()=> SERVICES.find(s=> s.id===serviceId) || null, [serviceId]);

  const [date,setDate] = useState(q.get("date") ?? "");
  const [time,setTime] = useState(q.get("time") ?? "");

  const handleNext = ()=>{
    if(!service) return alert("กรุณาเลือกบริการ");
    if(!date || !time) return alert("กรุณาเลือกวันและเวลา");
    router.push(`/reserve/confirm?serviceId=${service.id}&date=${date}&time=${time}`);
  };

  return (
    <main className="mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800">
      <header className="w-full">
        <div className="h-36 w-full bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
          <Image src="/logo.png" alt="logo" width={160} height={120} className="object-contain"/>
        </div>
      </header>

      <section className="px-4 pt-4 pb-28">
        <h2 className="text-sm font-semibold text-pink-600 mb-3">เลือกวัน เวลา</h2>

        <div className="rounded-3xl border border-pink-100 shadow-[0_6px_14px_rgba(255,182,193,0.25)] bg-pink-50/60 p-4">
          <div className="flex gap-3">
            <div className="relative w-[88px] h-[88px] rounded-2xl bg-white ring-1 ring-pink-100 overflow-hidden">
              <Image src="/nail-blank.png" alt="thumb" fill className="object-cover"/>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{service? service.title : "ยังไม่ได้เลือกบริการ"}</div>
              <div className="rounded-2xl bg-white border border-pink-100 p-3 mt-1 text-[13px] text-gray-600">
                <p>รายละเอียด: ละเอียด ประณีต สวยคม สีทา/ขัดเล็บ</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-pink-500"/>วันที่</span>
              <input type="date" className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400" value={date} onChange={e=>setDate(e.target.value)}/>
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2"><Clock className="h-4 w-4 text-pink-500"/>เวลา</span>
              <input type="time" className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400" value={time} onChange={e=>setTime(e.target.value)}/>
            </label>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Link href="/booking" className="px-4 py-2 rounded-xl border border-pink-200 text-sm hover:bg-pink-50">ย้อนกลับ</Link>
            <button onClick={handleNext} className="rounded-xl bg-pink-400 text-white px-6 py-2 text-sm font-semibold hover:bg-pink-500 shadow-sm">ถัดไป</button>
          </div>
        </div>
      </section>
    </main>
  );
}
