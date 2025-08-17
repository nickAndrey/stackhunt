import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { Download, Menu } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

export function Header() {
  const { member, logout } = useAuth();
  const { header, toggleMenu } = useHeader();
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
    <header className="p-4 border-b flex flex-wrap sm:flex-nowrap items-center sm:gap-10">
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="size-8 rounded-full mr-3 sm:hidden"
          onClick={() => toggleMenu?.(!header?.isMenuOpened)}
        >
          <Menu className="size-6" />
        </Button>
        <h2 className="text-xl font-semibold">{header.title}</h2>
      </div>

      <div className="flex gap-3 items-center order-4 sm:order-0 w-full mt-3 sm:mt-0 m-auto ">
        {header.actions}
      </div>

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
