import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { AssignPatientForm, useAssignPatientForm } from './components/assign-patient-form';
import type { useAssignPatientModal } from './hooks/useAssignPatientModal';

type AssignPatientModalProps = ReturnType<typeof useAssignPatientModal> & {};

export function AssignPatientModal(props: AssignPatientModalProps) {
  const assignPatientForm = useAssignPatientForm();

  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.handleToggleModal}
      title="Assign Patient"
      description="Provide details to assign a patient."
      actionBtn={
        <Button
          type="button"
          onClick={async () => {
            const isAssigned = await assignPatientForm.handleSubmit();

            if (isAssigned) {
              props.setIsPatientAssigned(isAssigned);
              props.handleToggleModal(false);
            }
          }}
        >
          {assignPatientForm.formStatus === 'processing' && (
            <LoaderCircle className="animate-spin" />
          )}

          {assignPatientForm.formStatus === 'processing'
            ? 'Assigning Patient...'
            : 'Assign Patient'}
        </Button>
      }
    >
      <AssignPatientForm {...assignPatientForm} />
    </Modal>
  );
}
