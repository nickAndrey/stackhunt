import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { createPatient } from '../../../services/create-patient';
import { transformCreatePatientFormData } from '../../../utils/transform-create-patient-form-data';
import {
  contactInfoSchema,
  emergencySchema,
  filesAndNotesSchema,
  identificationSchema,
  medicalInfoSchema,
  personalInfoSchema,
  tagsSchema,
} from './form-schema';

export function usePatientCreateForm() {
  const [step, setStep] = useState(0);

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: 'John',
      last_name: 'Doe',
      gender: 'male',
      birth_date: new Date(),
    },
  });

  const step2Form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      phone: '+1 779 655 3674',
      email: 'john.doe@gmail.com',
      address: {
        street: '2238 Yukon St',
        city: 'Vancouver',
        zip_code: 'V5Y 1K9',
      },
    },
  });

  const step3Form = useForm<z.infer<typeof emergencySchema>>({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      emergency_contact: {
        name: 'Jane Doe',
        relation: 'wife',
        phone: '+1 779 655 3675',
      },
      preferred_language: 'en',
      contact_preference: 'email',
      consent_to_contact: true,
      consent_signed_date: new Date(),
    },
  });

  const step4Form = useForm<z.infer<typeof identificationSchema>>({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      national_id: '7312045839',
      insurance_number: 'INS-5249-3821',
      registration_date: new Date(),
    },
  });

  const step5Form = useForm<z.infer<typeof medicalInfoSchema>>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      medical_flags: 'Diabetic, Hypertension',
      conditions: 'Asthma, Chronic back pain',
      allergies: [
        {
          substance: 'Peanuts',
          reaction: 'Anaphylaxis',
          severity: 'severe',
        },
        {
          substance: 'Penicillin',
          reaction: 'Rash',
          severity: 'moderate',
        },
      ],
      medications: [
        {
          name: 'Metformin',
          dosage: '500mg twice daily',
          start_date: new Date('2023-03-01'),
          end_date: new Date('2025-03-01'),
          prescribed_by: 'Dr. Sarah Thompson',
        },
        {
          name: 'Albuterol Inhaler',
          dosage: '2 puffs as needed',
          start_date: new Date('2022-01-15'),
          end_date: new Date('2026-01-15'),
          prescribed_by: 'Dr. James Lee',
        },
      ],
    },
  });

  const step6Form = useForm<z.infer<typeof filesAndNotesSchema>>({
    resolver: zodResolver(filesAndNotesSchema),
    defaultValues: {
      files: [],
    },
  });

  const step7Form = useForm<z.infer<typeof tagsSchema>>({
    resolver: zodResolver(tagsSchema),
    defaultValues: {
      status: 'active',
      tags: '',
    },
  });

  const forms = {
    step1Form,
    step2Form,
    step3Form,
    step4Form,
    step5Form,
    step6Form,
    step7Form,
  };

  const handleNext = async () => {
    const activeForm = Object.entries(forms)[step][1];

    const isValid = await activeForm.trigger();
    if (!isValid) return;

    if (step <= Object.keys(forms).length) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const finalData = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
      ...step3Form.getValues(),
      ...step4Form.getValues(),
      ...step5Form.getValues(),
      ...step6Form.getValues(),
      ...step7Form.getValues(),
    };
    const transformedData = transformCreatePatientFormData(finalData);
    await createPatient(transformedData);
  };

  return {
    step,
    forms,
    handleNext,
    handlePrev,
    handleSubmit,
  };
}
