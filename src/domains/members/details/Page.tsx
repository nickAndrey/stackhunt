import { useHeader } from '@/app/contexts/header';
import type { Staff } from '@/shared/types/staff';
import { useEffect, useState } from 'react';
import { ContactAndQuickActions } from './contact-and-quick-actions';
import { PersonalInformation } from './personal-inforamtion';

type MembersPageProps = {
  data: Staff;
};

export function MemberPage(props: MembersPageProps) {
  const { setHeader } = useHeader();
  const [initialData, setInitialData] = useState(props.data);

  useEffect(() => {
    setHeader({
      title: `Member: ${initialData.role} ${initialData.first_name} ${initialData.last_name}`,
    });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4 py-3 flex-col-grow">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 items-start">
        <PersonalInformation staff={initialData} />
        <ContactAndQuickActions staff={initialData} />
      </div>
    </div>
  );
}
