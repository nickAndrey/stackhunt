import { useHeader } from '@/app/contexts/header';
import { Button } from '@/design-system/components/ui/button';
import type { AuthCredentials } from '@/shared/types/auth-credentials';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { CredentialsForm } from './components/credentials-form';
import { useCredentialsForm } from './components/credentials-form/hooks/useCredentialsForm';

type PageProps = {
  data: AuthCredentials;
};

export function SecurityAndPasswordPage({ data }: PageProps) {
  const { setHeader } = useHeader();

  const credentialsForm = useCredentialsForm({ initialValues: data });

  useEffect(() => {
    setHeader({ title: 'Settings: Security & Password' });
    return () => setHeader({});
  }, [setHeader]);

  return (
    <div className="md:w-1/2 flex-1 grid grid-rows-[1fr_auto]">
      <CredentialsForm {...credentialsForm} />

      <footer className="py-3 sticky bottom-0 bg-white col-span-full mb-auto">
        <Button
          variant="secondary"
          className="w-full"
          onClick={credentialsForm.handleSubmit}
          disabled={credentialsForm.formStatus === 'processing'}
        >
          {credentialsForm.formStatus === 'processing' && <LoaderCircle className="animate-spin" />}
          {credentialsForm.formStatus === 'processing'
            ? 'Updating...'
            : 'Update Profile Credentials'}
        </Button>
      </footer>
    </div>
  );
}
