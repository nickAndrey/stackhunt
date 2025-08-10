import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import type { Appointment } from '@/shared/types/patient';
import { Plus } from 'lucide-react';
import {
  CreateAppointmentModal,
  useCreateAppointmentModal,
} from './components/create-appointment-modal';

type PatientAppointmentsCardProps = {
  patientId: string;
  appointments: Appointment[];
};

export function PatientAppointmentsCard(props: PatientAppointmentsCardProps) {
  const createAppointmentModal = useCreateAppointmentModal(props.patientId);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-2xl"
              onClick={() => createAppointmentModal.toggleModal(true)}
            >
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="max-h-[300px] overflow-y-auto">
          {props.appointments.length === 0 && <NoData />}

          {/* <TimeLine
          items={appointments.map((appointment) => ({
            id: appointment.id,
            date: appointment.date,
            title: `${getAppointmentLabel(appointment.type)} with ${getMemberInfo(appointment.staff_id)}`,
            description: appointment.notes,
          }))}
        /> */}
        </CardContent>
      </Card>

      <CreateAppointmentModal {...createAppointmentModal} />
    </>
  );
}
