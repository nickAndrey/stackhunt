import { db } from '@/shared/db/db';

export async function getPrimaryAssignment(patientId: string) {
  const primaryAssignment = await db.patient_staff_assignments
    .where('patient_id')
    .equals(patientId)
    .first();

  let assignedStaff;

  if (primaryAssignment) {
    assignedStaff = await db.staff.where('id').equals(primaryAssignment.staff_id).first();
  }

  return assignedStaff;
}
