import { db } from '@/shared/db/db';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function checkForAdminRoleUsers(): Promise<boolean> {
  const usersWithAdminRole = await db.staff.where('role').equals('admin').count();

  return new Promise((resolve) => {
    setTimeout(() => resolve(usersWithAdminRole > 0), 2000);
  });
}

const LoginPageLoader = createPageLoader('login-page', checkForAdminRoleUsers);

export default LoginPageLoader;
