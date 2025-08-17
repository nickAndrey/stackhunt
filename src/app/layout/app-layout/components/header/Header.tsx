import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { Download, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';

export function Header() {
  const { member, logout } = useAuth();
  const { header } = useHeader();
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (member?.profile_image) {
      objectUrlRef.current = URL.createObjectURL(member.profile_image);

      return () => {
        if (objectUrlRef.current) {
          objectUrlRef.current = null;
        }
      };
    }
  }, [member?.profile_image]);

  const initials = `${member?.first_name?.[0]}${member?.last_name?.[0]}`;

  return (
    <header className="p-4 border-b flex items-center gap-10">
      <h2 className="text-xl font-semibold">{header.title}</h2>
      <div className="flex gap-3 items-center">{header.actions}</div>
      <div className="ml-auto">
        {member && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={objectUrlRef.current || ''} className="object-cover" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem asChild>
                <NavLink to="/settings/profile">
                  Profile
                  <DropdownMenuShortcut>
                    <User />
                  </DropdownMenuShortcut>
                </NavLink>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={logout}>
                Logout
                <DropdownMenuShortcut>
                  <Download className="rotate-[-90deg]" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
