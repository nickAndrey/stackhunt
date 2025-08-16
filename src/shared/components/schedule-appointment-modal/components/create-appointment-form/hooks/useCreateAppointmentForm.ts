import { createAppointment } from '@/shared/services/create-appointment';
import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const schema = z.object({
  staffId: z.string().min(1, 'You have to select a staff member to create an appointment.'),
  patientId: z.string().min(1, 'You have to select a patient to create an appointment.'),
  type: z.enum(['consultation', 'follow_up', 'surgery', 'lab_test', 'vaccination', 'emergency']),
  date: z.date(),
  time: z.string(),
  notes: z.string().optional(),
});

type Params = {
  options?: {
    staffId?: string;
    patientId?: string;
    date?: Date;
  };
};

export function useCreateAppointmentForm(params: Params) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: '',
      staffId: '',
      type: 'consultation',
      date: new Date(),
      time: '09:30:00',
      notes: '',
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    if (params.options?.staffId) {
      form.setValue('staffId', params.options.staffId);
    }

    if (params.options?.patientId) {
      form.setValue('patientId', params.options.patientId);
    }

    if (params.options?.date) {
      form.setValue('date', params.options.date);
    }

    return () => {
      form.reset();
    };
  }, [form, params.options]);

  const handleCreateAppointment = form.handleSubmit(async (data) => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      const timeFractions = data.time.split(':').map((val) => parseFloat(val));
      const appointmentDate = dayjs(data.date)
        .set('hours', timeFractions[0])
        .set('minutes', timeFractions[1])
        .set('seconds', timeFractions[2]);

      await createAppointment({
        patientId: data.patientId,
        staffId: data.staffId,
        type: data.type,
        notes: data.notes,
        date: appointmentDate.toISOString(),
      });

      setFormStatus('success');
      toast.success('An appointment has been created.');
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
    }
  });

  return {
    form,
    formStatus,
    schema,
    handleCreateAppointment,
  };
}
