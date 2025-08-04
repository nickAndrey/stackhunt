import { useAuth } from '@/app/contexts/auth';
import { registerNewMember } from '@/shared/services/members/register-new-member';
import type { FormStatus } from '@/shared/types/form-status';
import { passwordSchema } from '@/shared/zod-schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

const schema = z
  .object({
    first_name: z.string().min(1, { error: 'This field is required.' }),
    last_name: z.string().min(1, { error: 'This field is required.' }),
    email: z.email(),
    role: z.enum(['admin']),
    password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirm_password'],
      });
    }
  });

export function useRegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'admin',
      password: '',
      confirm_password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setFormStatus('processing');

    await new Promise((res) => setTimeout(res, 2000));

    await registerNewMember(data);
    await login({ email: data.email, password: data.password });

    setFormStatus('idle');

    await navigate('/');
  });

  return { form, formStatus, schema, handleSubmit };
}
