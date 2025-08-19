export type AppointmentParticipant = {
  id: string;
  appointment_id: string;
  participant_id: string;
  role: 'patient' | 'staff';
  extra_role?: string;
};
