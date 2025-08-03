import { passwordSchema } from '@/shared/zod-schemas/password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

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
