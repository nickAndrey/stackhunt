import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design-system/components/ui/accordion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step5FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step5Form'];

function Step5Form(form: Step5FormProps) {
  const allergies = useFieldArray({
    control: form.control,
    name: 'allergies',
  });

  const medications = useFieldArray({
    control: form.control,
    name: 'medications',
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="medical_flags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide comma separated flags..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions</FormLabel>
              <FormControl>
                <Input
                  placeholder="Provide comma separated conditions..."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Accordion type="multiple">
          <AccordionItem value="allergies">
            <AccordionTrigger>Allergies</AccordionTrigger>
            <AccordionContent>
              {allergies.fields.map((allergy, index) => (
                <div key={allergy.id}>
                  <FormItem>
                    <FormLabel>Substance</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide a substance..."
                        {...form.register(`allergies.${index}.substance`)}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Reaction</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide a reaction..."
                        {...form.register(`allergies.${index}.reaction`)}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel htmlFor="severity">Severity</FormLabel>
                    <FormControl>
                      <Select {...form.register(`allergies.${index}.severity`)}>
                        <SelectTrigger className="w-full" id="severity">
                          <SelectValue placeholder="Select a preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {['mild', 'moderate', 'severe'].map((severity) => (
                            <SelectItem value={severity} key={severity}>
                              {severity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="medications">
            <AccordionTrigger>Medications</AccordionTrigger>
            <AccordionContent>
              {medications.fields.map((medication, index) => (
                <div key={medication.id} className="not:last-of-type:border-b">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide a name..."
                        {...form.register(`medications.${index}.name`)}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Provide a dosage..."
                        {...form.register(`medications.${index}.dosage`)}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Prescribed By</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Prescribed by..."
                        {...form.register(`medications.${index}.prescribed_by`)}
                      />
                    </FormControl>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name={`medications.${index}.start_date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="start_date">Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" id="start_date">
                                {medication.start_date ? (
                                  dayjs(medication.start_date).format('MMMM D, YYYY')
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
                    name={`medications.${index}.end_date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="end_date">End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" id="end_date">
                                {medication.end_date ? (
                                  dayjs(medication.end_date).format('MMMM D, YYYY')
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
                </div>
              ))}
            </AccordionContent>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                medications.append({
                  name: '',
                  dosage: '',
                  start_date: new Date(),
                  end_date: new Date(),
                  prescribed_by: '',
                })
              }
            >
              Add Medication
            </Button>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}

export default Step5Form;
