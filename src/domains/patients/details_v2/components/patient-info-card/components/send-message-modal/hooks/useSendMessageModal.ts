import type { FormStatus } from '@/shared/types/form-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const schema = z.object({
  message: z.string().min(1, 'This field is required and cannot be empty.'),
});

export function useSendMessageModal() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (isOpen: boolean) => setIsModalOpen(isOpen);

  const handleSendMessage = form.handleSubmit(async (data) => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 2000));

    setFormStatus('idle');
    toggleModal(false);
    form.reset();

    toast.success(`Message was sent to the patient. ${data.message}`);
  });

  return {
    form,
    formStatus,
    isModalOpen,
    toggleModal,
    handleSendMessage,
  };
}
