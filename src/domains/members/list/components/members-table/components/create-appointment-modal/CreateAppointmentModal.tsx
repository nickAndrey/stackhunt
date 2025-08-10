import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { CreateAppointmentForm, useCreateAppointmentForm } from '../create-appointment-form';
import type { useCreateAppointmentModal } from './hooks/useCreateAppointmentModal';

type CreateAppointmentModalProps = ReturnType<typeof useCreateAppointmentModal> & {};

export function CreateAppointmentModal(params: CreateAppointmentModalProps) {
  const formState = useCreateAppointmentForm(params.selectedStaffId);

  useEffect(() => {
    if (formState.formStatus === 'success') {
      params.toggleModal(false);
      params.setIsAppointmentCreated(true);
    }
  }, [formState.formStatus]);

  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Create an Appointment"
      description="Provide the appointment details to schedule a meeting."
      actionBtn={
        <Button type="button" onClick={formState.handleCreateAppointment}>
          {formState.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {formState.formStatus === 'processing' ? 'Creating...' : 'Create'}
        </Button>
      }
    >
      <CreateAppointmentForm {...formState} />
    </Modal>
  );
}
