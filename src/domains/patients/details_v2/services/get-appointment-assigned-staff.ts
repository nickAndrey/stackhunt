import { db } from '@/shared/db/db';

export async function getAppointmentAssignedStaff(groupId: string) {
  const staffAppointment = await db.appointments
    .where('[entity_type+group_id]')
    .equals(['staff', groupId])
    .first();

  if (!staffAppointment) throw new Error('Appointment was not found for the staff.');

  const staffMember = await db.staff.where('id').equals(staffAppointment.entity_id).first();
  if (!staffMember) throw new Error('Staff was not found for the appointment.');

  return staffMember;
}
