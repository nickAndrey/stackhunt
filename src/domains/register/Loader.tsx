import { db } from '@/shared/db/db';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { RegisterPage } from './Page';

async function checkForAdminRoleUsers(): Promise<boolean> {
  const usersWithAdminRole = await db.staff.where('role').equals('admin').count();

  return new Promise((resolve) => {
    setTimeout(() => resolve(usersWithAdminRole > 0), 2000);
  });
}

export function RegisterPageLoader() {
  const Loader = createPageLoader('login-page', checkForAdminRoleUsers);
  return <Loader>{(data) => <RegisterPage isAdminUser={data} />}</Loader>;
}
