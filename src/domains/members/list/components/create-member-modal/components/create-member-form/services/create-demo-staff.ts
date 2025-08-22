import { db } from '@/shared/db/db';
import staff from '@/shared/temp/data/dump-staff-members.json';
import type { Staff } from '@/shared/types/staff';
import { getRandomUUID } from '@/shared/utils';

export async function createDemoStaff() {
  const newStaff = (staff as Staff[]).map((item) => ({ ...item, id: getRandomUUID() }));
  await db.staff.bulkAdd(newStaff);
}
