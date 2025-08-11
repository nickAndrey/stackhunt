import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import type { Staff } from '@/shared/types/staff';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { CreateMemberModal, useCreateMemberModal } from './components/create-member-modal';
import { MembersTable } from './components/members-table';

type MembersPageProps = {
  data: Staff[];
};

export function MembersPage(props: MembersPageProps) {
  const { setHeader } = useHeader();

  const createMemberModal = useCreateMemberModal();

  useEffect(() => {
    setHeader({
      title: 'Members',
      actions: (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" onClick={() => createMemberModal.toggleModal(true)}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add Member</TooltipContent>
          </Tooltip>
        </>
      ),
    });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4 py-3">
      <Card>
        <MembersTable staff={props.data} />
      </Card>

      <CreateMemberModal {...createMemberModal} />
    </div>
  );
}
