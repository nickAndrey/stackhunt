import { useHeader } from '@/app/contexts/header';
import { AppointmentsCalendar } from '@/shared/components/appointments-calendar';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import type { Appointment } from '@/shared/types/appointment';
import { useEffect } from 'react';

type AppointmentsPageProps = {
  data: Appointment[];
};

export function AppointmentsPage({ data }: AppointmentsPageProps) {
  const { setHeader } = useHeader();

  const scheduleAppointmentModal = useScheduleAppointmentModal();

  useEffect(() => {
    setHeader({ title: 'Appointments' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="flex-col-grow">
      <AppointmentsCalendar
        appointments={data}
        onAppointmentClick={(appointment) => {
          console.log(appointment);
        }}
        onDayClick={(dayObj) => {
          scheduleAppointmentModal.handleOpenModal(true, { createFrom: 'member', id: '' });
          console.log(dayObj);
        }}
      />

      <ScheduleAppointmentModal {...scheduleAppointmentModal} />
    </div>
  );
}
