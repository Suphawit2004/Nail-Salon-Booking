"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";

const OPEN = 9;   // 09:00
const CLOSE = 20; // 20:00 (ช่องสุดท้าย 19:30)

function generateSlots(stepMin = 30) {
  const slots: string[] = [];
  for (let h = OPEN; h < CLOSE; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

export default function ReservePage() {
  const router = useRouter();
  const q = useSearchParams();

  const serviceId = q.get("serviceId") ?? "svc-01";
  const serviceTitle =
    serviceId === "svc-01" ? "ถอดPVC และต่อเล็บ" : serviceId === "svc-02" ? "ถอดPVC ทาสีเจล" : "ทาสีเจล";

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const slots = useMemo(() => generateSlots(30), []);

  const handleNext = () => {
    if (!date || !time) return alert("กรุณาเลือกวันและเวลา");
    router.push(`/reserve/confirm?serviceId=${serviceId}&date=${date}&time=${time}`);
  };

  return (
    <main className="mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800">
      <div className="h-36 bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={160} height={120} />
      </div>

      <section className="px-4 pt-4 pb-28">
        <h2 className="text-sm font-semibold text-pink-600 mb-3">เลือกวัน เวลา</h2>

        <div className="rounded-3xl border border-pink-100 bg-pink-50/70 shadow-sm p-4">
          <div className="font-semibold text-gray-800 text-lg">{serviceTitle}</div>
          <p className="text-sm text-gray-600 mt-1">รายละเอียดงานละเอียด ทำความสะอาด ตะไบ/ขัดเล็บ</p>
        </div>

        <div className="mt-5">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-pink-500" /> วันที่
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-xl p-2 text-sm w-full focus:outline-pink-400"
          />
        </div>

        <div className="mt-5">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-pink-500" /> เวลา (ทุกๆ 30 นาที)
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-3 py-2 text-xs rounded-xl border transition ${
                  time === t ? "bg-pink-400 text-white border-pink-400" : "border-pink-200 hover:bg-pink-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link href="/booking" className="px-4 py-2 rounded-xl border border-pink-200 text-sm hover:bg-pink-50">
            ย้อนกลับ
          </Link>
          <button
            onClick={handleNext}
            className="rounded-xl bg-pink-400 text-white px-6 py-2 text-sm font-semibold hover:bg-pink-500 shadow-sm"
          >
            ถัดไป
          </button>
        </div>
      </section>
    </main>
  );
}
