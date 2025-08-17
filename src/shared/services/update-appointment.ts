import { db } from '@/shared/db/db';
import type { Appointment } from '../types/appointment';

type Options = {
  groupId: string;
  patientId?: string;
  staffId?: string;
  type?: Appointment['type'];
  date?: Appointment['date'];
  notes?: Appointment['notes'];
  status?: Appointment['status'];
};

export async function updateAppointment(options: Options) {
  const apps = await db.appointments.where('group_id').equals(options.groupId).toArray();
  if (!apps.length) throw new Error(`No appointments found with group_id=${options.groupId}`);

  const updates = apps.map((app) => ({
    key: app.id,
    changes: {
      ...(app.entity_type === 'patient' && options.patientId && { entity_id: options.patientId }),
      ...(app.entity_type === 'staff' && options.staffId && { entity_id: options.staffId }),
      ...(options.type && { type: options.type }),
      ...(options.date && { date: options.date }),
      ...(options.notes && { notes: options.notes }),
      ...(options.status && { status: options.status }),
    },
  }));

  const updatedCount = await db.appointments.bulkUpdate(updates);
  return updatedCount;
}
