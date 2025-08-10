import { db } from '@/shared/db/db';
import type { AuthCredentials } from '@/shared/types/auth-credentials';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { SecurityAndPasswordPage } from './Page';

async function getAuthCredentialsFromIndexedDB(): Promise<{ credentials: AuthCredentials }> {
  const storedAuthJson = localStorage.getItem('auth');
  if (!storedAuthJson) throw new Error('No authenticated member found in local storage');

  const { id } = JSON.parse(storedAuthJson) as AuthCredentials;
  if (!id) throw new Error('Authenticated member has no ID');

  const storedCredentials = await db.auth_credentials.where('staff_id').equals(id).first();
  if (!storedCredentials) throw new Error(`No credentials found for member ID ${id}`);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ credentials: storedCredentials }), 2000);
  });
}

export function SP_PageLoader() {
  const PageLoader = createPageLoader(
    'settings/security-and-password',
    getAuthCredentialsFromIndexedDB
  );

  return <PageLoader>{(data) => <SecurityAndPasswordPage data={data.credentials} />}</PageLoader>;
}
