"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Home, CalendarCheck, User2, Calendar } from 'lucide-react';

export default function HomePage(){
  return (
    <main className='mx-auto bg-white min-h-screen shadow-sm'>
      <section className='relative'>
        <div className='h-35 bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center'>
          <Image src='/logo.png' alt='logo' width={160} height={120} className='object-contain' />
        </div>
        <div className='h-2'/>
        <img src='/card.png' alt='' className='object-center'/>
        <div className='h-5'/>
      </section>
      <section className='px-4 mt-6'>
        <h2 className='text-sm font-semibold text-gray-600 mb-3'>ผลงาน</h2>
        <div className='rounded-3xl border border-pink-100 shadow-sm bg-white p-3'>
          <div className='grid grid-cols-3 gap-3'>
            {['/work1.jpg','/work2.jpg','/work3.jpg'].map((src,i)=> (
              <div key={i} className='aspect-square overflow-hidden rounded-2xl ring-1 ring-pink-100'>
                <Image src={src} alt={`work-${i+1}`} width={300} height={300} className='h-full w-full object-cover'/>
              </div>
            ))}
          </div>
          <div className='text-right mt-2'>
            <Link className='text-xs text-pink-600 hover:underline' href='/gallery'>เพิ่มเติม</Link>
          </div>
        </div>
      </section>
      <section className='px-4 mt-6 pb-24'>
        <div className='grid grid-cols-2 gap-4'>
          <IdeaCard img='/Idea1.png' title='มัดรวม 50+ ไอเดียลายเล็บฮาโลวีนสุดเก๋ เอาใจสายทำเล็บ' desc={'ไอเดียลายเล็บต้อนรับฮาโลวีน'} />
          <IdeaCard img='/Idea2.png' title='ไอเดียทาเล็บ ลายคริสต์มาส 2024' desc={'ธีมคริสต์มาสสุดคิ้วท์'} />
        </div>
      </section>
      <BottomNav/>
    </main>
  );
}

function IdeaCard({img,title,desc}:{img:string;title:string;desc:string;}){
  return (
    <article className='rounded-3xl border border-gray-100 shadow-sm overflow-hidden bg-white'>
      <div className='relative h-28 w-full'>
        <Image src={img} alt={title} fill className='object-cover'/>
      </div>
      <div className='p-4'>
        <h3 className='font-semibold text-gray-800'>{title}</h3>
        <p className='text-sm text-gray-500 mt-1 leading-relaxed line-clamp-3'>{desc}</p>
      </div>
    </article>
  );
}

function BottomNav(){
  const items=[{icon:Home,label:'หน้าแรก',href:'/'},{icon:Calendar,label:'จองคิว',href:'/booking'},{icon:CalendarCheck,label:'จองทั้งหมด',href:'/all-bookings'},{icon:User2,label:'บัญชีฉัน',href:'/account'}];
  return (
    <nav className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100'>
      <ul className='flex items-center justify-around py-2'>
        {items.map(({icon:Icon,label,href})=> (
          <li key={label}><Link href={href} className='flex flex-col items-center gap-1 hover:text-pink-800'><Icon className='h-5 w-5 text-pink-600'/><span className='text-[11px] text-pink-700'>{label}</span></Link></li>
        ))}
      </ul>
    </nav>
  );
}
