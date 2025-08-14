import { getAppointmentWithEntity } from '@/shared/services/get-appointment-with-entity';
import type { Appointment } from '@/shared/types/appointment';

type Params = {
  appointments: Appointment[];
};

export async function enhanceAppointmentsWithAssignedPatients(params: Params) {
  return await Promise.all(
    params.appointments.map(async (appointment) => {
      const res = await getAppointmentWithEntity({
        entityType: 'patient',
        groupId: appointment.group_id,
      });

      const { id, first_name, last_name } = res.assignedEntity;

      if (res.assignedEntity) {
        return {
          ...appointment,
          assignedPatient: { id, first_name, last_name },
        };
      }

      return appointment;
    })
  );
}
