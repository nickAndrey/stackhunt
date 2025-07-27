import { db } from '@/shared/db/db';
import type { AppointmentType } from '@/shared/types/patient';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import z from 'zod';

type Args = {
  patientId: string;
};

export function useAppointmentForm({ patientId }: Args) {
  const formSchema = z.object({
    type: z.enum<AppointmentType[]>([
      'consultation',
      'emergency',
      'follow_up',
      'lab_test',
      'surgery',
      'vaccination',
    ]),
    staff_id: z.string().min(1, 'Staff ID must be provided'),
    date: z.date({
      error: 'Date must be provided',
    }),
    time: z.string({
      error: 'Time must be provided',
    }),
    note: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'consultation',
      date: new Date(),
      time: '09:30:00',
      staff_id: '',
      note: '',
    },
  });

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const formData = form.getValues();

    const timeFractions = formData.time.split(':').map((val) => parseFloat(val));

    const appointmentDate = dayjs(formData.date)
      .set('hours', timeFractions[0])
      .set('minutes', timeFractions[1])
      .set('seconds', timeFractions[2]);

    await db.appointments.add({
      patient_id: patientId,
      id: crypto.randomUUID(),
      type: formData.type,
      date: appointmentDate.toISOString(),
      status: 'scheduled',
      staff_id: formData.staff_id,
    });
  };

  return {
    form,
    formSchema,
    handleSubmit,
  };
}
