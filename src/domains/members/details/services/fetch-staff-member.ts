import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import type { Staff } from '@/shared/types/staff';
import { enhanceAppointmentsWithAssignedPatients } from '../utils/enhance-appointments-with-assigned-patients';

export async function fetchStaffMember(id?: string): Promise<Staff> {
  if (!id) throw new Error('Invalid staff member id');

  const staffMember = await getStaffMemberWithRelatedData(id);
  const appointmentsWithAssignedPatients = await enhanceAppointmentsWithAssignedPatients({
    appointments: staffMember.appointments,
  });

  const res = {
    ...staffMember,
    appointments: appointmentsWithAssignedPatients,
  };

  return new Promise((resolve) => setTimeout(() => resolve(res), 1000));
}
