import { db } from '@/shared/db/db';
import dumpPatientsJson from '@/shared/temp/data/dump-patients.json';
import type { Patient } from '@/shared/types/patient';

export async function createDemoPatients() {
  const patientsDTO = (dumpPatientsJson as Patient[]).map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));

  await db.patients.bulkAdd(patientsDTO);
}
