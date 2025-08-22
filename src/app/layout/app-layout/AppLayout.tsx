import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/design-system/components/ui/resizable';
import { Toaster } from '@/design-system/components/ui/sonner';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Outlet } from 'react-router';
import { Header } from './components/header';
import { HeaderMobile } from './components/header-mobile';
import { Navigation } from './components/navigation';
import { useStoreSideBarSize } from './hooks/useStoreSideBarSize';

export function AppLayout() {
  const { currentWidth, handleResize } = useStoreSideBarSize();
  const isDesktop = useMediaQuery('(width >= 48rem)');

  if (!isDesktop) {
    return (
      <div className="min-h-[100dvh] flex-col-grow">
        <HeaderMobile />
        <main className="overflow-y-auto flex-col-grow">
          <Outlet />
          <Toaster position="top-center" />
        </main>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-[100dvh]!">
      <ResizablePanel
        defaultSize={currentWidth}
        maxSize={30}
        className="min-w-[60px]"
        onResize={handleResize}
      >
        <Navigation currentWidth={currentWidth} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex-col-grow">
        <Header />
        <main className="overflow-auto flex-col-grow">
          <Outlet />
          <Toaster position="top-center" />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
