import { getAppointmentWithEntity } from '@/shared/services/get-appointment-with-entity';
import type { Appointment } from '@/shared/types/patient';

type Params = {
  appointments: Appointment[];
};

export async function enhanceAppointmentsWithAssignedStaff(params: Params) {
  return await Promise.all(
    params.appointments.map(async (appointment) => {
      const res = await getAppointmentWithEntity({
        entityType: 'staff',
        groupId: appointment.group_id,
      });

      if (res.assignedEntity) {
        return {
          ...appointment,
          assignedStaff: res.assignedEntity as Appointment['assignedStaff'],
        };
      }

      return appointment;
    })
  );
}
