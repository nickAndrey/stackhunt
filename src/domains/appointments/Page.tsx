import {
  AppointmentsCalendar,
  MonthToggler,
  useAppointmentsCalendar,
} from '@/shared/components/appointments-calendar';
import { Combobox, useCombobox } from '@/shared/components/Combobox';
import { Portal } from '@/shared/components/Portal';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import { getAppointmentsWithParticipants } from '@/shared/services/appointments';
import type { AppointmentWithParticipants } from '@/shared/types/appointment_v2';
import { useEffect, useState } from 'react';
import { searchOverStaff } from './services/search-over-staff';

type AppointmentsPageProps = {
  data: AppointmentWithParticipants[];
};

export function AppointmentsPage({ data }: AppointmentsPageProps) {
  const [appointments, setAppointments] = useState(data);

  const scheduleAppointmentModal = useScheduleAppointmentModal();
  const appointmentsCalendar = useAppointmentsCalendar({ appointments });
  const staffSelector = useCombobox(searchOverStaff);

  useEffect(() => {
    if (scheduleAppointmentModal.isAppointmentCreated) {
      getAppointmentsWithParticipants()
        .then((data) => setAppointments(data))
        .finally(() => scheduleAppointmentModal.setIsAppointmentCreated(false));
    }
  }, [scheduleAppointmentModal.isAppointmentCreated]);

  useEffect(() => {
    getAppointmentsWithParticipants({ role: 'staff', participant_id: staffSelector.value })
      .then((data) => setAppointments(data))
      .finally(() => scheduleAppointmentModal.setIsAppointmentCreated(false));
  }, [staffSelector.value]);

  return (
    <div className="flex-col-grow">
      <Portal
        slots={[
          {
            id: 'header-title',
            element: 'Appointments',
          },
          {
            id: 'header-actions',
            element: (
              <div className="flex items-center gap-6">
                <MonthToggler
                  currentMonth={appointmentsCalendar.currentMonth}
                  currentYear={appointmentsCalendar.currentYear}
                  setPrevMonth={appointmentsCalendar.setPrevMonth}
                  setNextMonth={appointmentsCalendar.setNextMonth}
                />
                <div className="max-w-xs">
                  <Combobox {...staffSelector} />
                </div>
              </div>
            ),
          },
        ]}
      />

      <AppointmentsCalendar
        {...appointmentsCalendar}
        onAppointmentClick={(appointment) => {
          scheduleAppointmentModal.onScheduleAppointmentModalOpen(true, {
            id: appointment.id,
            staffId: appointment.staff?.[0].id,
            patientId: appointment.patients?.[0].id,
            date: appointment.date,
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
