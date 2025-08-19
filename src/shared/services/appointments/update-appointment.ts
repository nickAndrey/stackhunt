import { db } from '@/shared/db/db';
import type { Appointment } from '@/shared/types/appointment_v2';

type Params = Pick<Appointment, 'id' | 'type' | 'date' | 'notes'> & {
  patientId?: string;
  staffId?: string;
  status?: Appointment['status'];
};

export async function updateAppointment(params: Params) {
  await db.appointments.update(params.id, {
    type: params.type,
    date: params.date,
    notes: params.notes,
    status: params.status,
  });

  if (params.staffId) {
    await db.appointment_participants
      .where('[appointment_id+role]')
      .equals([params.id, 'staff'])
      .modify({
        participant_id: params.staffId,
      });
  }

  if (params.patientId) {
    await db.appointment_participants
      .where('[appointment_id+role]')
      .equals([params.id, 'patient'])
      .modify({
        participant_id: params.patientId,
      });
  }
}
