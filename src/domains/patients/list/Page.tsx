import { Badge } from '@/design-system/components/ui/badge';
import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link } from 'react-router';

function Page() {
  const { status, data, error } = useQuery({
    queryKey: ['patients'],
    queryFn: async (): Promise<Patient[]> => {
      const patients = await db.patients.toArray();

      const mutatedPatients = await Promise.all(
        patients.map(async (patient) => ({
          ...patient,
          notes: await db.notes.where('patient_id').equals(patient.id).toArray(),
          appointments: await db.appointments.where('patient_id').equals(patient.id).toArray(),
          medications: await db.medications.where('patient_id').equals(patient.id).toArray(),
          conditions: await db.conditions.where('patient_id').equals(patient.id).toArray(),
          allergies: await db.allergies.where('patient_id').equals(patient.id).toArray(),
          tags: await db.tags.where('patient_id').equals(patient.id).toArray(),
          files: await db.files.where('patient_id').equals(patient.id).toArray(),
          medical_flags: await db.medical_flags.where('patient_id').equals(patient.id).toArray(),
        }))
      );

      return mutatedPatients;
    },
    staleTime: 60 * 60 * 1000, // 1 hour cache
  });

  if (status === 'pending') return <h2>Loading...</h2>;

  if (status === 'error') return <h2>{error.message}</h2>;

  return (
    <div className="px-4 overflow-auto">
      <table className="border border-gray-200 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
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
              <th key={column} className="px-4 py-2 border-b border-gray-200">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
          {data.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="px-4 py-2">{patient.gender}</td>
              <td className="px-4 py-2">
                <time>{dayjs(patient.birth_date).format('YYYY-MM-DD')}</time>
              </td>
              <td className="px-4 py-2">
                <Badge variant="default" className="bg-blue-500">
                  {patient.status}
                </Badge>
              </td>
              <td className="px-4 py-2">{patient.phone}</td>
              <td className="px-4 py-2">
                <ul className="flex flex-wrap gap-1">
                  {patient.tags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="secondary">{item.tag}</Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                <time>
                  {dayjs(patient.appointments[patient.appointments.length - 2]?.date).format(
                    'YYYY-MM-DD'
                  ) || '--'}
                </time>
              </td>
              <td className="px-4 py-2">
                <time>
                  {dayjs(patient.appointments[patient.appointments.length - 1]?.date).format(
                    'YYYY-MM-DD'
                  ) || '--'}
                </time>
              </td>
              <td className="px-4 py-2">
                <ul className="flex flex-wrap gap-1">
                  {patient.medical_flags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="destructive">{item.flag}</Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
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

export default Page;
