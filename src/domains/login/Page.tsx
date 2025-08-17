import { Alert, AlertDescription, AlertTitle } from '@/design-system/components/ui/alert';
import { Button } from '@/design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/design-system/components/ui/form';
import { Input } from '@/design-system/components/ui/input';
import { AlertCircleIcon, Download, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Navigate } from 'react-router';
import { useLoginForm } from './hooks/useLoginForm';

type LoginPageProps = {
  isAdminUser: boolean;
};

export function LoginPage({ isAdminUser }: LoginPageProps) {
  const { loginForm, formStatus, loginErrorMsg, handleSubmit } = useLoginForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (!isAdminUser) return <Navigate to="/auth/register" />;

  return (
    <div className="flex flex-col gap-3 px-2 py-4 max-w-md w-full max-h-screen overflow-y-auto">
      {loginErrorMsg && (
        <Alert variant="destructive" className="w-md">
          <AlertCircleIcon />
          <AlertTitle>Unable to login.</AlertTitle>
          <AlertDescription>
            <p>Please verify credentials provided.</p>
            <p>{loginErrorMsg}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="rounded-2xl  shadow-gray-400 pt-4 px-4 pb-8 space-y-6 bg-white">
        <img
          src="/logo.png"
          alt="Mounting Medical logo"
          className="m-auto mb-4 w-[136px] h-[65px]"
        />

        <div className="text-center space-y-1 mb-4">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Please enter your email and password to sign in.
          </p>
        </div>

        <Form {...loginForm}>
          <form className="flex flex-col items-center justify-center space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      placeholder="Provide an email..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Provide a password..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-2 top-[50%] translate-y-[-50%] rounded-full size-6"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff className="w-[18px] h-[18px]" />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" />
                      )}
                    </Button>
                  </div>
                  <div className="flex justify-between items-top">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="button" variant="secondary" className="w-full" onClick={handleSubmit}>
              {formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
              <span className="font-semibold text-sm">Sign in</span>
              <Download className="rotate-[-90deg]" />
            </Button>

            <a href="" className="text-xs hover:underline text-nowrap ml-auto">
              Forgot password?
            </a>
          </form>
        </Form>
      </div>
    </div>
  );
}
