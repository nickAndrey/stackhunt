import { createPageLoader } from '@/shared/utils/createPageLoader';
import { PatientsPage } from './Page';
import { fetchPatients } from './services/fetch-patients';

export function PatientsPageLoader() {
  const Loader = createPageLoader('patients', fetchPatients);
  return <Loader>{(data) => <PatientsPage data={data} />}</Loader>;
}
