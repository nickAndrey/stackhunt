import { Button } from '@/design-system/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/design-system/components/ui/dialog';
import type { ReactNode } from 'react';

type ModalProps = {
  title: string;
  children: ReactNode;
  description?: string;
  trigger?: ReactNode;
  closeBtn?: ReactNode;
  actionBtn?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Modal({
  title,
  trigger,
  children,
  description,
  closeBtn,
  actionBtn,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>{closeBtn || <Button variant="outline">Cancel</Button>}</DialogClose>
          {actionBtn}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
