import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import { Input } from '@/design-system/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import { Modal } from '@/shared/components/Modal';
import type { Patient } from '@/shared/types/patient';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PatientsDataTable } from './components/patients-table_v2';
import {
  PatientCreateForm,
  usePatientCreateForm,
} from './components/patients-table_v2/components/patient-create-form';
import { useSearchPatient } from './hooks/useSearchPatient';

type PatientsPageProps = {
  data: Patient[];
};

export function PatientsPage({ data }: PatientsPageProps) {
  const { setHeader } = useHeader();

  const { searchResults, searchValue, setSearchValue } = useSearchPatient();

  const [initialData, setInitialData] = useState<Patient[]>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createForm = usePatientCreateForm();

  useEffect(() => {
    const newPatient = createForm.newPatient;
    if (newPatient !== null) {
      setInitialData((prev) => [...prev, newPatient]);
    }
  }, [createForm.newPatient]);

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
              <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
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

  const modalConfig = [
    {
      title: 'Step 1: Personal Information',
      description:
        'Enter the patient’s basic personal details, including name, gender, and date of birth.',
    },
    {
      title: 'Step 2: Contact Information',
      description: 'Provide the patient’s contact details and residential address.',
    },
    {
      title: 'Step 3: Emergency Contact',
      description:
        'Set up an emergency contact and the patient’s preferred communication language and method.',
    },
    {
      title: 'Step 4: Identification',
      description:
        'Input the patient’s identification details, such as national ID and insurance number.',
    },
    {
      title: 'Step 5: Medical Information',
      description:
        'Record any relevant medical history, known conditions, allergies, and medications.',
    },
    {
      title: 'Step 6: Files and Notes',
      description: 'Attach any relevant medical files or notes associated with the patient.',
    },
    {
      title: 'Step 7: Status and Tags',
      description:
        'Assign the patient’s current status and add relevant tags for easier categorization.',
    },
    {
      title: 'Step 8: Summary',
      description:
        'Review all the information you’ve entered to ensure it’s accurate before submitting the patient record.',
    },
  ];

  return (
    <div className="px-4 py-3">
      <Card>
        <PatientsDataTable patients={searchResults ?? initialData} />
      </Card>

      <Modal
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) createForm.handleReset();
        }}
        className="!max-w-[600px]"
        title={modalConfig[createForm.step].title}
        description={modalConfig[createForm.step].description}
        actionBtn={
          <>
            {createForm.step > 0 && <Button onClick={createForm.handlePrev}>Prev</Button>}

            {createForm.step === Object.keys(createForm.forms).length ? (
              <Button
                onClick={() => {
                  createForm.handleSubmit();
                  setIsDialogOpen(false);
                }}
              >
                Submit
              </Button>
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
  );
}
