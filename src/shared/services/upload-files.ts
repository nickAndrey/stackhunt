import { db } from '../db/db';
import type { FileRecord } from '../types/file-record';

type Params = {
  files: FileRecord[];
  entityType: 'patient' | 'staff';
  entityId?: string;
};

export async function uploadFiles({ files, entityType, entityId }: Params) {
  if (!entityId) throw new Error('Id was not provided');

  const names = files.map((file) => file.name || '');

  await db.transaction('rw', db.files, async () => {
    await db.files
      .where('[name+entity_type+entity_id]')
      .anyOf(names.map((name) => [name, entityType, entityId]))
      .delete();

    await db.files.bulkAdd(
      files.map((file) => ({
        ...file,
        entity_type: entityType,
        entity_id: entityId,
      }))
    );
  });
}
