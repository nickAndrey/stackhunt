import { db } from '@/shared/db/db';
import staff from '@/shared/temp/data/dump-staff-members.json';
import type { Staff } from '@/shared/types/staff';

export async function createStubMembers() {
  const newStaff = (staff as Staff[]).map((item) => ({ ...item, id: crypto.randomUUID() }));
  await db.staff.bulkAdd(newStaff);
}
