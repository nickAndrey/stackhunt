import { Badge } from '@/design-system/components/ui/badge';
import type { Patient } from '@/shared/types/patient';
import dayjs from 'dayjs';
import { Link } from 'react-router';

type PatientsTableProps = {
  patients: Patient[];
};

function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <div className="px-4 overflow-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm font-semibold text-gray-700">
            {[
              'Profile',
              'Gender',
              'Birth Date',
              'Status',
              'Phone',
              'Tags',
              'Last Appointment',
              'Next Appointment',
              'Flags',
              'Actions',
            ].map((column) => (
              <th key={column} className="px-4 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
          {patients?.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 bg-gray-100 *>td:py-4">
              <td className="px-4 py-4 truncate font-medium rounded-bl-2xl rounded-tl-2xl">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="px-4 py-4 truncate">{patient.gender}</td>
              <td className="px-4 py-4 truncate">
                <time>{dayjs(patient.birth_date).format('MMMM D, YYYY')}</time>
              </td>
              <td className="px-4 py-4 truncate">
                <Badge variant="default" className="bg-blue-500">
                  {patient.status}
                </Badge>
              </td>
              <td className="px-4 py-4 truncate">{patient.phone}</td>
              <td className="px-4 py-4 truncate">
                <ul className="flex flex-wrap gap-1">
                  {patient.tags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="default" className="bg-gray-400">
                        {item.tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-4 truncate">
                <time>
                  {dayjs(patient.appointments[patient.appointments.length - 2]?.date).format(
                    'MMMM D, YYYY'
                  ) || '--'}
                </time>
              </td>
              <td className="px-4 py-4 truncate">
                <time>
                  {dayjs(patient.appointments[patient.appointments.length - 1]?.date).format(
                    'MMMM D, YYYY'
                  ) || '--'}
                </time>
              </td>
              <td className="px-4 py-4 truncate">
                <ul className="flex flex-wrap gap-1">
                  {patient.medical_flags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="destructive">{item.flag}</Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-4 truncate rounded-br-2xl rounded-tr-2xl">
                <Link to={patient.id} className="text-blue-600 hover:underline text-sm">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsTable;
