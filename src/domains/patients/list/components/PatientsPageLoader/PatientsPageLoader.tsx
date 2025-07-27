import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function fetchPatientsFromIndexedDB(): Promise<Patient[]> {
  const patients = await db.patients.toArray();

  const mutatedPatients = await Promise.all(
    patients.map(async (patient) => ({
      ...patient,
      notes: await db.notes.where('patient_id').equals(patient.id).toArray(),
      appointments: await db.appointments.where('patient_id').equals(patient.id).toArray(),
      medications: await db.medications.where('patient_id').equals(patient.id).toArray(),
      conditions: await db.conditions.where('patient_id').equals(patient.id).toArray(),
      allergies: await db.allergies.where('patient_id').equals(patient.id).toArray(),
      tags: await db.tags.where('patient_id').equals(patient.id).toArray(),
      files: await db.files.where('patient_id').equals(patient.id).toArray(),
      medical_flags: await db.medical_flags.where('patient_id').equals(patient.id).toArray(),
    }))
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mutatedPatients);
    }, 2000);
  });
}

const PatientsPageLoader = createPageLoader('patients', fetchPatientsFromIndexedDB);

export default PatientsPageLoader;
