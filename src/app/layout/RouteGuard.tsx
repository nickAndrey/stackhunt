import { Navigate, useLocation } from 'react-router';
import { AppLayout } from './app-layout';

function RouteGuard() {
  const isLoggedIn = true;
  const location = useLocation();

  if (!isLoggedIn && !/\/login|\/sign-up/.test(location.pathname)) {
    return <Navigate to="/auth/login" />;
  }

  return <AppLayout />;
}

export default RouteGuard;
