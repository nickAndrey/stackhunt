import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { CreateMemberForm, useCreateMemberForm } from './components/create-member-form';
import type { useCreateMemberModal } from './hooks/useCreateMemberModal';

type CreateMemberModalProps = ReturnType<typeof useCreateMemberModal> & {};

export function CreateMemberModal(props: CreateMemberModalProps) {
  const createMemberForm = useCreateMemberForm();

  const { step, formStatus, forms, handleSubmit, handleAutoGenerate, handlePrev, handleNext } =
    createMemberForm;

  const isAutoGenerate = forms.step1Form.getValues('isAutoGenerate');

  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.toggleModal}
      title="Create a Member"
      description="Enter the details to create a new hospital staff member."
      actionBtn={
        isAutoGenerate ? (
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
          <>
            {step > 0 && (
              <Button variant="default" onClick={handlePrev} disabled={formStatus === 'processing'}>
                Prev
              </Button>
            )}

            {step === Object.keys(forms).length ? (
              <Button
                onClick={async () => {
                  const isMemberCreated = await handleSubmit();
                  if (isMemberCreated) props.toggleModal(false);
                }}
              >
                {formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
                {formStatus === 'processing' ? 'Creating...' : 'Create'}
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </>
        )
      }
    >
      <CreateMemberForm {...createMemberForm} />
    </Modal>
  );
}
