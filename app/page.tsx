"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, CalendarCheck, User2, Calendar } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen bg-white text-gray-800">
      <header className="w-full">
        <div className="h-36 w-full bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
          <Image src="/logo.png" alt="Min Nail Salon" width={160} height={120} className="object-contain" priority />
        </div>
      </header>

      <section className="px-4 mt-4">
        <div className="mx-auto max-w-screen-sm rounded-[28px] bg-pink-50 border border-pink-100 shadow-sm p-4 sm:p-6">
          <div className="grid grid-cols-[110px_1fr] gap-4 items-center">
            <div className="relative h-[110px] w-[110px] rounded-2xl bg-white ring-1 ring-pink-100 overflow-hidden">
              <Image src="/banner-nail.jpg" alt="banner" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-[28px] leading-8 font-bold text-rose-700 drop-shadow-sm">
                Min<br/><span className="text-[30px]">Nail Salon</span>
              </h1>
              <p className="mt-2 text-[13px] text-gray-600">
                รับทำเล็บทุกรูปแบบ • พิกัด : คตกหลุม / ตลาดวันมาร์เก็ต หน้า ม.พะเยา
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 mt-5">
        <div className="mx-auto max-w-screen-sm rounded-[22px] bg-white border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">ผลงาน</h2>
          <div className="grid grid-cols-3 gap-3">
            {["/work1.jpg","/work2.jpg","/work3.jpg"].map((src,i)=>(
              <div key={i} className="aspect-square overflow-hidden rounded-2xl ring-1 ring-pink-100">
                <Image src={src} alt={`work-${i+1}`} width={300} height={300} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-right mt-2">
            <Link href="/gallery" className="text-xs text-pink-600 hover:underline">เพิ่มเติม</Link>
          </div>
        </div>
      </section>

      <section className="px-4 mt-5 pb-24">
        <div className="mx-auto max-w-screen-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <IdeaCard img="/Idea1.png" title="50+ ไอเดียลายเล็บฮาโลวีนสุดเก๋" desc="ต้อนรับวันฮาโลวีนด้วยลายเล็บโทนดำ-ส้ม-ม่วง ทั้งสั้นและยาว" />
          <IdeaCard img="/Idea2.png" title="ไอเดียเล็บ คริสต์มาส 2024" desc="ธีมเขียว-แดง-ขาว เพิ่มกลิตเตอร์นิด ๆ ให้ฟีลเฟสติวัล" />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

function IdeaCard({img,title,desc}:{img:string;title:string;desc:string;}){
  return (
    <article className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden bg-white">
      <div className="relative h-28 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-3">{desc}</p>
      </div>
    </article>
  );
}

function BottomNav(){
  const items=[
    {icon:Home,label:"หน้าแรก",href:"/"},
    {icon:Calendar,label:"นัดหมาย",href:"/booking"},
    {icon:CalendarCheck,label:"จองทั้งหมด",href:"/all-bookings"},
    {icon:User2,label:"บัญชีฉัน",href:"/account"},
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100">
      <ul className="mx-auto max-w-screen-sm flex items-center justify-around py-2">
        {items.map(({icon:Icon,label,href})=>(
          <li key={label}><Link href={href} className="flex flex-col items-center gap-1 hover:text-pink-800"><Icon className="h-5 w-5 text-pink-600"/><span className="text-[11px] text-pink-700">{label}</span></Link></li>
        ))}
      </ul>
    </nav>
  );
}
