import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { createMember } from '../services/create-member';
import { addressAndBioSchema, jobDetailsSchema, personalInfoSchema } from './schemas';

export function useCreateMemberForm() {
  const [step, setStep] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const step1Form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      phone: '+1234567890',
      gender: 'other',
      preferred_contact_method: 'email',
    },
  });

  const step2Form = useForm<z.infer<typeof jobDetailsSchema>>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      role: 'doctor',
      status: 'active',
      department: 'test',
      specialty: 'test',
      license_number: '123',
      employee_id: '123',
      start_date: new Date(),
    },
  });

  const step3Form = useForm<z.infer<typeof addressAndBioSchema>>({
    resolver: zodResolver(addressAndBioSchema),
    defaultValues: {
      bio: 'tesst',
      address: {
        street: 'test',
        city: 'test',
        zip_code: '1234',
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

  const handleSubmit = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    const data = {
      ...step1Form.getValues(),
      ...step2Form.getValues(),
      ...step3Form.getValues(),
    };

    try {
      await createMember({ fields: data });
      toast.success('New member has been successfully created');
      setFormStatus('success');

      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');

      return false;
    }
  };

  return { step, schemas, forms, formStatus, handleNext, handlePrev, handleSubmit };
}
