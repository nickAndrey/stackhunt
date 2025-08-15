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
import { Popover, PopoverContent, PopoverTrigger } from '@/design-system/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import { Combobox, useCombobox } from '@/shared/components/Combobox';
import { DAYJS_FORMAT } from '@/shared/constants';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { getLabelByRoleAssignment } from '../../../../utils/get-label-by-role-assignment';
import type { useAssignPatientForm } from './hooks/useAssignPatientForm';
import { searchOverPatients } from './services/search-over-patients';

type AssignPatientFormProps = ReturnType<typeof useAssignPatientForm> & {};

export function AssignPatientForm(props: AssignPatientFormProps) {
  const comboboxStatePatient = useCombobox(searchOverPatients);

  useEffect(() => {
    props.form.setValue('patient_id', comboboxStatePatient.value);
  }, [comboboxStatePatient.value]);

  return (
    <Form {...props.form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={props.form.control}
          name="patient_id"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="patient_id">Patient</FormLabel>
              <FormControl>
                <Combobox {...comboboxStatePatient} id="patient_id" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="role">Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.schema.shape.role.options.map((role) => (
                      <SelectItem value={role} key={role}>
                        {getLabelByRoleAssignment(role)}
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
          control={props.form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="start_date">Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" id="start_date">
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
      </form>
    </Form>
  );
}
