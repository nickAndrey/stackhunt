import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { addressAndBioSchema, jobDetailsSchema, personalInfoSchema } from './schemas';

export function useCreateMemberForm() {
  const [step, setStep] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: 'other',
      preferred_contact_method: 'email',
    },
  });

  const step2Form = useForm<z.infer<typeof jobDetailsSchema>>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      role: 'doctor',
      status: 'active',
      department: '',
      specialty: '',
      license_number: '',
      employee_id: '',
      start_date: new Date(),
    },
  });

  const step3Form = useForm<z.infer<typeof addressAndBioSchema>>({
    resolver: zodResolver(addressAndBioSchema),
    defaultValues: {
      bio: '',
      address: {
        street: '',
        city: '',
        zip_code: '',
      },
    },
  });

  const forms = {
    step1Form,
    step2Form,
    step3Form,
  };

  const schemas = {
    personalInfoSchema,
    jobDetailsSchema,
    addressAndBioSchema,
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

  const handleSubmit = async () => {};

  return { step, schemas, forms, formStatus, handleNext, handlePrev, handleSubmit };
}
