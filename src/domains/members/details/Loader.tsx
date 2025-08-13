import { createPageLoader } from '@/shared/utils/createPageLoader';
import { MemberPage } from './Page';
import { fetchStaffMember } from './services/fetch-staff-member';

export function MemberPageLoader() {
  const Loader = createPageLoader('patient', fetchStaffMember);
  return <Loader>{(data) => <MemberPage data={data} />}</Loader>;
}
