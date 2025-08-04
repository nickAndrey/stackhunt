import { useAuth } from '@/app/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';

export function Header() {
  const { member } = useAuth();

  return (
    <header className="p-4 border-b flex gap-2">
      <div id="header-actions" />

      <div className="ml-auto">
        {member && (
          <Avatar>
            <AvatarImage src={member.profile_image} />
            <AvatarFallback>{`${member.first_name?.[0]}${member.last_name?.[0]}`}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
