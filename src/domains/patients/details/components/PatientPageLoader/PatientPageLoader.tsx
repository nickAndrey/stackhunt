import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import type { Staff } from '@/shared/types/staff';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function fetchPatientFromIndexedDB(
  id?: string
): Promise<{ patient: Patient; staff: Staff[] }> {
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

  const staff = await db.staff.toArray();

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          patient: {
            ...patient,
            notes,
            appointments,
            medications,
            conditions,
            allergies,
            tags,
            files,
            medical_flags,
          },
          staff: staff,
        }),
      2000
    );
  });
}

const PatientPageLoader = createPageLoader('patient', fetchPatientFromIndexedDB);

export default PatientPageLoader;
