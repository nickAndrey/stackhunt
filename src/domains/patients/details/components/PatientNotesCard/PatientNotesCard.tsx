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
import type { Patient } from '@/shared/types/patient';
import dayjs from 'dayjs';
import { Pencil, Plus } from 'lucide-react';

type PatientNotesCardProps = {
  notes: Patient['notes'];
  onClickCreateNote: () => void;
  onClickEditNote: (id: string) => void;
};

export function PatientNotesCard({
  notes,
  onClickCreateNote,
  onClickEditNote,
}: PatientNotesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-2xl"
            onClick={onClickCreateNote}
          >
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        <Accordion type="multiple">
          {notes && notes?.length > 0 ? (
            notes?.map((note) => (
              <AccordionItem value={note.id} key={note.id}>
                <AccordionTrigger>
                  <div className="flex gap-2 items-center w-full">
                    <span>{dayjs(note.created_at).format('MMMM D, YYYY')}</span>
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
                      onClick={() => onClickEditNote(note.id)}
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
  );
}
