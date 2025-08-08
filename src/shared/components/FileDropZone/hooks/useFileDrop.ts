import type { FileRecord } from '@/shared/types/file-record';
import { useRef, useState } from 'react';
import { resizeAndCompressImage } from '../utils/resize-and-compress-iamge';

type Params = {
  image?: {
    quality?: number;
    maxWidth?: number;
  };
};

export function useFileDrop(params?: Params) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<(FileRecord & { previewUrl?: string })[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    const files = await Promise.all(
      Array.from(fileList).map(async (file) => {
        const compressedImg = await resizeAndCompressImage({
          file,
          quality: params?.image?.quality || 1,
          maxWidth: params?.image?.maxWidth || 100,
        });

        return {
          id: crypto.randomUUID(),
          name: compressedImg.name,
          previewUrl: URL.createObjectURL(compressedImg),
          file: compressedImg,
        };
      })
    );

    setFiles(files);
  };

  const onResetFiles = () => {
    setFiles([]);
  };

  const onClick = () => {
    fileInputRef.current?.click();
  };

  const onRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  return {
    fileInputRef,
    files,
    isDragActive,
    maxWidth: params?.image?.maxWidth,
    onClick,
    onChange,
    onDrop,
    onDragOver,
    onDragLeave,
    onResetFiles,
    onRemoveFile,
  };
}
