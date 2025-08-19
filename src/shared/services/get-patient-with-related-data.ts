import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { getAppointmentsWithParticipants } from './appointments';

export async function getPatientWithRelatedData(patientId: string): Promise<Patient> {
  const patient = await db.patients.where('id').equals(patientId).first();
  if (!patient) throw new Error(`Patient with id ${patientId} not found`);

  const [
    tags,
    files,
    notes,
    medications,
    conditions,
    allergies,
    medical_flags,
    patient_staff_assignments,
    appointments,
  ] = await Promise.all([
    db.tags.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
    db.files.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
    db.notes.where('[entity_type+entity_id]').equals(['patient', patientId]).toArray(),
    db.medications.where('patient_id').equals(patientId).toArray(),
    db.conditions.where('patient_id').equals(patientId).toArray(),
    db.allergies.where('patient_id').equals(patientId).toArray(),
    db.medical_flags.where('patient_id').equals(patientId).toArray(),
    db.patient_staff_assignments.where('patient_id').equals(patientId).toArray(),
    getAppointmentsWithParticipants({ role: 'patient', participant_id: patient.id }),
  ]);

  const profileImage = files.find((item) => item.name === 'profile-image')?.file;

  return {
    ...patient,
    profile_image: profileImage,
    notes,
    appointments,
    medications,
    conditions,
    allergies,
    tags,
    files,
    medical_flags,
    patient_staff_assignments,
  } as Patient;
}
