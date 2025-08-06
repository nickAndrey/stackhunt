import { Button } from '@/design-system/components/ui/button';
import type { Staff } from '@/shared/types/staff';
import { LoaderCircle } from 'lucide-react';
import { ProfileForm } from './components/profile-form';
import { useProfileForm } from './components/profile-form/hooks/useProfileForm';

type PageProps = {
  data: Partial<Staff>;
};

export function ProfilePage({ data }: PageProps) {
  const profileForm = useProfileForm({ staff: data });

  return (
    <div>
      <ProfileForm {...profileForm} />

      <footer className="py-3 sticky bottom-0 bg-white">
        <Button
          variant="secondary"
          className="w-full"
          onClick={profileForm.handleSubmit}
          disabled={profileForm.formStatus === 'processing'}
        >
          {profileForm.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {profileForm.formStatus === 'processing' ? 'Updating...' : 'Update Profile'}
        </Button>
      </footer>
    </div>
  );
}
