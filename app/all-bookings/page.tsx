"use client";

import { useEffect, useMemo, useState } from "react";
import LayoutWrapper from "../components/LayoutWrapper";

type Status = "PENDING" | "CONFIRMED" | "CANCELLED";
type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  createdAt: string;
  status: Status;
  paymentMethod?: string;
  paymentRef?: string;
  paidAt?: string;
};

const TABS: { key: Status; label: string }[] = [
  { key: "PENDING", label: "รอเข้ารับบริการ" },
  { key: "CONFIRMED", label: "เข้ารับบริการแล้ว" },
  { key: "CANCELLED", label: "ยกเลิก" },
];

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Status>("PENDING");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = (await res.json()) as Booking[];
      setBookings(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => bookings.filter((b) => b.status === tab),
    [bookings, tab]
  );

  const cancelOne = async (id: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });
    await load();
  };

  const completeOne = async (id: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CONFIRMED" }),
    });
    await load();
  };

  return (
    <LayoutWrapper>
      <h1 className="text-[15px] font-semibold text-pink-600 mb-3 mt-4">
        จองทั้งหมด
      </h1>

      <div className="mx-auto mb-4">
        <div className="w-full rounded-full bg-pink-100/60 border border-pink-200 p-1 grid grid-cols-3 text-[12px]">
          {TABS.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={[
                  "h-8 rounded-full transition",
                  active ? "bg-pink-500 text-white shadow-sm" : "text-gray-700 hover:bg-pink-50",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 mt-6 text-center">กำลังโหลด…</p>
      ) : filtered.length === 0 ? (
        <div className="mt-10 text-center text-gray-400">
          <p className="text-lg">— ไม่พบรายการ —</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((b) => (
            <li
              key={b.id}
              className="rounded-3xl border border-pink-100 bg-white p-4 shadow-[0_6px_14px_rgba(255,182,193,0.18)]"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-[64px] h-[64px] rounded-2xl bg-pink-50 ring-1 ring-pink-100" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {b.serviceTitle}
                    </h3>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    #{b.id} • {new Date(b.createdAt).toLocaleString("th-TH")}
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    วันที่: <span className="font-medium">{b.date}</span> เวลา:{" "}
                    <span className="font-medium">{b.time}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {b.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => completeOne(b.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-pink-500 hover:bg-pink-600"
                        >
                          เข้ารับบริการแล้ว
                        </button>
                        <button
                          onClick={() => cancelOne(b.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50"
                        >
                          ยกเลิก
                        </button>
                      </>
                    )}

                    {b.status === "CONFIRMED" && (
                      <span className="text-xs text-gray-500">
                        ชำระเงิน:{" "}
                        {b.paidAt
                          ? new Date(b.paidAt).toLocaleString("th-TH")
                          : "-"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </LayoutWrapper>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string }> = {
    PENDING: { label: "รอเข้ารับบริการ", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
    CONFIRMED: { label: "เข้ารับบริการแล้ว", className: "bg-green-50 text-green-700 ring-1 ring-green-200" },
    CANCELLED: { label: "ยกเลิก", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
  };
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${map[status].className}`}>
      {map[status].label}
    </span>
  );
}
