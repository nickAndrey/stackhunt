import { Button } from '@/design-system/components/ui/button';
import { Calendar } from '@/design-system/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/design-system/components/ui/form';
import { Input } from '@/design-system/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/design-system/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import { Textarea } from '@/design-system/components/ui/textarea';
import type { Staff } from '@/shared/types/staff';
import { getAppointmentLabel } from '@/shared/utils/getAppointmentLabel';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import type { useAppointmentForm } from './hooks/useAppointmentForm';

// Todo: uncomment and connect with useAppointmentForm hook.
type AppointmentFormProps = ReturnType<typeof useAppointmentForm> & {
  staff: Staff[];
};

export function AppointmentForm({ staff, form, formSchema }: AppointmentFormProps) {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="appointment-type">Appointment type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full" id="appointment-type">
                  <SelectValue placeholder="Appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {formSchema.shape.type.options.map((opt) => (
                    <SelectItem value={opt} key={opt}>
                      {getAppointmentLabel(opt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="staff_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="staff-id">Doctor</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id="staff-id">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((doctor) => (
                      <SelectItem value={doctor.id} key={doctor.id}>
                        <div className="w-full flex justify-between gap-2 items-center">
                          <p>
                            {doctor.first_name} {doctor.last_name}
                          </p>
                          <small>{doctor.specialty}</small>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className="flex gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="date">Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" id="date">
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
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="time">Time</FormLabel>
                <Input
                  type="time"
                  id="time"
                  step="1"
                  onChange={field.onChange}
                  value={field.value}
                  className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="note">Note</FormLabel>
              <Textarea
                id="note"
                onChange={field.onChange}
                value={field.value}
                placeholder="Provide a note"
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
