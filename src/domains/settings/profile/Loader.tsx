import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import type { AuthCredentials } from '@/shared/types/auth-credentials';
import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { ProfilePage } from './Page';

async function fetchStaffMemberFromIndexedDB(): Promise<{ staff: Staff }> {
  const storedAuth = localStorage.getItem('auth');
  if (!storedAuth) throw new Error('Cannot find authenticated member');

  const authenticatedMember = JSON.parse(storedAuth) as AuthCredentials;
  if (!authenticatedMember.id) throw new Error('Invalid member id');

  const staffMemberAdditionalData = await getStaffMemberWithRelatedData(authenticatedMember.id);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ staff: staffMemberAdditionalData }), 2000);
  });
}

export function ProfilePageLoader() {
  const PageLoader = createPageLoader('settings/profile', fetchStaffMemberFromIndexedDB);
  return <PageLoader>{(data) => <ProfilePage data={data.staff} />}</PageLoader>;
}
