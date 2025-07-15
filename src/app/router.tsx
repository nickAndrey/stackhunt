import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from './layout/AuthLayout';
import RouteGuard from './layout/RouteGuard';

const DashboardPage = lazy(() => import('@/domains/dashboard/Page'));
const LoginPage = lazy(() => import('@/domains/login/Page'));
const RegisterPage = lazy(() => import('@/domains/register/Page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
