import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import type { useUnassignPatientModal } from './hooks/useUnassignPatientModal';

type UnassignPatientModalProps = ReturnType<typeof useUnassignPatientModal> & {};

export function UnassignPatientModal(props: UnassignPatientModalProps) {
  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.handleToggleModal}
      title="Unassign Patient"
      description="Are you sure you want to unassign the patient?"
      actionBtn={
        <Button
          type="button"
          variant="destructive"
          onClick={async () => {
            const isUnassigned = await props.handleUnassignPatient();
            if (isUnassigned) {
              props.handleToggleModal(false);
              props.setIsPatientUnassigned(true);
            }
          }}
        >
          {props.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {props.formStatus === 'processing' ? 'Unassigning Patient...' : 'Unassign Patient'}
        </Button>
      }
      children={null}
    />
  );
}
