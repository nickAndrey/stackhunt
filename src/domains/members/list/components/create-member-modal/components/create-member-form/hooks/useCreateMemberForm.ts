import { useRegisterForm } from '@/shared/components/register-form';
import { registerNewMember } from '@/shared/services/register-new-member';
import type { FormStatus } from '@/shared/types/form-status';
import type { StaffForm } from '@/shared/types/staff';
import { useState } from 'react';
import { toast } from 'sonner';
import { createDemoStaff } from '../services/create-demo-staff';

export function useCreateMemberForm() {
  const registerForm = useRegisterForm();

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [isGenerateAutomatically, setIsGenerateAutomatically] = useState(false);

  const handleSubmit = async (data: StaffForm) => {
    const isFormValid = await registerForm.form.trigger();
    if (!isFormValid) return false;

    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      await registerNewMember(data);
      toast.success('New member has been successfully created');
      setFormStatus('success');

      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');

      return false;
    }
  };

  const handleAutoGenerate = async () => {
    setFormStatus('processing');
    await new Promise((res) => setTimeout(res, 1000));

    try {
      await createDemoStaff();
      toast.success('New members have been successfully created');
      setFormStatus('success');

      return true;
    } catch (error) {
      console.error((error as Error).message);
      toast.error((error as Error).message);
      setFormStatus('error');

      return false;
    }
  };

  return {
    formStatus,
    registerForm,
    isGenerateAutomatically,
    setIsGenerateAutomatically,
    handleSubmit,
    handleAutoGenerate,
  };
}
