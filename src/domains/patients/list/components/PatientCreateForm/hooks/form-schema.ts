import z from 'zod';

export const personalInfoSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  gender: z.enum(['male', 'female', 'other', 'undisclosed']),
  birth_date: z.date(),
});

export const contactInfoSchema = z.object({
  phone: z.string(),
  email: z.email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip_code: z.string(),
  }),
});

export const identificationSchema = z.object({
  national_id: z.string().optional(),
  insurance_number: z.string().optional(),
  registration_date: z.date(),
});

export const medicalInfoSchema = z.object({
  medical_flags: z.string(),
  conditions: z.string(),
  allergies: z.array(
    z.object({
      substance: z.string(),
      reaction: z.string(),
      severity: z.enum(['mild', 'moderate', 'severe']),
    })
  ),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      start_date: z.date(),
      end_date: z.date(),
      prescribed_by: z.string(),
    })
  ),
});

export const filesAndNotesSchema = z.object({
  notes: z.array(
    z.object({
      note: z.string(),
    })
  ),
  files: z.array(
    z.object({
      url: z.string(),
    })
  ),
});

export const emergencySchema = z.object({
  emergency_contact: z.string().optional(),
  preferred_language: z.string().optional(),
  contact_preference: z.enum(['email', 'phone', 'sms']),
  consent_to_contact: z.boolean(),
  consent_signed_date: z.date().optional(),
});

export const tagsSchema = z.object({
  status: z.enum(['active', 'inactive', 'deceased', 'blocked']),
  tags: z.array(
    z.object({
      tag: z.string(),
    })
  ),
});
