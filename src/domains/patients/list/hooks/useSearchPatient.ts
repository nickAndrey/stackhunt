import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

async function findPatient(value: string): Promise<Patient[]> {
  const [match1, match2, match3, match4] = await Promise.all([
    db.patients.where('first_name').startsWithIgnoreCase(value).toArray(),
    db.patients.where('last_name').startsWithIgnoreCase(value).toArray(),
    db.patients.where('email').startsWithIgnoreCase(value).toArray(),
    db.patients.where('phone').startsWithIgnoreCase(value).toArray(),
  ]);

  const allMatches = [
    ...new Map([...match1, ...match2, ...match3, ...match4].map((p) => [p.id, p])).values(),
  ];

  const patients = allMatches.map(async (patient) => ({
    ...patient,
    notes: await db.notes.where('patient_id').equals(patient.id).toArray(),
    appointments: await db.appointments.where('patient_id').equals(patient.id).toArray(),
    medications: await db.medications.where('patient_id').equals(patient.id).toArray(),
    conditions: await db.conditions.where('patient_id').equals(patient.id).toArray(),
    allergies: await db.allergies.where('patient_id').equals(patient.id).toArray(),
    tags: await db.tags.where('patient_id').equals(patient.id).toArray(),
    files: await db.files.where('patient_id').equals(patient.id).toArray(),
    medical_flags: await db.medical_flags.where('patient_id').equals(patient.id).toArray(),
  }));

  return await Promise.all(patients);
}

export function useSearchPatient() {
  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounced = useDebounce(searchValue, 500);

  const [searchResults, setSearchResults] = useState<Patient[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await findPatient(searchValueDebounced);
      setSearchResults(data);
    })();
  }, [searchValueDebounced]);

  return {
    searchResults,
    searchValue,
    setSearchValue,
  };
}
