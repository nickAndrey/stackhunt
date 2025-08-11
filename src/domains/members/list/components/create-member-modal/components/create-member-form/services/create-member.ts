import { db } from '@/shared/db/db';
import type { Staff, StaffForm } from '@/shared/types/staff';
import dayjs from 'dayjs';

type Params = {
  fields: Omit<StaffForm, 'id'>;
};

export async function createMember(params: Params) {
  const {
    first_name,
    last_name,
    email,
    phone,
    gender,
    role,
    status,
    department,
    specialty,
    license_number,
    employee_id,
    start_date,
    bio,
    address,
    preferred_contact_method,
  } = params.fields;

  const newMember: Staff = {
    id: crypto.randomUUID(),
    first_name,
    last_name,
    email,
    phone,
    gender,
    role,
    status,
    department,
    specialty,
    license_number,
    employee_id,
    bio,
    address,
    preferred_contact_method,
    start_date: dayjs(start_date)?.toISOString(),
  };

  await db.staff.add(newMember);
}
