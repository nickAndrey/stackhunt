import z from 'zod';

const personalInfoSchema = z.object({
  isAutoGenerate: z.boolean().optional(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.email({ error: 'Please provide a valid email' }),
  phone: z.string().min(1, 'Phone number is required'),
  gender: z.enum(['male', 'female', 'other', 'undisclosed'], {
    error: 'Please select a gender',
  }),
  preferred_contact_method: z.enum(['email', 'phone', 'sms'], {
    error: 'Select your preferred contact method',
  }),
});

const jobDetailsSchema = z.object({
  role: z.enum(['doctor', 'nurse', 'technician', 'admin', 'receptionist', 'lab', 'pharmacist']),
  status: z.enum(['active', 'inactive', 'terminated', 'on_leave']),
  department: z.string({
    error: 'Department is required',
  }),
  specialty: z.string({
    error: 'Specialty is required',
  }),
  license_number: z.string({
    error: 'License number is required',
  }),
  employee_id: z.string({
    error: 'Employee ID is required',
  }),
  start_date: z
    .date({
      error: 'Start date is required',
    })
    .refine((date) => date <= new Date(), {
      message: 'Start date cannot be in the future',
    }),
});

const addressAndBioSchema = z.object({
  bio: z.string().min(1, 'Field is required'),
  address: z.object({
    street: z.string().min(1, 'Field is required'),
    city: z.string().min(1, 'Field is required'),
    zip_code: z.string().min(1, 'Field is required').min(4, 'ZIP code is too short'),
  }),
});

export { addressAndBioSchema, jobDetailsSchema, personalInfoSchema };
