import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import App from './App';

const DashboardPage = lazy(() => import('@/domains/dashboard/Page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback="Loading ...">
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
