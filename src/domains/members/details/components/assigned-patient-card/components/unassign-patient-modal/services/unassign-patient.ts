import { db } from '@/shared/db/db';

type Params = {
  assignmentId: string;
};

export async function unassignPatient(params: Params) {
  await db.patient_staff_assignments.delete(params.assignmentId);
}
