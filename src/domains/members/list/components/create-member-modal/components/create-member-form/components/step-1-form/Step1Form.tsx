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
import { Switch } from '@/design-system/components/ui/switch';
import type { useCreateMemberForm } from '../../hooks/useCreateMemberForm';

type Step1FormProps = {
  form: ReturnType<typeof useCreateMemberForm>['forms']['step1Form'];
  schema: ReturnType<typeof useCreateMemberForm>['schemas']['personalInfoSchema'];
};

export function Step1Form({ form, schema }: Step1FormProps) {
  const isAutoGenerate = form.watch('isAutoGenerate');

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="isAutoGenerate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Generate automatically (demo purposes)</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <fieldset className={isAutoGenerate ? 'hidden' : 'flex flex-col gap-3'}>
          <FormField
            control={form.control}
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
            control={form.control}
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
          <FormField
            control={form.control}
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
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="username"
                    placeholder="Provide a phone number..."
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className={
                        form.formState.errors.gender
                          ? 'w-full border-destructive ring-destructive'
                          : 'w-full'
                      }
                      id="gender"
                    >
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {schema.shape.gender.options.map((gender) => (
                        <SelectItem value={gender} key={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferred_contact_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="preferred_contact_method">Contact Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className={
                        form.formState.errors.preferred_contact_method
                          ? 'w-full border-destructive ring-destructive'
                          : 'w-full'
                      }
                      id="preferred_contact_method"
                    >
                      <SelectValue placeholder="Select a contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      {schema.shape.preferred_contact_method.options.map((method) => (
                        <SelectItem value={method} key={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
}
