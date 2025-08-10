import { useState } from 'react';

export function useCreateAppointmentModal(patientId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const toggleModal = (isOpened: boolean) => {
    setIsModalOpen(isOpened);
  };

  return {
    patientId,
    isModalOpen,
    isAppointmentCreated,
    toggleModal,
    setIsAppointmentCreated,
  };
}
