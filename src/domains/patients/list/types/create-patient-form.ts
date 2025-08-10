import type z from 'zod';
import type {
  contactInfoSchema,
  emergencySchema,
  identificationSchema,
  medicalInfoSchema,
  personalInfoSchema,
  tagsSchema,
} from '../components/patient-create-form/hooks/form-schema';

export type CreatePatientForm = z.infer<typeof personalInfoSchema> &
  z.infer<typeof contactInfoSchema> &
  z.infer<typeof identificationSchema> &
  z.infer<typeof medicalInfoSchema> &
  z.infer<typeof emergencySchema> &
  z.infer<typeof tagsSchema>;
