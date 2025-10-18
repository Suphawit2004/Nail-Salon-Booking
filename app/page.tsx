"use client";

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "./components/LayoutWrapper";

export default function HomePage() {
  return (
    <LayoutWrapper>
      <section className="mt-4">
        <div className="rounded-[28px] bg-pink-50 border border-pink-100 shadow-[0_6px_14px_rgba(255,182,193,0.25)] p-4 sm:p-6">
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

      <section className="mt-6">
        <div className="rounded-[22px] bg-white border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 text-center">ผลงาน</h2>
          <div className="grid grid-cols-3 gap-3">
            {["/work1.jpg","/work2.jpg","/work3.jpg"].map((src,i)=>(
              <div key={i} className="aspect-square overflow-hidden rounded-2xl ring-1 ring-pink-100">
                <Image src={src} alt={`work-${i+1}`} width={300} height={300} className="h-full w-full object-cover"/>
              </div>
            ))}
          </div>
          <div className="text-right mt-2">
            <Link href="/gallery" className="text-xs text-pink-600 hover:underline">เพิ่มเติม</Link>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
