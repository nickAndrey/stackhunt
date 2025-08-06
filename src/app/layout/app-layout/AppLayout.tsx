import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/design-system/components/ui/resizable';
import { Toaster } from '@/design-system/components/ui/sonner';
import { Outlet } from 'react-router';
import { Header } from './components/header';
import { Navigation } from './components/navigation';
import { useStoreSideBarSize } from './hooks/useStoreSideBarSize';

export function AppLayout() {
  const { currentWidth, handleResize } = useStoreSideBarSize();

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen!">
      <ResizablePanel
        defaultSize={currentWidth}
        maxSize={30}
        className="min-w-[60px]"
        onResize={handleResize}
      >
        <Navigation currentWidth={currentWidth} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col h-full">
        <Header />
        <main className="overflow-auto">
          <Outlet />
          <Toaster position="top-center" />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
