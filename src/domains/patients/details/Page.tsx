import type { Patient } from '@/shared/types/patient';

import { Button } from '@/design-system/components/ui/button';
import { Textarea } from '@/design-system/components/ui/textarea';
import { Modal } from '@/shared/components/Modal';
import { useState, type ReactNode } from 'react';
import { useLoaderData } from 'react-router';
import { PatientAppointmentsCard } from './components/PatientAppointmentsCard';
import { PatientFilesCard } from './components/PatientFilesCard';
import { FileDropZone } from './components/PatientFilesCard/components/FileDropZone';
import { useFileDrop } from './components/PatientFilesCard/components/FileDropZone/hooks/useFileDrop';
import { PatientInfoCard } from './components/PatientInfoCard';
import { PatientNotesCard } from './components/PatientNotesCard';

type DialogName =
  | 'fileRemoveConfirmation'
  | 'fileUpload'
  | 'noteCreate'
  | 'noteUpdate'
  | 'sendMessage';

function Page() {
  const { data } = useLoaderData<{ data: Patient[] }>();

  const [patient, setPatient] = useState(data[0]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<DialogName>('noteCreate');

  const [activeNoteId, setActiveNoteId] = useState('');
  const [activeNote, setActiveNote] = useState('');

  const [message, setMessage] = useState('');

  const [fileToRemove, setFileToRemove] = useState('');

  const fileDrop = useFileDrop();

  const openDialog = (kind: typeof activeDialog) => {
    setActiveDialog(kind);
    setIsDialogOpen(true);
  };

  const handleCreateNote = () => {
    if (activeNote.trim() === '') return;

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
      children: <FileDropZone {...fileDrop} />,
      actionBtn: (
        <Button
          type="button"
          onClick={() => {
            setPatient((prev) => ({
              ...prev,
              files: [...prev.files, ...fileDrop.files.map((item) => item.name)],
            }));
            setIsDialogOpen(false);
            fileDrop.onResetFiles();
          }}
        >
          Save changes
        </Button>
      ),
    },
    fileRemoveConfirmation: {
      title: 'Delete File',
      description: `Are you sure you want to delete a file? ${fileToRemove}`,
      children: null,
      actionBtn: (
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setPatient((prev) => ({
              ...prev,
              files: prev.files.filter((file) => file !== fileToRemove),
            }));
            setIsDialogOpen(false);
          }}
        >
          Confirm Deletion
        </Button>
      ),
    },
    sendMessage: {
      title: 'Send a message',
      description: '',
      children: <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />,
      actionBtn: (
        <Button
          type="button"
          onClick={() => {
            console.log('message sent');
            setIsDialogOpen(false);
            setMessage('');
          }}
        >
          Send
        </Button>
      ),
    },
  };

  return (
    <>
      <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] xl:grid-cols-[minmax(350px,1fr)_repeat(2,minmax(250px,1fr))] gap-3 px-4">
        <PatientInfoCard patient={patient} onClickSendMessage={() => openDialog('sendMessage')} />

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

        <PatientFilesCard
          files={patient.files}
          onClickFilesUpload={() => openDialog('fileUpload')}
          onClickDeleteFile={(file) => {
            openDialog('fileRemoveConfirmation');
            setFileToRemove(file);
          }}
        />

        <div className="xl:col-span-full">
          <PatientAppointmentsCard
            appointments={patient.appointments}
            onClickAddAppointment={() => {}}
          />
        </div>
      </div>

      <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen} {...dialogConfig[activeDialog]} />
    </>
  );
}

export default Page;
