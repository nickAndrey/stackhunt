import { DataTable } from '@/shared/components/DataTable';
import type { Staff } from '@/shared/types/staff';
import { useNavigate } from 'react-router';
import { columnsConfig } from './columns-config';
import {
  CreateAppointmentModal,
  useCreateAppointmentModal,
} from './components/create-appointment-modal';

type MembersTableProps = {
  staff: Staff[];
};

export function MembersTable({ staff }: MembersTableProps) {
  const navigate = useNavigate();

  const createAppointmentModal = useCreateAppointmentModal();

  return (
    <>
      <DataTable
        columns={columnsConfig({
          actions: {
            createAppointment: (staff) => createAppointmentModal.toggleModal(true, staff.id),
            viewDetails: ({ id }) => navigate(`/members/${id}`),
          },
        })}
        data={staff}
      />
      <CreateAppointmentModal {...createAppointmentModal} />
    </>
  );
}
