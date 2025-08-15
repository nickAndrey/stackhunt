import { db } from '@/shared/db/db';
import type { PatientStaffAssignment } from '@/shared/types/patient-staff-assignment';
import type { AssignedPatient } from '../types/assigned-patient';

export async function getAssignedPatients(
  staffId: string,
  initialAssignments?: PatientStaffAssignment[]
) {
  let assignments;

  if (initialAssignments) {
    assignments = initialAssignments;
  } else {
    assignments = await db.patient_staff_assignments.where('staff_id').equals(staffId).toArray();
  }

  const assignedPatients = await Promise.all(
    assignments.map(async (item) => {
      const patient = await db.patients.where('id').equals(item.patient_id).first();
      if (!patient) return null;

      const profileImage = await db.files
        .where('[name+entity_type+entity_id]')
        .equals(['profile-image', 'patient', patient.id])
        .first();

      return {
        assignment_id: item.id,
        patient_id: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        profile_image: profileImage?.file,
        start_date: item.start_date,
        role: item.role,
      };
    })
  );

  const filteredAssignedPatients = assignedPatients.filter(Boolean) as AssignedPatient[];

  return filteredAssignedPatients;
}
