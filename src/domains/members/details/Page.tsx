import { useHeader } from '@/app/contexts/header';
import type { Staff } from '@/shared/types/staff';
import { useEffect } from 'react';
import { PersonalInformation } from './components/personal-inforamtion';
import { StaffAppointmentsCard } from './components/staff-appointments-card';

type MembersPageProps = {
  data: Staff;
};

export function MemberPage({ data }: MembersPageProps) {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      title: `Member: ${data.role} ${data.first_name} ${data.last_name}`,
    });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4 py-3 flex-col-grow">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 items-start">
        <PersonalInformation staff={data} />
        <StaffAppointmentsCard appointments={data.appointments} staffId={data.id} />
      </div>
    </div>
  );
}
