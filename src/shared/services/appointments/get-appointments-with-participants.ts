import { db } from '@/shared/db/db';
import type {
  AppointmentParticipant,
  AppointmentWithParticipants,
} from '@/shared/types/appointment_v2';

type Params = {
  role?: AppointmentParticipant['role'];
  participant_id?: AppointmentParticipant['participant_id'];
};

export async function getAppointmentsWithParticipants(
  params: Params = {}
): Promise<AppointmentWithParticipants[]> {
  let appointments = [];
  let appointmentIds: string[] = [];

  if (params?.participant_id && params?.role) {
    const staffAssignments = await db.appointment_participants
      .where('[participant_id+role]')
      .equals([params.participant_id, params.role])
      .toArray();

    if (!staffAssignments.length) return [];

    appointmentIds = staffAssignments.map((p) => p.appointment_id);
    appointments = await db.appointments.where('id').anyOf(appointmentIds).toArray();
  } else {
    appointments = await db.appointments.toArray();
    appointmentIds = appointments.map((a) => a.id);
  }

  const participants = await db.appointment_participants
    .where('appointment_id')
    .anyOf(appointmentIds)
    .toArray();

  const appointmentsWithParticipants = await Promise.all(
    appointments.map(async (appt) => {
      const apptParticipants = participants.filter((p) => p.appointment_id === appt.id);

      const assignedStaff: AppointmentWithParticipants['staff'] = [];
      const assignedPatient: AppointmentWithParticipants['patients'] = [];

      for (const part of apptParticipants) {
        if (part.role === 'staff') {
          const staff = await db.staff.get(part.participant_id);
          if (staff) {
            assignedStaff.push({
              id: staff.id,
              role: staff.role,
              first_name: staff.first_name,
              last_name: staff.last_name,
            });
          }
        } else if (part.role === 'patient') {
          const patient = await db.patients.get(part.participant_id);
          if (patient) {
            assignedPatient.push({
              id: patient.id,
              first_name: patient.first_name,
              last_name: patient.last_name,
            });
          }
        }
      }

      return {
        ...appt,
        staff: assignedStaff.length ? assignedStaff : undefined,
        patients: assignedPatient.length ? assignedPatient : undefined,
      };
    })
  );

  return appointmentsWithParticipants;
}
