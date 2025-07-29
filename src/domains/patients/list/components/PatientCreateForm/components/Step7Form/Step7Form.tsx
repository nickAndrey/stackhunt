import { Form } from '@/design-system/components/ui/form';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step7FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step7Form'];

function Step7Form(form: Step7FormProps) {
  return (
    <Form {...form}>
      <form></form>
    </Form>
  );
}

export default Step7Form;
