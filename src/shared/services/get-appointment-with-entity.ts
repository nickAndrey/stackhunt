import { db } from '@/shared/db/db';

type Params = {
  entityType: 'staff' | 'patient';
  groupId: string;
};

export async function getAppointmentWithEntity({ entityType, groupId }: Params) {
  const appointment = await db.appointments
    .where('[entity_type+group_id]')
    .equals([entityType, groupId])
    .first();

  if (!appointment) throw new Error(`Appointment was not found for the ${entityType}.`);

  let assignedEntity;

  if (entityType === 'staff') {
    assignedEntity = await db.staff.where('id').equals(appointment.entity_id).first();
  } else {
    assignedEntity = await db.patients.where('id').equals(appointment.entity_id).first();
  }

  if (!assignedEntity) throw new Error(`No records were found about assigned [${entityType}]`);

  return { appointment, assignedEntity };
}
