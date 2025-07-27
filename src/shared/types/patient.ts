type PatientStatus = 'active' | 'inactive' | 'deceased' | 'blocked';
type Gender = 'male' | 'female' | 'other' | 'undisclosed';
type ContactPreference = 'email' | 'phone' | 'sms';
type AllergySeverity = 'mild' | 'moderate' | 'severe';

type Address = {
  street: string;
  city: string;
  zip_code: string;
};

type Allergy = {
  id: string;
  substance: string;
  reaction: string;
  severity: AllergySeverity;
};

type AppointmentType =
  | 'consultation'
  | 'follow_up'
  | 'surgery'
  | 'lab_test'
  | 'vaccination'
  | 'emergency';

type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

type Appointment = {
  id: string;
  type: AppointmentType;
  date: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
  status: AppointmentStatus;
  patient_id: string;
  staff_id: string;
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

type File = {
  id: string;
  url: string;
};

type Flag = {
  id: string;
  flag: string;
};

type Medication = {
  id: string;
  name: string;
  dosage: string;
  start_date: string;
  end_date: string;
  prescribed_by: string;
};

type Note = {
  id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at?: string;
  updated_by?: string;
  updated_by_name?: string;
  content_before?: string;
};

type Tag = {
  id: string;
  tag: string;
};

type Patient = {
  id: string; // UUID
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: Gender;
  birth_date: string;
  address: Address;
  national_id?: string;
  insurance_number?: string;
  registration_date: string;
  profile_image?: string;
  preferred_language?: string;
  contact_preference?: ContactPreference;
  emergency_contact?: EmergencyContact;
  notes?: Note[];
  files: File[];
  appointments: Appointment[];
  medical_flags: Flag[];
  allergies: Allergy[];
  medications: Medication[];
  conditions: Condition[];
  consent_to_contact: boolean;
  consent_signed_date?: string;
  status: PatientStatus;
  tags: Tag[];
};

export type {
  Address,
  Allergy,
  AllergySeverity,
  Appointment,
  AppointmentStatus,
  AppointmentType,
  Condition,
  ContactPreference,
  EmergencyContact,
  File,
  Flag,
  Gender,
  Medication,
  Note,
  Patient,
  PatientStatus,
  Tag,
};
