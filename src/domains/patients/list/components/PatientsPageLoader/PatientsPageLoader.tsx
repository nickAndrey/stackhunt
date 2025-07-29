import { fetchPatientRelatedData } from '@/domains/patients/services/fetch-patient-related-data';
import { db } from '@/shared/db/db';
import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';

async function fetchPatientsFromIndexedDB(): Promise<Patient[]> {
  const patients = await db.patients.toArray();

  const mutatedPatients = await Promise.all(
    patients.map(async (patient) => ({
      ...patient,
      ...(await fetchPatientRelatedData(patient.id)),
    }))
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(mutatedPatients), 2000);
  });
}

const PatientsPageLoader = createPageLoader('patients', fetchPatientsFromIndexedDB);

export default PatientsPageLoader;
