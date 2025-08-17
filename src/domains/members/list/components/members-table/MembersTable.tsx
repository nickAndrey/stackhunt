import { DataTable } from '@/shared/components/DataTable';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import type { Staff } from '@/shared/types/staff';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { columnsConfig } from './columns-config';

type MembersTableProps = {
  staff: Staff[];
};

function MembersTableMemoized({ staff }: MembersTableProps) {
  const navigate = useNavigate();

  const createAppointmentModal = useScheduleAppointmentModal();

  return (
    <>
      <DataTable
        columns={columnsConfig({
          actions: {
            createAppointment: (staff) => {
              createAppointmentModal.onScheduleAppointmentModalOpen(true, {
                staffId: staff.id,
              });
            },
            viewDetails: ({ id }) => navigate(`/members/${id}`),
          },
        })}
        data={staff}
      />
      <ScheduleAppointmentModal {...createAppointmentModal} />
    </>
  );
}

export const MembersTable = memo(MembersTableMemoized);
