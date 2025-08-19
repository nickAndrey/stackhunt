import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import type { Staff } from '@/shared/types/staff';

export async function fetchStaffMember(id?: string): Promise<Staff> {
  if (!id) throw new Error('Invalid staff member id');

  const staffMember = await getStaffMemberWithRelatedData(id);

  return new Promise((resolve) => setTimeout(() => resolve(staffMember), 1000));
}
