import { useFileDrop } from '@/shared/components/FileDropZone/hooks/useFileDrop';
import type { FormStatus } from '@/shared/types/form-status';
import { useState } from 'react';
import { toast } from 'sonner';
import { updatePatientProfileImage } from '../services/update-patient-profile-image';

export function useSetPatientProfileImageModal(patientId: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const fileDropState = useFileDrop({
    image: {
      quality: 0.8,
      maxWidth: 100,
    },
    initialValues: {
      inputAccept: 'image/*',
    },
  });

  const toggleModal = (isOpen: boolean) => setIsModalOpen(isOpen);

  const handleSaveProfileImage = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      const updatedImgAvatar = await updatePatientProfileImage({
        file: fileDropState.files[0],
        patientId,
      });

      setNewAvatar(updatedImgAvatar);
      setFormStatus('idle');
      toggleModal(false);
      fileDropState.onResetFiles();

      toast.success('Profile image was successfully updated.');
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  return {
    isModalOpen,
    formStatus,
    fileDropState,
    newAvatar,
    toggleModal,
    handleSaveProfileImage,
  };
}
