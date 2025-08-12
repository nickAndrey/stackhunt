import type { FileRecord } from '@/shared/types/file-record';
import { useEffect, useRef, useState } from 'react';
import { processSelectedFiles } from '../utils/process-selected-files';

type Params = {
  image?: {
    quality?: number;
    maxWidth?: number;
  };
  initialValues?: {
    files?: File[];
    inputAccept?:
      | '.pdf'
      | 'application/pdf'
      | '.jpg'
      | '.jpeg'
      | '.png'
      | '.doc'
      | '.docx'
      | 'application/msword'
      | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      | '.xls'
      | '.xlsx'
      | 'application/vnd.ms-excel'
      | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      | 'image/*'
      | 'audio/*'
      | 'video/*';
  };
};

export function useFileDrop(params?: Params) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<(FileRecord & { previewUrl?: string })[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    const processFile = async () => {
      if (params?.initialValues?.files) {
        const files = await processSelectedFiles({
          fileList: params?.initialValues?.files,
          inputAccept: params.initialValues.inputAccept,
          imageQuality: params.image?.quality,
          imageMaxWidth: params.image?.maxWidth,
        });

        setFiles(files);
      }
    };

    processFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;

    const processedFiles = await processSelectedFiles({
      fileList,
      inputAccept: params?.initialValues?.inputAccept,
      imageQuality: params?.image?.quality,
      imageMaxWidth: params?.image?.maxWidth,
    });

    setFiles(processedFiles);
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
    inputAccept: params?.initialValues?.inputAccept,
    onClick,
    onChange,
    onDrop,
    onDragOver,
    onDragLeave,
    onResetFiles,
    onRemoveFile,
  };
}
