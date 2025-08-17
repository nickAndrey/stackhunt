import { useState } from 'react';
import type { ScheduleAppointmentFormOptions } from '../components/create-appointment-form/types/appointment-form-options';

export function useScheduleAppointmentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const [appointmentDefaultValues, setAppointmentDefaultValues] =
    useState<ScheduleAppointmentFormOptions>({});

  const onScheduleAppointmentModalOpen = (
    isOpened: boolean,
    defaultValues: typeof appointmentDefaultValues
  ) => {
    setIsModalOpen(isOpened);
    setAppointmentDefaultValues(defaultValues);
  };

  return {
    isModalOpen,
    isAppointmentCreated,
    appointmentDefaultValues,
    onScheduleAppointmentModalOpen,
    setIsModalOpen,
    setIsAppointmentCreated,
  };
}
