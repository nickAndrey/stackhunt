import { useAuth } from '@/app/contexts/auth';
import type { FormStatus } from '@/shared/types/form-status';
import { passwordSchema } from '@/shared/zod-schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

const loginSchema = z.object({
  email: z.email({ error: 'Email is invalid' }),
  password: passwordSchema,
});

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'john.doe@gmail.com',
      password: 'mm_Camtel-12**',
    },
  });

  const handleSubmit = loginForm.handleSubmit(async (data) => {
    setFormStatus('processing');

    await new Promise((res) => setTimeout(res, 2000));

    const { success, msg } = await login({
      email: data.email,
      password: data.password,
    });

    if (!success) {
      setFormStatus('error');
      setLoginErrorMsg(msg);
      return;
    }

    await navigate('/');
  });

  return {
    loginForm,
    formStatus,
    loginErrorMsg,
    handleSubmit,
  };
}
