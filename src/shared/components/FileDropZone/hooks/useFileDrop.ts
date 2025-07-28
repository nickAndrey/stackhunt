import type { File } from '@/shared/types/patient';
import { useRef, useState } from 'react';

export function useFileDrop() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles(
      Array.from(fileList).map((item) => {
        return { id: crypto.randomUUID(), url: item.name };
      })
    );
  };

  const onResetFiles = () => {
    setFiles([]);
  };

  const onClick = () => {
    fileInputRef.current?.click();
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
    onClick,
    onChange,
    onDrop,
    onDragOver,
    onDragLeave,
    onResetFiles,
  };
}
