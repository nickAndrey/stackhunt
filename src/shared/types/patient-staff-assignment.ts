type PatientStaffRole = 'primary' | 'specialist' | 'nurse' | 'care_team';

type PatientStaffAssignment = {
  id: string;
  patient_id: string;
  staff_id: string;
  role: PatientStaffRole;
  start_date: string;
  end_date?: string;
};

export type { PatientStaffAssignment, PatientStaffRole };
