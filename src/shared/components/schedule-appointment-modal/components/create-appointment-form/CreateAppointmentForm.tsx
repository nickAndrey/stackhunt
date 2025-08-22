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
import type { useCreateAppointmentForm } from './hooks/useCreateAppointmentForm';
import { searchOverPatients } from './services/search-over-patients';
import { searchOverStaff } from './services/search-over-staff';

type CreateAppointmentFormProps = ReturnType<typeof useCreateAppointmentForm> & {};

export function CreateAppointmentForm(params: CreateAppointmentFormProps) {
  const comboboxStatePatient = useCombobox(searchOverPatients);
  const comboboxStateMember = useCombobox(searchOverStaff);

  return (
    <Form {...params.form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={params.form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="staff_id">Staff member</FormLabel>
              <FormControl>
                <Combobox
                  id="staff_id"
                  {...comboboxStateMember}
                  value={field.value}
                  onValueChange={(value) => params.form.setValue('staffId', value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={params.form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="patient_id">Patient</FormLabel>
              <FormControl>
                <Combobox
                  id="patient_id"
                  {...comboboxStatePatient}
                  value={field.value}
                  onValueChange={(value) => params.form.setValue('patientId', value)}
                />
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
                rows={5}
                className="min-h-[100px] resize-y flex-shrink-0"
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
