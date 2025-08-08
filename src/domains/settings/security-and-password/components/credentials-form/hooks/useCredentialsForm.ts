import type { AuthCredentials } from '@/shared/types/auth-credentials';
import type { FormStatus } from '@/shared/types/form-status';
import { passwordSchema } from '@/shared/zod-schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { updateCredentials } from '../../../services/update-credentials';

const schema = z
  .object({
    email: z.email(),
    role: z.enum(['doctor', 'nurse', 'technician', 'admin', 'receptionist', 'lab', 'pharmacist']),
    current_password: passwordSchema,
    new_password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .superRefine(({ new_password, confirm_password }, ctx) => {
    if (new_password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirm_password'],
      });
    }
  });

type Params = {
  initialValues: AuthCredentials;
};

export function useCredentialsForm({ initialValues }: Params) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: initialValues.email || '',
      role: initialValues.role || '',
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      setFormStatus('processing');
      await new Promise((res) => setTimeout(res, 2000));

      await updateCredentials({
        memberId: initialValues.staff_id,
        fields: formData,
      });

      setFormStatus('idle');
      toast.success('The profile credentials was successfully updated.');
    } catch (err) {
      setFormStatus('error');
      console.log((err as Error).message);
      toast.error((err as Error).message);
    }
  });

  return { form, formStatus, schema, handleSubmit };
}
