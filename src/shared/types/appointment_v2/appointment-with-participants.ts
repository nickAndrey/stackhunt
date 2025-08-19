import type { Appointment } from './appointment';

export type AppointmentWithParticipants = Appointment & {
  patients?: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
  staff?: {
    id: string;
    role: string;
    first_name: string;
    last_name: string;
  }[];
};
