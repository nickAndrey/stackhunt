import { useHeader } from '@/app/contexts/header';
import { AppointmentsCalendar } from '@/shared/components/appointments-calendar';
import type { Appointment } from '@/shared/types/appointment';
import { useEffect } from 'react';

type AppointmentsPageProps = {
  data: Appointment[];
};

export function AppointmentsPage({ data }: AppointmentsPageProps) {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: 'Appointments' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="flex-col-grow">
      <AppointmentsCalendar appointments={data} />
    </div>
  );
}
