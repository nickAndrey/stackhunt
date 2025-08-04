import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth';
import { AppLayout } from './app-layout';

function RouteGuard() {
  const { member, isLoading } = useAuth();
  const location = useLocation();

  if (!isLoading && !member && !/\/login|\/sign-up/.test(location.pathname)) {
    return <Navigate to="/auth/login" />;
  }

  return <AppLayout />;
}

export default RouteGuard;
