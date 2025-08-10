import type { Appointment } from '@/shared/types/patient';
import { getAppointmentAssignedStaff } from '../services/get-appointment-assigned-staff';

type Params = {
  appointments: Appointment[];
};

export async function enhanceAppointmentsWithAssignedStaff(params: Params) {
  return await Promise.all(
    params.appointments.map(async (appointment) => {
      const staffMember = await getAppointmentAssignedStaff(appointment.group_id);

      if (staffMember) {
        return {
          ...appointment,
          assignedStaff: {
            id: staffMember.id,
            first_name: staffMember.first_name,
            last_name: staffMember.last_name,
            role: staffMember.role,
          },
        };
      }

      return appointment;
    })
  );
}
