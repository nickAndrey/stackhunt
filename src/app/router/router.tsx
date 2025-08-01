import PatientDetailsPage from '@/domains/patients/details/Page';
import PatientsListPage from '@/domains/patients/list/Page';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

const SettingsPage = lazy(() => import('@/domains/settings/Page'));
const LoginPage = lazy(() => import('@/domains/login/Page'));
const AppointmentsPage = lazy(() => import('@/domains/appointments/Page'));
const DoctorsListPage = lazy(() => import('@/domains/doctors/Page'));
const PatientPageLoader = lazy(
  () => import('@/domains/patients/details/components/PatientPageLoader/PatientPageLoader')
);
const PatientsPageLoader = lazy(
  () => import('@/domains/patients/list/components/PatientsPageLoader/PatientsPageLoader')
);

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
    ],
  },
]);

export default router;
