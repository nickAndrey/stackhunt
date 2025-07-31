import type { CreatePatientForm } from '../types/create-patient-form';

export function transformCreatePatientFormData(data: CreatePatientForm) {
  const patientCore = {
    id: crypto.randomUUID(),
    profile_image: '',
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

  const conditions = data.conditions
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({
      condition: item,
      id: crypto.randomUUID(),
    }));

  const medical_flags = data.medical_flags
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({
      flag: item,
      id: crypto.randomUUID(),
    }));

  const tags = data.tags
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({
      tag: item,
      id: crypto.randomUUID(),
    }));

  const allergies = data.allergies.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));

  const medications = data.medications.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    start_date: item.start_date.toISOString(),
    end_date: item.end_date.toISOString(),
  }));

  const files = data.files.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));

  return { patientCore, conditions, medical_flags, tags, allergies, medications, files };
}
