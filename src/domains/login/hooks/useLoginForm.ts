import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter.',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter.',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number.',
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: 'Password must contain at least one special character.',
  });

const loginSchema = z.object({
  email: z.email({ error: 'Email is invalid' }),
  password: passwordSchema,
  remember_me: z.boolean(),
});

export function useLoginForm() {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  const handleSubmit = () => {
    const isValid = loginForm.trigger();
    if (!isValid) return;

    console.log(loginForm.getValues());
  };

  return {
    loginForm,
    handleSubmit,
  };
}
