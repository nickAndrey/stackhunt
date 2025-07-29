import { fetchPatientRelatedData } from '@/domains/patients/services/fetch-patient-related-data';
import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export const filterableTableColumns = {
  profile: 'Profile',
  gender: 'Gender',
  phone: 'Phone',
  tags: 'Tags',
  flags: 'Flags',
} as const;

export type FilterField = keyof typeof filterableTableColumns;

type FilterState = { [key in FilterField]: string };

export function usePatientsTableFilter(initialPatients: Patient[]) {
  const [filterColumn, setFilterColumn] = useState<FilterState>({
    profile: '',
    gender: '',
    phone: '',
    tags: '',
    flags: '',
  });

  const [patientsFiltered, setPatientsFiltered] = useState<Patient[]>(initialPatients);
  const filterColumnDebounced = useDebounce(filterColumn, 500);

  const handleFilterChange = (key: FilterField, value: string) => {
    setFilterColumn((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const applyFilter = async () => {
      const filterIdSets: Set<string>[] = [];

      // Profile: first or last name
      if (filterColumnDebounced.profile.trim() !== '') {
        const value = filterColumnDebounced.profile.trim();
        const [first, last] = await Promise.all([
          db.patients.where('first_name').startsWithIgnoreCase(value).toArray(),
          db.patients.where('last_name').startsWithIgnoreCase(value).toArray(),
        ]);
        const ids = new Set([...first, ...last].map((p) => p.id));
        filterIdSets.push(ids);
      }

      // Phone
      if (filterColumnDebounced.phone.trim() !== '') {
        const value = filterColumnDebounced.phone.trim();
        const patients = await db.patients.where('phone').startsWithIgnoreCase(value).toArray();
        filterIdSets.push(new Set(patients.map((p) => p.id)));
      }

      // Gender
      if (filterColumnDebounced.gender.trim() !== '') {
        const value = filterColumnDebounced.gender.trim();
        const patients = await db.patients.where('gender').startsWithIgnoreCase(value).toArray();
        filterIdSets.push(new Set(patients.map((p) => p.id)));
      }

      // Tags (related table)
      if (filterColumnDebounced.tags.trim() !== '') {
        const value = filterColumnDebounced.tags.trim();
        const tags = await db.tags.where('tag').startsWithIgnoreCase(value).toArray();
        filterIdSets.push(new Set(tags.map((t) => t.patient_id)));
      }

      // Flags (related table)
      if (filterColumnDebounced.flags.trim() !== '') {
        const value = filterColumnDebounced.flags.trim();
        const flags = await db.medical_flags.where('flag').startsWithIgnoreCase(value).toArray();
        filterIdSets.push(new Set(flags.map((f) => f.patient_id)));
      }

      let matchedIds: string[] = [];

      if (filterIdSets.length > 0) {
        matchedIds = [
          ...filterIdSets.reduce((acc, set) => {
            return new Set([...acc].filter((id) => set.has(id)));
          }),
        ];
      }

      const data = await Promise.all(
        matchedIds.map(async (id) => ({
          ...(await db.patients.get(id)),
          ...(await fetchPatientRelatedData(id)),
        }))
      );

      console.log(data.filter(Boolean));

      setPatientsFiltered(data.filter(Boolean) as Patient[]);
    };

    applyFilter();
  }, [filterColumnDebounced]);

  return {
    filterColumn,
    handleFilterChange,
    patientsFiltered,
  };
}
