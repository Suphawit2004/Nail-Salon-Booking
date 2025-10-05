import Image from "next/image";
import { Home, CalendarCheck, Images, User2, Calendar1, Calendar } from "lucide-react";

function BottomNav() {
  const items = [
    { icon: Home, label: "หน้าแรก", href: "/" },
    { icon: Calendar, label: "จองคิว", href:"/booking.tsx"},
    { icon: CalendarCheck, label: "จองทั้งหมด", href: "/all-bookings" },
    { icon: User2, label: "บัญชีฉัน", href: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100">
      <ul className="flex items-center justify-around py-2">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="flex flex-col items-center gap-1 hover:text-pink-800"
            >
              <Icon className="h-5 w-5 text-pink-600" />
              <span className="text-[11px] text-pink-700">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
