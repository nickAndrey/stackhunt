import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/auth';
import { HeaderProvider } from './contexts/header';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
    },
  },
});

/**
 * @description
 * ## Create DB and predefine patients, doctors, appointments and settings
 */
// seedPatients();
// seedStaff();

function App() {
  const fallBackElement = (
    <div className="flex items-center justify-center w-full h-screen">
      <img src="/logo-big.png" className="w-[300px] h-[150px]" />
    </div>
  );

  return (
    <Suspense fallback={fallBackElement}>
      <AuthProvider>
        <HeaderProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HeaderProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
