import { useState } from 'react';

function usePatientFiles() {
  const [manageFilesDialogIsOpen, setManageFilesDialogIsOpen] = useState(false);

  return {
    manageFilesDialogIsOpen,
    setManageFilesDialogIsOpen,
  };
}

export default usePatientFiles;
