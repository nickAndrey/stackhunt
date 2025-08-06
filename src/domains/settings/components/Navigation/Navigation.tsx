import { NavLink } from 'react-router';

export function Navigation() {
  const links = [
    {
      id: 0,
      label: 'Profile',
      path: '/settings/profile',
    },
    {
      id: 1,
      label: 'Appearance',
      path: '/settings/appearance',
    },
    {
      id: 2,
      label: 'Security & Password',
      path: '/settings/security',
    },
  ];

  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? 'active underline' : ''} flex items-center gap-2 text-md font-medium`;
  };

  return (
    <nav className="sticky top-0 bg-white py-4">
      <ul className="flex items-center gap-6">
        {links.map((item) => (
          <NavLink key={item.id} to={item.path} className={linkStyles}>
            {item.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
