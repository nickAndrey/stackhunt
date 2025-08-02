import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { addressAndBioSchema, jobDetailsSchema, personalInfoSchema } from './schemas';

export function useCreateMemberForm() {
  const [step, setStep] = useState(0);

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@hospital.test',
      phone: '+1234567890',
      gender: 'male',
      preferred_contact_method: 'email',
    },
  });

  const step2Form = useForm<z.infer<typeof jobDetailsSchema>>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      role: 'admin',
      status: 'active',
      department: 'General Medicine',
      specialty: 'Internal Medicine',
      license_number: 'MD-123456',
      employee_id: 'EMP-0001',
      start_date: new Date(),
    },
  });

  const step3Form = useForm<z.infer<typeof addressAndBioSchema>>({
    resolver: zodResolver(addressAndBioSchema),
    defaultValues: {
      bio: 'Experienced general practitioner with administrative responsibilities.',
      address: {
        street: '123 Health Blvd',
        city: 'MediCity',
        zip_code: '12345',
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

  return { step, schemas, forms, handleNext, handlePrev, handleSubmit };
}
