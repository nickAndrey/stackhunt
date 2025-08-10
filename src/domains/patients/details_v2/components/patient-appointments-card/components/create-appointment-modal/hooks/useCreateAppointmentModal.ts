import { useState } from 'react';

export function useCreateAppointmentModal(patientId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (isOpened: boolean) => {
    setIsModalOpen(isOpened);
  };

  return {
    patientId,
    isModalOpen,
    toggleModal,
  };
}
