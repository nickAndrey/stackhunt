import { db } from '@/shared/db/db';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { LoginPage } from './Page';

async function checkForAdminRoleUsers(): Promise<boolean> {
  const usersWithAdminRole = await db.staff.where('role').equals('admin').count();

  return new Promise((resolve) => {
    setTimeout(() => resolve(usersWithAdminRole > 0), 2000);
  });
}

export function LoginPageLoader() {
  const Loader = createPageLoader('login-page', checkForAdminRoleUsers);
  return <Loader>{(data) => <LoginPage isAdminUser={data} />}</Loader>;
}
