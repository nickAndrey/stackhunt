import { Outlet } from 'react-router';
import { Navigation } from './components/navigation';

function Layout() {
  return (
    <div className="px-4">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Layout;
