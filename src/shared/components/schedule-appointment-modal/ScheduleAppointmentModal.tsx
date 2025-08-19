import { Button } from '@/design-system/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Modal } from '../Modal';
import {
  CreateAppointmentForm,
  useCreateAppointmentForm,
} from './components/create-appointment-form';
import type { useScheduleAppointmentModal } from './hooks/useScheduleAppointmentModal';

type ScheduleAppointmentModalProps = ReturnType<typeof useScheduleAppointmentModal> & {};

export function ScheduleAppointmentModal(params: ScheduleAppointmentModalProps) {
  const formState = useCreateAppointmentForm({
    options: params.appointmentDefaultValues,
  });

  useEffect(() => {
    if (formState.formStatus === 'success') {
      params.setIsModalOpen(false);
      params.setIsAppointmentCreated(true);
      setTimeout(() => formState.form.reset(), 1000);
    }
  }, [formState.formStatus]);

  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.setIsModalOpen}
      title="Schedule an Appointment"
      description="Provide the appointment details to schedule a meeting."
      actionBtn={
        params.appointmentDefaultValues.id ? (
          <Button type="button" onClick={formState.handleUpdateAppointment}>
            {formState.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
            {formState.formStatus === 'processing' ? 'Updating...' : 'Update'}
          </Button>
        ) : (
          <Button type="button" onClick={formState.handleCreateAppointment}>
            {formState.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
            {formState.formStatus === 'processing' ? 'Creating...' : 'Create'}
          </Button>
        )
      }
    >
      <CreateAppointmentForm {...formState} />
    </Modal>
  );
}
