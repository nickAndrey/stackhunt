import { NavLink } from 'react-router';

const routes = [
  {
    id: 0,
    href: '/dashboard',
    label: 'Dashboard',
  },
];

function Navigation() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? 'active' : ''}`;
  };

  return (
    <ul className="flex flex-col">
      {routes.map((route) => (
        <li key={route.id}>
          <NavLink to={route.href} className={linkStyles}>
            <span className="text-sm">{route.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
