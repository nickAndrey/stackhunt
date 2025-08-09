import { db } from '@/shared/db/db';
import { uploadFiles } from '@/shared/services/upload-files';
import type { FileRecord } from '@/shared/types/file-record';

type Options = {
  file: FileRecord;
  patientId: string;
};

export async function updatePatientProfileImage(options: Options) {
  const patientStored = await db.patients.where('id').equals(options.patientId).first();
  if (!patientStored) throw new Error(`Patient with an id ${options.patientId} was not found.`);

  const filesDTO = [{ ...options.file, name: 'profile-image' }];

  await uploadFiles({
    files: filesDTO,
    entityType: 'patient',
    entityId: options.patientId,
  });

  return filesDTO[0].file;
}
