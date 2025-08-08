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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { useCredentialsForm } from './hooks/useCredentialsForm';

type CredentialsFormProps = ReturnType<typeof useCredentialsForm> & {};

export function CredentialsForm({ form, schema }: CredentialsFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="role">Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id="role">
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {schema.shape.role.options.map((role) => (
                      <SelectItem value={role} key={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="my-4" />
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Current Password</FormLabel>
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
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>New Password</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    type={isNewPasswordVisible ? 'text' : 'password'}
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
                  onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                >
                  {isNewPasswordVisible ? (
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
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm New Password</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    type={isNewPasswordVisible ? 'text' : 'password'}
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
                  onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                >
                  {isNewPasswordVisible ? (
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
