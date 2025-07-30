import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step3FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step3Form'];

function Step3Form(form: Step3FormProps) {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="emergency_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide an emergency contact..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferred_language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Language</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide a preferred language..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent_to_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consent To Contact</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_preference"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contact_preference">Contact Preference</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id="contact_preference">
                    <SelectValue placeholder="Select a preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {['email', 'phone', 'sms'].map((preference) => (
                      <SelectItem value={preference} key={preference}>
                        {preference}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Step3Form;
