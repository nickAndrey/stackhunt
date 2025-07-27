import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import type { Patient } from '@/shared/types/patient';
import { FileText, Plus, Trash2 } from 'lucide-react';

type PatientFilesCardProps = {
  files: Patient['files'];
  onClickFilesUpload: () => void;
  onClickDeleteFile: (file: string) => void;
};

function PatientFilesCard({ files, onClickFilesUpload, onClickDeleteFile }: PatientFilesCardProps) {
  const getFileName = (file: string) => file.slice(file.lastIndexOf('/') + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-2xl"
            onClick={onClickFilesUpload}
          >
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="max-h-[300px] overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {files.length > 0 ? (
            files.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 px-4 py-2 shadow-md rounded-md border-1"
              >
                <FileText width={16} height={16} className="flex shrink-0" />

                <a
                  href={item.url}
                  download
                  className="text-sm truncate no-underline hover:underline"
                  title={getFileName(item.url)}
                >
                  {getFileName(item.url)}
                </a>

                <div className="ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-4xl"
                    onClick={() => onClickDeleteFile(item.id)}
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
  );
}

export default PatientFilesCard;
