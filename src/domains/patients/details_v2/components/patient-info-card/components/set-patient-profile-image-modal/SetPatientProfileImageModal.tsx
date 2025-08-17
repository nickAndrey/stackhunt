import { Button } from '@/design-system/components/ui/button';
import { FileDropZone } from '@/shared/components/FileDropZone';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import type { useSetPatientProfileImageModal } from './hooks/useSetPatientProfileImageModal';

type SetPatientProfileImageModalProps = ReturnType<typeof useSetPatientProfileImageModal> & {};

export function SetPatientProfileImageModal(params: SetPatientProfileImageModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Set avatar image"
      description="Upload a clear photo to personalize the patient’s profile. This image will appear on their records and appointments."
      actionBtn={
        <Button type="button" onClick={params.handleSaveProfileImage}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Saving...' : 'Save Avatar Image'}
        </Button>
      }
    >
      <FileDropZone
        {...params.fileDropState}
        withPreview
        renderPreviewElement={(imgWidth) =>
          params.fileDropState.files?.[0]?.file ? (
            <img
              src={URL.createObjectURL(params.fileDropState.files[0].file)}
              alt="image preview"
              className={`w-[${imgWidth}px] rounded-2xl mb-3`}
            />
          ) : null
        }
      />
    </Modal>
  );
}
