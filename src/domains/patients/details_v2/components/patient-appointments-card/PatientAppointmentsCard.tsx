import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import {
  CreateAppointmentModal,
  useCreateAppointmentModal,
} from '@/domains/patients/shared/components/create-appointment-modal';
import { Loader } from '@/shared/components/Loader';
import { NoData } from '@/shared/components/NoData';
import type { Appointment } from '@/shared/types/patient';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { enhanceAppointmentsWithAssignedStaff } from '../../utils/enhance-appointments-with-assigned-staff';
import { TimeLine } from './components/time-line';
import { getPatientAppointments } from './services/get-patient-appointments';

type PatientAppointmentsCardProps = {
  patientId: string;
  appointments: Appointment[];
};

export function PatientAppointmentsCard(props: PatientAppointmentsCardProps) {
  const createAppointmentModal = useCreateAppointmentModal();
  const [appointmentsList, setAppointmentsList] = useState(props.appointments);
  const [loading, setLoading] = useState(false);

  const { isAppointmentCreated, setIsAppointmentCreated, toggleModal } = createAppointmentModal;

  useEffect(() => {
    if (isAppointmentCreated) {
      setLoading(true);

      getPatientAppointments(props.patientId)
        .then(async (data) => {
          const updatedData = await enhanceAppointmentsWithAssignedStaff({
            appointments: data,
          });
          setAppointmentsList(updatedData);
        })
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
              onClick={() => toggleModal(true, props.patientId)}
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
              items={appointmentsList.map(({ id, date, type, notes, assignedStaff }) => ({
                id,
                date,
                title: `There will be ${type} with a ${assignedStaff?.role} ${assignedStaff?.first_name} ${assignedStaff?.last_name}`,
                description: notes,
              }))}
            />
          )}
        </CardContent>
      </Card>

      <CreateAppointmentModal {...createAppointmentModal} />
    </>
  );
}
