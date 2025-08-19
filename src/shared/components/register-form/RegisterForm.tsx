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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { useRegisterForm } from './hooks/useRegisterForm';

type RegisterFormProps = ReturnType<typeof useRegisterForm>;

export function RegisterForm(props: RegisterFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Form {...props.form}>
      <form className="flex flex-col gap-3">
        <fieldset className="flex items-start gap-3">
          <FormField
            control={props.form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Provide a first name..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Provide a last name..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={props.form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
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
          control={props.form.control}
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
        <FormField
          control={props.form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Confirm a password..."
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
      </form>
    </Form>
  );
}
