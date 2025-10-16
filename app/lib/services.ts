export type Service = {
  id: string;
  title: string;
  bullets: string[];
  note?: string;
  thumbnail?: string;
  durationMin?: number;
  price?: number;
};

export const SERVICES: Service[] = [
  { id: "svc-01", title: "ถอดPVC และต่อเล็บ", bullets: ["งานละเอียด","ทรงสวย","ฟรีตะไบ/ขัดผิวเล็บ","สีทา"], note: "*เวลาโดยประมาณ 90–120 นาที", thumbnail: "/thumb-1.png", durationMin: 120, price: 890 },
  { id: "svc-02", title: "ถอดPVC ทาสีเจล", bullets: ["คละสีฟรี","โทนสุภาพ/นู้ด","ฟรีตะไบ/ขัดผิวเล็บ"], note: "*ประมาณ 60–90 นาที", thumbnail: "/thumb-2.png", durationMin: 90, price: 690 },
  { id: "svc-03", title: "ทาสีเจล", bullets: ["งานละเอียด","ล้างเก่า/ทำความสะอาด","สีทา"], note: "*ประมาณ 45–60 นาที", thumbnail: "/thumb-3.png", durationMin: 60, price: 490 },
];

export function getServiceById(id?: string | null) {
  return SERVICES.find(s => s.id === id);
}
