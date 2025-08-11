import { useState } from 'react';

export function useCreateMemberModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (isOpened: boolean) => {
    setIsModalOpen(isOpened);
  };

  return {
    isModalOpen,
    toggleModal,
  };
}
