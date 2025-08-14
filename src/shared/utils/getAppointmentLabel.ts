import type { AppointmentType } from '../types/appointment';

export function getAppointmentLabel(key: AppointmentType) {
  return {
    consultation: 'Consultation',
    emergency: 'Emergency',
    follow_up: 'Follow Up',
    lab_test: 'Lab test',
    surgery: 'Surgery',
    vaccination: 'Vaccination',
  }[key];
}
