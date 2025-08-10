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
import { Combobox, useCombobox } from '@/shared/components/Combobox';
import { DAYJS_FORMAT } from '@/shared/constants';
import { getAppointmentLabel } from '@/shared/utils/getAppointmentLabel';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import type { useCreateAppointmentForm } from './hooks/useCreateAppointmentForm';
import { searchOverPatients } from './services/search-over-patients';

type CreateAppointmentFormProps = ReturnType<typeof useCreateAppointmentForm> & {};

export function CreateAppointmentForm(params: CreateAppointmentFormProps) {
  const comboboxState = useCombobox(searchOverPatients);

  useEffect(() => params.form.setValue('patientId', comboboxState.value), [comboboxState.value]);

  return (
    <Form {...params.form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={params.form.control}
          name="patientId"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="staff_id">Patient</FormLabel>
              <FormControl>
                <Combobox {...comboboxState} id="staff_id" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={params.form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="appointment-type">Appointment type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full" id="appointment-type">
                  <SelectValue placeholder="Appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {params.schema.shape.type.options.map((opt) => (
                    <SelectItem value={opt} key={opt}>
                      {getAppointmentLabel(opt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <fieldset className="flex gap-4">
          <FormField
            control={params.form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="date">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" id="date">
                        {field.value ? (
                          dayjs(field.value).format(DAYJS_FORMAT)
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
            control={params.form.control}
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
          control={params.form.control}
          name="notes"
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
