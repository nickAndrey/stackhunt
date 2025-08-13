import { DataTable } from '@/shared/components/DataTable';
import {
  ScheduleAppointmentModal,
  useScheduleAppointmentModal,
} from '@/shared/components/schedule-appointment-modal';
import type { Patient } from '@/shared/types/patient';
import { useNavigate } from 'react-router';
import { columnsConfig } from './columns-config';

type PatientsDataTableProps = {
  patients: Patient[];
};

export function PatientsDataTable({ patients }: PatientsDataTableProps) {
  const navigate = useNavigate();
  const createAppointmentModal = useScheduleAppointmentModal();

  const columns = columnsConfig({
    actions: {
      createAppointment: (patient) => {
        createAppointmentModal.handleOpenModal(true, {
          createFrom: 'patient',
          id: patient.id,
        });
      },
      viewDetails: (patient) => navigate(`/patients/${patient.id}`),
    },
  });

  return (
    <>
      <DataTable columns={columns} data={patients} />
      <ScheduleAppointmentModal {...createAppointmentModal} />
    </>
  );
}
