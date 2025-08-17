import { createPageLoader } from '@/shared/utils/createPageLoader';
import { AppointmentsPage } from './Page';
import { getStaffAppointments } from './services/get-staff-appointments';

export function AppointmentsPageLoader() {
  const Loader = createPageLoader('appointments', getStaffAppointments);
  return <Loader>{(data) => <AppointmentsPage data={data} />}</Loader>;
}
