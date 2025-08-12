import type { FileRecord } from '@/shared/types/file-record';
import { resizeAndCompressImage } from './resize-and-compress-iamge';

type Params = {
  fileList: FileList | File[];
  inputAccept?: string;
  imageQuality?: number;
  imageMaxWidth?: number;
};

export async function processSelectedFiles({
  fileList,
  inputAccept,
  imageQuality,
  imageMaxWidth,
}: Params): Promise<(FileRecord & { previewUrl: string })[]> {
  const files = await Promise.all(
    Array.from(fileList).map(async (file) => {
      let fileObj: File = file;

      if (inputAccept && ['image/*', '.jpg', '.jpeg', '.png'].includes(inputAccept)) {
        fileObj = await resizeAndCompressImage({
          file,
          quality: imageQuality || 1,
          maxWidth: imageMaxWidth || 100,
        });
      }

      return {
        id: crypto.randomUUID(),
        name: fileObj.name,
        previewUrl: URL.createObjectURL(fileObj),
        file: fileObj,
      };
    })
  );

  return files;
}
