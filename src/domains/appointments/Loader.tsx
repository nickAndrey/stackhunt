import { getAppointmentsWithParticipants } from '@/shared/services/appointments';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { AppointmentsPage } from './Page';

export function AppointmentsPageLoader() {
  const Loader = createPageLoader('appointments', () => getAppointmentsWithParticipants());
  return <Loader>{(data) => <AppointmentsPage data={data} />}</Loader>;
}
