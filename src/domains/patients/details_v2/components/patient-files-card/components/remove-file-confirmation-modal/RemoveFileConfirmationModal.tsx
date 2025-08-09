import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import type { useRemoveFileConfirmationModal } from './hooks/useRemoveFileConfirmationModal';

type RemoveFileConfirmationModalProps = ReturnType<typeof useRemoveFileConfirmationModal> & {
  fileName?: string;
};

export function RemoveFileConfirmationModal(params: RemoveFileConfirmationModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Remove File"
      description="Are you sure you want to remove a file?"
      actionBtn={
        <Button type="button" onClick={params.handleRemoveFile}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Removing File...' : 'Remove File'}
        </Button>
      }
      children={null}
    />
  );
}
