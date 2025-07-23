import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import type { Patient } from '@/shared/types/patient';
import { Plus } from 'lucide-react';
import { TimeLine } from './components/TimeLine';

type PatientAppointmentsCardProps = {
  appointments: Patient['appointments'];
  onClickAddAppointment: () => void;
};

function PatientAppointmentsCard({
  appointments,
  onClickAddAppointment,
}: PatientAppointmentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-2xl"
            onClick={onClickAddAppointment}
          >
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="max-h-[300px] overflow-y-auto">
        {appointments.length === 0 && <NoData />}

        <TimeLine
          items={appointments.map((item) => ({
            id: item.id,
            date: item.date,
            title: `${item.type} with ${item.staff.full_name}`,
            description: item.notes,
          }))}
        />
      </CardContent>
    </Card>
  );
}

export default PatientAppointmentsCard;
