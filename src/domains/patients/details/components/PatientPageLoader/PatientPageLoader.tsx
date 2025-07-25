import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import axios from 'axios';

async function fetchPatient(id?: string) {
  const res = await axios.get('/src/shared/temp/data/patients.json');
  return res.data.data.find((item: Patient) => item.id === id);
}

const PatientPageLoader = createPageLoader('patient', fetchPatient);

export default PatientPageLoader;
