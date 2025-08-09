import { Button } from '@/design-system/components/ui/button';
import { FileDropZone } from '@/shared/components/FileDropZone';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import type { useUploadFilesModal } from './hooks/useUploadFilesModal';

type UploadFilesModalProps = ReturnType<typeof useUploadFilesModal> & {};

export function UploadFilesModal(params: UploadFilesModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Upload File"
      description="Use area below to upload files"
      actionBtn={
        <Button type="button" onClick={params.handleUploadFiles}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Uploading Files...' : 'Upload Files'}
        </Button>
      }
    >
      <FileDropZone {...params.dropZone} />
    </Modal>
  );
}
