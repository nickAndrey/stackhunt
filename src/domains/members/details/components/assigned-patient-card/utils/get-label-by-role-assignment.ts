import type { PatientStaffAssignment } from '@/shared/types/patient-staff-assignment';

export function getLabelByRoleAssignment(role: PatientStaffAssignment['role']) {
  const conf: Record<PatientStaffAssignment['role'], string> = {
    primary: 'Primary Doctor',
    care_team: 'Care Team',
    nurse: 'Nurse',
    specialist: 'Specialist',
  };

  return conf[role];
}
