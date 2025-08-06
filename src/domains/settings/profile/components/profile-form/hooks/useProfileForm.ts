import { type FormStatus } from '@/shared/types/form-status';
import type { Staff } from '@/shared/types/staff';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  role: z.enum(['doctor', 'nurse', 'technician', 'admin', 'receptionist', 'lab', 'pharmacist']),
  employee_id: z.string(),
  phone: z.string(),
  gender: z.enum(['male', 'female', 'other', 'undisclosed']),
  status: z.enum(['active', 'inactive', 'terminated', 'on_leave']),
  profile_image: z.string(),
  department: z.string(),
  specialty: z.string(),
  license_number: z.string(),
  start_date: z.date(),
  bio: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip_code: z.string(),
  }),
  preferred_contact_method: z.enum(['email', 'phone', 'sms']),
  tags: z.string(),
});

type Params = {
  staff: Partial<Staff>;
};

export function useProfileForm({ staff }: Params) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: staff.first_name || '',
      last_name: staff.last_name || '',
      email: staff.email || '',
      role: staff.role || 'admin',
      employee_id: staff.employee_id || '',
      phone: staff.phone || '',
      gender: staff.gender || 'other',
      status: staff.status || 'active',
      profile_image: staff.profile_image || '',
      department: staff.department || '',
      specialty: staff.specialty || '',
      license_number: staff.license_number || '',
      start_date: new Date(staff.start_date || dayjs().format()),
      bio: staff.bio || '',
      address: {
        street: staff.address?.street || '',
        city: staff.address?.city || '',
        zip_code: staff.address?.zip_code || '',
      },
      preferred_contact_method: staff.preferred_contact_method || 'email',
      tags: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    setFormStatus('processing');
  });

  return { form, formStatus, schema, handleSubmit };
}
