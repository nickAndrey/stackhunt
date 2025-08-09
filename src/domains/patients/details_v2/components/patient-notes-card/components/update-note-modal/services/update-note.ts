import { db } from '@/shared/db/db';
import type { Note } from '@/shared/types/note';

type Options = {
  noteId: string;
  updatedBy: string;
  noteContent: string;
  updatedByName: string;
};

export async function updateNote(options: Options) {
  const noteDTO: Partial<Note> = {
    updated_by: options.updatedBy,
    updated_by_name: options.updatedByName,
    updated_at: new Date().toISOString(),
    content: options.noteContent,
  };

  await db.notes.update(options.noteId, noteDTO);

  const updatedNote = await db.notes.where('id').equals(options.noteId).first();
  if (!updatedNote) throw new Error('Note was not found');

  return updatedNote;
}
