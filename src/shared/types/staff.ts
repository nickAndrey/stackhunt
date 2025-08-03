import type { Address } from './address';
import type { ContactPreference } from './contact-preference';
import type { Gender } from './gender';
import type { Note } from './note';
import type { Tag } from './patient';

type StaffRole =
  | 'doctor'
  | 'nurse'
  | 'technician'
  | 'admin'
  | 'receptionist'
  | 'lab'
  | 'pharmacist';

type StaffStatus = 'active' | 'inactive' | 'terminated' | 'on_leave';

type Staff = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: StaffRole;
  employee_id?: string;
  phone?: string;
  gender?: Gender;
  status?: StaffStatus;
  profile_image?: string;
  department?: string;
  specialty?: string;
  license_number?: string;
  start_date?: string;
  end_date?: string;
  bio?: string;
  notes?: Note[];
  tags?: Tag[];
  address?: Address;
  preferred_contact_method?: ContactPreference;
};

export type { Staff, StaffRole, StaffStatus };
