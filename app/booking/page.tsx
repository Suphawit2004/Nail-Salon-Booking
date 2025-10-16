"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Home, CalendarCheck, User2, Calendar } from 'lucide-react';

type Service={id:string;title:string;bullets:string[];note?:string;thumbnail?:string;};
const SERVICES:Service[]=[
  {id:'svc-01',title:'ถอดPVC และต่อเล็บ',bullets:['งานละเอียด','ทรงสวย','ฟรีตะไบ/ขัดผิวเล็บ','สีทา'],note:'*เวลาโดยประมาณ 90–120 นาที',thumbnail:'/thumb-1.png'},
  {id:'svc-02',title:'ถอดPVC ทาสีเจล',bullets:['คละสีฟรี','โทนสุภาพ/นู้ด','ฟรีตะไบ/ขัดผิวเล็บ'],note:'*ประมาณ 60–90 นาที',thumbnail:'/thumb-2.png'},
  {id:'svc-03',title:'ทาสีเจล',bullets:['งานละเอียด','ล้างเก่า/ทำความสะอาด','สีทา'],note:'*ประมาณ 45–60 นาที',thumbnail:'/thumb-3.png'}
];

export default function BookingPage(){
  return (
    <main className='mx-auto min-h-screen max-w-screen-sm bg-white text-gray-800 overflow-y-auto'>
      <header className='relative'>
        <div className='h-36 bg-gradient-to-b from-pink-200 to-pink-50 flex flex-col items-center justify-center'>
          <Image src='/logo.png' alt='logo' width={160} height={120} className='object-contain'/>
        </div>
      </header>
      <section className='px-4 pt-4 pb-28'>
        <h2 className='text-sm font-semibold text-pink-600 mb-3'>เลือกบริการ</h2>
        <div className='space-y-4'>
          {SERVICES.map(s=> (
            <div key={s.id} className='rounded-3xl border border-pink-100 shadow-sm bg-white/80 backdrop-blur-sm p-3 sm:p-4 flex gap-3'>
              <div className='relative w-[88px] h-[88px] rounded-2xl bg-pink-50 border border-pink-100 overflow-hidden'>
                {s.thumbnail && <Image src={s.thumbnail} alt={s.title} fill className='object-cover'/>}
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-gray-700 mb-1'>{s.title}</div>
                <div className='rounded-2xl bg-white border border-pink-100 p-3 text-[13px] leading-relaxed text-gray-600'>
                  <ul className='list-disc pl-5 space-y-0.5'>{s.bullets.map((b,i)=>(<li key={i}>{b}</li>))}</ul>
                  {s.note && <div className='text-[12px] text-gray-400 mt-2'>{s.note}</div>}
                </div>
                <div className='mt-2 flex justify-end gap-2'>
                  <Link href={`/reserve/${s.id}`} className='inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-white bg-pink-400 hover:bg-pink-500 active:bg-pink-600 transition-colors shadow-sm'>จอง</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
