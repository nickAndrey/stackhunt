import { useState } from 'react';

export function useCreateAppointmentModal(staffId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const toggleModal = (isOpened: boolean) => {
    setIsModalOpen(isOpened);
  };

  return {
    staffId,
    isModalOpen,
    isAppointmentCreated,
    toggleModal,
    setIsAppointmentCreated,
  };
}
