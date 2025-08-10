import { useHeader } from '@/app/contexts/header';
import { Card } from '@/design-system/components/ui/card';
import type { Staff } from '@/shared/types/staff';
import { useEffect } from 'react';
import { MembersTable } from './components/members-table';

type MembersPageProps = {
  data: Staff[];
};

export function MembersPage(props: MembersPageProps) {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: 'Members' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4 py-3">
      <Card>
        <MembersTable staff={props.data} />
      </Card>
    </div>
  );
}
