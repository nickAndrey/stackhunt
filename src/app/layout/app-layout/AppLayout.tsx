import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { SideBar } from './components/SideBar';

function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <SideBar />

      <Suspense fallback="Loading...">
        <main className="overflow-y-auto">
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}

export default AppLayout;
