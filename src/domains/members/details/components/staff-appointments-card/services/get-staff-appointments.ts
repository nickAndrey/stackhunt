import { db } from '@/shared/db/db';

export async function getStaffAppointments(staffId: string) {
  const appointments = await db.appointments
    .where('[entity_type+entity_id]')
    .equals(['staff', staffId])
    .toArray();

  console.log(appointments);

  return appointments;
}
