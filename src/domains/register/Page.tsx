import { Alert, AlertDescription, AlertTitle } from '@/design-system/components/ui/alert';
import { Button } from '@/design-system/components/ui/button';
import { AlertCircleIcon, LoaderCircle } from 'lucide-react';
import { Navigate } from 'react-router';
import { RegisterForm, useRegisterForm } from './components/register-form';

type RegisterPageProps = {
  isAdminUser: boolean;
};

export function RegisterPage({ isAdminUser }: RegisterPageProps) {
  const registerForm = useRegisterForm();

  if (isAdminUser) return <Navigate to="/auth/login" />;

  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center bg-[url(/login-page-bg.webp)] bg-cover bg-center">
      <Alert className="w-xl">
        <AlertCircleIcon />
        <AlertTitle>Administrator Setup</AlertTitle>
        <AlertDescription>
          You’re creating the first admin account with full system access. Use a strong password and
          store it safely.
        </AlertDescription>
      </Alert>
      <div className="w-xl max-h-10/12 rounded-2xl shadow-xl shadow-gray-400 pt-4 px-4 pb-8 space-y-6 bg-white">
        <img
          src="/logo.png"
          alt="Mounting Medical logo"
          className="m-auto mb-4 w-[136px] h-[65px]"
        />

        <div className="text-center space-y-1 mb-4">
          <h1 className="text-2xl font-bold">Welcome to Mounting Medical</h1>
        </div>

        <div className="overflow-y-auto max-h-[300px] px-2">
          <RegisterForm {...registerForm} />
        </div>

        <Button variant="secondary" className="w-full" onClick={registerForm.handleSubmit}>
          {registerForm.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
}
