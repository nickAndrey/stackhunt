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
import type { Staff } from '@/shared/types/staff';
import { getAppointmentLabel } from '@/shared/utils/getAppointmentLabel';
import { Plus } from 'lucide-react';
import { TimeLine } from './components/TimeLine';

type PatientAppointmentsCardProps = {
  appointments: Patient['appointments'];
  staff: Staff[];
  onClickAddAppointment: () => void;
};

export function PatientAppointmentsCard({
  appointments,
  staff,
  onClickAddAppointment,
}: PatientAppointmentsCardProps) {
  const getMemberInfo = (id: string) => {
    const member = staff.find((item) => item.id === id);
    return `${member?.role} ${member?.first_name} ${member?.last_name}`;
  };

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
          items={appointments.map((appointment) => ({
            id: appointment.id,
            date: appointment.date,
            title: `${getAppointmentLabel(appointment.type)} with ${getMemberInfo(appointment.staff_id)}`,
            description: appointment.notes,
          }))}
        />
      </CardContent>
    </Card>
  );
}
