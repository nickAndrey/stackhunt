import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { MembersPage } from './Page';
import { fetchStaffFromIndexedDB } from './services/fetch-staff';

async function getDataWithDelay(): Promise<Staff[]> {
  const staff = await fetchStaffFromIndexedDB();
  return new Promise((resolve) => setTimeout(() => resolve(staff), 1000));
}

export function MembersPageLoader() {
  const Loader = createPageLoader('patient', getDataWithDelay);
  return <Loader>{(data) => <MembersPage data={data} />}</Loader>;
}
