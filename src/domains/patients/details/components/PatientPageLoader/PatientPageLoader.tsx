import { fetchPatientRelatedData } from '@/domains/patients/services/fetch-patient-related-data';
import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function fetchPatientFromIndexedDB(
  id?: string
): Promise<{ patient: Patient; staff: Staff[] }> {
  if (!id) throw new Error('Invalid patient id');

  const staff = await db.staff.toArray();
  const patient = await db.patients.get({ id: id });

  if (!patient) throw new Error('patient Not Found');

  const relatedMedicalData = await fetchPatientRelatedData(patient.id);

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          patient: { ...patient, ...relatedMedicalData },
          staff: staff,
        }),
      2000
    );
  });
}

const PatientPageLoader = createPageLoader('patient', fetchPatientFromIndexedDB);

export default PatientPageLoader;
