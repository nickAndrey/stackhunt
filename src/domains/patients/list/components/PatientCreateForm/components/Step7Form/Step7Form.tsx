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
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step7FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step7Form'];

function Step7Form(form: Step7FormProps) {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status">Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue placeholder="Select a status..." />
                  </SelectTrigger>
                  <SelectContent>
                    {['active', 'inactive', 'deceased', 'blocked'].map((status) => (
                      <SelectItem value={status} key={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide a comma separated tags..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Step7Form;
