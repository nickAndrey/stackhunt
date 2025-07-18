import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design-system/components/ui/accordion';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import type { Patient } from '@/shared/types/patient';
import type { ReactNode } from 'react';

type PatientNotesCardProps = {
  notes: Patient['notes'];
  createNoteTriggerRenderer: () => ReactNode;
  editNoteTriggerRenderer: (id: string) => ReactNode;
};

function PatientNotesCard({
  notes,
  createNoteTriggerRenderer,
  editNoteTriggerRenderer,
}: PatientNotesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardAction>{createNoteTriggerRenderer()}</CardAction>
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
                  {editNoteTriggerRenderer(note.id)}
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
