import { NavLink } from 'react-router';

const routes = [
  {
    id: 0,
    href: '/patients',
    label: 'Patients',
  },
  // {
  //   id: 0,
  //   href: '/dashboard',
  //   label: 'Dashboard',
  // },
  // {
  //   id: 1,
  //   href: '/alerts',
  //   label: 'Alerts',
  // },
  // {
  //   id: 2,
  //   href: '/settings',
  //   label: 'Settings',
  // },
];

function Navigation() {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? 'active bg-blue-200' : ''} flex items-center p-2 rounded-lg`;
  };

  return (
    <ul className="flex flex-col overflow-x-hidden px-2 mt-4">
      {routes.map((route) => (
        <li key={route.id}>
          <NavLink to={route.href} className={linkStyles}>
            <span className="truncate text-gray-800">{route.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
