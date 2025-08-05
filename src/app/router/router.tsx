import LoginPage from '@/domains/login/Page';
import PatientDetailsPage from '@/domains/patients/details/Page';
import PatientsListPage from '@/domains/patients/list/Page';
import RegisterPage from '@/domains/register/Page';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

const SettingsPage = lazy(() => import('@/domains/settings/Page'));
const AppointmentsPage = lazy(() => import('@/domains/appointments/Page'));
const MembersPage = lazy(() => import('@/domains/members/Page'));

const PatientPageLoader = lazy(
  () => import('@/domains/patients/details/components/patient-page-loader/PatientPageLoader')
);
const PatientsPageLoader = lazy(
  () => import('@/domains/patients/list/components/patient-page-loader/PatientsPageLoader')
);
const LoginPageLoader = lazy(
  () => import('@/domains/login/components/login-page-loader/LoginPageLoader')
);

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
        element: (
          <PatientsPageLoader>
            {(patients) => <PatientsListPage data={patients} />}
          </PatientsPageLoader>
        ),
      },
      {
        path: '/patients/:id',
        element: (
          <PatientPageLoader>
            {(patient) => <PatientDetailsPage data={patient} />}
          </PatientPageLoader>
        ),
      },
      {
        path: '/members',
        element: <MembersPage />,
      },
      {
        path: '/members/:id',
        element: <h1>doctor details</h1>,
      },
      {
        path: '/appointments',
        element: <AppointmentsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/settings/profile" />,
          },
          {
            path: '/settings/profile',
            element: 'profile',
          },
          {
            path: '/settings/appearance',
            element: 'Appearance',
          },
          {
            path: '/settings/security',
            element: 'Security and password',
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
        element: (
          <LoginPageLoader>
            {(isAdminUser) => <LoginPage isAdminUser={isAdminUser} />}
          </LoginPageLoader>
        ),
      },
      {
        path: '/auth/register',
        element: (
          <LoginPageLoader>
            {(isAdminUser) => <RegisterPage isAdminUser={isAdminUser} />}
          </LoginPageLoader>
        ),
      },
    ],
  },
]);
