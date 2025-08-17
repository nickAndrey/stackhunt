import { useHeader } from '@/app/contexts/header';
import { AppointmentsCalendar } from '@/shared/components/appointments-calendar';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import type { Appointment } from '@/shared/types/appointment';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStaffAppointments } from './services/get-staff-appointments';

type AppointmentsPageProps = {
  data: Appointment[];
};

export function AppointmentsPage({ data }: AppointmentsPageProps) {
  const { setHeader } = useHeader();

  const scheduleAppointmentModal = useScheduleAppointmentModal();

  const [appointments, setAppointments] = useState(data);

  useEffect(() => {
    setHeader({ title: 'Appointments' });
    return () => setHeader({});
  }, [setHeader]);

  useEffect(() => {
    if (scheduleAppointmentModal.isAppointmentCreated) {
      getStaffAppointments()
        .then((data) => setAppointments(data))
        .finally(() => scheduleAppointmentModal.setIsAppointmentCreated(false));
    }
  }, [scheduleAppointmentModal.isAppointmentCreated]);

  return (
    <div className="flex-col-grow">
      <AppointmentsCalendar
        appointments={appointments}
        onAppointmentClick={(appointment) => {
          scheduleAppointmentModal.onScheduleAppointmentModalOpen(true, {
            date: dayjs(appointment.date).toDate(),
            patientId: appointment.assignedPatient?.id,
            staffId: appointment.assignedStaff?.id,
            groupId: appointment.group_id,
            notes: appointment.notes,
          });
        }}
        onDayClick={(dayObj) => {
          scheduleAppointmentModal.onScheduleAppointmentModalOpen(true, {
            date: dayObj.date.toDate(),
          });
        }}
      />

      <ScheduleAppointmentModal {...scheduleAppointmentModal} />
    </div>
  );
}
