import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';

export async function getPatientWithRelatedData(patientId: string): Promise<Patient> {
  const patient = await db.patients.where('id').equals(patientId).first();

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

  return new Promise((resolve) =>
    resolve({
      ...patient,
      notes,
      appointments,
      medications,
      conditions,
      allergies,
      tags,
      files,
      medical_flags,
    } as Patient)
  );
}
