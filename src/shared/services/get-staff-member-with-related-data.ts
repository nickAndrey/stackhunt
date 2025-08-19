import { db } from '@/shared/db/db';
import type { Staff } from '../types/staff';
import { getAppointmentsWithParticipants } from './appointments';

export async function getStaffMemberWithRelatedData(staffId: string): Promise<Staff> {
  const staff = await db.staff.where('id').equals(staffId).first();
  if (!staff) throw new Error(`Staff member with id ${staffId} was not found`);

  const [tags, files, notes, patient_staff_assignments, appointments] = await Promise.all([
    db.tags.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.files.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.notes.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.patient_staff_assignments.where('staff_id').equals(staffId).toArray(),
    getAppointmentsWithParticipants({ role: 'staff', participant_id: staff.id }),
  ]);

  const profileImage = files.find((item) => item.name === 'profile-image')?.file;

  return {
    ...staff,
    profile_image: profileImage,
    tags,
    files,
    notes,
    appointments,
    patient_staff_assignments,
  } as Staff;
}
