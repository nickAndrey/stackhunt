import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import { Input } from '@/design-system/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import type { Patient } from '@/shared/types/patient';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CreatePatientModal, useCreatePatientModal } from './components/create-patient-modal';
import { PatientsDataTable } from './components/patients-table_v2';
import { useSearchPatient } from './hooks/useSearchPatient';
import { fetchPatients } from './services/fetch-patients';

type PatientsPageProps = {
  data: Patient[];
};

export function PatientsPage({ data }: PatientsPageProps) {
  const { setHeader } = useHeader();

  const { searchResults, searchValue, setSearchValue } = useSearchPatient();
  const createPatientModal = useCreatePatientModal();

  const [initialData, setInitialData] = useState<Patient[]>(data);

  useEffect(() => {
    if (createPatientModal.isNewPatientCreated) {
      fetchPatients()
        .then((data) => setInitialData(data))
        .finally(() => createPatientModal.setIsNewPatientCreated(false));
    }
  }, [createPatientModal.isNewPatientCreated]);

  useEffect(() => {
    setHeader({
      title: 'Patients',
      actions: (
        <>
          <div className="relative mr-2">
            <Input
              placeholder="Search for patient..."
              className="peer block w-full rounded-md border py-[9px] pl-10 text-sm"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[16px] w-[16px]" />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" onClick={() => createPatientModal.toggleModal(true)}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add patient</TooltipContent>
          </Tooltip>
        </>
      ),
    });

    return () => setHeader({});
  }, [searchValue, setHeader, setSearchValue]);

  return (
    <div className="px-4 py-3 flex-col-grow h-full">
      <Card className="h-full">
        <PatientsDataTable patients={searchResults ?? initialData} />
      </Card>

      <CreatePatientModal {...createPatientModal} />
    </div>
  );
}
