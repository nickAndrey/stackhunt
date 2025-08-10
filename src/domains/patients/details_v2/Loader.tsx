import { getPatientWithRelatedData } from '@/shared/services/get-patient-with-related-data';
import type { Patient } from '@/shared/types/patient';
import { createPageLoader } from '@/shared/utils/createPageLoader';
import { PatientPage } from './Page';
import { enhanceAppointmentsWithAssignedStaff } from './utils/enhance-appointments-with-assigned-staff';

async function fetchPatientFromIndexedDB(id?: string): Promise<{ patient: Patient }> {
  if (!id) throw new Error('Invalid patient id');

  const patient = await getPatientWithRelatedData(id);

  const appointmentsWithAssignedStaff = await enhanceAppointmentsWithAssignedStaff({
    appointments: patient.appointments,
  });

  const mutatedPatient = { ...patient, appointments: appointmentsWithAssignedStaff };

  return new Promise((resolve) => {
    setTimeout(() => resolve({ patient: mutatedPatient }), 2000);
  });
}

export function PatientPageLoader() {
  const Loader = createPageLoader('patient', fetchPatientFromIndexedDB);
  return <Loader>{(data) => <PatientPage data={data} />}</Loader>;
}
