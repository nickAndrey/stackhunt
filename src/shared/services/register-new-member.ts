import { db } from '@/shared/db/db';
import type { StaffForm } from '@/shared/types/staff';
import bcrypt from 'bcryptjs';
import { getRandomUUID } from '../utils';

type MemberCreateInput = StaffForm & {};

export async function registerNewMember(params: MemberCreateInput) {
  const hashedPassword = await bcrypt.hash(params.password, 8);

  await db.transaction('rw', ['staff', 'auth_credentials'], async () => {
    const memberId = getRandomUUID();

    await db.staff.add({
      id: memberId,
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      role: params.role,
    });

    await db.auth_credentials.add({
      id: getRandomUUID(),
      staff_id: memberId,
      email: params.email,
      hashed_password: hashedPassword,
      role: params.role,
    });
  });
}
