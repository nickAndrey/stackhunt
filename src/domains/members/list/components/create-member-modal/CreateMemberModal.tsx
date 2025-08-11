import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { CreateMemberForm, useCreateMemberForm } from './components/create-member-form';
import type { useCreateMemberModal } from './hooks/useCreateMemberModal';

type CreateMemberModalProps = ReturnType<typeof useCreateMemberModal> & {};

export function CreateMemberModal(props: CreateMemberModalProps) {
  const createMemberForm = useCreateMemberForm();

  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.toggleModal}
      title="Create a Member"
      description="Enter the details to create a new hospital staff member."
      actionBtn={
        <Button type="button" onClick={createMemberForm.handleSubmit}>
          {createMemberForm.formStatus === 'processing' && (
            <LoaderCircle className="animate-spin" />
          )}
          {createMemberForm.formStatus === 'processing' ? 'Creating...' : 'Create'}
        </Button>
      }
    >
      <CreateMemberForm {...createMemberForm} />
    </Modal>
  );
}
