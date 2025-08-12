import type { PatientCore, WithEntity, WithPatientId } from '@/shared/db/db';
import type { Flag } from '@/shared/types/flag';
import type { Allergy, Condition, Medication, Tag } from '@/shared/types/patient';
import type { CreatePatientForm } from '../components/create-patient-modal/components/patient-create-form';

export function transformCreatePatientFormData(data: CreatePatientForm) {
  const patientCore: PatientCore = {
    id: crypto.randomUUID(),
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    birth_date: data.birth_date.toISOString(),
    address: data.address,
    national_id: data.national_id,
    insurance_number: data.insurance_number,
    registration_date: data.registration_date.toISOString(),
    preferred_language: data.preferred_language,
    contact_preference: data.contact_preference,
    emergency_contact: {
      name: data.emergency_contact.name,
      relation: data.emergency_contact.relation,
      phone: data.emergency_contact.phone,
    },
    consent_to_contact: data.consent_to_contact,
    consent_signed_date: data.consent_signed_date?.toISOString(),
    status: data.status,
  };

  const conditions: WithPatientId<Condition>[] = data.conditions
    .split(',')
    .map((item: string) => item.trim())
    .filter(Boolean)
    .map((item: string) => ({
      id: crypto.randomUUID(),
      condition: item,
      patient_id: patientCore.id,
    }));

  const medical_flags: WithPatientId<Flag>[] = data.medical_flags
    .split(',')
    .map((item: string) => item.trim())
    .filter(Boolean)
    .map((item: string) => ({
      id: crypto.randomUUID(),
      patient_id: patientCore.id,
      flag: item,
    }));

  const tags: WithEntity<Tag>[] = data.tags
    .split(',')
    .map((item: string) => item.trim())
    .filter(Boolean)
    .map((item: string) => ({
      id: crypto.randomUUID(),
      entity_type: 'patient',
      entity_id: patientCore.id,
      tag: item,
    }));

  const allergies: WithPatientId<Allergy>[] = data.allergies.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    patient_id: patientCore.id,
    substance: item.substance,
    reaction: item.reaction,
    severity: item.severity,
  }));

  const medications: WithPatientId<Medication>[] = data.medications.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    patient_id: patientCore.id,
    start_date: item.start_date.toISOString(),
    end_date: item.end_date.toISOString(),
  }));

  return { patientCore, conditions, medical_flags, tags, allergies, medications };
}
