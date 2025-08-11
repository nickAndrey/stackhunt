import { DataTable } from '@/shared/components/DataTable';
import type { Patient } from '@/shared/types/patient';
import { useNavigate } from 'react-router';
import { columnsConfig } from './columns-config';

type PatientsDataTableProps = {
  patients: Patient[];
};

export function PatientsDataTable({ patients }: PatientsDataTableProps) {
  const navigate = useNavigate();

  const columns = columnsConfig({
    actions: {
      createAppointment: function (staff: Patient): void {
        throw new Error('Function not implemented.');
      },
      viewDetails: (patient) => navigate(`/patients/${patient.id}`),
    },
  });

  return <DataTable columns={columns} data={patients} />;
}
