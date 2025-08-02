import { Badge } from '@/design-system/components/ui/badge';
import { Input } from '@/design-system/components/ui/input';
import type { Patient } from '@/shared/types/patient';
import { Search } from 'lucide-react';
import { Link } from 'react-router';
import {
  filterableTableColumns,
  usePatientsTableFilter,
  type FilterField,
} from './hooks/usePatientsTableFilter';

type PatientsTableProps = {
  patients: Patient[];
};

export function PatientsTable({ patients }: PatientsTableProps) {
  const { filterColumn, handleFilterChange, patientsFiltered } = usePatientsTableFilter(patients);

  return (
    <div className="px-4 overflow-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {Object.entries(filterableTableColumns).map((item) => {
              const [key, value] = item as [FilterField, string];

              return (
                <th key={key} className="px-2 py-2">
                  <div className="relative mr-2">
                    <Input
                      name={key}
                      placeholder={value}
                      value={filterColumn[key]}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="w-full pl-10 placeholder:text-sm text-sm font-light"
                    />
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[12px] w-[12px]" />
                  </div>
                </th>
              );
            })}
            <th className="px-4 py-2 text-sm text-gray-500 font-normal text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {(patientsFiltered.length > 0 ? patientsFiltered : patients)?.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 bg-gray-100">
              <td className="px-4 min-w-[150px] py-4 truncate font-medium rounded-bl-2xl rounded-tl-2xl">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="px-4 min-w-[150px] py-4 truncate">{patient.gender}</td>
              <td className="px-4 min-w-[150px] py-4 truncate">{patient.phone}</td>
              <td className="px-4 min-w-[150px] py-4 truncate">
                <ul className="flex gap-1">
                  {patient.tags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="default" className="bg-gray-400">
                        {item.tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 min-w-[150px] py-4 truncate">
                <ul className="flex gap-1">
                  {patient.medical_flags.map((item) => (
                    <li key={item.id}>
                      <Badge variant="destructive">{item.flag}</Badge>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 min-w-[150px] py-4 truncate rounded-br-2xl rounded-tr-2xl">
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
