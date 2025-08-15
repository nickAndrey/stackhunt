import { db } from '@/shared/db/db';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { AppointmentsPage } from './Page';

async function getAppointments(): Promise<boolean> {
  const usersWithAdminRole = await db.staff.where('role').equals('admin').count();

  return new Promise((resolve) => {
    setTimeout(() => resolve(usersWithAdminRole > 0), 1000);
  });
}

export function AppointmentsPageLoader() {
  const Loader = createPageLoader('appointments', getAppointments);
  return <Loader>{() => <AppointmentsPage />}</Loader>;
}
