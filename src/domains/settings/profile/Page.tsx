import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import { FileDropZone } from '@/shared/components/FileDropZone';
import { useFileDrop } from '@/shared/components/FileDropZone/hooks/useFileDrop';
import type { Staff } from '@/shared/types/staff';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { PreviewImage } from './components/preview-image';
import { ProfileForm } from './components/profile-form';
import { useProfileForm } from './components/profile-form/hooks/useProfileForm';

type PageProps = {
  data: Partial<Staff>;
};

export function ProfilePage({ data }: PageProps) {
  const { setHeader } = useHeader();

  const dropZone = useFileDrop({
    image: {
      quality: 0.8,
      maxWidth: 100,
    },
    initialValues: {
      files: data?.profile_image ? [data.profile_image] : undefined,
    },
  });

  const profileForm = useProfileForm({ staff: data });

  useEffect(() => {
    setHeader({ title: 'Settings: Profile' });

    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ProfileForm {...profileForm} />

      <div>
        <h4 className="text-md font-medium">Profile Image</h4>
        <p className="text-sm font-medium mb-2 text-gray-400">Please choose a profile image</p>
        <FileDropZone
          {...dropZone}
          withPreview
          renderPreviewElement={(maxWidth) => (
            <PreviewImage imgUrl={dropZone.files[0]?.previewUrl} maxWidth={maxWidth} />
          )}
          inputAccept="image/*"
        />
      </div>

      <footer className="py-3 sticky bottom-0 bg-white col-span-full">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => profileForm.handleSubmit(dropZone.files)()}
          disabled={profileForm.formStatus === 'processing'}
        >
          {profileForm.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {profileForm.formStatus === 'processing' ? 'Updating...' : 'Update Profile'}
        </Button>
      </footer>
    </div>
  );
}
