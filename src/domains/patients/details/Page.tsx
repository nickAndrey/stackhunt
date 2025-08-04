import type { Patient } from '@/shared/types/patient';

import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { Textarea } from '@/design-system/components/ui/textarea';
import { FileDropZone } from '@/shared/components/FileDropZone';
import { useFileDrop } from '@/shared/components/FileDropZone/hooks/useFileDrop';
import { Modal } from '@/shared/components/Modal';
import { db } from '@/shared/db/db';
import type { Staff } from '@/shared/types/staff';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { PatientAppointmentsCard } from './components/patient-appointments-card';
import { AppointmentForm } from './components/patient-appointments-card/components/appointment-form';
import { useAppointmentForm } from './components/patient-appointments-card/components/appointment-form/hooks/useAppointmentForm';
import { PatientFilesCard } from './components/patient-files-card';
import { PatientInfoCard } from './components/patient-info-card';
import { PatientNotesCard } from './components/patient-notes-card';

type DialogName =
  | 'fileRemoveConfirmation'
  | 'fileUpload'
  | 'noteCreate'
  | 'noteUpdate'
  | 'sendMessage'
  | 'createAppointment';

type PageProps = {
  data: {
    patient: Patient;
    staff: Staff[];
  };
};

function Page({ data }: PageProps) {
  const { setHeader } = useHeader();

  const [patient, setPatient] = useState(data.patient);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<DialogName>('noteCreate');

  const [activeNoteId, setActiveNoteId] = useState('');
  const [activeNote, setActiveNote] = useState('');

  const [message, setMessage] = useState('');

  const [fileToRemove, setFileToRemove] = useState('');

  const fileDrop = useFileDrop();

  const appointmentsForm = useAppointmentForm({
    patientId: patient.id,
    appointments: data.patient.appointments,
  });

  const openDialog = (kind: typeof activeDialog) => {
    setActiveDialog(kind);
    setIsDialogOpen(true);
  };

  const handleCreateNote = async () => {
    if (activeNote.trim() === '') return;

    const newNote = {
      id: crypto.randomUUID(),
      author_id: 'current user',
      author_name: 'current user',
      content: activeNote,
      created_at: new Date().toISOString(),
      patient_id: patient.id,
    };

    setPatient((prev) => ({
      ...prev,
      notes: [...(prev.notes ?? []), newNote],
    }));

    await db.notes.add(newNote);

    setIsDialogOpen(false);
  };

  const handleUpdateNote = async () => {
    setPatient((prev) => ({
      ...prev,
      notes: prev.notes?.map((note) =>
        note.id === activeNoteId ? { ...note, content: activeNote } : note
      ),
    }));

    await db.notes.update(activeNoteId, { content: activeNote });

    setIsDialogOpen(false);
  };

  const handleUploadFiles = async () => {
    setPatient((prev) => ({
      ...prev,
      files: [
        ...prev.files,
        ...fileDrop.files.map((item) => ({
          id: crypto.randomUUID(),
          url: item.url,
        })),
      ],
    }));

    await db.files.bulkAdd(
      fileDrop.files.map((item) => ({
        id: crypto.randomUUID(),
        url: item.url,
        patient_id: patient.id,
      }))
    );
    setIsDialogOpen(false);
    fileDrop.onResetFiles();
  };

  const handleDeleteFile = async () => {
    setPatient((prev) => ({
      ...prev,
      files: prev.files.filter((file) => file.id !== fileToRemove),
    }));

    await db.files.delete(fileToRemove);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const { first_name, last_name } = data.patient;

    setHeader({ title: `Patient: ${first_name} ${last_name}` });
    return () => setHeader({});
  }, [data.patient, setHeader]);

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
        <Button type="button" onClick={handleUploadFiles}>
          Save changes
        </Button>
      ),
    },
    fileRemoveConfirmation: {
      title: 'Delete File',
      description: `Are you sure you want to delete a file? ${fileToRemove}`,
      children: null,
      actionBtn: (
        <Button type="button" variant="destructive" onClick={handleDeleteFile}>
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
    createAppointment: {
      title: 'Create an appointment',
      description:
        'Schedule a new appointment for this patient. Choose a suitable date and time, add any relevant notes or purpose, and assign a practitioner if needed.',
      children: <AppointmentForm staff={data.staff} {...appointmentsForm} />,
      actionBtn: (
        <Button
          type="button"
          onClick={() => {
            appointmentsForm.handleSubmit();
            setIsDialogOpen(false);
            toast.success('Appointment was successfully created');
          }}
        >
          Create
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
          onClickDeleteFile={(id) => {
            openDialog('fileRemoveConfirmation');
            setFileToRemove(id);
          }}
        />

        <div className="xl:col-span-full">
          <PatientAppointmentsCard
            appointments={appointmentsForm.appointmentsList}
            staff={data.staff}
            onClickAddAppointment={() => openDialog('createAppointment')}
          />
        </div>
      </div>

      <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen} {...dialogConfig[activeDialog]} />
    </>
  );
}

export default Page;
