import { Button } from '@/design-system/components/ui/button';
import { Calendar } from '@/design-system/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/design-system/components/ui/form';
import { Input } from '@/design-system/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/design-system/components/ui/popover';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step4FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step4Form'];

function Step4Form(form: Step4FormProps) {
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="insurance_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide an insurance number..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="national_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide a national id..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration_date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="registration_date">Registration Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" id="registration_date">
                      {field.value ? (
                        dayjs(field.value).format('MMMM D, YYYY')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Step4Form;
