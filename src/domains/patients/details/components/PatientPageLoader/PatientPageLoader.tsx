import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function fetchPatientFromIndexedDB(id?: string): Promise<Patient> {
  if (!id) throw new Error('Invalid patient id');

  const patient = await db.patients.get({ id: id });
  if (!patient) throw new Error('patient Not Found');

  const [notes, appointments, medications, conditions, allergies, tags, files, medical_flags] =
    await Promise.all([
      db.notes.where('patient_id').equals(patient.id).toArray(),
      db.appointments.where('patient_id').equals(patient.id).toArray(),
      db.medications.where('patient_id').equals(patient.id).toArray(),
      db.conditions.where('patient_id').equals(patient.id).toArray(),
      db.allergies.where('patient_id').equals(patient.id).toArray(),
      db.tags.where('patient_id').equals(patient.id).toArray(),
      db.files.where('patient_id').equals(patient.id).toArray(),
      db.medical_flags.where('patient_id').equals(patient.id).toArray(),
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
  };
}

const PatientPageLoader = createPageLoader('patient', fetchPatientFromIndexedDB);

export default PatientPageLoader;
