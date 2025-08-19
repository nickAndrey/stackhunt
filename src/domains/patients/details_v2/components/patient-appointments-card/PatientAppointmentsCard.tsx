import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { Loader } from '@/shared/components/Loader';
import { NoData } from '@/shared/components/NoData';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import { TimeLine } from '@/shared/components/time-line';
import { getAppointmentsWithParticipants } from '@/shared/services/appointments';
import type { AppointmentWithParticipants } from '@/shared/types/appointment_v2';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type PatientAppointmentsCardProps = {
  patientId: string;
  appointments: AppointmentWithParticipants[];
};

export function PatientAppointmentsCard(props: PatientAppointmentsCardProps) {
  const createAppointmentModal = useScheduleAppointmentModal();
  const [appointmentsList, setAppointmentsList] = useState(props.appointments);
  const [loading, setLoading] = useState(false);

  const { isAppointmentCreated, setIsAppointmentCreated, onScheduleAppointmentModalOpen } =
    createAppointmentModal;

  useEffect(() => {
    if (isAppointmentCreated) {
      setLoading(true);

      getAppointmentsWithParticipants({ role: 'patient', participant_id: props.patientId })
        .then(async (data) => setAppointmentsList(data))
        .finally(() => {
          setIsAppointmentCreated(false);
          setLoading(false);
        });
    }
  }, [isAppointmentCreated]);

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
              onClick={() => onScheduleAppointmentModalOpen(true, { patientId: props.patientId })}
            >
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="max-h-[300px] overflow-y-auto">
          {appointmentsList.length === 0 && !loading && <NoData />}

          {loading && <Loader text="&#8226;&#8226;&#8226;" className="text-[40px] text-gray-700" />}

          {!loading && (
            <TimeLine
              items={appointmentsList.map(({ id, date, type, notes, staff }) => ({
                id,
                date,
                title: `There will be ${type} with a ${staff?.[0].role} ${staff?.[0].first_name} ${staff?.[0].last_name}`,
                description: notes,
              }))}
            />
          )}
        </CardContent>
      </Card>

      <ScheduleAppointmentModal {...createAppointmentModal} />
    </>
  );
}
