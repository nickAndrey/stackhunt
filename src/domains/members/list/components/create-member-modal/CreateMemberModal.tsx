import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { CreateMemberForm, useCreateMemberForm } from './components/create-member-form';
import type { useCreateMemberModal } from './hooks/useCreateMemberModal';

type CreateMemberModalProps = ReturnType<typeof useCreateMemberModal> & {};

export function CreateMemberModal(props: CreateMemberModalProps) {
  const createMemberForm = useCreateMemberForm();

  const { formStatus, registerForm, isGenerateAutomatically, handleSubmit, handleAutoGenerate } =
    createMemberForm;

  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.toggleModal}
      title="Create a Member"
      description="Enter the details to create a new hospital staff member."
      actionBtn={
        isGenerateAutomatically ? (
          <Button
            variant="default"
            onClick={async () => {
              const isMemberCreated = await handleAutoGenerate();

              if (isMemberCreated) {
                props.toggleModal(false);
                props.setIsNewMemberCreated(true);
              }
            }}
            disabled={formStatus === 'processing'}
          >
            {formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
            {formStatus === 'processing' ? 'Generating...' : 'Generate'}
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const isMemberCreated = await handleSubmit(registerForm.form.getValues());
              if (isMemberCreated) props.toggleModal(false);
            }}
          >
            {formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
            {formStatus === 'processing' ? 'Creating...' : 'Create'}
          </Button>
        )
      }
    >
      <CreateMemberForm {...createMemberForm} />
    </Modal>
  );
}
