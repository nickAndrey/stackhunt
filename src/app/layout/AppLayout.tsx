import { Suspense } from 'react';
import { Outlet } from 'react-router';

function AppLayout() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
    </div>
  );
}

export default AppLayout;
