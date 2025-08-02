import { Form, FormField, FormItem, FormLabel } from '@/design-system/components/ui/form';
import { FileDropZone } from '@/shared/components/FileDropZone';
import { useFileDrop } from '@/shared/components/FileDropZone/hooks/useFileDrop';
import { useEffect } from 'react';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type Step6FormProps = ReturnType<typeof usePatientCreateForm>['forms']['step6Form'];

export function Step6Form(form: Step6FormProps) {
  const fileDrop = useFileDrop();

  useEffect(() => {
    form.setValue(
      'files',
      fileDrop.files.map((item) => ({ url: item.url }))
    );
  }, [fileDrop.files, form]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem>
              <FormLabel>Files</FormLabel>
              <FileDropZone {...fileDrop} />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
