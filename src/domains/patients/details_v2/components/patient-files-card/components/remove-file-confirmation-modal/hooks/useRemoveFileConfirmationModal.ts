import type { FormStatus } from '@/shared/types/form-status';
import { useState } from 'react';
import { toast } from 'sonner';
import { removePatientFile } from '../services/remove-patient-file';

export function useRemoveFileConfirmationModal(patientId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [fileRemoveId, setFileRemoveId] = useState('');
  const [removedFileId, setRemovedFileId] = useState('');

  const toggleModal = (isOpen: boolean, fileId?: string) => {
    if (fileId) {
      setFileRemoveId(fileId);
    }
    setIsModalOpen(isOpen);
  };

  const handleRemoveFile = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    try {
      await removePatientFile({
        fileId: fileRemoveId,
        entityType: 'patient',
        entityId: patientId,
      });

      setRemovedFileId(fileRemoveId);
      setFormStatus('idle');
      toggleModal(false);
      toast.success('File was successfully removed.');
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  return {
    isModalOpen,
    formStatus,
    removedFileId,
    toggleModal,
    handleRemoveFile,
  };
}
