import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { useEffect, useRef } from 'react';

export function Header() {
  const { member } = useAuth();
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
          <Avatar>
            <AvatarImage src={objectUrlRef.current || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
