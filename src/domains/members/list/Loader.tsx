import { db } from '@/shared/db/db';
import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { MembersPage } from './Page';

async function fetchStaffFromIndexedDB() {
  const staffList = await db.staff.toArray();

  const staffItemsWithRelatedTables = await Promise.all(
    staffList.map(async (staff) => await getStaffMemberWithRelatedData(staff.id))
  );

  return staffItemsWithRelatedTables;
}

export function MembersPageLoader() {
  const Loader = createPageLoader('patient', fetchStaffFromIndexedDB);
  return <Loader>{(data) => <MembersPage data={data} />}</Loader>;
}
