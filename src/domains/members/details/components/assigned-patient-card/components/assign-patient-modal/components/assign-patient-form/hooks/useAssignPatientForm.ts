import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';
import { assignPatient } from '../services/assign-patient';

const schema = z.object({
  patient_id: z.string().min(1, 'Field is required'),
  staff_id: z.string().min(1, 'Field is required'),
  role: z.enum(['primary', 'specialist', 'nurse', 'care_team']),
  start_date: z.date(),
});

export function useAssignPatientForm() {
  const { id } = useParams();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      patient_id: '',
      staff_id: '',
      role: 'primary',
      start_date: new Date(),
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    if (id) form.setValue('staff_id', id);
  }, [form, id]);

  const handleSubmit = async (): Promise<boolean> => {
    const isValid = await form.trigger();
    if (!isValid) return false;

    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    const data = form.getValues();

    try {
      await assignPatient({ fields: data });
      toast.success('Patient successfully assigned.');
      setFormStatus('success');
      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');
      return false;
    }
  };

  return { schema, form, formStatus, handleSubmit };
}
