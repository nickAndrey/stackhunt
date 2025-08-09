import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import { NoData } from '@/shared/components/NoData';
import type { FileRecord } from '@/shared/types/file-record';
import { CircleQuestionMark, FileText, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  RemoveFileConfirmationModal,
  useRemoveFileConfirmationModal,
} from './components/remove-file-confirmation-modal';
import { UploadFilesModal, useUploadFilesModal } from './components/upload-files-modal';

type PatientFilesCardProps = {
  files: FileRecord[];
  patientId: string;
};

export function PatientFilesCard({ files, patientId }: PatientFilesCardProps) {
  const uploadFilesModal = useUploadFilesModal(patientId);
  const removeFileConfirmationModal = useRemoveFileConfirmationModal(patientId);

  const [filesRecords, setFilesRecords] = useState(files);

  useEffect(() => {
    if (uploadFilesModal.uploadedFiles.length > 0) {
      setFilesRecords((prev) => [...prev, ...uploadFilesModal.uploadedFiles]);
    }
  }, [uploadFilesModal.uploadedFiles]);

  useEffect(() => {
    if (removeFileConfirmationModal.removedFileId) {
      setFilesRecords((prev) =>
        prev.filter((item) => item.id !== removeFileConfirmationModal.removedFileId)
      );
    }
  }, [removeFileConfirmationModal.removedFileId]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-2xl"
              onClick={() => uploadFilesModal.toggleModal(true)}
            >
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="max-h-[300px] overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {filesRecords.length > 0 ? (
              filesRecords.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 px-4 py-2 shadow-md rounded-md border-1"
                >
                  <FileText width={16} height={16} className="flex shrink-0" />

                  <a
                    href={URL.createObjectURL(item.file)}
                    download
                    className="text-sm truncate no-underline hover:underline"
                    title={item.name}
                  >
                    {item.name}
                  </a>

                  <div className="ml-auto flex gap-1 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-4xl"
                      disabled={item.name === 'profile-image'}
                      onClick={() => removeFileConfirmationModal.toggleModal(true, item.id)}
                    >
                      <Trash2 />
                    </Button>
                    {item.name === 'profile-image' && (
                      <Tooltip>
                        <TooltipTrigger>
                          <CircleQuestionMark size={14} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Profile avatar can only be changed from the profile panel.</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li>
                <NoData />
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      <UploadFilesModal {...uploadFilesModal} />
      <RemoveFileConfirmationModal {...removeFileConfirmationModal} />
    </>
  );
}
