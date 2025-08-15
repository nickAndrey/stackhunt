import type { FormStatus } from '@/shared/types/form-status';
import { useState } from 'react';
import { toast } from 'sonner';
import { unassignPatient } from '../services/unassign-patient';

export function useUnassignPatientModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [assignmentId, setAssignmentId] = useState('');
  const [isPatientUnassigned, setIsPatientUnassigned] = useState(false);

  const handleToggleModal = (isOpen: boolean, id?: string) => {
    if (id) setAssignmentId(id);
    setIsModalOpen(isOpen);
  };

  const handleUnassignPatient = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      await unassignPatient({ assignmentId });
      toast.success('Patient successfully unassigned.');
      setFormStatus('success');
      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');
      return false;
    }
  };

  return {
    isModalOpen,
    formStatus,
    isPatientUnassigned,
    handleToggleModal,
    handleUnassignPatient,
    setIsPatientUnassigned,
  };
}
