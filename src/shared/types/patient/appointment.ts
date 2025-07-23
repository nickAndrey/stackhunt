export type AppointmentType =
  | 'consultation'
  | 'follow_up'
  | 'surgery'
  | 'lab_test'
  | 'vaccination'
  | 'emergency';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export type Appointment = {
  id: string;
  type: AppointmentType;
  date: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
  status: AppointmentStatus;
  patient: {
    id: string;
    full_name: string;
    profile_image?: string;
  };
  staff: {
    id: string;
    full_name: string;
    role: 'doctor' | 'nurse';
    profile_image?: string;
  };
};
