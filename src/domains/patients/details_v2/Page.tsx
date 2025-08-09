import { useHeader } from '@/app/contexts/header';
import type { Patient } from '@/shared/types/patient';
import type { Staff } from '@/shared/types/staff';
import { useEffect } from 'react';
import { PatientFilesCard } from './components/patient-files-card';
import { PatientInfoCard } from './components/patient-info-card';
import { PatientNotesCard } from './components/patient-notes-card';

type PatientPagePropsProps = {
  data: {
    patient: Patient;
    staff: Staff[];
  };
};

export function PatientPage({ data }: PatientPagePropsProps) {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      title: `Patient: ${data.patient.first_name} ${data.patient.last_name}`,
    });

    return () => setHeader({});
  }, [data.patient, setHeader]);

  return (
    <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] xl:grid-cols-[minmax(350px,1fr)_repeat(2,minmax(250px,1fr))] gap-3 px-4 py-3">
      <PatientInfoCard patient={data.patient} />
      <PatientNotesCard notes={data.patient.notes} patientId={data.patient.id} />
      <PatientFilesCard files={data.patient.files} patientId={data.patient.id} />
      <div>4</div>
    </div>
  );
}
