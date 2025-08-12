import type { transformCreatePatientFormData } from '@/domains/patients/list/utils/transform-create-patient-form-data';
import { db } from '@/shared/db/db';
import { getPatientWithRelatedData } from '@/shared/services/get-patient-with-related-data';
import type { Patient } from '@/shared/types/patient';

type TransformedCreatePatientFormData = ReturnType<typeof transformCreatePatientFormData>;

export async function createPatient(data: TransformedCreatePatientFormData): Promise<Patient> {
  const { patientCore, conditions, medical_flags, tags, allergies, medications } = data;

  const patientId = patientCore.id;

  const tables = [
    db.medical_flags,
    db.medications,
    db.conditions,
    db.allergies,
    db.patients,
    db.tags,
  ];

  await db.transaction('rw', [...tables], async () => {
    await db.medical_flags.bulkAdd(medical_flags);
    await db.medications.bulkAdd(medications);
    await db.conditions.bulkAdd(conditions);
    await db.allergies.bulkAdd(allergies);
    await db.patients.add(patientCore);
    await db.tags.bulkAdd(tags);
  });

  const newPatient = await getPatientWithRelatedData(patientId);
  return newPatient;
}
