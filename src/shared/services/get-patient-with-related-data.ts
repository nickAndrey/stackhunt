import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';

export async function getPatientWithRelatedData(patientId: string): Promise<Patient> {
  const patient = await db.patients.where('id').equals(patientId).first();

  if (!patient) throw new Error(`Patient with id ${patientId} not found`);

  const [tags, files, notes, appointments, medications, conditions, allergies, medical_flags] =
    await Promise.all([
      db.tags.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
      db.files.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
      db.notes.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
      db.appointments.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
      db.medications.where('patient_id').equals(patientId).toArray(),
      db.conditions.where('patient_id').equals(patientId).toArray(),
      db.allergies.where('patient_id').equals(patientId).toArray(),
      db.medical_flags.where('patient_id').equals(patientId).toArray(),
    ]);

  return {
    ...patient,
    notes,
    appointments,
    medications,
    conditions,
    allergies,
    tags,
    files,
    medical_flags,
  } as Patient;
}
