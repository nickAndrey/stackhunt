import { Button } from '@/design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/design-system/components/ui/form';
import { Textarea } from '@/design-system/components/ui/textarea';
import { Modal } from '@/shared/components/Modal';
import { LoaderCircle } from 'lucide-react';
import type { useUpdateNoteModal } from './hooks/useUpdateNoteModal';

type UpdateNoteModalProps = ReturnType<typeof useUpdateNoteModal> & {};

export function UpdateNoteModal(params: UpdateNoteModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Update a Note"
      description="Make changes to the note here. Click save when you're done."
      actionBtn={
        <Button type="button" onClick={params.handleUpdateNote}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Updating Note...' : 'Update Note'}
        </Button>
      }
    >
      <Form {...params.form}>
        <form>
          <FormField
            control={params.form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Provide a note ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
}
