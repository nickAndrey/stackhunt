import { db, type WithEntity } from '@/shared/db/db';
import type { Note } from '@/shared/types/note';
import { getRandomUUID } from '@/shared/utils';

type Options = {
  noteContent: string;
  patientId: string;
  authorId: string;
  authorName: string;
};

export async function createNote(options: Options) {
  const newNote: WithEntity<Note> = {
    id: getRandomUUID(),
    content: options.noteContent,
    author_id: options.authorId,
    author_name: options.authorName,
    entity_type: 'patient',
    entity_id: options.patientId,
    created_at: new Date().toISOString(),
  };

  await db.notes.add(newNote);

  return newNote;
}
