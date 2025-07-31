import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import { Modal } from '@/shared/components/Modal';
import { Portal } from '@/shared/components/Portal';
import type { Patient } from '@/shared/types/patient';
import { Plus, Search, UserPlus } from 'lucide-react';
import { PatientCreateForm } from './components/PatientCreateForm';
import { usePatientCreateForm } from './components/PatientCreateForm/hooks/usePatientCreateForm';
import { PatientsTable } from './components/PatientsTable';
import { useSearchPatient } from './hooks/useSearchPatient';

type PageProps = {
  data: Patient[];
};

function Page({ data }: PageProps) {
  const { searchResults, searchValue, setSearchValue } = useSearchPatient();

  const createForm = usePatientCreateForm();

  return (
    <>
      <Portal elementId="header-actions">
        <div className="flex gap-2 items-center">
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
              <Button variant="secondary">
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add patient</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">
                <UserPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Assign patients</TooltipContent>
          </Tooltip>
        </div>
      </Portal>

      <div className="pt-4">
        <PatientsTable patients={searchResults ?? data} />

        <Modal
          className="!max-w-[600px]"
          title="Create new patient"
          actionBtn={
            <>
              {createForm.step > 0 && <Button onClick={createForm.handlePrev}>Prev</Button>}

              {createForm.step === Object.keys(createForm.forms).length ? (
                <Button onClick={createForm.handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={createForm.handleNext}>Next</Button>
              )}
            </>
          }
        >
          <div className="max-h-[500px] overflow-auto px-2">
            <PatientCreateForm {...createForm} />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Page;
