import { useState } from 'react';

export function useCreateAppointmentModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);
  const [patientId, setPatientId] = useState('');

  const toggleModal = (isOpened: boolean, id?: string) => {
    if (id) setPatientId(id);
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
