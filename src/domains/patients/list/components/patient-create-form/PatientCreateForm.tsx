import { FormSummary } from './components/form-summary';
import { Step1Form } from './components/step-1-form';
import { Step2Form } from './components/step-2-form';
import { Step3Form } from './components/step-3-form';
import { Step4Form } from './components/step-4-form';
import { Step5Form } from './components/step-5-form';
import { Step6Form } from './components/step-6-form';
import { Step7Form } from './components/step-7-form';
import { usePatientCreateForm } from './hooks/usePatientCreateForm';

type PatientCreateFormProps = ReturnType<typeof usePatientCreateForm>;

export function PatientCreateForm(props: PatientCreateFormProps) {
  switch (props.step) {
    case 0:
      return <Step1Form {...props.forms.step1Form} />;
    case 1:
      return <Step2Form {...props.forms.step2Form} />;
    case 2:
      return <Step3Form {...props.forms.step3Form} />;
    case 3:
      return <Step4Form {...props.forms.step4Form} />;
    case 4:
      return <Step5Form {...props.forms.step5Form} />;
    case 5:
      return <Step6Form {...props.forms.step6Form} />;
    case 6:
      return <Step7Form {...props.forms.step7Form} />;
    default:
      return <FormSummary {...props.forms} />;
  }
}
