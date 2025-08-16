import { db } from '@/shared/db/db';
import type { Appointment } from '@/shared/types/appointment';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { AppointmentsPage } from './Page';

async function getAppointments(): Promise<Appointment[]> {
  const appointments = await db.appointments.where('entity_type').equals('staff').toArray();
  return new Promise((resolve) => setTimeout(() => resolve(appointments), 1000));
}

export function AppointmentsPageLoader() {
  const Loader = createPageLoader('appointments', getAppointments);
  return <Loader>{(data) => <AppointmentsPage data={data} />}</Loader>;
}
