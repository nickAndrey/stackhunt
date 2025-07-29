import { Form } from '@/design-system/components/ui/form';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step6FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step6Form'];

function Step6Form(form: Step6FormProps) {
  return (
    <Form {...form}>
      <form></form>
    </Form>
  );
}

export default Step6Form;
