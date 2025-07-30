import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
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
  const [step, setStep] = useState(4);

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      gender: 'other',
      birth_date: new Date(),
    },
  });

  const step2Form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        zip_code: '',
      },
    },
  });

  const step3Form = useForm<z.infer<typeof emergencySchema>>({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      emergency_contact: '',
      preferred_language: '',
      contact_preference: 'email',
      consent_to_contact: false,
      consent_signed_date: new Date(),
    },
  });

  const step4Form = useForm<z.infer<typeof identificationSchema>>({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      national_id: '',
      insurance_number: '',
      registration_date: new Date(),
    },
  });

  const step5Form = useForm<z.infer<typeof medicalInfoSchema>>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      medical_flags: '',
      conditions: '',
      allergies: [
        {
          substance: '',
          reaction: '',
          severity: 'moderate',
        },
      ],
      medications: [
        {
          name: '',
          dosage: '',
          prescribed_by: '',
          start_date: new Date(),
          end_date: new Date(),
        },
      ],
    },
  });

  const step6Form = useForm<z.infer<typeof filesAndNotesSchema>>({
    resolver: zodResolver(filesAndNotesSchema),
    defaultValues: {},
  });

  const step7Form = useForm<z.infer<typeof tagsSchema>>({
    resolver: zodResolver(tagsSchema),
    defaultValues: {},
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

    const currentData = activeForm.getValues();
    console.log(currentData);

    if (step <= Object.keys(forms).length) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  // const handleSubmit = async () => {
  //   const formData = form.getValues();
  //   console.log(formData);
  // };

  return {
    step,
    forms,
    handleNext,
    handlePrev,
  };
}
