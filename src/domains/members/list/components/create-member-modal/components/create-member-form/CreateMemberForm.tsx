import { Label } from '@/design-system/components/ui/label';
import { Switch } from '@/design-system/components/ui/switch';
import { RegisterForm } from '@/shared/components/register-form';
import { useCreateMemberForm } from './hooks/useCreateMemberForm';

type CreateMemberFormProps = ReturnType<typeof useCreateMemberForm>;

export function CreateMemberForm(props: CreateMemberFormProps) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          checked={props.isGenerateAutomatically}
          onCheckedChange={props.setIsGenerateAutomatically}
          id="generate-stub-data"
        />
        <Label htmlFor="generate-stub-data">Generate automatically (demo purposes)</Label>
      </div>
      {!props.isGenerateAutomatically && <RegisterForm {...props.registerForm} />}
    </>
  );
}
