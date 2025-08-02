import { Alert, AlertDescription, AlertTitle } from '@/design-system/components/ui/alert';
import { Button } from '@/design-system/components/ui/button';
import { Checkbox } from '@/design-system/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/design-system/components/ui/form';
import { Input } from '@/design-system/components/ui/input';
import { Download, Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useLoginForm } from './hooks/useLoginForm';

type PageProps = {
  isAdminUser: boolean;
};

function Page({ isAdminUser }: PageProps) {
  const { loginForm, handleSubmit } = useLoginForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-[url(/login-page-bg.webp)] bg-cover bg-center">
      <div className="w-md min-h-4/12 rounded-2xl shadow-xl shadow-gray-400 pt-4 px-4 pb-8 space-y-6 bg-white">
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

        {!isAdminUser && (
          <Alert variant="default">
            <TriangleAlert />
            <AlertTitle>No Admin User Found</AlertTitle>
            <AlertDescription>
              Your system doesn't have an admin account yet.
              <Link to="/auth/register?admin=true" className="underline text-black">
                Create one now
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <Form {...loginForm}>
          <form
            className="flex flex-col items-center justify-center space-y-4 h-full"
            onSubmit={loginForm.handleSubmit(handleSubmit)}
          >
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

            <div className="flex items-center justify-between w-full">
              <FormField
                control={loginForm.control}
                name="remember_me"
                render={({ field }) => (
                  <FormItem className="w-full flex">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <a href="" className="text-xs hover:underline text-nowrap py-1">
                Forgot password?
              </a>
            </div>

            <Button variant="secondary" className="w-full">
              <span className="font-semibold text-sm">Sign in</span>
              <Download className="rotate-[-90deg]" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
