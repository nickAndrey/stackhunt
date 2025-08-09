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
import type { useCreateNoteModal } from './hooks/useCreateNoteModal';

type CreateNoteModalProps = ReturnType<typeof useCreateNoteModal> & {};

export function CreateNoteModal(params: CreateNoteModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Create a Note"
      description="Add a note specific to patient."
      actionBtn={
        <Button type="button" onClick={params.handleCreateNote}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Saving Note...' : 'Save Note'}
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
