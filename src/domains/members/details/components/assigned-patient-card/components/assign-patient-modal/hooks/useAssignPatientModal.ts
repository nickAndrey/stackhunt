import { useState } from 'react';

export function useAssignPatientModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPatientAssigned, setIsPatientAssigned] = useState(false);

  const handleToggleModal = (isOpen: boolean) => setIsModalOpen(isOpen);

  return {
    isModalOpen,
    isPatientAssigned,
    handleToggleModal,
    setIsPatientAssigned,
  };
}
