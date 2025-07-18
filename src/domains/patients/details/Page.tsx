import { Card } from '@/design-system/components/ui/card';
import type { Patient } from '@/shared/types/patient';

import { Button } from '@/design-system/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/design-system/components/ui/dialog';
import { Textarea } from '@/design-system/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { PatientInfoCard } from './components/PatientInfoCard';
import { PatientNotesCard } from './components/PatientNotesCard';
import usePatientNotes from './components/PatientNotesCard/hooks/usePatientNotes';

function Page() {
  const { data } = useLoaderData<{ data: Patient[] }>();

  const [patient, setPatient] = useState(data[0]);

  const {
    noteMode,
    dialogIsOpen,
    selectedNote,
    activeNote,
    onClickCreateNote,
    onClickEditNote,
    onChangeActiveNote,
    setDialogIsOpen,
  } = usePatientNotes();

  const onAddNewNote = () => {
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
  };

  const onUpdateNote = () => {
    setPatient((prev) => ({
      ...prev,
      notes: prev.notes?.map((note) =>
        note.id === selectedNote ? { ...note, content: activeNote } : note
      ),
    }));
  };

  const handleSaveNote = () => {
    if (noteMode === 'create') {
      onAddNewNote();
    } else if (noteMode === 'update') {
      onUpdateNote();
    }

    setDialogIsOpen(false);
  };

  return (
    <div className="grid grid-cols-[repeat(12,1fr)] gap-3 px-4">
      <div className="col-span-12 lg:col-span-6">
        <PatientInfoCard patient={patient} />
      </div>

      <div className="col-span-12 lg:col-span-3">
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
          <PatientNotesCard
            notes={patient.notes}
            createNoteTriggerRenderer={() => (
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8"
                  onClick={onClickCreateNote}
                >
                  <Plus />
                </Button>
              </DialogTrigger>
            )}
            editNoteTriggerRenderer={(id) => (
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-8"
                  onClick={() => onClickEditNote(id, patient?.notes)}
                >
                  <Pencil />
                </Button>
              </DialogTrigger>
            )}
          />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{noteMode === 'create' ? 'Create Note' : 'Update Note'}</DialogTitle>
              <DialogDescription>
                Make changes to the note here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Textarea value={activeNote} onChange={onChangeActiveNote} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveNote}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="col-span-12 lg:col-span-3">
        <Card>3</Card>
      </div>
    </div>
  );
}

export default Page;
