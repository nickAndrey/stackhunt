import { db } from '@/shared/db/db';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function checkForAdminRoleUsers(): Promise<boolean> {
  const usersWithAdminRole = await db.staff.filter((item) => item.role === 'admin').toArray();

  return new Promise((resolve) => {
    setTimeout(() => resolve(usersWithAdminRole.length > 0), 2000);
  });
}

const LoginPageLoader = createPageLoader('login-page', checkForAdminRoleUsers);

export default LoginPageLoader;
