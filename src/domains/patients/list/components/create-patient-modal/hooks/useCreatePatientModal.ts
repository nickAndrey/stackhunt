import { useState } from 'react';

export function useCreatePatientModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPatientCreated, setIsNewPatientCreated] = useState(false);

  const toggleModal = (isOpened: boolean) => {
    setIsModalOpen(isOpened);
  };

  return {
    isModalOpen,
    isNewPatientCreated,
    setIsNewPatientCreated,
    toggleModal,
  };
}
