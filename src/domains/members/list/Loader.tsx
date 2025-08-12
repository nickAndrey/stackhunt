import { createPageLoader } from '@/shared/utils/createPageLoader';
import { MembersPage } from './Page';
import { fetchStaffFromIndexedDB } from './services/fetch-staff';

export function MembersPageLoader() {
  const Loader = createPageLoader('patient', fetchStaffFromIndexedDB);
  return <Loader>{(data) => <MembersPage data={data} />}</Loader>;
}
