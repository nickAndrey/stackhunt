import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';

type PatientFields = Pick<
  Patient,
  | 'notes'
  | 'appointments'
  | 'medications'
  | 'conditions'
  | 'allergies'
  | 'tags'
  | 'files'
  | 'medical_flags'
>;
/**
 * Fetches all related medical data for a specific patient from the database.
 */
export async function fetchPatientRelatedData(patientId: string): Promise<PatientFields> {
  const [notes, appointments, medications, conditions, allergies, tags, files, medical_flags] =
    await Promise.all([
      await db.notes.where('patient_id').equals(patientId).toArray(),
      await db.appointments.where('patient_id').equals(patientId).toArray(),
      await db.medications.where('patient_id').equals(patientId).toArray(),
      await db.conditions.where('patient_id').equals(patientId).toArray(),
      await db.allergies.where('patient_id').equals(patientId).toArray(),
      await db.tags.where('patient_id').equals(patientId).toArray(),
      await db.files.where('patient_id').equals(patientId).toArray(),
      await db.medical_flags.where('patient_id').equals(patientId).toArray(),
    ]);

  return {
    notes,
    appointments,
    medications,
    conditions,
    allergies,
    tags,
    files,
    medical_flags,
  };
}
