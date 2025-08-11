import z from 'zod';

const personalInfoSchema = z.object({
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
  role: z.enum(['doctor', 'nurse', 'technician', 'admin', 'receptionist', 'lab', 'pharmacist'], {
    error: 'Role is required',
  }),
  status: z.enum(['active', 'inactive', 'terminated', 'on_leave'], {
    error: 'Employment status is required',
  }),
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
  bio: z.string({
    error: 'Bio is required',
  }),
  address: z.object({
    street: z.string({
      error: 'Street address is required',
    }),
    city: z.string({
      error: 'City is required',
    }),
    zip_code: z
      .string({
        error: 'ZIP code is required',
      })
      .min(4, 'ZIP code is too short'),
  }),
});

export { addressAndBioSchema, jobDetailsSchema, personalInfoSchema };
