"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CalendarDays, Clock, Home, CalendarCheck, User2 } from "lucide-react";
import Link from "next/link";

type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  createdAt: string;
  status: "PENDING";
};

export default function ReservePage() {
  const params = useSearchParams();
  const router = useRouter();

  const serviceId = params.get("service");
  const [serviceTitle, setServiceTitle] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  // โหลดข้อมูลชื่อบริการจาก localStorage (อ้างอิงหน้า booking)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bookings-services");
      if (raw && serviceId) {
        const all = JSON.parse(raw);
        const s = all.find((x: any) => x.id === serviceId);
        if (s) setServiceTitle(s.title);
      }
    } catch {}
  }, [serviceId]);

  const handleConfirm = () => {
    if (!date || !time) {
      alert("กรุณาเลือกวันและเวลา");
      return;
    }

    const booking: Booking = {
      id: `bk_${Date.now()}`,
      serviceId: serviceId || "unknown",
      serviceTitle: serviceTitle || "บริการที่เลือก",
      date,
      time,
      createdAt: new Date().toISOString(),
      status: "PENDING",
    };

    const old = localStorage.getItem("bookings");
    const arr = old ? JSON.parse(old) : [];
    arr.unshift(booking);
    localStorage.setItem("bookings", JSON.stringify(arr));

    router.push("/all-bookings");
  };

  return (
    <main className="mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800">
      {/* Header */}
      <header className="relative">
        <div className="h-36 bg-gradient-to-b from-pink-200 to-pink-50 flex flex-col items-center justify-center">
          <img src="/logo.png" alt="logo" width={160} className="object-contain" />
        </div>
      </header>

      <section className="px-4 pb-28 pt-4">
        <h2 className="text-sm font-semibold text-pink-600 mb-3">เลือกวัน เวลา</h2>

        <div className="rounded-3xl border border-pink-100 shadow-sm bg-white/80 backdrop-blur-sm p-4">
          <div className="font-semibold text-gray-700 mb-2">{serviceTitle}</div>
          <p className="text-sm text-gray-600 mb-4">
            กรุณาเลือกวันที่และเวลาที่สะดวกในการเข้ารับบริการ
          </p>

          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-pink-500" /> วันที่
              </span>
              <input
                type="date"
                className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-pink-500" /> เวลา
              </span>
              <input
                type="time"
                className="border rounded-xl p-2 text-sm mt-1 focus:outline-pink-400"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>

            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                className="rounded-xl bg-pink-400 text-white px-6 py-2 text-sm font-semibold hover:bg-pink-500 active:bg-pink-600 shadow-sm"
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "หน้าแรก", href: "/" },
    { icon: CalendarCheck, label: "จองคิว", href: "/booking" },
    { icon: CalendarDays, label: "จองทั้งหมด", href: "/all-bookings" },
    { icon: User2, label: "บัญชีฉัน", href: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100">
      <ul className="flex items-center justify-around py-2">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <Link href={href} className="flex flex-col items-center gap-1 hover:text-pink-800">
              <Icon className="h-5 w-5 text-pink-600" />
              <span className="text-[11px] text-pink-700">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
