import { FormSummary } from './components/form-summary';
import { Step1Form } from './components/step-1-form';
import { Step2Form } from './components/step-2-form';
import { Step3Form } from './components/step-3-form';
import { useCreateMemberForm } from './hooks/useCreateMemberForm';

type CreateMemberFormProps = ReturnType<typeof useCreateMemberForm>;

export function CreateMemberForm(props: CreateMemberFormProps) {
  switch (props.step) {
    case 0:
      return <Step1Form form={props.forms.step1Form} schema={props.schemas.personalInfoSchema} />;
    case 1:
      return <Step2Form form={props.forms.step2Form} schema={props.schemas.jobDetailsSchema} />;
    case 2:
      return <Step3Form form={props.forms.step3Form} />;
    case 3:
      return <FormSummary {...props.forms} />;
  }
}
