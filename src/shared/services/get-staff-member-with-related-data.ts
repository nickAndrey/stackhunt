import { db } from '@/shared/db/db';
import type { Staff } from '../types/staff';

export async function getStaffMemberWithRelatedData(staffId: string): Promise<Staff> {
  const staffMember = await db.staff.where('id').equals(staffId).first();
  if (!staffMember) throw new Error(`Staff member with id ${staffId} was not found`);

  const [tags, files, notes, appointments] = await Promise.all([
    db.tags.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.files.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.notes.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
    db.appointments.where('[entity_type+entity_id]').equals(['staff', staffId]).toArray(),
  ]);

  const profileImage = files.find((item) => item.name === 'profile-image')?.file;

  return {
    ...staffMember,
    profile_image: profileImage,
    tags,
    files,
    notes,
    appointments,
  } as Staff;
}
