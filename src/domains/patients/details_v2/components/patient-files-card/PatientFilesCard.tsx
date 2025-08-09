import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import type { FileRecord } from '@/shared/types/file-record';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UploadFilesModal, useUploadFilesModal } from './components/upload-files-modal';

type PatientFilesCardProps = {
  files: FileRecord[];
  patientId: string;
};

export function PatientFilesCard({ files, patientId }: PatientFilesCardProps) {
  const uploadFilesModal = useUploadFilesModal(patientId);

  const [filesRecords, setFilesRecords] = useState(files);

  useEffect(() => {
    if (uploadFilesModal.uploadedFiles.length > 0) {
      setFilesRecords((prev) => [...prev, ...uploadFilesModal.uploadedFiles]);
    }
  }, [uploadFilesModal.uploadedFiles]);

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

                  <div className="ml-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-4xl"
                      disabled={item.name === 'profile-image'}
                      onClick={() => {}}
                    >
                      <Trash2 />
                    </Button>
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
    </>
  );
}
