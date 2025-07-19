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
import type { Patient } from '@/shared/types/patient';
import { Pencil, Plus } from 'lucide-react';

type PatientNotesCardProps = {
  notes: Patient['notes'];
  onClickCreateNote: () => void;
  onClickEditNote: (id: string) => void;
};

function PatientNotesCard({ notes, onClickCreateNote, onClickEditNote }: PatientNotesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardAction>
          <Button variant="secondary" size="icon" className="size-8" onClick={onClickCreateNote}>
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        <Accordion type="multiple">
          {notes?.map((note) => (
            <AccordionItem value={note.id} key={note.id}>
              <AccordionTrigger>
                <div className="flex gap-2 items-center w-full">
                  <span>{Intl.DateTimeFormat('en-CA').format(new Date(note.created_at))}</span>
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
                    className="ml-auto size-8"
                    onClick={() => onClickEditNote(note.id)}
                  >
                    <Pencil />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default PatientNotesCard;
