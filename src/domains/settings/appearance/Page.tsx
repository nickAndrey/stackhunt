// type PAgeProps = {}

import { useHeader } from '@/app/contexts/header';
import { useEffect } from 'react';

export function AppearancePage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: 'Settings: Appearance' });
    return () => setHeader({});
  }, [setHeader]);

  return <div>Page</div>;
}
