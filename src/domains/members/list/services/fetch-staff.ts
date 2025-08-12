import { db } from '@/shared/db/db';
import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';

export async function fetchStaffFromIndexedDB() {
  const staffList = await db.staff.toArray();

  const staffItemsWithRelatedTables = await Promise.all(
    staffList.map(async (staff) => await getStaffMemberWithRelatedData(staff.id))
  );

  return staffItemsWithRelatedTables;
}
