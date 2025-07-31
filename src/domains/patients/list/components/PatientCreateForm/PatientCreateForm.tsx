import { FormSummary } from './components/FormSummary';
import { Step1Form } from './components/Step1Form';
import { Step2Form } from './components/Step2Form';
import { Step3Form } from './components/Step3Form';
import { Step4Form } from './components/Step4Form';
import { Step5Form } from './components/Step5Form';
import { Step6Form } from './components/Step6Form';
import { Step7Form } from './components/Step7Form';
import { usePatientCreateForm } from './hooks/usePatientCreateForm';

type PatientCreateFormProps = ReturnType<typeof usePatientCreateForm>;

function PatientCreateForm(props: PatientCreateFormProps) {
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

export default PatientCreateForm;
