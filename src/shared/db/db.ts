import Dexie, { type Table } from 'dexie';
import type { AuthCredentials } from '../types/auth-credentials';
import type { Flag } from '../types/flag';
import type { Note } from '../types/note';
import type {
  Allergy,
  Appointment,
  Condition,
  File,
  Medication,
  Patient,
  Tag,
} from '../types/patient';
import type { Staff } from '../types/staff';

type WithPatientId<T> = T & { patient_id: string };
type PatientCore = Pick<
  Patient,
  | 'id'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'gender'
  | 'birth_date'
  | 'address'
  | 'national_id'
  | 'insurance_number'
  | 'registration_date'
  | 'profile_image'
  | 'preferred_language'
  | 'contact_preference'
  | 'emergency_contact'
  | 'consent_to_contact'
  | 'consent_signed_date'
  | 'status'
>;

export class ClinicCRMDatabase extends Dexie {
  patients!: Table<PatientCore>;
  notes!: Table<WithPatientId<Note>>;
  files!: Table<WithPatientId<File>>;
  appointments!: Table<WithPatientId<Appointment>>;
  medical_flags!: Table<WithPatientId<Flag>>;
  allergies!: Table<WithPatientId<Allergy>>;
  medications!: Table<WithPatientId<Medication>>;
  conditions!: Table<WithPatientId<Condition>>;
  tags!: Table<WithPatientId<Tag>>;
  staff!: Table<Staff>;
  auth_credentials!: Table<AuthCredentials>;

  constructor() {
    super('ClinicCRM');
    this.version(1).stores({
      patients: `++id, first_name, last_name, &email, phone, gender, birth_date, address, national_id, insurance_number, registration_date, profile_image, preferred_language, contact_preference, emergency_contact, consent_to_contact, consent_signed_date, status`,
      notes: `++id, author_id, author_name, content, created_at, updated_at, updated_by, updated_by_name, content_before, patient_id, staff_id`,
      files: `++id, patient_id, url`,
      appointments: `++id, type, date, duration_minutes, location, notes, status, patient, staff, patient_id, staff_id`,
      medical_flags: `++id, flag, patient_id`,
      allergies: `++id, substance, reaction, severity, patient_id`,
      medications: `++id, name, dosage, start_date, end_date, prescribed_by, patient_id`,
      conditions: `++id, condition, patient_id`,
      tags: `++id, tag, patient_id, staff_id`,
      staff: `++id, first_name, last_name, &email, phone, gender, role, status, profile_image, department, specialty, &license_number, &employee_id, start_date, end_date, bio, address, preferred_contact_method`,
      auth_credentials: `++id, staff_id, email, hashed_password, role, last_login`,
    });
  }
}

export const db = new ClinicCRMDatabase();
