import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design-system/components/ui/accordion';
import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import { DAYJS_FORMAT } from '@/shared/constants';
import type { Note } from '@/shared/types/note';
import dayjs from 'dayjs';
import { Pencil, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CreateNoteModal, useCreateNoteModal } from './components/create-note-modal';
import { UpdateNoteModal } from './components/update-note-modal';
import { useUpdateNoteModal } from './components/update-note-modal/hooks/useUpdateNoteModal';

type PatientNotesCardProps = {
  patientId: string;
  notes?: Note[];
};

export function PatientNotesCard({ patientId, notes }: PatientNotesCardProps) {
  const createNoteModal = useCreateNoteModal(patientId);
  const updateNoteModal = useUpdateNoteModal();

  const [notesList, setNotesList] = useState(notes ?? []);

  useEffect(() => {
    setNotesList((prev) => [...prev, ...createNoteModal.newNote]);
  }, [createNoteModal.newNote]);

  useEffect(() => {
    const updatedNote = updateNoteModal.updatedNote[0];
    if (updatedNote) {
      setNotesList((prev) =>
        prev.map((item) => (item.id === updatedNote.id ? { ...item, ...updatedNote } : item))
      );
    }
  }, [updateNoteModal.updatedNote]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-2xl"
              onClick={() => createNoteModal.toggleModal(true)}
            >
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          <Accordion type="multiple">
            {notesList && notesList?.length > 0 ? (
              notesList?.map((note) => (
                <AccordionItem value={note.id} key={note.id}>
                  <AccordionTrigger>
                    <div className="flex gap-2 items-center w-full">
                      <span>{dayjs(note.created_at).format(DAYJS_FORMAT)}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="bg-gray-100 py-4 px-2 rounded-xl mb-3">
                      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <small>Created by: {note.author_name}</small>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-8 rounded-2xl"
                        onClick={() => updateNoteModal.toggleModal(true, note)}
                      >
                        <Pencil />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <NoData />
            )}
          </Accordion>
        </CardContent>
      </Card>

      <CreateNoteModal {...createNoteModal} />
      <UpdateNoteModal {...updateNoteModal} />
    </>
  );
}
