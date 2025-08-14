import type { Address } from './address';
import type { Appointment } from './appointment';
import type { ContactPreference } from './contact-preference';
import type { FileRecord } from './file-record';
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
  profile_image?: File;
  department?: string;
  specialty?: string;
  license_number?: string;
  start_date?: string;
  end_date?: string;
  bio?: string;
  notes?: Note[];
  tags?: Tag[];
  address?: Address;
  files?: FileRecord[];
  appointments: Appointment[];
  preferred_contact_method?: ContactPreference;
};

type StaffForm = Omit<Staff, 'start_date' | 'end_date'> & {
  start_date?: string | Date;
  end_date?: string | Date;
};

export type { Staff, StaffForm, StaffRole, StaffStatus };
