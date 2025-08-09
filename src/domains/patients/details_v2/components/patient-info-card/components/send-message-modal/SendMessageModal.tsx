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
import type { useSendMessageModal } from './hooks/useSendMessageModal';

type SendMessageModalProps = ReturnType<typeof useSendMessageModal> & {};

export function SendMessageModal(params: SendMessageModalProps) {
  return (
    <Modal
      open={params.isModalOpen}
      onOpenChange={params.toggleModal}
      title="Send a message"
      description="Write and send a message directly to the patient."
      actionBtn={
        <Button type="button" onClick={params.handleSendMessage}>
          {params.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {params.formStatus === 'processing' ? 'Sending...' : 'Send Message'}
        </Button>
      }
    >
      <Form {...params.form}>
        <form>
          <FormField
            control={params.form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write a message ..."
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
