import { useAuth } from '@/app/contexts/auth';
import { uploadFiles } from '@/shared/services/upload-files';
import type { FileRecord } from '@/shared/types/file-record';
import { type FormStatus } from '@/shared/types/form-status';
import type { Staff } from '@/shared/types/staff';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { updateMember } from '../../../services/update-member';

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  employee_id: z.string(),
  phone: z.string(),
  gender: z.enum(['male', 'female', 'other', 'undisclosed']),
  status: z.enum(['active', 'inactive', 'terminated', 'on_leave']),
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
  const { handleUpdateMember } = useAuth();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: staff.first_name || '',
      last_name: staff.last_name || '',
      employee_id: staff.employee_id || '',
      phone: staff.phone || '',
      gender: staff.gender || 'other',
      status: staff.status || 'active',
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
      tags: staff.tags?.map((tag) => tag.tag).join(',') || '',
    },
  });

  const handleSubmit = (files: FileRecord[]) => {
    return form.handleSubmit(async (data) => {
      setFormStatus('processing');
      await new Promise((res) => setTimeout(res, 1000));

      try {
        await updateMember({
          fields: data,
          memberId: staff.id,
        });

        if (files.length > 0) {
          uploadFiles({
            files: files.map((file) => ({ ...file, name: 'profile-image' })),
            entityType: 'staff',
            entityId: staff.id,
          }).then(() => handleUpdateMember('profile_image', files[0].file));
        }

        setFormStatus('idle');

        toast.success('The profile was successfully updated.');
      } catch (err) {
        setFormStatus('error');
        toast.error((err as Error).message);
        console.error((err as Error).message);
      }
    });
  };

  return { form, formStatus, schema, handleSubmit };
}
