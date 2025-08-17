import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import type { Staff } from '@/shared/types/staff';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CreateMemberModal, useCreateMemberModal } from './components/create-member-modal';
import { MembersTable } from './components/members-table';
import { QuickSearchInput, useQuickSearchInput } from './components/quick-search-input';
import { fetchStaffFromIndexedDB } from './services/fetch-staff';

type MembersPageProps = {
  data: Staff[];
};

export function MembersPage(props: MembersPageProps) {
  const { setHeader } = useHeader();
  const isDesktop = useMediaQuery('(width >= 48rem)');

  const createMemberModal = useCreateMemberModal();
  const quickSearchInput = useQuickSearchInput();

  const [initialData, setInitialData] = useState(props.data);

  useEffect(() => {
    if (createMemberModal.isNewMemberCreated) {
      fetchStaffFromIndexedDB()
        .then((data) => setInitialData(data))
        .finally(() => createMemberModal.setIsNewMemberCreated(false));
    }
  }, [createMemberModal.isNewMemberCreated]);

  useEffect(() => {
    setHeader({
      title: 'Members',
      actions: (
        <>
          <QuickSearchInput {...quickSearchInput} />

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
  }, [setHeader, quickSearchInput.searchValue]);

  return (
    <div className="md:px-4 py-3 flex-col-grow h-full">
      {isDesktop ? (
        <Card className="max-h-[100%]">
          <MembersTable staff={quickSearchInput.searchResults ?? initialData} />
        </Card>
      ) : (
        <MembersTable staff={quickSearchInput.searchResults ?? initialData} />
      )}

      <CreateMemberModal {...createMemberModal} />
    </div>
  );
}
