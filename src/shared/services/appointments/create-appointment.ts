import { db } from '@/shared/db/db';
import type { Appointment } from '../../types/appointment_v2';

type Params = Pick<Appointment, 'type' | 'date' | 'notes'> & {
  patientId?: string;
  staffId?: string;
  staffExtraRole?: string;
};

export async function createAppointment(params: Params) {
  const appointmentId = crypto.randomUUID();

  await db.appointments.add({
    id: appointmentId,
    type: params.type,
    date: params.date,
    notes: params.notes,
    status: 'scheduled',
  });

  if (params.staffId) {
    await db.appointment_participants.add({
      id: crypto.randomUUID(),
      appointment_id: appointmentId,
      participant_id: params.staffId,
      role: 'staff',
      extra_role: params?.staffExtraRole,
    });
  }

  if (params.patientId) {
    await db.appointment_participants.add({
      id: crypto.randomUUID(),
      appointment_id: appointmentId,
      participant_id: params.patientId,
      role: 'patient',
      extra_role: params?.staffExtraRole,
    });
  }
}
