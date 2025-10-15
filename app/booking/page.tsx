"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, CalendarCheck, User2, Calendar } from "lucide-react";

// ----- Types -----
type Service = {
  id: string;
  title: string;
  bullets: string[];
  note?: string;
  href?: string;
  thumbnail?: string;
};

// ----- Mock data (replace with real data/API) -----
const SERVICES: Service[] = [
  {
    id: "svc-01",
    title: "ถอดPVC และต่อเล็บ",
    bullets: ["งานละเอียด", "ทรงสวย", "ฟรีตะไบ/ขัดผิวเล็บ", "สีทา"],
    note: "*เวลาโดยประมาณ 90–120 นาที",
    thumbnail: "/thumb-1.png",
    href: "/reserve?service=svc-01",
  },
  {
    id: "svc-02",
    title: "ถอดPVC ทาสีเจล",
    bullets: ["คละสีฟรี", "โทนสุภาพ/นู้ด", "ฟรีตะไบ/ขัดผิวเล็บ"],
    note: "*ประมาณ 60–90 นาที",
    thumbnail: "/thumb-2.png",
    href: "/reserve?service=svc-02",
  },
  {
    id: "svc-03",
    title: "ทาสีเจล",
    bullets: ["งานละเอียด", "ล้างเก่า/ทำความสะอาด", "สีทา"],
    note: "*ประมาณ 45–60 นาที",
    thumbnail: "/thumb-3.png",
    href: "/reserve?service=svc-03",
  },
];

// ----- UI atoms -----
import { useRouter } from "next/navigation";

function useBookings() {
  // simple client-side storage using localStorage
  const read = (): any[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("bookings");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const write = (arr: any[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("bookings", JSON.stringify(arr));
  };
  const add = (b: any) => {
    const arr = read();
    arr.unshift(b);
    write(arr);
  };
  return { read, write, add };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-pink-600 mb-3 select-none">
      {children}
    </h2>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();
  const store = useBookings();

  const handleBook = () => {
    const booking = {
      id: `bk_${Date.now()}`,
      serviceId: service.id,
      serviceTitle: service.title,
      createdAt: new Date().toISOString(),
      status: "PENDING",
    };
    store.add(booking);
    router.push("/all-bookings");
  };

  return (
    <div className="rounded-3xl border border-pink-100 shadow-sm bg-white/80 backdrop-blur-sm p-3 sm:p-4 flex gap-3">
      <div className="shrink-0">
        <div className="relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-2xl bg-pink-50 border border-pink-100 overflow-hidden">
          {service.thumbnail ? (
            <Image src={service.thumbnail} alt={service.title} fill className="object-cover" />
          ) : null}
        </div>
      </div>

      <div className="flex-1">
        <div className="font-semibold text-gray-700 mb-1">{service.title}</div>
        <div className="rounded-2xl bg-white border border-pink-100 p-3 text-[13px] leading-relaxed text-gray-600">
          <ul className="list-disc pl-5 space-y-0.5">
            {service.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {service.note ? (
            <div className="text-[12px] text-gray-400 mt-2">{service.note}</div>
          ) : null}
        </div>
        <div className="mt-2 flex justify-end gap-2">
          {service.href && (
            <Link
              href={service.href}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200"
            >
              รายละเอียด
            </Link>
          )}
          <button
            onClick={handleBook}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-white bg-pink-400 hover:bg-pink-500 active:bg-pink-600 transition-colors shadow-sm"
          >
            จอง
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "หน้าแรก", href: "/" },
    { icon: Calendar, label: "จองคิว", href: "/booking" },
    { icon: CalendarCheck, label: "จองทั้งหมด", href: "/all-bookings" },
    { icon: User2, label: "บัญชีฉัน", href: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100 z-50">
      <ul className="mx-auto max-w-screen-sm flex items-center justify-around py-2">
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

// ----- Page -----
export default function BookingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800 overflow-y-auto">
      {/* Hero */}
      <header className="relative">
        <div className="h-36 bg-gradient-to-b from-pink-200 to-pink-50 flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="logo" width={160} height={120} className="object-contain" />
          <div className="sr-only">มินเล็บสวย - Nail Salon Booking</div>
        </div>
      </header>

      {/* Content */}
      <section className="px-4 pt-4 pb-28">
        <SectionTitle>เลือกบริการ</SectionTitle>
        <div className="space-y-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Bottom Navigation (spacer handled by pb-28) */}
      <BottomNav />
    </main>
  );
}
