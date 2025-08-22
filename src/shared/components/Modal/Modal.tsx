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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/design-system/components/ui/drawer';
import { useMediaQuery } from '@uidotdev/usehooks';
import type { ReactNode } from 'react';

type ModalProps = {
  title: string;
  children: ReactNode;
  description?: string;
  trigger?: ReactNode;
  closeBtn?: ReactNode;
  actionBtn?: ReactNode;
  open?: boolean;
  className?: string;
  onOpenChange?: (open: boolean) => void;
};

export function Modal({
  title,
  trigger,
  children,
  description,
  closeBtn,
  actionBtn,
  open,
  className,
  onOpenChange,
}: ModalProps) {
  const isDesktop = useMediaQuery('(width >= 48rem)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          {children}

          <DialogFooter>
            <DialogClose asChild>
              {closeBtn || <Button variant="outline">Cancel</Button>}
            </DialogClose>
            {actionBtn}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <div className="px-4 py-3 max-h-full">{children}</div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>{closeBtn || <Button variant="outline">Cancel</Button>}</DrawerClose>
          {actionBtn}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Modal;
