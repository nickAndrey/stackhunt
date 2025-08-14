import { db } from '@/shared/db/db';
import type { PatientStaffAssignment } from '@/shared/types/patient-staff-assignment';
import dayjs from 'dayjs';

type Params = {
  fields: {
    patient_id: PatientStaffAssignment['patient_id'];
    staff_id: PatientStaffAssignment['staff_id'];
    role: PatientStaffAssignment['role'];
    start_date: Date;
  };
};

export async function assignPatient({ fields }: Params) {
  const DTO: PatientStaffAssignment = {
    id: crypto.randomUUID(),
    patient_id: fields.patient_id,
    staff_id: fields.staff_id,
    role: fields.role,
    start_date: dayjs(fields.start_date).toISOString(),
  };

  const existing = await db.patient_staff_assignments
    .where('[patient_id+staff_id]')
    .equals([DTO.patient_id, DTO.staff_id])
    .first();

  return existing
    ? await db.patient_staff_assignments.put({ ...DTO, id: existing.id })
    : await db.patient_staff_assignments.add(DTO);
}
