import { db } from '@/shared/db/db';

type Options = {
  fileId: string;
  entityType: string;
  entityId: string;
};

export async function removePatientFile(options: Options) {
  await db.files
    .where('[id+entity_type+entity_id]')
    .equals([options.fileId, options.entityType, options.entityId])
    .delete();
}
