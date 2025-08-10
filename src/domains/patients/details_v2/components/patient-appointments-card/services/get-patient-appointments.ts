import { db } from '@/shared/db/db';

export async function getPatientAppointments(patientId: string) {
  const appointmentsList = await db.appointments
    .where('[entity_type+entity_id]')
    .equals(['patient', patientId])
    .toArray();

  return appointmentsList;
}
