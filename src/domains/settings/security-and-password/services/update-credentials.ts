import { db } from '@/shared/db/db';
import type { AuthCredentials } from '@/shared/types/auth-credentials';
import type { StaffRole } from '@/shared/types/staff';
import bcrypt from 'bcryptjs';

type Options = {
  fields: Record<string, unknown>;
  memberId?: string;
};

export async function updateCredentials({ fields, memberId }: Options) {
  if (!memberId) throw new Error('No member id was provided');

  const dto: Partial<AuthCredentials> = {};

  if ('email' in fields) dto.email = fields.email as string;

  if ('role' in fields) dto.role = fields.role as StaffRole;

  const storedCredentials = await db.auth_credentials.where('staff_id').equals(memberId).first();
  if (!storedCredentials) throw new Error(`No credentials found for member ID ${memberId}`);

  if ('current_password' in fields && 'new_password' in fields) {
    const currentPwd = fields.current_password as string;
    const newPwd = fields.new_password as string;

    const isPasswordMatch = await bcrypt.compare(currentPwd, storedCredentials.hashed_password);

    if (!isPasswordMatch) {
      throw new Error(`Invalid password for staff member: ${storedCredentials.email}`);
    }

    dto.hashed_password = await bcrypt.hash(newPwd, 8);
  }

  await db.transaction('rw', ['auth_credentials', 'staff'], async () => {
    await db.auth_credentials.update(storedCredentials.id, dto);

    const staffUpdates: Partial<{ email: string; role: StaffRole }> = {};

    if (dto.email) staffUpdates.email = dto.email;
    if (dto.role) staffUpdates.role = dto.role;

    if (Object.keys(staffUpdates).length > 0) {
      await db.staff.update(storedCredentials.staff_id, staffUpdates);
    }
  });
}
