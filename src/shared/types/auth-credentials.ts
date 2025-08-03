import type { StaffRole } from './staff';

export type AuthCredentials = {
  id: string;
  staff_id: string;
  email: string;
  hashed_password: string;
  role: StaffRole;
  last_login?: string;
};
