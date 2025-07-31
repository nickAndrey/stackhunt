import { db } from '@/shared/db/db';
import type { transformCreatePatientFormData } from '../utils/transform-create-patient-form-data';

type TransformedCreatePatientFormData = ReturnType<typeof transformCreatePatientFormData>;

export async function createPatient(data: TransformedCreatePatientFormData) {
  const { patientCore, conditions, medical_flags, tags, allergies, medications, files } = data;

  const patientId = patientCore.id;

  const tables = [
    db.patients,
    db.medications,
    db.conditions,
    db.allergies,
    db.tags,
    db.files,
    db.medical_flags,
  ];

  await db.transaction('rw', [...tables], async () => {
    await db.patients.add(patientCore);

    await db.medications.bulkAdd(
      medications.map((m) => ({
        ...m,
        patient_id: patientId,
      }))
    );
    await db.conditions.bulkAdd(
      conditions.map((c) => ({
        ...c,
        patient_id: patientId,
      }))
    );
    await db.allergies.bulkAdd(
      allergies.map((a) => ({
        ...a,
        patient_id: patientId,
      }))
    );
    await db.tags.bulkAdd(
      tags.map((t) => ({
        ...t,
        patient_id: patientId,
      }))
    );
    await db.files.bulkAdd(
      files.map((f) => ({
        ...f,
        patient_id: patientId,
      }))
    );
    await db.medical_flags.bulkAdd(
      medical_flags.map((flag) => ({
        ...flag,
        patient_id: patientId,
      }))
    );
  });
}
