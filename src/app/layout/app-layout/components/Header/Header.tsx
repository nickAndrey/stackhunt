import { useAuth } from '@/app/contexts/auth';
import { useHeader } from '@/app/contexts/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';

export function Header() {
  const { member } = useAuth();
  const { header } = useHeader();

  return (
    <header className="p-4 border-b flex items-center gap-10">
      <h2 className="text-xl font-semibold">{header.title}</h2>

      <div className="flex gap-3 items-center">{header.actions}</div>

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
