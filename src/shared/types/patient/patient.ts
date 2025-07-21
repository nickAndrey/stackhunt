import type { Address } from './address';
import type { Allergy } from './allergy';
import type { Appointment } from './appointment';
import type { EmergencyContact } from './emergency-contact';
import type { ContactPreference, Gender, PatientStatus } from './enums';
import type { Medication } from './medication';
import type { Note } from './note';

export type Patient = {
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
  files: string[];
  appointments: Appointment[];
  medical_flags: string[];
  allergies: Allergy[];
  medications: Medication[];
  conditions: string[];
  consent_to_contact: boolean;
  consent_signed_date?: string;
  status: PatientStatus;
  tags: string[];
};
