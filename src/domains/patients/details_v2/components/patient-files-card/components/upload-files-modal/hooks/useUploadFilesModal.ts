import { useFileDrop } from '@/shared/components/FileDropZone';
import { uploadFiles } from '@/shared/services/upload-files';
import type { FileRecord } from '@/shared/types/file-record';
import type { FormStatus } from '@/shared/types/form-status';
import { useState } from 'react';
import { toast } from 'sonner';

export function useUploadFilesModal(patientId: string) {
  const dropZone = useFileDrop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<FileRecord[]>([]);

  const toggleModal = (isOpen: boolean) => {
    if (isOpen === false) {
      dropZone.onResetFiles();
      setFormStatus('idle');
    }

    setIsModalOpen(isOpen);
  };

  const handleUploadFiles = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      await uploadFiles({
        entityType: 'patient',
        entityId: patientId,
        files: dropZone.files,
      });

      setUploadedFiles(dropZone.files);
      setFormStatus('idle');
      toggleModal(false);
      toast.success('Files were successfully uploaded.');
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  return {
    dropZone,
    isModalOpen,
    formStatus,
    uploadedFiles,
    toggleModal,
    handleUploadFiles,
  };
}
