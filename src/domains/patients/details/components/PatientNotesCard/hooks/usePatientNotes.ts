import type { Patient } from '@/shared/types/patient';
import { useState } from 'react';

function usePatientNotes() {
  const [noteMode, setNoteMode] = useState<'create' | 'update'>('create');
  const [activeNote, setActiveNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onClickCreateNote = () => {
    setNoteMode('create');
    setActiveNote('');
    setDialogIsOpen(true);
  };

  const onClickEditNote = (id: string, notes: Patient['notes']) => {
    setSelectedNote(id);
    setActiveNote(notes?.find((note) => note.id === id)?.content || '');
    setNoteMode('update');
    setDialogIsOpen(true);
  };

  const onChangeActiveNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveNote(e.target.value);
  };

  return {
    noteMode,
    activeNote,
    selectedNote,
    dialogIsOpen,
    onClickCreateNote,
    onClickEditNote,
    onChangeActiveNote,
    setDialogIsOpen,
  };
}

export default usePatientNotes;
