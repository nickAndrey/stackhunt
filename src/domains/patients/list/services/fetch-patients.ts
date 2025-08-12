import { db } from '@/shared/db/db';
import { getPatientWithRelatedData } from '@/shared/services/get-patient-with-related-data';
import type { Patient } from '@/shared/types/patient';

export async function fetchPatients(): Promise<Patient[]> {
  const patients = await db.patients.toArray();

  const mutatedPatients = await Promise.all(
    patients.map(async (patient) => await getPatientWithRelatedData(patient.id))
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(mutatedPatients), 2000);
  });
}
