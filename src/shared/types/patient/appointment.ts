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
  patient_id: string;
  type: AppointmentType;
  date: string; // ISO datetime
  duration_minutes?: number;
  staff_id: string; // doctor or nurse ID
  location?: string;
  notes?: string;
  status: AppointmentStatus;
};
