import { db } from '@/shared/db/db';
import type { AuthCredentials } from '@/shared/types/auth-credentials';
import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { ProfilePage } from './Page';

async function fetchStaffMemberFromIndexedDB(): Promise<{ staff: Staff }> {
  const storedAuth = localStorage.getItem('auth');
  if (!storedAuth) throw new Error('Cannot find authenticated member');

  const parsedMember = JSON.parse(storedAuth) as AuthCredentials;
  if (!parsedMember.id) throw new Error('Invalid member id');

  const staff = await db.staff.where('id').equals(parsedMember.id).first();
  if (!staff) throw new Error('Invalid member id');

  return new Promise((resolve) => {
    setTimeout(() => resolve({ staff }), 2000);
  });
}

export function ProfileLoader() {
  const PageLoader = createPageLoader('settings/profile', fetchStaffMemberFromIndexedDB);
  return <PageLoader>{(data) => <ProfilePage data={data} />}</PageLoader>;
}
