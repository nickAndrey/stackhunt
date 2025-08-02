import { FormSummary } from './components/FormSummary';
import { Step1Form } from './components/Step1Form';
import { Step2Form } from './components/Step2Form';
import { Step3Form } from './components/Step3Form';
import type { useRegisterForm } from './hooks/useRegisterForm';

type RegisterFormProps = ReturnType<typeof useRegisterForm>;

function RegisterForm(props: RegisterFormProps) {
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

export default RegisterForm;
