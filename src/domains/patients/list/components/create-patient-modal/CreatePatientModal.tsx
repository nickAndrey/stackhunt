import { Button } from '@/design-system/components/ui/button';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import { PatientCreateForm, usePatientCreateForm } from './components/patient-create-form';
import { modalTextConfig } from './configs/modal-title-config';
import type { useCreatePatientModal } from './hooks/useCreatePatientModal';

type CreatePatientModalProps = ReturnType<typeof useCreatePatientModal> & {};

export function CreatePatientModal(props: CreatePatientModalProps) {
  const patientCreateForm = usePatientCreateForm();

  const { forms, step, formStatus, handleSubmit, handleAutoGenerate, handleNext, handlePrev } =
    patientCreateForm;

  const isAutoGenerate = patientCreateForm.forms.step1Form.getValues('isAutoGenerate');

  return (
    <Modal
      open={props.isModalOpen}
      onOpenChange={props.toggleModal}
      className="!max-w-[600px]"
      title={modalTextConfig[step].title}
      description={modalTextConfig[step].description}
      actionBtn={
        isAutoGenerate ? (
          <Button
            variant="default"
            onClick={async () => {
              const isPatientCreated = await handleAutoGenerate();

              if (isPatientCreated) {
                props.toggleModal(false);
                props.setIsNewPatientCreated(true);
              }
            }}
            disabled={formStatus === 'processing'}
          >
            {formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
            {formStatus === 'processing' ? 'Generating...' : 'Generate'}
          </Button>
        ) : (
          <>
            {step > 0 && <Button onClick={handlePrev}>Prev</Button>}

            {step === Object.keys(forms).length ? (
              <Button
                onClick={() => {
                  handleSubmit();
                  props.toggleModal(false);
                }}
              >
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </>
        )
      }
    >
      <div className="max-h-[500px] overflow-auto px-2">
        <PatientCreateForm {...patientCreateForm} />
      </div>
    </Modal>
  );
}
