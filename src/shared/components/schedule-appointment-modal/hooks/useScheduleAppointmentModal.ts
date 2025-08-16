import { useState } from 'react';

export function useScheduleAppointmentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const [appointmentDefaultValues, setAppointmentDefaultValues] = useState<{
    staffId?: string;
    patientId?: string;
    date?: Date;
  }>({});

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
