"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  createdAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const clearAll = async () => {
    await fetch("/api/bookings", { method: "DELETE" });
    await load();
  };

  const cancelOne = async (id: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });
    await load();
  };

  return (
    <main className="mx-auto max-w-screen-sm min-h-screen bg-white p-4">
      <h1 className="text-lg font-semibold text-gray-800">จองทั้งหมด</h1>

      {loading ? (
        <p className="text-sm text-gray-500 mt-3">กำลังโหลด…</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-500 mt-3">ยังไม่มีรายการจอง</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {bookings.map((b) => (
            <li key={b.id} className="rounded-2xl border border-pink-100 p-3 shadow-sm flex items-start justify-between">
              <div>
                <div className="font-medium text-gray-800">{b.serviceTitle}</div>
                <div className="text-xs text-gray-500 mt-0.5">#{b.id} • {new Date(b.createdAt).toLocaleString()} • {b.date} {b.time}</div>
                <div className="mt-1 text-xs">
                  สถานะ: <span className={ b.status === "CANCELLED" ? "text-red-600" : b.status === "CONFIRMED" ? "text-green-600" : "text-amber-600" }>{b.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {b.status !== "CANCELLED" && (
                  <button onClick={() => cancelOne(b.id)} className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 hover:bg-gray-50">ยกเลิก</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <button onClick={clearAll} className="px-3 py-2 rounded-xl text-xs border border-pink-200 hover:bg-pink-50">ล้างทั้งหมด</button>
      </div>
    </main>
  );
}
