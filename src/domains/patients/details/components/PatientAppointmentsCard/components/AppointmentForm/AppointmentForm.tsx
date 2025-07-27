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
import type { AppointmentType } from '@/shared/types/patient';
import { getAppointmentLabel } from '@/shared/utils/getAppointmentLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  type: z.enum<AppointmentType[]>([
    'consultation',
    'emergency',
    'follow_up',
    'lab_test',
    'surgery',
    'vaccination',
  ]),
  staff_id: z.string().min(1, 'Staff ID must be provided'),
  date: z.date({
    error: 'Date must be provided',
  }),
  time: z.string({
    error: 'Time must be provided',
  }),
  note: z.string(),
});

// Todo: uncomment and connect with useAppointmentForm hook.
// type AppointmentFormProps = {};

function AppointmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'consultation',
      date: new Date(),
      time: '09:30:00',
      staff_id: '',
      note: '',
    },
  });

  // Todo: replace with actual list of doctors
  const dumpDoctors = [
    {
      id: '1',
      name: 'Dr. J.J. Johnson',
    },
    {
      id: '2',
      name: 'Dr. Sarah Thompson',
    },
    {
      id: '3',
      name: 'Dr. Miguel Alvarez',
    },
    {
      id: '4',
      name: 'Dr. Priya Mehta',
    },
    {
      id: '5',
      name: 'Dr. Ahmed El-Sayed',
    },
    {
      id: '6',
      name: 'Dr. Lisa Chen',
    },
    {
      id: '7',
      name: 'Dr. Tomás Ribeiro',
    },
    {
      id: '8',
      name: 'Dr. Emily Carter',
    },
    {
      id: '9',
      name: 'Dr. Giovanni Russo',
    },
    {
      id: '10',
      name: 'Dr. Hana Nakamura',
    },
  ];

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                    {dumpDoctors.map((doctor) => (
                      <SelectItem value={doctor.id} key={doctor.id}>
                        {doctor.name}
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
                      <Button variant="outline">
                        {field.value ? (
                          dayjs(field.value).format('MMMM-DD-YYYY')
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

export default AppointmentForm;
