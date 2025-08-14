import type { PatientStaffRole } from '@/shared/types/patient-staff-assignment';

export type AssignedPatient = {
  patient_id: string;
  first_name: string;
  last_name: string;
  role: PatientStaffRole;
  start_date: string;
  profile_image?: File;
};
