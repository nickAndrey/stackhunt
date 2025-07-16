import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';
import fetchRates from './loaders/fetchRates';

const DashboardPage = lazy(() => import('@/domains/dashboard/Page'));
const AlertsPage = lazy(() => import('@/domains/alerts/Page'));
const SettingsPage = lazy(() => import('@/domains/settings/Page'));
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
        Component: DashboardPage,
        loader: async () => await fetchRates(),
        hydrateFallbackElement: 'Loading ...',
      },
      {
        path: '/alerts',
        element: <AlertsPage />,
        hydrateFallbackElement: 'Loading ...',
      },
      {
        path: '/settings',
        element: <SettingsPage />,
        hydrateFallbackElement: 'Loading ...',
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
