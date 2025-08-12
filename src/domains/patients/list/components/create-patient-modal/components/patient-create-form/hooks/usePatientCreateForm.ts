import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { transformCreatePatientFormData } from '@/domains/patients/list/utils/transform-create-patient-form-data';
import type { FormStatus } from '@/shared/types/form-status';
import { createDemoPatients } from '../services/create-demo-patients';
import { createPatient } from '../services/create-patient';
import {
  contactInfoSchema,
  emergencySchema,
  identificationSchema,
  medicalInfoSchema,
  personalInfoSchema,
  tagsSchema,
} from './form-schema';

export function usePatientCreateForm() {
  const [step, setStep] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      isAutoGenerate: false,
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
      emergency_contact: {
        name: '',
        relation: '',
        phone: '',
      },
      preferred_language: '',
      contact_preference: 'email',
      consent_to_contact: true,
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
      allergies: [],
      medications: [],
    },
  });

  const step6Form = useForm<z.infer<typeof tagsSchema>>({
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
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    const finalData = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
      ...step3Form.getValues(),
      ...step4Form.getValues(),
      ...step5Form.getValues(),
      ...step6Form.getValues(),
    };

    try {
      const transformedData = transformCreatePatientFormData(finalData);
      await createPatient(transformedData);
      toast.success('New patient was successfully added.');

      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);

      return false;
    }
  };

  const handleAutoGenerate = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    try {
      await createDemoPatients();
      toast.success('New members have been successfully created');
      setFormStatus('success');

      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');

      return false;
    }
  };

  const handleReset = () => {
    // Set timeout need for silent resetting to not fail a close modal animation
    setTimeout(() => {
      Object.values(forms).forEach((form) => form.reset());
      setStep(0);
    }, 1000);
  };

  return {
    step,
    forms,
    formStatus,
    handleNext,
    handlePrev,
    handleSubmit,
    handleAutoGenerate,
    handleReset,
  };
}
