import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { SideBar } from './components/SideBar';

function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <SideBar>
        <Navigation />
      </SideBar>

      <Suspense fallback="Loading...">
        <main className="overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}

export default AppLayout;
