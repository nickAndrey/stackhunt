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
  return (
    <Suspense fallback="Loading...">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
