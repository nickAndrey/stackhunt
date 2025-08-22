import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[url(/login-page-bg.webp)] bg-cover bg-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
