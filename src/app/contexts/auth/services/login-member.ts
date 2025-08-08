import { db } from '@/shared/db/db';
import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';
import bcrypt from 'bcryptjs';

type LoginParams = {
  email: string;
  password: string;
};

export async function loginMember({ email, password }: LoginParams) {
  const auth = await db.auth_credentials.where('email').equals(email).first();
  if (!auth) throw new Error(`No staff members found with email: ${email}`);

  const isPasswordMatch = await bcrypt.compare(password, auth.hashed_password);
  if (!isPasswordMatch) throw new Error(`Invalid password for staff member: ${email}`);

  const staffMember = await db.staff.where('id').equals(auth.staff_id).first();
  if (!staffMember) throw new Error(`Auth/Staff mismatch for staff_id: ${auth.staff_id}`);

  const memberData = await getStaffMemberWithRelatedData(staffMember.id);

  return memberData;
}
