import { useHeader } from '@/app/contexts/header';
import { Card } from '@/design-system/components/ui/card';
import type { Staff } from '@/shared/types/staff';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CreateAppointmentModal,
  useCreateAppointmentModal,
} from './components/create-appointment-modal';
import { columnsConfig, DataTable } from './components/data-table';

type MembersPageProps = {
  data: Staff[];
};

export function MembersPage(props: MembersPageProps) {
  const { setHeader } = useHeader();
  const navigate = useNavigate();

  const [selectedStaffId, setSelectedStaffId] = useState('');

  const createAppointmentModal = useCreateAppointmentModal(selectedStaffId);

  useEffect(() => {
    setHeader({ title: 'Members' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4 py-3">
      <Card>
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
          data={props.data}
        />
      </Card>

      <CreateAppointmentModal {...createAppointmentModal} />
    </div>
  );
}
