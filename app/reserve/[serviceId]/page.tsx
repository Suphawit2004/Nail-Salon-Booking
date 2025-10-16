"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

const SERVICES = [
  { id: "svc-01", title: "ถอดPVC และต่อเล็บ", bullets: ["งานละเอียด","ทรงสวย","ฟรีตะไบ/ขัดผิวเล็บ","สีทา"], note: "*เวลาโดยประมาณ 90–120 นาที", thumbnail: "/thumb-1.png" },
  { id: "svc-02", title: "ถอดPVC ทาสีเจล", bullets: ["คละสีฟรี","โทนสุภาพ/นู้ด","ฟรีตะไบ/ขัดผิวเล็บ"], note: "*ประมาณ 60–90 นาที", thumbnail: "/thumb-2.png" },
  { id: "svc-03", title: "ทาสีเจล", bullets: ["งานละเอียด","ล้างเก่า/ทำความสะอาด","สีทา"], note: "*ประมาณ 45–60 นาที", thumbnail: "/thumb-3.png" },
];

export default function ReserveDynamicPage() {
  const router = useRouter();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = useMemo(() => SERVICES.find(s => s.id === serviceId) || null, [serviceId]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!service) return alert("ไม่พบบริการที่เลือก");
    if (!date || !time) return alert("กรุณาเลือกวันและเวลา");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: service.id, serviceTitle: service.title, date, time }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "สร้างการจองไม่สำเร็จ");
      }
      router.push("/all-bookings");
    } catch (e: any) {
      alert(e?.message || "เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    }
  };

  if (!service) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-screen bg-white p-6">
        <p className="text-sm text-gray-600">ไม่พบบริการที่ต้องการจอง</p>
        <Link href="/booking" className="text-pink-600 text-sm underline">กลับไปหน้าเลือกบริการ</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800">
      <header className="relative">
        <div className="h-36 bg-gradient-to-b from-pink-200 to-pink-50 flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="logo" width={160} height={120} className="object-contain" />
        </div>
      </header>

      <section className="px-4 pt-4 pb-24">
        <h2 className="text-sm font-semibold text-pink-600 mb-3">เลือกวัน เวลา</h2>
        <div className="rounded-3xl border border-pink-100 shadow-sm bg-pink-50/60 p-4">
          <div className="flex gap-3">
            <div className="relative w-[88px] h-[88px] rounded-2xl bg-pink-50 border border-pink-100 overflow-hidden shrink-0">
              {service.thumbnail && (<Image src={service.thumbnail} alt={service.title} fill className="object-cover" />)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{service.title}</div>
              <div className="rounded-2xl bg-white border border-pink-100 p-3 mt-1 text-[13px] text-gray-600">
                <ul className="list-disc pl-5 space-y-0.5">
                  {service.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                {service.note && <div className="text-[12px] text-gray-400 mt-2">{service.note}</div>}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-pink-500" /> วันที่
              </span>
              <input type="date" className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-pink-500" /> เวลา
              </span>
              <input type="time" className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400" value={time} onChange={e => setTime(e.target.value)} />
            </label>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Link href="/booking" className="px-4 py-2 rounded-xl border border-pink-200 text-sm hover:bg-pink-50">ย้อนกลับ</Link>
            <button onClick={handleConfirm} disabled={submitting} className="rounded-xl bg-pink-400 text-white px-6 py-2 text-sm font-semibold hover:bg-pink-500 active:bg-pink-600 shadow-sm disabled:opacity-60">
              {submitting ? "กำลังบันทึก…" : "ยืนยันการจอง"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
