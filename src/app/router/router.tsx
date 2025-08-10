import { LoginPageLoader } from '@/domains/login';
import { MembersPageLoader } from '@/domains/members/list';
import { PatientPageLoader } from '@/domains/patients/details_v2';
import { PatientsPageLoader } from '@/domains/patients/list';
import { RegisterPageLoader } from '@/domains/register';
import { AppearancePage } from '@/domains/settings/appearance';
import { ProfileLoader } from '@/domains/settings/profile';
import { SecurityAndPasswordLoader } from '@/domains/settings/security-and-password';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

const AppointmentsPage = lazy(() => import('@/domains/appointments/Page'));

const SettingsLayout = lazy(() => import('@/domains/settings/Layout'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        index: true,
        element: <Navigate to="/patients" />,
      },
      {
        path: '/patients',
        element: <PatientsPageLoader />,
      },
      {
        path: '/patients/:id',
        element: <PatientPageLoader />,
      },
      {
        path: '/members',
        element: <MembersPageLoader />,
      },
      {
        path: '/members/:id',
        element: <h1>member details</h1>,
      },
      {
        path: '/appointments',
        element: <AppointmentsPage />,
      },
      {
        path: '/settings',
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/settings/profile" />,
          },
          {
            path: '/settings/profile',
            element: <ProfileLoader />,
          },
          {
            path: '/settings/appearance',
            element: <AppearancePage />,
          },
          {
            path: '/settings/security',
            element: <SecurityAndPasswordLoader />,
          },
        ],
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
        element: <LoginPageLoader />,
      },
      {
        path: '/auth/register',
        element: <RegisterPageLoader />,
      },
    ],
  },
]);
