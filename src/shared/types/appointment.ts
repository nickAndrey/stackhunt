type AppointmentType =
  | 'consultation'
  | 'follow_up'
  | 'surgery'
  | 'lab_test'
  | 'vaccination'
  | 'emergency';

type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

type Appointment = {
  id: string;
  group_id: string;
  type: AppointmentType;
  date: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
  status: AppointmentStatus;
  assignedStaff?: {
    id: string;
    role: string;
    first_name: string;
    last_name: string;
  };
  assignedPatient?: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

export type { Appointment, AppointmentStatus, AppointmentType };
