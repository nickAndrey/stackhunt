import { Outlet } from 'react-router';
import { Navigation } from './components/navigation';

export function SettingsLayout() {
  return (
    <div className="px-4 flex-col-grow">
      <Navigation />
      <Outlet />
    </div>
  );
}
