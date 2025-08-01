import { seedPatients } from '@/shared/db/seedPatients';
import { seedStaff } from '@/shared/db/seedStaff';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';

const queryClient = new QueryClient();

/**
 * @description
 * ## Create DB and predefine patients, doctors, appointments and settings
 */
seedPatients();
seedStaff();

function App() {
  const fallBackElement = (
    <div className="flex items-center justify-center w-full h-screen">
      <img src="/logo-big.png" className="w-[300px] h-[150px]" />
    </div>
  );

  return (
    <Suspense fallback={fallBackElement}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
