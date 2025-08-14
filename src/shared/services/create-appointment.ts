import { db } from '@/shared/db/db';
import type { Appointment } from '../types/appointment';

type Options = {
  patientId: string;
  staffId: string;
  type: Appointment['type'];
  date: Appointment['date'];
  notes: Appointment['notes'];
};

export async function createAppointment(options: Options) {
  const groupId = crypto.randomUUID();

  await db.appointments.bulkAdd([
    {
      id: crypto.randomUUID(),
      group_id: groupId,
      entity_type: 'patient',
      entity_id: options.patientId,
      type: options.type,
      date: options.date,
      notes: options.notes,
      status: 'scheduled',
    },
    {
      id: crypto.randomUUID(),
      group_id: groupId,
      entity_type: 'staff',
      entity_id: options.staffId,
      type: options.type,
      date: options.date,
      notes: options.notes,
      status: 'scheduled',
    },
  ]);
}
