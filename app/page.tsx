
import Image from "next/image";
<<<<<<< Updated upstream
import { Home, CalendarCheck, Images, User2, Calendar1, Calendar } from "lucide-react";
=======
import Link from "next/link";
import { Home, CalendarCheck, User2, Calendar } from "lucide-react";
>>>>>>> Stashed changes

export default function HomePage() {
  return (
    <main className="mx-auto bg-white min-h-screen shadow-sm">
      <section className="relative">
<<<<<<< Updated upstream
  <div className="h-35 bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
    
    <Image
      src="/logo.png"
      alt="logo"
      width={160}
      height={120}
      className="object-contain"
    />
  </div>
   <div className="h-2" />
   <img src="/card.png" alt=""
   
   className=" object-center"  />
  <div className="h-5" />
</section>

      
=======
        <div className="h-35 bg-gradient-to-b from-pink-200 to-pink-50 flex items-center justify-center">
          <Image src="/logo.png" alt="logo" width={160} height={120} className="object-contain" />
        </div>

        <div className="h-2" />
        <img src="/card.png" alt="" className="object-center" />
        <div className="h-5" />
      </section>

      {/* ผลงาน */}
>>>>>>> Stashed changes
      <section className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">ผลงาน</h2>
        <div className="rounded-3xl border border-pink-100 shadow-sm bg-white p-3">
          <div className="grid grid-cols-3 gap-3">
            {["/work1.jpg", "/work2.jpg", "/work3.jpg"].map((src, i) => (
<<<<<<< Updated upstream
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-2xl ring-1 ring-pink-100"
              >
=======
              <div key={i} className="aspect-square overflow-hidden rounded-2xl ring-1 ring-pink-100">
>>>>>>> Stashed changes
                <Image src={src} alt={`work-${i + 1}`} width={300} height={300} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-right mt-2">
<<<<<<< Updated upstream
            <a className="text-xs text-pink-600 hover:underline" href="#">
              เพิ่มเติม
            </a>
=======
            <Link className="text-xs text-pink-600 hover:underline" href="/gallery">เพิ่มเติม</Link>
>>>>>>> Stashed changes
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
    
      <section className="px-4 mt-6 pb-24 ">
        <div className="grid grid-cols-2 gap-4">
          <IdeaCard
            img="/Idea1.png"
            title="มัดรวม 50+ ไอเดียลายเล็บฮาโลวีนสุดเก๋ เอาใจสายทำเล็บ"
            desc="สำหรับใครที่กำลังมองหาไอเดียลายเล็บทำต้อนรับวันฮาโลวีนวันนี้เราเอามาฝากเพื่อน ๆ กันค่ะ 
            เพราะเดือนตุลาคมมีเทศกาลประจำเดือนอย่าง “ฮาโลวีน” ที่กำลังจะมาถึง"
          />
          <IdeaCard
            img="/Idea2.png"
            title="ไอเดียทาเล็บ ลายคริสต์มาส 2024"
            desc="จะถึงเทศกาลแห่งความสนุกสนานอย่าง คริสต์มาส ทั้งที ก็ต้องมาดู ไอเดียเล็บ ธีมคริสต์มาส🎄 สุดคิ้วท์ ไปทำรับวันคริสต์มาสกันซะหน่อย! 
            ใครที่เตรียมเสื้อสีเขียวสีแดงไว้ใส่ในวันคริสต์มาสนี้แล้วก็อย่าลืมเพิ่มความสนุกสนานด้วยการทาเล็บเป็นลายคริสต์มาสต่างๆ กันนะคะ"
          />
        </div>
      </section>
=======
      {/* โปรโมชั่น */}
      <section className="mt-6 px-4 pb-24">
        <div className="rounded-[22px] bg-white border border-gray-100 shadow-sm p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">โปรโมชั่น</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <PromoCard
              img="/promo1.jpg"
              title="โปร “ทาสีเจล + ล้างทำความสะอาด”"
              desc="เลือกสีได้ไม่จำกัดโทน ฟรี ตะไบ/ขัดผิวเล็บ และท็อปเจลเงา"
              oldPrice={590}
              price={459}
              href="/reserve?serviceId=svc-03&promo=gel-basic"
              badge="ถึงสิ้นเดือนนี้"
            />
            <PromoCard
              img="/promo2.jpg"
              title="โปร “ถอด PVC + ต่อเล็บ + ทาสีเจล”"
              desc="ทรงสวย งานละเอียด ฟรี เก็บทรง/ขัดผิวเล็บ"
              oldPrice={1090}
              price={890}
              href="/reserve?serviceId=svc-01&promo=pvc-plus-gel"
              badge="ฮิต!"
            />
          </div>
        </div>
      </section>

>>>>>>> Stashed changes
      <BottomNav />
    </main>
  );
}

<<<<<<< Updated upstream
function IdeaCard({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) {
  return (
    <article className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden bg-white">
      <div className="relative h-28 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-3">
          {desc}
        </p>
=======
function PromoCard({ img, title, desc, price, oldPrice, href, badge }: {
  img: string; title: string; desc: string; price: number; oldPrice?: number; href: string; badge?: string;
}) {
  return (
    <article className="rounded-2xl overflow-hidden ring-1 ring-pink-100 bg-white shadow-[0_8px_20px_rgba(255,182,193,0.18)]">
      <div className="relative h-36 w-full">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        {badge && <span className="absolute left-3 top-3 rounded-full bg-rose-500 text-white text-[11px] px-2 py-1 shadow">{badge}</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</p>
        <div className="mt-3 flex items-end gap-2">
          {oldPrice && <span className="text-xs text-gray-400 line-through">฿{oldPrice.toLocaleString()}</span>}
          <span className="text-lg font-bold text-rose-600">฿{price.toLocaleString()}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">*เงื่อนไขโปรอาจเปลี่ยนแปลง</span>
          <a href={href} className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-pink-500 hover:bg-pink-600 shadow-sm">
            จองโปรนี้
          </a>
        </div>
>>>>>>> Stashed changes
      </div>
    </article>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "หน้าแรก", href: "/" },
    { icon: Calendar, label: "จองคิว", href: "/booking" },
    { icon: CalendarCheck, label: "จองทั้งหมด", href: "/all-bookings" },
    { icon: User2, label: "บัญชีฉัน", href: "/account" },
  ];
<<<<<<< Updated upstream

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
=======
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-pink-50/80 backdrop-blur border-t border-pink-100 z-50">
      <ul className="mx-auto max-w-screen-sm flex items-center justify-around py-2">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <Link href={href} className="flex flex-col items-center gap-1 hover:text-pink-800">
              <Icon className="h-5 w-5 text-pink-600" />
              <span className="text-[11px] text-pink-700">{label}</span>
            </Link>
>>>>>>> Stashed changes
          </li>
        ))}
      </ul>
    </nav>
  );
}
