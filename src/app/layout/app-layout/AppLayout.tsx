import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/design-system/components/ui/resizable';
import { Toaster } from '@/design-system/components/ui/sonner';
import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { useStoreSideBarSize } from './hooks/useStoreSideBarSize';

function AppLayout() {
  const { currentWidth, handleResize } = useStoreSideBarSize();

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full min-h-screen">
      <ResizablePanel
        defaultSize={currentWidth}
        maxSize={30}
        className="min-w-[60px]"
        onResize={handleResize}
      >
        <Navigation currentWidth={currentWidth} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <main className="overflow-y-auto">
          <Header />
          <Outlet />
          <Toaster position="top-center" />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default AppLayout;
