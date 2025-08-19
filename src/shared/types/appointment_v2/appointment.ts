import type { AppointmentStatus } from './appointment-status';
import type { AppointmentType } from './appointment-type';

export type Appointment = {
  id: string;
  type: AppointmentType;
  date: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
  status: AppointmentStatus;
};
