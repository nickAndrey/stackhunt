import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { createAppointment } from '../services/create-appointment';

const schema = z.object({
  staffId: z.string().min(1, 'You have to select a staff member to create an appointment.'),
  type: z.enum(['consultation', 'follow_up', 'surgery', 'lab_test', 'vaccination', 'emergency']),
  date: z.date(),
  time: z.string(),
  notes: z.string().optional(),
});

export function useCreateAppointmentForm(patientId: string) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      staffId: '',
      type: 'consultation',
      date: new Date(),
      time: '09:30:00',
      notes: '',
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleCreateAppointment = form.handleSubmit(async (data) => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    try {
      if (!patientId) throw new Error('Patient Id was not provided.');

      const timeFractions = data.time.split(':').map((val) => parseFloat(val));
      const appointmentDate = dayjs(data.date)
        .set('hours', timeFractions[0])
        .set('minutes', timeFractions[1])
        .set('seconds', timeFractions[2]);

      await createAppointment({
        patientId,
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

  return { form, formStatus, schema, handleCreateAppointment };
}
