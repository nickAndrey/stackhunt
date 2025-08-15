import { useAuth } from '@/app/contexts/auth';
import type { FormStatus } from '@/shared/types/form-status';
import type { Note } from '@/shared/types/note';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { updateNote } from '../services/update-note';

const schema = z.object({
  note: z.string().min(1, 'Empty notes are not allowed, please provide some text.'),
});

export function useUpdateNoteModal() {
  const { member } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      note: '',
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updatedNote, setUpdatedNote] = useState<Note[]>([]);
  const [noteId, setNoteId] = useState('');

  const toggleModal = (isOpen: boolean, note?: Note) => {
    if (isOpen === false) {
      form.reset();
    }

    if (note) {
      form.setValue('note', note.content);
      setNoteId(note.id);
    }

    setIsModalOpen(isOpen);
  };

  const handleUpdateNote = form.handleSubmit(async (data) => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      if (!member?.id) throw new Error('Staff member ID was not provided.');
      if (!noteId) throw new Error('Note ID was not provided.');

      const note = await updateNote({
        noteId,
        updatedBy: member.id,
        noteContent: data.note.trim(),
        updatedByName: `${member?.first_name} ${member?.last_name}`,
      });

      setUpdatedNote([note]);
      setFormStatus('idle');

      toggleModal(false);
      form.reset();

      toast.success('The not has been successfully updated.');
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
    updatedNote,
    toggleModal,
    handleUpdateNote,
  };
}
