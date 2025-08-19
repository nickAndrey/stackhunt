import { getPatientWithRelatedData } from '@/shared/services/get-patient-with-related-data';
import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { PatientPage } from './Page';

async function fetchPatientFromIndexedDB(id?: string): Promise<{ patient: Patient }> {
  if (!id) throw new Error('Invalid patient id');

  const patient = await getPatientWithRelatedData(id);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ patient: patient }), 1000);
  });
}

export function PatientPageLoader() {
  const Loader = createPageLoader('patient', fetchPatientFromIndexedDB);
  return <Loader>{(data) => <PatientPage data={data} />}</Loader>;
}
