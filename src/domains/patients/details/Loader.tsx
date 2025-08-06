import { db } from '@/shared/db/db';
import { getPatientWithRelatedData } from '@/shared/services/patients/get-patient-with-related-data';
import type { Patient } from '@/shared/types/patient';
import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { PatientPage } from './Page';

async function fetchPatientFromIndexedDB(
  id?: string
): Promise<{ patient: Patient; staff: Staff[] }> {
  if (!id) throw new Error('Invalid patient id');

  const staff = await db.staff.toArray();
  const patient = await getPatientWithRelatedData(id);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ patient, staff }), 2000);
  });
}

export function PatientPageLoader() {
  const Loader = createPageLoader('patient', fetchPatientFromIndexedDB);
  return <Loader>{(data) => <PatientPage data={data} />}</Loader>;
}
