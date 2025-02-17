import { useMedia } from 'react-use';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  title?: string;
  description?: string;
}

export const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
  title = '',
  description,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia('(min-width: 1024px)', true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          <VisuallyHidden>
            <DialogTitle>{title || ''}</DialogTitle>
          </VisuallyHidden>
          <DialogTitle>{title?.trim() && title}</DialogTitle>
          <DialogDescription>
            {description?.trim() && description}
          </DialogDescription>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <VisuallyHidden>
          <DialogTitle>{title || ''}</DialogTitle>
        </VisuallyHidden>
        <DialogTitle>{title?.trim() && title}</DialogTitle>
        <DialogDescription>
          {description?.trim() && description}
        </DialogDescription>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
