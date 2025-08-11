import { db } from '@/shared/db/db';
import type { Staff } from '@/shared/types/staff';
import staff from '../data/dump-staff-members.json';

export async function createStubMembers() {
  const newStaff = (staff as Staff[]).map((item) => ({ ...item, id: crypto.randomUUID() }));
  await db.staff.bulkAdd(newStaff);
}
