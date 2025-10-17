"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User2 } from "lucide-react";
import { useMemo, useState } from "react";
import LayoutWrapper from "../../components/LayoutWrapper";

export default function ConfirmPage() {
  const q = useSearchParams();
  const router = useRouter();

  const serviceId = q.get("serviceId") ?? "";
  const date = q.get("date") ?? "";
  const time = q.get("time") ?? "";

  const title = useMemo(() => {
    if (serviceId === "svc-01") return "ถอดPVC และต่อเล็บ";
    if (serviceId === "svc-02") return "ถอดPVC ทาสีเจล";
    if (serviceId === "svc-03") return "ทาสีเจล";
    return "บริการอื่น ๆ";
  }, [serviceId]);

  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!serviceId || !date || !time) {
      alert("กรุณาเลือกบริการ/วัน/เวลาให้ครบ");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, serviceTitle: title, date, time }),
      });

      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json") ? await res.json() : { error: await res.text() };

      if (!res.ok) {
        alert(`สร้างการจองไม่สำเร็จ (${res.status}) : ${(payload as any)?.error || "unknown"}`);
        return;
      }

      const bk = payload as { id?: string };
      if (!bk?.id) {
        alert("สร้างการจองแล้ว แต่ไม่ได้รับรหัสการจอง");
        return;
      }

      router.push(`/pay/${bk.id}`);
    } catch (err: any) {
      alert(`เกิดข้อผิดพลาด: ${String(err?.message || err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LayoutWrapper>
      <h2 className="text-sm font-semibold text-pink-600 mb-3 mt-4">ยืนยันการจอง</h2>

      <div className="rounded-3xl border border-pink-100 shadow-[0_6px_14px_rgba(255,182,193,0.25)] bg-pink-50/60 p-4">
        <div className="flex gap-3">
          <div className="relative w-[96px] h-[96px] rounded-2xl bg-white ring-1 ring-pink-100 overflow-hidden" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-pink-500"/><span>{date || "xx/xx/xxxx"}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-pink-500"/><span>{time || "00:00"}</span></div>
              <div className="flex items-center gap-2"><User2 className="h-4 w-4 text-pink-500"/><span>1 ท่าน</span></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button onClick={handleCreate} disabled={submitting} className={`px-6 py-2 rounded-xl text-sm font-semibold shadow-sm ${submitting ? "bg-pink-300 text-white cursor-not-allowed" : "bg-pink-400 text-white hover:bg-pink-500"}`}>
            {submitting ? "กำลังสร้าง..." : "ยืนยันจอง"}
          </button>
        </div>

        <div className="mt-3 text-center">
          <Link href={`/reserve?serviceId=${serviceId}&date=${date}&time=${time}`} className="text-xs text-pink-600 underline">กลับไปแก้ไข</Link>
        </div>
      </div>
    </LayoutWrapper>
  );
}
