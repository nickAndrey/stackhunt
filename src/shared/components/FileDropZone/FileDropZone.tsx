import { Button } from '@/design-system/components/ui/button';
import { FileText, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import type { useFileDrop } from './hooks/useFileDrop';

type FileDropZoneBase = ReturnType<typeof useFileDrop> & {
  inputAccept?: string;
};

type WithPreview = {
  withPreview: true;
  renderPreviewElement: (imgWidth: number | undefined) => ReactNode;
};

type WithoutPreview = {
  withPreview?: false;
  renderPreviewElement?: null;
};

type FileDropZoneProps = FileDropZoneBase & (WithPreview | WithoutPreview);
export function FileDropZone({
  fileInputRef,
  files,
  isDragActive,
  withPreview,
  inputAccept,
  maxWidth,
  renderPreviewElement,
  onClick,
  onChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemoveFile,
}: FileDropZoneProps) {
  return (
    <div className="w-full max-w-xl">
      {withPreview && renderPreviewElement(maxWidth)}

      <div
        onClick={onClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 text-gray-400'
        }`}
      >
        <p className="text-lg font-medium">Drag & drop files here</p>
        <p className="text-sm mt-1">or click to browse</p>

        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={onChange}
          accept={inputAccept}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Files:</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            {files.map((file) => (
              <li key={file.id} className="flex items-center gap-2">
                <FileText size={16} />
                {file.name}

                <Button
                  variant="ghost"
                  className="rounded-4xl size-8 ml-auto"
                  onClick={() => onRemoveFile(file.id)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
