import { useState } from 'react';

export function useCreateAppointmentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');

  const toggleModal = (isOpened: boolean, staffID?: string) => {
    if (staffID) {
      setSelectedStaffId(staffID);
    }
    setIsModalOpen(isOpened);
  };

  return {
    selectedStaffId,
    isModalOpen,
    isAppointmentCreated,
    toggleModal,
    setIsAppointmentCreated,
  };
}
