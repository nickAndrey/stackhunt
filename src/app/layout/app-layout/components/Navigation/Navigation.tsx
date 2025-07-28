import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';
import { BriefcaseMedical, CalendarRange, Settings, User } from 'lucide-react';
import { NavLink } from 'react-router';

const routes = [
  {
    id: 0,
    href: '/appointments',
    label: 'Appointments',
    icon: <CalendarRange width={20} height={20} />,
  },
  {
    id: 1,
    href: '/doctors',
    label: 'Doctors',
    icon: <BriefcaseMedical width={20} height={20} />,
  },
  {
    id: 2,
    href: '/patients',
    label: 'Patients',
    icon: <User width={20} height={20} />,
  },
  {
    id: 3,
    href: '/settings',
    label: 'Settings',
    icon: <Settings width={20} height={20} />,
  },
];

type NavigationProps = {
  currentWidth: number;
};

function Navigation({ currentWidth }: NavigationProps) {
  const linkStyles = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? 'active bg-blue-200' : ''} flex items-center p-2 rounded-lg gap-2`;
  };

  return (
    <ul className="flex flex-col overflow-x-hidden px-2 pt-6 pb-4 h-full">
      {routes.map((route) => (
        <li key={route.id} className={route.href === '/settings' ? 'mt-auto' : ''}>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <NavLink to={route.href} className={linkStyles}>
                <span>{route.icon}</span>
                <span className="truncate text-gray-800">{route.label}</span>
              </NavLink>
            </TooltipTrigger>

            <TooltipContent side="right" align="center" hidden={currentWidth > 5}>
              <span>{route.label}</span>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
