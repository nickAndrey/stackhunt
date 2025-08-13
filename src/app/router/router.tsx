import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/AuthLayout';
import RouteGuard from '../layout/RouteGuard';

const PatientPageLoader = lazy(() =>
  import('@/domains/patients/details_v2').then((module) => ({
    default: module.PatientPageLoader,
  }))
);
const PatientsPageLoader = lazy(() =>
  import('@/domains/patients/list').then((module) => ({
    default: module.PatientsPageLoader,
  }))
);
const MembersPageLoader = lazy(() =>
  import('@/domains/members/list').then((module) => ({
    default: module.MembersPageLoader,
  }))
);
const MemberPageLoader = lazy(() =>
  import('@/domains/members/details').then((module) => ({
    default: module.MemberPageLoader,
  }))
);
const AppointmentsPage = lazy(() =>
  import('@/domains/appointments/Page').then((module) => ({
    default: module.AppointmentsPage,
  }))
);
const SettingsLayout = lazy(() =>
  import('@/domains/settings/Layout').then((module) => ({
    default: module.SettingsLayout,
  }))
);
const ProfilePageLoader = lazy(() =>
  import('@/domains/settings/profile').then((module) => ({
    default: module.ProfilePageLoader,
  }))
);
const AppearancePage = lazy(() =>
  import('@/domains/settings/appearance').then((module) => ({
    default: module.AppearancePage,
  }))
);
const SP_PageLoader = lazy(() =>
  import('@/domains/settings/security').then((module) => ({
    default: module.SP_PageLoader,
  }))
);
const LoginPageLoader = lazy(() =>
  import('@/domains/login').then((module) => ({
    default: module.LoginPageLoader,
  }))
);
const RegisterPageLoader = lazy(() =>
  import('@/domains/register').then((module) => ({
    default: module.RegisterPageLoader,
  }))
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
        element: <MemberPageLoader />,
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
            element: <ProfilePageLoader />,
          },
          {
            path: '/settings/appearance',
            element: <AppearancePage />,
          },
          {
            path: '/settings/security',
            element: <SP_PageLoader />,
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
