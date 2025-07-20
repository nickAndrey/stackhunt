import type { Patient } from '@/shared/types/patient';

import { Button } from '@/design-system/components/ui/button';
import { Textarea } from '@/design-system/components/ui/textarea';
import { Modal } from '@/shared/components/Modal';
import { useState, type ReactNode } from 'react';
import { useLoaderData } from 'react-router';
import { PatientFilesCard } from './components/PatientFilesCard';
import { PatientInfoCard } from './components/PatientInfoCard';
import { PatientNotesCard } from './components/PatientNotesCard';

type DialogName = 'fileRemoveConfirmation' | 'fileUpload' | 'noteCreate' | 'noteUpdate';

function Page() {
  const { data } = useLoaderData<{ data: Patient[] }>();

  const [patient, setPatient] = useState(data[0]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<DialogName>('noteCreate');

  const [activeNoteId, setActiveNoteId] = useState('');
  const [activeNote, setActiveNote] = useState('');

  const openDialog = (kind: typeof activeDialog) => {
    setActiveDialog(kind);
    setIsDialogOpen(true);
  };

  const handleCreateNote = () => {
    setPatient((prev) => ({
      ...prev,
      notes: [
        ...(prev.notes ?? []),
        {
          id: Date.now().toString(),
          author_id: 'ws',
          author_name: 'ws',
          content: activeNote,
          created_at: '2025-07-18T10:35:00Z',
        },
      ],
    }));
    setIsDialogOpen(false);
  };

  const handleUpdateNote = () => {
    setPatient((prev) => ({
      ...prev,
      notes: prev.notes?.map((note) =>
        note.id === activeNoteId ? { ...note, content: activeNote } : note
      ),
    }));
    setIsDialogOpen(false);
  };

  const dialogConfig: Record<
    DialogName,
    {
      title: string;
      description: string;
      children: ReactNode;
      actionBtn: ReactNode;
    }
  > = {
    noteCreate: {
      title: 'Create Note',
      description: "Add a new note. Click save when you're done.",
      children: <Textarea value={activeNote} onChange={(e) => setActiveNote(e.target.value)} />,
      actionBtn: (
        <Button type="button" onClick={handleCreateNote}>
          Save
        </Button>
      ),
    },
    noteUpdate: {
      title: 'Update Note',
      description: "Make changes to the note here. Click save when you're done.",
      children: <Textarea value={activeNote} onChange={(e) => setActiveNote(e.target.value)} />,
      actionBtn: (
        <Button type="button" onClick={handleUpdateNote}>
          Save changes
        </Button>
      ),
    },
    fileUpload: {
      title: 'Upload File',
      description: 'Use area below to upload files',
      children: null,
      actionBtn: (
        <Button type="button" onClick={() => console.log('uploaded')}>
          Save changes
        </Button>
      ),
    },
    fileRemoveConfirmation: {
      title: 'Delete File',
      description: 'Are you sure you want to delete a file?',
      children: null,
      actionBtn: (
        <Button type="button" variant="destructive" onClick={() => console.log('delete file')}>
          Confirm Deletion
        </Button>
      ),
    },
  };

  return (
    <div className="grid grid-cols-[repeat(12,1fr)] gap-3 px-4">
      <div className="col-span-12 lg:col-span-6">
        <PatientInfoCard patient={patient} />
      </div>

      <div className="col-span-12 lg:col-span-3">
        <PatientNotesCard
          notes={patient.notes}
          onClickCreateNote={() => {
            openDialog('noteCreate');
            setActiveNote('');
          }}
          onClickEditNote={(id) => {
            openDialog('noteUpdate');
            setActiveNoteId(id);
            setActiveNote(patient.notes?.find((item) => item.id === id)?.content || '');
          }}
        />
      </div>

      <div className="col-span-12 lg:col-span-3">
        <PatientFilesCard
          files={patient.files}
          onClickFilesUpload={() => openDialog('fileUpload')}
          onClickDeleteFile={() => openDialog('fileRemoveConfirmation')}
        />
      </div>

      <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen} {...dialogConfig[activeDialog]} />
    </div>
  );
}

export default Page;
