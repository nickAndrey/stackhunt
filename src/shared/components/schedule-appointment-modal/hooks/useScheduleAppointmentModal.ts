import { useState } from 'react';

export function useScheduleAppointmentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const [transferredParams, setTransferredParams] = useState<{
    createFrom: 'member' | 'patient';
    id: string;
  }>({
    createFrom: 'member',
    id: '',
  });

  const handleOpenModal = (isOpened: boolean, options: typeof transferredParams) => {
    setTransferredParams(options);
    setIsModalOpen(isOpened);
  };

  return {
    transferredParams,
    isModalOpen,
    isAppointmentCreated,
    handleOpenModal,
    setIsModalOpen,
    setIsAppointmentCreated,
  };
}
