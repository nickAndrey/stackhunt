import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SideBar } from './components/SideBar';

function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <SideBar>{(currentWidth) => <Navigation currentWidth={currentWidth} />}</SideBar>

      <main className="overflow-y-auto bg-blue-50">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
