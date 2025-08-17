import { useHeader } from '@/app/contexts/header';

import {
  AppointmentsCalendar,
  MonthToggler,
  useAppointmentsCalendar,
} from '@/shared/components/appointments-calendar';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import type { Appointment } from '@/shared/types/appointment';

import { useEffect, useState } from 'react';
import { getStaffAppointments } from './services/get-staff-appointments';

type AppointmentsPageProps = {
  data: Appointment[];
};

export function AppointmentsPage({ data }: AppointmentsPageProps) {
  const { updateHeader } = useHeader();

  const [appointments, setAppointments] = useState(data);

  const scheduleAppointmentModal = useScheduleAppointmentModal();
  const appointmentsCalendar = useAppointmentsCalendar({ appointments });

  useEffect(() => {
    updateHeader?.({
      title: 'Appointments',
      actions: (
        <MonthToggler
          currentMonth={appointmentsCalendar.currentMonth}
          currentYear={appointmentsCalendar.currentYear}
          setPrevMonth={appointmentsCalendar.setPrevMonth}
          setNextMonth={appointmentsCalendar.setNextMonth}
        />
      ),
    });

    return () => updateHeader?.({});
  }, [appointmentsCalendar.currentMonth, appointmentsCalendar.currentYear]);

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
        {...appointmentsCalendar}
        onAppointmentClick={(appointment) => {
          scheduleAppointmentModal.onScheduleAppointmentModalOpen(true, {
            date: appointment.date,
            patientId: appointment.assignedPatient?.id,
            staffId: appointment.assignedStaff?.id,
            groupId: appointment.group_id,
            notes: appointment.notes,
          });
        }}
        onDayClick={(dayObj) => {
          scheduleAppointmentModal.onScheduleAppointmentModalOpen(true, {
            date: dayObj.date.toISOString(),
          });
        }}
      />

      <ScheduleAppointmentModal {...scheduleAppointmentModal} />
    </div>
  );
}
