import { db } from '@/shared/db/db';
import dumpPatientsJson from '@/shared/temp/data/dump-patients.json';
import type { Patient } from '@/shared/types/patient';
import { getRandomUUID } from '@/shared/utils';

export async function createDemoPatients() {
  const patientsDTO = (dumpPatientsJson as Patient[]).map((item) => ({
    ...item,
    id: getRandomUUID(),
  }));

  await db.patients.bulkAdd(patientsDTO);
}
