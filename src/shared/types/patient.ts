import type { Address } from './address';
import type { Appointment } from './appointment';
import type { ContactPreference } from './contact-preference';
import type { FileRecord } from './file-record';
import type { Flag } from './flag';
import type { Gender } from './gender';
import type { Note } from './note';
import type { PatientStaffAssignment } from './patient-staff-assignment';
import type { Staff } from './staff';

type PatientStatus = 'active' | 'inactive' | 'deceased' | 'blocked';
type AllergySeverity = 'mild' | 'moderate' | 'severe';

type Allergy = {
  id: string;
  substance: string;
  reaction: string;
  severity: AllergySeverity;
};

type Condition = {
  id: string;
  condition: string;
};

type EmergencyContact = {
  name: string;
  relation: string;
  phone: string;
};

type Medication = {
  id: string;
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
  prescribed_by: string;
};

type Tag = {
  id: string;
  tag: string;
};

type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: Gender;
  birth_date: string;
  address: Address;
  registration_date: string;
  national_id?: string;
  insurance_number?: string;
  profile_image?: File;
  preferred_language?: string;
  contact_preference?: ContactPreference;
  emergency_contact?: EmergencyContact;
  assigned_staff?: Staff;
  notes?: Note[];
  files: FileRecord[];
  appointments: Appointment[];
  medical_flags: Flag[];
  allergies: Allergy[];
  medications: Medication[];
  conditions: Condition[];
  consent_to_contact: boolean;
  consent_signed_date?: string;
  status: PatientStatus;
  tags: Tag[];
  patient_staff_assignments?: PatientStaffAssignment[];
};

export type {
  Allergy,
  AllergySeverity,
  Condition,
  EmergencyContact,
  Medication,
  Patient,
  PatientStatus,
  Tag,
};
