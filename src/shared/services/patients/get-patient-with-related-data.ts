import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { fetchPatientRelatedData } from './fetch-patient-related-data';

export async function getPatientWithRelatedData(id: string): Promise<Patient> {
  const patient = await db.patients.where('id').equals(id).first();
  const patientRelatedData = await fetchPatientRelatedData(id);

  return new Promise((resolve) => resolve({ ...patient, ...patientRelatedData } as Patient));
}
