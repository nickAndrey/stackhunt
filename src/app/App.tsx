import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';

const queryClient = new QueryClient();

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
