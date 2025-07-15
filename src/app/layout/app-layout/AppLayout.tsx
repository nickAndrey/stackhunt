import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navigation from './Navigation';

function AppLayout() {
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen w-full">
      <aside className="grid grid-cols-[1fr_auto] overflow-y-auto relative">
        <Navigation />
        <div className="w-0.5 h-full bg-gray-200 hover:w-1 hover:cursor-grab hover:bg-gray-300 transition-[width,background]" />
      </aside>

      <Suspense fallback="Loading...">
        <main className="overflow-y-auto">
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}

export default AppLayout;
