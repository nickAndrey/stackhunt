import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
