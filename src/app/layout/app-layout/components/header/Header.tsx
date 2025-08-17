import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

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
    <header className="sm:p-4 border-b flex items-center sm:gap-10">
      <h2 className="text-xl font-semibold">{header.title}</h2>
      <div className="flex gap-3 items-center">{header.actions}</div>
      <div className="ml-auto">
        {member && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={objectUrlRef.current || ''} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/settings/profile">Profile</Link>
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
