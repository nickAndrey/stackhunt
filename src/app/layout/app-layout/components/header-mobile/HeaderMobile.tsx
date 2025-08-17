// type HeaderMobileProps = {}

import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/design-system/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { Download, Menu, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { Navigation } from '../navigation';

export function HeaderMobile() {
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
    <header className="px-4 py-3  border-b-1 flex flex-col">
      <div className="flex">
        <h2 className="text-xl font-semibold">{header.title}</h2>
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
      </div>

      {header.actions && <div className="flex gap-3 mt-3 items-center">{header.actions}</div>}

      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button className="fixed z-10 right-3 top-[85%] w-14 h-14 rounded-full bg-gray-700">
            <Menu className="size-7" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <img src="/logo.png" alt="Mounting Medical logo" className="mb-4 w-[136px] h-[65px]" />
          </DrawerHeader>

          <Navigation currentWidth={100} />
        </DrawerContent>
      </Drawer>
    </header>
  );
}
