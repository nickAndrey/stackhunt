import { db } from '@/shared/db/db';
import type { StaffRole } from '@/shared/types/staff';

type Params = {
  fields: Record<string, unknown>;
  memberId?: string;
};

export async function updateMember({ fields, memberId }: Params) {
  if (!memberId) throw new Error('No member id was provided');

  await db.transaction('rw', ['staff', 'auth_credentials', 'tags'], async () => {
    await db.staff.update(memberId, fields);

    await db.auth_credentials.update(memberId, {
      email: fields.email as string,
      role: fields.role as StaffRole,
    });

    if ((fields.tags as string).trim() !== '') {
      const rawTags = (fields.tags as string)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await db.tags.where('[entity_type+entity_id]').equals(['staff', memberId]).delete();

      await db.tags.bulkPut(
        rawTags.map((tag) => ({
          id: crypto.randomUUID(),
          entity_id: memberId,
          entity_type: 'staff',
          tag,
        }))
      );
    }
  });
}
