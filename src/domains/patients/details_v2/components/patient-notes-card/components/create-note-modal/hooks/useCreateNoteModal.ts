import { useAuth } from '@/app/contexts/auth';
import type { FormStatus } from '@/shared/types/form-status';
import type { Note } from '@/shared/types/note';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { createNote } from '../services/create-note';

const schema = z.object({
  note: z.string().min(1, 'Empty notes are not allowed, please provide some text.'),
});

export function useCreateNoteModal(patientId: string) {
  const { member } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      note: '',
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newNote, setNewNote] = useState<Note[]>([]);

  const toggleModal = (isOpen: boolean) => {
    if (isOpen === false) form.reset();
    setIsModalOpen(isOpen);
  };

  const handleCreateNote = form.handleSubmit(async (data) => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      if (!patientId) throw new Error('Patient ID was not provided.');
      if (!member?.id) throw new Error('Staff member ID was not provided.');

      const note = await createNote({
        patientId,
        authorId: member.id,
        noteContent: data.note.trim(),
        authorName: `${member?.first_name} ${member?.last_name}`,
      });

      setNewNote([note]);
      setFormStatus('idle');

      toggleModal(false);
      form.reset();

      toast.success('The not has been successfully created.');
    } catch (error) {
      setFormStatus('error');
      console.error((error as Error).message);
      toast.error((error as Error).message);
    }
  });

  return {
    form,
    formStatus,
    isModalOpen,
    newNote,
    toggleModal,
    handleCreateNote,
  };
}
