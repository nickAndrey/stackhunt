import { db } from '@/shared/db/db';
import { getStaffMemberWithRelatedData } from '@/shared/services/get-staff-member-with-related-data';

export async function searchForStaff(value: string) {
  const [match1, match2, match3, match4] = await Promise.all([
    db.staff.where('first_name').startsWithIgnoreCase(value).toArray(),
    db.staff.where('last_name').startsWithIgnoreCase(value).toArray(),
    db.staff.where('email').startsWithIgnoreCase(value).toArray(),
    db.staff.where('phone').startsWithIgnoreCase(value).toArray(),
  ]);

  const allMatches = [
    ...new Map([...match1, ...match2, ...match3, ...match4].map((p) => [p.id, p])).values(),
  ];

  const staff = allMatches.map(async (member) => await getStaffMemberWithRelatedData(member.id));

  return await Promise.all(staff);
}
