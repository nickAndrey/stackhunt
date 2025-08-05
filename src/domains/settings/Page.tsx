import { useHeader } from '@/app/contexts/header';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';

function Page() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: 'Settings' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="px-4">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default Page;
