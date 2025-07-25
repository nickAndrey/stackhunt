import { PatientPageLoader } from '@/domains/patients/details/components/PatientPageLoader';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

const SettingsPage = lazy(() => import('@/domains/settings/Page'));
const LoginPage = lazy(() => import('@/domains/login/Page'));
const RegisterPage = lazy(() => import('@/domains/register/Page'));
const PatientDetailsPage = lazy(() => import('@/domains/patients/details/Page'));
const PatientsListPage = lazy(() => import('@/domains/patients/list/Page'));
const AppointmentsPage = lazy(() => import('@/domains/appointments/Page'));
const DoctorsListPage = lazy(() => import('@/domains/doctors/Page'));

const router = createBrowserRouter([
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
        element: <PatientsListPage />,
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
        path: '/doctors',
        element: <DoctorsListPage />,
      },
      {
        path: '/doctors/:id',
        element: <h1>doctor details</h1>,
      },
      {
        path: '/appointments',
        element: <AppointmentsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
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
