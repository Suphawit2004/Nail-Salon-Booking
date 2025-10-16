import { promises as fs } from "fs";
const DB_PATH = "/tmp/bookings.json";

export type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  createdAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
};

async function ensureFile(){
  try{ await fs.access(DB_PATH); } catch{ await fs.writeFile(DB_PATH, "[]", "utf8"); }
}

export async function readBookings(): Promise<Booking[]> {
  await ensureFile();
  const txt = await fs.readFile(DB_PATH, "utf8");
  try { return JSON.parse(txt) as Booking[]; } catch { return []; }
}

export async function writeBookings(data: Booking[]){
  await ensureFile();
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}
