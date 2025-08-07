import { db } from '@/shared/db/db';

export async function checkMemberExist(staffId: string) {
  const staffMember = await db.auth_credentials.where('staff_id').equals(staffId).first();
  return Boolean(staffMember);
}
