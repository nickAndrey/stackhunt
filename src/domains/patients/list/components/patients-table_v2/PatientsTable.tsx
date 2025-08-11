import {
  CreateAppointmentModal,
  useCreateAppointmentModal,
} from '@/domains/patients/shared/components/create-appointment-modal';
import { DataTable } from '@/shared/components/DataTable';
import type { Patient } from '@/shared/types/patient';
import { useNavigate } from 'react-router';
import { columnsConfig } from './columns-config';

type PatientsDataTableProps = {
  patients: Patient[];
};

export function PatientsDataTable({ patients }: PatientsDataTableProps) {
  const navigate = useNavigate();
  const createAppointmentModal = useCreateAppointmentModal();

  const columns = columnsConfig({
    actions: {
      createAppointment: (patient) => createAppointmentModal.toggleModal(true, patient.id),
      viewDetails: (patient) => navigate(`/patients/${patient.id}`),
    },
  });

  return (
    <>
      <DataTable columns={columns} data={patients} />
      <CreateAppointmentModal {...createAppointmentModal} />
    </>
  );
}
