import { Outlet } from 'react-router';
import { Navigation } from './components/navigation';

function Layout() {
  return (
    <div className="px-4 flex-col-grow">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Layout;
