import { DataTable } from '@/shared/components/DataTable';
import type { Staff } from '@/shared/types/staff';
import { useState } from 'react';
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

  const [selectedStaffId, setSelectedStaffId] = useState('');
  const createAppointmentModal = useCreateAppointmentModal(selectedStaffId);

  return (
    <>
      <DataTable
        columns={columnsConfig({
          actions: {
            createAppointment: (staff) => {
              setSelectedStaffId(staff.id);
              createAppointmentModal.toggleModal(true);
            },
            viewDetails: ({ id }) => navigate(`/members/${id}`),
          },
        })}
        data={staff}
      />
      <CreateAppointmentModal {...createAppointmentModal} />
    </>
  );
}
